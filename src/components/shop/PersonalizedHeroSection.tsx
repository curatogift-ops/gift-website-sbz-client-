import { Link } from 'react-router-dom';
import AppImage from '@/components/ui/AppImage';
import { Gift, Headphones, Heart, Leaf, ShieldCheck, Truck } from 'lucide-react';

const WA = '919876543210';

const HERO_DESKTOP_SRC = '/images/personalized-hero-desktop.png';
const HERO_MOBILE_SRC = '/images/personalized-hero-mobile.png';

const HERO_STATS = [
  { Icon: Gift, value: '500+', label: 'Gift styles' },
  { Icon: Heart, value: '100%', label: 'Personalized' },
  { Icon: Truck, value: 'Pan India', label: 'Delivery' },
];

const HERO_TRUST = [
  { Icon: Leaf, label: 'Premium', sub: 'Quality' },
  { Icon: ShieldCheck, label: 'Secure', sub: 'Payment' },
  { Icon: Headphones, label: 'Dedicated', sub: 'Support' },
];

export default function PersonalizedHeroSection() {
  const conciergeHref = `https://wa.me/${WA}?text=${encodeURIComponent(
    "Hi, I'd like help choosing a personalized gift."
  )}`;

  return (
    <section className="relative w-full overflow-hidden bg-[#FBF5EE]" aria-labelledby="personalized-hero-heading">
      <div className="relative mx-auto w-full max-w-[2500px]">
        {/* Background image — new burgundy box artwork on mobile, wide banner on desktop */}
        <div className="absolute inset-0">
          <AppImage
            src={HERO_MOBILE_SRC}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_30%] md:hidden"
          />
          <AppImage
            src={HERO_DESKTOP_SRC}
            alt="Personalized luxury gift hampers with burgundy boxes and premium keepsakes"
            fill
            priority
            sizes="100vw"
            className="hidden object-cover object-[center_center] md:block lg:object-[65%_center]"
          />
          {/* Whisper-light scrim so the headline stays readable */}
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(251,245,238,0.55)_0%,rgba(251,245,238,0.12)_38%,transparent_60%)] md:bg-[linear-gradient(to_right,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.15)_40%,transparent_65%)]"
            aria-hidden
          />
        </div>

        {/* Thin gold frame */}
        <div
          className="pointer-events-none absolute inset-3 z-10 rounded-[1.5rem] border border-[#C9A96E]/45 sm:inset-4 sm:rounded-[1.75rem]"
          aria-hidden
        />

        <div className="relative z-10 py-12 sm:py-16 lg:py-24">
          <div className="section-container">
            <div className="max-w-xl lg:max-w-2xl">
              {/* Badge */}
              <div className="inline-flex min-h-[36px] items-center gap-2.5 rounded-full border border-[#C9A96E]/50 bg-[#FBF5EE]/80 px-4 py-2 shadow-sm backdrop-blur-sm">
                <Gift className="h-4 w-4 text-[#9D7D47]" strokeWidth={1.75} aria-hidden />
                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#6B1E30]">
                  Personalized gifting
                </span>
              </div>

              {/* Heading */}
              <h1
                id="personalized-hero-heading"
                className="mt-6 font-serif text-[clamp(2.5rem,4vw+1rem,4.25rem)] font-bold leading-[1.06] tracking-[-0.015em] text-[#4A1020]"
              >
                Personalized Gifts,
                <span className="block italic font-semibold text-[#6B1E30]">Perfectly Yours</span>
              </h1>

              {/* Ornament divider */}
              <div className="mt-6 flex items-center gap-3" aria-hidden>
                <span className="h-px w-14 bg-gradient-to-r from-[#C9A96E]/70 to-[#C9A96E]/20" />
                <Heart className="h-3.5 w-3.5 fill-[#C9A96E] text-[#C9A96E]" aria-hidden />
                <span className="h-px w-14 bg-gradient-to-l from-[#C9A96E]/70 to-[#C9A96E]/20" />
              </div>

              {/* CTAs */}
              <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                <Link
                  to="/hamper-builder"
                  className="btn-pill btn-pill-maroon w-full shadow-[0_8px_24px_-6px_rgba(74,16,32,0.35)] sm:w-auto"
                >
                  <Gift className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                  Make Your Own Hamper
                </Link>
                <a
                  href={conciergeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill btn-pill-ghost-gold hidden w-full border-[#C9A96E]/50 bg-white/70 sm:inline-flex sm:w-auto"
                >
                  Talk to Concierge
                </a>
              </div>

              {/* Stats card */}
              <div className="mt-10 grid grid-cols-3 divide-x divide-[#C9A96E]/25 rounded-2xl border border-[#C9A96E]/30 bg-[#FBF5EE]/75 px-2 py-5 shadow-[0_12px_32px_-12px_rgba(74,16,32,0.18)] backdrop-blur-md sm:max-w-md sm:px-4">
                {HERO_STATS.map(({ Icon, value, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2 px-2 text-center">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C9A96E]/15 text-[#9D7D47]">
                      <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
                    </span>
                    <p className="font-serif text-[18px] font-bold leading-none text-[#6B1E30] sm:text-[22px]">
                      {value}
                    </p>
                    <p className="font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-[#8C7A76] sm:text-[10px]">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Trust strip */}
              <div className="mt-4 flex items-center justify-between gap-2 rounded-2xl border border-[#C9A96E]/25 bg-[#FBF5EE]/65 px-4 py-3.5 backdrop-blur-md sm:max-w-md sm:px-6">
                {HERO_TRUST.map(({ Icon, label, sub }) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C9A96E]/40 text-[#9D7D47]">
                      <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                    </span>
                    <p className="font-sans text-[9px] font-bold uppercase leading-[1.4] tracking-[0.1em] text-[#4A1020] sm:text-[10px]">
                      {label}
                      <span className="block text-[#8C7A76]">{sub}</span>
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
