import InternalPageHero from "../components/layout/InternalPageHero";
import CoverageFinalCTASection from "../sections/CoverageFinalCTASection";
import CoverageRegionSection from "../sections/CoverageRegionSection";
import CoverageStepsSection from "../sections/CoverageStepsSection";
import { PAGE_META } from "../config/site";
import { usePageMeta } from "../hooks/usePageMeta";

export default function CoveragePage() {
  usePageMeta(PAGE_META.cobertura);

  return (
    <>
      <InternalPageHero
        eyebrow="Cobertura"
        title="Consulte a cobertura na sua região"
        breadcrumbs={[
          { label: "Início", path: "/" },
          { label: "Cobertura" },
        ]}
      />

      <CoverageRegionSection />

      <CoverageStepsSection />

      <CoverageFinalCTASection />
    </>
  );
}
