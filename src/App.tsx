import { lazy, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/layout/ScrollToTop";
import SiteLayout from "./components/layout/SiteLayout";
import { COVERAGE_WHATSAPP_HREF, PLANS_SECTION_HREF } from "./config/site";
import { SelectionProvider } from "./context/SelectionContext";

const HomePage = lazy(() => import("./pages/HomePage"));
const AttendancePage = lazy(() => import("./pages/AttendancePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const BusinessPage = lazy(() => import("./pages/BusinessPage"));
const SpeedTestPage = lazy(() => import("./pages/SpeedTestPage"));
const CareersPage = lazy(() => import("./pages/CareersPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

/**
 * Redirect para uma URL externa (WhatsApp etc.) — usado como rede de segurança
 * client-side para rotas antigas. Em produção o Cloudflare Pages já resolve
 * isso no edge via public/_redirects; esta rota cobre dev/preview local e
 * qualquer navegação client-side que ainda chegue até aqui. Sem UI própria:
 * o redirecionamento acontece no mesmo tick, então não há nada para mostrar.
 */
function ExternalRedirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  return null;
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <SiteLayout>
            <HomePage />
          </SiteLayout>
        }
      />
      <Route
        path="/planos"
        element={<Navigate to={PLANS_SECTION_HREF} replace />}
      />
      <Route
        path="/cobertura"
        element={<ExternalRedirect to={COVERAGE_WHATSAPP_HREF} />}
      />
      <Route
        path="/atendimento"
        element={
          <SiteLayout>
            <AttendancePage />
          </SiteLayout>
        }
      />
      <Route path="/contato" element={<Navigate to="/atendimento" replace />} />
      <Route
        path="/suporte"
        element={<Navigate to="/atendimento#suporte-rapido" replace />}
      />
      <Route
        path="/sobre"
        element={
          <SiteLayout>
            <AboutPage />
          </SiteLayout>
        }
      />
      <Route
        path="/para-empresas"
        element={
          <SiteLayout>
            <BusinessPage />
          </SiteLayout>
        }
      />
      <Route
        path="/teste-de-velocidade"
        element={
          <SiteLayout>
            <SpeedTestPage />
          </SiteLayout>
        }
      />
      <Route
        path="/trabalhe-conosco"
        element={
          <SiteLayout>
            <CareersPage />
          </SiteLayout>
        }
      />
      <Route
        path="/politica-de-privacidade"
        element={
          <SiteLayout>
            <PrivacyPolicyPage />
          </SiteLayout>
        }
      />
      <Route path="/404" element={<SiteLayout><NotFoundPage /></SiteLayout>} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SelectionProvider>
        <AppRoutes />
      </SelectionProvider>
    </BrowserRouter>
  );
}
