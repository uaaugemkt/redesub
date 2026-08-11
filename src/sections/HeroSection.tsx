import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  HERO_AUTOPLAY_MS,
  HERO_SLIDES,
  type HeroSlide,
} from "../config/heroSlides";

function BannerFrame({
  slide,
  isActive,
}: {
  slide: HeroSlide;
  isActive: boolean;
}) {
  const image = (
    <img
      src={slide.imageSrc}
      alt={isActive ? slide.imageAlt : ""}
      className="hero-carousel__banner-img"
      width={1920}
      height={700}
      decoding="async"
      fetchPriority={isActive ? "high" : "low"}
      draggable={false}
    />
  );

  if (!slide.link) {
    return <div className="hero-carousel__banner">{image}</div>;
  }

  if (slide.link.type === "external") {
    return (
      <a
        href={slide.link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="hero-carousel__banner hero-carousel__banner--link"
        aria-label={slide.label}
      >
        {image}
      </a>
    );
  }

  return (
    <Link
      to={slide.link.to}
      className="hero-carousel__banner hero-carousel__banner--link"
      aria-label={slide.label}
    >
      {image}
    </Link>
  );
}

export default function HeroSection() {
  const slideCount = HERO_SLIDES.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const goTo = useCallback(
    (index: number) => {
      const next = ((index % slideCount) + slideCount) % slideCount;
      setActiveIndex(next);
    },
    [slideCount]
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || slideCount < 2) return;

    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slideCount);
    }, HERO_AUTOPLAY_MS);

    return () => window.clearInterval(id);
  }, [paused, reducedMotion, slideCount]);

  const onTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
    touchDeltaX.current = 0;
    setPaused(true);
  };

  const onTouchMove = (event: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    touchDeltaX.current = (event.touches[0]?.clientX ?? 0) - touchStartX.current;
  };

  const onTouchEnd = () => {
    const delta = touchDeltaX.current;
    touchStartX.current = null;
    touchDeltaX.current = 0;

    if (Math.abs(delta) > 48) {
      if (delta < 0) goNext();
      else goPrev();
    }

    window.setTimeout(() => setPaused(false), 4000);
  };

  const activeSlide = HERO_SLIDES[activeIndex] as HeroSlide;

  return (
    <section
      className="hero hero--home hero-carousel hero-carousel--banners"
      id="inicio"
      aria-roledescription="carrossel"
      aria-label="Campanhas RedeSub"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div
        className="hero-carousel__viewport"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="hero-carousel__frame">
          <div
            className="hero-carousel__track"
            style={{
              transform: `translateX(-${activeIndex * 100}%)`,
              transition: reducedMotion ? "none" : undefined,
            }}
          >
            {HERO_SLIDES.map((slide, index) => (
              <article
                key={slide.id}
                className="hero-carousel__slide"
                aria-hidden={index !== activeIndex}
                aria-roledescription="slide"
                aria-label={`${index + 1} de ${slideCount}: ${slide.label}`}
                id={`hero-slide-${slide.id}`}
              >
                <BannerFrame slide={slide} isActive={index === activeIndex} />
              </article>
            ))}
          </div>

          <div className="hero-carousel__controls">
            <button
              type="button"
              className="hero-carousel__arrow hero-carousel__arrow--prev"
              aria-label="Slide anterior"
              onClick={() => {
                goPrev();
                setPaused(true);
                window.setTimeout(() => setPaused(false), 4000);
              }}
            >
              <span aria-hidden="true">‹</span>
            </button>

            <div className="hero-carousel__dots" role="tablist" aria-label="Slides do hero">
              {HERO_SLIDES.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-controls={`hero-slide-${slide.id}`}
                  aria-label={`Ir para slide ${index + 1}: ${slide.label}`}
                  className={`hero-carousel__dot${index === activeIndex ? " is-active" : ""}`}
                  onClick={() => {
                    goTo(index);
                    setPaused(true);
                    window.setTimeout(() => setPaused(false), 4000);
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              className="hero-carousel__arrow hero-carousel__arrow--next"
              aria-label="Próximo slide"
              onClick={() => {
                goNext();
                setPaused(true);
                window.setTimeout(() => setPaused(false), 4000);
              }}
            >
              <span aria-hidden="true">›</span>
            </button>
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {activeSlide.label}
        </p>
      </div>
    </section>
  );
}
