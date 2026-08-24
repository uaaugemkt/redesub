import { GOOGLE_REVIEWS_PROFILE_URL } from "../config/integrations";
import {
  GOOGLE_REVIEWS,
  formatAverageRating,
  formatTotalReviewsLabel,
  getDisplayGoogleReviews,
  getReviewInitial,
  type GoogleReview,
} from "../lib/googleReviews";
import { useSnapCarousel } from "../hooks/useSnapCarousel";
import { useMediaQuery } from "../hooks/useMediaQuery";
import Reveal from "../components/ui/Reveal";

const AVATAR_TONES = 4;

function avatarTone(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash + id.charCodeAt(i)) % AVATAR_TONES;
  }
  return hash;
}

function StarRating({
  rating,
  label,
  size = 16,
}: {
  rating: number;
  label: string;
  size?: number;
}) {
  const clamped = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <div className="testimonials__stars" aria-label={label}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          className={
            i < clamped
              ? "testimonials__star testimonials__star--on"
              : "testimonials__star"
          }
          aria-hidden="true"
        >
          <path d="M10 1l2.39 4.84L18 6.68l-4 3.9.94 5.5L10 13.77l-4.94 2.6.94-5.5-4-3.9 5.61-.84z" />
        </svg>
      ))}
    </div>
  );
}

function QuoteMark() {
  return (
    <span className="testimonial-card__quote-mark" aria-hidden="true">
      <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
        <path
          d="M10.4 20H0V11.2C0 6.1 2.7 2.3 8.2.4L9.6 3.1C6.2 4.4 4.6 6.5 4.6 9.7H10.4V20Zm15.6 0H15.6V11.2c0-5.1 2.7-8.9 8.2-10.8L25.2 3.1c-3.4 1.3-5 3.4-5 6.6H26V20Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

function ReviewAvatar({ review }: { review: GoogleReview }) {
  const initial = getReviewInitial(review.authorName);
  const photo = review.photoUrl?.trim() ?? "";

  if (photo) {
    return (
      <img
        className="testimonial-card__photo"
        src={photo}
        alt=""
        width={48}
        height={48}
        loading="lazy"
        decoding="async"
      />
    );
  }

  return (
    <span
      className={`testimonial-card__avatar testimonial-card__avatar--${avatarTone(review.id)}`}
      aria-hidden="true"
    >
      {initial}
    </span>
  );
}

function ReviewCard({
  review,
  featured = false,
}: {
  review: GoogleReview;
  featured?: boolean;
}) {
  return (
    <article
      className={`testimonial-card${featured ? " testimonial-card--featured" : ""}`}
    >
      <QuoteMark />

      <header className="testimonial-card__person">
        <ReviewAvatar review={review} />
        <div className="testimonial-card__identity">
          <strong className="testimonial-card__name">{review.authorName}</strong>
          {review.context ? (
            <span className="testimonial-card__context">{review.context}</span>
          ) : null}
        </div>
      </header>

      <StarRating
        rating={review.rating}
        label={`${review.rating} de 5 estrelas`}
        size={15}
      />

      <blockquote className="testimonial-card__quote">{review.text}</blockquote>

      <p className="testimonial-card__source">{GOOGLE_REVIEWS.sourceLabel}</p>
    </article>
  );
}

function ReviewsCarousel({ reviews }: { reviews: GoogleReview[] }) {
  const showThree = useMediaQuery("(min-width: 1024px)");
  const showTwo = useMediaQuery("(min-width: 768px)");
  const visibleCount = showThree ? 3 : showTwo ? 2 : 1;
  const {
    trackRef,
    setSlideRef,
    activeIndex,
    canPrev,
    canNext,
    goPrev,
    goNext,
    goToSlide,
    handleTrackKeyDown,
  } = useSnapCarousel({
    slideCount: reviews.length,
    visibleCount,
  });

  const featuredIndex =
    visibleCount === 3 ? activeIndex + 1 : activeIndex;

  const statusLabel =
    visibleCount === 1
      ? `Avaliação ${activeIndex + 1} de ${reviews.length}`
      : `Avaliações ${activeIndex + 1} a ${Math.min(activeIndex + visibleCount, reviews.length)} de ${reviews.length}`;

  return (
    <div className="testimonials-carousel">
      <button
        type="button"
        className="testimonials-carousel__arrow testimonials-carousel__arrow--prev"
        aria-label="Ver avaliações anteriores"
        disabled={!canPrev}
        onClick={goPrev}
      >
        <ChevronIcon direction="left" />
      </button>

      <div className="testimonials-carousel__stage">
        <p className="testimonials-carousel__status" aria-live="polite">
          {statusLabel}
        </p>

        <div
          ref={trackRef}
          className="testimonials-carousel__track"
          role="region"
          aria-roledescription="carrossel"
          aria-label="Avaliações de clientes no Google"
          tabIndex={0}
          onKeyDown={handleTrackKeyDown}
        >
          {reviews.map((review, index) => {
            const inView =
              index >= activeIndex && index < activeIndex + visibleCount;

            return (
              <div
                key={review.id}
                ref={(node) => setSlideRef(index, node)}
                className="testimonials-carousel__slide"
                aria-hidden={!inView}
              >
                <ReviewCard
                  review={review}
                  featured={index === featuredIndex}
                />
              </div>
            );
          })}
        </div>

        <div
          className="testimonials-carousel__dots"
          role="tablist"
          aria-label="Selecionar avaliação"
        >
          {reviews.map((review, index) => (
            <button
              key={review.id}
              type="button"
              role="tab"
              className={`testimonials-carousel__dot ${index === activeIndex ? "testimonials-carousel__dot--active" : ""}`}
              aria-selected={index === activeIndex}
              aria-label={`Mostrar a partir da avaliação de ${review.authorName}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        className="testimonials-carousel__arrow testimonials-carousel__arrow--next"
        aria-label="Ver próximas avaliações"
        disabled={!canNext}
        onClick={goNext}
      >
        <ChevronIcon direction="right" />
      </button>
    </div>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function TestimonialsSection() {
  const reviews = getDisplayGoogleReviews();
  const profileUrl = GOOGLE_REVIEWS_PROFILE_URL;
  const averageLabel = formatAverageRating(GOOGLE_REVIEWS.averageRating);
  const totalLabel = formatTotalReviewsLabel(GOOGLE_REVIEWS.totalReviews);

  return (
    <section
      className="testimonials section"
      id="depoimentos"
      aria-labelledby="depoimentos-title"
    >
      <div className="testimonials__glow" aria-hidden="true" />

      <div className="container">
        <Reveal>
          <header className="testimonials__header">
            <span className="eyebrow">Avaliações no Google</span>
            <p
              className="testimonials__score"
              aria-label={`Nota ${averageLabel} de 5`}
            >
              <span className="testimonials__score-value">{averageLabel}</span>
              <StarRating
                rating={GOOGLE_REVIEWS.averageRating}
                label={`Nota média ${averageLabel} de 5`}
                size={26}
              />
            </p>
            <h2 className="testimonials__title" id="depoimentos-title">
              {totalLabel}
            </h2>
            <p className="testimonials__proof">{GOOGLE_REVIEWS.socialProof}</p>
          </header>
        </Reveal>

        {reviews.length > 0 ? (
          <Reveal delay={40}>
            <ReviewsCarousel reviews={reviews} />
          </Reveal>
        ) : null}

        {profileUrl ? (
          <Reveal delay={80}>
            <div className="testimonials__footer">
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn testimonials__cta"
              >
                Ver todas as avaliações no Google
              </a>
              <p className="testimonials__asof">{GOOGLE_REVIEWS.consultedLabel}</p>
            </div>
          </Reveal>
        ) : (
          <p className="testimonials__asof">{GOOGLE_REVIEWS.consultedLabel}</p>
        )}
      </div>
    </section>
  );
}
