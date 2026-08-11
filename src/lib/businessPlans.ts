/**
 * Planos empresariais oficiais RedeSub — fonte única.
 * Sem preços. Sem benefícios técnicos não confirmados.
 */

export interface BusinessPlan {
  id: string;
  name: string;
  speed: string;
  features: readonly string[];
  tagline?: string;
  whatsappMessage: string;
  featured?: boolean;
}

export const BUSINESS_PLANS: readonly BusinessPlan[] = [
  {
    id: "profissional",
    name: "Profissional",
    speed: "700 Mega",
    tagline: "Mais performance para seu negócio",
    features: [
      "Alta velocidade",
      "Mais performance para seu negócio",
      "Estabilidade",
      "Conexão confiável o tempo todo",
      "Suporte especializado",
      "Atendimento rápido e eficiente",
      "Ideal para empresas",
      "Soluções sob medida para você crescer",
    ],
    whatsappMessage:
      "Olá! Tenho interesse no plano Profissional 700 Mega para empresas da RedeSub.",
  },
  {
    id: "empresarial",
    name: "Empresarial",
    speed: "900 Mega",
    tagline: "Soluções sob medida para você crescer",
    featured: true,
    features: [
      "Alta velocidade",
      "Mais performance para seu negócio",
      "Estabilidade",
      "Conexão confiável o tempo todo",
      "Suporte especializado",
      "Atendimento rápido e eficiente",
      "Ideal para empresas",
      "Soluções sob medida para você crescer",
    ],
    whatsappMessage:
      "Olá! Tenho interesse no plano Empresarial 900 Mega da RedeSub.",
  },
] as const;

/** @deprecated Use BUSINESS_PLANS */
export const BUSINESS_PLAN_EXAMPLES = BUSINESS_PLANS;
