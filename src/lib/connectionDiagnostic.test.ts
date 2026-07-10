import { describe, expect, it } from "vitest";
import {
  canStartResolution,
  getDiagnosisLabel,
  getDiagnosisProgress,
  getResolutionLabel,
  getResolutionProgress,
  isItemFixed,
  isItemVisible,
} from "./connectionDiagnostic";

describe("connectionDiagnostic", () => {
  it("maps diagnosis progress to visible items", () => {
    expect(getDiagnosisProgress(0)).toBe(0);
    expect(getDiagnosisProgress(1)).toBe(25);
    expect(getDiagnosisProgress(4)).toBe(100);
  });

  it("returns diagnosis labels per step", () => {
    expect(getDiagnosisLabel(0)).toBe("Iniciando análise");
    expect(getDiagnosisLabel(4)).toBe("Diagnóstico concluído");
  });

  it("maps resolution progress to fixed items", () => {
    expect(getResolutionProgress(2)).toBe(50);
    expect(getResolutionLabel(4)).toBe("Reduzindo a latência");
  });

  it("controls visibility and fixed state", () => {
    expect(isItemVisible(0, 1)).toBe(true);
    expect(isItemVisible(1, 1)).toBe(false);
    expect(isItemFixed(1, 2)).toBe(true);
    expect(isItemFixed(2, 2)).toBe(false);
  });

  it("allows resolution only after diagnosis complete", () => {
    expect(canStartResolution("diagnosisComplete")).toBe(true);
    expect(canStartResolution("diagnosing")).toBe(false);
    expect(canStartResolution("resolving")).toBe(false);
  });
});
