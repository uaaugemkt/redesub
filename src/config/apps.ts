/**
 * ═══════════════════════════════════════════════════════════════
 * APPS — catálogo central RedeSub
 *
 * Ícones reais: /public/app-icons/
 * Para adicionar app: inclua em APP_CATALOG + DEFAULT_ADDITIONAL_APP_IDS
 * Para apps por plano: edite PLAN_APP_CONFIG
 * Mapa/endereço: src/lib/constants.ts (MAP_*)
 * ═══════════════════════════════════════════════════════════════
 */

export const APP_ICON_BASE = "/app-icons";

export type AppCategory =
  | "entretenimento"
  | "seguranca"
  | "educacao"
  | "saude"
  | "vantagens"
  | "nenhum";

export interface AppOption {
  id: string;
  name: string;
  category: AppCategory;
  /** Caminho em /public/app-icons — null se ícone ainda não disponível */
  icon: string | null;
  alt: string;
}

export const NONE_APP_ID = "nenhum";

export const APP_CATALOG: AppOption[] = [
  {
    id: NONE_APP_ID,
    name: "Nenhum",
    category: "nenhum",
    icon: null,
    alt: "Sem app adicional",
  },
  {
    id: "sky-plus",
    name: "Sky+",
    category: "entretenimento",
    icon: `${APP_ICON_BASE}/sky.png`,
    alt: "Logo Sky+",
  },
  {
    id: "amazon-prime",
    name: "Prime Video",
    category: "entretenimento",
    icon: `${APP_ICON_BASE}/prime-video.png`,
    alt: "Logo Amazon Prime Video",
  },
  {
    id: "globoplay",
    name: "Globoplay",
    category: "entretenimento",
    icon: `${APP_ICON_BASE}/globoplay.png`,
    alt: "Logo Globoplay",
  },
  {
    id: "telecine",
    name: "Telecine",
    category: "entretenimento",
    icon: `${APP_ICON_BASE}/telecine.png`,
    alt: "Logo Telecine",
  },
  {
    id: "disney-plus",
    name: "Disney+",
    category: "entretenimento",
    icon: `${APP_ICON_BASE}/disney-plus.png`,
    alt: "Logo Disney+",
  },
  {
    id: "hbo-max",
    name: "HBO Max",
    category: "entretenimento",
    icon: `${APP_ICON_BASE}/hbo-max.png`,
    alt: "Logo HBO Max",
  },
  {
    id: "apple-tv",
    name: "Apple TV+",
    category: "entretenimento",
    icon: `${APP_ICON_BASE}/apple-tv.png`,
    alt: "Logo Apple TV+",
  },
  {
    id: "paramount",
    name: "Paramount+",
    category: "entretenimento",
    icon: `${APP_ICON_BASE}/paramount.png`,
    alt: "Logo Paramount+",
  },
  {
    id: "looke",
    name: "Looke",
    category: "entretenimento",
    icon: null, // TODO: adicionar /app-icons/looke.png
    alt: "Logo Looke",
  },
  {
    id: "curtaon",
    name: "CurtaOn",
    category: "entretenimento",
    icon: null, // TODO: adicionar /app-icons/curtaon.png
    alt: "Logo CurtaOn",
  },
  {
    id: "estuda-plus",
    name: "Estuda+",
    category: "educacao",
    icon: null, // TODO: adicionar /app-icons/estuda-plus.png
    alt: "Logo Estuda+",
  },
  {
    id: "kaspersky",
    name: "Kaspersky",
    category: "seguranca",
    icon: null, // TODO: adicionar /app-icons/kaspersky.png
    alt: "Logo Kaspersky",
  },
  {
    id: "docway",
    name: "Docway",
    category: "saude",
    icon: null, // TODO: adicionar /app-icons/docway.png
    alt: "Logo Docway",
  },
  {
    id: "zen-app",
    name: "Zen App",
    category: "seguranca",
    icon: null, // TODO: adicionar /app-icons/zen-app.png
    alt: "Logo Zen App",
  },
  {
    id: "hub-vantagens",
    name: "Hub Vantagens",
    category: "vantagens",
    icon: null, // TODO: adicionar /app-icons/hub-vantagens.png
    alt: "Logo Hub Vantagens",
  },
  {
    id: "ritual-fit",
    name: "Ritual Fit",
    category: "vantagens",
    icon: null, // TODO: adicionar /app-icons/ritual-fit.png
    alt: "Logo Ritual Fit",
  },
];

export const VITRINE_CATEGORIES: {
  key: Exclude<AppCategory, "nenhum">;
  label: string;
  icon: string;
}[] = [
  { key: "entretenimento", label: "Entretenimento", icon: "🎬" },
  { key: "seguranca", label: "Segurança", icon: "🛡️" },
  { key: "educacao", label: "Educação", icon: "📖" },
  { key: "saude", label: "Saúde", icon: "💚" },
  { key: "vantagens", label: "Vantagens", icon: "⭐" },
];

export const DEFAULT_ADDITIONAL_APP_IDS: string[] = [
  NONE_APP_ID,
  "sky-plus",
  "amazon-prime",
  "globoplay",
  "telecine",
  "disney-plus",
  "hbo-max",
  "apple-tv",
  "paramount",
  "looke",
  "estuda-plus",
  "kaspersky",
  "docway",
  "zen-app",
  "hub-vantagens",
  "curtaon",
  "ritual-fit",
];

export const PLAN_APP_CONFIG: Record<
  string,
  { includedAppIds: string[]; additionalAppIds: string[] }
> = {
  basico: {
    includedAppIds: [],
    additionalAppIds: [...DEFAULT_ADDITIONAL_APP_IDS],
  },
  seguranca: {
    includedAppIds: [],
    additionalAppIds: [...DEFAULT_ADDITIONAL_APP_IDS],
  },
  evolucao: {
    includedAppIds: [],
    additionalAppIds: [...DEFAULT_ADDITIONAL_APP_IDS],
  },
};

const catalogMap = new Map(APP_CATALOG.map((app) => [app.id, app]));

export function getAppById(id: string): AppOption | undefined {
  return catalogMap.get(id);
}

export function getAppsByIds(ids: string[]): AppOption[] {
  return ids
    .map((id) => catalogMap.get(id))
    .filter((app): app is AppOption => app !== undefined);
}

export function getAppsByCategory(
  category: Exclude<AppCategory, "nenhum">
): AppOption[] {
  return APP_CATALOG.filter(
    (app) => app.category === category && app.id !== NONE_APP_ID
  );
}

export function getAppDisplayName(id: string): string {
  return getAppById(id)?.name ?? id;
}

export function isNoneApp(id: string): boolean {
  return id === NONE_APP_ID;
}

/** Nomes curtos para o grid do dropdown (evita quebra feia) */
export function getAppShortName(app: AppOption): string {
  const shorts: Record<string, string> = {
    "amazon-prime": "Prime Video",
    "hub-vantagens": "Hub Vantagens",
    "disney-plus": "Disney+",
    "apple-tv": "Apple TV+",
    "estuda-plus": "Estuda+",
    "ritual-fit": "Ritual Fit",
    "zen-app": "Zen App",
  };
  return shorts[app.id] ?? app.name;
}
