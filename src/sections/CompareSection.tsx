import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { useSelection } from "../context/SelectionContext";
import { COMPARE } from "../lib/constants";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "../lib/whatsapp";
import "../styles/compare-section.css";

export default function CompareSection({
  eyebrow = "A diferença real",
  backHref,
  backLabel = "Voltar ao configurador",
}: {
  eyebrow?: string;
  backHref?: string;
  backLabel?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [activeBenefitId, setActiveBenefitId] = useState<string | null>(null);
  const { regionName } = useSelection();

  const whatsappHref = buildWhatsAppLink(
    WHATSAPP_MESSAGES.stabilityCompare(regionName)
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleProblemActivate = useCallback((benefitId: string) => {
    setActiveBenefitId(benefitId);
  }, []);

  const handleProblemDeactivate = useCallback(() => {
    setActiveBenefitId(null);
  }, []);

  const hasHighlight = activeBenefitId !== null;

  return (
    <section
      ref={sectionRef}
      className={`compare section ${inView ? "compare--in-view" : ""}`}
      id="beneficios"
      aria-labelledby="compare-title"
    >
      <div className="compare__atmosphere" aria-hidden="true">
        <span className="compare__glow compare__glow--left" />
        <span className="compare__glow compare__glow--right" />
        <CompareBackdropLines />
      </div>

      <div className="container">
        <header className="compare__header section__header">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="section__title" id="compare-title">
            A diferença entre ter internet e ter tranquilidade
          </h2>
          <p className="section__desc">
            Internet rápida é bom. Internet estável é melhor ainda.
          </p>
        </header>

        <div className="compare__stage">
          <article
            className="compare__problem"
            aria-label={COMPARE.bad.title}
          >
            <div className="compare__problem-noise" aria-hidden="true" />
            <div className="compare__problem-topline" aria-hidden="true" />

            <div className="compare__problem-head">
              <div className="compare__problem-status">
                <WeakSignalIcon />
                <span>{COMPARE.bad.status}</span>
              </div>
              <h3 className="compare__problem-title">{COMPARE.bad.title}</h3>
            </div>

            <ul className="compare__problem-list">
              {COMPARE.bad.items.map((item, index) => (
                <li
                  key={item.id}
                  className={`compare__problem-item ${
                    hasHighlight && activeBenefitId === item.relatedBenefitId
                      ? "compare__problem-item--active"
                      : hasHighlight
                        ? "compare__problem-item--dimmed"
                        : ""
                  }`}
                  style={{ "--item-index": index } as CSSProperties}
                  onMouseEnter={() => handleProblemActivate(item.relatedBenefitId)}
                  onMouseLeave={handleProblemDeactivate}
                  onFocus={() => handleProblemActivate(item.relatedBenefitId)}
                  onBlur={handleProblemDeactivate}
                  onTouchStart={() => handleProblemActivate(item.relatedBenefitId)}
                  onTouchEnd={handleProblemDeactivate}
                  tabIndex={0}
                >
                  <span className="compare__problem-mark" aria-hidden="true">
                    <ProblemMarkIcon />
                  </span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>

            <div className="compare__problem-signal" aria-hidden="true">
              <BrokenSignalBars />
            </div>
          </article>

          <div className="compare__bridge" aria-hidden="true">
            <TransformBridge active={inView} />
            <p className="compare__bridge-label">com a RedeSub</p>
          </div>

          <article
            className="compare__solution"
            aria-label={COMPARE.good.title}
          >
            <div className="compare__solution-accent" aria-hidden="true" />
            <div className="compare__solution-glow" aria-hidden="true" />
            <FiberPattern />

            <div className="compare__solution-head">
              <div className="compare__solution-badge">
                <StableSignalIcon />
                <span>Conexão estabilizada</span>
              </div>
              <h3 className="compare__solution-title">{COMPARE.good.title}</h3>
            </div>

            <ul
              className={`compare__benefits ${
                hasHighlight ? "compare__benefits--linked" : ""
              }`}
            >
              {COMPARE.good.items.map((item, index) => (
                <li
                  key={item.id}
                  data-benefit-id={item.id}
                  className={[
                    "compare__benefit",
                    item.featured ? "compare__benefit--featured" : "",
                    hasHighlight && activeBenefitId === item.id
                      ? "compare__benefit--highlight"
                      : hasHighlight
                        ? "compare__benefit--dimmed"
                        : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={{ "--benefit-index": index } as CSSProperties}
                >
                  <span className="compare__benefit-icon" aria-hidden="true">
                    <BenefitCheckIcon featured={item.featured} />
                  </span>
                  <span className="compare__benefit-text">{item.text}</span>
                  {hasHighlight && activeBenefitId === item.id && (
                    <span className="compare__benefit-link" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className={`compare__cta ${backHref ? "compare__cta--dual" : ""}`}>
          {backHref && (
            <a href={backHref} className="btn btn--primary btn--md compare__cta-back">
              {backLabel}
            </a>
          )}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn--md compare__cta-btn ${backHref ? "btn--outline" : "btn--primary"}`}
          >
            {backHref ? "Falar pelo WhatsApp" : "Quero mais tranquilidade na minha conexão"}
          </a>
        </div>
      </div>
    </section>
  );
}

function TransformBridge({ active }: { active: boolean }) {
  return (
    <svg
      className={`compare__bridge-svg ${active ? "compare__bridge-svg--active" : ""}`}
      viewBox="0 0 88 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="compare__bridge-line compare__bridge-line--broken"
        d="M12 160 C28 120, 36 200, 44 160 C52 120, 60 200, 76 160"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 8"
      />
      <path
        className="compare__bridge-line compare__bridge-line--stable"
        d="M12 160 C28 140, 36 180, 44 160 C52 140, 60 180, 76 160"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle className="compare__bridge-node compare__bridge-node--start" cx="12" cy="160" r="5" />
      <circle className="compare__bridge-node compare__bridge-node--mid" cx="44" cy="160" r="6" />
      <circle className="compare__bridge-node compare__bridge-node--end" cx="76" cy="160" r="5" />
      <path
        className="compare__bridge-pulse"
        d="M12 160 L76 160"
        stroke="url(#comparePulse)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="comparePulse" x1="12" y1="160" x2="76" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fecaca" />
          <stop offset="0.45" stopColor="#03A1FD" />
          <stop offset="1" stopColor="#FF8505" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function CompareBackdropLines() {
  return (
    <svg className="compare__lines" viewBox="0 0 1200 400" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M0 220 C200 180, 400 260, 600 220 S1000 180, 1200 240"
        stroke="rgba(3,161,253,0.08)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M0 300 C300 260, 500 340, 800 300 S1100 260, 1200 320"
        stroke="rgba(255,133,5,0.06)"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

function FiberPattern() {
  return (
    <svg
      className="compare__fiber"
      viewBox="0 0 200 200"
      aria-hidden="true"
    >
      <circle cx="160" cy="40" r="60" stroke="rgba(3,161,253,0.12)" strokeWidth="1" fill="none" />
      <circle cx="180" cy="120" r="40" stroke="rgba(255,133,5,0.1)" strokeWidth="1" fill="none" />
      <path
        d="M20 180 Q80 140 140 160 T200 120"
        stroke="rgba(3,161,253,0.1)"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

function WeakSignalIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="1" y="12" width="3" height="5" rx="1" fill="currentColor" opacity="0.35" />
      <rect x="6" y="9" width="3" height="8" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="11" y="6" width="3" height="11" rx="1" fill="currentColor" opacity="0.25" />
      <path d="M14 4 L16 6 M16 4 L14 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function StableSignalIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="1" y="12" width="3" height="5" rx="1" fill="currentColor" />
      <rect x="6" y="9" width="3" height="8" rx="1" fill="currentColor" />
      <rect x="11" y="5" width="3" height="12" rx="1" fill="currentColor" />
      <rect x="16" y="2" width="3" height="15" rx="1" fill="currentColor" opacity="0.85" />
    </svg>
  );
}

function BrokenSignalBars() {
  return (
    <svg width="72" height="28" viewBox="0 0 72 28" fill="none" aria-hidden="true">
      <rect x="4" y="18" width="8" height="8" rx="2" fill="#fecaca" />
      <rect x="18" y="12" width="8" height="14" rx="2" fill="#fca5a5" />
      <rect x="32" y="16" width="8" height="10" rx="2" fill="#fee2e2" stroke="#fecaca" strokeDasharray="3 2" />
      <rect x="46" y="20" width="8" height="6" rx="2" fill="#fff1f2" stroke="#fecaca" strokeDasharray="2 3" />
      <circle cx="62" cy="8" r="3" fill="#fca5a5" opacity="0.6" />
      <circle cx="68" cy="14" r="2" fill="#fecaca" opacity="0.4" />
    </svg>
  );
}

function ProblemMarkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M3 3l6 6M9 3L3 9"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BenefitCheckIcon({ featured }: { featured: boolean }) {
  return (
    <svg width={featured ? 18 : 16} height={featured ? 18 : 16} viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="9" fill="currentColor" fillOpacity="0.18" />
      <path
        d="M5.5 9l2.5 2.5 4.5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
