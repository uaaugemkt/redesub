import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PlanCard from "../components/PlanCard";
import PlansCarousel from "../components/PlansCarousel";
import Reveal from "../components/ui/Reveal";
import WhatsAppButton from "../components/WhatsAppButton";
import { useSelection } from "../context/SelectionContext";
import { DEFAULT_REGION_ID, getRegionById } from "../lib/plans";
import { WHATSAPP_MESSAGES } from "../lib/whatsapp";

interface PlansSectionProps {
  variant?: "preview" | "full";
  showHeading?: boolean;
}

const COMPACT_LAYOUT_QUERY = "(max-width: 767px)";

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

  const [useCarousel, setUseCarousel] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia(COMPACT_LAYOUT_QUERY).matches
      : false
  );

  useEffect(() => {
    const mq = window.matchMedia(COMPACT_LAYOUT_QUERY);
    const update = () => setUseCarousel(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section
      className={`plans section ${isPreview ? "plans--preview plans--spotlight" : "plans--full"}`}
      id="planos"
    >
      <div className="container">
        {showHeading && (
          <Reveal>
            <div className="section__header section__header--center plans__header">
              <span className="eyebrow">Planos residenciais</span>
              <h2 className="section__title">Escolha o plano ideal para sua casa</h2>
              <p className="section__desc">
                Conexão estável, benefícios exclusivos e suporte próximo para você
                aproveitar a internet do seu jeito.
              </p>
            </div>
          </Reveal>
        )}

        {!hasPlans && (
          <Reveal>
            <div className="plans__empty plans__empty--consult" role="status">
              <p>
                Ainda não temos planos cadastrados no site. Consulte disponibilidade
                com nossa equipe.
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
            {useCarousel ? (
              <PlansCarousel plans={plans} />
            ) : (
              <div className={`plans__grid plans__grid--4 ${!isPreview ? "plans__grid--large" : ""}`}>
                {plans.map((plan, index) => (
                  <Reveal key={plan.id} delay={index * 80} className="plans__grid-cell">
                    <PlanCard plan={plan} large={!isPreview} />
                  </Reveal>
                ))}
              </div>
            )}

            {isPreview && (
              <div className="plans__more">
                <Link to="/planos" className="btn btn--outline btn--md plans__more-link">
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
