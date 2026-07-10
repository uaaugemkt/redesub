import RegionalCoverageSection from "../components/RegionalCoverageSection";
import WhatsAppButton from "../components/WhatsAppButton";
import InternalHero from "../components/layout/InternalHero";
import CoverageFinalCTASection from "../sections/CoverageFinalCTASection";
import CoverageStepsSection from "../sections/CoverageStepsSection";
import { PAGE_META } from "../config/site";
import { useSelection } from "../context/SelectionContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { WHATSAPP_MESSAGES } from "../lib/whatsapp";

export default function CoveragePage() {
  usePageMeta(PAGE_META.cobertura);
  const { regionName } = useSelection();

  return (
    <>
      <InternalHero
        eyebrow="Cobertura"
        title="Atendimento regional com consulta por endereço"
        description="A RedeSub atende regiões específicas com internet de fibra e suporte local. Consulte sua região e confirme a disponibilidade no seu endereço com nossa equipe."
        breadcrumbs={[
          { label: "Início", path: "/" },
          { label: "Cobertura" },
        ]}
      >
        <WhatsAppButton
          message={WHATSAPP_MESSAGES.coverageConsult(regionName)}
          label="Consultar no meu endereço"
          size="lg"
          className="btn--hero"
        />
      </InternalHero>

      <RegionalCoverageSection
        sectionId="cobertura-regional"
        eyebrow="Cobertura e regiões"
        title="Consulte onde a RedeSub atende"
        description="Selecione sua região para ver informações locais, base de atendimento e como consultar a disponibilidade no seu endereço."
      />

      <CoverageStepsSection />

      <CoverageFinalCTASection />
    </>
  );
}
