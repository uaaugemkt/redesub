import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  MapPinIcon,
  PlusCircleIcon,
  WifiIcon,
} from "./icons/BenefitIcons";
import { buildWhatsAppLink } from "../lib/whatsapp";

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

function SummaryItem({
  icon,
  label,
  value,
  empty,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  empty?: boolean;
}) {
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

function getCompactSummary(
  activeStep: ConfigStep,
  regionName: string | null,
  planName: string | null,
  speed: string | null
): string {
  if (activeStep === 1 || !regionName) return "Escolha sua região";
  if (!planName) return `${regionName} · Escolha um plano`;
  return speed ? `${planName} · ${speed}` : planName;
}

export default function PlanConfigFloatingBar({
  visible,
  activeStep,
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
  const compactRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const sheetTitleId = useId();

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

  const planLabel = hasPlan && speed ? `${planName} — ${speed}` : "Não selecionado";
  const regionLabel = regionName ?? "Não selecionada";
  const priceLabel = price ? `R$ ${price}/mês` : "—";
  const compactSummary = getCompactSummary(activeStep, regionName, planName, speed);
  const showPrice = hasPlan && !!price;
  const ctaDisabled = !hasRegion || (activeStep >= 2 && !hasPlan);

  const closeSheet = useCallback(() => setExpanded(false), []);

  useEffect(() => {
    if (!visible) setExpanded(false);
  }, [visible]);

  useEffect(() => {
    if (!expanded) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSheet();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [expanded, closeSheet]);

  useEffect(() => {
    document.body.style.overflow = expanded ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [expanded]);

  useEffect(() => {
    if (!visible) return;

    const node = compactRef.current;
    if (!node) return;

    const updateHeight = () => {
      const height = node.getBoundingClientRect().height;
      document.documentElement.style.setProperty(
        "--plans-summary-height",
        `${Math.ceil(height)}px`
      );
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(node);

    return () => observer.disconnect();
  }, [visible, expanded, activeStep, showPrice, actionLabel]);

  const bar = (
    <div
      className={`floating-summary ${visible ? "is-visible" : ""}`}
      aria-label="Resumo da configuração"
      aria-hidden={!visible}
    >
      <div ref={compactRef} className="floating-summary__compact">
        <div className="floating-summary__compact-main">
          <button
            type="button"
            className="floating-summary__toggle"
            aria-expanded={expanded}
            aria-controls={sheetTitleId}
            onClick={() => setExpanded((open) => !open)}
          >
            {expanded ? "Fechar resumo" : "Ver resumo"}
          </button>

          <div className="floating-summary__compact-copy">
            <p className="floating-summary__compact-summary">{compactSummary}</p>
            {showPrice ? (
              <p className="floating-summary__compact-price">{priceLabel}</p>
            ) : null}
          </div>
        </div>

        <div className="floating-summary__compact-action">
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

      <div className="floating-summary__desktop">
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

      {expanded ? (
        <div className="floating-summary__sheet" role="presentation">
          <button
            type="button"
            className="floating-summary__sheet-backdrop"
            aria-label="Fechar resumo"
            onClick={closeSheet}
          />
          <div
            ref={sheetRef}
            className="floating-summary__sheet-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={sheetTitleId}
          >
            <header className="floating-summary__sheet-header">
              <h2 id={sheetTitleId}>Resumo da contratação</h2>
              <button
                type="button"
                className="floating-summary__sheet-close"
                onClick={closeSheet}
              >
                Fechar
              </button>
            </header>

            <div className="floating-summary__sheet-body">
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
              <div className="floating-summary__sheet-price">
                <p className="floating-summary__price-label">Mensalidade estimada</p>
                <p className="floating-summary__price-value">{priceLabel}</p>
              </div>
            </div>

            <div className="floating-summary__sheet-footer">
              {showWhatsApp ? (
                <a
                  href={buildWhatsAppLink(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary btn--md floating-summary__cta"
                >
                  {actionLabel}
                </a>
              ) : (
                <button
                  type="button"
                  className="btn btn--primary btn--md floating-summary__cta"
                  disabled={ctaDisabled}
                  onClick={() => {
                    handleAction();
                    closeSheet();
                  }}
                >
                  {actionLabel}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(bar, document.body);
}
