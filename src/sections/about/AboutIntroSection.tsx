import type { ReactNode } from "react";
import {
  MapPinIcon,
  MessageCircleIcon,
  WifiIcon,
} from "../../components/icons/BenefitIcons";
import Reveal from "../../components/ui/Reveal";

const PRINCIPLES: ReadonlyArray<{
  id: string;
  label: string;
  icon: ReactNode;
}> = [
  {
    id: "routine",
    label: "Conexão para a rotina.",
    icon: <WifiIcon />,
  },
  {
    id: "support",
    label: "Atendimento que orienta.",
    icon: <MessageCircleIcon />,
  },
  {
    id: "solutions",
    label: "Soluções para casas e negócios.",
    icon: <MapPinIcon />,
  },
];

export default function AboutIntroSection() {
  return (
    <section className="section about-intro" aria-labelledby="about-intro-title">
      <div className="container about-intro__grid">
        <Reveal className="about-intro__copy">
          <span className="eyebrow">A RedeSub</span>
          <h2 className="section__title" id="about-intro-title">
            Internet feita para a vida real.
          </h2>
          <p className="section__desc">
            A RedeSub conecta pessoas, famílias e negócios com internet de fibra e
            atendimento regional. Mais do que entregar velocidade, buscamos entender cada
            rotina e orientar cada cliente com clareza, proximidade e responsabilidade.
          </p>
          <p className="about-intro__secondary">
            Porque uma boa conexão precisa funcionar nos momentos que realmente importam:
            no trabalho, nos estudos, no atendimento aos clientes e no tempo compartilhado
            em família.
          </p>
          <ul className="about-intro__principles">
            {PRINCIPLES.map((item) => (
              <li key={item.id}>
                <span className="about-intro__principle-icon" aria-hidden="true">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100} className="about-intro__visual">
          <div className="about-intro__image-wrap">
            <img
              src="/media/beneficios/Conectar-toda-a-casa.png"
              alt="Família conectada em casa com internet de fibra da RedeSub"
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
