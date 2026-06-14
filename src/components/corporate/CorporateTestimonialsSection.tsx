import { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Star } from 'lucide-react';

type Testimonial = {
  initials: string;
  name: string;
  role?: string;
  text: string;
  rating: number;
  tone: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    initials: 'RS',
    name: 'Rohit Sharma',
    role: 'HR Manager, Tata Motors',
    text: 'The hampers were beautifully curated and delivered on time. Our employees absolutely loved the presentation and product quality.',
    rating: 5,
    tone: 'from-[#6B1E30] to-[#C9A96E]',
  },
  {
    initials: 'NP',
    name: 'Neha Patel',
    role: 'Admin Head, Deloitte',
    text: 'Giftz Gallerei made our Diwali gifting seamless. The customization, packaging, and delivery were handled with real care.',
    rating: 5,
    tone: 'from-[#D94F7B] to-[#8C3048]',
  },
  {
    initials: 'AK',
    name: 'Amit Kumar',
    role: 'Procurement Lead, Infosys',
    text: 'Premium quality gifts and excellent support. They understand corporate timelines and deliver exactly what they promise.',
    rating: 5,
    tone: 'from-[#2E6F73] to-[#6B1E30]',
  },
  {
    initials: 'SM',
    name: 'Sneha Mehta',
    role: 'Marketing Manager, Amazon',
    text: 'From selection to delivery, everything was flawless. Our clients appreciated the hampers and the branding felt very premium.',
    rating: 5,
    tone: 'from-[#9D7D47] to-[#6B1E30]',
  },
  {
    initials: 'AR',
    name: 'Aanchal Agarwal',
    text: 'Loved the gift selection and the smooth experience. The team was quick, responsive, and very easy to coordinate with.',
    rating: 5,
    tone: 'from-[#B36A3C] to-[#C9A96E]',
  },
  {
    initials: 'VR',
    name: 'Vanshika Rathi',
    text: 'Excellent hamper curation, beautiful presentation, and timely delivery. A great partner for corporate gifting.',
    rating: 5,
    tone: 'from-[#3F5C88] to-[#8C3048]',
  },
];

function GoogleReviewMark() {
  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_10px_26px_-18px_rgba(26,16,16,0.7)] ring-1 ring-black/[0.04]"
      aria-label="Google review"
    >
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
    </span>
  );
}

export default function CorporateTestimonialsSection() {
  const testimonialScrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const updateActiveSlide = useCallback(() => {
    const el = testimonialScrollRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>('[data-testimonial-card]');
    if (!first) return;
    const gap = 16;
    const step = first.offsetWidth + gap;
    if (step <= 0) return;
    const index = Math.min(TESTIMONIALS.length - 1, Math.max(0, Math.round(el.scrollLeft / step)));
    setActiveSlide(index);
  }, []);

  useEffect(() => {
    const el = testimonialScrollRef.current;
    if (!el) return;
    updateActiveSlide();
    el.addEventListener('scroll', updateActiveSlide, { passive: true });
    return () => el.removeEventListener('scroll', updateActiveSlide);
  }, [updateActiveSlide]);

  const scrollTestimonials = (dir: -1 | 1) => {
    const el = testimonialScrollRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>('[data-testimonial-card]');
    const gap = 16;
    const step = (first?.offsetWidth ?? 320) + gap;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const goToSlide = (index: number) => {
    const el = testimonialScrollRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>('[data-testimonial-card]');
    const gap = 16;
    const step = (first?.offsetWidth ?? 320) + gap;
    el.scrollTo({ left: index * step, behavior: 'smooth' });
  };

  return (
    <section
      id="client-testimonials"
      className="scroll-mt-28 bg-white py-12 sm:py-14 lg:py-16"
      aria-labelledby="client-testimonials-heading"
    >
      <div className="section-container">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow">Client testimonials</p>
            <h2 id="client-testimonials-heading" className="section-heading-corporate mt-3">
              Gifts that made an impression!
            </h2>
          </div>

          <a
            href="https://www.google.com/search?q=Giftz+Gallerei+reviews"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-md border border-border bg-white px-4 py-3 font-sans text-[12px] font-bold uppercase tracking-[0.1em] text-foreground shadow-[0_10px_28px_-22px_rgba(26,16,16,0.55)] transition hover:border-[#C9A96E]/50 hover:text-primary"
          >
            <GoogleReviewMark />
            Show all reviews
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.1} aria-hidden />
          </a>
        </div>

        {/* Carousel Slider */}
        <div className="relative mt-8 lg:mt-10">
          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={() => scrollTestimonials(-1)}
            className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white text-foreground shadow-[0_14px_34px_-22px_rgba(26,16,16,0.75)] transition hover:border-[#C9A96E]/45 hover:text-primary md:flex"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => scrollTestimonials(1)}
            className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-border bg-white text-foreground shadow-[0_14px_34px_-22px_rgba(26,16,16,0.75)] transition hover:border-[#C9A96E]/45 hover:text-primary md:flex"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2} />
          </button>

          {/* Scrolling Track */}
          <div
            ref={testimonialScrollRef}
            className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3.5 md:mx-0 md:px-2"
          >
            {TESTIMONIALS.map((t) => (
              <article
                key={t.initials + t.name}
                data-testimonial-card
                className="w-[min(86vw,21rem)] shrink-0 snap-start sm:w-[22rem] md:w-[23rem] lg:w-[calc((100%_-_3rem)/4)] lg:min-w-[18.5rem] xl:w-[20.5rem]"
              >
                <div className="relative flex min-h-[15.25rem] flex-col overflow-hidden rounded-2xl border border-border bg-[#FFFDF9] p-5 shadow-[0_16px_45px_-36px_rgba(26,16,16,0.72)] transition duration-300 hover:-translate-y-1 hover:border-[#C9A96E]/45 sm:min-h-[15.75rem]">
                  <div
                    className={`pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-gradient-to-br ${t.tone} opacity-[0.1] blur-2xl`}
                    aria-hidden
                  />

                  <div className="relative flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.tone} text-[13px] font-bold text-white shadow-[0_10px_24px_-16px_rgba(26,16,16,0.75)]`}>
                        {t.initials}
                      </div>
                      <div className="flex min-w-0 flex-col items-start">
                        <p className="w-full truncate text-[14px] font-bold leading-tight text-foreground sm:text-[15px]">{t.name}</p>
                        {t.role && (
                          <p className="mt-0.5 w-full truncate text-[12px] leading-tight text-muted-foreground">{t.role}</p>
                        )}
                      </div>
                    </div>
                    <GoogleReviewMark />
                  </div>

                  {/* Rating Stars - aligned left! */}
                  <div className="relative mt-4 flex items-center gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 shrink-0 fill-[#F28B2C] text-[#F28B2C]"
                        strokeWidth={0}
                        aria-hidden
                      />
                    ))}
                  </div>

                  {/* Testimonial text */}
                  <p className="relative mt-4 [display:-webkit-box] flex-1 overflow-hidden text-[15px] leading-relaxed text-foreground/82 [-webkit-box-orient:vertical] [-webkit-line-clamp:4] sm:text-[15.5px]">
                    {t.text}
                  </p>

                  <div className="relative mt-5 flex items-center justify-between border-t border-border/70 pt-4">
                    <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                      Verified review
                    </span>
                    <span className="font-serif text-3xl leading-none text-primary/20" aria-hidden>
                      &rdquo;
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Navigation Arrows for Mobile Views */}
          <div className="mt-4 flex justify-center gap-3 md:hidden">
            <button
              type="button"
              onClick={() => scrollTestimonials(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-foreground shadow-[0_10px_26px_-20px_rgba(26,16,16,0.75)]"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => scrollTestimonials(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-foreground shadow-[0_10px_26px_-20px_rgba(26,16,16,0.75)]"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="mt-5 flex items-center justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToSlide(i)}
                className={
                  i === activeSlide
                    ? 'h-1.5 w-7 rounded-full bg-primary transition-all duration-300'
                    : 'h-1.5 w-1.5 rounded-full bg-border transition-all duration-300 hover:bg-muted-foreground/40'
                }
                aria-label={`Go to testimonial slide ${i + 1}`}
                aria-current={i === activeSlide ? 'true' : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
