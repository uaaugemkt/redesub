import { Link } from "react-router-dom";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import InternalHero from "../components/layout/InternalHero";
import PageContainer from "../components/layout/PageContainer";
import Reveal from "../components/ui/Reveal";
import WhatsAppButton from "../components/WhatsAppButton";
import { getMediaAlt, MEDIA } from "../config/media";
import { PAGE_META } from "../config/site";
import { ADDRESS } from "../lib/constants";
import { usePageMeta } from "../hooks/usePageMeta";

const VALUES = [
  {
    title: "Proximidade",
    text: "Atendimento regional com equipe acessível pelo WhatsApp e presença local.",
  },
  {
    title: "Confiança",
    text: "Internet de fibra com suporte próximo para resolver situações do dia a dia.",
  },
  {
    title: "Tecnologia",
    text: "Conexão pensada para casas conectadas, trabalho remoto e entretenimento.",
  },
  {
    title: "Compromisso",
    text: "Acompanhamento do cliente antes, durante e depois da contratação.",
  },
] as const;

/** Blocos preparados para conteúdo institucional aprovado pelo cliente */
const PENDING_BLOCKS = [
  { id: "historia", label: "História da empresa" },
  { id: "missao", label: "Missão" },
  { id: "visao", label: "Visão" },
  { id: "equipe", label: "Fotos da equipe" },
] as const;

export default function AboutPage() {
  usePageMeta(PAGE_META.sobre);

  return (
    <>
      <InternalHero
        eyebrow="Sobre a RedeSub"
        title="Internet de fibra com rosto humano"
        description="A RedeSub é uma operadora regional de internet por fibra, com atendimento próximo e foco em resolver de verdade as necessidades de conexão das famílias e negócios locais."
        imageSrc={MEDIA.teamInstitutional()}
        imageAlt={getMediaAlt("team-institutional", "Equipe RedeSub")}
      >
        <WhatsAppButton size="lg" className="btn--hero" />
        <Link to="/contato" className="btn btn--outline btn--lg">
          Fale conosco
        </Link>
      </InternalHero>

      <PageContainer>
        <Breadcrumbs items={[{ label: "Início", path: "/" }, { label: "Sobre" }]} />
      </PageContainer>

      <section className="section">
        <div className="container about__intro-grid">
          <Reveal>
            <h2 className="section__title">Quem é a RedeSub</h2>
            <p className="section__desc">
              Oferecemos internet de fibra com atendimento regional, suporte pelo
              WhatsApp e planos pensados para o uso real do dia a dia — da sala ao
              home office, do streaming aos estudos.
            </p>
            <p className="section__desc">
              Nossa base de atendimento fica em {ADDRESS.neighborhood},{" "}
              {ADDRESS.city}, com presença nas regiões atendidas pela operação.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="about__values">
              {VALUES.map((v) => (
                <article key={v.title} className="about__value-card">
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container container--narrow">
          <Reveal>
            <h2 className="section__title">Conteúdo em preparação</h2>
            <p className="section__desc">
              Os blocos abaixo serão preenchidos com informações oficiais
              fornecidas pela RedeSub:
            </p>
            <ul className="about__pending">
              {PENDING_BLOCKS.map((b) => (
                <li key={b.id}>{b.label}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section section--navy cta-band">
        <div className="container cta-band__inner">
          <h2>Quer conhecer nossos planos?</h2>
          <p>Veja as opções por região e fale com a equipe.</p>
          <Link to="/planos" className="btn btn--primary btn--lg">
            Ver planos
          </Link>
        </div>
      </section>
    </>
  );
}
