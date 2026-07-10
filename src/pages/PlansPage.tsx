import { Link } from "react-router-dom";
import PlanConfigurator from "../components/PlanConfigurator";
import FAQ from "../components/ui/FAQ";
import InternalHero from "../components/layout/InternalHero";
import Reveal from "../components/ui/Reveal";
import WhatsAppButton from "../components/WhatsAppButton";
import { getAppDisplayName } from "../config/apps";
import { PAGE_META } from "../config/site";
import { useSelection } from "../context/SelectionContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { getRegionById } from "../lib/plans";
import { WHATSAPP_MESSAGES } from "../lib/whatsapp";
import AppsSection from "../sections/AppsSection";
import CompareSection from "../sections/CompareSection";

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
  const { regionId, regionName, selectedPlanId, selectedAddonIds } = useSelection();

  const region = regionId ? getRegionById(regionId) : null;
  const plan = region?.plans.find((p) => p.id === selectedPlanId);
  const addonNames = selectedAddonIds.map((id) => getAppDisplayName(id));

  const finalMessage =
    plan && regionName
      ? WHATSAPP_MESSAGES.planConfiguration({
          region: regionName,
          planName: plan.name,
          speed: plan.speed,
          monthlyPrice: plan.price,
          addonNames,
        })
      : WHATSAPP_MESSAGES.plansConsult(regionName);

  return (
    <>
      <InternalHero
        eyebrow="Planos de fibra"
        title="Escolha o plano certo para sua casa"
        description="Configure região, plano e adicionais em um único fluxo e envie sua escolha para a equipe RedeSub confirmar disponibilidade e valor final."
        breadcrumbs={[
          { label: "Início", path: "/" },
          { label: "Planos" },
        ]}
      >
        <a href="#plan-configurator" className="btn btn--primary btn--lg btn--hero">
          Começar configuração
        </a>
        <Link to="/cobertura" className="btn btn--outline-light btn--lg">
          Ver cobertura
        </Link>
      </InternalHero>

      <PlanConfigurator />

      <section className="plans-info-divider section">
        <div className="container">
          <div className="plans-info-divider__inner">
            <span className="eyebrow">Conheça os benefícios</span>
            <h2 className="section__title">
              Tudo o que pode fazer parte da sua experiência RedeSub
            </h2>
            <p className="section__desc">
              Veja serviços, recursos e informações que ajudam você a entender
              melhor os planos.
            </p>
          </div>
        </div>
      </section>

      <AppsSection variant="full" informativeOnly />

      <CompareSection
        eyebrow="Por que escolher a RedeSub?"
        backHref="#plan-configurator"
      />

      <section className="section section--muted">
        <div className="container container--narrow">
          <Reveal>
            <p className="plans-faq__intro">Ainda tem dúvidas?</p>
            <FAQ items={PLANS_FAQ} title="Perguntas frequentes sobre planos" />
          </Reveal>
        </div>
      </section>

      <section className="plans-cta section" aria-labelledby="plans-cta-title">
        <div className="container">
          <Reveal>
            <div className="plans-cta__card">
              <h2 className="plans-cta__title" id="plans-cta-title">
                Já sabe qual plano combina com sua rotina?
              </h2>
              <p className="plans-cta__text">
                Envie sua escolha para a RedeSub e confirme disponibilidade e
                condições.
              </p>
              <WhatsAppButton
                message={finalMessage}
                label="Falar com a RedeSub pelo WhatsApp"
                variant="primary"
                size="lg"
                className="plans-cta__btn"
              />
              <p className="plans-cta__back">
                <a href="#plan-configurator">Voltar ao configurador</a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
