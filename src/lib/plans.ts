/**
 * Planos residenciais oficiais RedeSub — fonte única de dados comerciais.
 *
 * Região pública nesta versão: Outeiro.
 */

export interface Plan {
  id: string;
  name: string;
  /** Ex.: "400 Mega" — parseado para valor + unidade na UI */
  speed: string;
  features: readonly string[];
  /** Tag/diferencial confirmado (ex.: Sem fidelidade) */
  badge: string | null;
  /** Destaque visual opcional do card */
  featured?: boolean;
  /** Mensagem WhatsApp específica do plano */
  whatsappMessage: string;
}

export interface Region {
  id: string;
  /** Nome exibido no filtro (conforme reunião) */
  name: string;
  /** Contexto geográfico quando útil na UI */
  areaLabel?: string;
  plans: readonly Plan[];
}

const RESIDENTIAL_PLANS: readonly Plan[] = [
  {
    id: "novo-basico",
    name: "Novo Básico",
    speed: "400 Mega",
    features: [
      "Lê Aí e Historinhas",
      "Roteador 5G em comodato",
      "Velocidade simétrica",
      "Suporte rápido",
    ],
    badge: null,
    whatsappMessage:
      "Olá! Tenho interesse no plano Novo Básico 400 Mega da RedeSub.",
  },
  {
    id: "liberdade",
    name: "Liberdade",
    speed: "400 Mega",
    features: [
      "Lê Aí e Historinhas",
      "Roteador 5G em comodato",
      "Velocidade simétrica",
      "Suporte rápido",
    ],
    badge: "Sem fidelidade",
    featured: true,
    whatsappMessage:
      "Olá! Tenho interesse no plano Liberdade 400 Mega da RedeSub.",
  },
  {
    id: "mais-seguranca",
    name: "+ Segurança",
    speed: "500 Mega",
    features: [
      "Câmera IP Full HD com cartão de memória em comodato",
      "Lê Aí e Historinhas",
      "Plataforma de filmes e séries",
      "Roteador 5G em comodato",
      "Velocidade simétrica",
      "Suporte rápido",
    ],
    badge: null,
    whatsappMessage:
      "Olá! Tenho interesse no plano + Segurança 500 Mega da RedeSub.",
  },
  {
    id: "new-evolucao-turbo",
    name: "New Evolução Turbo",
    speed: "800 Mega",
    features: [
      "Lê Aí e Historinhas",
      "Plataforma de filmes e séries",
      "Instalação em até 24 horas",
      "Roteador 5G em comodato",
      "Velocidade simétrica",
      "Suporte rápido",
    ],
    badge: null,
    whatsappMessage:
      "Olá! Tenho interesse no plano New Evolução Turbo 800 Mega da RedeSub.",
  },
] as const;

export const REGIONS: readonly Region[] = [
  {
    id: "outeiro",
    name: "Outeiro",
    areaLabel: "Ilha de Outeiro · São João do Outeiro",
    plans: RESIDENTIAL_PLANS,
  },
] as const;

export const REGION_STORAGE_KEY = "redesub-selected-region";

/** Região padrão quando não há seleção salva (planos de Outeiro cadastrados). */
export const DEFAULT_REGION_ID = "outeiro";

/** IDs legados persistidos em localStorage / links antigos. */
const LEGACY_REGION_IDS: Record<string, string> = {
  oteiro: "outeiro",
};

export function normalizeRegionId(id: string): string {
  return LEGACY_REGION_IDS[id] ?? id;
}

export function getRegionById(id: string | null | undefined): Region | undefined {
  if (!id) return undefined;
  const normalized = normalizeRegionId(id);
  return REGIONS.find((r) => r.id === normalized);
}

export function isValidRegionId(id: string): boolean {
  return REGIONS.some((r) => r.id === normalizeRegionId(id));
}

export function getRegionDisplayName(id: string | null | undefined): string | null {
  return getRegionById(id)?.name ?? null;
}

/** Fonte única dos planos residenciais (região Oteiro). */
export const PLANS = RESIDENTIAL_PLANS;

export function getPlanById(id: string | null | undefined): Plan | undefined {
  if (!id) return undefined;
  return PLANS.find((plan) => plan.id === id);
}

/** Plano de maior velocidade cadastrada (compatibilidade / destaques). */
export function getHeroFeaturedPlan(): Plan {
  const featured = PLANS.find((p) => p.id === "new-evolucao-turbo");
  return featured ?? PLANS[PLANS.length - 1];
}

export function parsePlanSpeed(speed: string): { value: string; unit: string } {
  const match = speed.trim().match(/^(\d+)\s+(.+)$/);
  return {
    value: match?.[1] ?? speed,
    unit: match?.[2] ?? "Mega",
  };
}
