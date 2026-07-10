import type { ReactNode } from "react";
import {
  CalendarCheckIcon,
  MapPinIcon,
  MessageCircleIcon,
  WifiIcon,
} from "../../components/icons/BenefitIcons";
import Reveal from "../../components/ui/Reveal";

const VALUES: ReadonlyArray<{
  id: string;
  title: string;
  text: string;
  icon: ReactNode;
}> = [
  {
    id: "proximity",
    title: "Proximidade",
    text: "Atendimento regional e comunicação direta com a equipe.",
    icon: <MapPinIcon />,
  },
  {
    id: "trust",
    title: "Confiança",
    text: "Orientação clara antes, durante e depois da contratação.",
    icon: <MessageCircleIcon />,
  },
  {
    id: "technology",
    title: "Tecnologia",
    text: "Internet de fibra preparada para diferentes formas de uso.",
    icon: <WifiIcon />,
  },
  {
    id: "commitment",
    title: "Compromisso",
    text: "Acompanhamento para encontrar soluções adequadas a cada cliente.",
    icon: <CalendarCheckIcon />,
  },
];

export default function AboutValuesSection() {
  return (
    <section className="section section--muted about-values" aria-labelledby="about-values-title">
      <div className="container">
        <Reveal>
          <header className="about-values__header">
            <span className="eyebrow">Nossos pilares</span>
            <h2 className="section__title" id="about-values-title">
              Valores
            </h2>
          </header>
        </Reveal>

        <div className="about-values__grid">
          {VALUES.map((value, index) => (
            <Reveal key={value.id} delay={index * 60}>
              <article className="about-values__card">
                <span className="about-values__icon" aria-hidden="true">
                  {value.icon}
                </span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
