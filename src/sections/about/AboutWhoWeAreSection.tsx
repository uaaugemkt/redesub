import Reveal from "../../components/ui/Reveal";
import { ADDRESS } from "../../lib/constants";

export default function AboutWhoWeAreSection() {
  return (
    <section className="section section--soft about-who" aria-labelledby="about-who-title">
      <div className="container about-who__grid">
        <Reveal>
          <span className="eyebrow">Institucional</span>
          <h2 className="section__title" id="about-who-title">
            Quem somos
          </h2>
          <p className="section__desc">
            A RedeSub é uma operadora regional de internet por fibra, com atendimento
            voltado para famílias, profissionais e pequenos negócios. Nossa atuação
            combina proximidade, suporte acessível e soluções adaptadas à realidade de
            cada região.
          </p>
          <p className="about-who__note">
            A empresa possui base de atendimento em {ADDRESS.neighborhood},{" "}
            {ADDRESS.city}, e consulta disponibilidade conforme o endereço informado
            pelo cliente.
          </p>
        </Reveal>

        <Reveal delay={90}>
          <div className="about-who__panel">
            <div className="about-who__panel-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 21s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11Z"
                  stroke="currentColor"
                  strokeWidth="1.75"
                />
                <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.75" />
              </svg>
            </div>
            <h3>Atendimento com presença local</h3>
            <p>
              Comunicação direta, suporte pelo WhatsApp e orientação para escolher a
              solução mais adequada à sua rotina ou ao seu negócio.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
