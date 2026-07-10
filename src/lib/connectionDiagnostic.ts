import { PROBLEM_TIMELINE } from "./constants";

export type DiagnosticPhase =
  | "idle"
  | "diagnosing"
  | "diagnosisComplete"
  | "resolving"
  | "resolved";

export const DIAGNOSTIC_ITEM_COUNT = PROBLEM_TIMELINE.length;

export const DIAGNOSTIC_TIMINGS = {
  startDelay: 400,
  itemInterval: 750,
  diagnosisPause: 1000,
  autoResolveDelay: 1000,
  buttonPressDuration: 500,
  resolveItemInterval: 750,
} as const;

export const DIAGNOSIS_PROGRESS_LABELS = [
  "Iniciando análise",
  "Verificando trabalho",
  "Verificando estudos",
  "Verificando entretenimento",
  "Diagnóstico concluído",
] as const;

export const RESOLUTION_PROGRESS_LABELS = [
  "Iniciando otimização",
  "Estabilizando videochamadas",
  "Melhorando seus estudos",
  "Eliminando travamentos",
  "Reduzindo a latência",
] as const;

export function getDiagnosisProgress(visibleCount: number): number {
  return Math.min(100, Math.max(0, visibleCount * 25));
}

export function getDiagnosisLabel(visibleCount: number): string {
  return DIAGNOSIS_PROGRESS_LABELS[visibleCount] ?? DIAGNOSIS_PROGRESS_LABELS[0];
}

export function getResolutionProgress(fixedCount: number): number {
  return Math.min(100, Math.max(0, fixedCount * 25));
}

export function getResolutionLabel(fixedCount: number): string {
  return RESOLUTION_PROGRESS_LABELS[fixedCount] ?? RESOLUTION_PROGRESS_LABELS[0];
}

export function canStartResolution(phase: DiagnosticPhase): boolean {
  return phase === "diagnosisComplete";
}

export function isItemVisible(index: number, visibleCount: number): boolean {
  return index < visibleCount;
}

export function isItemFixed(index: number, fixedCount: number): boolean {
  return index < fixedCount;
}
