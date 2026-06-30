import { Star } from 'lucide-react';

type CorporateProductReviewsProps = {
  rating: number;
  reviewCount: number;
  onWriteReview: () => void;
};

function StarRow({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClass = size === 'lg' ? 'h-5 w-5' : size === 'sm' ? 'h-3 w-3' : 'h-4 w-4';
  return (
    <div className="flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${sizeClass} ${i < Math.round(rating) ? 'fill-[#C9A96E] text-[#C9A96E]' : 'fill-transparent text-[#D4C4B0]'}`}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

function ratingBars(rating: number, total: number) {
  const weights = [5, 4, 3, 2, 1].map((stars) => {
    const distance = Math.abs(stars - rating);
    const weight = Math.max(0.05, 1 - distance * 0.35);
    return weight;
  });
  const sum = weights.reduce((a, b) => a + b, 0);
  return [5, 4, 3, 2, 1].map((stars, i) => ({
    stars,
    percent: Math.round((weights[i] / sum) * 100),
    count: Math.round((weights[i] / sum) * total),
  }));
}

export default function CorporateProductReviews({
  rating,
  reviewCount,
  onWriteReview,
}: CorporateProductReviewsProps) {
  const bars = ratingBars(rating, reviewCount);

  return (
    <section className="border-t border-[#E8DFD4] bg-white py-10 sm:py-12" aria-labelledby="customer-reviews-heading">
      <div className="section-container">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-wrap items-center gap-6 lg:gap-10">
              <div className="text-center lg:text-left">
                <p className="font-serif text-5xl font-semibold leading-none text-[#4A1020]">{rating.toFixed(1)}</p>
                <div className="mt-2 flex justify-center lg:justify-start">
                  <StarRow rating={rating} size="lg" />
                </div>
                <p className="mt-2 text-sm text-[#6E6360]">Based on {reviewCount} reviews</p>
              </div>

              <div className="min-w-[200px] flex-1 space-y-2">
                {bars.map((bar) => (
                  <div key={bar.stars} className="flex items-center gap-3">
                    <span className="w-3 text-xs font-medium text-[#6E6360]">{bar.stars}</span>
                    <Star className="h-3 w-3 fill-[#C9A96E] text-[#C9A96E]" strokeWidth={1.5} aria-hidden />
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#F0EBE4]">
                      <div
                        className="h-full rounded-full bg-[#C9A96E]"
                        style={{ width: `${bar.percent}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-xs text-[#6E6360]">{bar.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:text-right">
              <h2
                id="customer-reviews-heading"
                className="font-serif text-xl font-semibold text-[#4A1020] sm:text-2xl"
              >
                Customer Reviews
              </h2>
              <button
                type="button"
                onClick={onWriteReview}
                className="mt-4 inline-flex min-h-11 items-center justify-center rounded-md bg-[#4A1020] px-8 text-[12px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#6B1E30]"
              >
                Write a review
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
