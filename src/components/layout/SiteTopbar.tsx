import { SUBSCRIBER_PORTAL_URL } from "../../config/integrations";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "../../lib/whatsapp";

export default function SiteTopbar() {
  const supportHref = buildWhatsAppLink(
    WHATSAPP_MESSAGES.supportIssue({ reason: "Falar com o suporte" })
  );

  return (
    <div className="site-topbar" role="region" aria-label="Informações institucionais">
      <div className="container site-topbar__inner">
        <p className="site-topbar__tagline">
          Internet de fibra com atendimento regional
        </p>

        <div className="site-topbar__actions">
          <span className="site-topbar__prompt">Precisa de suporte?</span>
          <a
            href={supportHref}
            target="_blank"
            rel="noopener noreferrer"
            className="site-topbar__link"
          >
            Falar com o suporte
          </a>
          {SUBSCRIBER_PORTAL_URL ? (
            <a
              href={SUBSCRIBER_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="site-topbar__link"
            >
              Central do Assinante
            </a>
          ) : (
            <span className="site-topbar__muted">Central do Assinante em breve</span>
          )}
        </div>
      </div>
    </div>
  );
}
