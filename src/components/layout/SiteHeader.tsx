import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { SUBSCRIBER_PORTAL_URL } from "../../config/integrations";
import { MAIN_NAV } from "../../config/site";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "../../lib/whatsapp";
import Logo from "../Logo";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  const closeMenu = useCallback(() => {
    setOpen(false);
    burgerRef.current?.focus();
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, closeMenu]);

  const portalHref = SUBSCRIBER_PORTAL_URL || undefined;

  return (
    <header
      className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}
    >
      <div className="container site-header__inner">
        <Link to="/" className="site-header__logo" aria-label="RedeSub — início">
          <Logo />
        </Link>

        <nav className="site-header__nav" aria-label="Principal">
          {MAIN_NAV.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `site-header__link ${isActive ? "site-header__link--active" : ""}`
              }
              onClick={closeMenu}
              end={link.path === "/"}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="site-header__actions">
          {portalHref ? (
            <a
              href={portalHref}
              target="_blank"
              rel="noopener noreferrer"
              className="site-header__portal"
            >
              Central do Assinante
            </a>
          ) : (
            <span className="site-header__portal site-header__portal--muted">
              Central do Assinante
            </span>
          )}
          <a
            href={buildWhatsAppLink(WHATSAPP_MESSAGES.contract)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary btn--sm site-header__cta"
          >
            Contratar pelo WhatsApp
          </a>
        </div>

        <button
          ref={burgerRef}
          type="button"
          className="site-header__burger"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="site-nav-panel"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        id="site-nav-panel"
        className={`site-header__drawer ${open ? "site-header__drawer--open" : ""}`}
        hidden={!open}
      >
        <nav className="site-header__drawer-nav" aria-label="Menu mobile">
          {MAIN_NAV.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `site-header__drawer-link ${isActive ? "site-header__drawer-link--active" : ""}`
              }
              onClick={closeMenu}
              end={link.path === "/"}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="site-header__drawer-actions">
          {portalHref ? (
            <a
              href={portalHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline btn--md"
            >
              Central do Assinante
            </a>
          ) : (
            <span className="site-header__portal site-header__portal--muted">
              Central do Assinante em breve
            </span>
          )}
          <a
            href={buildWhatsAppLink(WHATSAPP_MESSAGES.contract)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary btn--md"
          >
            Contratar pelo WhatsApp
          </a>
        </div>
      </div>

      {open && (
        <button
          type="button"
          className="site-header__backdrop"
          aria-label="Fechar menu"
          onClick={closeMenu}
        />
      )}
    </header>
  );
}
