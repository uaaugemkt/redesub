import { useEffect, useRef, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/ui/Reveal";
import {
  MessageCircleIcon,
  WifiIcon,
} from "../components/icons/BenefitIcons";
import { GaugeIcon } from "../components/icons/BusinessImpactIcons";

const BENEFITS = [
  {
    id: "velocidade",
    title: "Alta velocidade",
    text: "Mais performance para sua rotina conectada.",
    icon: "gauge" as const,
  },
  {
    id: "estavel",
    title: "Conexão estável",
    text: "Internet preparada para acompanhar seus dispositivos no dia a dia.",
    icon: "wifi" as const,
  },
  {
    id: "simetrica",
    title: "Velocidade simétrica",
    text: "Mais equilíbrio de desempenho para enviar e receber dados.",
    icon: "symmetric" as const,
  },
  {
    id: "suporte",
    title: "Suporte rápido",
    text: "Atendimento próximo quando você precisar.",
    icon: "support" as const,
  },
] as const;

function SymmetricSpeedIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 7h10M17 7l-3-3M17 7l-3 3"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 17H7M7 17l3-3M7 17l3 3"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BenefitIcon({ type }: { type: (typeof BENEFITS)[number]["icon"] }) {
  if (type === "gauge") return <GaugeIcon />;
  if (type === "wifi") return <WifiIcon />;
  if (type === "support") return <MessageCircleIcon />;
  return <SymmetricSpeedIcon />;
}

function ConnectedFloatingLayer() {
  return (
    <div className="connected-floating-layer" aria-hidden="true">
      {/* A — Wi-Fi abstrato */}
      <span className="connected-float connected-float--wifi connected-float--a">
        <svg viewBox="0 0 64 64" fill="none">
          <path
            d="M16 28c8.8-8.8 23.2-8.8 32 0"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M22 35c5.5-5.5 14.5-5.5 20 0"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M28 42c2.2-2.2 5.8-2.2 8 0"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="32" cy="48" r="2.4" fill="currentColor" />
        </svg>
      </span>

      {/* B — pontos conectados */}
      <span className="connected-float connected-float--nodes connected-float--b">
        <svg viewBox="0 0 80 56" fill="none">
          <path
            d="M12 40 L28 18 L52 28 L68 12"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="40" r="3.2" fill="currentColor" />
          <circle cx="28" cy="18" r="3.6" fill="currentColor" />
          <circle cx="52" cy="28" r="3" fill="currentColor" />
          <circle cx="68" cy="12" r="2.6" fill="currentColor" />
        </svg>
      </span>

      {/* C — anel */}
      <span className="connected-float connected-float--ring connected-float--c" />

      {/* C2 — anel menor */}
      <span className="connected-float connected-float--ring-sm connected-float--a connected-float--mobile-hide" />

      {/* D — cruz + pontos luminosos */}
      <span className="connected-float connected-float--sparkles connected-float--b">
        <i className="connected-float__plus" />
        <i className="connected-float__dot connected-float__dot--1" />
        <i className="connected-float__dot connected-float__dot--2" />
        <i className="connected-float__dot connected-float__dot--3" />
      </span>

      {/* E — onda */}
      <span className="connected-float connected-float--wave connected-float--c connected-float--mobile-hide">
        <svg viewBox="0 0 120 40" fill="none">
          <path
            d="M4 28 C24 8, 44 8, 64 28 S104 48, 116 20"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </span>

      {/* F — diamante */}
      <span className="connected-float connected-float--diamond connected-float--a" />

      {/* F2 — quadrado arredondado */}
      <span className="connected-float connected-float--square connected-float--b connected-float--mobile-hide" />

      {/* Canto superior direito — círculos concêntricos */}
      <span className="connected-float connected-float--corner-tr connected-float--spin">
        <svg viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="48" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="60" cy="60" r="34" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="60" cy="60" r="20" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="60" cy="60" r="6" fill="currentColor" opacity="0.55" />
        </svg>
      </span>

      {/* Canto inferior esquerdo — padrão de conexão */}
      <span className="connected-float connected-float--corner-bl connected-float--c">
        <svg viewBox="0 0 100 80" fill="none">
          <path
            d="M10 70 V40 H40 V18 H70"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
          <circle cx="10" cy="70" r="3" fill="currentColor" />
          <circle cx="40" cy="40" r="3" fill="currentColor" />
          <circle cx="40" cy="18" r="2.5" fill="currentColor" />
          <circle cx="70" cy="18" r="3.2" fill="currentColor" />
          <path
            d="M70 18 L88 30 M70 18 L88 8"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </div>
  );
}

export default function UseCasesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    let frame = 0;
    let pendingX = 50;
    let pendingY = 40;
    let dirty = false;

    const flush = () => {
      frame = 0;
      if (!dirty) return;
      dirty = false;
      section.style.setProperty("--mouse-x", `${pendingX}%`);
      section.style.setProperty("--mouse-y", `${pendingY}%`);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      pendingX = ((event.clientX - rect.left) / rect.width) * 100;
      pendingY = ((event.clientY - rect.top) / rect.height) * 100;
      dirty = true;
      if (!frame) frame = requestAnimationFrame(flush);
    };

    section.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      section.removeEventListener("pointermove", onPointerMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="use-cases use-cases--connected section"
      id="cenarios"
      style={
        {
          "--mouse-x": "50%",
          "--mouse-y": "40%",
        } as CSSProperties
      }
    >
      <div className="use-cases__fx" aria-hidden="true">
        <span className="use-cases__blob use-cases__blob--1" />
        <span className="use-cases__blob use-cases__blob--2" />
        <span className="use-cases__blob use-cases__blob--3" />
        <span className="use-cases__mouse-glow" />
        <ConnectedFloatingLayer />
      </div>

      <div className="container use-cases__inner">
        <Reveal>
          <div className="section__header use-cases__header">
            <span className="eyebrow">Vida conectada</span>
            <h2 className="section__title">Internet que acompanha sua rotina</h2>
            <p className="section__desc">
              Conectividade para trabalhar, estudar, assistir e navegar com mais tranquilidade.
            </p>
          </div>
        </Reveal>

        <ul className="use-cases__features">
          {BENEFITS.map((item, index) => (
            <li key={item.id} className="use-cases__feature">
              <Reveal delay={index * 70}>
                <div className="use-cases__feature-row">
                  <span className="use-cases__feature-icon" aria-hidden="true">
                    <BenefitIcon type={item.icon} />
                  </span>
                  <div className="use-cases__feature-body">
                    <h3 className="use-cases__feature-title">{item.title}</h3>
                    <p className="use-cases__feature-text">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={180}>
          <div className="use-cases__actions">
            <Link to="/#planos" className="btn btn--white btn--lg use-cases__cta">
              Ver planos disponíveis
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
