import { MessageCircleIcon } from "../../components/icons/BenefitIcons";
import {
  BuildingIcon,
  HeadphonesIcon,
} from "../../components/icons/BusinessImpactIcons";
import Reveal from "../../components/ui/Reveal";
import WhatsAppButton from "../../components/WhatsAppButton";
import { WHATSAPP_MESSAGES } from "../../lib/whatsapp";

const POINTS = [
  {
    id: "rapido",
    title: "Atendimento rápido e eficiente",
    icon: <MessageCircleIcon />,
  },
  {
    id: "especializado",
    title: "Suporte especializado",
    icon: <HeadphonesIcon />,
  },
  {
    id: "solucoes",
    title: "Soluções para empresas",
    icon: <BuildingIcon />,
  },
] as const;

const OFFICE_PHOTO = "/media/beneficios/Trabalhar-sem-interrupcoes.png";

/** Atendimento empresarial — único CTA intermediário da página. */
export default function BusinessProcessSection() {
  return (
    <section
      className="biz-support section"
      aria-labelledby="business-process-title"
    >
      <div className="container">
        <div className="biz-support__layout">
          <Reveal className="biz-support__copy">
            <span className="eyebrow">Atendimento</span>
            <h2 className="biz-support__title" id="business-process-title">
              Atendimento para sua empresa
            </h2>
            <p className="biz-support__desc">
              Fale com a RedeSub para consultar disponibilidade e encontrar a
              opção mais adequada para o seu negócio.
            </p>

            <ul className="biz-support__list">
              {POINTS.map((item) => (
                <li key={item.id}>
                  <span className="biz-support__icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>

            <WhatsAppButton
              message={WHATSAPP_MESSAGES.businessInquiry()}
              label="Falar com atendimento"
              variant="primary"
              size="lg"
              className="biz-support__cta"
            />
          </Reveal>

          <Reveal className="biz-support__media" delay={80}>
            <figure className="biz-support__figure">
              <img
                src={OFFICE_PHOTO}
                alt="Atendimento RedeSub para empresas"
                className="biz-support__image"
                width={900}
                height={700}
                loading="lazy"
                decoding="async"
              />
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
