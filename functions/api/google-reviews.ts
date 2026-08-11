/**
 * Cloudflare Pages Function — GET /api/google-reviews
 *
 * Place ID: centralizado em functions/config/google-places.ts
 * Secret Cloudflare (server-side only): GOOGLE_PLACES_API_KEY
 *
 * Nunca expor a API key no frontend / VITE_*.
 */

import {
  GOOGLE_PLACE_ID,
  GOOGLE_PLACES_API_KEY_ENV,
  GOOGLE_PLACES_FIELD_MASK,
} from "../config/google-places";

type Env = {
  GOOGLE_PLACES_API_KEY?: string;
  /** Opcional: sobrescreve o Place ID centralizado (não obrigatório). */
  GOOGLE_PLACE_ID?: string;
};

type PlacesText = {
  text?: string;
  languageCode?: string;
};

type PlacesAuthorAttribution = {
  displayName?: string;
  uri?: string;
  photoUri?: string;
};

type PlacesReview = {
  rating?: number;
  text?: PlacesText;
  originalText?: PlacesText;
  relativePublishTimeDescription?: string;
  authorAttribution?: PlacesAuthorAttribution;
};

type PlaceDetailsNewResponse = {
  displayName?: PlacesText;
  rating?: number;
  userRatingCount?: number;
  reviews?: PlacesReview[];
  googleMapsUri?: string;
  error?: {
    code?: number;
    message?: string;
    status?: string;
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

function resolvePlaceId(env: Env): string {
  const fromEnv = env.GOOGLE_PLACE_ID?.trim() ?? "";
  return fromEnv || GOOGLE_PLACE_ID;
}

function reviewText(item: PlacesReview): string {
  const primary = item.text?.text?.trim() ?? "";
  if (primary) return primary;
  return item.originalText?.text?.trim() ?? "";
}

function normalizeReviews(raw: PlacesReview[] | undefined): NormalizedReview[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .map((item) => {
      const authorName = item.authorAttribution?.displayName?.trim() ?? "";
      const text = reviewText(item);
      const rating =
        typeof item.rating === "number" && Number.isFinite(item.rating)
          ? item.rating
          : null;

      if (!authorName || !text || rating === null) return null;

      const relativeTime =
        item.relativePublishTimeDescription?.trim() || undefined;
      const authorPhoto = item.authorAttribution?.photoUri?.trim() || undefined;

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
  const placeId = resolvePlaceId(context.env);

  if (!apiKey) {
    return emptyPayload(
      [GOOGLE_PLACES_API_KEY_ENV],
      "Configure GOOGLE_PLACES_API_KEY nas Environment Variables do Cloudflare Pages (Functions / server-side)."
    );
  }

  if (!placeId) {
    return emptyPayload(
      ["GOOGLE_PLACE_ID"],
      "Place ID não configurado no servidor."
    );
  }

  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=pt-BR`;

  try {
    const upstream = await fetch(url, {
      method: "GET",
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": GOOGLE_PLACES_FIELD_MASK,
        Accept: "application/json",
        "Accept-Language": "pt-BR",
      },
    });

    const data = (await upstream.json()) as PlaceDetailsNewResponse;

    if (!upstream.ok) {
      return emptyPayload(
        [],
        "Não foi possível carregar as avaliações no momento.",
        upstream.status >= 500 ? 502 : 503
      );
    }

    if (data.error) {
      return emptyPayload(
        [],
        "Não foi possível carregar as avaliações no momento.",
        502
      );
    }

    const reviews = normalizeReviews(data.reviews);
    const averageRating =
      typeof data.rating === "number" && Number.isFinite(data.rating)
        ? data.rating
        : null;
    const totalReviews =
      typeof data.userRatingCount === "number" &&
      Number.isFinite(data.userRatingCount)
        ? data.userRatingCount
        : null;

    return json({
      averageRating,
      totalReviews,
      reviews,
      meta: {
        configured: true,
        source: "google-places-api-new",
      },
    });
  } catch {
    return emptyPayload(
      [],
      "Não foi possível carregar as avaliações no momento.",
      502
    );
  }
};
