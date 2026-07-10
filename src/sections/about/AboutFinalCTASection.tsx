import WhatsAppButton from "../../components/WhatsAppButton";
import Reveal from "../../components/ui/Reveal";
import { useSelection } from "../../context/SelectionContext";
import { WHATSAPP_MESSAGES } from "../../lib/whatsapp";

export default function AboutFinalCTASection() {
  const { regionName } = useSelection();

  return (
    <section className="about-cta section" aria-labelledby="about-cta-title">
      <div className="container">
        <Reveal>
          <div className="about-cta__card">
            <div className="about-cta__decor" aria-hidden="true">
              <div className="about-cta__glow about-cta__glow--blue" />
              <div className="about-cta__glow about-cta__glow--orange" />
            </div>
            <div className="about-cta__layout">
              <div className="about-cta__content">
                <span className="about-cta__eyebrow">Conheça a RedeSub</span>
                <h2 className="about-cta__title" id="about-cta-title">
                  Conexão de fibra com atendimento próximo.
                </h2>
                <p className="about-cta__text">
                  Consulte cobertura, conheça os planos e fale diretamente com nossa
                  equipe.
                </p>
              </div>
              <div className="about-cta__action">
                <WhatsAppButton
                  message={WHATSAPP_MESSAGES.plansConsult(regionName)}
                  label="Falar com a RedeSub"
                  variant="primary"
                  size="lg"
                  className="about-cta__btn"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
