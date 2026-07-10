import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRegionSelection } from "../hooks/useRegionSelection";
import { getRegionById, getRegionDisplayName, type Region } from "../lib/plans";

interface SelectionContextValue {
  regionId: string | null;
  region: Region | null;
  regionName: string | null;
  setRegionId: (id: string | null) => void;
  selectedAddonIds: string[];
  toggleAddon: (id: string) => void;
  clearAddons: () => void;
  selectedPlanId: string | null;
  setSelectedPlanId: (id: string | null) => void;
}

const SelectionContext = createContext<SelectionContextValue | null>(null);

export function SelectionProvider({ children }: { children: ReactNode }) {
  const { regionId, setRegionId } = useRegionSelection();
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const toggleAddon = useCallback((id: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const clearAddons = useCallback(() => setSelectedAddonIds([]), []);

  const value = useMemo<SelectionContextValue>(
    () => ({
      regionId,
      region: regionId ? getRegionById(regionId) ?? null : null,
      regionName: getRegionDisplayName(regionId),
      setRegionId,
      selectedAddonIds,
      toggleAddon,
      clearAddons,
      selectedPlanId,
      setSelectedPlanId,
    }),
    [regionId, setRegionId, selectedAddonIds, toggleAddon, clearAddons, selectedPlanId]
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
