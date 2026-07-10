import { Link } from "react-router-dom";
import Reveal from "../components/ui/Reveal";
import StaggerGroup from "../components/ui/StaggerGroup";

const USE_CASE_IMAGES = {
  work: "/media/beneficios/Trabalhar-sem-interrupcoes.png",
  home: "/media/beneficios/Conectar-toda-a-casa.png",
  study: "/media/beneficios/Estudar-com-estabilidade.png",
  play: "/media/beneficios/Jogar-e-assistir-melhor.png",
  business: "/media/beneficios/Manter-o-negocio-funcionando.png",
} as const;

const USE_CASES = [
  {
    id: "work",
    title: "Trabalhar sem interrupções",
    text: "Reuniões, uploads e sistemas online com mais estabilidade para o home office.",
    variant: "featured" as const,
    gridClass: "use-cases__card--work",
    image: USE_CASE_IMAGES.work,
    imageAlt: "Pessoa trabalhando em casa com notebook e celular",
    objectPosition: "center 30%",
  },
  {
    id: "home",
    title: "Conectar toda a casa",
    text: "Vários dispositivos ao mesmo tempo, do celular à smart TV.",
    variant: "accent" as const,
    gridClass: "use-cases__card--home",
    image: USE_CASE_IMAGES.home,
    imageAlt: "Família conectada em casa com vários dispositivos",
    objectPosition: "center center",
  },
  {
    id: "study",
    title: "Estudar com estabilidade",
    text: "Aulas, pesquisas e conteúdos online sem travar no meio da rotina.",
    variant: "compact" as const,
    gridClass: "use-cases__card--study",
    image: USE_CASE_IMAGES.study,
    imageAlt: "Estudante em aula online com notebook",
    objectPosition: "center center",
  },
  {
    id: "play",
    title: "Jogar e assistir melhor",
    text: "Streaming e jogos com experiência mais fluida para a casa toda.",
    variant: "compact" as const,
    gridClass: "use-cases__card--play",
    image: USE_CASE_IMAGES.play,
    imageAlt: "Pessoa assistindo streaming e usando entretenimento digital",
    objectPosition: "center center",
  },
  {
    id: "business",
    title: "Manter o negócio funcionando",
    text: "Internet para operações do dia a dia com atendimento próximo.",
    variant: "compact" as const,
    gridClass: "use-cases__card--business",
    image: USE_CASE_IMAGES.business,
    imageAlt: "Profissional em pequeno negócio utilizando internet no dia a dia",
    objectPosition: "center center",
  },
] as const;

export default function UseCasesSection() {
  return (
    <section className="use-cases section" id="cenarios">
      <div className="container">
        <Reveal>
          <div className="section__header">
            <span className="eyebrow">Vida conectada</span>
            <h2 className="section__title">Internet que acompanha sua rotina</h2>
            <p className="section__desc">
              Da sala ao escritório, da aula ao streaming — conexão pensada para
              o jeito real de usar internet no dia a dia.
            </p>
          </div>
        </Reveal>

        <StaggerGroup className="use-cases__grid" staggerMs={90}>
          {USE_CASES.map((item) => (
            <article
              key={item.id}
              className={`use-cases__card use-cases__card--${item.variant} ${item.gridClass}`}
            >
              <div className="use-cases__media">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  width={item.variant === "featured" ? 720 : 480}
                  height={item.variant === "featured" ? 480 : 320}
                  loading="lazy"
                  decoding="async"
                  className="use-cases__photo"
                  style={{ objectPosition: item.objectPosition }}
                />
              </div>

              <div className="use-cases__body">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </StaggerGroup>

        <Reveal delay={120}>
          <div className="use-cases__cta">
            <Link to="/planos" className="btn btn--primary btn--md">
              Ver planos disponíveis
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
