import Breadcrumbs from "../../components/ui/Breadcrumbs";
import WhatsAppButton from "../../components/WhatsAppButton";
import { WHATSAPP_MESSAGES } from "../../lib/whatsapp";

const HERO_PILLS = [
  "Alta velocidade",
  "Estabilidade",
  "Suporte especializado",
] as const;

const OFFICE_PHOTO = "/media/beneficios/Trabalhar-sem-interrupcoes.png";

export default function BusinessHeroSection() {
  return (
    <section className="biz-hero" aria-labelledby="business-hero-title">
      <div className="biz-hero__backdrop" aria-hidden="true">
        <span className="biz-hero__glow biz-hero__glow--orange" />
        <span className="biz-hero__glow biz-hero__glow--blue" />
        <span className="biz-hero__grid" />
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
            Conectividade para sua empresa crescer
          </h1>
          <p className="biz-hero__desc">
            Internet de fibra para negócios que precisam de velocidade,
            estabilidade e suporte.
          </p>

          <div className="biz-hero__ctas">
            <WhatsAppButton
              message={WHATSAPP_MESSAGES.businessInquiry()}
              label="Falar com atendimento"
              variant="primary"
              size="lg"
            />
            <a href="#planos-empresariais" className="btn btn--outline-light btn--lg">
              Conhecer planos
            </a>
          </div>

          <ul className="biz-hero__pills">
            {HERO_PILLS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="biz-hero__visual">
          <div className="biz-hero__frame">
            <img
              src={OFFICE_PHOTO}
              alt="Profissional em ambiente de trabalho conectado com a RedeSub"
              className="biz-hero__image"
              width={960}
              height={720}
              decoding="async"
              fetchPriority="high"
            />
            <div className="biz-hero__frame-glow" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
