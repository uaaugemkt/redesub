import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type RefObject,
} from "react";

interface UseSnapCarouselOptions {
  slideCount: number;
  /** When set, scrolls to this index when it changes (e.g. selected plan). */
  syncIndex?: number | null;
}

interface UseSnapCarouselResult {
  trackRef: RefObject<HTMLDivElement | null>;
  setSlideRef: (index: number, node: HTMLElement | null) => void;
  activeIndex: number;
  canPrev: boolean;
  canNext: boolean;
  goToSlide: (index: number) => void;
  goPrev: () => void;
  goNext: () => void;
  handleTrackKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
}

function getNearestIndex(track: HTMLElement, slides: HTMLElement[]): number {
  if (slides.length === 0) return 0;

  const scrollLeft = track.scrollLeft;
  let nearest = 0;
  let minDistance = Number.POSITIVE_INFINITY;

  slides.forEach((slide, index) => {
    const distance = Math.abs(slide.offsetLeft - scrollLeft);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = index;
    }
  });

  return nearest;
}

export function useSnapCarousel({
  slideCount,
  syncIndex = null,
}: UseSnapCarouselOptions): UseSnapCarouselResult {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotionRef = useRef(false);
  const scrollingProgrammatically = useRef(false);

  const setSlideRef = useCallback((index: number, node: HTMLElement | null) => {
    slideRefs.current[index] = node;
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      const track = trackRef.current;
      const slide = slideRefs.current[index];
      if (!track || !slide || slideCount === 0) return;

      const safeIndex = Math.max(0, Math.min(slideCount - 1, index));
      const behavior: ScrollBehavior = reducedMotionRef.current ? "auto" : "smooth";

      scrollingProgrammatically.current = true;
      track.scrollTo({
        left: slide.offsetLeft,
        behavior,
      });
      setActiveIndex(safeIndex);

      window.setTimeout(() => {
        scrollingProgrammatically.current = false;
      }, behavior === "smooth" ? 400 : 0);
    },
    [slideCount]
  );

  const goPrev = useCallback(() => {
    goToSlide(activeIndex - 1);
  }, [activeIndex, goToSlide]);

  const goNext = useCallback(() => {
    goToSlide(activeIndex + 1);
  }, [activeIndex, goToSlide]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      reducedMotionRef.current = mq.matches;
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || slideCount === 0) return;

    let frame = 0;

    let scrollEndTimer: number | undefined;

    const syncFromScroll = () => {
      if (scrollingProgrammatically.current) return;

      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const slides = slideRefs.current.filter(Boolean) as HTMLElement[];
        const nearest = getNearestIndex(track, slides);
        setActiveIndex(nearest);
      });

      if (scrollEndTimer) window.clearTimeout(scrollEndTimer);
      scrollEndTimer = window.setTimeout(snapOnScrollEnd, 140);
    };

    const snapOnScrollEnd = () => {
      if (scrollingProgrammatically.current) return;
      const slides = slideRefs.current.filter(Boolean) as HTMLElement[];
      const nearest = getNearestIndex(track, slides);
      const slide = slides[nearest];
      if (!slide) return;

      const distance = Math.abs(slide.offsetLeft - track.scrollLeft);
      if (distance > 2) {
        track.scrollTo({
          left: slide.offsetLeft,
          behavior: reducedMotionRef.current ? "auto" : "smooth",
        });
      }
      setActiveIndex(nearest);
    };

    track.addEventListener("scroll", syncFromScroll, { passive: true });
    if ("onscrollend" in track) {
      track.addEventListener("scrollend", snapOnScrollEnd);
    }

    return () => {
      track.removeEventListener("scroll", syncFromScroll);
      track.removeEventListener("scrollend", snapOnScrollEnd);
      window.cancelAnimationFrame(frame);
      if (scrollEndTimer) window.clearTimeout(scrollEndTimer);
    };
  }, [slideCount]);

  useEffect(() => {
    if (syncIndex == null || syncIndex < 0) return;
    goToSlide(syncIndex);
  }, [syncIndex, goToSlide]);

  useEffect(() => {
    const onResize = () => {
      goToSlide(activeIndex);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeIndex, goToSlide]);

  const handleTrackKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

  return {
    trackRef,
    setSlideRef,
    activeIndex,
    canPrev: activeIndex > 0,
    canNext: activeIndex < slideCount - 1,
    goToSlide,
    goPrev,
    goNext,
    handleTrackKeyDown,
  };
}
