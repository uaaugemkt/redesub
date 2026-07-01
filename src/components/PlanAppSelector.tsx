import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  getAppById,
  getAppsByIds,
  getAppShortName,
  isNoneApp,
  NONE_APP_ID,
  type AppOption,
} from "../config/apps";
import AppIcon from "./AppIcon";

interface PlanAppSelectorProps {
  includedAppIds: string[];
  availableAppIds: string[];
  selectedAppId: string;
  onSelect: (appId: string) => void;
  onOpenChange?: (open: boolean) => void;
}

export default function PlanAppSelector({
  includedAppIds,
  availableAppIds,
  selectedAppId,
  onSelect,
  onOpenChange,
}: PlanAppSelectorProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxId = useId();

  const includedApps = getAppsByIds(includedAppIds);
  const availableApps = getAppsByIds(availableAppIds);
  const selectedApp = getAppById(selectedAppId) ?? getAppById(NONE_APP_ID)!;

  const close = useCallback(() => {
    setOpen(false);
    onOpenChange?.(false);
  }, [onOpenChange]);

  const toggleOpen = () => {
    setOpen((prev) => {
      const next = !prev;
      onOpenChange?.(next);
      return next;
    });
  };

  const handleSelect = (appId: string) => {
    onSelect(appId);
    close();
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        close();
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const triggerLabel = isNoneApp(selectedAppId)
    ? "Escolha 1 app adicional"
    : selectedApp.name;

  return (
    <div
      className={`plan-app-selector ${open ? "plan-app-selector--open" : ""}`}
      ref={rootRef}
    >
      {includedApps.length > 0 && (
        <div className="plan-app-selector__included">
          <span className="plan-app-selector__label">Apps inclusos</span>
          <div className="plan-app-selector__included-list">
            {includedApps.map((app) => (
              <IncludedChip key={app.id} app={app} />
            ))}
          </div>
        </div>
      )}

      <div className="plan-app-selector__field">
        <span className="plan-app-selector__label">App adicional</span>

        <button
          ref={triggerRef}
          type="button"
          className={`plan-app-selector__trigger ${open ? "plan-app-selector__trigger--open" : ""}`}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          onClick={toggleOpen}
        >
          <span className="plan-app-selector__trigger-content">
            <AppIcon app={selectedApp} size="sm" />
            <span className="plan-app-selector__trigger-text">{triggerLabel}</span>
          </span>
          <ChevronIcon open={open} />
        </button>

        {open && (
          <div
            id={listboxId}
            className="plan-app-selector__panel"
            role="listbox"
            aria-label="Escolha um app adicional"
          >
            <div className="plan-app-selector__grid">
              {availableApps.map((app) => {
                const isSelected = app.id === selectedAppId;
                const shortName = getAppShortName(app);
                return (
                  <button
                    key={app.id}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    aria-label={app.name}
                    title={app.name}
                    className={`plan-app-selector__option ${isSelected ? "plan-app-selector__option--selected" : ""}`}
                    onClick={() => handleSelect(app.id)}
                  >
                    {isSelected && (
                      <span className="plan-app-selector__check" aria-hidden="true">
                        <CheckIcon />
                      </span>
                    )}
                    <AppIcon app={app} size="md" />
                    <span className="plan-app-selector__option-name">{shortName}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function IncludedChip({ app }: { app: AppOption }) {
  return (
    <div className="plan-app-selector__chip">
      <AppIcon app={app} size="xs" />
      <span>{app.name}</span>
    </div>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`plan-app-selector__chevron ${open ? "plan-app-selector__chevron--open" : ""}`}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
      <path
        d="M2 6l3 3 5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
