import { useEffect, useRef, useState } from "react";
import PlanCard from "./PlanCard";
import RegionFilter from "./RegionFilter";
import Reveal from "./ui/Reveal";
import WhatsAppButton from "./WhatsAppButton";
import AppIcon from "./AppIcon";
import {
  getAppDisplayName,
  getAppsByIds,
  isNoneApp,
  PLAN_APP_CONFIG,
  type AppCategory,
} from "../config/apps";
import { useSelection } from "../context/SelectionContext";
import { DEFAULT_REGION_ID, getRegionById } from "../lib/plans";
import { scrollToElement } from "../lib/scroll";
import { WHATSAPP_MESSAGES } from "../lib/whatsapp";

const STEPS = [
  { id: 1, label: "Região" },
  { id: 2, label: "Plano" },
  { id: 3, label: "Adicionais" },
  { id: 4, label: "Revisão" },
] as const;

type ConfigStep = (typeof STEPS)[number]["id"];

const ADDON_CATEGORY_LABEL: Record<AppCategory, string> = {
  entretenimento: "Entretenimento",
  seguranca: "Segurança",
  educacao: "Educação",
  saude: "Saúde",
  vantagens: "Vantagens",
  nenhum: "",
};

export default function PlanConfigurator() {
  const {
    regionId,
    regionName,
    selectedPlanId,
    setSelectedPlanId,
    selectedAddonIds,
    toggleAddon,
    clearAddons,
  } = useSelection();

  const [activeStep, setActiveStep] = useState<ConfigStep>(1);
  const [addonsReady, setAddonsReady] = useState(false);
  const addonsRef = useRef<HTMLElement>(null);
  const reviewRef = useRef<HTMLElement>(null);
  const prevRegionRef = useRef(regionId ?? DEFAULT_REGION_ID);

  const activeRegionId = regionId ?? DEFAULT_REGION_ID;
  const region = getRegionById(activeRegionId);
  const plans = region?.plans ?? [];
  const hasPlans = plans.length > 0;
  const selectedPlan = plans.find((p) => p.id === selectedPlanId) ?? null;

  const appConfig = selectedPlan
    ? PLAN_APP_CONFIG[selectedPlan.id] ?? {
        includedAppIds: [],
        additionalAppIds: [],
      }
    : null;

  const includedApps = appConfig
    ? getAppsByIds(appConfig.includedAppIds).filter((a) => !isNoneApp(a.id))
    : [];

  const optionalAddonIds =
    appConfig?.additionalAppIds.filter((id) => !isNoneApp(id)) ?? [];

  const optionalApps = getAppsByIds(optionalAddonIds);

  const addonNames = selectedAddonIds.map((id) => getAppDisplayName(id));

  const maxReachableStep: ConfigStep = !hasPlans
    ? 1
    : !selectedPlan
      ? 2
      : !addonsReady
        ? 3
        : 4;

  useEffect(() => {
    const prev = prevRegionRef.current;
    if (prev !== activeRegionId) {
      setSelectedPlanId(null);
      clearAddons();
      setAddonsReady(false);
      const nextRegion = getRegionById(activeRegionId);
      setActiveStep((nextRegion?.plans.length ?? 0) > 0 ? 2 : 1);
      prevRegionRef.current = activeRegionId;
    }
  }, [activeRegionId, setSelectedPlanId, clearAddons]);

  useEffect(() => {
    clearAddons();
    setAddonsReady(false);
  }, [selectedPlanId, clearAddons]);

  const handleSelectPlan = (planId: string) => {
    setSelectedPlanId(planId);
    setActiveStep(3);
    requestAnimationFrame(() => scrollToElement(addonsRef.current));
  };

  const handleContinueAddons = () => {
    setAddonsReady(true);
    setActiveStep(4);
    requestAnimationFrame(() => scrollToElement(reviewRef.current));
  };

  const handleStepClick = (step: ConfigStep) => {
    if (step > maxReachableStep) return;
    setActiveStep(step);
  };

  const whatsappMessage =
    selectedPlan && regionName
      ? WHATSAPP_MESSAGES.planConfiguration({
          region: regionName,
          planName: selectedPlan.name,
          speed: selectedPlan.speed,
          monthlyPrice: selectedPlan.price,
          addonNames,
        })
      : WHATSAPP_MESSAGES.plansConsult(regionName);

  const summaryStatus = !hasPlans
    ? `Consulte planos e condições para ${regionName ?? "sua região"}.`
    : !selectedPlan
      ? "Escolha um plano para continuar."
      : !addonsReady
        ? "Adicionais são opcionais — personalize ou continue para revisão."
        : "Configuração pronta para envio.";

  return (
    <section
      className="plan-config section section--soft"
      id="plan-configurator"
      aria-labelledby="plan-config-title"
    >
      <div className="container plan-config__container">
        <header className="plan-config__header">
          <span className="eyebrow">Configure seu plano</span>
          <h2 className="section__title" id="plan-config-title">
            Configure sua contratação
          </h2>
          <p className="section__desc">
            Siga as etapas para escolher região, plano e adicionais antes de falar
            com a equipe.
          </p>
        </header>

        <nav className="plan-config__stepper" aria-label="Etapas da configuração">
          <ol className="plan-config__stepper-list">
            {STEPS.map((step) => {
              const isComplete =
                step.id < activeStep ||
                (step.id === 3 && addonsReady) ||
                (step.id === 4 && addonsReady);
              const isCurrent = activeStep === step.id;
              const isPending = step.id > maxReachableStep;
              const isClickable = step.id <= maxReachableStep;

              return (
                <li key={step.id}>
                  <button
                    type="button"
                    className={`plan-config__step ${isCurrent ? "plan-config__step--current" : ""} ${isComplete ? "plan-config__step--complete" : ""} ${isPending ? "plan-config__step--pending" : ""}`}
                    aria-current={isCurrent ? "step" : undefined}
                    disabled={!isClickable}
                    onClick={() => handleStepClick(step.id)}
                  >
                    <span className="plan-config__step-marker" aria-hidden="true">
                      {isComplete && !isCurrent ? "✓" : step.id}
                    </span>
                    <span className="plan-config__step-label">{step.label}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="plan-config__layout">
          <div className="plan-config__main">
            {/* Step 1 — Region */}
            <section
              className={`plan-config__step-panel ${activeStep === 1 ? "plan-config__step-panel--active" : ""}`}
              id="plan-config-step-1"
              aria-labelledby="plan-config-region-title"
            >
              <h3 className="plan-config__step-title" id="plan-config-region-title">
                1. Onde você quer contratar?
              </h3>
              <p className="plan-config__step-desc">
                Selecione sua região para ver os planos e condições disponíveis.
              </p>
              <RegionFilter
                id="plan-config-region"
                className="plan-config__region-filter"
                hideEmptyOption
                showHint={false}
              />
              <p className="plan-config__region-note">
                Os preços e planos exibidos dependem da região selecionada.
              </p>
              {!hasPlans && (
                <div className="plans__empty plans__empty--consult" role="status">
                  <p>
                    Os planos desta região são definidos conforme a disponibilidade
                    local.
                  </p>
                  <WhatsAppButton
                    message={WHATSAPP_MESSAGES.regionAvailability(regionName ?? "")}
                    label={`Consultar planos em ${regionName ?? "sua região"}`}
                    variant="primary"
                    size="md"
                  />
                </div>
              )}
            </section>

            {/* Step 2 — Plans */}
            {hasPlans && (
              <section
                className={`plan-config__step-panel ${activeStep === 2 ? "plan-config__step-panel--active" : ""}`}
                id="plan-config-step-2"
                aria-labelledby="plan-config-plans-title"
              >
                <h3 className="plan-config__step-title" id="plan-config-plans-title">
                  2. Escolha o plano ideal para sua rotina
                </h3>
                <p className="plan-config__step-desc">
                  Compare velocidade, indicação de uso e benefícios antes de continuar.
                </p>
                {region?.areaLabel && (
                  <p className="plans__region-note">
                    Planos para <strong>{region.name}</strong> ({region.areaLabel})
                  </p>
                )}
                {!selectedPlan && (
                  <p className="plan-config__status" role="status">
                    Escolha um plano para continuar.
                  </p>
                )}
                <div className="plans__grid plans__grid--large">
                  {plans.map((plan, index) => (
                    <Reveal key={plan.id} delay={index * 70} className="plans__grid-cell">
                      <PlanCard
                        plan={plan}
                        large
                        selectable
                        selected={selectedPlanId === plan.id}
                        onSelect={handleSelectPlan}
                      />
                    </Reveal>
                  ))}
                </div>
              </section>
            )}

            {/* Step 3 — Addons */}
            {hasPlans && selectedPlan && (
              <section
                ref={addonsRef}
                className={`plan-config__step-panel ${activeStep === 3 ? "plan-config__step-panel--active" : ""}`}
                id="plan-config-step-3"
                aria-labelledby="plan-config-addons-title"
              >
                <h3 className="plan-config__step-title" id="plan-config-addons-title">
                  3. Personalize seu plano
                </h3>
                <p className="plan-config__step-desc">
                  Escolha serviços adicionais para montar uma opção mais adequada à sua
                  rotina. Valores e disponibilidade são confirmados pela equipe.
                </p>
                <p className="plan-config__status plan-config__status--optional" role="status">
                  Adicionais são opcionais.
                </p>

                <div className="plan-config__included">
                  <h4>Já incluído no plano</h4>
                  <ul className="plan-config__included-list">
                    {selectedPlan.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  {includedApps.length > 0 && (
                    <ul className="plan-config__included-apps">
                      {includedApps.map((app) => (
                        <li key={app.id}>
                          <AppIcon app={app} size="sm" />
                          <span>{app.name}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="plan-config__addons">
                  <h4>Disponível como adicional</h4>
                  {optionalApps.length === 0 ? (
                    <p className="plan-config__addons-empty">
                      Consulte adicionais disponíveis com a equipe pelo WhatsApp.
                    </p>
                  ) : (
                    <ul
                      className="apps-addons__grid plan-config__addons-grid"
                      role="group"
                      aria-label="Adicionais disponíveis"
                    >
                      {optionalApps.map((app) => {
                        const isSelected = selectedAddonIds.includes(app.id);
                        return (
                          <li key={app.id}>
                            <button
                              type="button"
                              className={`apps-addons__card ${isSelected ? "apps-addons__card--selected" : ""}`}
                              aria-pressed={isSelected}
                              onClick={() => toggleAddon(app.id)}
                            >
                              <AppIcon app={app} size="md" />
                              <span className="apps-addons__card-name">{app.name}</span>
                              <span className="apps-addons__card-desc">
                                {ADDON_CATEGORY_LABEL[app.category]}
                              </span>
                              <span className="apps-addons__card-cta">
                                {isSelected ? "Selecionado" : "Consulte valor"}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>

                <div className="plan-config__addons-actions">
                  <button
                    type="button"
                    className="btn btn--primary btn--md"
                    onClick={handleContinueAddons}
                  >
                    Continuar para revisão
                  </button>
                  <button
                    type="button"
                    className="btn btn--outline btn--md"
                    onClick={() => {
                      clearAddons();
                      handleContinueAddons();
                    }}
                  >
                    Continuar sem adicionais
                  </button>
                </div>
              </section>
            )}

            {/* Step 4 — Review */}
            {hasPlans && selectedPlan && addonsReady && (
              <section
                ref={reviewRef}
                className={`plan-config__step-panel plan-config__step-panel--review ${activeStep === 4 ? "plan-config__step-panel--active" : ""}`}
                id="plan-config-step-4"
                aria-labelledby="plan-config-review-title"
              >
                <h3 className="plan-config__step-title" id="plan-config-review-title">
                  4. Revise sua escolha
                </h3>
                <PlanConfigSummary
                  regionName={regionName}
                  plan={selectedPlan}
                  addonNames={addonNames}
                  showCta
                  whatsappMessage={whatsappMessage}
                />
              </section>
            )}
          </div>

          <aside className="plan-config__sidebar" aria-label="Resumo da configuração">
            <div className="plan-config__sidebar-inner">
              <h3 className="plan-config__sidebar-title">Sua escolha</h3>
              <p className="plan-config__sidebar-status" role="status" aria-live="polite">
                {summaryStatus}
              </p>
              {selectedPlan ? (
                <PlanConfigSummary
                  regionName={regionName}
                  plan={selectedPlan}
                  addonNames={addonNames}
                  compact
                  showCta={addonsReady}
                  whatsappMessage={whatsappMessage}
                  live={false}
                />
              ) : (
                <dl className="plan-config__summary-list plan-config__summary-list--minimal">
                  <div>
                    <dt>Região</dt>
                    <dd>{regionName ?? "—"}</dd>
                  </div>
                </dl>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

interface PlanConfigSummaryProps {
  regionName: string | null;
  plan: {
    name: string;
    speed: string;
    price: string;
    features: readonly string[];
  };
  addonNames: string[];
  compact?: boolean;
  showCta?: boolean;
  whatsappMessage: string;
  live?: boolean;
}

function PlanConfigSummary({
  regionName,
  plan,
  addonNames,
  compact = false,
  showCta = false,
  whatsappMessage,
  live = true,
}: PlanConfigSummaryProps) {
  return (
    <div
      className={`plan-config__summary ${compact ? "plan-config__summary--compact" : ""}`}
      {...(live ? { "aria-live": "polite" as const } : {})}
    >
      <dl className="plan-config__summary-list">
        <div>
          <dt>Região</dt>
          <dd>{regionName ?? "—"}</dd>
        </div>
        <div>
          <dt>Plano</dt>
          <dd>
            {plan.name} — {plan.speed}
          </dd>
        </div>
        <div>
          <dt>Mensalidade do plano</dt>
          <dd>R$ {plan.price}/mês</dd>
        </div>
        {!compact && (
          <div>
            <dt>Inclusos</dt>
            <dd>
              <ul className="plan-config__summary-features">
                {plan.features.slice(0, 5).map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </dd>
          </div>
        )}
        <div>
          <dt>Adicionais</dt>
          <dd>
            {addonNames.length > 0
              ? addonNames.join(", ")
              : "Nenhum adicional selecionado"}
          </dd>
        </div>
      </dl>
      <p className="plan-config__summary-note">
        Adicionais: valor confirmado pelo atendimento. Valor final confirmado pela
        equipe.
      </p>
      {showCta && (
        <WhatsAppButton
          message={whatsappMessage}
          label="Enviar configuração pelo WhatsApp"
          variant="primary"
          size="lg"
          className="plan-config__summary-cta"
        />
      )}
    </div>
  );
}
