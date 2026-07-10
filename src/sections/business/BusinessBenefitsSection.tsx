import type { ReactNode } from "react";
import {
  CalendarCheckIcon,
  MapPinIcon,
  MessageCircleIcon,
  WifiIcon,
} from "../../components/icons/BenefitIcons";
import Reveal from "../../components/ui/Reveal";

const BENEFITS: ReadonlyArray<{
  id: string;
  title: string;
  text: string;
  icon: ReactNode;
}> = [
  {
    id: "viability",
    title: "Consulta de viabilidade",
    text: "Análise conforme região e endereço do estabelecimento.",
    icon: <MapPinIcon />,
  },
  {
    id: "regional",
    title: "Atendimento regional",
    text: "Comunicação próxima com equipe que conhece a área.",
    icon: <MessageCircleIcon />,
  },
  {
    id: "guidance",
    title: "Orientação comercial",
    text: "Indicação de solução alinhada ao perfil de uso.",
    icon: <CalendarCheckIcon />,
  },
  {
    id: "fit",
    title: "Solução conforme necessidade",
    text: "Avaliação do que o negócio realmente precisa.",
    icon: <WifiIcon />,
  },
  {
    id: "support",
    title: "Suporte direto",
    text: "Contato pelo WhatsApp para dúvidas e orientações.",
    icon: <MessageCircleIcon />,
  },
  {
    id: "online",
    title: "Conectividade para operações online",
    text: "Internet para sistemas, atendimento e rotina digital.",
    icon: <WifiIcon />,
  },
];

export default function BusinessBenefitsSection() {
  return (
    <section className="section business-benefits" aria-labelledby="business-benefits-title">
      <div className="container">
        <Reveal>
          <header className="business-benefits__header">
            <span className="eyebrow">Benefícios</span>
            <h2 className="section__title" id="business-benefits-title">
              O que a RedeSub oferece para o seu negócio
            </h2>
          </header>
        </Reveal>

        <div className="business-benefits__grid">
          {BENEFITS.map((item, index) => (
            <Reveal key={item.id} delay={index * 55}>
              <article className="business-benefits__card">
                <span className="business-benefits__icon" aria-hidden="true">
                  {item.icon}
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
