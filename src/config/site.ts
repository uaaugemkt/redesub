import {
  SPEED_TEST_URL,
  SUBSCRIBER_PORTAL_URL,
} from "../lib/constants";

export interface PageMeta {
  title: string;
  description: string;
  path: string;
}

export const SITE_NAME = "RedeSub Internet de Fibra";

export const SITE_CNPJ = "36.173.906/0001-55";

/**
 * Âncora da seção de planos residenciais na Home — não é mais uma página
 * própria. Usada pelo item "Planos" do menu e por qualquer link que precise
 * levar até lá, de qualquer rota (ver SiteHeader e ScrollToTop).
 */
export const PLANS_SECTION_HREF = "/#planos";

export const MAIN_NAV = [
  { label: "Início", path: "/" },
  { label: "Planos", path: PLANS_SECTION_HREF },
  { label: "Cobertura", path: "/cobertura" },
  { label: "Para empresas", path: "/para-empresas" },
  { label: "Atendimento", path: "/atendimento" },
  { label: "Sobre a RedeSub", path: "/sobre" },
] as const;

export const FOOTER_NAV = {
  institucional: [
    { label: "Sobre a RedeSub", path: "/sobre" },
    { label: "Cobertura", path: "/cobertura" },
    { label: "Para empresas", path: "/para-empresas" },
    { label: "Atendimento", path: "/atendimento" },
  ],
  servicos: [
    { label: "Planos", path: PLANS_SECTION_HREF },
    { label: "Suporte técnico", path: "/atendimento#suporte-rapido" },
    { label: "Teste de velocidade", path: SPEED_TEST_URL },
    { label: "Central do Assinante", path: SUBSCRIBER_PORTAL_URL },
  ],
} as const;

export const PAGE_META: Record<string, PageMeta> = {
  home: {
    title: "RedeSub | Internet de Fibra em Outeiro",
    description:
      "Internet de fibra em Outeiro com planos para residências e empresas, conexão estável, suporte rápido e serviços RedeSub.",
    path: "/",
  },
  cobertura: {
    title: "Cobertura RedeSub em Outeiro | Internet de Fibra",
    description:
      "Consulte a disponibilidade da internet de fibra RedeSub em Outeiro e fale com nossa equipe para verificar atendimento no seu endereço.",
    path: "/cobertura",
  },
  atendimento: {
    title: `Atendimento e Suporte | ${SITE_NAME}`,
    description:
      "Fale com a RedeSub para consultar planos, disponibilidade, suporte técnico e atendimento ao assinante.",
    path: "/atendimento",
  },
  suporte: {
    title: `Atendimento e Suporte | ${SITE_NAME}`,
    description:
      "Fale com a RedeSub para consultar planos, disponibilidade, suporte técnico e atendimento ao assinante.",
    path: "/atendimento",
  },
  sobre: {
    title: "Sobre a RedeSub | Internet de Fibra e Atendimento Regional",
    description:
      "Conheça a RedeSub, sua atuação regional, valores e compromisso com internet de fibra e atendimento próximo.",
    path: "/sobre",
  },
  contato: {
    title: `Atendimento e Suporte | ${SITE_NAME}`,
    description:
      "Fale com a RedeSub para consultar planos, disponibilidade, suporte técnico e atendimento ao assinante.",
    path: "/atendimento",
  },
  empresas: {
    title: "Internet para Empresas | RedeSub",
    description:
      "Internet de fibra para empresas com planos Profissional de 700 Mega e Empresarial de 900 Mega, estabilidade e suporte especializado.",
    path: "/para-empresas",
  },
  velocidade: {
    title: "Teste de Velocidade | RedeSub",
    description:
      "Acesse o velocímetro da RedeSub e verifique a velocidade da sua conexão com a internet.",
    path: "/teste-de-velocidade",
  },
  notFound: {
    title: `Página não encontrada | ${SITE_NAME}`,
    description: "A página que você procura não foi encontrada.",
    path: "/404",
  },
};

/**
 * Imagem padrão de compartilhamento (Open Graph / WhatsApp).
 * Precisa ser JPEG ou PNG — o WhatsApp não gera preview a partir de WebP —
 * e ficar abaixo de ~300 KB. Gerada por scripts/generate-og-image.sh.
 */
export const OG_IMAGE = {
  path: "/og-image.jpg",
  type: "image/jpeg",
  width: 1200,
  height: 630,
  alt: "RedeSub — Internet de Fibra em Outeiro",
} as const;

export const SITE_LOCALE = "pt_BR";

/**
 * Páginas indexáveis — fonte única para o prerender e para o sitemap.
 * Ficam de fora: /contato, /suporte e /planos (redirecionam) e /404 (noindex).
 */
export const INDEXABLE_PAGES: readonly PageMeta[] = [
  PAGE_META.home,
  PAGE_META.cobertura,
  PAGE_META.atendimento,
  PAGE_META.sobre,
  PAGE_META.empresas,
  PAGE_META.velocidade,
];

export const SITE_TAGLINE =
  "Internet de fibra com atendimento local para você assistir, trabalhar e viver conectado.";
