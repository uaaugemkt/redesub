import { REFERRAL_URL } from "../lib/constants";

export type HeroSlideLink =
  | { type: "internal"; to: string }
  | { type: "external"; href: string };

/**
 * Slides do hero (Home) — image-only.
 * O texto comercial já está na arte; a UI não renderiza copy sobre a imagem.
 */
export interface HeroSlide {
  id: string;
  imageSrc: string;
  imageAlt: string;
  /** Rótulo acessível do slide (não exibido visualmente). */
  label: string;
  /** Destino opcional ao clicar no banner (sem botão sobre a arte). */
  link?: HeroSlideLink;
}

export const HERO_SLIDES: readonly HeroSlide[] = [
  {
    id: "planos",
    imageSrc: "/media/banners/banner1.webp",
    imageAlt: "Campanha RedeSub — planos de internet de fibra",
    label: "Planos RedeSub",
    link: { type: "internal", to: "/#planos" },
  },
  {
    id: "indique",
    imageSrc: "/media/banners/banner2.webp",
    imageAlt: "Campanha RedeSub — Indique e Ganhe",
    label: "Indique e Ganhe",
    link: { type: "external", href: REFERRAL_URL },
  },
  {
    id: "conteudos",
    imageSrc: "/media/banners/banner3.webp",
    imageAlt: "Campanha RedeSub — pacotes de conteúdos",
    label: "Conteúdos RedeSub",
    link: { type: "internal", to: "/#conteudos" },
  },
] as const;

export const HERO_AUTOPLAY_MS = 6000;
