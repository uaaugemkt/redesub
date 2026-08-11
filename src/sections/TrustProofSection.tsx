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
    <section className="trust-proof" aria-labelledby="trust-proof-title">
      <div className="container trust-proof__container">
        <Reveal>
          <header className="trust-proof__header">
            <span className="eyebrow">O dia a dia conectado</span>
            <h2 className="trust-proof__heading" id="trust-proof-title">
              Internet com atendimento próximo
            </h2>
            <p className="trust-proof__lead">
              Fibra estável e suporte humano para sua rotina.
            </p>
          </header>
        </Reveal>

        <ul className="trust-proof__grid">
          {BENEFITS.map((item, index) => (
            <li key={item.id} className="trust-proof__item">
              <Reveal delay={index * 60} className="trust-proof__reveal">
                <div className="trust-proof__icon" aria-hidden="true">
                  {item.icon}
                </div>
                <div className="trust-proof__body">
                  <h3 className="trust-proof__title">{item.title}</h3>
                  <p className="trust-proof__desc">{item.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
