import { Link } from "react-router-dom";
import ComboSummary from "../components/ComboSummary";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import FAQ from "../components/ui/FAQ";
import InternalHero from "../components/layout/InternalHero";
import PageContainer from "../components/layout/PageContainer";
import { getMediaAlt, MEDIA } from "../config/media";
import { PAGE_META } from "../config/site";
import { usePageMeta } from "../hooks/usePageMeta";
import AppsSection from "../sections/AppsSection";
import CompareSection from "../sections/CompareSection";
import PlansSection from "../sections/PlansSection";
import WhatsAppButton from "../components/WhatsAppButton";
import Reveal from "../components/ui/Reveal";

const PLANS_FAQ = [
  {
    question: "A instalação está incluída?",
    answer:
      "As condições de instalação variam conforme endereço e plano. Consulte disponibilidade e detalhes com nossa equipe pelo WhatsApp.",
  },
  {
    question: "O roteador é fornecido?",
    answer:
      "Os planos podem incluir roteador em comodato, conforme descrito em cada opção. Confirme com o atendimento antes de contratar.",
  },
  {
    question: "Como saber se há cobertura no meu endereço?",
    answer:
      "Selecione sua região e fale com a equipe pelo WhatsApp informando bairro ou endereço para confirmar viabilidade.",
  },
  {
    question: "Posso adicionar apps ao plano?",
    answer:
      "Sim. Você pode selecionar adicionais de interesse e consultar disponibilidade e valor final pelo WhatsApp.",
  },
  {
    question: "Posso mudar de plano depois?",
    answer:
      "Entre em contato com o atendimento para avaliar alterações de plano conforme sua necessidade e região.",
  },
  {
    question: "Como funciona o atendimento?",
    answer:
      "A RedeSub oferece suporte próximo pelo WhatsApp e acesso à Central do Assinante para serviços da conta.",
  },
];

export default function PlansPage() {
  usePageMeta(PAGE_META.planos);

  return (
    <>
      <InternalHero
        eyebrow="Planos de fibra"
        title="Escolha o plano certo para sua casa"
        description="Filtre por região, compare opções, personalize com adicionais e fale com a equipe RedeSub para confirmar disponibilidade e valor final."
        imageSrc={MEDIA.familyConnected()}
        imageAlt={getMediaAlt("family-connected", "Família conectada em casa")}
      >
        <WhatsAppButton size="lg" className="btn--hero" />
        <Link to="/cobertura" className="btn btn--outline btn--lg">
          Ver cobertura
        </Link>
      </InternalHero>

      <PageContainer>
        <Breadcrumbs
          items={[
            { label: "Início", path: "/" },
            { label: "Planos" },
          ]}
        />
      </PageContainer>

      <PlansSection variant="full" showHeading={false} />

      <section className="section section--muted">
        <div className="container plans-page__combo">
          <Reveal>
            <h2 className="section__title">Monte seu combo</h2>
            <p className="section__desc">
              Escolha um plano, selecione adicionais opcionais e envie o resumo
              pelo WhatsApp para confirmar valores.
            </p>
          </Reveal>
          <ComboSummary />
        </div>
      </section>

      <div id="adicionais">
        <AppsSection variant="full" />
      </div>

      <CompareSection />

      <section className="section">
        <div className="container container--narrow">
          <Reveal>
            <FAQ items={PLANS_FAQ} />
          </Reveal>
        </div>
      </section>

      <section className="section section--navy cta-band">
        <div className="container cta-band__inner">
          <h2>Pronto para contratar?</h2>
          <p>Fale com a equipe e confirme disponibilidade na sua região.</p>
          <WhatsAppButton size="lg" className="btn--hero" />
        </div>
      </section>
    </>
  );
}
