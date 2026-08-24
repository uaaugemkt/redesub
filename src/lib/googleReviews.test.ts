import { describe, expect, it } from "vitest";
import {
  GOOGLE_REVIEWS,
  formatAverageRating,
  formatTotalReviewsLabel,
  getDisplayGoogleReviews,
  getReviewInitial,
  resolveGoogleReviewsProfileUrl,
} from "./googleReviews";

describe("googleReviews", () => {
  it("keeps rating, total and reviews in one snapshot", () => {
    expect(GOOGLE_REVIEWS.averageRating).toBe(4.9);
    expect(GOOGLE_REVIEWS.totalReviews).toBe(556);
    expect(GOOGLE_REVIEWS.consultedAt).toBe("agosto de 2026");
    expect(getDisplayGoogleReviews()).toHaveLength(6);
  });

  it("formats the header in pt-BR", () => {
    expect(formatAverageRating(4.9)).toBe("4,9");
    expect(formatTotalReviewsLabel(556)).toBe("556 avaliações no Google");
  });

  it("reads the initial for avatars", () => {
    expect(getReviewInitial("Fernanda M.")).toBe("F");
  });

  it("rejects placeholder Google URLs", () => {
    expect(resolveGoogleReviewsProfileUrl("https://g.page/r/redesub/review")).toBeNull();
    expect(resolveGoogleReviewsProfileUrl(GOOGLE_REVIEWS.profileUrl)).toBe(
      "https://share.google/ust57xW9KCzFhrtAX"
    );
  });
});
