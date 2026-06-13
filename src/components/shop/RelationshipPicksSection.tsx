import { useRef } from 'react';
import { Link } from 'react-router-dom';
import AppImage from '@/components/ui/AppImage';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';

const RELATIONSHIP_PICKS = [
  {
    id: 'for-her',
    label: 'For Her',
    note: 'Elegant keepsakes',
    href: '/shop/browse?recipient=for-her',
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=600',
    imageAlt: 'Elegant gift box curated for her',
  },
  {
    id: 'for-him',
    label: 'For Him',
    note: 'Refined classics',
    href: '/shop/browse?recipient=for-him',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=600',
    imageAlt: 'Premium gift hamper for him',
  },
  {
    id: 'for-couple',
    label: 'For Couple',
    note: 'Moments together',
    href: '/shop/browse?recipient=for-couples',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=600',
    imageAlt: 'Romantic gift for couples',
  },
  {
    id: 'for-parents',
    label: 'For Parents',
    note: 'Heartfelt gratitude',
    href: '/shop/browse?recipient=for-parents',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600',
    imageAlt: 'Thoughtful gift box for parents',
  },
  {
    id: 'for-kids',
    label: 'For Kids',
    note: 'Playful surprises',
    href: '/shop/browse?recipient=for-kids',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=600',
    imageAlt: 'Creative gift hamper for kids',
  },
] as const;

/* Each tag hangs with its own tilt and string length, like tags tied to a ribbon */
const TAG_TILTS = ['-rotate-[5deg]', 'rotate-[3deg]', '-rotate-[2deg]', 'rotate-[4deg]', '-rotate-[3deg]'];
const TAG_DROPS = ['lg:mt-3', 'lg:mt-9', 'lg:mt-0', 'lg:mt-7', 'lg:mt-4'];

function GiftTagCard({
  item,
  index,
}: {
  item: (typeof RELATIONSHIP_PICKS)[number];
  index: number;
}) {
  return (
    <Link
      to={item.href}
      className={cn(
        'group relative block w-[168px] shrink-0 snap-center transition-transform duration-300 ease-out hover:-translate-y-2 hover:rotate-0 sm:w-[184px] lg:w-[200px]',
        TAG_TILTS[index % TAG_TILTS.length],
        TAG_DROPS[index % TAG_DROPS.length]
      )}
    >
      {/* String tying the tag to the ribbon */}
      <span
        className="pointer-events-none absolute -top-14 left-1/2 h-14 w-px bg-gradient-to-b from-transparent via-[#C9A96E]/60 to-[#C9A96E]"
        aria-hidden
      />

      <div className="drop-shadow-[0_18px_28px_rgba(74,16,32,0.16)] transition-[filter] duration-300 group-hover:drop-shadow-[0_28px_40px_rgba(74,16,32,0.22)]">
        <div className="gift-tag-shape relative bg-white px-4 pb-5 pt-10 [clip-path:polygon(50%_0%,100%_13%,100%_100%,0_100%,0_13%)]">
          {/* Punched hole */}
          <span
            className="absolute left-1/2 top-[22px] h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-[#F6F1E9] shadow-[inset_0_1px_3px_rgba(0,0,0,0.25)] ring-2 ring-[#C9A96E]/45"
            aria-hidden
          />

          <div className="relative aspect-square overflow-hidden rounded-xl">
            <AppImage
              src={item.image}
              alt={item.imageAlt}
              fill
              sizes="(max-width: 640px) 168px, 200px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1010]/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>

          <div className="mt-4 text-center">
            <p className="font-serif text-[17px] font-semibold leading-tight text-[#1A1010] transition-colors group-hover:text-[#6B1E30] sm:text-[18px]">
              {item.label}
            </p>
            <p className="mt-1 font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-[#9D7D47]">
              {item.note}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function RelationshipPicksSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = 200;
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section
      id="relationship-picks"
      className="relationship-picks-section section-pad relative scroll-mt-28 overflow-hidden"
      aria-labelledby="relationship-picks-heading"
    >
      {/* Botanical corner accents */}
      <div className="relationship-picks-leaf relationship-picks-leaf--tl" aria-hidden />
      <div className="relationship-picks-leaf relationship-picks-leaf--br" aria-hidden />

      <div className="section-container relative">
        <header className="mx-auto max-w-2xl text-center">
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[#9D7D47]">
            Curated by relationship
          </p>
          <h2 id="relationship-picks-heading" className="section-heading mt-3">
            Gifts by <span className="text-[#6B1E30]">Relationship</span>
          </h2>
        </header>

        {/* Ribbon with hanging gift tags */}
        <div className="relative mt-12 lg:mt-14">
          {/* Sagging ribbon line */}
          <svg
            className="pointer-events-none absolute inset-x-0 top-0 h-10 w-full"
            viewBox="0 0 1200 40"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M0,10 Q300,38 600,22 T1200,14"
              fill="none"
              stroke="#C9A96E"
              strokeOpacity="0.55"
              strokeWidth="1.5"
              strokeDasharray="1 7"
              strokeLinecap="round"
            />
          </svg>

          <div
            ref={scrollRef}
            className="no-scrollbar -mx-4 flex snap-x snap-mandatory items-start gap-7 overflow-x-auto px-6 pb-4 pt-14 sm:-mx-8 sm:px-10 lg:mx-0 lg:justify-center lg:gap-10 lg:overflow-visible lg:px-0"
          >
            {RELATIONSHIP_PICKS.map((item, index) => (
              <GiftTagCard key={item.id} item={item} index={index} />
            ))}
          </div>

          {/* Light scroll arrows — mobile & tablet only */}
          <button
            type="button"
            onClick={() => scrollBy('left')}
            aria-label="Scroll left"
            className="absolute left-0 top-1/2 z-10 flex h-12 w-10 -translate-y-1/2 items-center justify-center text-[#4A1020] transition hover:text-[#6B1E30] lg:hidden"
          >
            <ChevronLeft className="h-9 w-9" strokeWidth={2} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => scrollBy('right')}
            aria-label="Scroll right"
            className="absolute right-0 top-1/2 z-10 flex h-12 w-10 -translate-y-1/2 items-center justify-center text-[#4A1020] transition hover:text-[#6B1E30] lg:hidden"
          >
            <ChevronRight className="h-9 w-9" strokeWidth={2} aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
