import Reveal from "../../components/ui/Reveal";

/**
 * Conteúdo pendente de aprovação (não exibir ao usuário):
 * - história oficial da empresa
 * - fotos da equipe
 * - missão e visão oficiais
 */
export default function AboutStorySection() {
  return (
    <section className="section section--soft about-story" aria-labelledby="about-story-title">
      <div className="container about-story__inner">
        <Reveal>
          <div className="about-story__card">
            <div className="about-story__decor" aria-hidden="true">
              <svg viewBox="0 0 200 200" className="about-story__signal">
                <circle cx="100" cy="100" r="88" fill="none" stroke="rgba(3,161,253,0.14)" strokeWidth="2" />
                <circle cx="100" cy="100" r="64" fill="none" stroke="rgba(3,161,253,0.2)" strokeWidth="2" />
                <circle cx="100" cy="100" r="40" fill="none" stroke="rgba(255,133,5,0.18)" strokeWidth="2" />
              </svg>
            </div>
            <div className="about-story__content">
              <span className="eyebrow">Nossa trajetória</span>
              <h2 className="section__title" id="about-story-title">
                Nossa história continua sendo construída
              </h2>
              <p className="section__desc">
                A RedeSub cresce com base no relacionamento com clientes, na expansão
                responsável e na busca por uma experiência de conexão cada vez melhor.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
