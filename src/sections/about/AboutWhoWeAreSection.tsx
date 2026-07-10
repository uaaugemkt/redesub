import Reveal from "../../components/ui/Reveal";

export default function AboutWhoWeAreSection() {
  return (
    <section className="section section--soft about-who" aria-labelledby="about-who-title">
      <div className="container about-who__inner">
        <Reveal>
          <span className="eyebrow">Quem somos</span>
          <h2 className="section__title" id="about-who-title">
            Uma provedora regional que escolheu estar perto.
          </h2>
          <p className="section__desc">
            A RedeSub nasceu para atender comunidades que precisam de conexão de
            qualidade e de uma equipe acessível quando surge uma dúvida, uma necessidade
            ou uma nova oportunidade.
          </p>
          <p className="section__desc">
            Atendemos residências, profissionais e pequenos negócios com uma comunicação
            direta, orientação próxima e soluções avaliadas conforme cada endereço e
            perfil de uso.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <aside className="about-who__aside" aria-labelledby="about-who-aside-title">
            <span className="about-who__aside-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 21s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11Z"
                  stroke="currentColor"
                  strokeWidth="1.75"
                />
                <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.75" />
              </svg>
            </span>
            <div>
              <h3 id="about-who-aside-title">Presença que faz diferença.</h3>
              <p>
                Estar perto é conhecer a realidade de cada região, falar de forma simples
                e ajudar o cliente a tomar uma decisão mais segura.
              </p>
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
