import type { ReactNode } from "react";
import { MessageCircleIcon, WifiIcon } from "../../components/icons/BenefitIcons";
import {
  GaugeIcon,
  ShoppingCartIcon,
} from "../../components/icons/BusinessImpactIcons";
import Reveal from "../../components/ui/Reveal";

const HIGHLIGHTS: ReadonlyArray<{
  id: string;
  title: string;
  text: string;
  icon: ReactNode;
}> = [
  {
    id: "velocidade",
    title: "Alta velocidade",
    text: "Mais performance para seu negócio.",
    icon: <GaugeIcon />,
  },
  {
    id: "estabilidade",
    title: "Estabilidade",
    text: "Conexão confiável para a rotina da sua empresa.",
    icon: <WifiIcon />,
  },
  {
    id: "suporte",
    title: "Suporte especializado",
    text: "Atendimento rápido e eficiente.",
    icon: <MessageCircleIcon />,
  },
  {
    id: "solucoes",
    title: "Soluções para empresas",
    text: "Conectividade para diferentes tipos de negócio.",
    icon: <ShoppingCartIcon />,
  },
];

export default function BusinessBenefitsSection() {
  return (
    <section
      className="biz-highlights"
      aria-label="Diferenciais para empresas"
    >
      <div className="container">
        <div className="biz-highlights__grid">
          {HIGHLIGHTS.map((item, index) => (
            <Reveal key={item.id} delay={index * 50}>
              <article className="biz-highlights__card">
                <span className="biz-highlights__icon" aria-hidden="true">
                  {item.icon}
                </span>
                <h2 className="biz-highlights__title">{item.title}</h2>
                <p className="biz-highlights__text">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
