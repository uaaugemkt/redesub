import { type ReactNode } from "react";
import DesktopWhatsAppFab from "../DesktopWhatsAppFab";
import MobileWhatsAppBar from "../MobileWhatsAppBar";
import SiteTopbar from "./SiteTopbar";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import SkipLink from "./SkipLink";

interface SiteLayoutProps {
  children: ReactNode;
  showFloatingWhatsApp?: boolean;
}

export default function SiteLayout({
  children,
  showFloatingWhatsApp = true,
}: SiteLayoutProps) {
  return (
    <>
      <SkipLink />
      <SiteTopbar />
      <SiteHeader />
      <main id="conteudo-principal">{children}</main>
      <SiteFooter />
      {showFloatingWhatsApp && (
        <>
          <MobileWhatsAppBar />
          <DesktopWhatsAppFab />
        </>
      )}
    </>
  );
}
