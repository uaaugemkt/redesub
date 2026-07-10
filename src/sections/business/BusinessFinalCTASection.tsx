import WhatsAppButton from "../../components/WhatsAppButton";
import Reveal from "../../components/ui/Reveal";
import { useSelection } from "../../context/SelectionContext";
import { WHATSAPP_MESSAGES } from "../../lib/whatsapp";

export default function BusinessFinalCTASection() {
  const { regionName } = useSelection();

  return (
    <section className="business-cta section" aria-labelledby="business-cta-title">
      <div className="container">
        <Reveal>
          <div className="business-cta__card">
            <div className="business-cta__decor" aria-hidden="true">
              <div className="business-cta__glow business-cta__glow--blue" />
              <div className="business-cta__glow business-cta__glow--orange" />
            </div>
            <div className="business-cta__layout">
              <div className="business-cta__content">
                <span className="business-cta__eyebrow">Soluções para o seu negócio</span>
                <h2 className="business-cta__title" id="business-cta-title">
                  Fale com a equipe e encontre a solução adequada para sua operação.
                </h2>
                <p className="business-cta__text">
                  Informe sua região, endereço e como sua empresa utiliza a internet.
                </p>
              </div>
              <div className="business-cta__action">
                <WhatsAppButton
                  message={WHATSAPP_MESSAGES.businessInquiry({ region: regionName })}
                  label="Consultar pelo WhatsApp"
                  variant="primary"
                  size="lg"
                  className="business-cta__btn"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
