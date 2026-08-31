import "../styles/business-page.css";
import BusinessDarkSection from "../sections/business/BusinessDarkSection";
import BusinessEditorialSection from "../sections/business/BusinessEditorialSection";
import BusinessFAQSection from "../sections/business/BusinessFAQSection";
import BusinessFinalCTASection from "../sections/business/BusinessFinalCTASection";
import BusinessHeroSection from "../sections/business/BusinessHeroSection";
import BusinessPlansSection from "../sections/business/BusinessPlansSection";
import BusinessProcessSection from "../sections/business/BusinessProcessSection";
import BusinessUseCasesSection from "../sections/business/BusinessUseCasesSection";
import { PAGE_META } from "../config/site";
import { usePageMeta } from "../hooks/usePageMeta";

export default function BusinessPage() {
  usePageMeta(PAGE_META.empresas);

  return (
    <div className="business-page">
      <BusinessHeroSection />
      <BusinessEditorialSection />
      <BusinessUseCasesSection />
      <BusinessDarkSection />
      <BusinessPlansSection />
      <BusinessProcessSection />
      <BusinessFAQSection />
      <BusinessFinalCTASection />
    </div>
  );
}
