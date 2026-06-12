import { useRef } from 'react';
import { Link } from 'react-router-dom';
import AppImage from '@/components/ui/AppImage';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GiftCategoryItem } from '@/components/shop/GiftCategoryCard';
import { MOST_LOVED_HAMPERS } from '@/config/personalizedSections';
import { cn } from '@/utils/cn';

function occasionName(label: string): string {
  return label
    .replace(/\s+Gifts$/, '')
    .replace(/\s+Celebrations$/, '')
    .replace(/\s+Events$/, '');
}

function IntroCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'celebrations-intro-card flex w-full flex-col justify-center rounded-[1.5rem] bg-[#6B1E30] p-8 shadow-[0_16px_40px_-12px_rgba(74,16,32,0.45)] sm:p-10 min-h-[280px] lg:min-h-0 lg:h-[460px] lg:w-[320px] xl:w-[340px]',
        className
      )}
    >
      <h2
        id="most-loved-heading"
        className="text-[clamp(1.75rem,4.2vw,2.125rem)] leading-[1.32] text-white"
      >
        Discover celebration hampers for every special moment.
      </h2>
      <Link
        to="/shop/browse?cat=hampers"
        className="celebrations-view-all-btn group mt-9 inline-flex min-h-[48px] w-fit items-center gap-2.5 rounded-full px-7 py-3"
      >
        View All
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} aria-hidden />
      </Link>
    </div>
  );
}

function CelebrationScrollCard({ item }: { item: GiftCategoryItem }) {
  const Icon = item.Icon;
  const displayName = occasionName(item.label);

  return (
    <Link
      to={item.href}
      className="celebrations-snap-card group flex h-[clamp(420px,120vw,480px)] w-[min(88vw,360px)] shrink-0 snap-start flex-col overflow-hidden rounded-[1.5rem] bg-[#1A1010] shadow-[0_12px_36px_-10px_rgba(0,0,0,0.18)] transition-all duration-300 active:scale-[0.99] sm:h-[460px] sm:w-[300px] lg:h-[460px] lg:w-[300px]"
    >
      <div className="relative h-[85%] min-h-0 overflow-hidden bg-[#2A2424]">
        <AppImage
          src={item.image}
          alt=""
          fill
          sizes="(max-width: 640px) 88vw, 300px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/95 shadow-sm">
          <Icon className="h-[18px] w-[18px] text-[#6B1E30]" strokeWidth={1.75} aria-hidden />
        </div>
      </div>

      <div className="flex h-[15%] shrink-0 items-center bg-[#1A1010] px-5 sm:px-6">
        <h3 className="celebrations-card-title text-[clamp(1rem,3vw,1.25rem)] text-white">
          {displayName}
        </h3>
      </div>
    </Link>
  );
}

export default function MostLovedHampersSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.celebrations-snap-card');
    const gap = 20;
    const amount = card ? card.offsetWidth + gap : 300;
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section
      id="celebrations"
      className="celebrations-carousel-section section-pad relative scroll-mt-28 overflow-hidden bg-[#F7F4F0]"
      aria-labelledby="most-loved-heading"
    >
      <div className="section-container relative">
        <div className="mb-6 hidden items-center justify-end gap-2 lg:flex">
          <button
            type="button"
            onClick={() => scrollBy('left')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EBEBEB] bg-white text-[#4A1020] shadow-sm transition hover:border-[#C9A96E]/40"
            aria-label="Scroll celebrations left"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => scrollBy('right')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EBEBEB] bg-white text-[#4A1020] shadow-sm transition hover:border-[#C9A96E]/40"
            aria-label="Scroll celebrations right"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2} aria-hidden />
          </button>
        </div>

        <div className="celebrations-carousel-shell flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-stretch lg:gap-6">
          <div className="celebrations-intro-sticky z-20 w-full shrink-0 lg:w-auto">
            <IntroCard />
          </div>

          <div className="relative min-w-0 flex-1">
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#F7F4F0] to-transparent"
              aria-hidden
            />

            <div
              ref={scrollRef}
              className="celebrations-scroll-track no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-4 pb-2 sm:-mx-8 sm:gap-6 sm:px-8 lg:mx-0 lg:px-0"
            >
              {MOST_LOVED_HAMPERS.map((item) => (
                <CelebrationScrollCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
