import {
  GOOGLE_REVIEWS_URL as OFFICIAL_GOOGLE_REVIEWS_URL,
  SPEED_TEST_URL as OFFICIAL_SPEED_TEST_URL,
  SUBSCRIBER_PORTAL_URL as OFFICIAL_SUBSCRIBER_PORTAL_URL,
} from "../lib/constants";
import { resolveGoogleReviewsProfileUrl } from "../lib/googleReviews";
import {
  INSTAGRAM_HANDLE as OFFICIAL_INSTAGRAM_HANDLE,
  INSTAGRAM_PROFILE_URL as OFFICIAL_INSTAGRAM_PROFILE_URL,
  resolveInstagramProfileUrl,
} from "../lib/instagram";

/** URL da Central do Assinante (SGP / portal oficial) */
export const SUBSCRIBER_PORTAL_URL =
  import.meta.env.VITE_SUBSCRIBER_PORTAL_URL?.trim() ||
  OFFICIAL_SUBSCRIBER_PORTAL_URL;

/** URL pública oficial do teste de velocidade (página / link externo) */
export const SPEED_TEST_URL =
  import.meta.env.VITE_SPEED_TEST_URL?.trim() || OFFICIAL_SPEED_TEST_URL;

/**
 * URL de embed oficial do teste de velocidade (iframe permitido pelo fornecedor).
 * Defina em VITE_SPEED_TEST_EMBED_URL após validar X-Frame-Options / CSP.
 * Sem embed, a UI deve apontar para SPEED_TEST_URL.
 */
export const SPEED_TEST_EMBED_URL =
  import.meta.env.VITE_SPEED_TEST_EMBED_URL?.trim() ?? "";

/**
 * Vídeo curto do hero (hospedado externamente ou em /public).
 * Defina em VITE_HERO_VIDEO_SRC quando o arquivo aprovado estiver disponível.
 */
export const HERO_VIDEO_SRC =
  import.meta.env.VITE_HERO_VIDEO_SRC?.trim() ?? "";

/** Poster estático do hero quando vídeo não estiver configurado */
export const HERO_VIDEO_POSTER = "/logo-redesub.webp";

/**
 * URL pública do perfil Google Meu Negócio / avaliações.
 * Defina em VITE_GOOGLE_REVIEWS_URL ou em constants.GOOGLE_REVIEWS_URL
 * quando a RedeSub fornecer o link oficial.
 */
export const GOOGLE_REVIEWS_URL =
  import.meta.env.VITE_GOOGLE_REVIEWS_URL?.trim() || OFFICIAL_GOOGLE_REVIEWS_URL;

/** URL válida para CTA público; null se ainda pendente/placeholder. */
export const GOOGLE_REVIEWS_PROFILE_URL =
  resolveGoogleReviewsProfileUrl(GOOGLE_REVIEWS_URL);

/** Handle público do Instagram (sem @). */
export const INSTAGRAM_HANDLE =
  import.meta.env.VITE_INSTAGRAM_HANDLE?.trim().replace(/^@+/, "") ||
  OFFICIAL_INSTAGRAM_HANDLE;

/**
 * URL pública do perfil Instagram.
 * Defina VITE_INSTAGRAM_PROFILE_URL para sobrescrever o default.
 */
export const INSTAGRAM_PROFILE_URL =
  import.meta.env.VITE_INSTAGRAM_PROFILE_URL?.trim() ||
  OFFICIAL_INSTAGRAM_PROFILE_URL;

/** URL válida para CTA “Seguir no Instagram”; null se pendente. */
export const INSTAGRAM_PROFILE_HREF =
  resolveInstagramProfileUrl(INSTAGRAM_PROFILE_URL);

/**
 * Pendências SGP/ERP — informações necessárias para integração futura:
 * - URL base da API
 * - Documentação técnica
 * - Endpoint de consulta de cobertura / viabilidade
 * - Endpoint de autenticação (CPF/CNPJ)
 * - Método de autenticação e credenciais de homologação
 * - Exemplos de request/response
 * - Limites de requisição e regras de CORS
 * - Campos obrigatórios e tratamento de CPF/CNPJ
 * - Webhooks, se existirem
 * - Ambiente de homologação e política LGPD
 */