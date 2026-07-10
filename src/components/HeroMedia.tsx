import { useEffect, useRef } from "react";
import { HERO_VIDEO_POSTER, HERO_VIDEO_SRC } from "../config/integrations";

/**
 * Área lateral do hero preparada para vídeo leve aprovado.
 * Sem arquivo configurado, exibe apenas o painel visual existente (fallback).
 */
export default function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!HERO_VIDEO_SRC || !videoRef.current) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const video = videoRef.current;

    const applyMotionPreference = () => {
      if (media.matches) {
        video.pause();
        video.removeAttribute("autoplay");
      }
    };

    applyMotionPreference();
    media.addEventListener("change", applyMotionPreference);
    return () => media.removeEventListener("change", applyMotionPreference);
  }, []);

  if (!HERO_VIDEO_SRC) {
    return null;
  }

  return (
    <div className="hero-media">
      <video
        ref={videoRef}
        className="hero-media__video"
        src={HERO_VIDEO_SRC}
        poster={HERO_VIDEO_POSTER}
        muted
        playsInline
        loop
        autoPlay
        preload="metadata"
        width={480}
        height={270}
        aria-label="Vídeo institucional RedeSub"
      />
    </div>
  );
}
