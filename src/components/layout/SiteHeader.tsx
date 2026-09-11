import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MAIN_NAV, PLANS_SECTION_HREF } from "../../config/site";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "../../lib/whatsapp";
import Logo from "../Logo";

interface NavItemProps {
  link: (typeof MAIN_NAV)[number];
  className: string;
  activeClassName: string;
  onClick: () => void;
}

/**
 * "Planos" e "Cobertura" não são rotas de página própria:
 * - Planos é uma âncora da Home (PLANS_SECTION_HREF) — usa <Link> simples em
 *   vez de <NavLink> porque o destino resolve para pathname "/", e marcá-lo
 *   como ativo junto de "Início" seria enganoso.
 * - Cobertura abre o WhatsApp direto em nova aba.
 * Compartilhado entre o menu desktop e o drawer mobile para não duplicar
 * essa regra nos dois lugares.
 */
function NavItem({ link, className, activeClassName, onClick }: NavItemProps) {
  if (/^https?:\/\//i.test(link.path)) {
    return (
      <a
        href={link.path}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
      >
        {link.label}
      </a>
    );
  }

  if (link.path === PLANS_SECTION_HREF) {
    return (
      <Link to={link.path} className={className} onClick={onClick}>
        {link.label}
      </Link>
    );
  }

  return (
    <NavLink
      to={link.path}
      className={({ isActive }) => `${className} ${isActive ? activeClassName : ""}`}
      onClick={onClick}
      end={link.path === "/"}
    >
      {link.label}
    </NavLink>
  );
}

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

  return (
    <header
      className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}
    >
      <div className="container site-header__inner">
        <Link to="/" className="site-header__logo" aria-label="Página inicial da RedeSub">
          <Logo />
        </Link>

        <nav className="site-header__nav" aria-label="Principal">
          {MAIN_NAV.map((link) => (
            <NavItem
              key={link.path}
              link={link}
              className="site-header__link"
              activeClassName="site-header__link--active"
              onClick={closeMenu}
            />
          ))}
        </nav>

        <div className="site-header__actions">
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
            <NavItem
              key={link.path}
              link={link}
              className="site-header__drawer-link"
              activeClassName="site-header__drawer-link--active"
              onClick={closeMenu}
            />
          ))}
        </nav>
        <div className="site-header__drawer-actions">
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
