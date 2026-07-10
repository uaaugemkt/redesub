import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { PROBLEM_TIMELINE } from "../lib/constants";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "../lib/whatsapp";

const SLIDE_COUNT = PROBLEM_TIMELINE.length;

export default function ConnectionDiagnosticMobileCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const track = trackRef.current;
      if (!track) return;

      const clamped = Math.max(0, Math.min(SLIDE_COUNT - 1, index));
      const slide = track.children.item(clamped) as HTMLElement | null;
      if (!slide) return;

      const left = slide.offsetLeft - track.offsetLeft;
      track.scrollTo({ left, behavior: reducedMotion ? "auto" : behavior });
      setActiveIndex(clamped);
    },
    [reducedMotion]
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;

    const syncFromScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const slides = Array.from(track.children) as HTMLElement[];
        if (slides.length === 0) return;

        const center = track.scrollLeft + track.clientWidth / 2;
        let nearest = 0;
        let minDistance = Number.POSITIVE_INFINITY;

        slides.forEach((slide, index) => {
          const slideCenter = slide.offsetLeft - track.offsetLeft + slide.offsetWidth / 2;
          const distance = Math.abs(center - slideCenter);
          if (distance < minDistance) {
            minDistance = distance;
            nearest = index;
          }
        });

        setActiveIndex(nearest);
      });
    };

    track.addEventListener("scroll", syncFromScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", syncFromScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToIndex(activeIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToIndex(activeIndex + 1);
    }
  };

  return (
    <div className="connection-diagnostic-mobile">
      <div className="connection-diagnostic-mobile__controls">
        <button
          type="button"
          className="connection-diagnostic-mobile__nav-btn"
          aria-label="Ver cenário anterior"
          disabled={activeIndex === 0}
          onClick={() => scrollToIndex(activeIndex - 1)}
        >
          <ChevronIcon direction="left" />
        </button>

        <p className="connection-diagnostic-mobile__status" aria-live="polite">
          <span className="sr-only">Cenário </span>
          {activeIndex + 1} de {SLIDE_COUNT}
        </p>

        <button
          type="button"
          className="connection-diagnostic-mobile__nav-btn"
          aria-label="Ver próximo cenário"
          disabled={activeIndex === SLIDE_COUNT - 1}
          onClick={() => scrollToIndex(activeIndex + 1)}
        >
          <ChevronIcon direction="right" />
        </button>
      </div>

      <div
        ref={trackRef}
        className="connection-diagnostic-mobile__track"
        role="region"
        aria-roledescription="carrossel"
        aria-label="Cenários antes e depois da RedeSub"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {PROBLEM_TIMELINE.map((item, index) => (
          <article
            key={item.time}
            className="connection-diagnostic-mobile__slide"
            aria-hidden={index !== activeIndex}
            aria-current={index === activeIndex ? "true" : undefined}
          >
            <header className="connection-diagnostic-mobile__slide-head">
              <span className="connection-diagnostic-mobile__time">{item.time}</span>
              <span className="connection-diagnostic-mobile__icon" aria-hidden="true">
                <MomentIcon type={item.icon} />
              </span>
              <span className="connection-diagnostic-mobile__category">{item.category}</span>
            </header>

            <div className="connection-diagnostic-mobile__compare">
              <section className="connection-diagnostic-mobile__block connection-diagnostic-mobile__block--before">
                <span className="connection-diagnostic-mobile__label">Antes</span>
                <h3>{item.bad.title}</h3>
                <p>{item.bad.description}</p>
                <span className="connection-diagnostic-mobile__badge connection-diagnostic-mobile__badge--bad">
                  {item.bad.badge}
                </span>
              </section>

              <div className="connection-diagnostic-mobile__divider" aria-hidden="true" />

              <section className="connection-diagnostic-mobile__block connection-diagnostic-mobile__block--after">
                <span className="connection-diagnostic-mobile__label">Com a RedeSub</span>
                <h3>{item.good.title}</h3>
                <p>{item.good.description}</p>
                <span className="connection-diagnostic-mobile__badge connection-diagnostic-mobile__badge--ok">
                  <CheckIcon />
                  {item.good.badge}
                </span>
              </section>
            </div>
          </article>
        ))}
      </div>

      <div
        className="connection-diagnostic-mobile__dots"
        role="tablist"
        aria-label="Selecionar cenário"
      >
        {PROBLEM_TIMELINE.map((item, index) => (
          <button
            key={item.time}
            type="button"
            role="tab"
            className={`connection-diagnostic-mobile__dot ${index === activeIndex ? "connection-diagnostic-mobile__dot--active" : ""}`}
            aria-selected={index === activeIndex}
            aria-label={`Cenário ${index + 1}: ${item.category}`}
            onClick={() => scrollToIndex(index)}
          />
        ))}
      </div>

      <p className="connection-diagnostic-mobile__hint" aria-hidden="true">
        Deslize para ver outros momentos da rotina
      </p>

      <a
        href={buildWhatsAppLink(WHATSAPP_MESSAGES.stabilityDemo)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn--primary btn--md connection-diagnostic-mobile__cta"
      >
        Quero uma internet assim
      </a>
    </div>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MomentIcon({ type }: { type: string }) {
  switch (type) {
    case "school":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3 2 8l10 5 10-5-10-5Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M6 10v5c0 2 2.5 4 6 4s6-2 6-4v-5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      );
    case "tv":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.75" />
          <path d="M8 20h8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    case "game":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="4" y="8" width="16" height="10" rx="4" stroke="currentColor" strokeWidth="1.75" />
          <path d="M9 12v4M7 14h4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <circle cx="16" cy="13" r="1" fill="currentColor" />
        </svg>
      );
    default:
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="6" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.75" />
          <path
            d="M15 10l6-3v10l-6-3"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M4 9l3.5 3.5L14 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
