/**
 * Requisitos de mídia — imagens finais a serem fornecidas pela RedeSub.
 * Os arquivos atuais em /public/media/placeholders/ são ilustrativos
 * e NÃO representam pessoas ou equipe reais da empresa.
 */

export interface MediaRequirement {
  id: string;
  title: string;
  description: string;
  suggestedPath: string;
  currentPlaceholder: string;
  aspectRatio: string;
  minWidth: number;
  status: "placeholder" | "pending_client";
}

export const MEDIA_REQUIREMENTS: MediaRequirement[] = [
  {
    id: "hero-main",
    title: "Hero principal",
    description: "Família ou casal usando internet em casa, ambiente residencial regional.",
    suggestedPath: "/media/hero-family.webp",
    currentPlaceholder: "/media/placeholders/hero-family.svg",
    aspectRatio: "4/5",
    minWidth: 800,
    status: "placeholder",
  },
  {
    id: "family-connected",
    title: "Família conectada",
    description: "Família em sala utilizando tablets, TV e celular simultaneamente.",
    suggestedPath: "/media/family-connected.webp",
    currentPlaceholder: "/media/placeholders/family-connected.svg",
    aspectRatio: "16/10",
    minWidth: 900,
    status: "placeholder",
  },
  {
    id: "home-office",
    title: "Home office",
    description: "Pessoa trabalhando em home office com videoconferência estável.",
    suggestedPath: "/media/home-office.webp",
    currentPlaceholder: "/media/placeholders/home-office.svg",
    aspectRatio: "4/3",
    minWidth: 800,
    status: "placeholder",
  },
  {
    id: "gaming-streaming",
    title: "Gamer / streaming",
    description: "Jovem jogando ou assistindo streaming com boa experiência.",
    suggestedPath: "/media/gaming-streaming.webp",
    currentPlaceholder: "/media/placeholders/gaming-streaming.svg",
    aspectRatio: "4/3",
    minWidth: 800,
    status: "placeholder",
  },
  {
    id: "technician",
    title: "Técnico RedeSub",
    description: "Técnico instalando ou verificando equipamento de fibra.",
    suggestedPath: "/media/technician.webp",
    currentPlaceholder: "/media/placeholders/technician.svg",
    aspectRatio: "16/10",
    minWidth: 900,
    status: "placeholder",
  },
  {
    id: "customer-support",
    title: "Atendimento ao cliente",
    description: "Atendimento humano, proximidade e suporte local.",
    suggestedPath: "/media/customer-support.webp",
    currentPlaceholder: "/media/placeholders/customer-support.svg",
    aspectRatio: "16/10",
    minWidth: 900,
    status: "placeholder",
  },
  {
    id: "small-business",
    title: "Pequeno negócio",
    description: "Comércio ou serviço local utilizando internet no dia a dia.",
    suggestedPath: "/media/small-business.webp",
    currentPlaceholder: "/media/placeholders/small-business.svg",
    aspectRatio: "16/10",
    minWidth: 900,
    status: "placeholder",
  },
  {
    id: "team-institutional",
    title: "Foto institucional / equipe",
    description: "Equipe ou representantes da RedeSub para página Sobre.",
    suggestedPath: "/media/team-institutional.webp",
    currentPlaceholder: "/media/placeholders/team-institutional.svg",
    aspectRatio: "16/9",
    minWidth: 1200,
    status: "placeholder",
  },
];
