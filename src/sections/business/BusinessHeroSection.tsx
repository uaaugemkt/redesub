import Breadcrumbs from "../../components/ui/Breadcrumbs";
import WhatsAppButton from "../../components/WhatsAppButton";
import { WHATSAPP_MESSAGES } from "../../lib/whatsapp";

const HEADER_PILLS = [
  "Alta velocidade",
  "Estabilidade",
  "Suporte especializado",
] as const;

export default function BusinessHeroSection() {
  return (
    <section className="biz-hero" aria-labelledby="business-hero-title">
      <div className="biz-hero__backdrop" aria-hidden="true">
        <span className="biz-hero__glow biz-hero__glow--warm" />
        <span className="biz-hero__glow biz-hero__glow--light" />
        <span className="biz-hero__overlay" />
      </div>

      <div className="container biz-hero__inner">
        <div className="biz-hero__content">
          <Breadcrumbs
            items={[
              { label: "Início", path: "/" },
              { label: "Para empresas" },
            ]}
          />

          <span className="biz-hero__eyebrow">Internet para empresas</span>
          <h1 className="biz-hero__title" id="business-hero-title">
            Internet empresarial para uma operação mais eficiente
          </h1>
          <p className="biz-hero__desc">
            Fibra para empresas que precisam de velocidade, estabilidade e
            suporte especializado no dia a dia.
          </p>

          <div className="biz-hero__ctas">
            <WhatsAppButton
              message={WHATSAPP_MESSAGES.businessInquiry()}
              label="Falar com atendimento"
              variant="primary"
              size="lg"
            />
            <a
              href="#planos-empresariais"
              className="btn btn--lg biz-hero__cta-secondary"
            >
              Conhecer planos
            </a>
          </div>

          <ul className="biz-hero__pills">
            {HEADER_PILLS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
