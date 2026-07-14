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
    id: 'conference-giveaways',
    label: 'Conference Giveaways',
    href: '/corporate/product/exhibition-goodie-bag',
    image: '/images/corporate/events-conferences/conference-giveaways.jpeg',
    imageAlt: 'Premium corporate conference giveaway gift boxes with gold ribbon',
    productLabel: '120+ Products',
    ctaLabel: 'View Collection',
  },
  {
    id: 'speaker-vip',
    label: 'Speaker & VIP Gifts',
    href: '/corporate/product/vip-lounge-gift',
    image: '/images/corporate/events-conferences/speaker-vip-gifts.jpeg',
    imageAlt: 'Luxury speaker and moderator gift collection with premium packaging',
    productLabel: '64+ Products',
    ctaLabel: 'View Collection',
  },
];

const IMAGE_GRADE =
  'brightness-[1.12] contrast-[1.03] saturate-[1.08] transition-transform duration-700 group-hover:scale-[1.04]';

function PremiumEventCard({ item }: { item: EventCategory }) {
  return (
    <Link
      to={item.href}
      className="group relative flex min-h-[18rem] w-full overflow-hidden rounded-[1.25rem] border border-[#C9A96E]/20 bg-[#1A1010] shadow-[0_24px_48px_-12px_rgba(26,16,16,0.15)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_32px_64px_-16px_rgba(26,16,16,0.25)] sm:min-h-[22rem] sm:rounded-[1.5rem] lg:min-h-[26rem] lg:rounded-[1.75rem]"
    >
      <AppImage
        src={item.image}
        alt={item.imageAlt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className={cn('object-cover', IMAGE_GRADE)}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1010]/95 via-[#1A1010]/30 to-transparent mix-blend-multiply" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(201,169,110,0.15)_0%,transparent_50%)]"
        aria-hidden
      />

      <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-6 sm:p-8 lg:p-10">
        <h3 className="font-serif text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tight text-white">
          {item.label}
        </h3>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 sm:mt-6">
          <span className="font-sans text-[12px] font-medium tracking-wide text-[#F5DFA9] sm:text-[14px]">
            {item.productLabel}
          </span>

          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-md transition-all duration-300 group-hover:border-[#C9A96E]/50 group-hover:bg-[#1A1010]/40 sm:text-[12px]">
            {item.ctaLabel}
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              strokeWidth={2.25}
              aria-hidden
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function EventConferenceGiftingSection() {
  return (
    <section
      id="event-conference-gifting"
      className="relative scroll-mt-28 overflow-hidden bg-[#FAF7F4] py-12 sm:py-16 lg:py-24"
      aria-labelledby="event-conference-gifting-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(201,169,110,0.15) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden
      />

      <div className="section-container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:mb-10 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2
              id="event-conference-gifting-heading"
              className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight text-[#1A1010]"
            >
              Event & Conference Gifting
            </h2>
          </div>
          <Link
            to="/corporate/category/event-conference-gifting"
            className="group mb-2 hidden items-center gap-2 font-sans text-[13px] font-semibold uppercase tracking-wider text-[#9D7D47] transition-colors hover:text-[#C9A96E] lg:flex"
          >
            Explore all collections
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              strokeWidth={2}
              aria-hidden
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:gap-6">
          {EVENT_CATEGORIES.map((item) => (
            <PremiumEventCard key={item.id} item={item} />
          ))}
        </div>

        <Link
          to="/corporate/category/event-conference-gifting"
          className="group mt-8 inline-flex items-center gap-2 font-sans text-[12px] font-semibold uppercase tracking-wider text-[#9D7D47] transition-colors hover:text-[#C9A96E] lg:hidden"
        >
          Explore all collections
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            strokeWidth={2}
            aria-hidden
          />
        </Link>
      </div>
    </section>
  );
}
