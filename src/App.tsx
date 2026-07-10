import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/layout/ScrollToTop";
import SiteLayout from "./components/layout/SiteLayout";
import { SelectionProvider } from "./context/SelectionContext";

const HomePage = lazy(() => import("./pages/HomePage"));
const PlansPage = lazy(() => import("./pages/PlansPage"));
const CoveragePage = lazy(() => import("./pages/CoveragePage"));
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
          element={
            <SiteLayout>
              <PlansPage />
            </SiteLayout>
          }
        />
        <Route
          path="/cobertura"
          element={
            <SiteLayout>
              <CoveragePage />
            </SiteLayout>
          }
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
