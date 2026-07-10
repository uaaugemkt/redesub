/**
 * Integrações externas pendentes — dependências de terceiros.
 * Não inventar endpoints ou credenciais aqui.
 */

/** URL da Central do Assinante (SGP ou portal oficial). Defina em VITE_SUBSCRIBER_PORTAL_URL */
export const SUBSCRIBER_PORTAL_URL =
  import.meta.env.VITE_SUBSCRIBER_PORTAL_URL?.trim() ?? "";

/**
 * URL de embed oficial do teste de velocidade (iframe permitido pelo fornecedor).
 * Defina em VITE_SPEED_TEST_EMBED_URL após validar X-Frame-Options / CSP.
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
