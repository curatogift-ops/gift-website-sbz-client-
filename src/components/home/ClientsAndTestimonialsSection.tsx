import { ChevronLeft, ChevronRight, Gift, Star } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

const FOREST = '#1B3022';
const MAROON = '#6B1E30';

type Brand = { id: string; label: string; className?: string };

const BRANDS: Brand[] = [
  { id: 'tata', label: 'TATA', className: 'font-serif text-xl font-bold tracking-[0.15em] sm:text-2xl' },
  { id: 'deloitte', label: 'Deloitte.', className: 'font-sans text-lg font-semibold tracking-tight sm:text-xl' },
  { id: 'google', label: 'Google', className: 'font-sans text-lg font-medium sm:text-xl' },
  { id: 'microsoft', label: 'Microsoft', className: 'font-sans text-base font-semibold sm:text-lg' },
  { id: 'infosys', label: 'Infosys', className: 'font-sans text-lg font-semibold sm:text-xl' },
  { id: 'amazon', label: 'amazon', className: 'font-sans text-lg font-medium lowercase sm:text-xl' },
  { id: 'samsung', label: 'SAMSUNG', className: 'font-sans text-sm font-bold tracking-[0.2em] sm:text-base' },
  { id: 'cocacola', label: 'Coca-Cola', className: 'font-serif text-lg font-semibold italic sm:text-xl' },
];

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

export default function ClientsAndTestimonialsSection() {
  const logoScrollRef = useRef<HTMLDivElement>(null);
  const testimonialScrollRef = useRef<HTMLDivElement>(null);
  const [testimonialActive, setTestimonialActive] = useState(0);

  const scrollLogo = (dir: -1 | 1) => {
    const el = logoScrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(200, el.clientWidth * 0.45), behavior: 'smooth' });
  };

  const updateTestimonialActive = useCallback(() => {
    const el = testimonialScrollRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>('[data-testimonial-card]');
    if (!first) return;
    const gap = 16;
    const step = first.offsetWidth + gap;
    if (step <= 0) return;
    const i = Math.min(TESTIMONIALS.length - 1, Math.max(0, Math.round(el.scrollLeft / step)));
    setTestimonialActive(i);
  }, []);

  useEffect(() => {
    const el = testimonialScrollRef.current;
    if (!el) return;
    updateTestimonialActive();
    el.addEventListener('scroll', updateTestimonialActive, { passive: true });
    return () => el.removeEventListener('scroll', updateTestimonialActive);
  }, [updateTestimonialActive]);

  const scrollTestimonial = (dir: -1 | 1) => {
    const el = testimonialScrollRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>('[data-testimonial-card]');
    const gap = 16;
    const step = (first?.offsetWidth ?? 320) + gap;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const goToTestimonial = (index: number) => {
    const el = testimonialScrollRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>('[data-testimonial-card]');
    const gap = 16;
    const step = (first?.offsetWidth ?? 320) + gap;
    el.scrollTo({ left: index * step, behavior: 'smooth' });
  };

  return (
    <>
      {/* Our Esteemed Clients */}
      <section className="section-pad bg-white" aria-labelledby="esteemed-clients-heading">
        <div className="section-container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Trusted by leading brands</p>
            <h2 id="esteemed-clients-heading" className="section-heading mt-3">
              <span style={{ color: FOREST }}>Our Esteemed </span>
              <span style={{ color: MAROON }}>Clients</span>
            </h2>
          </div>

          <div className="relative mx-auto mt-10 max-w-6xl md:mt-12">
            <button
              type="button"
              onClick={() => scrollLogo(-1)}
              className="absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#e5e2de] bg-white text-[#4a4846] shadow-md transition hover:bg-[#faf8f5] md:flex lg:-left-1"
              aria-label="Scroll brands left"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => scrollLogo(1)}
              className="absolute right-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#e5e2de] bg-white text-[#4a4846] shadow-md transition hover:bg-[#faf8f5] md:flex lg:-right-1"
              aria-label="Scroll brands right"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2} />
            </button>

            <div
              ref={logoScrollRef}
              className="no-scrollbar flex overflow-x-auto rounded-2xl border border-[#ebe8e4] bg-[#FFFBF8] px-2 py-2 shadow-[0_8px_28px_-16px_rgba(74,16,32,0.1)] md:mx-10 md:px-1"
            >
              {BRANDS.map((b, idx) => (
                <div
                  key={b.id}
                  className={`flex min-w-[7.5rem] shrink-0 flex-1 items-center justify-center border-[#ebe8e4] py-6 sm:min-w-[8.5rem] md:min-w-0 md:flex-1 ${
                    idx < BRANDS.length - 1 ? 'border-r' : ''
                  }`}
                >
                  <span className={`text-center text-[#1a1a1a] ${b.className ?? ''}`}>{b.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-center gap-4 md:hidden">
              <button
                type="button"
                onClick={() => scrollLogo(-1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e2de] bg-white text-[#4a4846] shadow-sm"
                aria-label="Scroll brands left"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={() => scrollLogo(1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e2de] bg-white text-[#4a4846] shadow-sm"
                aria-label="Scroll brands right"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* What Our Clients Say */}
      <section className="section-pad border-t border-[#f0ebe4] bg-white" aria-labelledby="client-testimonials-heading">
        <div className="section-container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Client testimonials</p>
            <h2 id="client-testimonials-heading" className="section-heading mt-3">
              <span style={{ color: FOREST }}>What Our </span>
              <span style={{ color: MAROON }}>Clients Say</span>
            </h2>
            <div className="mx-auto mt-5 flex max-w-xs items-center justify-center gap-3">
              <span className="rule-line min-w-[2rem] flex-1" aria-hidden />
              <Gift className="h-5 w-5 shrink-0 text-[#C5A059]" strokeWidth={1.75} aria-hidden />
              <span className="rule-line min-w-[2rem] flex-1" aria-hidden />
            </div>
            <p className="section-lede mx-auto mt-4">Real stories from our happy clients</p>
          </div>

          <div className="relative mx-auto mt-10 max-w-6xl md:mt-12">
            <button
              type="button"
              onClick={() => scrollTestimonial(-1)}
              className="absolute left-0 top-[42%] z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#e5e2de] bg-white text-[#4a4846] shadow-md transition hover:bg-[#faf8f5] md:flex lg:-left-1"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => scrollTestimonial(1)}
              className="absolute right-0 top-[42%] z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#e5e2de] bg-white text-[#4a4846] shadow-md transition hover:bg-[#faf8f5] md:flex lg:-right-1"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2} />
            </button>

            <div
              ref={testimonialScrollRef}
              className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:mx-10"
            >
              {TESTIMONIALS.map((t) => (
                <article
                  key={t.initials + t.name}
                  data-testimonial-card
                  className="w-[min(88vw,22rem)] shrink-0 snap-start sm:w-[min(85vw,24rem)] md:w-[min(42vw,22rem)] lg:w-[min(32vw,20rem)] xl:w-[19rem]"
                >
                  <div className="flex h-full flex-col rounded-2xl border border-[#ebe8e4] bg-[#FFFBF8] p-5 shadow-[0_10px_36px_-18px_rgba(74,16,32,0.1)] sm:p-6">
                    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ebe8e4] text-[12px] font-bold text-[#4a4846] sm:h-12 sm:w-12 sm:text-[13px]">
                        {t.initials}
                      </div>
                      <div className="flex justify-center gap-0.5">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-3.5 w-3.5 shrink-0 fill-[#C9A059] text-[#C9A059] sm:h-4 sm:w-4"
                            strokeWidth={0}
                            aria-hidden
                          />
                        ))}
                      </div>
                      <span className="font-serif text-4xl font-light leading-none text-[#6B1E30]/30" aria-hidden>
                        &rdquo;
                      </span>
                    </div>
                    <p className="mt-5 flex-1 text-[13.5px] leading-relaxed text-[#3d4540] sm:text-[14px]">
                      {t.text}
                    </p>
                    <div className="mt-5 border-t border-[#f0ebe4] pt-4 text-left">
                      <p className="text-[14px] font-bold text-[#6B1E30] sm:text-[15px]">{t.name}</p>
                      <p className="mt-0.5 text-[12px] text-[#6b6560] sm:text-[12.5px]">{t.role}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-4 flex justify-center gap-4 md:hidden">
              <button
                type="button"
                onClick={() => scrollTestimonial(-1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e2de] bg-white text-[#4a4846] shadow-sm"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={() => scrollTestimonial(1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e2de] bg-white text-[#4a4846] shadow-sm"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goToTestimonial(i)}
                  className={
                    i === testimonialActive
                      ? 'h-2 w-8 rounded-full bg-[#6B1E30] transition-all'
                      : 'h-2 w-2 rounded-full bg-[#e0dcd6] transition-all hover:bg-[#cfc9c2]'
                  }
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === testimonialActive ? 'true' : undefined}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
