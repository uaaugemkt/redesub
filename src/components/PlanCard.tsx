import type { Plan } from "../lib/plans";
import { parsePlanSpeed } from "../lib/plans";
import { buildWhatsAppLink } from "../lib/whatsapp";

interface PlanCardProps {
  plan: Plan;
  large?: boolean;
}

type FeatureIconKind =
  | "book"
  | "wifi"
  | "symmetric"
  | "support"
  | "camera"
  | "play"
  | "clock"
  | "check";

function resolveFeatureIcon(feature: string): FeatureIconKind {
  const text = feature.toLowerCase();

  if (/lê aí|historinhas|leitura/.test(text)) return "book";
  if (/roteador|wi-?fi|5g/.test(text)) return "wifi";
  if (/simétric|simetric/.test(text)) return "symmetric";
  if (/suporte|atendimento/.test(text)) return "support";
  if (/câmera|camera/.test(text)) return "camera";
  if (/filme|sér|serie|plataforma/.test(text)) return "play";
  if (/24|instala|hora/.test(text)) return "clock";
  return "check";
}

export default function PlanCard({ plan, large = false }: PlanCardProps) {
  const { value: speedValue, unit: speedUnit } = parsePlanSpeed(plan.speed);
  const whatsappHref = buildWhatsAppLink(plan.whatsappMessage);
  const isFeatured = Boolean(plan.featured);

  return (
    <article
      className={`plan-card ${large ? "plan-card--large" : ""} ${isFeatured ? "plan-card--featured" : ""}`}
    >
      {plan.badge && (
        <div className="plan-card__badge-row">
          <span className="plan-card__badge">{plan.badge}</span>
        </div>
      )}

      <div className="plan-card__body">
        <div className="plan-card__top">
          <span className="plan-card__kicker">Plano residencial</span>
          <span className="plan-card__name">{plan.name}</span>
          <p className="plan-card__speed" aria-label={plan.speed}>
            <span className="plan-card__speed-value">{speedValue}</span>
            <span className="plan-card__speed-unit">{speedUnit}</span>
          </p>
        </div>

        <ul className="plan-card__features">
          {plan.features.map((feature) => {
            const isCameraHighlight = /câmera/i.test(feature);
            const icon = resolveFeatureIcon(feature);
            return (
              <li
                key={feature}
                className={isCameraHighlight ? "plan-card__feature--highlight" : undefined}
              >
                <span className="plan-card__feature-icon" aria-hidden="true">
                  <FeatureIcon kind={icon} />
                </span>
                <span>{feature}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="plan-card__footer">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn ${isFeatured ? "btn--primary" : "btn--secondary"} btn--md plan-card__cta`}
        >
          Quero este plano
        </a>
      </div>
    </article>
  );
}

function FeatureIcon({ kind }: { kind: FeatureIconKind }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true as const,
  };

  switch (kind) {
    case "book":
      return (
        <svg {...common}>
          <path
            d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16.5H6.5A2.5 2.5 0 0 0 4 22V5.5Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M4 19.5h14.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      );
    case "wifi":
      return (
        <svg {...common}>
          <path
            d="M5 12.55a11 11 0 0 1 14.08 0"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <path
            d="M8.53 16.11a6 6 0 0 1 6.95 0"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <path
            d="M12 20h.01"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "symmetric":
      return (
        <svg {...common}>
          <path
            d="M7 7h10M17 7l-3-3M17 7l-3 3"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 17H7M7 17l3-3M7 17l3 3"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "support":
      return (
        <svg {...common}>
          <path
            d="M4 14v-2a8 8 0 0 1 16 0v2"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <rect x="2" y="14" width="5" height="6" rx="2" stroke="currentColor" strokeWidth="1.75" />
          <rect x="17" y="14" width="5" height="6" rx="2" stroke="currentColor" strokeWidth="1.75" />
        </svg>
      );
    case "camera":
      return (
        <svg {...common}>
          <path
            d="M4 8.5h3l1.4-2h7.2l1.4 2H20a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 20 19.5H4A1.5 1.5 0 0 1 2.5 18v-8A1.5 1.5 0 0 1 4 8.5Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="13.5" r="3" stroke="currentColor" strokeWidth="1.75" />
        </svg>
      );
    case "play":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.75" />
          <path
            d="m17 10 4-2v8l-4-2v-4Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
          <path
            d="M12 7v5l3 2"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path
            d="m6.5 12 3.2 3.2 7.3-7.3"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}
