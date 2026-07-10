import { Link } from "react-router-dom";
import PlanCard from "../components/PlanCard";
import RegionFilter from "../components/RegionFilter";
import Reveal from "../components/ui/Reveal";
import WhatsAppButton from "../components/WhatsAppButton";
import { useSelection } from "../context/SelectionContext";
import { WHATSAPP_MESSAGES } from "../lib/whatsapp";

interface PlansSectionProps {
  variant?: "preview" | "full";
  showHeading?: boolean;
}

export default function PlansSection({
  variant = "preview",
  showHeading = true,
}: PlansSectionProps) {
  const { regionId, region, regionName } = useSelection();
  const plans = region?.plans ?? [];
  const hasRegion = regionId !== null;
  const hasPlans = plans.length > 0;
  const isPreview = variant === "preview";

  return (
    <section
      className={`plans section ${isPreview ? "plans--preview section--soft" : "plans--full"}`}
      id="planos"
    >
      <div className="container">
        {showHeading && (
          <Reveal>
            <div className="section__header section__header--center">
              <span className="eyebrow">Escolha pelo seu uso</span>
              <h2 className="section__title">
                {isPreview ? "Planos para a sua região" : "Monte o plano ideal para sua casa"}
              </h2>
              <p className="section__desc">
                Escolha o plano pelo seu uso, não só pelo número de megas. Fibra
                para assistir, trabalhar, estudar e jogar ao mesmo tempo.
              </p>
            </div>
          </Reveal>
        )}

        <RegionFilter id="plans-region-filter" className="plans__region-filter" />

        {!hasRegion && (
          <Reveal>
            <div className="plans__empty-state" role="status">
              <div className="plans__empty-visual" aria-hidden="true">
                <svg viewBox="0 0 120 120" width="120" height="120">
                  <circle cx="60" cy="60" r="54" fill="var(--brand-blue-soft)" />
                  <path
                    d="M60 28c-14 0-26 10-26 24 0 16 26 36 26 36s26-20 26-36c0-14-12-24-26-24z"
                    fill="var(--brand-blue)"
                    opacity="0.85"
                  />
                  <circle cx="60" cy="52" r="8" fill="var(--brand-white)" />
                </svg>
              </div>
              <h3 className="plans__empty-title">Comece pela sua região</h3>
              <p>
                Os planos e valores podem variar conforme a localidade. Selecione
                sua região acima para ver as opções disponíveis na sua área.
              </p>
              {isPreview && (
                <Link to="/planos" className="btn btn--outline btn--md">
                  Ver página completa de planos
                </Link>
              )}
            </div>
          </Reveal>
        )}

        {hasRegion && !hasPlans && (
          <Reveal>
            <div className="plans__empty plans__empty--consult" role="status">
              <p>
                Ainda não temos planos cadastrados para <strong>{regionName}</strong>{" "}
                no site. Consulte disponibilidade e valores com nossa equipe.
              </p>
              <WhatsAppButton
                message={WHATSAPP_MESSAGES.regionAvailability(regionName ?? "")}
                label="Consultar disponibilidade"
                variant="primary"
                size="md"
              />
            </div>
          </Reveal>
        )}

        {hasRegion && hasPlans && (
          <div className="plans__results">
            {region?.areaLabel && (
              <p className="plans__region-note">
                Planos para <strong>{region.name}</strong> ({region.areaLabel})
              </p>
            )}
            <div className={`plans__grid ${!isPreview ? "plans__grid--large" : ""}`}>
              {plans.map((plan, index) => (
                <Reveal key={plan.id} delay={index * 80}>
                  <PlanCard plan={plan} large={!isPreview} />
                </Reveal>
              ))}
            </div>
            {isPreview && (
              <div className="plans__more">
                <Link to="/planos" className="btn btn--primary btn--md">
                  Ver todos os planos
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
