import type { ReactNode } from "react";
import { MessageCircleIcon } from "../../components/icons/BenefitIcons";
import {
  BuildingIcon,
  HeadphonesIcon,
} from "../../components/icons/BusinessImpactIcons";
import Reveal from "../../components/ui/Reveal";
import WhatsAppButton from "../../components/WhatsAppButton";
import { WHATSAPP_MESSAGES } from "../../lib/whatsapp";

const SUPPORT_CARDS: ReadonlyArray<{
  id: string;
  title: string;
  text: string;
  icon: ReactNode;
}> = [
  {
    id: "rapido",
    title: "Atendimento rápido e eficiente",
    text: "Agilidade para orientar sua empresa e esclarecer suas dúvidas.",
    icon: <MessageCircleIcon />,
  },
  {
    id: "especializado",
    title: "Suporte especializado",
    text: "Atendimento preparado para as necessidades do seu negócio.",
    icon: <HeadphonesIcon />,
  },
  {
    id: "solucoes",
    title: "Soluções para empresas",
    text: "Opções adequadas a diferentes estruturas e operações.",
    icon: <BuildingIcon />,
  },
];

/** Atendimento empresarial — único CTA intermediário da página. */
export default function BusinessProcessSection() {
  return (
    <section
      className="biz-support section"
      aria-labelledby="business-process-title"
    >
      <div className="container biz-support__inner">
        <Reveal>
          <header className="biz-support__header">
            <span className="eyebrow">Atendimento</span>
            <h2 className="biz-support__title" id="business-process-title">
              Suporte próximo para sua empresa
            </h2>
            <p className="biz-support__desc">
              Fale com a RedeSub para consultar disponibilidade, conhecer as
              opções para o seu endereço e esclarecer suas dúvidas.
            </p>
          </header>
        </Reveal>

        <div className="biz-support__cards">
          {SUPPORT_CARDS.map((item, index) => (
            <Reveal key={item.id} delay={index * 55}>
              <article className="biz-support__card">
                <span className="biz-support__card-icon" aria-hidden="true">
                  {item.icon}
                </span>
                <h3 className="biz-support__card-title">{item.title}</h3>
                <p className="biz-support__card-text">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="biz-support__actions">
            <WhatsAppButton
              message={WHATSAPP_MESSAGES.businessInquiry()}
              label="Falar com atendimento"
              variant="primary"
              size="lg"
              className="biz-support__cta"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
