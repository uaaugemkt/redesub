import { useCallback, useEffect, useState } from "react";
import {
  getRegionById,
  isValidRegionId,
  REGION_STORAGE_KEY,
  type Region,
} from "../lib/plans";

export function readStoredRegionId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(REGION_STORAGE_KEY);
    if (stored && isValidRegionId(stored)) return stored;
    if (stored) localStorage.removeItem(REGION_STORAGE_KEY);
  } catch {
    /* localStorage indisponível */
  }
  return null;
}

export function useRegionSelection() {
  const [regionId, setRegionIdState] = useState<string | null>(() =>
    readStoredRegionId()
  );

  const setRegionId = useCallback((id: string | null) => {
    if (id !== null && !isValidRegionId(id)) return;
    setRegionIdState(id);
    try {
      if (id === null) {
        localStorage.removeItem(REGION_STORAGE_KEY);
      } else {
        localStorage.setItem(REGION_STORAGE_KEY, id);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== REGION_STORAGE_KEY) return;
      const next = e.newValue;
      if (next && isValidRegionId(next)) {
        setRegionIdState(next);
      } else if (!next) {
        setRegionIdState(null);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const region: Region | null = regionId ? getRegionById(regionId) ?? null : null;

  return { regionId, region, setRegionId };
}
