import { useEffect } from "react";
import { OG_IMAGE, SITE_LOCALE, SITE_NAME, type PageMeta } from "../config/site";

const CANONICAL_BASE = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "") ?? "";

/**
 * Mantém título e metadados sincronizados durante a navegação do SPA.
 *
 * Isto NÃO é o que os robôs de preview de link (WhatsApp, Facebook) leem —
 * eles não executam JavaScript e enxergam apenas o HTML estático gerado por
 * scripts/prerender.mjs no build. Este hook cobre o outro lado: o título da
 * aba, o DOM renderizado que o Google avalia e as extensões que leem as tags
 * ao vivo. As duas fontes saem do mesmo PAGE_META, então não divergem.
 */
export function usePageMeta(meta: PageMeta) {
  useEffect(() => {
    document.title = meta.title;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", meta.description);
    setMeta("og:type", "website", true);
    setMeta("og:site_name", SITE_NAME, true);
    setMeta("og:locale", SITE_LOCALE, true);
    setMeta("og:title", meta.title, true);
    setMeta("og:description", meta.description, true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", meta.title);
    setMeta("twitter:description", meta.description);

    if (CANONICAL_BASE) {
      const canonical = `${CANONICAL_BASE}${meta.path === "/" ? "/" : meta.path}`;
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonical;
      setMeta("og:url", canonical, true);

      const image = `${CANONICAL_BASE}${OG_IMAGE.path}`;
      setMeta("og:image", image, true);
      setMeta("og:image:alt", OG_IMAGE.alt, true);
      setMeta("twitter:image", image);
    }
  }, [meta]);
}
