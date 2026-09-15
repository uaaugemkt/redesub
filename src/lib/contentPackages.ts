/**
 * Pacotes de conteúdos (SVA) — upgrades opcionais ao plano de internet.
 * Fonte única. Não inventar canais: só entram na lista os que têm logo
 * oficial em /public.
 *
 * Todos os pacotes seguem a mesma estrutura de painel: título, quantidade,
 * descrição, linha de apoio, faixa de marcas em destaque e CTAs. A faixa e
 * o botão "Ver todos os canais" só aparecem quando `channels` tem itens.
 */

export interface ContentChannel {
  name: string;
  /** Caminho em /public do logo oficial (canvas quadrado com alpha) */
  logo: string;
  /** Marca em destaque no painel do pacote (máx. FEATURED_CHANNELS_LIMIT) */
  featured?: boolean;
}

export interface ContentPackage {
  id: string;
  name: string;
  /**
   * Usado só enquanto `channels` estiver vazio — assim que a lista oficial
   * existir, a quantidade passa a ser derivada dela.
   */
  channelCount?: number;
  /**
   * Lista oficial de canais/marcas; gera destaques (`featured`), o modal
   * "Ver todos os canais" e a contagem. Vazia até os logos do pacote serem
   * adicionados em /public/media/canais/ e registrados no CHANNEL_CATALOG.
   */
  channels: readonly ContentChannel[];
  featured?: boolean;
  description: string;
  /** Linha de apoio abaixo da descrição */
  descriptionSecondary: string;
  whatsappMessage: string;
}

/** Quantas marcas o painel destaca — o restante fica só no modal. */
export const FEATURED_CHANNELS_LIMIT = 5;

const CHANNEL_LOGO_DIR = "/media/canais";

/**
 * Catálogo de canais/marcas com logo oficial em /public/media/canais
 * (WebP 512x512, fundo transparente). Cada pacote monta sua lista a partir
 * daqui, então nome e arquivo ficam em um lugar só.
 */
const CHANNEL_CATALOG = {
  "hbo-max": "HBO",
  "telecine-premium": "Telecine Premium",
  amc: "AMC",
  "sony-one": "Sony One",
  "universal-plus": "Universal+",
  "cnn-brasil": "CNN Brasil",
  "telecine-action": "Telecine Action",
  "telecine-cult": "Telecine Cult",
  "telecine-fun": "Telecine Fun",
  "telecine-pipoca": "Telecine Pipoca",
  "telecine-touch": "Telecine Touch",
  "film-and-arts": "Film & Arts",
  "w-collection": "W Collection",
  band: "Band",
  sbt: "SBT",
  recordtv: "RecordTV",
  "rede-tv": "RedeTV!",
  cultura: "TV Cultura",
  "tv-brasil": "TV Brasil",
  gazeta: "TV Gazeta",
  futura: "Futura",
  "ra-tim-bum": "Rá-Tim-Bum",
  moonbug: "Moonbug",
  edye: "Edye",
  "manual-do-mundo": "Manual do Mundo",
  "fatos-desconhecidos": "Fatos Desconhecidos",
  desimpedidos: "Desimpedidos",
  acelerados: "Acelerados",
  "good-game-tv": "Good Game TV",
  fitdance: "FitDance",
  "xpeed-school": "Xpeed School",
  "canal-artesanal": "Canal Artesanal",
  "itau-cultural-play": "Itaú Cultural Play",
  "whe-play-plus": "WhE Play Plus",
  audio: "Awdio",
  aparecida: "TV Aparecida",
  "cancao-nova": "Canção Nova",
  redevida: "RedeVida",
  "tv-evangelizar": "TV Evangelizar",
} as const;

type ChannelSlug = keyof typeof CHANNEL_CATALOG;

/**
 * Monta a lista de um pacote. A ordem importa: os `featured` aparecem no
 * painel na sequência em que estão aqui; o modal segue a mesma ordem.
 */
function channelList(
  slugs: readonly ChannelSlug[],
  featured: readonly ChannelSlug[]
): readonly ContentChannel[] {
  return slugs.map((slug) => ({
    name: CHANNEL_CATALOG[slug],
    logo: `${CHANNEL_LOGO_DIR}/${slug}.webp`,
    ...(featured.includes(slug) ? { featured: true } : {}),
  }));
}

/** Canais comuns aos pacotes Hub, na ordem em que aparecem no modal. */
const HUB_COMMON_CHANNELS: readonly ChannelSlug[] = [
  "telecine-premium",
  "amc",
  "sony-one",
  "universal-plus",
  "cnn-brasil",
  "telecine-action",
  "telecine-cult",
  "telecine-fun",
  "telecine-pipoca",
  "telecine-touch",
  "film-and-arts",
  "w-collection",
  "band",
  "sbt",
  "recordtv",
  "rede-tv",
  "cultura",
  "tv-brasil",
  "gazeta",
  "futura",
  "ra-tim-bum",
  "moonbug",
  "edye",
  "manual-do-mundo",
  "fatos-desconhecidos",
  "desimpedidos",
  "acelerados",
  "good-game-tv",
  "fitdance",
  "xpeed-school",
  "canal-artesanal",
  "itau-cultural-play",
  "whe-play-plus",
  "aparecida",
  "cancao-nova",
  "redevida",
  "tv-evangelizar",
];

/**
 * Hub Cine: os canais comuns + Awdio. Max, Premiere e ESPN são prioridade
 * comercial, mas ainda não temos os logos — quando chegarem, registre no
 * CHANNEL_CATALOG, coloque no topo desta lista e nos `featured`.
 */
const HUB_CINE_CHANNELS = channelList(
  [...HUB_COMMON_CHANNELS, "audio"],
  ["telecine-premium", "amc", "sony-one", "universal-plus", "cnn-brasil"]
);

/** Hub Mix: HBO + os canais comuns (sem Awdio). */
const HUB_MIX_CHANNELS = channelList(
  ["hbo-max", ...HUB_COMMON_CHANNELS],
  ["hbo-max", "telecine-premium", "sony-one", "universal-plus", "cnn-brasil"]
);

export const CONTENT_PACKAGES: readonly ContentPackage[] = [
  {
    id: "power-play",
    name: "Power Play",
    channelCount: 66,
    channels: [], // logos do Power Play ainda não fornecidos
    description:
      "Conteúdos ao vivo e sob demanda em um pacote adicional para sua internet RedeSub.",
    descriptionSecondary:
      "Canais e conteúdos para o dia a dia da sua casa, ao vivo e quando quiser.",
    whatsappMessage:
      "Olá! Tenho interesse no pacote Power Play da RedeSub.",
  },
  {
    id: "power-elite",
    name: "Power Elite",
    channelCount: 80,
    channels: [], // logos do Power Elite ainda não fornecidos
    featured: true,
    description:
      "Pacote adicional com conteúdos ao vivo e sob demanda para complementar sua conexão.",
    descriptionSecondary:
      "Mais canais e conteúdos para assistir ao vivo e quando quiser.",
    whatsappMessage:
      "Olá! Tenho interesse no pacote Power Elite da RedeSub.",
  },
  {
    id: "power-ultra",
    name: "Power Ultra",
    channelCount: 72,
    channels: [], // logos do Power Ultra ainda não fornecidos
    description:
      "Upgrade de conteúdos ao vivo e sob demanda para aproveitar ainda mais sua internet.",
    descriptionSecondary:
      "Canais e conteúdos para assistir ao vivo e quando quiser, na sua internet RedeSub.",
    whatsappMessage:
      "Olá! Tenho interesse no pacote Power Ultra da RedeSub.",
  },
  {
    id: "hub-cine",
    name: "Hub Cine",
    channels: HUB_CINE_CHANNELS,
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
    channels: HUB_MIX_CHANNELS,
    description:
      "Filmes, séries, esportes, notícias e entretenimento em um só pacote.",
    descriptionSecondary:
      "Tenha acesso a grandes canais e conteúdos para assistir ao vivo e quando quiser.",
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
  return pkg.channels.length > 0 ? pkg.channels.length : (pkg.channelCount ?? 0);
}

export function getFeaturedChannels(
  pkg: ContentPackage
): readonly ContentChannel[] {
  return pkg.channels
    .filter((channel) => channel.featured)
    .slice(0, FEATURED_CHANNELS_LIMIT);
}
