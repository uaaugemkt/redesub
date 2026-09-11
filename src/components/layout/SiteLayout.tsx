import { Suspense, type ReactNode } from "react";
import DesktopWhatsAppFab from "../DesktopWhatsAppFab";
import { SpeedTestModalProvider } from "../../context/SpeedTestModalContext";
import SiteTopbar from "./SiteTopbar";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import SkipLink from "./SkipLink";

interface SiteLayoutProps {
  children: ReactNode;
  showFloatingWhatsApp?: boolean;
}

/** Enquanto o chunk da página carrega, só o conteúdo pisca — header, topbar e rodapé continuam visíveis. */
function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <span className="page-loader__spinner" aria-hidden="true" />
      <span>Carregando…</span>
    </div>
  );
}

export default function SiteLayout({
  children,
  showFloatingWhatsApp = true,
}: SiteLayoutProps) {
  return (
    <SpeedTestModalProvider>
      <SkipLink />
      <SiteTopbar />
      <SiteHeader />
      <main id="conteudo-principal">
        <Suspense fallback={<PageLoader />}>{children}</Suspense>
      </main>
      <SiteFooter />
      {showFloatingWhatsApp && <DesktopWhatsAppFab />}
    </SpeedTestModalProvider>
  );
}
