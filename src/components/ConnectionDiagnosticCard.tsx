import { useCallback, useEffect, useRef, useState } from "react";
import ConnectionDiagnosticMobileCarousel from "./ConnectionDiagnosticMobileCarousel";
import { PROBLEM_TIMELINE } from "../lib/constants";
import {
  DIAGNOSTIC_ITEM_COUNT,
  DIAGNOSTIC_TIMINGS,
  type DiagnosticPhase,
  canStartResolution,
  getDiagnosisLabel,
  getDiagnosisProgress,
  getResolutionLabel,
  getResolutionProgress,
  isItemFixed,
  isItemVisible,
} from "../lib/connectionDiagnostic";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "../lib/whatsapp";

type ButtonVisual = "default" | "pressing" | "optimizing";

function schedule(fn: () => void, ms: number, timers: number[]) {
  const id = window.setTimeout(fn, ms);
  timers.push(id);
  return id;
}

function clearTimers(timers: number[]) {
  timers.forEach((id) => window.clearTimeout(id));
  timers.length = 0;
}

export default function ConnectionDiagnosticCard() {
  const [isCompactLayout, setIsCompactLayout] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 1023px)").matches
      : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsCompactLayout(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (isCompactLayout) {
    return <ConnectionDiagnosticMobileCarousel />;
  }

  return <ConnectionDiagnosticDesktop />;
}

function ConnectionDiagnosticDesktop() {
  const rootRef = useRef<HTMLElement>(null);
  const timersRef = useRef<number[]>([]);
  const mountedRef = useRef(true);
  const resolvingRef = useRef(false);
  const autoResolveTimerRef = useRef<number | null>(null);

  const [phase, setPhase] = useState<DiagnosticPhase>("idle");
  const [visibleCount, setVisibleCount] = useState(0);
  const [fixedCount, setFixedCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [buttonVisual, setButtonVisual] = useState<ButtonVisual>("default");
  const hasPlayedRef = useRef(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const cancelAutoResolve = useCallback(() => {
    if (autoResolveTimerRef.current !== null) {
      window.clearTimeout(autoResolveTimerRef.current);
      autoResolveTimerRef.current = null;
    }
  }, []);

  const runResolutionSequence = useCallback(() => {
    if (resolvingRef.current || !mountedRef.current) return;
    resolvingRef.current = true;
    cancelAutoResolve();
    clearTimers(timersRef.current);

    setPhase("resolving");
    setProgress(0);
    setProgressLabel(getResolutionLabel(0));

    const resolveNext = (index: number) => {
      if (!mountedRef.current) return;

      schedule(
        () => {
          if (!mountedRef.current) return;
          const nextFixed = index + 1;
          setFixedCount(nextFixed);
          setProgress(getResolutionProgress(nextFixed));
          setProgressLabel(getResolutionLabel(nextFixed));

          if (nextFixed < DIAGNOSTIC_ITEM_COUNT) {
            resolveNext(nextFixed);
          } else {
            schedule(
              () => {
                if (!mountedRef.current) return;
                setPhase("resolved");
                setProgress(100);
                setProgressLabel("Conexão estabilizada");
                resolvingRef.current = false;
              },
              DIAGNOSTIC_TIMINGS.resolveItemInterval,
              timersRef.current
            );
          }
        },
        DIAGNOSTIC_TIMINGS.resolveItemInterval,
        timersRef.current
      );
    };

    resolveNext(0);
  }, [cancelAutoResolve]);

  const triggerResolution = useCallback(
    (fromAuto = false) => {
      if (!canStartResolution(phase) || resolvingRef.current) return;

      cancelAutoResolve();

      if (fromAuto) {
        setButtonVisual("pressing");
        schedule(
          () => {
            if (!mountedRef.current) return;
            setButtonVisual("optimizing");
            schedule(
              () => {
                if (!mountedRef.current) return;
                runResolutionSequence();
              },
              DIAGNOSTIC_TIMINGS.buttonPressDuration,
              timersRef.current
            );
          },
          120,
          timersRef.current
        );
      } else {
        setButtonVisual("optimizing");
        runResolutionSequence();
      }
    },
    [phase, cancelAutoResolve, runResolutionSequence]
  );

  const startDiagnosis = useCallback(
    (force = false) => {
      if ((!force && hasPlayedRef.current) || !mountedRef.current) return;
      hasPlayedRef.current = true;
      clearTimers(timersRef.current);
      cancelAutoResolve();

      if (reducedMotion) {
        setPhase("diagnosisComplete");
        setVisibleCount(DIAGNOSTIC_ITEM_COUNT);
        setFixedCount(0);
        setProgress(100);
        setProgressLabel(getDiagnosisLabel(DIAGNOSTIC_ITEM_COUNT));
        setButtonVisual("default");
        return;
      }

      setPhase("diagnosing");
      setVisibleCount(0);
      setFixedCount(0);
      setProgress(0);
      setProgressLabel(getDiagnosisLabel(0));
      setButtonVisual("default");

      const revealNext = (count: number) => {
        schedule(
          () => {
            if (!mountedRef.current) return;
            setVisibleCount(count);
            setProgress(getDiagnosisProgress(count));
            setProgressLabel(getDiagnosisLabel(count));

            if (count < DIAGNOSTIC_ITEM_COUNT) {
              revealNext(count + 1);
            } else {
              schedule(
                () => {
                  if (!mountedRef.current) return;
                  setPhase("diagnosisComplete");
                  autoResolveTimerRef.current = window.setTimeout(() => {
                    autoResolveTimerRef.current = null;
                    triggerResolutionRef.current(true);
                  }, DIAGNOSTIC_TIMINGS.autoResolveDelay);
                },
                DIAGNOSTIC_TIMINGS.diagnosisPause,
                timersRef.current
              );
            }
          },
          count === 0 ? DIAGNOSTIC_TIMINGS.startDelay : DIAGNOSTIC_TIMINGS.itemInterval,
          timersRef.current
        );
      };

      revealNext(1);
    },
    [reducedMotion, cancelAutoResolve]
  );

  const startDiagnosisRef = useRef(startDiagnosis);
  startDiagnosisRef.current = startDiagnosis;

  const triggerResolutionRef = useRef(triggerResolution);
  triggerResolutionRef.current = triggerResolution;

  const handleRestart = useCallback(() => {
    cancelAutoResolve();
    clearTimers(timersRef.current);
    resolvingRef.current = false;
    hasPlayedRef.current = false;
    setPhase("idle");
    setVisibleCount(0);
    setFixedCount(0);
    setProgress(0);
    setProgressLabel("");
    setButtonVisual("default");
    startDiagnosisRef.current(true);
  }, [cancelAutoResolve]);

  useEffect(() => {
    mountedRef.current = true;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(mq.matches);
    updateMotion();
    mq.addEventListener("change", updateMotion);

    const el = rootRef.current;
    if (!el) {
      return () => {
        mountedRef.current = false;
        cancelAutoResolve();
        clearTimers(timersRef.current);
        mq.removeEventListener("change", updateMotion);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayedRef.current) {
          startDiagnosisRef.current();
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);

    return () => {
      mountedRef.current = false;
      observer.disconnect();
      cancelAutoResolve();
      clearTimers(timersRef.current);
      mq.removeEventListener("change", updateMotion);
    };
  }, [cancelAutoResolve]);

  const isPositive =
    phase === "resolving" || phase === "resolved" || buttonVisual === "optimizing";

  const headerTitle =
    phase === "resolved"
      ? "Conexão estabilizada com a RedeSub"
      : phase === "resolving" || buttonVisual === "optimizing"
        ? "RedeSub estabilizando sua conexão"
        : "Analisando sua rotina conectada";

  const headerSubtitle =
    phase === "resolved"
      ? "Sua rotina está pronta para trabalhar, estudar, assistir e jogar com muito mais estabilidade."
      : phase === "diagnosing"
        ? "Estamos verificando os principais momentos do seu dia."
        : phase === "diagnosisComplete"
          ? "Encontramos 4 pontos de instabilidade na sua rotina."
          : phase === "resolving"
            ? "Corrigindo cada momento com fibra estável e suporte próximo."
            : "Estamos verificando os principais momentos do seu dia.";

  return (
    <article
      ref={rootRef}
      className={`connection-diagnostic ${isPositive ? "connection-diagnostic--positive" : ""} ${phase === "resolved" ? "connection-diagnostic--resolved" : ""}`}
      aria-live="polite"
      data-phase={phase}
    >
      <div className="connection-diagnostic__glow" aria-hidden="true" />

      <header className="connection-diagnostic__header">
        <h3 className="connection-diagnostic__title">{headerTitle}</h3>
        <p className="connection-diagnostic__subtitle">{headerSubtitle}</p>
      </header>

      <div className="connection-diagnostic__progress-wrap">
        <div
          className="connection-diagnostic__progress"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-label={progressLabel}
        >
          <div
            className="connection-diagnostic__progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="connection-diagnostic__progress-label">{progressLabel}</span>
      </div>

      <ul className="connection-diagnostic__list">
        {PROBLEM_TIMELINE.map((item, index) => {
          const visible = isItemVisible(index, visibleCount);
          const fixed = isItemFixed(index, fixedCount);
          const showGood = fixed || (reducedMotion && phase === "resolved");

          return (
            <li
              key={item.time}
              className={`connection-diagnostic__item ${visible ? "connection-diagnostic__item--visible" : ""} ${fixed ? "connection-diagnostic__item--fixed" : ""} ${phase === "resolving" && visible && !fixed ? "connection-diagnostic__item--fixing" : ""}`}
              aria-hidden={!visible}
            >
              <span className="connection-diagnostic__time">{item.time}</span>

              <span className="connection-diagnostic__icon" aria-hidden="true">
                {fixed ? <CheckIcon /> : <MomentIcon type={item.icon} />}
              </span>

              <div className="connection-diagnostic__content">
                <strong className="connection-diagnostic__item-title">
                  {showGood ? item.good.title : item.bad.title}
                </strong>
                <p className="connection-diagnostic__item-desc">
                  {showGood ? item.good.description : item.bad.description}
                </p>
              </div>

              <span
                className={`connection-diagnostic__badge ${fixed ? "connection-diagnostic__badge--ok" : "connection-diagnostic__badge--bad"}`}
              >
                {fixed && <span className="connection-diagnostic__badge-dot" aria-hidden="true" />}
                {showGood ? item.good.badge : item.bad.badge}
              </span>

              <span className="connection-diagnostic__shine" aria-hidden="true" />
            </li>
          );
        })}
      </ul>

      <footer className="connection-diagnostic__footer">
        {phase === "diagnosisComplete" && (
          <>
            <p className="connection-diagnostic__summary">
              Encontramos <strong>4 pontos de instabilidade</strong> na sua rotina.
            </p>
            <button
              type="button"
              className={`connection-diagnostic__resolve btn btn--primary btn--md ${buttonVisual === "pressing" ? "connection-diagnostic__resolve--pressing" : ""} ${buttonVisual === "optimizing" ? "connection-diagnostic__resolve--optimizing" : ""}`}
              onClick={() => triggerResolution(false)}
            >
              {buttonVisual === "optimizing"
                ? "Otimizando conexão..."
                : "Resolver com a RedeSub"}
              <span className="connection-diagnostic__ripple" aria-hidden="true" />
            </button>
          </>
        )}

        {phase === "resolved" && (
          <>
            <div className="connection-diagnostic__celebration" aria-hidden="true">
              <span className="connection-diagnostic__celebration-check">
                <CheckIcon />
              </span>
            </div>
            <a
              href={buildWhatsAppLink(WHATSAPP_MESSAGES.stabilityDemo)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary btn--lg connection-diagnostic__cta"
            >
              Quero uma internet assim
            </a>
            <button
              type="button"
              className="connection-diagnostic__restart"
              onClick={handleRestart}
            >
              Ver demonstração novamente
            </button>
          </>
        )}
      </footer>
    </article>
  );
}

function MomentIcon({ type }: { type: string }) {
  switch (type) {
    case "school":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 3 2 8l10 5 10-5-10-5Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
          <path d="M6 10v5c0 2 2.5 4 6 4s6-2 6-4v-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
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
          <path d="M15 10l6-3v10l-6-3" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
        </svg>
      );
  }
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
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
