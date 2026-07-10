import { Link } from "react-router-dom";
import { FOOTER_NAV, SITE_NAME, SITE_TAGLINE } from "../../config/site";
import { ADDRESS, PHONE_DISPLAY } from "../../lib/constants";
import Logo from "../Logo";

function FooterLink({ path, label }: { path: string; label: string }) {
  if (/^https?:\/\//i.test(path)) {
    return (
      <a href={path} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  }

  return <Link to={path}>{label}</Link>;
}

export default function SiteFooter() {
  return (
    <footer className="site-footer-full">
      <div className="container site-footer-full__grid">
        <div className="site-footer-full__brand">
          <div className="site-footer-full__logo-wrap">
            <Logo className="site-footer-full__logo" />
          </div>
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
                <FooterLink path={item.path} label={item.label} />
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer-full__col">
          <h2 className="site-footer-full__title">Serviços</h2>
          <ul>
            {FOOTER_NAV.servicos.map((item) => (
              <li key={item.path}>
                <FooterLink path={item.path} label={item.label} />
              </li>
            ))}
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
