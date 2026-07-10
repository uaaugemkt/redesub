import { SUBSCRIBER_PORTAL_URL } from "../../config/integrations";
import { HeadphonesIcon } from "../icons/BusinessImpactIcons";
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
            className="site-topbar__link site-topbar__link--support"
            aria-label="Falar com o suporte"
          >
            <HeadphonesIcon className="site-topbar__icon" />
            <span className="site-topbar__link-label site-topbar__link-label--long">
              Falar com o suporte
            </span>
            <span className="site-topbar__link-label site-topbar__link-label--short">
              Suporte
            </span>
          </a>
          <span className="site-topbar__divider" aria-hidden="true" />
          {SUBSCRIBER_PORTAL_URL ? (
            <a
              href={SUBSCRIBER_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="site-topbar__link site-topbar__link--portal"
            >
              <span className="site-topbar__link-label site-topbar__link-label--long">
                Central do Assinante
              </span>
              <span className="site-topbar__link-label site-topbar__link-label--short">
                Central
              </span>
            </a>
          ) : (
            <span className="site-topbar__muted">
              Central do Assinante em breve
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
