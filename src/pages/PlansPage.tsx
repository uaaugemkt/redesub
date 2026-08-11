import FAQ from "../components/ui/FAQ";
import InternalPageHero from "../components/layout/InternalPageHero";
import Reveal from "../components/ui/Reveal";
import WhatsAppButton from "../components/WhatsAppButton";
import { PAGE_META } from "../config/site";
import { usePageMeta } from "../hooks/usePageMeta";
import { getPublishedFaqItems } from "../lib/faq";
import { WHATSAPP_MESSAGES } from "../lib/whatsapp";
import AppsSection from "../sections/AppsSection";
import PlansSection from "../sections/PlansSection";

export default function PlansPage() {
  usePageMeta(PAGE_META.planos);
  const plansFaq = getPublishedFaqItems("plans");

  return (
    <div className="plans-page">
      <InternalPageHero
        eyebrow="Planos de fibra"
        title="Escolha o plano certo para sua casa"
        breadcrumbs={[
          { label: "Início", path: "/" },
          { label: "Planos" },
        ]}
      />

      <PlansSection variant="full" showHeading={false} />

      <AppsSection variant="full" informativeOnly />

      {plansFaq.length > 0 ? (
        <section className="section section--muted">
          <div className="container container--narrow">
            <Reveal>
              <FAQ items={plansFaq} title="Perguntas frequentes sobre planos" />
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="plans-cta section" id="plans-cta" aria-labelledby="plans-cta-title">
        <div className="container">
          <Reveal>
            <div className="plans-cta__card">
              <h2 className="plans-cta__title" id="plans-cta-title">
                Já sabe qual plano combina com sua rotina?
              </h2>
              <p className="plans-cta__text">
                Envie sua escolha para a RedeSub e confirme disponibilidade e
                condições.
              </p>
              <WhatsAppButton
                message={WHATSAPP_MESSAGES.plansConsult()}
                label="Falar com a RedeSub pelo WhatsApp"
                variant="primary"
                size="lg"
                className="plans-cta__btn"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
