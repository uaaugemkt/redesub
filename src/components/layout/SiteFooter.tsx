import { Link } from "react-router-dom";
import { SUBSCRIBER_PORTAL_URL } from "../../config/integrations";
import { FOOTER_NAV, SITE_NAME, SITE_TAGLINE } from "../../config/site";
import { ADDRESS, PHONE_DISPLAY } from "../../lib/constants";
import Logo from "../Logo";

export default function SiteFooter() {
  const portalHref = SUBSCRIBER_PORTAL_URL || "/suporte#central-assinante";

  return (
    <footer className="site-footer-full">
      <div className="container site-footer-full__grid">
        <div className="site-footer-full__brand">
          <Logo className="site-footer-full__logo" />
          <p className="site-footer-full__tagline">{SITE_TAGLINE}</p>
          <p className="site-footer-full__contact">
            <strong>Telefone / WhatsApp</strong>
            <span>{PHONE_DISPLAY}</span>
          </p>
          <p className="site-footer-full__contact">
            <strong>Endereço</strong>
            <span>
              {ADDRESS.street}
              <br />
              {ADDRESS.neighborhood} · {ADDRESS.city}
            </span>
          </p>
        </div>

        <div className="site-footer-full__col">
          <h2 className="site-footer-full__title">Institucional</h2>
          <ul>
            {FOOTER_NAV.institucional.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer-full__col">
          <h2 className="site-footer-full__title">Serviços</h2>
          <ul>
            {FOOTER_NAV.servicos.map((item) => (
              <li key={item.path}>
                {item.path.startsWith("/suporte#") ? (
                  <a href={item.path}>{item.label}</a>
                ) : (
                  <Link to={item.path}>{item.label}</Link>
                )}
              </li>
            ))}
            <li>
              <a
                href={portalHref}
                {...(SUBSCRIBER_PORTAL_URL
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                Central do Assinante
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container site-footer-full__bottom">
        <p>
          &copy; {new Date().getFullYear()} {SITE_NAME}. Todos os direitos reservados.
        </p>
        <p className="site-footer-full__note">
          Atendimento local para resolver de verdade.
        </p>
      </div>
    </footer>
  );
}
