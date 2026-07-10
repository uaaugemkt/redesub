interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  as?: "h1" | "h2" | "h3";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <header
      className={`section-heading section-heading--${align} ${light ? "section-heading--light" : ""}`}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Tag className="section-heading__title">{title}</Tag>
      {description && <p className="section-heading__desc">{description}</p>}
    </header>
  );
}
