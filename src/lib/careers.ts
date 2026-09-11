/**
 * Constantes do formulário de "Trabalhe conosco" usadas no frontend.
 * Espelham (sem importar diretamente) as mesmas regras validadas de verdade
 * em functions/lib/jobApplication.ts — o servidor nunca confia só nisto.
 */
export const JOB_AREA_OPTIONS = [
  "Atendimento ao cliente",
  "Comercial / Vendas",
  "Técnico / Instalação",
  "Redes / Telecom",
  "Tecnologia / TI",
  "Administrativo",
  "Financeiro",
  "Marketing",
  "Recursos Humanos",
  "Outra área",
] as const;

export const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5 MB
export const ALLOWED_RESUME_EXTENSIONS = [".pdf", ".doc", ".docx"] as const;
export const ALLOWED_RESUME_ACCEPT =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(0)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

export function hasAllowedResumeExtension(fileName: string): boolean {
  const lower = fileName.toLowerCase();
  return ALLOWED_RESUME_EXTENSIONS.some((ext) => lower.endsWith(ext));
}
