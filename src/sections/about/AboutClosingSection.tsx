import WhatsAppButton from "../../components/WhatsAppButton";
import Reveal from "../../components/ui/Reveal";
import { WHATSAPP_MESSAGES } from "../../lib/whatsapp";

export default function AboutClosingSection() {
  return (
    <section className="about-closing section" aria-labelledby="about-closing-title">
      <div className="container">
        <Reveal>
          <div className="about-closing__panel">
            <div className="about-closing__decor" aria-hidden="true">
              <span className="about-closing__glow about-closing__glow--blue" />
              <span className="about-closing__glow about-closing__glow--orange" />
              <svg className="about-closing__lines" viewBox="0 0 800 200" preserveAspectRatio="none">
                <path
                  d="M0 120 C180 80, 320 160, 520 110 S720 90, 800 130"
                  stroke="rgba(3,161,253,0.18)"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
            </div>

            <div className="about-closing__layout">
              <div className="about-closing__content">
                <span className="about-closing__eyebrow">O que nos move</span>
                <h2 className="about-closing__title" id="about-closing-title">
                  Conectar pessoas é só o começo.
                </h2>
                <p className="about-closing__text">
                  A RedeSub acredita que uma conexão de verdade aproxima famílias, abre
                  caminhos para negócios e torna a rotina mais simples. É por isso que
                  unimos tecnologia, presença regional e atendimento humano em cada
                  contato.
                </p>
                <p className="about-closing__text about-closing__text--closing">
                  Seguimos construindo uma rede que cresce junto com as comunidades que
                  confiam em nosso trabalho — com responsabilidade, clareza e vontade de
                  fazer cada conexão valer a pena.
                </p>
              </div>

              <div className="about-closing__action">
                <WhatsAppButton
                  message={WHATSAPP_MESSAGES.aboutIntro()}
                  label="Falar com a RedeSub"
                  variant="primary"
                  size="lg"
                  className="about-closing__btn"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
