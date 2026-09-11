/**
 * Validação e sanitização server-side da candidatura de "Trabalhe conosco".
 * NUNCA confiar apenas no que o frontend validou nem no MIME que o browser
 * envia — o essencial deste módulo é reconfirmar tudo aqui.
 */

export const AREA_OPTIONS = [
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

const ALLOWED_RESUME_EXTENSIONS = ["pdf", "doc", "docx"] as const;
type ResumeExtension = (typeof ALLOWED_RESUME_EXTENSIONS)[number];

export interface JobApplicationInput {
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  area: string;
  linkedin: string;
  message: string;
}

export interface ValidatedJobApplication extends JobApplicationInput {
  consentAt: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

// Caracteres de controle (0x00-0x1F, 0x7F) — construído via codes para evitar
// bytes de controle literais no arquivo-fonte.
const CONTROL_CHARS_RE = new RegExp(
  "[" + String.fromCharCode(0) + "-" + String.fromCharCode(31) + String.fromCharCode(127) + "]",
  "g"
);

/** Remove caracteres de controle e espaços redundantes; corta no tamanho máximo. */
function cleanText(value: string, maxLength: number): string {
  return value.replace(CONTROL_CHARS_RE, "").trim().slice(0, maxLength);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /^https?:\/\/[^\s]+$/i;

export function validateFields(raw: Record<string, string>): {
  data: ValidatedJobApplication | null;
  errors: ValidationError[];
} {
  const errors: ValidationError[] = [];

  const name = cleanText(raw.name ?? "", 120);
  if (name.length < 2) errors.push({ field: "name", message: "Informe seu nome completo." });

  const email = cleanText(raw.email ?? "", 160);
  if (!EMAIL_RE.test(email)) errors.push({ field: "email", message: "Informe um e-mail válido." });

  const phoneDigits = (raw.phone ?? "").replace(/\D/g, "");
  if (phoneDigits.length < 10 || phoneDigits.length > 13) {
    errors.push({ field: "phone", message: "Informe um WhatsApp/telefone válido." });
  }

  const city = cleanText(raw.city ?? "", 100);
  if (!city) errors.push({ field: "city", message: "Informe sua cidade." });

  const state = cleanText(raw.state ?? "", 60);
  if (!state) errors.push({ field: "state", message: "Informe seu estado." });

  const area = cleanText(raw.area ?? "", 80);
  if (!area) errors.push({ field: "area", message: "Selecione uma área de interesse." });

  const linkedin = cleanText(raw.linkedin ?? "", 200);
  if (linkedin && !URL_RE.test(linkedin)) {
    errors.push({ field: "linkedin", message: "Informe um link do LinkedIn válido." });
  }

  const message = cleanText(raw.message ?? "", 2000);

  const consent = raw.consent === "true";
  if (!consent) {
    errors.push({ field: "consent", message: "É necessário concordar com o tratamento de dados." });
  }

  if (errors.length > 0) return { data: null, errors };

  return {
    data: {
      name,
      email,
      phone: cleanText(raw.phone ?? "", 30),
      city,
      state,
      area,
      linkedin,
      message,
      consentAt: new Date().toISOString(),
    },
    errors: [],
  };
}

export interface ValidatedResume {
  extension: ResumeExtension;
  mimeType: string;
  originalName: string;
  size: number;
  bytes: ArrayBuffer;
}

/** Assinatura binária (magic bytes) de cada formato aceito — não confia na extensão nem no MIME declarado. */
function sniffExtension(bytes: Uint8Array): ResumeExtension | null {
  // PDF: "%PDF"
  if (bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) {
    return "pdf";
  }
  // DOCX (ZIP local file header "PK\x03\x04")
  if (bytes[0] === 0x50 && bytes[1] === 0x4b && bytes[2] === 0x03 && bytes[3] === 0x04) {
    return "docx";
  }
  // DOC legado (OLE Compound File): D0 CF 11 E0 A1 B1 1A E1
  if (
    bytes[0] === 0xd0 &&
    bytes[1] === 0xcf &&
    bytes[2] === 0x11 &&
    bytes[3] === 0xe0 &&
    bytes[4] === 0xa1 &&
    bytes[5] === 0xb1 &&
    bytes[6] === 0x1a &&
    bytes[7] === 0xe1
  ) {
    return "doc";
  }
  return null;
}

function sanitizeOriginalName(name: string): string {
  const base = name.split(/[/\\]/).pop() ?? "curriculo";
  return cleanText(base, 150) || "curriculo";
}

export async function validateResume(
  file: File | null
): Promise<{ data: ValidatedResume | null; error: string | null }> {
  if (!file || file.size === 0) {
    return { data: null, error: "Anexe seu currículo (PDF, DOC ou DOCX)." };
  }

  if (file.size > MAX_RESUME_BYTES) {
    return { data: null, error: "O arquivo excede o limite de 5 MB." };
  }

  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const extension = sniffExtension(bytes);

  if (!extension) {
    return {
      data: null,
      error: "Formato de arquivo não suportado. Envie um PDF, DOC ou DOCX.",
    };
  }

  return {
    data: {
      extension,
      mimeType:
        extension === "pdf"
          ? "application/pdf"
          : extension === "docx"
            ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            : "application/msword",
      originalName: sanitizeOriginalName(file.name),
      size: file.size,
      bytes: buffer,
    },
    error: null,
  };
}

/** Chave interna única de armazenamento — nunca deriva do nome enviado pelo usuário. */
export function buildResumeKey(id: string, extension: ResumeExtension): string {
  return `resumes/${id}.${extension}`;
}
