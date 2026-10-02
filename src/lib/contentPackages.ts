/**
 * Pacotes de conteúdos (SVA) — upgrades opcionais ao plano de internet.
 * Fonte única. Não inventar canais nem números: quantidade e marcas em
 * destaque vêm da tabela comercial oficial.
 *
 * Todos os pacotes seguem a mesma estrutura de painel: título, quantidade,
 * descrição, linha de apoio, faixa de marcas em destaque e CTAs. O botão
 * "Ver todos os canais" só aparece quando `channels` (lista completa) tem itens.
 */

export interface ContentChannel {
  name: string;
  /** Caminho em /public do logo oficial (canvas quadrado com alpha) */
  logo: string;
}

/** Marca em destaque no painel do pacote. */
export interface PackageHighlight {
  name: string;
  /** Logo oficial em /public/media/canais */
  logo: string;
  /** Largura ÷ altura do desenho — usado para equilibrar o tamanho visual */
  ratio: number;
}

export interface ContentPackage {
  id: string;
  name: string;
  /** Quantidade oficial de canais do pacote */
  channelCount: number;
  /** Marcas em destaque no painel, na ordem de exibição */
  highlights: readonly PackageHighlight[];
  /**
   * Lista oficial completa de canais; alimenta o modal "Ver todos os
   * canais". Vazia até a lista do pacote ser fornecida.
   */
  channels: readonly ContentChannel[];
  featured?: boolean;
  description: string;
  /** Linha de apoio abaixo da descrição */
  descriptionSecondary: string;
  whatsappMessage: string;
}

const CHANNEL_LOGO_DIR = "/media/canais";

/**
 * Marcas usadas nos destaques, com o logo oficial (SVG) em
 * /public/media/canais. Os arquivos não são editados: só recebem `viewBox`
 * quando faltava, para escalarem dentro do <img>. `ratio` é a proporção
 * do desenho, usada para dar o mesmo peso visual a logos largos e altos.
 */
const BRANDS = {
  telecine: { name: "Telecine", file: "telecine", ratio: 1.49 },
  "hbo-max": { name: "HBO Max", file: "hbo-max", ratio: 1.39 },
  "cnn-brasil": { name: "CNN Brasil", file: "cnn-brasil", ratio: 1.5 },
  premiere: { name: "Premiere", file: "premiere", ratio: 6.25 },
  espn: { name: "ESPN", file: "espn", ratio: 4.04 },
  "tnt-sports": { name: "TNT Sports", file: "tnt-sports", ratio: 3.1 },
  "warner-bros": { name: "Warner Bros.", file: "warner-bros", ratio: 0.99 },
  universal: { name: "Universal TV", file: "universal", ratio: 1.82 },
  tnt: { name: "TNT", file: "tnt", ratio: 1 },
  gloobinho: { name: "Gloobinho", file: "gloobinho", ratio: 1.67 },
  megapix: { name: "Megapix", file: "megapix", ratio: 5.68 },
  globonews: { name: "GloboNews", file: "globonews", ratio: 4.34 },
} satisfies Record<string, { name: string; file: string; ratio: number }>;

type BrandSlug = keyof typeof BRANDS;

function highlights(slugs: readonly BrandSlug[]): readonly PackageHighlight[] {
  return slugs.map((slug) => {
    const { name, file, ratio } = BRANDS[slug];
    return { name, logo: `${CHANNEL_LOGO_DIR}/${file}.svg`, ratio };
  });
}

export const CONTENT_PACKAGES: readonly ContentPackage[] = [
  {
    id: "watch-black-cinema",
    name: "Watch Black Cinema",
    channelCount: 34,
    highlights: highlights(["telecine", "hbo-max"]),
    channels: [],
    description: "Filmes e séries para quem ama cinema, em um só pacote.",
    descriptionSecondary:
      "Com Telecine e HBO Max para assistir ao vivo e quando quiser.",
    whatsappMessage:
      "Olá! Tenho interesse no pacote Watch Black Cinema da RedeSub.",
  },
  {
    id: "power-esporte-clube",
    name: "Power Esporte Clube",
    channelCount: 71,
    highlights: highlights(["premiere", "espn", "tnt-sports"]),
    channels: [],
    description:
      "Futebol, campeonatos e transmissões esportivas em um só pacote.",
    descriptionSecondary:
      "Com Premiere, ESPN e TNT Sports para acompanhar os grandes jogos ao vivo.",
    whatsappMessage:
      "Olá! Tenho interesse no pacote Power Esporte Clube da RedeSub.",
  },
  {
    id: "power-elite",
    name: "Power Elite",
    channelCount: 99,
    highlights: highlights([
      "premiere",
      "espn",
      "tnt-sports",
      "telecine",
      "warner-bros",
      "universal",
      "tnt",
      "gloobinho",
      "megapix",
      "cnn-brasil",
      "globonews",
    ]),
    channels: [],
    featured: true,
    description:
      "Nosso pacote mais completo: esportes, filmes, séries, notícias e infantil.",
    descriptionSecondary:
      "Futebol, cinema e informação para assistir ao vivo e quando quiser.",
    whatsappMessage:
      "Olá! Tenho interesse no pacote Power Elite da RedeSub.",
  },
] as const;

export function getContentPackageById(
  id: string | null | undefined
): ContentPackage | undefined {
  if (!id) return undefined;
  return CONTENT_PACKAGES.find((pkg) => pkg.id === id);
}

export function getChannelCount(pkg: ContentPackage): number {
  return pkg.channelCount;
}
