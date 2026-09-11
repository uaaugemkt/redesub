import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import SpeedTestModal from "../components/SpeedTestModal";

interface SpeedTestModalContextValue {
  openSpeedTestModal: () => void;
}

const SpeedTestModalContext = createContext<SpeedTestModalContextValue | null>(
  null
);

/**
 * Dono único do estado do SpeedTestModal (rodapé e /atendimento acionam o
 * mesmo modal — ver useSpeedTestModal). Montado uma vez por SiteLayout, então
 * cada página tem sua própria instância, mas nunca duplica o iframe.
 */
export function SpeedTestModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openSpeedTestModal = useCallback(() => {
    triggerRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setOpen(true);
  }, []);

  const closeSpeedTestModal = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
    triggerRef.current = null;
  }, []);

  const value = useMemo<SpeedTestModalContextValue>(
    () => ({ openSpeedTestModal }),
    [openSpeedTestModal]
  );

  return (
    <SpeedTestModalContext.Provider value={value}>
      {children}
      <SpeedTestModal open={open} onClose={closeSpeedTestModal} />
    </SpeedTestModalContext.Provider>
  );
}

export function useSpeedTestModal(): SpeedTestModalContextValue {
  const ctx = useContext(SpeedTestModalContext);
  if (!ctx) {
    throw new Error(
      "useSpeedTestModal deve ser usado dentro de SpeedTestModalProvider"
    );
  }
  return ctx;
}
