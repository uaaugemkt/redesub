import WhatsAppButton from "../components/WhatsAppButton";
import HeroMedia from "../components/HeroMedia";
import { GOOGLE_REVIEWS_URL } from "../lib/constants";

const HERO_BENEFITS = [
  "Wi-Fi na casa toda",
  "100% fibra óptica",
  "Suporte 7 dias por semana",
  "Velocidade simétrica",
  "Apps inclusos",
  "Roteador inteligente em comodato",
] as const;

const HERO_BADGES = [
  { id: "seal", label: "Mais performance para assistir, jogar e trabalhar", className: "hero-panel__badge--seal" },
  { id: "fibra", label: "Fibra 100%", className: "hero-panel__badge--fibra" },
  { id: "wifi", label: "Wi-Fi total", className: "hero-panel__badge--wifi" },
  { id: "suporte", label: "Suporte 7 dias", className: "hero-panel__badge--suporte" },
] as const;

export default function HeroSection() {
  return (
    <section className="hero" id="inicio">
      <div className="hero__bg">
        <div className="hero__waves hero__waves--top" aria-hidden="true">
          <svg viewBox="0 0 1440 200" preserveAspectRatio="none">
            <path
              fill="rgba(3, 161, 253, 0.06)"
              d="M0,100 C240,20 480,180 720,100 C960,20 1200,160 1440,80 L1440,0 L0,0 Z"
            />
          </svg>
        </div>
        <div className="hero__waves" aria-hidden="true">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path
              fill="rgba(255,255,255,0.05)"
              d="M0,160 C360,80 720,240 1080,160 C1260,120 1380,140 1440,160 L1440,320 L0,320 Z"
            />
          </svg>
        </div>
        <div className="hero__glow hero__glow--1" aria-hidden="true" />
        <div className="hero__glow hero__glow--2" aria-hidden="true" />
        <div className="hero__fiber-lines" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="hero__fiber-line" style={{ animationDelay: `${i * 0.35}s` }} />
          ))}
        </div>
      </div>

      <div className="container hero__grid">
        <div className="hero__content">
          <span className="badge badge--light">
            <span className="badge__dot" />
            Fibra óptica na Ilha de Outeiro
          </span>

          <h1 className="hero__title">
            Internet de fibra para sua casa{" "}
            <span className="hero__title-accent">funcionar sem travar.</span>
          </h1>

          <p className="hero__subtitle">
            Planos de até 850 Mega, Wi-Fi na casa toda e suporte todos os dias
            para você assistir, jogar, trabalhar e resolver tudo online sem dor
            de cabeça.
          </p>

          <div className="hero__ctas">
            <WhatsAppButton size="lg" className="btn--hero" />
            <a href="#planos" className="btn btn--outline-light btn--lg">
              Ver planos
            </a>
          </div>

          <div className="hero__social-proof">
            <div className="stars" aria-label="5 estrelas">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="var(--orange)">
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
        </div>

        <div className="hero__visual">
          <HeroMedia />
          <div className="hero-panel">
            <div className="hero-panel__badges" aria-hidden="true">
              {HERO_BADGES.map((badge) => (
                <span key={badge.id} className={`hero-panel__badge ${badge.className}`}>
                  {badge.label}
                </span>
              ))}
            </div>

            <div className="hero-panel__core">
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

              <ul className="hero-panel__benefits">
                {HERO_BENEFITS.map((benefit) => (
                  <li key={benefit}>
                    <span className="hero-panel__check" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M3 7l3 3 5-5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
