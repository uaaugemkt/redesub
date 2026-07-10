import { Link } from "react-router-dom";
import InternalHero from "../components/layout/InternalHero";
import AboutFinalCTASection from "../sections/about/AboutFinalCTASection";
import AboutHowWeWorkSection from "../sections/about/AboutHowWeWorkSection";
import AboutIntroSection from "../sections/about/AboutIntroSection";
import AboutRegionalSection from "../sections/about/AboutRegionalSection";
import AboutStorySection from "../sections/about/AboutStorySection";
import AboutValuesSection from "../sections/about/AboutValuesSection";
import AboutWhoWeAreSection from "../sections/about/AboutWhoWeAreSection";
import { PAGE_META } from "../config/site";
import { usePageMeta } from "../hooks/usePageMeta";

export default function AboutPage() {
  usePageMeta(PAGE_META.sobre);

  return (
    <>
      <InternalHero
        eyebrow="Sobre a RedeSub"
        title="Tecnologia próxima, atendimento humano."
        description="A RedeSub conecta casas e pequenos negócios com internet de fibra, suporte regional e relacionamento direto com quem vive a realidade da região."
        breadcrumbs={[
          { label: "Início", path: "/" },
          { label: "Sobre" },
        ]}
      >
        <Link to="/planos" className="btn btn--primary btn--lg btn--hero">
          Conhecer nossos planos
        </Link>
        <Link to="/atendimento" className="btn btn--outline-light btn--lg">
          Falar com a equipe
        </Link>
      </InternalHero>

      <AboutIntroSection />
      <AboutWhoWeAreSection />
      <AboutHowWeWorkSection />
      <AboutValuesSection />
      <AboutRegionalSection />
      <AboutStorySection />
      <AboutFinalCTASection />
    </>
  );
}
