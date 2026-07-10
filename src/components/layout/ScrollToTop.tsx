import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function scrollToHashTarget(hash: string): boolean {
  const id = hash.replace(/^#/, "");
  if (!id) return false;

  const element = document.getElementById(id);
  if (!element) return false;

  element.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (hash) {
      let attempts = 0;
      const maxAttempts = 12;

      const tryScroll = () => {
        if (scrollToHashTarget(hash)) return;
        attempts += 1;
        if (attempts < maxAttempts) {
          window.setTimeout(tryScroll, 50);
        }
      };

      tryScroll();
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}
