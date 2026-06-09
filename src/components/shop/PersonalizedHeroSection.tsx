import { Link } from 'react-router-dom';
import AppImage from '@/components/ui/AppImage';
import { Gift, Sparkles } from 'lucide-react';

const WA = '919876543210';

const PERSONALIZED_HERO_SRC = '/images/personalized-hero.png';

const HERO_STATS = [
  { value: '500+', label: 'Gift styles' },
  { value: '100%', label: 'Personalized' },
  { value: 'Pan India', label: 'Delivery' },
];

export default function PersonalizedHeroSection() {
  const conciergeHref = `https://wa.me/${WA}?text=${encodeURIComponent(
    "Hi, I'd like help choosing a personalized gift."
  )}`;

  return (
    <section className="relative w-full overflow-hidden bg-[#F5F0EB]" aria-labelledby="personalized-hero-heading">
      <div className="relative mx-auto w-full max-w-[2500px]">
        <div className="relative min-h-[480px] sm:min-h-[520px] lg:min-h-[560px]">
          {/* Hero image — gift boxes on the right, open space on the left for copy */}
          <div className="absolute inset-0">
            <AppImage
              src={PERSONALIZED_HERO_SRC}
              alt="Personalized luxury gift hampers with burgundy boxes and premium keepsakes"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[72%_center] sm:object-[68%_center] lg:object-[right_center]"
            />
            {/* Soft cream fade on the left so headline stays readable */}
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(245,240,235,0.97)_0%,rgba(245,240,235,0.88)_28%,rgba(245,240,235,0.45)_48%,transparent_72%)]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(245,240,235,0.5)_0%,transparent_35%,transparent_75%,rgba(245,240,235,0.35)_100%)] md:hidden"
              aria-hidden
            />
          </div>

          {/* Content — left aligned over open area of image */}
          <div className="relative z-10 flex min-h-[480px] flex-col justify-center px-4 py-24 sm:min-h-[520px] sm:px-6 lg:min-h-[560px] lg:px-12 xl:px-16">
            <div className="mx-auto w-full max-w-7xl">
              <div className="max-w-md sm:max-w-lg lg:max-w-xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C9A96E]/40 bg-white/70 px-3.5 py-1.5 shadow-sm backdrop-blur-sm">
                  <Sparkles className="h-3.5 w-3.5 text-[#9D7D47]" strokeWidth={1.75} aria-hidden />
                  <span className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-[#6B1E30]">
                    Personalized gifting
                  </span>
                </div>

                <h1 id="personalized-hero-heading" className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.12] tracking-tight text-[#4A1020]">
                  Personalized Gifts,{' '}
                  <span className="block font-serif italic font-semibold text-[#6B1E30]">Perfectly Yours</span>
                </h1>

                <p className="mt-4 max-w-md text-[14px] leading-relaxed text-[#5c5652] sm:text-[15px]">
                  Thoughtfully customized keepsakes designed to celebrate every special connection.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link to="/hamper-builder" className="btn-pill btn-pill-maroon shadow-[0_8px_24px_-6px_rgba(74,16,32,0.35)]">
                    <Gift className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                    Make Your Own Hamper
                  </Link>
                  <a
                    href={conciergeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pill btn-pill-ghost-gold border-[#C9A96E]/50 bg-white/80"
                  >
                    Talk to Concierge
                  </a>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-6 border-t border-[#6B1E30]/10 pt-8 lg:mt-12 lg:max-w-md">
                {HERO_STATS.map(({ value, label }) => (
                  <div key={label}>
                    <p className="font-serif text-[22px] font-bold text-[#6B1E30] sm:text-[24px]">{value}</p>
                    <p className="mt-0.5 font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-[#8C7A76]">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
