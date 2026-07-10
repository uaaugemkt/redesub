import type { ReactNode } from "react";
import {
  CalendarCheckIcon,
  MapPinIcon,
  MessageCircleIcon,
  WifiIcon,
} from "../components/icons/BenefitIcons";
import Reveal from "../components/ui/Reveal";

const BENEFITS: ReadonlyArray<{
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
}> = [
  {
    id: "local-support",
    title: "Atendimento local",
    description: "Equipe que conhece a região",
    icon: <MapPinIcon />,
  },
  {
    id: "fiber",
    title: "Fibra óptica",
    description: "Conexão estável para o dia a dia",
    icon: <WifiIcon />,
  },
  {
    id: "whatsapp-support",
    title: "Suporte próximo",
    description: "Fale com a gente pelo WhatsApp",
    icon: <MessageCircleIcon />,
  },
  {
    id: "installation",
    title: "Instalação sob consulta",
    description: "Confirme disponibilidade no seu endereço",
    icon: <CalendarCheckIcon />,
  },
];

export default function TrustProofSection() {
  return (
    <section className="trust-proof" aria-label="Diferenciais RedeSub">
      <div className="container trust-proof__container">
        <ul className="trust-proof__grid">
          {BENEFITS.map((item, index) => (
            <li key={item.id} className="trust-proof__cell">
              <Reveal delay={index * 60} className="trust-proof__reveal">
                <article className="trust-proof__card">
                  <div className="trust-proof__icon" aria-hidden="true">
                    {item.icon}
                  </div>
                  <div className="trust-proof__body">
                    <h3 className="trust-proof__title">{item.title}</h3>
                    <p className="trust-proof__desc">{item.description}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
