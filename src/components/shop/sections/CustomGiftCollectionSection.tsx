import { useRef } from 'react';
import { Link } from 'react-router-dom';
import AppImage from '@/components/ui/AppImage';
import { ArrowRight, ChevronLeft, ChevronRight, PenLine, Sparkles } from 'lucide-react';
import type { GiftCategoryItem } from '@/components/shop/GiftCategoryCard';
import { CUSTOM_GIFT_COLLECTION } from '@/config/personalizedSections';
import { cn } from '@/utils/cn';

const CUSTOM_STATS: Record<string, { options: number; from: string }> = {
  photo: { options: 32, from: '₹499' },
  name: { options: 28, from: '₹399' },
  mugs: { options: 45, from: '₹349' },
  frames: { options: 24, from: '₹599' },
  bottles: { options: 18, from: '₹449' },
  accessories: { options: 36, from: '₹299' },
  boxes: { options: 22, from: '₹799' },
};

const CUSTOM_BLURBS: Record<string, string> = {
  photo: 'Print memories on premium keepsakes',
  name: 'Engraved with a name that matters',
  mugs: 'Sip in style — your design, your mug',
  frames: 'Frame moments that last forever',
  bottles: 'Hydration with a personal touch',
  accessories: 'Everyday items, uniquely yours',
  boxes: 'Curate the perfect unboxing experience',
};

function CustomIntroCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'custom-collection-intro relative flex w-full flex-col justify-between overflow-hidden rounded-[1.5rem] p-8 shadow-[0_16px_44px_-12px_rgba(157,125,71,0.35)] sm:p-10 min-h-[280px] lg:min-h-0 lg:h-[460px] lg:w-[320px] xl:w-[340px]',
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#9D7D47] via-[#B8924F] to-[#6B1E30]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-[#4A1020]/20 blur-2xl"
        aria-hidden
      />

      <div className="relative">
        <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/30 bg-white/15 text-white backdrop-blur-sm">
          <PenLine className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </div>
        <h2
          id="custom-gift-heading"
          className="font-serif text-[clamp(1.5rem,3.8vw,1.95rem)] font-medium leading-[1.2] text-white"
        >
          Custom Gift
          <span className="block text-[#F2E6D0]">Collection</span>
        </h2>
      </div>

      <div className="relative mt-6">
        <p className="font-sans text-[13px] leading-relaxed text-white/90 sm:text-[14px]">
          Make it truly yours — personalized photo gifts, engraved keepsakes, and bespoke creations.
        </p>
        <Link
          to="/shop/browse?type=custom"
          className="group mt-6 inline-flex min-h-[44px] w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[#4A1020] shadow-md transition-all hover:bg-[#F2E6D0]"
        >
          Explore all
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} aria-hidden />
        </Link>
      </div>
    </div>
  );
}

function CustomScrollCard({ item, index }: { item: GiftCategoryItem; index: number }) {
  const Icon = item.Icon;
  const stats = CUSTOM_STATS[item.id] ?? { options: 30, from: '₹399' };
  const blurb = CUSTOM_BLURBS[item.id] ?? 'Personalize & order';

  return (
    <Link
      to={item.href}
      className="custom-snap-card group relative flex w-[min(88vw,360px)] shrink-0 snap-start flex-col sm:w-[300px] lg:w-[320px]"
    >
      <div className="relative overflow-hidden rounded-[1.25rem] bg-white shadow-[0_10px_32px_-10px_rgba(0,0,0,0.12)] ring-1 ring-[#EBEBEB] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_20px_48px_-14px_rgba(74,16,32,0.15)] group-hover:ring-[#C9A96E]/30 sm:rounded-[1.35rem]">
        <div className="relative h-[min(52vw,260px)] min-h-[220px] overflow-hidden sm:h-[255px]">
          <AppImage
            src={item.image}
            alt={item.imageAlt}
            fill
            sizes="310px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1010]/55 via-transparent to-transparent" />

          <span className="absolute left-3 top-3 rounded-full bg-white/92 px-2.5 py-1 font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-[#6B1E30] shadow-sm backdrop-blur-sm">
            {String(index + 1).padStart(2, '0')}
          </span>

          <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#6B1E30] text-[#C9A96E] shadow-lg transition-transform duration-300 group-hover:scale-110">
            <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          </div>

          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full border border-white/25 bg-white/15 px-2.5 py-1 font-sans text-[9px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md">
            <Sparkles className="h-3 w-3 text-[#C9A96E]" strokeWidth={2} aria-hidden />
            Personalize
          </span>
        </div>

        {/* Floating light panel — distinct from Celebrations dark footer */}
        <div className="border-t border-[#F0F0F0] bg-white px-5 py-5">
          <h3 className="font-serif text-[16px] font-semibold leading-snug text-[#1A1010] sm:text-[17px]">
            {item.label}
          </h3>
          <p className="mt-1 line-clamp-2 text-[12px] leading-relaxed text-[#6b6560] sm:text-[13px]">
            {blurb}
          </p>

          <div className="mt-4 flex items-end justify-between gap-3 border-t border-dashed border-[#E8E8E8] pt-4">
            <div>
              <p className="font-sans text-[20px] font-bold tabular-nums leading-none text-[#6B1E30] sm:text-[22px]">
                {stats.options}
              </p>
              <p className="mt-1 font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-[#9D7D47]">
                Options
              </p>
            </div>
            <div className="text-right">
              <p className="font-sans text-[20px] font-bold tabular-nums leading-none text-[#1A1010] sm:text-[22px]">
                {stats.from}
              </p>
              <p className="mt-1 font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-[#9D7D47]">
                Starting
              </p>
            </div>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#EBEBEB] bg-[#FAFAFA] text-[#6B1E30] transition-all group-hover:border-[#6B1E30] group-hover:bg-[#6B1E30] group-hover:text-white">
              <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function CustomGiftCollectionSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.custom-snap-card');
    const gap = 16;
    const amount = card ? card.offsetWidth + gap : 320;
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section
      id="custom-gift-collection"
      className="custom-collection-section section-pad relative scroll-mt-28 overflow-hidden bg-white"
      aria-labelledby="custom-gift-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/25 to-transparent"
        aria-hidden
      />

      <div className="section-container relative">
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="hidden font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[#9D7D47] lg:block">
            Bespoke &amp; personalized
          </p>
          <div className="ml-auto hidden items-center gap-2 lg:flex">
            <button
              type="button"
              onClick={() => scrollBy('left')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EBEBEB] bg-white text-[#4A1020] shadow-sm transition hover:border-[#C9A96E]/40 hover:shadow-md"
              aria-label="Scroll custom gifts left"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollBy('right')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EBEBEB] bg-white text-[#4A1020] shadow-sm transition hover:border-[#C9A96E]/40 hover:shadow-md"
              aria-label="Scroll custom gifts right"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2} aria-hidden />
            </button>
          </div>
        </div>

        <div className="celebrations-carousel-shell flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-stretch lg:gap-6">
          <div className="custom-intro-sticky z-20 w-full shrink-0 lg:w-auto">
            <CustomIntroCard />
          </div>

          <div className="relative min-w-0 flex-1">
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent"
              aria-hidden
            />

            <div
              ref={scrollRef}
              className="custom-scroll-track celebrations-scroll-track no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-4 pb-2 sm:-mx-8 sm:gap-6 sm:px-8 lg:mx-0 lg:px-0"
            >
              {CUSTOM_GIFT_COLLECTION.map((item, i) => (
                <CustomScrollCard key={item.id} item={item} index={i} />
              ))}
            </div>

            <p className="mt-3 font-sans text-[11px] font-medium tracking-wide text-[#8C847C] lg:hidden">
              Swipe cards to explore →
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
