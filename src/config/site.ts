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
  { label: "Suporte", path: "/suporte" },
  { label: "Sobre a RedeSub", path: "/sobre" },
  { label: "Contato", path: "/contato" },
] as const;

export const FOOTER_NAV = {
  institucional: [
    { label: "Sobre a RedeSub", path: "/sobre" },
    { label: "Cobertura", path: "/cobertura" },
    { label: "Contato", path: "/contato" },
    { label: "Para empresas", path: "/para-empresas" },
  ],
  servicos: [
    { label: "Planos", path: "/planos" },
    { label: "Suporte", path: "/suporte" },
    { label: "Teste de velocidade", path: "/teste-de-velocidade" },
    { label: "Central do Assinante", path: "/suporte#central-assinante" },
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
  suporte: {
    title: `Suporte técnico | ${SITE_NAME}`,
    description:
      "Suporte técnico rápido pelo WhatsApp, orientações iniciais e acesso à Central do Assinante.",
    path: "/suporte",
  },
  sobre: {
    title: `Sobre a RedeSub | ${SITE_NAME}`,
    description:
      "Conheça a RedeSub: internet de fibra com atendimento regional, proximidade e suporte humano.",
    path: "/sobre",
  },
  contato: {
    title: `Contato | ${SITE_NAME}`,
    description:
      "Fale com a RedeSub pelo WhatsApp, consulte disponibilidade e encontre nosso endereço de atendimento.",
    path: "/contato",
  },
  empresas: {
    title: `Internet para empresas | ${SITE_NAME}`,
    description:
      "Soluções de internet para pequenos negócios com atendimento local. Consulte viabilidade com a equipe RedeSub.",
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
