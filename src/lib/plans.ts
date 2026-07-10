/**
 * Planos e regiões — fonte única de dados comerciais.
 *
 * Regiões citadas em reunião: Oteiro, Coraci, Águas Negras.
 * No código anterior apareciam "Ilha de Outeiro" e "São João do Outeiro"
 * (bairros de Belém/PA) — mapeados à região "Oteiro" abaixo.
 *
 * Coraci e Águas Negras não possuem preços/velocidades cadastrados:
 * exibem apenas consulta via WhatsApp (sem dados inventados).
 */

export interface Plan {
  id: string;
  name: string;
  speed: string;
  price: string;
  profile: string;
  features: readonly string[];
  recommended: boolean;
  badge: string | null;
}

export interface Region {
  id: string;
  /** Nome exibido no filtro (conforme reunião) */
  name: string;
  /** Contexto geográfico quando útil na UI */
  areaLabel?: string;
  plans: readonly Plan[];
}

const OTEIRO_PLANS: readonly Plan[] = [
  {
    id: "basico",
    name: "Básico",
    speed: "450 Mega",
    price: "115,90",
    profile:
      "Casa conectada, redes sociais, vídeos e trabalho leve.",
    features: [
      "Wi-Fi na casa toda",
      "100% fibra óptica",
      "Roteador inteligente em comodato",
      "Velocidade simétrica",
      "Suporte 7 dias por semana",
      "Apps inclusos",
    ],
    recommended: false,
    badge: null,
  },
  {
    id: "seguranca",
    name: "Segurança",
    speed: "650 Mega",
    price: "175,90",
    profile:
      "Famílias, vários dispositivos, home office e câmera IP.",
    features: [
      "Tudo do plano Básico",
      "Câmera IP Full HD em comodato",
      "Cartão de memória incluso",
      "Ideal para famílias conectadas",
      "Apps inclusos",
    ],
    recommended: true,
    badge: "Melhor escolha para famílias",
  },
  {
    id: "evolucao",
    name: "Evolução",
    speed: "850 Mega",
    price: "205,90",
    profile:
      "Máxima performance, jogos, streaming pesado e IP fixo.",
    features: [
      "Tudo do plano Segurança",
      "IP fixo incluso",
      "Máxima performance",
      "Streaming em alta qualidade",
      "Apps inclusos",
    ],
    recommended: false,
    badge: null,
  },
];

export const REGIONS: readonly Region[] = [
  {
    id: "oteiro",
    name: "Oteiro",
    areaLabel: "Ilha de Outeiro · São João do Outeiro",
    plans: OTEIRO_PLANS,
  },
  {
    id: "coraci",
    name: "Coraci",
    plans: [],
  },
  {
    id: "aguas-negras",
    name: "Águas Negras",
    plans: [],
  },
] as const;

export const REGION_STORAGE_KEY = "redesub-selected-region";

export function getRegionById(id: string | null | undefined): Region | undefined {
  if (!id) return undefined;
  return REGIONS.find((r) => r.id === id);
}

export function isValidRegionId(id: string): boolean {
  return REGIONS.some((r) => r.id === id);
}

export function getRegionDisplayName(id: string | null | undefined): string | null {
  return getRegionById(id)?.name ?? null;
}

/** Mantém compatibilidade com imports legados de PLANS (região Oteiro). */
export const PLANS = OTEIRO_PLANS;

/** Plano em destaque no hero da home (maior velocidade cadastrada — região Oteiro). */
export function getHeroFeaturedPlan(): Plan {
  const featured = OTEIRO_PLANS.find((p) => p.id === "evolucao");
  return featured ?? OTEIRO_PLANS[OTEIRO_PLANS.length - 1];
}

export function parsePlanSpeed(speed: string): { value: string; unit: string } {
  const match = speed.trim().match(/^(\d+)\s+(.+)$/);
  return {
    value: match?.[1] ?? speed,
    unit: match?.[2] ?? "Mega",
  };
}
