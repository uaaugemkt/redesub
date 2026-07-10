import type { Plan } from "../lib/plans";
import { useSnapCarousel } from "../hooks/useSnapCarousel";
import PlanCard from "./PlanCard";

interface PlansCarouselProps {
  plans: readonly Plan[];
  selectedPlanId?: string | null;
  onSelect?: (planId: string) => void;
  /** Home preview: cards are not selectable. */
  browseOnly?: boolean;
}

export default function PlansCarousel({
  plans,
  selectedPlanId = null,
  onSelect,
  browseOnly = false,
}: PlansCarouselProps) {
  const syncIndex =
    selectedPlanId != null
      ? plans.findIndex((plan) => plan.id === selectedPlanId)
      : null;

  const {
    trackRef,
    setSlideRef,
    activeIndex,
    canPrev,
    canNext,
    goToSlide,
    goPrev,
    goNext,
    handleTrackKeyDown,
  } = useSnapCarousel({
    slideCount: plans.length,
    syncIndex: syncIndex != null && syncIndex >= 0 ? syncIndex : null,
  });

  if (plans.length === 0) return null;

  return (
    <div
      className={`plans-carousel${browseOnly ? " plans-carousel--browse" : ""}`}
      role="region"
      aria-roledescription="carrossel"
      aria-label="Planos disponíveis"
    >
      <button
        type="button"
        className="plans-carousel__arrow plans-carousel__arrow--prev"
        aria-label="Ver plano anterior"
        disabled={!canPrev}
        onClick={goPrev}
      >
        <ChevronIcon direction="left" />
      </button>

      <div className="plans-carousel__viewport">
        <div
          ref={trackRef}
          className="plans-carousel__track"
          tabIndex={0}
          onKeyDown={handleTrackKeyDown}
        >
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              ref={(node) => setSlideRef(index, node)}
              className={`plans-carousel__slide ${activeIndex === index ? "plans-carousel__slide--active" : ""} ${selectedPlanId === plan.id ? "plans-carousel__slide--selected" : ""}`}
              data-index={index}
            >
              <PlanCard
                plan={plan}
                large
                selectable={!browseOnly}
                selected={selectedPlanId === plan.id}
                onSelect={browseOnly ? undefined : onSelect}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="plans-carousel__arrow plans-carousel__arrow--next"
        aria-label="Ver próximo plano"
        disabled={!canNext}
        onClick={goNext}
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
            onClick={() => goToSlide(index)}
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
