import { useId, type ReactNode } from "react";
import Breadcrumbs from "../ui/Breadcrumbs";

export interface InternalHeroBreadcrumb {
  label: string;
  path?: string;
}

interface InternalHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: InternalHeroBreadcrumb[];
  variant?: "default" | "compact";
  highlights?: readonly string[];
  children?: ReactNode;
}

export default function InternalHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  variant = "default",
  highlights,
  children,
}: InternalHeroProps) {
  const titleId = useId();

  return (
    <section
      className={`internal-hero internal-hero--${variant}`}
      aria-labelledby={titleId}
    >
      <div className="internal-hero__backdrop" aria-hidden="true">
        <span className="internal-hero__glow internal-hero__glow--blue" />
        <span className="internal-hero__glow internal-hero__glow--orange" />
        <svg className="internal-hero__lines" viewBox="0 0 1200 320" preserveAspectRatio="none">
          <path
            d="M0 180 C220 140, 420 220, 640 180 S1040 140, 1200 200"
            stroke="rgba(3,161,253,0.14)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M0 250 C280 210, 480 290, 760 250 S1080 210, 1200 270"
            stroke="rgba(255,133,5,0.1)"
            strokeWidth="1"
            fill="none"
          />
        </svg>
        <svg className="internal-hero__signal" viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r="88" fill="none" stroke="rgba(3,161,253,0.1)" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="62" fill="none" stroke="rgba(3,161,253,0.14)" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="36" fill="none" stroke="rgba(255,133,5,0.12)" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="container internal-hero__inner">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs items={breadcrumbs} />
        )}

        <div className="internal-hero__content">
          {eyebrow && <span className="internal-hero__eyebrow">{eyebrow}</span>}
          <h1 id={titleId} className="internal-hero__title">
            {title}
          </h1>
          {description && <p className="internal-hero__desc">{description}</p>}

          {highlights && highlights.length > 0 && (
            <ul className="internal-hero__highlights">
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}

          {children && <div className="internal-hero__actions">{children}</div>}
        </div>
      </div>
    </section>
  );
}

/** Alias semântico para páginas internas */
export { InternalHero as InternalPageHero };
