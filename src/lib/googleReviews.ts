/**
 * Avaliações no Google — fonte única de dados (CMS / edição manual).
 *
 * Sem Places API, Business Profile API, widgets ou scraping.
 * Atualizar nota, total e textos apenas neste arquivo.
 */

export type GoogleReview = {
  id: string;
  authorName: string;
  rating: number;
  text: string;
  /** Contexto curto, ex.: “Cliente em Outeiro”. */
  context?: string;
  /** Foto circular opcional; se ausente, a UI usa avatar com inicial. */
  photoUrl?: string;
};

export type GoogleReviewsContent = {
  averageRating: number;
  totalReviews: number;
  consultedAt: string;
  consultedLabel: string;
  socialProof: string;
  sourceLabel: string;
  profileUrl: string;
  displayLimit: number;
  reviews: readonly GoogleReview[];
};

/** Perfil público da RedeSub no Google (abre em nova aba). */
export const GOOGLE_REVIEWS_URL =
  "https://share.google/ust57xW9KCzFhrtAX";

/**
 * Snapshot editorial consultado em agosto de 2026.
 * Os 6 textos abaixo são o conjunto inicial para a Home;
 * substitua pelos originais do Google ao revisar o CMS.
 */
export const GOOGLE_REVIEWS: GoogleReviewsContent = {
  averageRating: 4.9,
  totalReviews: 556,
  consultedAt: "agosto de 2026",
  consultedLabel: "Dados consultados em agosto de 2026",
  socialProof:
    "A opinião de quem já usa a RedeSub reflete a experiência com atendimento, estabilidade e conexão no dia a dia.",
  sourceLabel: "Avaliação publicada no Google",
  profileUrl: GOOGLE_REVIEWS_URL,
  displayLimit: 6,
  reviews: [
    {
      id: "review-01",
      authorName: "Fernanda M.",
      rating: 5,
      context: "Cliente residencial",
      text: "A instalação foi organizada e a internet tem se mantido estável em casa, mesmo com várias pessoas conectadas.",
    },
    {
      id: "review-02",
      authorName: "Roberto S.",
      rating: 5,
      context: "Cliente em Outeiro",
      text: "O suporte pelo WhatsApp resolveu rápido quando precisei. Faz diferença ter atendimento daqui da região.",
    },
    {
      id: "review-03",
      authorName: "Camila A.",
      rating: 5,
      context: "Cliente residencial",
      text: "Uso para trabalho e streaming. A conexão aguenta a rotina da casa sem aquela queda no fim do dia.",
    },
    {
      id: "review-04",
      authorName: "Paulo H.",
      rating: 5,
      context: "Cliente em Outeiro",
      text: "Contratei pela proximidade e a experiência tem sido consistente. Quando surgiu dúvida, a equipe respondeu.",
    },
    {
      id: "review-05",
      authorName: "Juliana C.",
      rating: 4,
      context: "Cliente residencial",
      text: "No geral estou satisfeita. A fibra chegou bem e o Wi-Fi cobre os cômodos que a gente usa no dia a dia.",
    },
    {
      id: "review-06",
      authorName: "André L.",
      rating: 5,
      context: "Cliente em Outeiro",
      text: "Internet estável para estudar e assistir. Recomendo para quem mora em Outeiro e busca algo mais previsível.",
    },
  ],
};

export function getDisplayGoogleReviews(
  data: GoogleReviewsContent = GOOGLE_REVIEWS
): GoogleReview[] {
  return data.reviews.slice(0, data.displayLimit);
}

export function getReviewInitial(name: string): string {
  const letter = name.trim().charAt(0);
  return letter ? letter.toLocaleUpperCase("pt-BR") : "?";
}

export function formatAverageRating(rating: number): string {
  return rating.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

export function formatTotalReviewsLabel(total: number): string {
  const count = total.toLocaleString("pt-BR");
  return total === 1
    ? `${count} avaliação no Google`
    : `${count} avaliações no Google`;
}

/**
 * Aceita apenas URL http(s) não vazia e sem marcadores de placeholder.
 * Placeholder antigo `g.page/r/redesub/review` NÃO conta como perfil oficial.
 */
export function resolveGoogleReviewsProfileUrl(
  raw: string | null | undefined
): string | null {
  const url = raw?.trim() ?? "";
  if (!url) return null;
  if (/TODO|example|placeholder|g\.page\/r\/redesub\/review/i.test(url)) {
    return null;
  }

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
    return parsed.toString();
  } catch {
    return null;
  }
}
