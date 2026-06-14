import { Link } from 'react-router-dom';
import AppImage from '@/components/ui/AppImage';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/utils/cn';

type EventCategory = {
  id: string;
  label: string;
  href: string;
  image: string;
  imageAlt: string;
  productLabel: string;
  ctaLabel: string;
};

const EVENT_CATEGORIES: EventCategory[] = [
  {
    id: 'delegate-kits',
    label: 'Delegate Kits',
    href: '/shop/browse?cat=delegate-kits',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Premium corporate delegate welcome kits with branded backpack',
    productLabel: '85+ Products',
    ctaLabel: 'View Collection',
  },
  {
    id: 'conference-giveaways',
    label: 'Conference Giveaways',
    href: '/shop/browse?cat=conference-giveaways',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Luxury corporate conference giveaway gift boxes',
    productLabel: '120+ Products',
    ctaLabel: 'View Collection',
  },
  {
    id: 'speaker-vip',
    label: 'Speaker & VIP Gifts',
    href: '/shop/browse?cat=speaker-vip-gifts',
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Luxury executive gift hamper for speakers and VIP guests',
    productLabel: '64+ Products',
    ctaLabel: 'View Collection',
  },
  {
    id: 'recognition-trophies',
    label: 'Recognition Awards',
    href: '/shop/browse?cat=award-recognition-trophies',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38f7968?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Luxury recognition awards and premium gift packaging',
    productLabel: '48+ Products',
    ctaLabel: 'View Collection',
  },
];

const IMAGE_GRADE = 'brightness-[1.12] contrast-[1.03] saturate-[1.08] transition-transform duration-700 group-hover:scale-[1.04]';

function PremiumEventCard({ item, isHero = false }: { item: EventCategory; isHero?: boolean }) {
  return (
    <Link
      to={item.href}
      className={cn(
        "group relative flex w-full overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem] lg:rounded-[1.75rem] border border-[#C9A96E]/20 shadow-[0_24px_48px_-12px_rgba(26,16,16,0.15)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_32px_64px_-16px_rgba(26,16,16,0.25)] bg-[#1A1010]",
        isHero ? "min-h-[22rem] sm:min-h-[28rem] md:min-h-full" : "min-h-[16rem] sm:min-h-[18rem] md:min-h-full"
      )}
    >
      <AppImage
        src={item.image}
        alt={item.imageAlt}
        fill
        sizes={isHero ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 25vw"}
        className={cn('object-cover', IMAGE_GRADE)}
      />
      
      {/* Dark gradient overlay for text readability, with warm luxury tint */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1010]/95 via-[#1A1010]/30 to-transparent mix-blend-multiply" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(201,169,110,0.15)_0%,transparent_50%)] pointer-events-none" aria-hidden />

      <div className={cn(
        "absolute inset-x-0 bottom-0 flex flex-col justify-end",
        isHero ? "p-6 sm:p-8 lg:p-10" : "p-5 sm:p-6 lg:p-8"
      )}>
        <h3 className={cn(
          "font-serif font-semibold text-white tracking-tight leading-[1.05]",
          isHero ? "text-[2.25rem] sm:text-[2.75rem] lg:text-[3rem]" : "text-[1.5rem] sm:text-[1.75rem] lg:text-[2rem]"
        )}>
          {item.label}
        </h3>
        
        <div className={cn(
          "flex flex-wrap items-center justify-between gap-3",
          isHero ? "mt-4 sm:mt-6" : "mt-3 sm:mt-4"
        )}>
          <span className={cn(
            "font-sans font-medium text-[#F5DFA9] tracking-wide",
            isHero ? "text-[12px] sm:text-[14px]" : "text-[11px] sm:text-[12px]"
          )}>
            {item.productLabel}
          </span>
          
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-sans text-[11px] font-semibold tracking-wider uppercase text-white backdrop-blur-md transition-all duration-300 group-hover:border-[#C9A96E]/50 group-hover:bg-[#1A1010]/40 sm:text-[12px]">
            {item.ctaLabel}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function EventConferenceGiftingSection() {
  const [heroItem, sec1, sec2, sec3] = EVENT_CATEGORIES;

  return (
    <section
      id="event-conference-gifting"
      className="relative scroll-mt-28 overflow-hidden bg-[#FAF7F4] py-12 sm:py-16 lg:py-24"
      aria-labelledby="event-conference-gifting-heading"
    >
      {/* Subtle luxury background elements */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(201,169,110,0.15) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden
      />

      <div className="section-container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Minimal Header */}
        <div className="mb-8 flex flex-col gap-3 sm:mb-10 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2
              id="event-conference-gifting-heading"
              className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight text-[#1A1010]"
            >
              Events & Conferences
            </h2>
          </div>
          <Link
            to="/shop/browse?type=event"
            className="group hidden items-center gap-2 font-sans text-[13px] font-semibold tracking-wider text-[#9D7D47] uppercase transition-colors hover:text-[#C9A96E] lg:flex mb-2"
          >
            Explore all collections
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} aria-hidden />
          </Link>
        </div>

        {/* Editorial Bento Grid */}
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-4 md:grid-rows-[minmax(0,1fr)_minmax(0,1fr)] md:h-[32rem] lg:gap-6 lg:h-[36rem]">
          {/* Hero Card - Spans 2 columns, 2 rows */}
          <div className="md:col-span-2 md:row-span-2 flex h-full">
            <PremiumEventCard item={heroItem} isHero={true} />
          </div>
          
          {/* Secondary Card 1 - Spans 2 columns, 1 row */}
          <div className="md:col-span-2 md:row-span-1 flex h-full">
            <PremiumEventCard item={sec1} />
          </div>
          
          {/* Secondary Card 2 & 3 - Span 1 column, 1 row each */}
          <div className="md:col-span-1 md:row-span-1 flex h-full">
            <PremiumEventCard item={sec2} />
          </div>
          <div className="md:col-span-1 md:row-span-1 flex h-full">
            <PremiumEventCard item={sec3} />
          </div>
        </div>

        <Link
          to="/shop/browse?type=event"
          className="group mt-8 inline-flex items-center gap-2 font-sans text-[12px] font-semibold tracking-wider text-[#9D7D47] uppercase transition-colors hover:text-[#C9A96E] lg:hidden"
        >
          Explore all collections
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} aria-hidden />
        </Link>
      </div>
    </section>
  );
}
