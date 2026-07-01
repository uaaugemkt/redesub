import { useEffect, useRef, useState } from "react";
import { PROBLEM_TIMELINE } from "../lib/constants";

const ICONS: Record<string, string> = {
  video: "📹",
  school: "📚",
  tv: "📺",
  game: "🎮",
};

const TIMING = {
  problem: 2500,
  transition: 1200,
  solution: 3000,
  stagger: 800,
} as const;

type Phase = "problem" | "transition" | "solution";
type TimelineItem = (typeof PROBLEM_TIMELINE)[number];

interface AutoCompareTimelineItemProps {
  item: TimelineItem;
  index: number;
}

export default function AutoCompareTimelineItem({
  item,
  index,
}: AutoCompareTimelineItemProps) {
  const { ref, inView } = useInView();
  const reducedMotion = usePrefersReducedMotion();
  const { phase, progress } = useAutoCompareCycle(index, inView && !reducedMotion);
  const displayPhase = reducedMotion ? "solution" : phase;

  const statusLabel =
    displayPhase === "problem"
      ? "Problema detectado"
      : displayPhase === "transition"
        ? "Estabilizando conexão..."
        : "RedeSub estabilizou";

  return (
    <div ref={ref} className="problem__moment">
      <div className="problem__moment-time">{item.time}</div>

      <div className="problem__moment-line" aria-hidden="true">
        <div className="problem__moment-dot" />
      </div>

      <article
        className={`auto-compare-card auto-compare-card--${displayPhase}`}
        aria-live="polite"
      >
        <div className="auto-compare-card__progress" aria-hidden="true">
          <div
            className="auto-compare-card__progress-fill"
            style={{ width: `${reducedMotion ? 100 : progress}%` }}
          />
        </div>

        <p className="auto-compare-card__status">{statusLabel}</p>

        <div className="auto-compare-card__shine" aria-hidden="true" />

        <div className="auto-compare-card__body">
          <div
            className={`auto-compare-card__panel auto-compare-card__panel--problem ${
              displayPhase !== "solution" ? "is-active" : ""
            }`}
          >
            <div className="auto-compare-card__top">
              <span className="auto-compare-card__icon" aria-hidden="true">
                {ICONS[item.icon]}
              </span>
              <span className="auto-compare-card__brand auto-compare-card__brand--problem">
                Outros provedores
              </span>
            </div>
            <div className="auto-compare-card__head">
              <h3>{item.bad.title}</h3>
              <span
                className={`auto-compare-card__tag auto-compare-card__tag--problem auto-compare-card__tag--${item.bad.badgeKey}`}
              >
                <span className="auto-compare-card__tag-dot" aria-hidden="true" />
                {item.bad.badge}
              </span>
            </div>
            <p>{item.bad.description}</p>
          </div>

          <div
            className={`auto-compare-card__panel auto-compare-card__panel--solution ${
              displayPhase === "solution" ? "is-active" : ""
            }`}
          >
            <div className="auto-compare-card__top">
              <span className="auto-compare-card__icon auto-compare-card__icon--check" aria-hidden="true">
                <CheckIcon />
              </span>
              <span className="auto-compare-card__brand auto-compare-card__brand--solution">
                RedeSub
              </span>
            </div>
            <div className="auto-compare-card__head">
              <h3>{item.good.title}</h3>
              <span className="auto-compare-card__tag auto-compare-card__tag--solution">
                {item.good.badge}
              </span>
            </div>
            <p>{item.good.description}</p>
          </div>
        </div>

        <div className="auto-compare-card__waves" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </article>
    </div>
  );
}

function useAutoCompareCycle(index: number, enabled: boolean) {
  const [phase, setPhase] = useState<Phase>("problem");
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    let cancelled = false;

    const clearRaf = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };

    const runCycle = () => {
      if (cancelled) return;

      setPhase("problem");
      setProgress(0);

      timers.push(
        setTimeout(() => {
          if (cancelled) return;

          setPhase("transition");
          const start = performance.now();

          const tick = (now: number) => {
            if (cancelled) return;
            const ratio = Math.min((now - start) / TIMING.transition, 1);
            setProgress(ratio * 100);

            if (ratio < 1) {
              rafRef.current = requestAnimationFrame(tick);
            } else {
              setPhase("solution");
              timers.push(
                setTimeout(() => {
                  if (!cancelled) runCycle();
                }, TIMING.solution)
              );
            }
          };

          rafRef.current = requestAnimationFrame(tick);
        }, TIMING.problem)
      );
    };

    timers.push(setTimeout(runCycle, index * TIMING.stagger));

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      clearRaf();
    };
  }, [index, enabled]);

  return { phase, progress };
}

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
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
