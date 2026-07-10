export interface BusinessPlanExample {
  id: string;
  name: string;
  speed: string;
  price: string;
  profile: string;
  featured?: boolean;
  features: readonly string[];
}

export const BUSINESS_PLAN_EXAMPLES: readonly BusinessPlanExample[] = [
  {
    id: "essencial",
    name: "Plano Negócio Essencial",
    speed: "500 Mega",
    price: "199,90",
    profile: "Pequenos negócios com sistemas, atendimento e tarefas online.",
    features: [
      "Consulta de viabilidade",
      "Atendimento regional",
      "Suporte pelo WhatsApp",
    ],
  },
  {
    id: "performance",
    name: "Plano Negócio Performance",
    speed: "700 Mega",
    price: "269,90",
    profile:
      "Operações com vários dispositivos, videoconferências e uso em nuvem.",
    featured: true,
    features: [
      "Orientação comercial",
      "Solução conforme necessidade",
      "Conectividade para operações online",
    ],
  },
  {
    id: "avancado",
    name: "Plano Negócio Avançado",
    speed: "900 Mega",
    price: "349,90",
    profile:
      "Negócios com maior demanda de conectividade e múltiplas operações simultâneas.",
    features: [
      "Análise de viabilidade",
      "Atendimento próximo",
      "Suporte direto",
    ],
  },
] as const;
