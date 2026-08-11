import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_REGION_ID,
  getRegionById,
  isValidRegionId,
  REGION_STORAGE_KEY,
  type Region,
} from "../lib/plans";

export function readStoredRegionId(): string {
  if (typeof window === "undefined") return DEFAULT_REGION_ID;
  try {
    const stored = localStorage.getItem(REGION_STORAGE_KEY);
    if (stored && isValidRegionId(stored)) {
      const region = getRegionById(stored);
      const id = region?.id ?? DEFAULT_REGION_ID;
      if (stored !== id) {
        localStorage.setItem(REGION_STORAGE_KEY, id);
      }
      return id;
    }
    if (stored) localStorage.removeItem(REGION_STORAGE_KEY);
  } catch {
    /* localStorage indisponível */
  }
  return DEFAULT_REGION_ID;
}

export function useRegionSelection() {
  const [regionId, setRegionIdState] = useState<string | null>(() => readStoredRegionId());

  const setRegionId = useCallback((id: string | null) => {
    if (id !== null && !isValidRegionId(id)) return;
    const normalized = id === null ? null : getRegionById(id)?.id ?? id;
    setRegionIdState(normalized);
    try {
      if (normalized === null) {
        localStorage.removeItem(REGION_STORAGE_KEY);
      } else {
        localStorage.setItem(REGION_STORAGE_KEY, normalized);
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
        setRegionIdState(getRegionById(next)?.id ?? DEFAULT_REGION_ID);
      } else if (!next) {
        setRegionIdState(DEFAULT_REGION_ID);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const region: Region | null = getRegionById(regionId) ?? null;

  return { regionId, region, setRegionId };
}
