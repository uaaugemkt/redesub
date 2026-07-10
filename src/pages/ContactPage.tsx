import { Link } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import InternalHero from "../components/layout/InternalHero";
import PageContainer from "../components/layout/PageContainer";
import Reveal from "../components/ui/Reveal";
import WhatsAppButton from "../components/WhatsAppButton";
import RegionFilter from "../components/RegionFilter";
import { getMediaAlt, MEDIA } from "../config/media";
import { PAGE_META } from "../config/site";
import { ADDRESS, MAP, PHONE_DISPLAY } from "../lib/constants";
import { usePageMeta } from "../hooks/usePageMeta";
import { WHATSAPP_MESSAGES } from "../lib/whatsapp";

export default function ContactPage() {
  usePageMeta(PAGE_META.contato);

  return (
    <>
      <InternalHero
        eyebrow="Contato"
        title="Fale com a RedeSub"
        description="Contratação, disponibilidade e suporte pelo WhatsApp. Use o formulário para montar sua mensagem ou fale diretamente com nossa equipe."
        imageSrc={MEDIA.customerSupport()}
        imageAlt={getMediaAlt("customer-support", "Atendimento RedeSub")}
      >
        <WhatsAppButton size="lg" className="btn--hero" />
        <Link to="/suporte" className="btn btn--outline btn--lg">
          Preciso de suporte
        </Link>
      </InternalHero>

      <PageContainer>
        <Breadcrumbs items={[{ label: "Início", path: "/" }, { label: "Contato" }]} />
      </PageContainer>

      <section className="section">
        <div className="container contact-page__grid">
          <Reveal>
            <div className="contact-page__info">
              <h2 className="section__title">Canais de atendimento</h2>
              <dl className="contact-page__list">
                <div>
                  <dt>WhatsApp comercial</dt>
                  <dd>{PHONE_DISPLAY}</dd>
                </div>
                <div>
                  <dt>Endereço</dt>
                  <dd>
                    {ADDRESS.street}
                    <br />
                    {ADDRESS.neighborhood} · {ADDRESS.city}
                  </dd>
                </div>
              </dl>
              <div className="contact-page__actions">
                <WhatsAppButton
                  message={WHATSAPP_MESSAGES.availability}
                  label="Consultar disponibilidade"
                  variant="primary"
                  size="md"
                />
                <WhatsAppButton
                  message={WHATSAPP_MESSAGES.supportIssue({
                    reason: "Falar com o suporte",
                  })}
                  label="Suporte técnico"
                  variant="secondary"
                  size="md"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ContactForm className="contact-page__form" />
          </Reveal>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <Reveal>
            <h2 className="section__title">Regiões atendidas</h2>
            <RegionFilter id="contact-region-filter" />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="local__map-card">
            <iframe
              title="Localização RedeSub"
              src={MAP.embedUrl}
              loading="lazy"
              className="local__map-iframe"
            />
          </div>
        </div>
      </section>
    </>
  );
}
