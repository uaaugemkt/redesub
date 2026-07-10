import { WHATSAPP_NUMBER } from "./constants";
import { getAppDisplayName } from "../config/apps";

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export interface ContractInquiryParams {
  region?: string | null;
  planName?: string | null;
  speed?: string | null;
  additionalApps?: string[];
  coverageInterest?: boolean;
}

export interface SupportInquiryParams {
  reason: string;
  region?: string | null;
}

function formatAddonList(additionalApps?: string[]): string {
  if (!additionalApps || additionalApps.length === 0) {
    return "nenhum selecionado";
  }
  return additionalApps.map((id) => getAppDisplayName(id)).join(", ");
}

export const WHATSAPP_MESSAGES = {
  contract: "Olá! Quero contratar internet da RedeSub. Pode me ajudar?",

  availability:
    "Olá, quero consultar a disponibilidade da RedeSub no meu endereço.",

  referral: "Olá! Quero indicar um amigo para a RedeSub e ganhar desconto.",

  support: "Olá! Preciso falar com o atendimento da RedeSub.",

  regionAvailability: (regionName: string) =>
    `Olá! Vim pelo site da RedeSub e gostaria de consultar disponibilidade na região ${regionName}.\n\nPoderiam me informar planos, cobertura e valores?`,

  contractInquiry: ({
    region,
    planName,
    speed,
    additionalApps,
    coverageInterest,
  }: ContractInquiryParams) => {
    const lines = [
      "Olá! Vim pelo site da RedeSub e gostaria de consultar disponibilidade.",
      "",
      `Região: ${region?.trim() || "não informada"}`,
    ];

    if (planName || speed) {
      lines.push(`Plano: ${planName ?? "a definir"}`);
      lines.push(`Velocidade: ${speed ?? "a definir"}`);
    }

    lines.push(`Adicionais de interesse: ${formatAddonList(additionalApps)}`);

    if (coverageInterest) {
      lines.push("", "Tenho interesse em confirmar cobertura no meu endereço.");
    }

    lines.push(
      "",
      "Poderiam me informar a disponibilidade e o valor final?"
    );

    return lines.join("\n");
  },

  plan: (planName: string, region?: string | null) =>
    WHATSAPP_MESSAGES.contractInquiry({
      region,
      planName,
      speed: null,
    }),

  planWithApp: (
    planSpeed: string,
    planName: string | null,
    additionalAppIds: string[],
    region?: string | null
  ) =>
    WHATSAPP_MESSAGES.contractInquiry({
      region,
      planName: planName ?? "a definir",
      speed: planSpeed,
      additionalApps: additionalAppIds,
    }),

  addonConsult: (addonNames: string[], region?: string | null) => {
    const list =
      addonNames.length > 0 ? addonNames.join(", ") : "nenhum selecionado";
    return [
      "Olá! Vim pelo site da RedeSub e gostaria de consultar adicionais para meu plano.",
      "",
      `Região: ${region?.trim() || "não informada"}`,
      `Adicionais de interesse: ${list}`,
      "",
      "Poderiam me informar disponibilidade e valor?",
    ].join("\n");
  },

  supportIssue: ({ reason, region }: SupportInquiryParams) => {
    const lines = [
      "Olá! Sou cliente RedeSub e preciso de suporte.",
      "",
      `Motivo: ${reason}`,
    ];
    if (region?.trim()) {
      lines.push(`Região: ${region.trim()}`);
    }
    lines.push("", "Aguardo atendimento.");
    return lines.join("\n");
  },

  contactForm: (data: {
    name: string;
    phone: string;
    address: string;
    plan: string;
    region?: string | null;
    message?: string;
  }) => {
    let text = `Olá, quero consultar a disponibilidade da RedeSub.

Nome: ${data.name}
WhatsApp: ${data.phone}
Endereço/Bairro: ${data.address}`;

    if (data.region?.trim()) {
      text += `\nRegião: ${data.region.trim()}`;
    }

    text += `\nPlano de interesse: ${data.plan}`;

    const extra = data.message?.trim();
    if (extra) {
      text += `\nMensagem: ${extra}`;
    }

    text += "\n\nPoderiam me informar a disponibilidade e o valor final?";
    return text;
  },
} as const;

/** Motivos rápidos da seção de suporte técnico */
export const SUPPORT_QUICK_ISSUES = [
  { id: "sem-internet", label: "Estou sem internet" },
  { id: "internet-lenta", label: "Internet lenta" },
  { id: "internet-instavel", label: "Internet instável" },
  { id: "wifi-nao-conecta", label: "Wi-Fi não conecta" },
  { id: "roteador", label: "Problema com roteador" },
  { id: "segunda-via", label: "Segunda via ou financeiro" },
  { id: "falar-suporte", label: "Falar com o suporte" },
] as const;
