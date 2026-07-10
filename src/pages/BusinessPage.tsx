import InternalPageHero from "../components/layout/InternalPageHero";
import BusinessBenefitsSection from "../sections/business/BusinessBenefitsSection";
import BusinessFAQSection from "../sections/business/BusinessFAQSection";
import BusinessFinalCTASection from "../sections/business/BusinessFinalCTASection";
import BusinessPlansSection from "../sections/business/BusinessPlansSection";
import BusinessProblemsSection from "../sections/business/BusinessProblemsSection";
import BusinessProcessSection from "../sections/business/BusinessProcessSection";
import BusinessUseCasesSection from "../sections/business/BusinessUseCasesSection";
import { PAGE_META } from "../config/site";
import { usePageMeta } from "../hooks/usePageMeta";

export default function BusinessPage() {
  usePageMeta(PAGE_META.empresas);

  return (
    <>
      <InternalPageHero
        eyebrow="Internet para empresas"
        title="Conectividade para manter seu negócio funcionando."
        breadcrumbs={[
          { label: "Início", path: "/" },
          { label: "Para empresas" },
        ]}
      />

      <BusinessProblemsSection />
      <BusinessUseCasesSection />
      <BusinessBenefitsSection />
      <BusinessPlansSection />
      <BusinessProcessSection />
      <BusinessFAQSection />
      <BusinessFinalCTASection />
    </>
  );
}
