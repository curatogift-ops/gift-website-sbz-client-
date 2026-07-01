import { useRef } from 'react';
import { Link } from 'react-router-dom';
import AppImage from '@/components/ui/AppImage';
import { ArrowRight, ChevronLeft, ChevronRight, Leaf, Recycle } from 'lucide-react';
import {
  ECO_FRIENDLY_CATEGORY_SLUG,
  formatCorporatePrice,
  getEcoFriendlyFeaturedProducts,
  type CorporateProduct,
} from '@/config/corporateGiftingData';
import { cn } from '@/utils/cn';

function EcoIntroCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'custom-collection-intro relative flex w-full min-h-[280px] flex-col justify-between overflow-hidden rounded-[1.5rem] p-8 shadow-[0_16px_44px_-12px_rgba(45,90,61,0.35)] sm:p-10 lg:h-[460px] lg:min-h-0 lg:w-[320px] xl:w-[340px]',
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#2D5A3D] via-[#3D7A52] to-[#6B1E30]"
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
          <Leaf className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </div>
        <h2
          id="wooden-gifting-heading"
          className="font-serif text-[clamp(1.5rem,3.8vw,1.95rem)] font-medium leading-[1.2] text-white"
        >
          Eco-Friendly
          <span className="block text-[#D4E8D4]">Corporate Gifting</span>
        </h2>
      </div>

      <div className="relative mt-6">
        <p className="font-sans text-[13px] leading-relaxed text-white/90 sm:text-[14px]">
          Sustainable gifts with premium finish — cork, bamboo, and recycled materials for conscious
          corporate programs.
        </p>
        <Link
          to={`/corporate/category/${ECO_FRIENDLY_CATEGORY_SLUG}`}
          className="group mt-6 inline-flex min-h-[44px] w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[#2D5A3D] shadow-md transition-all hover:bg-[#E8F5E9]"
        >
          View more
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} aria-hidden />
        </Link>
      </div>
    </div>
  );
}

function EcoProductCard({ product, index }: { product: CorporateProduct; index: number }) {
  return (
    <Link
      to={`/corporate/product/${product.slug}`}
      className="custom-snap-card group relative flex w-[min(88vw,360px)] shrink-0 snap-start flex-col sm:w-[300px] lg:w-[320px]"
    >
      <div className="relative overflow-hidden rounded-[1.25rem] bg-white shadow-[0_10px_32px_-10px_rgba(0,0,0,0.12)] ring-1 ring-[#EBEBEB] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_20px_48px_-14px_rgba(45,90,61,0.18)] group-hover:ring-[#3D7A52]/35 sm:rounded-[1.35rem]">
        <div className="relative h-[min(52vw,260px)] min-h-[220px] overflow-hidden sm:h-[255px]">
          <AppImage
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="310px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1010]/55 via-transparent to-transparent" />

          <span className="absolute left-3 top-3 rounded-full bg-white/92 px-2.5 py-1 font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-[#2D5A3D] shadow-sm backdrop-blur-sm">
            {String(index + 1).padStart(2, '0')}
          </span>

          <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#2D5A3D] text-[#C9A96E] shadow-lg transition-transform duration-300 group-hover:scale-110">
            <Leaf className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          </div>

          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full border border-white/25 bg-white/15 px-2.5 py-1 font-sans text-[9px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md">
            <Recycle className="h-3 w-3 text-[#C9A96E]" strokeWidth={2} aria-hidden />
            Sustainable
          </span>
        </div>

        <div className="border-t border-[#F0F0F0] bg-white px-5 py-5">
          <h3 className="font-serif text-[16px] font-semibold leading-snug text-[#1A1010] sm:text-[17px]">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-[12px] leading-relaxed text-[#6b6560] sm:text-[13px]">
            {product.description}
          </p>

          <div className="mt-4 flex items-end justify-between gap-3 border-t border-dashed border-[#E8E8E8] pt-4">
            <div>
              <p className="font-sans text-[20px] font-bold tabular-nums leading-none text-[#2D5A3D] sm:text-[22px]">
                {formatCorporatePrice(product.price)}
              </p>
              <p className="mt-1 font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-[#9D7D47]">
                Unit price
              </p>
            </div>
            <div className="text-right">
              <p className="font-sans text-[13px] font-bold leading-tight text-[#1A1010] sm:text-[14px]">
                {product.bulkPrice.replace('From ', '')}
              </p>
              <p className="mt-1 font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-[#9D7D47]">
                Bulk pricing
              </p>
            </div>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#EBEBEB] bg-[#FAFAFA] text-[#2D5A3D] transition-all group-hover:border-[#2D5A3D] group-hover:bg-[#2D5A3D] group-hover:text-white">
              <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function WoodenGiftingSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const products = getEcoFriendlyFeaturedProducts();

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
      id="eco-friendly-gifting"
      className="custom-collection-section section-pad relative scroll-mt-28 overflow-hidden bg-[var(--cream)]"
      aria-labelledby="wooden-gifting-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3D7A52]/25 to-transparent"
        aria-hidden
      />

      <div className="section-container relative">
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="hidden font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[#3D7A52] lg:block">
            Sustainable corporate gifts
          </p>
          <div className="ml-auto hidden items-center gap-2 lg:flex">
            <button
              type="button"
              onClick={() => scrollBy('left')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EBEBEB] bg-white text-[#2D5A3D] shadow-sm transition hover:border-[#3D7A52]/40 hover:shadow-md"
              aria-label="Scroll eco-friendly gifts left"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollBy('right')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EBEBEB] bg-white text-[#2D5A3D] shadow-sm transition hover:border-[#3D7A52]/40 hover:shadow-md"
              aria-label="Scroll eco-friendly gifts right"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2} aria-hidden />
            </button>
          </div>
        </div>

        <div className="celebrations-carousel-shell flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-stretch lg:gap-6">
          <div className="custom-intro-sticky z-20 w-full shrink-0 lg:w-auto">
            <EcoIntroCard />
          </div>

          <div className="relative min-w-0 flex-1">
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[var(--cream)] to-transparent"
              aria-hidden
            />

            <div
              ref={scrollRef}
              className="custom-scroll-track celebrations-scroll-track no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-4 pb-2 sm:-mx-8 sm:gap-6 sm:px-8 lg:mx-0 lg:px-0"
            >
              {products.map((product, index) => (
                <EcoProductCard key={product.slug} product={product} index={index} />
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
