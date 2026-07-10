/** Scroll suave respeitando prefers-reduced-motion. */
export function scrollToElement(
  el: HTMLElement | null,
  behavior: ScrollBehavior = "smooth"
): void {
  if (!el) return;
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({
    behavior: reduced ? "auto" : behavior,
    block: "start",
  });
}
