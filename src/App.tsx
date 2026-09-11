import { lazy, Suspense, useEffect } from "react";
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
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      Carregando…
    </div>
  );
}

/**
 * Redirect para uma URL externa (WhatsApp etc.) — usado como rede de segurança
 * client-side para rotas antigas. Em produção o Cloudflare Pages já resolve
 * isso no edge via public/_redirects; esta rota cobre dev/preview local e
 * qualquer navegação client-side que ainda chegue até aqui.
 */
function ExternalRedirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  return <PageLoader />;
}

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
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
        <Route path="/404" element={<SiteLayout><NotFoundPage /></SiteLayout>} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
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
