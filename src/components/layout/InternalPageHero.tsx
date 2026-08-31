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
        <span className="internal-page-hero__glow internal-page-hero__glow--warm" />
        <span className="internal-page-hero__glow internal-page-hero__glow--light" />
        <span className="internal-page-hero__overlay" />
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
