import { Link } from "react-router-dom";
import { getMediaAlt, MEDIA } from "../config/media";
import HeroMedia from "../components/HeroMedia";
import MediaImage from "../components/ui/MediaImage";
import Reveal from "../components/ui/Reveal";
import WhatsAppButton from "../components/WhatsAppButton";
import { GOOGLE_REVIEWS_URL } from "../lib/constants";

const HERO_BENEFITS = [
  "Wi-Fi na casa toda",
  "100% fibra óptica",
  "Suporte 7 dias por semana",
] as const;

const HERO_TRUST = [
  "Atendimento local",
  "Instalação sob consulta",
  "Suporte próximo",
] as const;

export default function HeroSection() {
  return (
    <section className="hero hero--institutional" id="inicio">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__shape hero__shape--1" />
        <div className="hero__shape hero__shape--2" />
        <div className="hero__fiber-lines">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="hero__fiber-line" style={{ animationDelay: `${i * 0.4}s` }} />
          ))}
        </div>
      </div>

      <div className="container hero__grid hero__grid--institutional">
        <Reveal className="hero__content">
          <span className="badge badge--light">
            <span className="badge__dot" />
            Fibra óptica com atendimento regional
          </span>

          <h1 className="hero__title hero__title--xl">
            Internet de fibra para sua casa{" "}
            <span className="hero__title-accent">funcionar sem travar.</span>
          </h1>

          <p className="hero__subtitle hero__subtitle--lg">
            Planos de até 850 Mega, Wi-Fi na casa toda e suporte todos os dias
            para você assistir, jogar, trabalhar e resolver tudo online sem dor
            de cabeça.
          </p>

          <ul className="hero__trust-list">
            {HERO_TRUST.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="hero__ctas">
            <WhatsAppButton size="lg" className="btn--hero" />
            <Link to="/planos" className="btn btn--outline-light btn--lg">
              Ver planos
            </Link>
          </div>

          <div className="hero__social-proof">
            <div className="stars" aria-label="5 estrelas">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="18" height="18" viewBox="0 0 20 20" fill="var(--brand-orange)">
                  <path d="M10 1l2.39 4.84L18 6.68l-4 3.9.94 5.5L10 13.77l-4.94 2.6.94-5.5-4-3.9 5.61-.84z" />
                </svg>
              ))}
            </div>
            <p>
              Clientes reais avaliando a RedeSub no{" "}
              <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
                Google
              </a>
            </p>
          </div>
        </Reveal>

        <div className="hero__visual hero__visual--photo">
          <HeroMedia />
          <Reveal delay={120} className="hero__photo-wrap">
            <MediaImage
              src={MEDIA.heroMain()}
              alt={getMediaAlt("hero-main", "Família usando internet em casa")}
              width={560}
              height={700}
              priority
              isPlaceholder
              className="hero__photo"
            />
          </Reveal>

          <div className="hero-panel hero-panel--floating" aria-label="Plano em destaque">
            <div className="hero-panel__speed-card">
              <span className="hero-panel__label">Velocidade máxima</span>
              <div className="hero-panel__speed">
                <span className="hero-panel__speed-value">850</span>
                <span className="hero-panel__speed-unit">Mega</span>
              </div>
              <div className="hero-panel__speed-bar">
                <div className="hero-panel__speed-fill" />
              </div>
              <p className="hero-panel__tagline">Plano ideal para casas conectadas</p>
            </div>

            <ul className="hero-panel__benefits hero-panel__benefits--compact">
              {HERO_BENEFITS.map((benefit) => (
                <li key={benefit}>
                  <span className="hero-panel__check" aria-hidden="true">✓</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
