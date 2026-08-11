import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { useRegionSelection } from "../hooks/useRegionSelection";
import { getRegionById, getRegionDisplayName, type Region } from "../lib/plans";

interface SelectionContextValue {
  regionId: string | null;
  region: Region | null;
  regionName: string | null;
  setRegionId: (id: string | null) => void;
}

const SelectionContext = createContext<SelectionContextValue | null>(null);

export function SelectionProvider({ children }: { children: ReactNode }) {
  const { regionId, setRegionId } = useRegionSelection();

  const value = useMemo<SelectionContextValue>(
    () => ({
      regionId,
      region: regionId ? getRegionById(regionId) ?? null : null,
      regionName: getRegionDisplayName(regionId),
      setRegionId,
    }),
    [regionId, setRegionId]
  );

  return (
    <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>
  );
}

export function useSelection(): SelectionContextValue {
  const ctx = useContext(SelectionContext);
  if (!ctx) {
    throw new Error("useSelection deve ser usado dentro de SelectionProvider");
  }
  return ctx;
}
