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
              <span className="biz-final__glow biz-final__glow--warm" />
              <span className="biz-final__grid" />
            </div>

            <div className="biz-final__layout">
              <div className="biz-final__content">
                <span className="biz-final__eyebrow">RedeSub Empresas</span>
                <h2 className="biz-final__title" id="business-cta-title">
                  Sua empresa precisa de mais velocidade e estabilidade?
                </h2>
                <p className="biz-final__text">
                  Fale com a RedeSub e encontre a opção mais adequada para as
                  necessidades da sua empresa.
                </p>
              </div>

              <aside className="biz-final__aside" aria-label="Ações de contato">
                <span className="biz-final__aside-eyebrow">
                  Pronto para avançar?
                </span>
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
                    className="btn btn--outline-light btn--lg biz-final__cta-secondary"
                  >
                    Conhecer planos
                    <span className="biz-final__cta-arrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
