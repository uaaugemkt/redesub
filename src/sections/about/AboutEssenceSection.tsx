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
    text: "Atendimento regional e comunicação direta com cada cliente.",
    icon: <MapPinIcon />,
  },
  {
    id: "trust",
    title: "Confiança",
    text: "Orientação clara, transparente e responsável em cada contato.",
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
    text: "Acompanhamento próximo para encontrar soluções adequadas a cada situação.",
    icon: <CalendarCheckIcon />,
  },
];

export default function AboutEssenceSection() {
  return (
    <section className="section about-essence" aria-labelledby="about-essence-title">
      <div className="container">
        <Reveal>
          <header className="about-essence__header">
            <span className="eyebrow">Nossa essência</span>
            <h2 className="section__title" id="about-essence-title">
              O que orienta cada conexão.
            </h2>
            <p className="section__desc">
              Tecnologia, para a RedeSub, só faz sentido quando aproxima pessoas,
              facilita rotinas e ajuda cada cliente a seguir em frente com mais
              tranquilidade.
            </p>
          </header>
        </Reveal>

        <Reveal delay={60}>
          <div className="about-essence__panel">
            <div className="about-essence__pillars">
              <article className="about-essence__pillar">
                <span className="about-essence__pillar-label">Missão</span>
                <h3>Conectar com qualidade e proximidade.</h3>
                <p>
                  Oferecer internet de fibra e atendimento regional que contribuam para a
                  rotina de pessoas, famílias e negócios, com orientação clara e soluções
                  adequadas a cada necessidade.
                </p>
              </article>

              <div className="about-essence__pillar-divider" aria-hidden="true" />

              <article className="about-essence__pillar">
                <span className="about-essence__pillar-label">Visão</span>
                <h3>Ser reconhecida pela confiança construída em cada atendimento.</h3>
                <p>
                  Crescer de forma responsável nas regiões em que atuamos, fortalecendo
                  relações duradouras e tornando a experiência de estar conectado cada vez
                  mais simples e próxima.
                </p>
              </article>
            </div>

            <div className="about-essence__values-divider" aria-hidden="true" />

            <div className="about-essence__values">
              <h3 className="about-essence__values-title">
                Princípios que fazem parte da RedeSub.
              </h3>
              <ul className="about-essence__values-list">
                {VALUES.map((value) => (
                  <li key={value.id}>
                    <span className="about-essence__value-icon" aria-hidden="true">
                      {value.icon}
                    </span>
                    <div>
                      <strong>{value.title}</strong>
                      <p>{value.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
