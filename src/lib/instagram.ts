/**
 * Instagram RedeSub — dados e tipos para o feed público.
 *
 * `posts` só deve receber mídia oficial (estática validada ou Graph API via backend).
 * Não inventar imagens, legendas ou permalinks.
 *
 * Assets esperados (quando fornecidos):
 *   public/media/instagram/post-01.webp
 *   …
 *   public/media/instagram/post-12.webp
 *
 * Estrutura por item:
 *   { id, mediaUrl, permalink, mediaType, caption?, timestamp? }
 *
 * Ambiente atual: não foi possível listar/baixar as 12 publicações públicas
 * de @redesubfibra de forma confiável (perfil/API bloqueados ou sem token).
 * Manter `posts` vazio até receber assets + permalinks reais.
 *
 * É necessário fornecer/baixar as 12 imagens reais.
 */

export type InstagramMediaType = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";

export type InstagramPost = {
  id: string;
  mediaType: InstagramMediaType;
  mediaUrl: string;
  thumbnailUrl?: string;
  permalink: string;
  caption?: string;
  timestamp?: string;
};

export type InstagramFeed = {
  handle: string;
  profileUrl: string | null;
  posts: InstagramPost[];
  /** Máximo de posts exibidos na Home quando houver feed real. */
  displayLimit: number;
};

/** Handle oficial informado pela RedeSub (sem @). */
export const INSTAGRAM_HANDLE = "redesubfibra";

/**
 * URL pública do perfil. Derivada do handle oficial @redesubfibra.
 * Pode ser sobrescrita via VITE_INSTAGRAM_PROFILE_URL em integrations.
 */
export const INSTAGRAM_PROFILE_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

/**
 * Slots estáticos prontos para cadastro (sem mediaUrl até existirem arquivos reais).
 * Preencha `mediaUrl` + `permalink` apenas com dados verificados.
 */
export const INSTAGRAM_STATIC_SLOTS: ReadonlyArray<{
  id: string;
  mediaUrl: string;
  fileName: string;
}> = Array.from({ length: 12 }, (_, index) => {
  const n = String(index + 1).padStart(2, "0");
  return {
    id: `redesubfibra-post-${n}`,
    fileName: `post-${n}.webp`,
    mediaUrl: `/media/instagram/post-${n}.webp`,
  };
});

/**
 * Feed oficial. Sem assets/posts Instagram cadastrados no repositório neste momento.
 * Quando houver posts reais, popular `posts` (máx. 12) — exemplo:
 *
 * {
 *   id: INSTAGRAM_STATIC_SLOTS[0].id,
 *   mediaType: "IMAGE",
 *   mediaUrl: INSTAGRAM_STATIC_SLOTS[0].mediaUrl,
 *   permalink: "https://www.instagram.com/redesubfibra/p/REAL_SHORTCODE/",
 * }
 */
export const INSTAGRAM_FEED: InstagramFeed = {
  handle: INSTAGRAM_HANDLE,
  profileUrl: INSTAGRAM_PROFILE_URL,
  posts: [],
  displayLimit: 12,
};

export function getDisplayInstagramPosts(
  feed: InstagramFeed = INSTAGRAM_FEED
): InstagramPost[] {
  return feed.posts.slice(0, feed.displayLimit);
}

export function hasInstagramPosts(feed: InstagramFeed = INSTAGRAM_FEED): boolean {
  return feed.posts.length > 0;
}

export function formatInstagramHandle(handle: string): string {
  const cleaned = handle.trim().replace(/^@+/, "");
  return cleaned ? `@${cleaned}` : "";
}

/** Aceita apenas URL http(s) não vazia e sem placeholders. */
export function resolveInstagramProfileUrl(
  raw: string | null | undefined
): string | null {
  const url = raw?.trim() ?? "";
  if (!url) return null;
  if (/TODO|example|placeholder/i.test(url)) return null;

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
    return parsed.toString();
  } catch {
    return null;
  }
}
