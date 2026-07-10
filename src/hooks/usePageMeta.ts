import { useEffect } from "react";
import type { PageMeta } from "../config/site";

const CANONICAL_BASE = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "") ?? "";

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
    setMeta("og:title", meta.title, true);
    setMeta("og:description", meta.description, true);
    setMeta("og:type", "website", true);

    if (CANONICAL_BASE) {
      const canonical = `${CANONICAL_BASE}${meta.path === "/" ? "" : meta.path}`;
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonical;
      setMeta("og:url", canonical, true);
    }
  }, [meta]);
}
