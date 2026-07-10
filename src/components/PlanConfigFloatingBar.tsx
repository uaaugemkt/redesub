import { useState } from "react";
import { createPortal } from "react-dom";
import { buildWhatsAppLink } from "../lib/whatsapp";

export function formatCompactAddons(addonNames: string[]): string {
  if (addonNames.length === 0) return "Nenhum adicional selecionado";
  if (addonNames.length <= 2) return addonNames.join(", ");
  return `${addonNames[0]} + ${addonNames.length - 1} adicionais`;
}

interface PlanConfigFloatingBarProps {
  visible: boolean;
  regionName: string | null;
  planName: string;
  speed: string;
  price: string;
  addonNames: string[];
  addonsReady: boolean;
  whatsappMessage: string;
  onContinue: () => void;
  onReview: () => void;
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
  onContinue,
  onReview,
}: PlanConfigFloatingBarProps) {
  const [expanded, setExpanded] = useState(false);

  const addonsLabel = formatCompactAddons(addonNames);
  const showWhatsApp = addonsReady;

  const actionLabel = showWhatsApp
    ? "Enviar pelo WhatsApp"
    : addonsReady
      ? "Revisar configuração"
      : "Continuar configuração";

  const handleAction = () => {
    if (showWhatsApp) return;
    if (addonsReady) onReview();
    else onContinue();
  };

  const bar = (
    <div
      className={`floating-summary ${visible ? "is-visible" : ""}`}
      aria-label="Sua escolha"
      aria-hidden={!visible}
    >
      <div className="floating-summary__inner container">
        <div className="floating-summary__summary" aria-live="polite">
          <button
            type="button"
            className="floating-summary__toggle"
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
          >
            Ver escolha
          </button>

          <div
            className={`floating-summary__mobile-details ${expanded ? "floating-summary__mobile-details--open" : ""}`}
          >
            <p className="floating-summary__line">
              <strong>{regionName}</strong>
              <span aria-hidden="true"> · </span>
              {planName} — {speed}
            </p>
            <p className="floating-summary__line floating-summary__line--muted">
              {addonsLabel}
            </p>
          </div>

          <div className="floating-summary__desktop-details">
            <p className="floating-summary__line">
              <span className="floating-summary__label">Região</span>
              {regionName}
            </p>
            <p className="floating-summary__line">
              <span className="floating-summary__label">Plano</span>
              {planName} — {speed}
            </p>
            <p className="floating-summary__line floating-summary__line--muted">
              <span className="floating-summary__label">Adicionais</span>
              {addonsLabel}
            </p>
          </div>
        </div>

        <div className="floating-summary__pricing">
          <p className="floating-summary__price">
            Mensalidade do plano: <strong>R$ {price}/mês</strong>
          </p>
          <p className="floating-summary__note">
            Adicionais e valor final confirmados pela equipe.
          </p>
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
