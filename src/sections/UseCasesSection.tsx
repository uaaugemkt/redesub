import { useEffect, useRef, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import ConnectedSurfaceFx from "../components/ui/ConnectedSurfaceFx";
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
      <ConnectedSurfaceFx />

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
