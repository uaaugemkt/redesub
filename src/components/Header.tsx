import { useState } from "react";
import { NAV_LINKS } from "../lib/constants";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "../lib/whatsapp";
import Logo from "./Logo";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#" className="header__logo" aria-label="RedeSub — início">
          <Logo />
        </a>

        <nav className={`header__nav ${open ? "header__nav--open" : ""}`} aria-label="Principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="header__link"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={buildWhatsAppLink(WHATSAPP_MESSAGES.contract)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary btn--sm header__cta-mobile"
          >
            Contratar
          </a>
        </nav>

        <a
          href={buildWhatsAppLink(WHATSAPP_MESSAGES.contract)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--primary btn--sm header__cta"
        >
          Contratar
        </a>

        <button
          type="button"
          className="header__burger"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
