import {
  useEffect,
  useId,
  useRef,
  type KeyboardEvent,
  type MouseEvent,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import type { ContentPackage } from "../lib/contentPackages";
import { getChannelCount } from "../lib/contentPackages";

interface ChannelsModalProps {
  open: boolean;
  pkg: ContentPackage;
  onClose: () => void;
  /** Recebe o foco ao fechar quando o gatilho não estava focado (ex.: Safari). */
  returnFocusRef?: RefObject<HTMLElement | null>;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Lista completa de canais de um pacote de conteúdos. Segue o padrão do
 * SpeedTestModal (overlay, ESC, clique fora, trava o scroll do body), mas
 * aqui o corpo rola: é uma listagem longa. Renderiza em portal porque a
 * seção fica dentro de um `.reveal` com transform, que quebraria o
 * `position: fixed`.
 */
export default function ChannelsModal({
  open,
  pkg,
  onClose,
  returnFocusRef,
}: ChannelsModalProps) {
  const titleId = useId();
  const descId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const overlayMouseDown = useRef(false);

  // Trava o scroll da página e move o foco para o X; ao fechar, devolve o
  // foco a quem abriu. Depende só de `open` para não refazer isso a cada
  // render do pai.
  useEffect(() => {
    if (!open) return;

    const active = document.activeElement as HTMLElement | null;
    const opener =
      active && active !== document.body ? active : returnFocusRef?.current ?? null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      opener?.focus({ preventScroll: true });
    };
  }, [open, returnFocusRef]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Trap de foco simples: Tab/Shift+Tab circulam dentro do painel.
  const onPanelKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  // Fecha no click (não no mousedown) para o foco voltar ao gatilho em vez
  // de cair na página; exige que o mousedown também tenha sido no overlay
  // para um arraste iniciado dentro do painel não fechar o modal.
  const onOverlayMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    overlayMouseDown.current = event.target === event.currentTarget;
  };
  const onOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (overlayMouseDown.current && event.target === event.currentTarget) onClose();
    overlayMouseDown.current = false;
  };

  if (!open) return null;

  const channels = pkg.channels ?? [];
  const count = getChannelCount(pkg);

  return createPortal(
    <div
      className="channels-modal"
      onMouseDown={onOverlayMouseDown}
      onClick={onOverlayClick}
    >
      <div
        ref={panelRef}
        className="channels-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        onKeyDown={onPanelKeyDown}
      >
        <div className="channels-modal__header">
          <div className="channels-modal__heading">
            <h2 id={titleId} className="channels-modal__title">
              Canais do {pkg.name}
            </h2>
            <p id={descId} className="channels-modal__subtitle">
              Confira os canais e conteúdos disponíveis no pacote.
            </p>
          </div>
          <div className="channels-modal__meta">
            <span className="channels-modal__count">{count} canais</span>
            <button
              ref={closeButtonRef}
              type="button"
              className="channels-modal__close"
              aria-label="Fechar lista de canais"
              onClick={onClose}
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        <div className="channels-modal__body">
          <ul className="channels-modal__grid">
            {channels.map((channel) => (
              <li key={channel.logo} className="channels-modal__item">
                <span className="channels-modal__logo-box">
                  <img
                    src={channel.logo}
                    alt={channel.name}
                    width={512}
                    height={512}
                    loading="lazy"
                    decoding="async"
                    className="channels-modal__logo"
                  />
                </span>
                <span className="channels-modal__name" aria-hidden="true">
                  {channel.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>,
    document.body
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
