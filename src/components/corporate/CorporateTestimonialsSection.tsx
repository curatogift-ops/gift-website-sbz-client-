import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Gift, Star } from 'lucide-react';

type Testimonial = {
  initials: string;
  name: string;
  role: string;
  text: string;
  rating: number;
};

const TESTIMONIALS: Testimonial[] = [
  {
    initials: 'RS',
    name: 'Rohit Sharma',
    role: 'HR Manager, Tata Motors',
    text: 'The hampers were beautifully curated and delivered on time. Our employees absolutely loved them! Highly professional team and great quality products.',
    rating: 5,
  },
  {
    initials: 'NP',
    name: 'Neha Patel',
    role: 'Admin Head, Deloitte',
    text: 'Giftz Gallerei made our Diwali gifting seamless and memorable. The customization, packaging, and timely delivery exceeded our expectations.',
    rating: 5,
  },
  {
    initials: 'AK',
    name: 'Amit Kumar',
    role: 'Procurement Lead, Infosys',
    text: 'Premium quality gifts and excellent customer support. They understand corporate needs and deliver exactly what they promise.',
    rating: 5,
  },
  {
    initials: 'SM',
    name: 'Sneha Mehta',
    role: 'Marketing Manager, Amazon',
    text: 'From selection to delivery, everything was flawless. Our clients appreciated the hampers and it helped us strengthen our relationships.',
    rating: 5,
  },
];

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
    <section className="bg-white py-12 sm:py-16 lg:py-20 border-t border-[#f0ebe4]" aria-labelledby="client-testimonials-heading">
      <div className="section-container">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-sans text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#A67C37] sm:text-[11.5px] sm:tracking-[0.2em] lg:text-xs">
            Client Testimonials
          </p>
          <h2 id="client-testimonials-heading" className="font-serif text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-[#1A1010] leading-tight mt-3">
            What Our <span className="text-[#6B1E30]">Clients Say</span>
          </h2>
          <div className="mx-auto mt-5 flex max-w-xs items-center justify-center gap-3">
            <span className="rule-line min-w-[2rem] flex-1 bg-[#C5A059]/30" aria-hidden />
            <Gift className="h-4.5 w-4.5 shrink-0 text-[#C5A059]" strokeWidth={1.5} aria-hidden />
            <span className="rule-line min-w-[2rem] flex-1 bg-[#C5A059]/30" aria-hidden />
          </div>
          <p className="mt-4 font-sans text-sm sm:text-base text-[#5c6560] font-medium leading-relaxed">
            Real stories from our happy clients
          </p>
        </div>

        {/* Carousel Slider */}
        <div className="relative mx-auto mt-10 max-w-6xl md:mt-12">
          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={() => scrollTestimonials(-1)}
            className="absolute left-0 top-[42%] z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#e5e2de] bg-white text-[#4a4846] shadow-md transition hover:bg-[#faf8f5] md:flex lg:-left-1.5 active:scale-95"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => scrollTestimonials(1)}
            className="absolute right-0 top-[42%] z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#e5e2de] bg-white text-[#4a4846] shadow-md transition hover:bg-[#faf8f5] md:flex lg:-right-1.5 active:scale-95"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2} />
          </button>

          {/* Scrolling Track */}
          <div
            ref={testimonialScrollRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3.5 md:mx-10"
          >
            {TESTIMONIALS.map((t) => (
              <article
                key={t.initials + t.name}
                data-testimonial-card
                className="w-[min(82vw,18.5rem)] shrink-0 snap-start sm:w-[20rem] md:w-[21rem] lg:w-[20rem] xl:w-[19rem]"
              >
                <div className="flex h-full flex-col rounded-2xl border border-[#ebe8e4] bg-[#FFFBF8] p-4.5 shadow-[0_10px_32px_-18px_rgba(74,16,32,0.06)] hover:shadow-[0_12px_36px_-16px_rgba(74,16,32,0.12)] transition-shadow duration-300">
                  <div className="flex items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* User initials bubble */}
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#6B1E30]/10 text-[12px] font-bold text-[#6B1E30] sm:h-10 sm:w-10 sm:text-xs">
                        {t.initials}
                      </div>
                      <div className="flex flex-col items-start min-w-0">
                        <p className="text-[13.5px] font-bold text-[#6B1E30] sm:text-[14.5px] leading-tight truncate w-full">{t.name}</p>
                        <p className="text-[11px] text-[#6b6560] sm:text-[12px] leading-tight truncate w-full mt-0.5">{t.role}</p>
                      </div>
                    </div>
                    {/* Gold quote ornament */}
                    <span className="font-serif text-3xl font-light leading-none text-[#6B1E30]/20 shrink-0 select-none" aria-hidden>
                      &rdquo;
                    </span>
                  </div>

                  {/* Rating Stars - aligned left! */}
                  <div className="mt-3.5 flex items-center gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 shrink-0 fill-[#C9A059] text-[#C9A059] sm:h-3.5 sm:w-3.5"
                        strokeWidth={0}
                        aria-hidden
                      />
                    ))}
                  </div>

                  {/* Testimonial text */}
                  <p className="mt-2.5 flex-1 text-[13px] sm:text-[13.8px] leading-relaxed text-[#4A4846]">
                    {t.text}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Navigation Arrows for Mobile Views */}
          <div className="mt-4 flex justify-center gap-4 md:hidden">
            <button
              type="button"
              onClick={() => scrollTestimonials(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e2de] bg-white text-[#4a4846] shadow-sm"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => scrollTestimonials(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e2de] bg-white text-[#4a4846] shadow-sm"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToSlide(i)}
                className={
                  i === activeSlide
                    ? 'h-1.5 w-7 rounded-full bg-[#6B1E30] transition-all duration-300'
                    : 'h-1.5 w-1.5 rounded-full bg-[#e0dcd6] transition-all duration-300 hover:bg-[#cfc9c2]'
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
