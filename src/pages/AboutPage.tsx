import InternalPageHero from "../components/layout/InternalPageHero";
import AboutClosingSection from "../sections/about/AboutClosingSection";
import AboutEssenceSection from "../sections/about/AboutEssenceSection";
import AboutHowWeWorkSection from "../sections/about/AboutHowWeWorkSection";
import AboutIntroSection from "../sections/about/AboutIntroSection";
import AboutRegionalSection from "../sections/about/AboutRegionalSection";
import AboutWhoWeAreSection from "../sections/about/AboutWhoWeAreSection";
import { PAGE_META } from "../config/site";
import { usePageMeta } from "../hooks/usePageMeta";

export default function AboutPage() {
  usePageMeta(PAGE_META.sobre);

  return (
    <>
      <InternalPageHero
        eyebrow="Sobre a RedeSub"
        title="Tecnologia próxima, atendimento humano."
        breadcrumbs={[
          { label: "Início", path: "/" },
          { label: "Sobre a RedeSub" },
        ]}
      />

      <AboutIntroSection />
      <AboutWhoWeAreSection />
      <AboutEssenceSection />
      <AboutHowWeWorkSection />
      <AboutRegionalSection />
      <AboutClosingSection />
    </>
  );
}
