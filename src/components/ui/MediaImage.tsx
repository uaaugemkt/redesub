interface MediaImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  isPlaceholder?: boolean;
}

export default function MediaImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  isPlaceholder = false,
}: MediaImageProps) {
  return (
    <figure className={`media-image ${isPlaceholder ? "media-image--placeholder" : ""} ${className}`.trim()}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="media-image__img"
      />
      {isPlaceholder && (
        <figcaption className="media-image__caption">
          Ilustração temporária — substituir por foto oficial
        </figcaption>
      )}
    </figure>
  );
}
