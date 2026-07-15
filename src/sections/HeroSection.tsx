import { Link } from "react-router-dom";
import Reveal from "../components/ui/Reveal";
import WhatsAppButton from "../components/WhatsAppButton";
import { getHeroFeaturedPlan, parsePlanSpeed } from "../lib/plans";

const HERO_BANNER_SRC = "/media/herobanner-redsub2.webp";

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
      <div className="hero--home__inner container">
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
          </Reveal>
        </div>
      </div>

      <div className="hero--home__banner">
        <img
          src={HERO_BANNER_SRC}
          alt=""
          width={1920}
          height={800}
          loading="eager"
          decoding="async"
          className="hero--home__banner-img"
        />
      </div>
    </section>
  );
}
