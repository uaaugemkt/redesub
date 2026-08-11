import Reveal from "../../components/ui/Reveal";
import WhatsAppButton from "../../components/WhatsAppButton";
import { WHATSAPP_MESSAGES } from "../../lib/whatsapp";

export default function BusinessFinalCTASection() {
  return (
    <section className="biz-final section" aria-labelledby="business-cta-title">
      <div className="container">
        <Reveal>
          <div className="biz-final__panel">
            <div className="biz-final__decor" aria-hidden="true">
              <span className="biz-final__glow biz-final__glow--orange" />
              <span className="biz-final__glow biz-final__glow--navy" />
              <span className="biz-final__grid" />
            </div>

            <div className="biz-final__layout">
              <div className="biz-final__content">
                <span className="biz-final__eyebrow">RedeSub Empresas</span>
                <h2 className="biz-final__title" id="business-cta-title">
                  Sua empresa precisa de uma conexão preparada para crescer?
                </h2>
                <p className="biz-final__text">
                  Fale com a RedeSub e consulte a solução mais adequada para o
                  seu negócio.
                </p>
                <div className="biz-final__actions">
                  <WhatsAppButton
                    message={WHATSAPP_MESSAGES.businessInquiry()}
                    label="Falar com atendimento"
                    variant="primary"
                    size="lg"
                    className="biz-final__btn"
                  />
                  <a
                    href="#planos-empresariais"
                    className="btn btn--outline-light btn--lg"
                  >
                    Conhecer planos
                  </a>
                </div>
              </div>

              <div className="biz-final__visual" aria-hidden="true">
                <div className="biz-final__orb" />
                <div className="biz-final__card">
                  <span className="biz-final__card-label">Fibra</span>
                  <strong>Empresas</strong>
                  <span className="biz-final__card-hint">
                    Velocidade · Estabilidade · Suporte
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
