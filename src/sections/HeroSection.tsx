import { Link } from "react-router-dom";
import { MEDIA } from "../config/media";
import Reveal from "../components/ui/Reveal";
import WhatsAppButton from "../components/WhatsAppButton";
import { GOOGLE_REVIEWS_URL } from "../lib/constants";
import { getHeroFeaturedPlan, parsePlanSpeed } from "../lib/plans";

const HERO_BENEFITS = [
  "Wi-Fi para a casa toda",
  "Fibra óptica",
  "Suporte 7 dias por semana",
] as const;

export default function HeroSection() {
  const featuredPlan = getHeroFeaturedPlan();
  const { value: speedValue, unit: speedUnit } = parsePlanSpeed(featuredPlan.speed);

  return (
    <section className="hero hero--home" id="inicio">
      <div className="hero--home__bg" aria-hidden="true">
        <div className="hero--home__glow hero--home__glow--blue" />
        <div className="hero--home__glow hero--home__glow--orange" />
        <svg className="hero--home__signal" viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r="88" fill="none" stroke="rgba(3,161,253,0.12)" strokeWidth="2" />
          <circle cx="100" cy="100" r="64" fill="none" stroke="rgba(3,161,253,0.18)" strokeWidth="2" />
          <circle cx="100" cy="100" r="40" fill="none" stroke="rgba(255,133,5,0.2)" strokeWidth="2" />
        </svg>
        <div className="hero--home__fiber" />
      </div>

      <div className="container hero--home__grid">
        <div className="hero--home__content">
          <Reveal delay={0}>
            <span className="hero--home__eyebrow">Fibra óptica com atendimento regional</span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="hero--home__title">
              Internet para sua casa acompanhar o ritmo da sua família.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <div className="hero-offer" aria-label={`Oferta ${featuredPlan.name}`}>
              <p className="hero-offer__speed">
                <span className="hero-offer__speed-value">{speedValue}</span>
                <span className="hero-offer__speed-unit">{speedUnit}</span>
              </p>
              <p className="hero-offer__price">
                por{" "}
                <span className="hero-offer__price-currency">R$</span>
                <span className="hero-offer__price-value">{featuredPlan.price}</span>
                <span className="hero-offer__price-period">/mês</span>
              </p>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <p className="hero--home__subtitle">
              Mais velocidade para assistir, jogar, trabalhar e conectar todos os
              dispositivos da casa com suporte próximo quando você precisar.
            </p>
          </Reveal>

          <Reveal delay={280}>
            <ul className="hero--home__benefits">
              {HERO_BENEFITS.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={340}>
            <div className="hero--home__ctas">
              <WhatsAppButton size="lg" className="btn--hero" />
              <Link to="/planos" className="btn btn--outline-light btn--lg">
                Ver planos
              </Link>
            </div>
            <p className="hero--home__notice">
              Consulte disponibilidade para sua região.
            </p>
          </Reveal>

          <Reveal delay={400}>
            <div className="hero--home__social">
              <div className="hero--home__stars" aria-label="5 estrelas">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="var(--brand-orange)" aria-hidden="true">
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
        </div>

        <Reveal delay={200} className="hero--home__visual">
          <div className="hero--home__image-wrap">
            <img
              src={MEDIA.heroMain()}
              alt="Família usando internet em casa com conforto e estabilidade"
              width={520}
              height={640}
              loading="eager"
              decoding="async"
              className="hero--home__image"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
