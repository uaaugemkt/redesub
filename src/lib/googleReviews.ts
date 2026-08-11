/**
 * Google Reviews / prova social — fonte de dados e tipos.
 *
 * Fonte preferencial: GET /api/google-reviews (Cloudflare Pages Function),
 * com GOOGLE_PLACES_API_KEY + GOOGLE_PLACE_ID apenas no server.
 *
 * `reviews` só recebe avaliações reais. Nunca inventar avaliações, notas ou autores.
 *
 * URL do perfil: `GOOGLE_REVIEWS_URL` em constants / integrations.
 */

export type GoogleReview = {
  authorName: string;
  rating: number;
  text: string;
  relativeTime?: string;
  authorPhoto?: string;
};

export type GoogleReviewsSummary = {
  averageRating: number | null;
  totalReviews: number | null;
  reviews: GoogleReview[];
};

export type GoogleReviewsApiMeta = {
  configured?: boolean;
  missing?: string[];
  source?: string;
  message?: string;
};

export type GoogleReviewsApiResponse = GoogleReviewsSummary & {
  meta?: GoogleReviewsApiMeta;
};

/** Fallback local vazio — sem reviews inventados. */
export const GOOGLE_REVIEWS_DATA: GoogleReviewsSummary = {
  averageRating: null,
  totalReviews: null,
  reviews: [],
};

/** Endpoint serverless (Cloudflare Pages Functions). */
export const GOOGLE_REVIEWS_API_PATH = "/api/google-reviews";

/** Máximo de cards exibidos na Home quando houver reviews reais. */
export const GOOGLE_REVIEWS_DISPLAY_LIMIT = 6;

export function getDisplayGoogleReviews(
  data: GoogleReviewsSummary = GOOGLE_REVIEWS_DATA
): GoogleReview[] {
  return data.reviews.slice(0, GOOGLE_REVIEWS_DISPLAY_LIMIT);
}

export function hasGoogleReviews(data: GoogleReviewsSummary = GOOGLE_REVIEWS_DATA): boolean {
  return data.reviews.length > 0;
}

function isValidReview(value: unknown): value is GoogleReview {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<GoogleReview>;
  return (
    typeof item.authorName === "string" &&
    item.authorName.trim().length > 0 &&
    typeof item.rating === "number" &&
    Number.isFinite(item.rating) &&
    typeof item.text === "string" &&
    item.text.trim().length > 0
  );
}

/** Normaliza payload da API; descarta campos inválidos (nunca inventa). */
export function normalizeGoogleReviewsPayload(
  raw: unknown
): GoogleReviewsSummary {
  if (!raw || typeof raw !== "object") {
    return { ...GOOGLE_REVIEWS_DATA };
  }

  const data = raw as Partial<GoogleReviewsApiResponse>;
  const reviews = Array.isArray(data.reviews)
    ? data.reviews.filter(isValidReview).slice(0, GOOGLE_REVIEWS_DISPLAY_LIMIT)
    : [];

  const averageRating =
    typeof data.averageRating === "number" && Number.isFinite(data.averageRating)
      ? data.averageRating
      : null;
  const totalReviews =
    typeof data.totalReviews === "number" && Number.isFinite(data.totalReviews)
      ? data.totalReviews
      : null;

  return {
    averageRating,
    totalReviews,
    reviews,
  };
}

/**
 * Consome o endpoint server-side. Em falha/ credenciais ausentes,
 * retorna estrutura vazia (UI pronta + CTA Google).
 */
export async function fetchGoogleReviews(
  signal?: AbortSignal
): Promise<GoogleReviewsSummary> {
  try {
    const response = await fetch(GOOGLE_REVIEWS_API_PATH, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal,
    });

    if (!response.ok) {
      try {
        const errorBody = (await response.json()) as unknown;
        return normalizeGoogleReviewsPayload(errorBody);
      } catch {
        return { ...GOOGLE_REVIEWS_DATA };
      }
    }

    const body = (await response.json()) as unknown;
    return normalizeGoogleReviewsPayload(body);
  } catch {
    return { ...GOOGLE_REVIEWS_DATA };
  }
}

/**
 * Aceita apenas URL http(s) não vazia e sem marcadores de placeholder.
 * Placeholder antigo `g.page/r/redesub/review` NÃO conta como perfil oficial.
 */
export function resolveGoogleReviewsProfileUrl(raw: string | null | undefined): string | null {
  const url = raw?.trim() ?? "";
  if (!url) return null;
  if (/TODO|example|placeholder|g\.page\/r\/redesub\/review/i.test(url)) return null;

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
    return parsed.toString();
  } catch {
    return null;
  }
}
