/**
 * Pacotes de conteúdos (SVA) — upgrades opcionais ao plano de internet.
 * Fonte única. Não inventar canais: só entram na lista os que têm logo
 * oficial em /public.
 */

export type ContentGroupType = "ao-vivo" | "ao-vivo-vod" | "vod";

export interface ContentChannel {
  name: string;
  /** Caminho em /public do logo oficial (canvas quadrado com alpha) */
  logo: string;
  /** Marca em destaque no painel do pacote (máx. FEATURED_CHANNELS_LIMIT) */
  featured?: boolean;
}

export interface ContentGroup {
  type: ContentGroupType;
  label: string;
}

export interface ContentPackage {
  id: string;
  name: string;
  /**
   * Usado só quando o pacote ainda não tem `channels` — assim que a lista
   * oficial existir, a quantidade passa a ser derivada dela.
   */
  channelCount?: number;
  /** Lista oficial de canais/marcas; gera destaques, modal e contagem. */
  channels?: readonly ContentChannel[];
  groups: readonly ContentGroup[];
  featured?: boolean;
  description: string;
  /** Linha de apoio abaixo da descrição (opcional) */
  descriptionSecondary?: string;
  whatsappMessage: string;
}

/** Quantas marcas o painel destaca — o restante fica só no modal. */
export const FEATURED_CHANNELS_LIMIT = 5;

const GROUPS_LIVE_VOD: readonly ContentGroup[] = [
  { type: "ao-vivo", label: "Ao vivo" },
  { type: "ao-vivo-vod", label: "Ao vivo e VOD" },
  { type: "vod", label: "VOD" },
];

const HUB_CINE_LOGO_DIR = "/media/hub-cine";
const hubCineLogo = (file: string) => `${HUB_CINE_LOGO_DIR}/${file}.webp`;

/**
 * Canais do Hub Cine. Os logos vêm todos de /public/media/hub-cine
 * (512x512, fundo transparente).
 *
 * A ordem importa: os `featured` aparecem no painel na sequência em que
 * estão aqui (o primeiro ganha a posição principal). Max, Premiere e ESPN
 * são prioridade comercial, mas ainda não temos os logos oficiais — quando
 * chegarem, basta adicioná-los no topo desta lista com `featured: true`
 * (ex.: hubCineLogo("max"), hubCineLogo("premiere"), hubCineLogo("espn"))
 * e ajustar os `featured` excedentes.
 */
const HUB_CINE_CHANNELS: readonly ContentChannel[] = [
  { name: "Telecine Premium", logo: hubCineLogo("telecine-premium"), featured: true },
  { name: "AMC", logo: hubCineLogo("amc"), featured: true },
  { name: "Sony One", logo: hubCineLogo("sony-one"), featured: true },
  { name: "Universal+", logo: hubCineLogo("universal-plus"), featured: true },
  { name: "CNN Brasil", logo: hubCineLogo("cnn-brasil"), featured: true },
  { name: "Telecine Action", logo: hubCineLogo("telecine-action") },
  { name: "Telecine Cult", logo: hubCineLogo("telecine-cult") },
  { name: "Telecine Fun", logo: hubCineLogo("telecine-fun") },
  { name: "Telecine Pipoca", logo: hubCineLogo("telecine-pipoca") },
  { name: "Telecine Touch", logo: hubCineLogo("telecine-touch") },
  { name: "Film & Arts", logo: hubCineLogo("film-and-arts") },
  { name: "W Collection", logo: hubCineLogo("w-collection") },
  { name: "Band", logo: hubCineLogo("band") },
  { name: "SBT", logo: hubCineLogo("sbt") },
  { name: "RecordTV", logo: hubCineLogo("recordtv") },
  { name: "RedeTV!", logo: hubCineLogo("rede-tv") },
  { name: "TV Cultura", logo: hubCineLogo("cultura") },
  { name: "TV Brasil", logo: hubCineLogo("tv-brasil") },
  { name: "TV Gazeta", logo: hubCineLogo("gazeta") },
  { name: "Futura", logo: hubCineLogo("futura") },
  { name: "Rá-Tim-Bum", logo: hubCineLogo("ra-tim-bum") },
  { name: "Moonbug", logo: hubCineLogo("moonbug") },
  { name: "Edye", logo: hubCineLogo("edye") },
  { name: "Manual do Mundo", logo: hubCineLogo("manual-do-mundo") },
  { name: "Fatos Desconhecidos", logo: hubCineLogo("fatos-desconhecidos") },
  { name: "Desimpedidos", logo: hubCineLogo("desimpedidos") },
  { name: "Acelerados", logo: hubCineLogo("acelerados") },
  { name: "Good Game TV", logo: hubCineLogo("good-game-tv") },
  { name: "FitDance", logo: hubCineLogo("fitdance") },
  { name: "Xpeed School", logo: hubCineLogo("xpeed-school") },
  { name: "Canal Artesanal", logo: hubCineLogo("canal-artesanal") },
  { name: "Itaú Cultural Play", logo: hubCineLogo("itau-cultural-play") },
  { name: "WhE Play Plus", logo: hubCineLogo("whe-play-plus") },
  { name: "Awdio", logo: hubCineLogo("audio") },
  { name: "TV Aparecida", logo: hubCineLogo("aparecida") },
  { name: "Canção Nova", logo: hubCineLogo("cancao-nova") },
  { name: "RedeVida", logo: hubCineLogo("redevida") },
  { name: "TV Evangelizar", logo: hubCineLogo("tv-evangelizar") },
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
    id: "hub-cine",
    name: "Hub Cine",
    channels: HUB_CINE_CHANNELS,
    groups: GROUPS_LIVE_VOD,
    description:
      "Filmes, séries, esportes, notícias e entretenimento em um só pacote.",
    descriptionSecondary:
      "Tenha acesso a grandes canais e conteúdos para assistir ao vivo e quando quiser.",
    whatsappMessage:
      "Olá! Tenho interesse no pacote Hub Cine da RedeSub.",
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

/** Quantidade exibida: derivada da lista quando ela existe. */
export function getChannelCount(pkg: ContentPackage): number {
  return pkg.channels?.length ?? pkg.channelCount ?? 0;
}

export function getFeaturedChannels(
  pkg: ContentPackage
): readonly ContentChannel[] {
  return (pkg.channels ?? [])
    .filter((channel) => channel.featured)
    .slice(0, FEATURED_CHANNELS_LIMIT);
}
