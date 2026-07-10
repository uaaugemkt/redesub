import { useId } from "react";
import Breadcrumbs from "../ui/Breadcrumbs";

export interface InternalPageHeroBreadcrumb {
  label: string;
  path?: string;
}

export interface InternalPageHeroProps {
  eyebrow: string;
  title: string;
  breadcrumbs: InternalPageHeroBreadcrumb[];
}

export default function InternalPageHero({
  eyebrow,
  title,
  breadcrumbs,
}: InternalPageHeroProps) {
  const titleId = useId();

  return (
    <section className="internal-page-hero" aria-labelledby={titleId}>
      <div className="internal-page-hero__backdrop" aria-hidden="true">
        <span className="internal-page-hero__glow internal-page-hero__glow--blue" />
        <span className="internal-page-hero__glow internal-page-hero__glow--orange" />
        <svg
          className="internal-page-hero__lines"
          viewBox="0 0 1200 320"
          preserveAspectRatio="none"
        >
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
        <svg className="internal-page-hero__signal" viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r="88" fill="none" stroke="rgba(3,161,253,0.1)" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="62" fill="none" stroke="rgba(3,161,253,0.14)" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="36" fill="none" stroke="rgba(255,133,5,0.12)" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="container internal-page-hero__container">
        <div className="internal-page-hero__content">
          <Breadcrumbs items={breadcrumbs} />
          <p className="internal-page-hero__eyebrow">{eyebrow}</p>
          <h1 id={titleId} className="internal-page-hero__title">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}
