import Header from "./components/Header";
import MobileWhatsAppBar from "./components/MobileWhatsAppBar";
import DesktopWhatsAppFab from "./components/DesktopWhatsAppFab";
import HeroSection from "./sections/HeroSection";
import ProblemSection from "./sections/ProblemSection";
import PlansSection from "./sections/PlansSection";
import CompareSection from "./sections/CompareSection";
import AppsSection from "./sections/AppsSection";
import LocalSection from "./sections/LocalSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import ReferralSection from "./sections/ReferralSection";
import FinalCTASection from "./sections/FinalCTASection";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <PlansSection />
        <CompareSection />
        <AppsSection />
        <LocalSection />
        <TestimonialsSection />
        <ReferralSection />
        <FinalCTASection />
      </main>
      <MobileWhatsAppBar />
      <DesktopWhatsAppFab />
    </>
  );
}
