import { usePageMeta } from "../hooks/usePageMeta";
import { PAGE_META } from "../config/site";
import HeroSection from "../sections/HeroSection";
import TrustProofSection from "../sections/TrustProofSection";
import ProblemSection from "../sections/ProblemSection";
import PlansSection from "../sections/PlansSection";
import CompareSection from "../sections/CompareSection";
import UseCasesSection from "../sections/UseCasesSection";
import AppsSection from "../sections/AppsSection";
import LocalSection from "../sections/LocalSection";
import SupportSection from "../sections/SupportSection";
import TestimonialsSection from "../sections/TestimonialsSection";
import ReferralSection from "../sections/ReferralSection";
import FinalCTASection from "../sections/FinalCTASection";

export default function HomePage() {
  usePageMeta(PAGE_META.home);

  return (
    <>
      <HeroSection />
      <TrustProofSection />
      <ProblemSection />
      <PlansSection variant="preview" />
      <CompareSection />
      <UseCasesSection />
      <AppsSection variant="preview" />
      <LocalSection variant="preview" />
      <SupportSection variant="preview" />
      <TestimonialsSection />
      <ReferralSection />
      <FinalCTASection />
    </>
  );
}
