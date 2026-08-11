/**
 * Cloudflare Pages Function — GET /api/google-reviews
 *
 * Secrets (Cloudflare Pages → Settings → Environment variables):
 * - GOOGLE_PLACES_API_KEY  (server-side only; nunca VITE_*)
 * - GOOGLE_PLACE_ID        (Place ID oficial da unidade RedeSub no Google)
 *
 * Place ID ainda não está no repositório — forneça o valor verificável
 * (Google Business Profile / Place Details / URL completa do Maps com place_id=).
 */

type Env = {
  GOOGLE_PLACES_API_KEY?: string;
  GOOGLE_PLACE_ID?: string;
};

type GooglePlacesReview = {
  author_name?: string;
  rating?: number;
  text?: string;
  relative_time_description?: string;
  profile_photo_url?: string;
};

type PlaceDetailsResponse = {
  status?: string;
  error_message?: string;
  result?: {
    rating?: number;
    user_ratings_total?: number;
    reviews?: GooglePlacesReview[];
  };
};

type NormalizedReview = {
  authorName: string;
  rating: number;
  text: string;
  relativeTime?: string;
  authorPhoto?: string;
};

type NormalizedPayload = {
  averageRating: number | null;
  totalReviews: number | null;
  reviews: NormalizedReview[];
  meta?: {
    configured: boolean;
    missing?: string[];
    source?: string;
    message?: string;
  };
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "public, max-age=300",
  "Content-Type": "application/json; charset=utf-8",
};

function json(body: NormalizedPayload, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: corsHeaders });
}

function emptyPayload(
  missing: string[],
  message: string,
  status = 503
): Response {
  return json(
    {
      averageRating: null,
      totalReviews: null,
      reviews: [],
      meta: {
        configured: false,
        missing,
        message,
      },
    },
    status
  );
}

function normalizeReviews(raw: GooglePlacesReview[] | undefined): NormalizedReview[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .map((item) => {
      const authorName = item.author_name?.trim() ?? "";
      const text = item.text?.trim() ?? "";
      const rating =
        typeof item.rating === "number" && Number.isFinite(item.rating)
          ? item.rating
          : null;

      if (!authorName || !text || rating === null) return null;

      const relativeTime = item.relative_time_description?.trim() || undefined;
      const authorPhoto = item.profile_photo_url?.trim() || undefined;

      return {
        authorName,
        rating,
        text,
        ...(relativeTime ? { relativeTime } : {}),
        ...(authorPhoto ? { authorPhoto } : {}),
      } satisfies NormalizedReview;
    })
    .filter((item): item is NormalizedReview => item !== null)
    .slice(0, 6);
}

export const onRequestOptions: PagesFunction = async () =>
  new Response(null, { status: 204, headers: corsHeaders });

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const apiKey = context.env.GOOGLE_PLACES_API_KEY?.trim() ?? "";
  const placeId = context.env.GOOGLE_PLACE_ID?.trim() ?? "";
  const missing: string[] = [];

  if (!apiKey) missing.push("GOOGLE_PLACES_API_KEY");
  if (!placeId) missing.push("GOOGLE_PLACE_ID");

  if (missing.length > 0) {
    return emptyPayload(
      missing,
      "Configure GOOGLE_PLACES_API_KEY e GOOGLE_PLACE_ID nas Environment Variables do Cloudflare Pages (escopo server-side / Functions)."
    );
  }

  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", placeId);
  url.searchParams.set(
    "fields",
    "name,rating,user_ratings_total,reviews"
  );
  url.searchParams.set("language", "pt-BR");
  url.searchParams.set("reviews_sort", "most_relevant");
  url.searchParams.set("key", apiKey);

  try {
    const upstream = await fetch(url.toString());
    if (!upstream.ok) {
      return emptyPayload(
        [],
        `Falha ao consultar Google Places (HTTP ${upstream.status}).`,
        502
      );
    }

    const data = (await upstream.json()) as PlaceDetailsResponse;

    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
      return emptyPayload(
        [],
        data.error_message ||
          `Google Places retornou status ${data.status ?? "desconhecido"}.`,
        502
      );
    }

    const result = data.result ?? {};
    const reviews = normalizeReviews(result.reviews);
    const averageRating =
      typeof result.rating === "number" && Number.isFinite(result.rating)
        ? result.rating
        : null;
    const totalReviews =
      typeof result.user_ratings_total === "number" &&
      Number.isFinite(result.user_ratings_total)
        ? result.user_ratings_total
        : null;

    return json({
      averageRating,
      totalReviews,
      reviews,
      meta: {
        configured: true,
        source: "google-places-details",
      },
    });
  } catch {
    return emptyPayload([], "Erro de rede ao consultar Google Places.", 502);
  }
};
