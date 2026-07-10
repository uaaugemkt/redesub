export interface PageMeta {
  title: string;
  description: string;
  path: string;
}

export const SITE_NAME = "RedeSub Internet de Fibra";

export const MAIN_NAV = [
  { label: "Início", path: "/" },
  { label: "Planos", path: "/planos" },
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
    { label: "Planos", path: "/planos" },
    { label: "Suporte técnico", path: "/atendimento#suporte-rapido" },
    { label: "Teste de velocidade", path: "/teste-de-velocidade" },
    { label: "Central do Assinante", path: "/atendimento#central-assinante" },
  ],
} as const;

export const PAGE_META: Record<string, PageMeta> = {
  home: {
    title: `${SITE_NAME} | Internet de fibra em Outeiro`,
    description:
      "Internet de fibra óptica com atendimento local, planos de até 850 Mega, suporte próximo e contratação pelo WhatsApp na região de Outeiro.",
    path: "/",
  },
  planos: {
    title: `Planos de internet | ${SITE_NAME}`,
    description:
      "Escolha seu plano de fibra por região, monte seu combo com adicionais e fale com a equipe RedeSub pelo WhatsApp.",
    path: "/planos",
  },
  cobertura: {
    title: `Cobertura e disponibilidade | ${SITE_NAME}`,
    description:
      "Consulte as regiões atendidas pela RedeSub e verifique disponibilidade no seu endereço com nossa equipe local.",
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
      "Consulte soluções de internet para pequenos negócios, escritórios e operações que dependem de conectividade.",
    path: "/para-empresas",
  },
  velocidade: {
    title: `Teste de velocidade | ${SITE_NAME}`,
    description:
      "Meça a velocidade da sua conexão com o teste de velocidade RedeSub.",
    path: "/teste-de-velocidade",
  },
  notFound: {
    title: `Página não encontrada | ${SITE_NAME}`,
    description: "A página que você procura não foi encontrada.",
    path: "/404",
  },
};

export const SITE_TAGLINE =
  "Internet de fibra com atendimento local para você assistir, trabalhar e viver conectado.";
