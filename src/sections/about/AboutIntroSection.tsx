import type { ReactNode } from "react";
import {
  MapPinIcon,
  MessageCircleIcon,
  WifiIcon,
} from "../../components/icons/BenefitIcons";
import Reveal from "../../components/ui/Reveal";

const HIGHLIGHTS: ReadonlyArray<{
  id: string;
  title: string;
  icon: ReactNode;
}> = [
  {
    id: "routine",
    title: "Conexão para a rotina.",
    icon: <WifiIcon />,
  },
  {
    id: "support",
    title: "Atendimento próximo.",
    icon: <MessageCircleIcon />,
  },
  {
    id: "solutions",
    title: "Soluções para casas e negócios.",
    icon: <MapPinIcon />,
  },
];

export default function AboutIntroSection() {
  return (
    <section className="section about-intro" aria-labelledby="about-intro-title">
      <div className="container about-intro__grid">
        <Reveal className="about-intro__copy">
          <h2 className="section__title" id="about-intro-title">
            Internet feita para a vida real
          </h2>
          <p className="section__desc">
            A RedeSub acredita que uma boa conexão precisa funcionar no trabalho,
            nos estudos, no entretenimento e nos momentos em família. Por isso,
            combina infraestrutura de fibra com atendimento regional e comunicação
            direta pelo WhatsApp.
          </p>
          <ul className="about-intro__highlights">
            {HIGHLIGHTS.map((item, index) => (
              <li key={item.id}>
                <Reveal delay={index * 70}>
                  <span className="about-intro__highlight">
                    <span className="about-intro__highlight-icon" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span>{item.title}</span>
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100} className="about-intro__visual">
          <div className="about-intro__image-wrap">
            <img
              src="/media/beneficios/Conectar-toda-a-casa.png"
              alt="Família conectada em casa com internet de fibra"
              loading="lazy"
              className="about-intro__image"
            />
            <div className="about-intro__image-glow" aria-hidden="true" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
