import { useEffect, useRef, useState } from "react";
import PlanConfigFloatingBar from "./PlanConfigFloatingBar";
import PlansCarousel from "./PlansCarousel";
import RegionFilter from "./RegionFilter";
import WhatsAppButton from "./WhatsAppButton";
import AppIcon from "./AppIcon";
import { useMediaQuery } from "../hooks/useMediaQuery";
import {
  getAppDisplayName,
  getAppsByIds,
  isNoneApp,
  PLAN_APP_CONFIG,
} from "../config/apps";
import { useSelection } from "../context/SelectionContext";
import { getRegionById } from "../lib/plans";
import { scrollToElement } from "../lib/scroll";
import { WHATSAPP_MESSAGES } from "../lib/whatsapp";

const STEPS = [
  { id: 1, label: "Região" },
  { id: 2, label: "Plano" },
  { id: 3, label: "Adicionais" },
  { id: 4, label: "Revisão" },
] as const;

type ConfigStep = (typeof STEPS)[number]["id"];

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
  const [hasReachedConfigurator, setHasReachedConfigurator] = useState(false);
  const [isFinalCtaVisible, setIsFinalCtaVisible] = useState(false);
  const regionRef = useRef<HTMLElement>(null);
  const plansRef = useRef<HTMLElement>(null);
  const addonsRef = useRef<HTMLElement>(null);
  const reviewRef = useRef<HTMLElement>(null);
  const configTopRef = useRef<HTMLDivElement>(null);
  const prevRegionRef = useRef<string | null>(regionId);

  const region = regionId ? getRegionById(regionId) : null;
  const plans = region?.plans ?? [];
  const hasRegion = !!regionId;
  const hasPlans = hasRegion && plans.length > 0;
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
    appConfig?.additionalAppIds.filter(
      (id) => !isNoneApp(id) && !appConfig.includedAppIds.includes(id)
    ) ?? [];

  const optionalApps = getAppsByIds(optionalAddonIds);
  const hasIncludedApps = includedApps.length > 0;

  const addonNames = selectedAddonIds.map((id) => getAppDisplayName(id));

  const maxReachableStep: ConfigStep = !hasRegion || !hasPlans
    ? 1
    : !selectedPlan
      ? 2
      : !addonsReady
        ? 3
        : 4;

  const shouldShowFloatingSummary = hasReachedConfigurator && !isFinalCtaVisible;

  useEffect(() => {
    const configTop = configTopRef.current;
    const finalCta = document.getElementById("plans-cta");
    if (!configTop) return;

    const configObserver = new IntersectionObserver(
      () => {
        const top = configTop.getBoundingClientRect().top;
        setHasReachedConfigurator(top <= window.innerHeight);
      },
      { threshold: 0 }
    );

    const ctaObserver = finalCta
      ? new IntersectionObserver(
          ([entry]) => {
            setIsFinalCtaVisible(
              entry.isIntersecting && entry.intersectionRatio >= 0.12
            );
          },
          { threshold: [0, 0.12, 0.25], rootMargin: "0px 0px -8% 0px" }
        )
      : null;

    configObserver.observe(configTop);
    ctaObserver?.observe(finalCta!);

    const onScroll = () => {
      const top = configTop.getBoundingClientRect().top;
      setHasReachedConfigurator(top <= window.innerHeight);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      configObserver.disconnect();
      ctaObserver?.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    document.body.classList.toggle(
      "has-plans-summary",
      hasReachedConfigurator && isDesktop
    );
    return () => document.body.classList.remove("has-plans-summary");
  }, [hasReachedConfigurator, isDesktop]);

  useEffect(() => {
    const prev = prevRegionRef.current;
    if (prev === regionId) return;

    setSelectedPlanId(null);
    clearAddons();
    setAddonsReady(false);

    if (regionId) {
      const nextRegion = getRegionById(regionId);
      setActiveStep((nextRegion?.plans.length ?? 0) > 0 ? 2 : 1);
    } else {
      setActiveStep(1);
    }

    prevRegionRef.current = regionId;
  }, [regionId, setSelectedPlanId, clearAddons]);

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

  const stepClass = (step: ConfigStep) =>
    `plan-step ${activeStep === step ? "plan-step--active" : ""}`;

  return (
    <>
      <section
        className="plans-configurator-section section section--soft"
        id="plan-configurator"
        aria-labelledby="plan-config-title"
      >
        <div ref={configTopRef} className="plans-configurator-sentinel" aria-hidden="true" />

        <div className="container plans-configurator-section__container">
          <div className="plans-configurator-shell">
            <header className="plans-configurator-header">
              <span className="eyebrow">Configure seu plano</span>
              <h2 className="section__title" id="plan-config-title">
                Configure sua contratação
              </h2>
              <p className="section__desc">
                Siga as etapas para escolher região, plano e adicionais antes de falar
                com a equipe.
              </p>
            </header>

            <nav className="plans-configurator-stepper" aria-label="Etapas da contratação">
              <ol className="plans-configurator-stepper__list">
                {STEPS.map((step) => {
                  const isComplete = step.id < maxReachableStep || (step.id === 4 && addonsReady);
                  const isCurrent = activeStep === step.id;
                  const isPending = step.id > maxReachableStep;
                  const isClickable = step.id <= maxReachableStep;

                  return (
                    <li key={step.id}>
                      <button
                        type="button"
                        className={`plans-configurator-stepper__step ${isCurrent ? "plans-configurator-stepper__step--current" : ""} ${isComplete ? "plans-configurator-stepper__step--complete" : ""} ${isPending ? "plans-configurator-stepper__step--pending" : ""}`}
                        aria-current={isCurrent ? "step" : undefined}
                        disabled={!isClickable}
                        onClick={() => handleStepClick(step.id)}
                      >
                        <span className="plans-configurator-stepper__marker" aria-hidden="true">
                          {isComplete && !isCurrent ? "✓" : step.id}
                        </span>
                        <span className="plans-configurator-stepper__label">{step.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>

            <div className="plans-configurator-steps">
              <section
                ref={regionRef}
                className={`${stepClass(1)} plan-step--region`}
                id="plan-config-step-1"
                aria-labelledby="plan-config-region-title"
              >
                <h3 className="plan-step__title" id="plan-config-region-title">
                  1. Onde você quer contratar?
                </h3>
                <p className="plan-step__desc">
                  Selecione sua região para ver os planos e condições disponíveis.
                </p>
                <RegionFilter
                  id="plan-config-region"
                  className="plan-config__region-filter"
                  hideEmptyOption
                  showHint={false}
                />
                {!hasRegion && (
                  <p className="plan-step__status" role="status">
                    Escolha sua região para visualizar os planos disponíveis.
                  </p>
                )}
                <p className="plan-step__note">
                  Os preços e planos exibidos dependem da região selecionada.
                </p>
                {hasRegion && !hasPlans && (
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

              <section
                ref={plansRef}
                className={`${stepClass(2)} plan-step--plans${!hasRegion ? " plan-step--locked" : ""}`}
                id="plan-config-step-2"
                aria-labelledby="plan-config-plans-title"
              >
                <h3 className="plan-step__title" id="plan-config-plans-title">
                  2. Escolha o plano ideal para sua rotina
                </h3>
                <p className="plan-step__desc">
                  Compare velocidade, indicação de uso e benefícios antes de continuar.
                </p>
                {!hasRegion ? (
                  <p className="plan-step__status plan-step__status--locked" role="status">
                    Escolha sua região para visualizar os planos disponíveis.
                  </p>
                ) : !hasPlans ? (
                  <p className="plan-step__status plan-step__status--locked" role="status">
                    Consulte a equipe para verificar disponibilidade de planos nesta região.
                  </p>
                ) : (
                  <>
                    {region?.areaLabel && (
                      <p className="plans__region-note">
                        Planos para <strong>{region.name}</strong> ({region.areaLabel})
                      </p>
                    )}
                    {!selectedPlan && (
                      <p className="plan-step__status" role="status">
                        Escolha um plano para continuar.
                      </p>
                    )}
                    <PlansCarousel
                      plans={plans}
                      selectedPlanId={selectedPlanId}
                      onSelect={handleSelectPlan}
                    />
                  </>
                )}
              </section>

              {hasPlans && selectedPlan && (
                <section
                  ref={addonsRef}
                  className={`${stepClass(3)} plan-step--addons`}
                  id="plan-config-step-3"
                  aria-labelledby="plan-config-addons-title"
                >
                  <h3 className="plan-step__title" id="plan-config-addons-title">
                    3. Adicionais
                  </h3>
                  <p className="plan-step__desc plan-step__desc--compact">
                    Escolha serviços extras para complementar seu plano.
                  </p>

                  {hasIncludedApps && (
                    <div className="plan-config__included">
                      <h4 className="plan-config__included-heading">Já incluído no plano</h4>
                      <ul className="plan-config__included-apps">
                        {includedApps.map((app) => (
                          <li key={app.id} className="plan-config__included-chip">
                            <AppIcon app={app} size="sm" />
                            <span className="plan-config__included-name">{app.name}</span>
                            <span className="plan-config__included-badge">Incluído</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div
                    className={`plan-config__addons${hasIncludedApps ? "" : " plan-config__addons--primary"}`}
                  >
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

              {hasPlans && selectedPlan && addonsReady && (
                <section
                  ref={reviewRef}
                  className={`${stepClass(4)} plan-step--review`}
                  id="plan-config-step-4"
                  aria-labelledby="plan-config-review-title"
                >
                  <h3 className="plan-step__title" id="plan-config-review-title">
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
          </div>
        </div>
      </section>

      <PlanConfigFloatingBar
        visible={shouldShowFloatingSummary}
        activeStep={activeStep}
        regionName={regionName}
        planName={selectedPlan?.name ?? null}
        speed={selectedPlan?.speed ?? null}
        price={selectedPlan?.price ?? null}
        addonNames={addonNames}
        addonsReady={addonsReady}
        whatsappMessage={whatsappMessage}
        onChooseRegion={() => {
          setActiveStep(1);
          scrollToElement(regionRef.current);
        }}
        onChoosePlan={() => {
          setActiveStep(2);
          scrollToElement(plansRef.current);
        }}
        onContinue={handleContinueAddons}
        onReview={() => {
          setActiveStep(4);
          requestAnimationFrame(() => scrollToElement(reviewRef.current));
        }}
      />
    </>
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
  showCta?: boolean;
  whatsappMessage: string;
}

function PlanConfigSummary({
  regionName,
  plan,
  addonNames,
  showCta = false,
  whatsappMessage,
}: PlanConfigSummaryProps) {
  return (
    <div className="plan-config__summary">
      <dl className="plan-config__summary-list">
        <div>
          <dt>Região</dt>
          <dd>{regionName ?? "Não selecionada"}</dd>
        </div>
        <div>
          <dt>Plano</dt>
          <dd>
            {plan.name} | {plan.speed}
          </dd>
        </div>
        <div>
          <dt>Mensalidade do plano</dt>
          <dd>R$ {plan.price}/mês</dd>
        </div>
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
