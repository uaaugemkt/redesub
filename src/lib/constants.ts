/**
 * ═══════════════════════════════════════════════════════════════
 * CONFIGURAÇÕES CENTRAIS DA REDESUB
 * Altere os valores abaixo para atualizar toda a landing page.
 * ═══════════════════════════════════════════════════════════════
 */

/** Caminho do logotipo em /public */
export const LOGO_SRC = "/logo-redesub.webp";

/**
 * WhatsApp para contratação (formato internacional, sem + ou espaços).
 * Se o número de WhatsApp for diferente do telefone exibido, altere apenas aqui.
 */
export const WHATSAPP_NUMBER = "5591993100223";

/** Telefone/WhatsApp exibido na página */
export const PHONE_DISPLAY = "91 99310-0223";
export const WHATSAPP_DISPLAY = "91 99310-0223";

/**
 * URLs externas oficiais — fonte única para links comerciais e de assinante.
 * Env vars em integrations.ts podem sobrescrever quando existirem.
 */
export const REFERRAL_URL = "https://redesub.conecte.ai/indique";

export const SUBSCRIBER_PORTAL_URL =
  "https://sgp.redesub.com/accounts/central/login?_gl=1*1x07x3b*_ga*MTE4MzUwNDcyOS4xNzIyNjIxODQ1*_ga_M3Z9MC0V4N*MTcyODA3MzkxMi42LjEuMTcyODA3Mzk1Mi4wLjAuMA..*_gcl_au*MTM1MjQ5NTUxMC4xNzIyNjIxODQ0";

export const SPEED_TEST_URL = "https://velocimetro.redesub.com";

export const ADDRESS = {
  street: "Av. Nossa Sra. da Conceição, 31",
  neighborhood: "São João do Outeiro",
  city: "Belém/PA",
  full: "Av. Nossa Sra. da Conceição, 31, São João do Outeiro, Belém/PA",
};

export const GOOGLE_REVIEWS_URL =
  "https://g.page/r/CSMU0CwoaFW0EAs/review";

export {
  INSTAGRAM_HANDLE,
  INSTAGRAM_PROFILE_URL,
} from "./instagram";

/** Mapa e localização — altere aqui para atualizar iframe e link */
export const MAP = {
  query: "Av. Nossa Sra. da Conceição, 31, São João do Outeiro, Belém, PA, Brasil",
  embedUrl:
    "https://maps.google.com/maps?q=Av.+Nossa+Sra.+da+Conceição,+31,+São+João+do+Outeiro,+Belém,+PA,+Brasil&z=16&output=embed",
  openUrl:
    "https://www.google.com/maps/search/?api=1&query=Av.+Nossa+Sra.+da+Conceição,+31,+São+João+do+Outeiro,+Belém,+PA,+Brasil",
};

export { PLANS } from "./plans";

export const PROBLEM_TIMELINE = [
  {
    time: "08:00",
    icon: "video",
    category: "Trabalho",
    bad: {
      title: "Chamada de trabalho travando",
      description:
        "Imagem congela, áudio corta e você perde credibilidade.",
      badge: "TRAVA",
      badgeKey: "trava",
    },
    good: {
      title: "Reunião fluindo melhor",
      description:
        "Mais estabilidade para trabalhar e participar de chamadas sem tantas interrupções.",
      badge: "ESTÁVEL",
      badgeKey: "estavel",
    },
  },
  {
    time: "14:00",
    icon: "school",
    category: "Estudos",
    bad: {
      title: "Vídeo carregando na aula",
      description:
        "Buffer constante, aula interrompida e frustração tomando conta.",
      badge: "CARREGANDO",
      badgeKey: "carregando",
    },
    good: {
      title: "Aula fluindo sem pausas",
      description:
        "Com a RedeSub, o conteúdo roda melhor para estudar sem interrupções.",
      badge: "FLUINDO",
      badgeKey: "fluindo",
    },
  },
  {
    time: "20:00",
    icon: "tv",
    category: "Streaming",
    bad: {
      title: "Filme travando na TV",
      description:
        "Série no streaming, cena de suspense virando rodinha de loading.",
      badge: "BUFFER",
      badgeKey: "buffer",
    },
    good: {
      title: "Streaming sem interrupções",
      description:
        "Com a RedeSub, sua noite rende mais com filmes e séries rodando liso.",
      badge: "SEM TRAVAS",
      badgeKey: "sem-travas",
    },
  },
  {
    time: "22:00",
    icon: "game",
    category: "Jogos",
    bad: {
      title: "Jogo online com ping alto",
      description:
        "Lag no multiplayer, atraso nos comandos e derrota por culpa da conexão.",
      badge: "PING ALTO",
      badgeKey: "ping",
    },
    good: {
      title: "Mais estabilidade para jogar",
      description:
        "Com a RedeSub, sua conexão responde melhor para jogar com mais tranquilidade.",
      badge: "MAIS ESTÁVEL",
      badgeKey: "mais-estavel",
    },
  },
] as const;

export interface CompareProblem {
  id: string;
  text: string;
  relatedBenefitId: string;
}

export interface CompareBenefit {
  id: string;
  text: string;
  featured: boolean;
}

export const COMPARE = {
  bad: {
    title: "Internet que dá dor de cabeça",
    status: "Instável",
    items: [
      {
        id: "freeze",
        text: "Trava quando a casa toda conecta",
        relatedBenefitId: "wifi",
      },
      {
        id: "support",
        text: "Suporte difícil de alcançar",
        relatedBenefitId: "support",
      },
      {
        id: "router",
        text: "Roteador mal posicionado",
        relatedBenefitId: "wifi",
      },
      {
        id: "peak",
        text: "Instabilidade em horários de pico",
        relatedBenefitId: "fiber",
      },
      {
        id: "remember",
        text: "Você só lembra dela quando dá problema",
        relatedBenefitId: "local",
      },
    ] satisfies readonly CompareProblem[],
  },
  good: {
    title: "Uma conexão para acompanhar sua rotina",
    items: [
      { id: "fiber", text: "100% fibra óptica", featured: true },
      { id: "wifi", text: "Wi-Fi pensado para a casa toda", featured: false },
      { id: "support", text: "Suporte 7 dias por semana", featured: true },
      {
        id: "apps",
        text: "Planos com apps e recursos extras",
        featured: false,
      },
      {
        id: "app",
        text: "Controle pelo app do assinante",
        featured: false,
      },
      {
        id: "local",
        text: "Atendimento local de verdade",
        featured: true,
      },
    ] satisfies readonly CompareBenefit[],
  },
} as const;

export const NAV_LINKS = [
  { label: "Planos", href: "/#planos" },
  { label: "Benefícios", href: "/#beneficios" },
  { label: "Suporte", href: "/atendimento#suporte-rapido" },
  { label: "Depoimentos", href: "/#depoimentos" },
  { label: "Contato", href: "/#contato" },
] as const;
