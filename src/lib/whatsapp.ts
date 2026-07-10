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

export interface BusinessInquiryParams {
  region?: string | null;
  address?: string | null;
  businessType?: string | null;
  devices?: string | null;
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

  aboutIntro: () =>
    "Olá! Gostaria de conhecer melhor a RedeSub e falar com a equipe.",

  stabilityDemo:
    "Olá! Vi no site da RedeSub a demonstração de estabilidade e gostaria de consultar os planos disponíveis para minha região.",

  stabilityCompare: (region?: string | null) => {
    const lines = [
      "Olá! Vi no site da RedeSub a comparação de estabilidade e gostaria de consultar os planos disponíveis para minha região.",
    ];
    if (region?.trim()) {
      lines.push("", `Região: ${region.trim()}`);
    }
    return lines.join("\n");
  },

  plansConsult: (region?: string | null) => {
    const lines = [
      "Olá! Vim pelo site da RedeSub e gostaria de consultar os planos disponíveis para minha região.",
    ];
    if (region?.trim()) {
      lines.push("", `Região: ${region.trim()}`);
    }
    lines.push(
      "",
      "Poderiam me informar as opções e a disponibilidade para o meu endereço?"
    );
    return lines.join("\n");
  },

  coverageConsult: (region?: string | null) => {
    const lines = [
      "Olá! Vim pelo site da RedeSub e gostaria de consultar a cobertura no meu endereço.",
    ];
    if (region?.trim()) {
      lines.push("", `Região: ${region.trim()}`);
    }
    lines.push("", "Podem verificar a disponibilidade para mim?");
    return lines.join("\n");
  },

  planConfiguration: ({
    region,
    planName,
    speed,
    monthlyPrice,
    addonNames,
  }: {
    region?: string | null;
    planName: string;
    speed: string;
    monthlyPrice: string;
    addonNames?: string[];
  }) => {
    const lines = [
      "Olá! Vim pelo site da RedeSub e gostaria de consultar esta configuração.",
      "",
      `Região: ${region?.trim() || "não informada"}`,
      `Plano: ${planName}`,
      `Velocidade: ${speed}`,
      `Mensalidade exibida: R$ ${monthlyPrice}/mês`,
    ];

    const addons =
      addonNames && addonNames.length > 0
        ? addonNames.join(", ")
        : "Nenhum adicional selecionado";
    lines.push(`Adicionais: ${addons}`);
    lines.push(
      "",
      "Poderiam confirmar a disponibilidade e o valor final para meu endereço?"
    );
    return lines.join("\n");
  },

  regionAvailability: (regionName: string) =>
    `Olá! Vim pelo site da RedeSub e gostaria de consultar disponibilidade na região ${regionName}.\n\nPoderiam me informar planos, cobertura e valores?`,

  coverageRegionConsult: (regionName: string) =>
    `Olá! Gostaria de consultar a disponibilidade da RedeSub em ${regionName}.`,

  businessInquiry: ({
    region,
    address,
    businessType,
    devices,
  }: BusinessInquiryParams = {}) => {
    const lines = [
      "Olá! Gostaria de consultar uma solução de internet para minha empresa.",
    ];

    if (region?.trim()) lines.push("", `Região: ${region.trim()}`);
    if (address?.trim()) lines.push(`Endereço: ${address.trim()}`);
    if (businessType?.trim()) lines.push(`Tipo de negócio: ${businessType.trim()}`);
    if (devices?.trim()) {
      lines.push(`Quantidade aproximada de dispositivos: ${devices.trim()}`);
    }

    lines.push("", "Podem me orientar sobre disponibilidade e condições?");
    return lines.join("\n");
  },

  /** Modelo para o usuário preencher no WhatsApp — sem dados automáticos do site. */
  businessSolutionConsult: () =>
    [
      "Olá! Gostaria de consultar uma solução de internet para o meu negócio.",
      "",
      "Região:",
      "Endereço:",
      "Tipo de negócio:",
      "Quantidade aproximada de dispositivos:",
      "",
      "Podem me orientar sobre disponibilidade e condições?",
    ].join("\n"),

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
