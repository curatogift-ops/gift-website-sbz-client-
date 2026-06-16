import { Link } from 'react-router-dom';
import AppImage from '@/components/ui/AppImage';
import { Gift, Headphones, Heart, ShieldCheck, Sparkles, MapPin, Diamond } from 'lucide-react';

const WA = '919876543210';

const HERO_DESKTOP_SRC = '/images/personalized-hero-desktop.png';
const HERO_MOBILE_SRC = '/images/personalized-hero-mobile.png';

const HERO_STATS = [
  { Icon: Gift, value: '500+', label: 'Gift styles' },
  { Icon: Sparkles, value: '100%', label: 'Personalized' },
  { Icon: MapPin, value: 'Pan India', label: 'Delivery' },
];

const HERO_TRUST = [
  { Icon: Diamond, label: 'Premium', sub: 'Quality' },
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

        <div className="relative z-10 pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-14 lg:pb-24">
          <div className="section-container">
            <div className="max-w-xl lg:max-w-2xl">
              {/* Heading */}
              <h1
                id="personalized-hero-heading"
                className="font-serif text-[clamp(2rem,3.5vw+0.5rem,3.5rem)] font-semibold leading-[1.02] text-[#4A1020]"
              >
                Personalized Gifts,
                <span className="block italic font-semibold text-[#6B1E30]">Perfectly Yours</span>
              </h1>

              {/* Ornament divider */}
              <div className="mt-5 flex items-center gap-3" aria-hidden>
                <span className="h-px w-12 bg-gradient-to-r from-[#C9A96E]/70 to-[#C9A96E]/20" />
                <Heart className="h-3 w-3 fill-[#C9A96E] text-[#C9A96E]" aria-hidden />
                <span className="h-px w-12 bg-gradient-to-l from-[#C9A96E]/70 to-[#C9A96E]/20" />
              </div>

              {/* CTAs */}
              <div className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                <Link
                  to="/hamper-builder"
                  className="btn-pill btn-pill-maroon w-full shadow-[0_8px_24px_-6px_rgba(74,16,32,0.35)] sm:w-auto !min-h-[40px] sm:!min-h-[44px] !px-6 sm:!px-7 !text-[10px] sm:!text-[11px]"
                >
                  <Gift className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
                  Make Your Own Hamper
                </Link>
                <a
                  href={conciergeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill hidden w-full border border-[#C9A96E]/60 bg-white/95 text-[#4A1020] shadow-sm transition-all hover:border-[#4A1020] hover:bg-white sm:inline-flex sm:w-auto !min-h-[40px] sm:!min-h-[44px] !px-6 sm:!px-7 !text-[10px] sm:!text-[11px]"
                >
                  Talk to Concierge
                </a>
              </div>

              {/* Stats card */}
              <div className="mt-12 lg:mt-20 grid grid-cols-3 divide-x divide-white/50 rounded-[1.25rem] border border-white/60 bg-white/90 px-2 py-6 shadow-[0_20px_40px_-15px_rgba(74,16,32,0.12)] backdrop-blur-xl sm:max-w-[28rem] sm:px-4">
                {HERO_STATS.map(({ Icon, value, label }) => (
                  <div key={label} className="group flex flex-col items-center gap-2.5 px-2 text-center transition-transform duration-300 hover:-translate-y-1">
                    <span className="flex h-[42px] w-[42px] items-center justify-center rounded-[0.85rem] bg-gradient-to-br from-[#F2E6D0] to-[#E8CF9A] text-[#4A1020] shadow-sm">
                      <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                    </span>
                    <div className="flex flex-col gap-1">
                      <p className="font-serif text-[18px] font-bold leading-none text-[#1A1010] sm:text-[22px]">
                        {value}
                      </p>
                      <p className="font-sans text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#9D7D47] sm:text-[10px]">
                        {label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust strip */}
              <div className="mt-4 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 rounded-2xl border border-[#5C1629] bg-[#4A1020] px-5 py-4 shadow-xl sm:max-w-[28rem] sm:px-6">
                {HERO_TRUST.map(({ Icon, label, sub }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#6B1E30] text-[#E8CF9A] shadow-inner">
                      <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
                    </span>
                    <p className="font-sans text-[9.5px] font-bold uppercase leading-[1.35] tracking-[0.14em] text-[#FBF5EE] sm:text-[10px]">
                      {label}
                      <span className="block text-[#E8CF9A]/85">{sub}</span>
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
