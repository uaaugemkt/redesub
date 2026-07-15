import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import {
  MapPinIcon,
  PlusCircleIcon,
  WifiIcon,
} from "./icons/BenefitIcons";
import { buildWhatsAppLink } from "../lib/whatsapp";
import { useMediaQuery } from "../hooks/useMediaQuery";

export function formatCompactAddons(addonNames: string[]): string {
  if (addonNames.length === 0) return "Nenhum selecionado";
  if (addonNames.length === 1) return addonNames[0];
  return `${addonNames[0]} + ${addonNames.length - 1} adicionais`;
}

type ConfigStep = 1 | 2 | 3 | 4;

interface PlanConfigFloatingBarProps {
  visible: boolean;
  activeStep: ConfigStep;
  regionName: string | null;
  planName: string | null;
  speed: string | null;
  price: string | null;
  addonNames: string[];
  addonsReady: boolean;
  whatsappMessage: string;
  onChooseRegion: () => void;
  onChoosePlan: () => void;
  onContinue: () => void;
  onReview: () => void;
}

interface SummaryItemProps {
  icon: ReactNode;
  label: string;
  value: string;
  empty?: boolean;
}

function SummaryItem({ icon, label, value, empty }: SummaryItemProps) {
  return (
    <div className="floating-summary__item">
      <span className="floating-summary__icon" aria-hidden="true">
        {icon}
      </span>
      <div className="floating-summary__item-body">
        <span className="floating-summary__label">{label}</span>
        <span
          className={`floating-summary__value${empty ? " floating-summary__value--empty" : ""}`}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

export default function PlanConfigFloatingBar({
  visible,
  regionName,
  planName,
  speed,
  price,
  addonNames,
  addonsReady,
  whatsappMessage,
  onChooseRegion,
  onChoosePlan,
  onContinue,
  onReview,
}: PlanConfigFloatingBarProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const hasRegion = !!regionName;
  const hasPlan = !!planName;
  const addonsLabel = formatCompactAddons(addonNames);
  const showWhatsApp = addonsReady && hasPlan && hasRegion;

  const actionLabel = showWhatsApp
    ? "Enviar pelo WhatsApp"
    : !hasRegion
      ? "Escolher região"
      : !hasPlan
        ? "Continuar"
        : !addonsReady
          ? "Revisar contratação"
          : "Ir para revisão";

  const handleAction = () => {
    if (showWhatsApp) return;
    if (!hasRegion) onChooseRegion();
    else if (!hasPlan) onChoosePlan();
    else if (!addonsReady) onContinue();
    else onReview();
  };

  const planLabel = hasPlan && speed ? `${planName} | ${speed}` : "Não selecionado";
  const regionLabel = regionName ?? "Não selecionada";
  const priceLabel = price ? `R$ ${price}/mês` : "A definir";
  const ctaDisabled = !hasRegion || (hasRegion && !hasPlan && !showWhatsApp);

  if (!isDesktop || !visible) {
    return null;
  }

  const bar = (
    <div
      className={`floating-summary ${visible ? "is-visible" : ""}`}
      aria-label="Resumo da configuração"
      aria-hidden={!visible}
    >
      <div className="floating-summary__inner container">
        <div className="floating-summary__items" aria-live="polite">
          <SummaryItem
            icon={<MapPinIcon />}
            label="Região"
            value={regionLabel}
            empty={!hasRegion}
          />
          <SummaryItem
            icon={<WifiIcon />}
            label="Plano"
            value={planLabel}
            empty={!hasPlan}
          />
          <SummaryItem
            icon={<PlusCircleIcon />}
            label="Adicionais"
            value={addonsLabel}
            empty={addonNames.length === 0}
          />
        </div>

        <div className="floating-summary__pricing">
          <p className="floating-summary__price-label">Mensalidade estimada</p>
          <p className="floating-summary__price-value">{priceLabel}</p>
        </div>

        <div className="floating-summary__action">
          {showWhatsApp ? (
            <a
              href={buildWhatsAppLink(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary btn--md floating-summary__cta"
              tabIndex={visible ? 0 : -1}
            >
              {actionLabel}
            </a>
          ) : (
            <button
              type="button"
              className="btn btn--primary btn--md floating-summary__cta"
              tabIndex={visible ? 0 : -1}
              disabled={ctaDisabled}
              onClick={handleAction}
            >
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(bar, document.body);
}
