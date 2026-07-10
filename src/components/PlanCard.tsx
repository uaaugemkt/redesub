import { useState } from "react";
import { NONE_APP_ID, PLAN_APP_CONFIG, isNoneApp } from "../config/apps";
import { useSelection } from "../context/SelectionContext";
import type { Plan } from "../lib/plans";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "../lib/whatsapp";
import PlanAppSelector from "./PlanAppSelector";

interface PlanCardProps {
  plan: Plan;
  large?: boolean;
}

export default function PlanCard({ plan, large = false }: PlanCardProps) {
  const { regionName, setSelectedPlanId } = useSelection();
  const [selectedAppId, setSelectedAppId] = useState(NONE_APP_ID);
  const [selectorOpen, setSelectorOpen] = useState(false);
  const appConfig = PLAN_APP_CONFIG[plan.id] ?? {
    includedAppIds: [],
    additionalAppIds: [NONE_APP_ID],
  };

  const additionalAppIds = isNoneApp(selectedAppId) ? [] : [selectedAppId];

  const whatsappHref = buildWhatsAppLink(
    WHATSAPP_MESSAGES.planWithApp(
      plan.speed,
      plan.name,
      additionalAppIds,
      regionName
    )
  );

  return (
    <article
      className={`plan-card ${large ? "plan-card--large" : ""} ${plan.recommended ? "plan-card--featured" : ""} ${selectorOpen ? "plan-card--selector-open" : ""}`}
    >
      {plan.badge && <span className="plan-card__badge">{plan.badge}</span>}

      <div className="plan-card__header">
        <span className="plan-card__name">{plan.name}</span>
        <span className="plan-card__speed">{plan.speed}</span>
      </div>

      <div className="plan-card__price">
        <span className="plan-card__currency">R$</span>
        <span className="plan-card__amount">{plan.price}</span>
        <span className="plan-card__period">/mês</span>
      </div>
      <p className="plan-card__note">
        fale com a equipe e confirme disponibilidade
      </p>

      <p className="plan-card__profile">
        <strong>Indicado para:</strong> {plan.profile}
      </p>

      <ul className="plan-card__features">
        {plan.features.map((f) => (
          <li key={f}>
            <FeatureCheckIcon />
            {f}
          </li>
        ))}
      </ul>

      <PlanAppSelector
        includedAppIds={appConfig.includedAppIds}
        availableAppIds={appConfig.additionalAppIds}
        selectedAppId={selectedAppId}
        onSelect={setSelectedAppId}
        onOpenChange={setSelectorOpen}
      />

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn ${plan.recommended ? "btn--primary" : "btn--secondary"} btn--md plan-card__cta`}
        onClick={() => setSelectedPlanId(plan.id)}
      >
        Quero esse plano
      </a>
    </article>
  );
}

function FeatureCheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="var(--brand-blue-soft)" />
      <path
        d="M6 10l3 3 5-6"
        stroke="var(--brand-blue)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
