import { Link } from "react-router-dom";
import { getMediaAlt, MEDIA } from "../config/media";
import MediaImage from "../components/ui/MediaImage";
import Reveal from "../components/ui/Reveal";
import StaggerGroup from "../components/ui/StaggerGroup";

const USE_CASES = [
  {
    id: "work",
    title: "Trabalhar sem interrupções",
    text: "Reuniões, uploads e sistemas online com mais estabilidade para o home office.",
    image: MEDIA.homeOffice,
    altKey: "home-office" as const,
    size: "large",
  },
  {
    id: "study",
    title: "Estudar com estabilidade",
    text: "Aulas, pesquisas e conteúdos online sem travar no meio da rotina.",
    image: MEDIA.familyConnected,
    altKey: "family-connected" as const,
    size: "small",
  },
  {
    id: "play",
    title: "Jogar e assistir melhor",
    text: "Streaming e jogos com experiência mais fluida para a casa toda.",
    image: MEDIA.gamingStreaming,
    altKey: "gaming-streaming" as const,
    size: "small",
  },
  {
    id: "home",
    title: "Conectar toda a casa",
    text: "Vários dispositivos ao mesmo tempo, do celular à smart TV.",
    image: MEDIA.heroMain,
    altKey: "hero-main" as const,
    size: "medium",
  },
  {
    id: "business",
    title: "Manter o negócio funcionando",
    text: "Internet para operações do dia a dia com atendimento próximo.",
    image: MEDIA.smallBusiness,
    altKey: "small-business" as const,
    size: "medium",
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

        <div className="use-cases__editorial">
          <StaggerGroup className="use-cases__grid" staggerMs={100}>
            {USE_CASES.map((item) => (
              <article
                key={item.id}
                className={`use-cases__card use-cases__card--${item.size}`}
              >
                <MediaImage
                  src={item.image()}
                  alt={getMediaAlt(item.altKey, item.title)}
                  width={item.size === "large" ? 720 : 480}
                  height={item.size === "large" ? 540 : 360}
                  isPlaceholder
                  className="use-cases__image"
                />
                <div className="use-cases__body">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </StaggerGroup>
        </div>

        <div className="use-cases__cta">
          <Link to="/planos" className="btn btn--primary btn--md">
            Ver planos disponíveis
          </Link>
        </div>
      </div>
    </section>
  );
}
