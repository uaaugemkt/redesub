import WhatsAppButton from "../../components/WhatsAppButton";
import Reveal from "../../components/ui/Reveal";
import { SHOW_BUSINESS_PLAN_EXAMPLES } from "../../config/features";
import { useSelection } from "../../context/SelectionContext";
import { BUSINESS_PLAN_EXAMPLES } from "../../lib/businessPlans";
import { WHATSAPP_MESSAGES } from "../../lib/whatsapp";

export default function BusinessPlansSection() {
  const { regionName } = useSelection();

  return (
    <section
      className="section section--muted business-plans"
      aria-labelledby="business-plans-title"
    >
      <div className="container">
        <Reveal>
          <header className="business-plans__header">
            <span className="eyebrow">Planos empresariais</span>
            <h2 className="section__title" id="business-plans-title">
              Soluções para pequenos negócios
            </h2>
            <p className="section__desc business-plans__intro">
              {SHOW_BUSINESS_PLAN_EXAMPLES
                ? "Os planos empresariais são definidos conforme a região, o endereço e a necessidade do negócio. Os valores exibidos em ambiente de desenvolvimento são apenas exemplos visuais e não representam oferta comercial."
                : "Planos, velocidades e condições são informados após análise de viabilidade."}
            </p>
          </header>
        </Reveal>

        <div className="business-plans__grid">
          {BUSINESS_PLAN_EXAMPLES.map((plan, index) => (
            <Reveal key={plan.id} delay={index * 70}>
              <article
                className={`business-plans__card ${plan.featured && SHOW_BUSINESS_PLAN_EXAMPLES ? "business-plans__card--featured" : ""}`}
              >
                {SHOW_BUSINESS_PLAN_EXAMPLES && plan.featured && (
                  <span className="business-plans__badge business-plans__badge--featured">
                    Destaque de layout
                  </span>
                )}
                {SHOW_BUSINESS_PLAN_EXAMPLES && (
                  <span className="business-plans__badge business-plans__badge--example">
                    Exemplo de apresentação (valor não oficial)
                  </span>
                )}

                <h3>{plan.name}</h3>
                <p className="business-plans__speed">{plan.speed}</p>
                <p className="business-plans__profile">{plan.profile}</p>

                <ul className="business-plans__features">
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>

                <div className="business-plans__price-wrap">
                  {SHOW_BUSINESS_PLAN_EXAMPLES ? (
                    <>
                      <span className="business-plans__price-label">Exemplo visual</span>
                      <p className="business-plans__price">
                        R$ {plan.price}
                        <span>/mês</span>
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="business-plans__price business-plans__price--consult">
                        Consulte condições
                      </p>
                      <p className="business-plans__price-note">
                        Preço definido após análise de viabilidade
                      </p>
                    </>
                  )}
                </div>

                <WhatsAppButton
                  message={WHATSAPP_MESSAGES.businessInquiry({
                    region: regionName,
                    businessType: plan.name,
                  })}
                  label="Consultar pelo WhatsApp"
                  variant="primary"
                  size="md"
                  className="business-plans__cta"
                />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
