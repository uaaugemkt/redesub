import { useEffect, useState } from "react";
import { GOOGLE_REVIEWS_PROFILE_URL } from "../config/integrations";
import {
  GOOGLE_REVIEWS_DATA,
  fetchGoogleReviews,
  getDisplayGoogleReviews,
  hasGoogleReviews,
  type GoogleReview,
  type GoogleReviewsSummary,
} from "../lib/googleReviews";
import Reveal from "../components/ui/Reveal";

function StarRating({ rating, label }: { rating: number; label: string }) {
  const clamped = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <div className="testimonials__stars" aria-label={label}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="18"
          height="18"
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

function GoogleMark() {
  return (
    <span className="testimonial-card__google" aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path
          d="M22.5 12.3c0-.8-.1-1.5-.2-2.2H12v4.2h5.9c-.3 1.4-1 2.5-2.1 3.3v2.7h3.4c2-1.8 3.3-4.5 3.3-8Z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.9 0 5.3-.9 7.1-2.6l-3.4-2.7c-1 .7-2.2 1.1-3.7 1.1-2.8 0-5.2-1.9-6.1-4.4H2.4v2.8C4.2 20.6 7.8 23 12 23Z"
          fill="#34A853"
        />
        <path
          d="M5.9 14.4c-.2-.7-.4-1.4-.4-2.1s.1-1.5.4-2.1V7.3H2.4C1.7 8.7 1.3 10.3 1.3 12s.4 3.3 1.1 4.7l3.5-2.3Z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.4c1.6 0 3 .5 4.1 1.6l3.1-3.1C17.3 2.1 14.9 1 12 1 7.8 1 4.2 3.4 2.4 7.3l3.5 2.8c.9-2.5 3.3-4.7 6.1-4.7Z"
          fill="#EA4335"
        />
      </svg>
      Google
    </span>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <article className="testimonial-card testimonial-card--review">
      <div className="testimonial-card__header">
        <StarRating
          rating={review.rating}
          label={`${review.rating} de 5 estrelas`}
        />
        <GoogleMark />
      </div>

      <blockquote>&ldquo;{review.text}&rdquo;</blockquote>

      <footer>
        {review.authorPhoto ? (
          <img
            className="testimonial-card__photo"
            src={review.authorPhoto}
            alt=""
            width={40}
            height={40}
          />
        ) : (
          <div className="testimonial-card__avatar" aria-hidden="true">
            {review.authorName.charAt(0)}
          </div>
        )}
        <div>
          <strong>{review.authorName}</strong>
          {review.relativeTime ? (
            <span className="testimonial-card__time">{review.relativeTime}</span>
          ) : null}
        </div>
      </footer>
    </article>
  );
}

export default function TestimonialsSection() {
  const [data, setData] = useState<GoogleReviewsSummary>(GOOGLE_REVIEWS_DATA);
  const reviews = getDisplayGoogleReviews(data);
  const showReviews = hasGoogleReviews(data);
  const profileUrl = GOOGLE_REVIEWS_PROFILE_URL;
  const showSummary =
    showReviews && (data.averageRating !== null || data.totalReviews !== null);

  useEffect(() => {
    const controller = new AbortController();

    void fetchGoogleReviews(controller.signal).then((payload) => {
      if (!controller.signal.aborted) {
        setData(payload);
      }
    });

    return () => controller.abort();
  }, []);

  return (
    <section
      className={`testimonials section ${showReviews ? "" : "testimonials--empty"}`.trim()}
      id="depoimentos"
      aria-labelledby="depoimentos-title"
    >
      <div className="container">
        <Reveal>
          <div className="section__header section__header--center testimonials__header">
            <span className="eyebrow">Quem usa, recomenda</span>
            <h2 className="section__title" id="depoimentos-title">
              A experiência de quem escolhe a RedeSub
            </h2>
            <p className="section__desc">
              {showReviews
                ? "Avaliações reais de clientes no Google."
                : "Confira as avaliações da RedeSub no Google."}
            </p>
          </div>
        </Reveal>

        {showSummary ? (
          <Reveal delay={40}>
            <div className="testimonials__summary">
              {data.averageRating !== null ? (
                <>
                  <p className="testimonials__average">
                    <strong>{data.averageRating.toFixed(1)}</strong>
                    <span>de 5</span>
                  </p>
                  <StarRating
                    rating={data.averageRating}
                    label={`Nota média ${data.averageRating} de 5`}
                  />
                </>
              ) : null}
              {data.totalReviews !== null ? (
                <p className="testimonials__count">
                  {data.totalReviews}{" "}
                  {data.totalReviews === 1 ? "avaliação" : "avaliações"} no Google
                </p>
              ) : null}
            </div>
          </Reveal>
        ) : null}

        {showReviews ? (
          <div className="testimonials__grid">
            {reviews.map((review, index) => (
              <Reveal key={`${review.authorName}-${index}`} delay={index * 50}>
                <ReviewCard review={review} />
              </Reveal>
            ))}
          </div>
        ) : null}

        {profileUrl ? (
          <Reveal delay={showReviews ? 80 : 40}>
            <div className="testimonials__footer">
              <div className="testimonials__actions">
                <a
                  href={profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline btn--md"
                >
                  Ver todas as avaliações no Google
                </a>
              </div>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
