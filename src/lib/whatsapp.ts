import { WHATSAPP_NUMBER } from "./constants";

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_MESSAGES = {
  contract: "Olá! Quero contratar internet da RedeSub. Pode me ajudar?",
  availability:
    "Olá, quero consultar a disponibilidade da RedeSub no meu endereço.",
  referral: "Olá! Quero indicar um amigo para a RedeSub e ganhar desconto.",
  support: "Olá! Preciso falar com o atendimento da RedeSub.",
  plan: (planName: string) =>
    `Olá, quero contratar o plano ${planName} da RedeSub. Pode me ajudar?`,
  planWithApp: (planSpeed: string, additionalAppName: string | null) => {
    if (!additionalAppName) {
      return `Olá, quero contratar o plano ${planSpeed} da RedeSub. Pode me ajudar?`;
    }
    return `Olá, quero contratar o plano ${planSpeed} da RedeSub com o app adicional ${additionalAppName}. Pode me ajudar?`;
  },
  contactForm: (data: {
    name: string;
    phone: string;
    address: string;
    plan: string;
    message?: string;
  }) => {
    let text = `Olá, quero consultar a disponibilidade da RedeSub.

Nome: ${data.name}
WhatsApp: ${data.phone}
Endereço/Bairro: ${data.address}
Plano de interesse: ${data.plan}`;

    const extra = data.message?.trim();
    if (extra) {
      text += `\nMensagem: ${extra}`;
    }

    text += "\n\nPode me ajudar?";
    return text;
  },
} as const;
