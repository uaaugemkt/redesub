import { useEffect, useId, useRef } from "react";
import { SPEED_TEST_URL } from "../lib/constants";

interface SpeedTestModalProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Velocímetro da RedeSub em modal — reutilizado pelo rodapé (item "Teste de
 * velocidade") e por /atendimento (card "Teste de velocidade" em Suporte
 * rápido). Única instância por SiteLayout (ver SpeedTestModalContext).
 *
 * Desmonta o iframe quando fechado: sem isso o teste de velocidade
 * continuaria rodando em segundo plano.
 */
export default function SpeedTestModal({ open, onClose }: SpeedTestModalProps) {
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="speed-test-modal"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="speed-test-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="speed-test-modal__header">
          <h2 id={titleId} className="speed-test-modal__title">
            Teste de velocidade RedeSub
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            className="speed-test-modal__close"
            aria-label="Fechar teste de velocidade"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="speed-test-modal__body">
          <iframe
            src={SPEED_TEST_URL}
            title="Teste de velocidade RedeSub"
            className="speed-test-modal__iframe"
            frameBorder="0"
            scrolling="no"
          />
        </div>
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
