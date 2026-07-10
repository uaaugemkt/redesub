import { useId, type ReactNode } from "react";
import MediaImage from "../ui/MediaImage";

interface InternalHeroProps {
  eyebrow?: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  isPlaceholderImage?: boolean;
  children?: ReactNode;
}

export default function InternalHero({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  imageWidth = 640,
  imageHeight = 480,
  isPlaceholderImage = true,
  children,
}: InternalHeroProps) {
  const titleId = useId();

  return (
    <section className="internal-hero" aria-labelledby={titleId}>
      <div className="container internal-hero__grid">
        <div className="internal-hero__content">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1 id={titleId} className="internal-hero__title">
            {title}
          </h1>
          <p className="internal-hero__desc">{description}</p>
          {children && <div className="internal-hero__actions">{children}</div>}
        </div>
        <MediaImage
          src={imageSrc}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          isPlaceholder={isPlaceholderImage}
          className="internal-hero__media"
          priority
        />
      </div>
    </section>
  );
}
