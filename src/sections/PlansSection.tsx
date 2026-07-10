import { Link } from "react-router-dom";
import PlanCard from "../components/PlanCard";
import RegionFilter from "../components/RegionFilter";
import Reveal from "../components/ui/Reveal";
import WhatsAppButton from "../components/WhatsAppButton";
import { useSelection } from "../context/SelectionContext";
import { DEFAULT_REGION_ID, getRegionById } from "../lib/plans";
import { WHATSAPP_MESSAGES } from "../lib/whatsapp";

interface PlansSectionProps {
  variant?: "preview" | "full";
  showHeading?: boolean;
}

export default function PlansSection({
  variant = "preview",
  showHeading = true,
}: PlansSectionProps) {
  const { regionId, regionName } = useSelection();
  const isPreview = variant === "preview";
  const activeRegionId = regionId ?? DEFAULT_REGION_ID;
  const region = getRegionById(activeRegionId);
  const plans = region?.plans ?? [];
  const hasPlans = plans.length > 0;

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

        <RegionFilter
          id="plans-region-filter"
          className="plans__region-filter"
          hideEmptyOption
          showHint={false}
        />

        {!hasPlans && (
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

        {hasPlans && (
          <div className="plans__results">
            {region?.areaLabel && (
              <p className="plans__region-note">
                Planos para <strong>{region.name}</strong> ({region.areaLabel})
              </p>
            )}
            <div className={`plans__grid ${!isPreview ? "plans__grid--large" : ""}`}>
              {plans.map((plan, index) => (
                <Reveal key={plan.id} delay={index * 80} className="plans__grid-cell">
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
