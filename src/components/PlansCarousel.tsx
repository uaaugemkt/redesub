import { useCallback, useEffect, useRef, useState } from "react";
import type { Plan } from "../lib/plans";
import PlanCard from "./PlanCard";

interface PlansCarouselProps {
  plans: readonly Plan[];
  selectedPlanId: string | null;
  onSelect: (planId: string) => void;
}

export default function PlansCarousel({
  plans,
  selectedPlanId,
  onSelect,
}: PlansCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const canPrev = activeIndex > 0;
  const canNext = activeIndex < plans.length - 1;

  useEffect(() => {
    const track = trackRef.current;
    if (!track || plans.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.5) return;
          const idx = Number((entry.target as HTMLElement).dataset.index);
          if (!Number.isNaN(idx)) setActiveIndex(idx);
        });
      },
      { root: track, threshold: [0.5, 0.75] }
    );

    slideRefs.current.forEach((slide) => {
      if (slide) observer.observe(slide);
    });

    return () => observer.disconnect();
  }, [plans]);

  const scrollToIndex = useCallback((index: number) => {
    const slide = slideRefs.current[index];
    if (!slide) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    slide.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    const idx = plans.findIndex((p) => p.id === selectedPlanId);
    if (idx >= 0) scrollToIndex(idx);
  }, [selectedPlanId, plans, scrollToIndex]);

  const scrollByStep = (direction: -1 | 1) => {
    const next = Math.min(Math.max(activeIndex + direction, 0), plans.length - 1);
    scrollToIndex(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollByStep(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollByStep(1);
    }
  };

  if (plans.length === 0) return null;

  return (
    <div
      className="plans-carousel"
      role="region"
      aria-roledescription="carrossel"
      aria-label="Planos disponíveis"
    >
      <button
        type="button"
        className="plans-carousel__arrow plans-carousel__arrow--prev"
        aria-label="Plano anterior"
        disabled={!canPrev}
        onClick={() => scrollByStep(-1)}
      >
        <ChevronIcon direction="left" />
      </button>

      <div className="plans-carousel__viewport">
        <div
          ref={trackRef}
          className="plans-carousel__track"
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              ref={(el) => {
                slideRefs.current[index] = el;
              }}
              className={`plans-carousel__slide ${activeIndex === index ? "plans-carousel__slide--active" : ""} ${selectedPlanId === plan.id ? "plans-carousel__slide--selected" : ""}`}
              data-index={index}
            >
              <PlanCard
                plan={plan}
                large
                selectable
                selected={selectedPlanId === plan.id}
                onSelect={onSelect}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="plans-carousel__arrow plans-carousel__arrow--next"
        aria-label="Próximo plano"
        disabled={!canNext}
        onClick={() => scrollByStep(1)}
      >
        <ChevronIcon direction="right" />
      </button>

      <div className="plans-carousel__dots" role="tablist" aria-label="Indicadores de planos">
        {plans.map((plan, index) => (
          <button
            key={plan.id}
            type="button"
            role="tab"
            className={`plans-carousel__dot ${index === activeIndex ? "plans-carousel__dot--active" : ""}`}
            aria-selected={index === activeIndex}
            aria-label={`Plano ${plan.name}`}
            onClick={() => scrollToIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
