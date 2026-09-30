import { Link } from 'react-router-dom';
import AppImage from '@/components/ui/AppImage';
import { ArrowRight, Medal } from 'lucide-react';

const VOUCHERS = {
  title: 'Vouchers',
  href: '/vouchers-brands',
  image: '/images/corporate/awards-vouchers.jpeg',
  imageAlt: 'Premium gift vouchers from leading brands for corporate rewards',
};

export default function AwardsTrophiesSection() {
  return (
    <section
      id="awards-trophies"
      className="scroll-mt-28 overflow-hidden bg-[var(--cream)] py-12 sm:py-14 lg:py-16"
      aria-labelledby="awards-trophies-heading"
    >
      <div className="section-container">
        <div className="mb-8 max-w-2xl lg:mb-10">
          <p className="eyebrow">Recognition</p>
          <h2 id="awards-trophies-heading" className="section-heading-corporate mt-3">
            Vouchers
          </h2>
        </div>

        <Link
          to={VOUCHERS.href}
          className="group grid overflow-hidden rounded-2xl border border-primary/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A96E]/40 hover:shadow-[0_12px_28px_-16px_rgba(26,16,16,0.15)] sm:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
        >
          <div className="relative min-h-[16rem] overflow-hidden bg-primary sm:min-h-[22rem]">
            <AppImage
              src={VOUCHERS.image}
              alt={VOUCHERS.imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, 55vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1010]/70 via-transparent to-transparent sm:bg-gradient-to-r" />
          </div>
          <div className="flex flex-col justify-between gap-6 p-6 sm:p-8 lg:p-10">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#C9A96E]/30 bg-[#4A1020] text-[#C9A96E]">
              <Medal className="h-5 w-5" strokeWidth={1.65} aria-hidden />
            </span>
            <div>
              <h3 className="font-serif text-[36px] font-semibold leading-tight text-primary sm:text-[48px]">
                {VOUCHERS.title}
              </h3>
              <p className="mt-3 max-w-md text-[14px] leading-relaxed text-muted-foreground sm:text-[15px]">
                Premium gift vouchers from leading brands for corporate rewards.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#C9A96E]">
                Explore
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.25} aria-hidden />
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
