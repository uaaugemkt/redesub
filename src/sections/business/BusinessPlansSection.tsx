import type { ReactNode } from "react";
import { MessageCircleIcon, WifiIcon } from "../../components/icons/BenefitIcons";
import {
  BuildingIcon,
  GaugeIcon,
  HeadphonesIcon,
  SlidersIcon,
  TrendIcon,
} from "../../components/icons/BusinessImpactIcons";
import Reveal from "../../components/ui/Reveal";
import { BUSINESS_PLANS } from "../../lib/businessPlans";
import { parsePlanSpeed } from "../../lib/plans";
import { buildWhatsAppLink } from "../../lib/whatsapp";

function featureIcon(feature: string): ReactNode {
  const value = feature.toLowerCase();
  if (value.includes("alta velocidade")) return <GaugeIcon />;
  if (value.includes("performance")) return <TrendIcon />;
  if (value.includes("estabilidade") || value.includes("confiável")) {
    return <WifiIcon />;
  }
  if (value.includes("suporte")) return <HeadphonesIcon />;
  if (value.includes("atendimento")) return <MessageCircleIcon />;
  if (value.includes("ideal para empresas")) return <BuildingIcon />;
  if (value.includes("sob medida")) return <SlidersIcon />;
  return <GaugeIcon />;
}

export default function BusinessPlansSection() {
  return (
    <section
      className="biz-plans section"
      id="planos-empresariais"
      aria-labelledby="business-plans-title"
    >
      <div className="container">
        <Reveal>
          <header className="biz-plans__header">
            <span className="eyebrow">Planos empresariais</span>
            <h2 className="biz-plans__title" id="business-plans-title">
              Planos para o seu negócio
            </h2>
            <p className="biz-plans__desc">
              Escolha a opção mais adequada para a rotina da sua empresa.
            </p>
          </header>
        </Reveal>

        <div className="biz-plans__grid">
          {BUSINESS_PLANS.map((plan, index) => {
            const { value, unit } = parsePlanSpeed(plan.speed);
            const href = buildWhatsAppLink(plan.whatsappMessage);
            const featured = Boolean(plan.featured);

            return (
              <Reveal key={plan.id} delay={index * 70}>
                <article
                  className={`biz-plan${featured ? " biz-plan--featured" : ""}`}
                >
                  <p className="biz-plan__label">Plano {plan.name}</p>
                  <h3 className="biz-plan__name">{plan.name}</h3>
                  {plan.tagline ? (
                    <p className="biz-plan__tagline">{plan.tagline}</p>
                  ) : null}

                  <p className="biz-plan__speed" aria-label={plan.speed}>
                    <span className="biz-plan__speed-value">{value}</span>
                    <span className="biz-plan__speed-unit">{unit}</span>
                  </p>

                  <ul className="biz-plan__features">
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <span className="biz-plan__feature-icon" aria-hidden="true">
                          {featureIcon(feature)}
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn btn--lg biz-plan__cta${featured ? " biz-plan__cta--featured" : " biz-plan__cta--solid"}`}
                  >
                    Quero este plano
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
