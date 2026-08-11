/**
 * Configuração server-side Google Places (Cloudflare Pages Functions).
 * Nunca importar este módulo no frontend Vite.
 */

/** Place ID oficial RedeSub — fonte única no backend. */
export const GOOGLE_PLACE_ID = "ChIJYQ462h5npJIR7A9WTihGjdo";

/** Secret Cloudflare Pages (Functions): GOOGLE_PLACES_API_KEY — sem prefixo VITE_. */
export const GOOGLE_PLACES_API_KEY_ENV = "GOOGLE_PLACES_API_KEY";

/**
 * FieldMask Places API (New) — apenas campos necessários.
 * Sem wildcard `*`.
 */
export const GOOGLE_PLACES_FIELD_MASK = [
  "displayName",
  "rating",
  "userRatingCount",
  "reviews",
  "googleMapsUri",
].join(",");
