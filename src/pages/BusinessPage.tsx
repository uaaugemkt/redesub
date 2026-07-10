import InternalHero from "../components/layout/InternalHero";
import WhatsAppButton from "../components/WhatsAppButton";
import BusinessBenefitsSection from "../sections/business/BusinessBenefitsSection";
import BusinessFAQSection from "../sections/business/BusinessFAQSection";
import BusinessFinalCTASection from "../sections/business/BusinessFinalCTASection";
import BusinessPlansSection from "../sections/business/BusinessPlansSection";
import BusinessProblemsSection from "../sections/business/BusinessProblemsSection";
import BusinessProcessSection from "../sections/business/BusinessProcessSection";
import BusinessUseCasesSection from "../sections/business/BusinessUseCasesSection";
import { PAGE_META } from "../config/site";
import { useSelection } from "../context/SelectionContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { WHATSAPP_MESSAGES } from "../lib/whatsapp";

export default function BusinessPage() {
  usePageMeta(PAGE_META.empresas);
  const { regionName } = useSelection();

  return (
    <>
      <InternalHero
        eyebrow="Internet para empresas"
        title="Conectividade para manter seu negócio funcionando."
        description="Internet para pequenos negócios, atendimentos, sistemas online, videoconferências e operações que dependem de uma conexão estável."
        breadcrumbs={[
          { label: "Início", path: "/" },
          { label: "Para empresas" },
        ]}
      >
        <WhatsAppButton
          message={WHATSAPP_MESSAGES.businessInquiry({ region: regionName })}
          label="Consultar solução para minha empresa"
          size="lg"
          className="btn--hero"
        />
      </InternalHero>

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
