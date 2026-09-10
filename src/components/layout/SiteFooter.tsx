import { Link } from "react-router-dom";
import { FOOTER_NAV, SITE_CNPJ, SITE_NAME, SITE_TAGLINE } from "../../config/site";
import { ADDRESS, PHONE_DISPLAY } from "../../lib/constants";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "../../lib/whatsapp";
import { MapPinIcon } from "../icons/BenefitIcons";
import WhatsAppIcon from "../icons/WhatsAppIcon";
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
            <a
              className="site-footer-full__whatsapp"
              href={buildWhatsAppLink(WHATSAPP_MESSAGES.support)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Falar no WhatsApp ${PHONE_DISPLAY}`}
            >
              <WhatsAppIcon size={18} />
              <span>{PHONE_DISPLAY}</span>
            </a>
          </p>
          <p className="site-footer-full__contact">
            <strong>Endereço</strong>
            <span className="site-footer-full__address">
              <MapPinIcon className="site-footer-full__pin" />
              <span>
                {ADDRESS.street}
                <br />
                {ADDRESS.neighborhood} · {ADDRESS.city}
              </span>
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
        <p className="site-footer-full__cnpj">CNPJ {SITE_CNPJ}</p>
        <p className="site-footer-full__note">
          Atendimento local para resolver de verdade.
        </p>
      </div>
    </footer>
  );
}
