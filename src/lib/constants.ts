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
 * Se o número de WhatsApp for diferente do telefone fixo, altere apenas aqui.
 */
export const WHATSAPP_NUMBER = "559129920014";

/** Telefone/WhatsApp exibido na página */
export const PHONE_DISPLAY = "(91) 2992-0014";
export const WHATSAPP_DISPLAY = "(91) 2992-0014";

export const ADDRESS = {
  street: "Av. Nossa Sra. da Conceição, 31",
  neighborhood: "São João do Outeiro",
  city: "Belém/PA",
  full: "Av. Nossa Sra. da Conceição, 31, São João do Outeiro, Belém/PA",
};

export const GOOGLE_REVIEWS_URL = "https://g.page/r/redesub/review"; // TODO: URL real do Google

/** Mapa e localização — altere aqui para atualizar iframe e link */
export const MAP = {
  query: "Av. Nossa Sra. da Conceição, 31, São João do Outeiro, Belém, PA, Brasil",
  embedUrl:
    "https://maps.google.com/maps?q=Av.+Nossa+Sra.+da+Conceição,+31,+São+João+do+Outeiro,+Belém,+PA,+Brasil&z=16&output=embed",
  openUrl:
    "https://www.google.com/maps/search/?api=1&query=Av.+Nossa+Sra.+da+Conceição,+31,+São+João+do+Outeiro,+Belém,+PA,+Brasil",
};

export const PLANS = [
  {
    id: "basico",
    name: "Básico",
    speed: "450 Mega",
    price: "115,90",
    profile:
      "Casa conectada, redes sociais, vídeos e trabalho leve.",
    features: [
      "Wi-Fi na casa toda",
      "100% fibra óptica",
      "Roteador inteligente em comodato",
      "Velocidade simétrica",
      "Suporte 7 dias por semana",
      "Apps inclusos",
    ],
    recommended: false,
    badge: null as string | null,
  },
  {
    id: "seguranca",
    name: "Segurança",
    speed: "650 Mega",
    price: "175,90",
    profile:
      "Famílias, vários dispositivos, home office e câmera IP.",
    features: [
      "Tudo do plano Básico",
      "Câmera IP Full HD em comodato",
      "Cartão de memória incluso",
      "Ideal para famílias conectadas",
      "Apps inclusos",
    ],
    recommended: true,
    badge: "Melhor escolha para famílias",
  },
  {
    id: "evolucao",
    name: "Evolução",
    speed: "850 Mega",
    price: "205,90",
    profile:
      "Máxima performance, jogos, streaming pesado e IP fixo.",
    features: [
      "Tudo do plano Segurança",
      "IP fixo incluso",
      "Máxima performance",
      "Streaming em alta qualidade",
      "Apps inclusos",
    ],
    recommended: false,
    badge: null as string | null,
  },
] as const;

export const PROBLEM_TIMELINE = [
  {
    time: "08:00",
    title: "Chamada de trabalho travando",
    description: "Reunião importante, imagem congelada, áudio cortando — e você perdendo credibilidade.",
    pain: "Trava",
    icon: "video",
  },
  {
    time: "14:00",
    title: "Vídeo carregando na aula",
    description: "Criança esperando o buffer, aula interrompida e frustração tomando conta da sala.",
    pain: "Carregando",
    icon: "school",
  },
  {
    time: "20:00",
    title: "Filme travando na TV",
    description: "Série no streaming, cena de suspense virando rodinha de loading. Noite perdida.",
    pain: "Buffer",
    icon: "tv",
  },
  {
    time: "22:00",
    title: "Jogo online com ping alto",
    description: "Lag no multiplayer, time reclamando no chat e derrota garantida por culpa da conexão.",
    pain: "Ping alto",
    icon: "game",
  },
] as const;

export const COMPARE = {
  bad: {
    title: "Internet que dá dor de cabeça",
    items: [
      "Trava quando a casa toda conecta",
      "Suporte difícil de alcançar",
      "Roteador mal posicionado",
      "Instabilidade em horários de pico",
      "Você só lembra dela quando dá problema",
    ],
  },
  good: {
    title: "RedeSub funcionando do seu jeito",
    items: [
      "100% fibra óptica",
      "Wi-Fi pensado para a casa toda",
      "Suporte 7 dias por semana",
      "Planos com apps e recursos extras",
      "Controle pelo app do assinante",
      "Atendimento local de verdade",
    ],
  },
} as const;

// TODO: Substituir por depoimentos reais do Google quando disponíveis
export const TESTIMONIALS = [
  {
    name: "Maria S.",
    location: "Ilha de Outeiro",
    rating: 5,
    date: "há 2 meses",
    text: "Internet estável o dia todo. Minha família usa ao mesmo tempo e não trava mais. Atendimento rápido pelo WhatsApp.",
  },
  {
    name: "Carlos R.",
    location: "São João do Outeiro",
    rating: 5,
    date: "há 1 mês",
    text: "Migrei para a RedeSub e a diferença é enorme. Fibra de verdade, suporte que resolve e preço justo.",
  },
  {
    name: "Ana P.",
    location: "Belém",
    rating: 5,
    date: "há 3 semanas",
    text: "Trabalho em home office e preciso de internet confiável. A RedeSub entrega estabilidade que eu não tinha antes.",
  },
] as const;

export const NAV_LINKS = [
  { label: "Planos", href: "#planos" },
  { label: "Benefícios", href: "#beneficios" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato", href: "#contato" },
] as const;
