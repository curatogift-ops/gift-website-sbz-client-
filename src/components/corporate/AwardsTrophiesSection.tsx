import { Link } from 'react-router-dom';
import AppImage from '@/components/ui/AppImage';
import { ArrowRight, Medal, Sparkles, Trophy } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type AwardType = {
  title: string;
  href: string;
  image: string;
  imageAlt: string;
  Icon: LucideIcon;
};

const AWARD_TYPES: AwardType[] = [
  {
    title: 'Crystal Awards',
    href: '/corporate/product/crystal-achievement-award',
    image: '/images/corporate-hero-banner-mobile-custom.png',
    imageAlt: 'Premium branded corporate gift presentation for a recognition moment',
    Icon: Trophy,
  },
  {
    title: 'Vouchers',
    href: '/corporate/product/branded-gift-voucher',
    image: '/images/corporate-hero.png',
    imageAlt: 'Branded desk gift set with a premium wooden finish',
    Icon: Medal,
  },
  {
    title: 'Trophies',
    href: '/corporate/product/employee-of-month-award',
    image: '/images/corporate-hero-slide-2.png',
    imageAlt: 'Gold accented corporate gifting collection for award ceremonies',
    Icon: Sparkles,
  },
];

export default function AwardsTrophiesSection() {
  const [featuredAward, ...supportAwards] = AWARD_TYPES;

  return (
    <section
      id="awards-trophies"
      className="scroll-mt-28 overflow-hidden bg-[var(--cream)] py-12 sm:py-14 lg:py-16"
      aria-labelledby="awards-trophies-heading"
    >
      <div className="section-container">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between lg:mb-10">
          <div className="max-w-2xl">
            <p className="eyebrow">Recognition</p>
            <h2 id="awards-trophies-heading" className="section-heading-corporate mt-3">
              Trophies & vouchers
            </h2>
          </div>

          <Link
            to="/corporate/category/trophies-vouchers"
            className="inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-primary-foreground transition hover:bg-[#4A1020]"
          >
            Explore awards
            <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.12fr_0.88fr]">
          <Link
            to={featuredAward.href}
            className="group relative min-h-[20rem] overflow-hidden rounded-2xl border border-primary/10 bg-primary sm:min-h-[30rem] lg:min-h-[34rem]"
          >
            <AppImage
              src={featuredAward.image}
              alt={featuredAward.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1010]/88 via-primary/25 to-transparent" />
            <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-[#C9A96E]/30 bg-[#1A1010]/80 px-3 py-2 text-[#C9A96E] shadow-sm backdrop-blur-md sm:left-6 sm:top-6">
              <featuredAward.Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden />
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.14em]">
                Featured
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:p-8">
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#C9A96E]">
                Premium recognition
              </p>
              <h3 className="mt-3 max-w-lg font-serif text-[40px] font-semibold leading-[0.98] text-primary-foreground sm:text-[54px] lg:text-[64px]">
                {featuredAward.title}
              </h3>
              <span className="mt-6 inline-flex items-center gap-2 rounded-md bg-white px-4 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-primary transition group-hover:bg-[var(--cream)]">
                View collection
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} aria-hidden />
              </span>
            </div>
          </Link>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {supportAwards.map((item) => {
              const Icon = item.Icon;

              return (
                <Link
                  key={item.title}
                  to={item.href}
                  className="group grid min-h-[9.5rem] grid-cols-[8.5rem_1fr] overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A96E]/40 hover:shadow-[0_12px_28px_-16px_rgba(26,16,16,0.15)] sm:min-h-[20rem] sm:grid-cols-1 lg:min-h-0 lg:grid-cols-[12rem_1fr]"
                >
                  <div className="relative min-h-0 overflow-hidden bg-muted sm:min-h-[11rem] lg:min-h-0">
                    <AppImage
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 640px) 136px, (max-width: 1024px) 50vw, 240px"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1010]/50 via-transparent to-transparent lg:bg-gradient-to-r" />
                  </div>

                  <div className="flex min-w-0 flex-col justify-between p-4 sm:p-5 lg:p-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#C9A96E]/30 bg-[#4A1020] text-[#C9A96E] transition duration-300 group-hover:bg-primary sm:h-12 sm:w-12">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.65} aria-hidden />
                    </span>
                    <div>
                      <h3 className="mt-4 font-serif text-[24px] font-semibold leading-tight text-primary transition-colors group-hover:text-[#4A1020] sm:mt-6 sm:text-[28px] lg:text-[26px]">
                        {item.title}
                      </h3>
                      <span className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#C9A96E] sm:mt-5 sm:text-[11px]">
                        Explore
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.25} aria-hidden />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}

            <div className="flex min-h-[9.5rem] flex-col justify-between rounded-2xl border border-[#C9A96E]/30 bg-primary p-4 text-primary-foreground sm:min-h-[20rem] sm:p-5 lg:min-h-0 lg:p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#C9A96E]/35 bg-primary-foreground/10 text-[#C9A96E] sm:h-12 sm:w-12">
                <Trophy className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.65} aria-hidden />
              </div>
              <div className="mt-6 flex-1">
                <p className="font-serif text-[24px] font-semibold leading-tight sm:text-[28px] lg:text-[30px]">
                  Award-ready branding.
                </p>
                <ul className="mt-4 flex flex-col gap-2.5 font-sans text-[12px] sm:text-[13px] text-primary-foreground/85">
                  <li className="flex items-center gap-2.5">
                    <Sparkles className="h-3.5 w-3.5 text-[#C9A96E] shrink-0" strokeWidth={2} aria-hidden />
                    Custom Engraving
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Sparkles className="h-3.5 w-3.5 text-[#C9A96E] shrink-0" strokeWidth={2} aria-hidden />
                    Premium Presentation Boxes
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Sparkles className="h-3.5 w-3.5 text-[#C9A96E] shrink-0" strokeWidth={2} aria-hidden />
                    Pan-India Delivery
                  </li>
                </ul>
              </div>
              <Link
                to="/corporate#bulk-order-enquiry"
                className="group mt-6 inline-flex w-fit items-center justify-center gap-2 rounded-md bg-[#4A1020] px-4 py-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-all hover:bg-[#5C1529]"
              >
                Start enquiry
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.25} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
