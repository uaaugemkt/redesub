import WhatsAppButton from "../components/WhatsAppButton";
import Reveal from "../components/ui/Reveal";
import { useSelection } from "../context/SelectionContext";
import { WHATSAPP_MESSAGES } from "../lib/whatsapp";

export default function CoverageFinalCTASection() {
  const { regionName } = useSelection();

  return (
    <section className="coverage-cta section" aria-labelledby="coverage-cta-title">
      <div className="container">
        <Reveal>
          <div className="coverage-cta__card">
            <div className="coverage-cta__decor" aria-hidden="true">
              <div className="coverage-cta__glow coverage-cta__glow--blue" />
              <div className="coverage-cta__glow coverage-cta__glow--orange" />
              <div className="coverage-cta__fiber" />
            </div>

            <div className="coverage-cta__layout">
              <div className="coverage-cta__content">
                <span className="coverage-cta__eyebrow">Pronto para consultar?</span>
                <h2 className="coverage-cta__title" id="coverage-cta-title">
                  Fale com a equipe da RedeSub e confirme a cobertura no seu endereço.
                </h2>
                <p className="coverage-cta__text">
                  Atendimento direto pelo WhatsApp, com orientação regional e verificação
                  de disponibilidade.
                </p>
              </div>

              <div className="coverage-cta__action">
                <WhatsAppButton
                  message={WHATSAPP_MESSAGES.coverageConsult(regionName)}
                  label="Consultar disponibilidade pelo WhatsApp"
                  variant="primary"
                  size="lg"
                  className="coverage-cta__btn"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
