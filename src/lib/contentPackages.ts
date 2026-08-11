/**
 * Pacotes de conteúdos (SVA) — upgrades opcionais ao plano de internet.
 * Fonte única. Não inventar canais: `items` fica vazio até logos/lista oficiais.
 */

export type ContentGroupType = "ao-vivo" | "ao-vivo-vod" | "vod";

export interface ContentChannel {
  name: string;
  /** Caminho em /public quando o logo oficial estiver disponível */
  logo?: string | null;
}

export interface ContentGroup {
  type: ContentGroupType;
  label: string;
  /** Lista futura de canais/serviços — vazia até validação oficial */
  items?: readonly ContentChannel[];
}

export interface ContentPackage {
  id: string;
  name: string;
  channelCount: number;
  groups: readonly ContentGroup[];
  featured?: boolean;
  description: string;
  whatsappMessage: string;
}

const GROUPS_LIVE_VOD: readonly ContentGroup[] = [
  { type: "ao-vivo", label: "Ao vivo", items: [] },
  { type: "ao-vivo-vod", label: "Ao vivo e VOD", items: [] },
  { type: "vod", label: "VOD", items: [] },
];

export const CONTENT_PACKAGES: readonly ContentPackage[] = [
  {
    id: "power-play",
    name: "Power Play",
    channelCount: 66,
    groups: GROUPS_LIVE_VOD,
    description:
      "Conteúdos ao vivo e sob demanda em um pacote adicional para sua internet RedeSub.",
    whatsappMessage:
      "Olá! Tenho interesse no pacote Power Play da RedeSub.",
  },
  {
    id: "power-elite",
    name: "Power Elite",
    channelCount: 80,
    groups: GROUPS_LIVE_VOD,
    featured: true,
    description:
      "Pacote adicional com conteúdos ao vivo e sob demanda para complementar sua conexão.",
    whatsappMessage:
      "Olá! Tenho interesse no pacote Power Elite da RedeSub.",
  },
  {
    id: "power-ultra",
    name: "Power Ultra",
    channelCount: 72,
    groups: GROUPS_LIVE_VOD,
    description:
      "Upgrade de conteúdos ao vivo e sob demanda para aproveitar ainda mais sua internet.",
    whatsappMessage:
      "Olá! Tenho interesse no pacote Power Ultra da RedeSub.",
  },
  {
    id: "hub-ultra",
    name: "Hub Ultra",
    channelCount: 24,
    groups: GROUPS_LIVE_VOD,
    description:
      "Pacote adicional de conteúdos ao vivo e sob demanda para sua rotina RedeSub.",
    whatsappMessage:
      "Olá! Tenho interesse no pacote Hub Ultra da RedeSub.",
  },
  {
    id: "hub-mix",
    name: "Hub Mix",
    channelCount: 24,
    groups: GROUPS_LIVE_VOD,
    description:
      "Conteúdos ao vivo e sob demanda em formato de pacote adicional à sua internet.",
    whatsappMessage:
      "Olá! Tenho interesse no pacote Hub Mix da RedeSub.",
  },
] as const;

export function getContentPackageById(
  id: string | null | undefined
): ContentPackage | undefined {
  if (!id) return undefined;
  return CONTENT_PACKAGES.find((pkg) => pkg.id === id);
}
