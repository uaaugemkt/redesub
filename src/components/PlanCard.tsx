import { useState } from "react";
import { NONE_APP_ID, PLAN_APP_CONFIG, isNoneApp } from "../config/apps";
import { useSelection } from "../context/SelectionContext";
import type { Plan } from "../lib/plans";
import { parsePlanSpeed } from "../lib/plans";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "../lib/whatsapp";
import PlanAppSelector from "./PlanAppSelector";

interface PlanCardProps {
  plan: Plan;
  large?: boolean;
  /** Modo seleção na página /planos — sem WhatsApp nem dropdown de app */
  selectable?: boolean;
  selected?: boolean;
  onSelect?: (planId: string) => void;
}

function splitPlanPrice(price: string): { whole: string; cents: string | null } {
  const [whole, cents] = price.split(",");
  return { whole, cents: cents ? `,${cents}` : null };
}

export default function PlanCard({
  plan,
  large = false,
  selectable = false,
  selected = false,
  onSelect,
}: PlanCardProps) {
  const { regionName, setSelectedPlanId } = useSelection();
  const [selectedAppId, setSelectedAppId] = useState(NONE_APP_ID);
  const [selectorOpen, setSelectorOpen] = useState(false);
  const { value: speedValue, unit: speedUnit } = parsePlanSpeed(plan.speed);
  const { whole: priceWhole, cents: priceCents } = splitPlanPrice(plan.price);
  const appConfig = PLAN_APP_CONFIG[plan.id] ?? {
    includedAppIds: [],
    additionalAppIds: [NONE_APP_ID],
  };

  const additionalAppIds = isNoneApp(selectedAppId) ? [] : [selectedAppId];
  const hasOptionalApps = appConfig.additionalAppIds.some((id) => !isNoneApp(id));

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
      className={`plan-card ${large ? "plan-card--large" : ""} ${plan.recommended ? "plan-card--featured" : ""} ${selected ? "plan-card--selected" : ""} ${!selectable && selectorOpen ? "plan-card--selector-open" : ""}`}
    >
      {plan.badge && (
        <div className="plan-card__badge-row">
          <span className="plan-card__badge">{plan.badge}</span>
        </div>
      )}

      {selected && (
        <span className="plan-card__selected-badge" aria-hidden="true">
          Selecionado
        </span>
      )}

      <div className="plan-card__body">
        <div className="plan-card__top">
          <span className="plan-card__name">{plan.name}</span>
          <p className="plan-card__speed" aria-label={plan.speed}>
            <span className="plan-card__speed-value">{speedValue}</span>
            <span className="plan-card__speed-unit">{speedUnit}</span>
          </p>
        </div>

        <p className="plan-card__profile">
          <span className="plan-card__profile-label">Indicado para</span>
          {plan.profile}
        </p>

        <ul className="plan-card__features">
          {plan.features.map((f) => (
            <li key={f}>
              <FeatureCheckIcon />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="plan-card__footer">
        {!selectable && (
          <PlanAppSelector
            includedAppIds={appConfig.includedAppIds}
            availableAppIds={appConfig.additionalAppIds}
            selectedAppId={selectedAppId}
            onSelect={setSelectedAppId}
            onOpenChange={setSelectorOpen}
          />
        )}

        {selectable && hasOptionalApps && (
          <p className="plan-card__addons-hint">
            Personalize com adicionais na próxima etapa.
          </p>
        )}

        <div className="plan-card__price-divider" aria-hidden="true" />

        <div
          className="plan-card__price"
          aria-label={`Mensalidade de R$ ${plan.price} por mês`}
        >
          <span className="plan-card__price-label">Mensalidade</span>
          <p className="plan-card__price-row">
            <span className="plan-card__currency" aria-hidden="true">
              R$
            </span>
            <span className="plan-card__amount">{priceWhole}</span>
            {priceCents && (
              <span className="plan-card__cents" aria-hidden="true">
                {priceCents}
              </span>
            )}
            <span className="plan-card__period" aria-hidden="true">
              /mês
            </span>
          </p>
        </div>

        {selectable ? (
          <button
            type="button"
            className={`btn ${plan.recommended || selected ? "btn--primary" : "btn--secondary"} btn--md plan-card__cta`}
            aria-pressed={selected}
            onClick={() => onSelect?.(plan.id)}
          >
            {selected ? "Plano selecionado" : "Selecionar este plano"}
          </button>
        ) : (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn ${plan.recommended ? "btn--primary" : "btn--secondary"} btn--md plan-card__cta`}
            onClick={() => setSelectedPlanId(plan.id)}
          >
            Quero esse plano
          </a>
        )}

        <p className="plan-card__note">
          {selectable
            ? "confirme disponibilidade na revisão final"
            : "fale com a equipe e confirme disponibilidade"}
        </p>
      </div>
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
