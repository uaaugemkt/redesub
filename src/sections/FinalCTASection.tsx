import WhatsAppButton from "../components/WhatsAppButton";
import Reveal from "../components/ui/Reveal";
import { useSelection } from "../context/SelectionContext";
import { WHATSAPP_MESSAGES } from "../lib/whatsapp";

export default function FinalCTASection() {
  const { regionName } = useSelection();

  return (
    <section className="final-cta section" id="contato">
      <div className="container">
        <Reveal>
          <div className="final-cta__card">
            <div className="final-cta__decor" aria-hidden="true">
              <div className="final-cta__glow final-cta__glow--blue" />
              <div className="final-cta__glow final-cta__glow--orange" />
              <svg className="final-cta__signal" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="88"
                  fill="none"
                  stroke="rgba(3,161,253,0.14)"
                  strokeWidth="2"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="64"
                  fill="none"
                  stroke="rgba(3,161,253,0.2)"
                  strokeWidth="2"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="40"
                  fill="none"
                  stroke="rgba(255,133,5,0.18)"
                  strokeWidth="2"
                />
              </svg>
              <div className="final-cta__fiber" />
            </div>

            <div className="final-cta__layout">
              <div className="final-cta__content">
                <span className="final-cta__eyebrow">
                  Pronto para mudar sua experiência?
                </span>
                <h2 className="final-cta__title">
                  Leve mais velocidade e tranquilidade para sua casa.
                </h2>
                <p className="final-cta__text">
                  Fale com a equipe da RedeSub, consulte a disponibilidade na sua
                  região e encontre o plano ideal para sua rotina.
                </p>
                <p className="final-cta__hint">
                  Atendimento direto, rápido e regional.
                </p>
              </div>

              <div className="final-cta__cta">
                <WhatsAppButton
                  message={WHATSAPP_MESSAGES.plansConsult(regionName)}
                  label="Consultar planos pelo WhatsApp"
                  variant="primary"
                  size="lg"
                  className="final-cta__btn"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
