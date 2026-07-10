import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { SUBSCRIBER_PORTAL_URL } from "../../config/integrations";
import { MAIN_NAV } from "../../config/site";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "../../lib/whatsapp";
import Logo from "../Logo";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
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
    const onScroll = () => setScrolled(window.scrollY > 12);
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

  const portalHref = SUBSCRIBER_PORTAL_URL || "/suporte#central-assinante";

  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <div className="container site-header__inner">
        <Link to="/" className="site-header__logo" aria-label="RedeSub — início">
          <Logo />
        </Link>

        <div
          ref={menuRef}
          className={`site-header__panel ${open ? "site-header__panel--open" : ""}`}
          id="site-nav-panel"
        >
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
            <a
              href={portalHref}
              className="btn btn--ghost btn--sm site-header__portal"
              {...(SUBSCRIBER_PORTAL_URL
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              Central do Assinante
            </a>
            <a
              href={buildWhatsAppLink(WHATSAPP_MESSAGES.contract)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary btn--sm"
            >
              Contratar pelo WhatsApp
            </a>
          </div>
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
