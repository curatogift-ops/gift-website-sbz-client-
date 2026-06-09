import { Link } from 'react-router-dom';
import AppImage from '@/components/ui/AppImage';
import {
  ArrowRight,
  Award,
  Baby,
  Gift,
  Heart,
  User,
  UserRound,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

type RecipientCard = {
  id: string;
  label: string;
  href: string;
  image: string;
  imageAlt: string;
  Icon: LucideIcon;
};

const RECIPIENTS: RecipientCard[] = [
  {
    id: 'for-her',
    label: 'For Her',
    href: '/shop/browse?recipient=for-her',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600',
    imageAlt: 'Elegant gift hamper for her with perfume and roses',
    Icon: UserRound,
  },
  {
    id: 'for-him',
    label: 'For Him',
    href: '/shop/browse?recipient=for-him',
    image: 'https://images.unsplash.com/photo-1549463574-04d2c2b46ac?auto=format&fit=crop&q=80&w=600',
    imageAlt: 'Premium gift set for him with watch and accessories',
    Icon: User,
  },
  {
    id: 'for-couples',
    label: 'For Couples',
    href: '/shop/browse?recipient=for-couples',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=600',
    imageAlt: 'Romantic gift box for couples',
    Icon: Heart,
  },
  {
    id: 'for-parents',
    label: 'For Parents',
    href: '/shop/browse?recipient=for-parents',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600',
    imageAlt: 'Thoughtful gift box for parents',
    Icon: Users,
  },
  {
    id: 'for-kids',
    label: 'For Kids',
    href: '/shop/browse?recipient=for-kids',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00ebbfddd1?auto=format&fit=crop&q=80&w=600',
    imageAlt: 'Fun gift hamper for kids with teddy bear',
    Icon: Baby,
  },
];

function RecipientCardItem({ item, size = 'default' }: { item: RecipientCard; size?: 'default' | 'compact' }) {
  const Icon = item.Icon;

  return (
    <Link
      to={item.href}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-[#ebe6e0]/80 bg-white shadow-[0_4px_20px_-8px_rgba(74,16,32,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-8px_rgba(74,16,32,0.18)]',
        size === 'compact' && 'max-w-[280px] mx-auto w-full'
      )}
    >
      <div className={cn('relative overflow-hidden', size === 'compact' ? 'aspect-square' : 'aspect-[4/3]')}>
        <AppImage
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes="(max-width:640px) 50vw, 280px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute -left-1 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-[#6B1E30] text-white shadow-md ring-4 ring-white sm:h-12 sm:w-12">
          <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 border-t border-[#f0ebe6] px-4 py-3.5">
        <span className="font-serif text-[15px] font-semibold text-[#6B1E30] sm:text-[16px]">{item.label}</span>
        <ArrowRight className="h-4 w-4 shrink-0 text-[#6B1E30] transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} aria-hidden />
      </div>
    </Link>
  );
}

function FeatureHighlight({
  title,
  description,
  Icon,
  align,
}: {
  title: string;
  description: string;
  Icon: LucideIcon;
  align: 'left' | 'right';
}) {
  return (
    <div
      className={cn(
        'flex flex-col justify-center gap-3 rounded-2xl border border-[#ebe6e0]/60 bg-white/60 px-5 py-6 text-center sm:px-6 lg:text-left',
        align === 'right' && 'lg:text-right lg:items-end'
      )}
    >
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#FAF7F4] text-[#6B1E30] ring-1 ring-[#C5A059]/25 lg:mx-0">
        <Icon className="h-5 w-5" strokeWidth={1.65} aria-hidden />
      </div>
      <div>
        <p className="font-serif text-[17px] font-semibold text-[#1A1010]">{title}</p>
        <p className="mt-1.5 text-[14px] leading-relaxed text-[#6b6560]">{description}</p>
      </div>
    </div>
  );
}

export default function RecipientBondSection() {
  const topRow = RECIPIENTS.slice(0, 4);
  const kidsCard = RECIPIENTS[4];

  return (
    <section
      className="relative section-pad overflow-hidden"
      aria-labelledby="recipient-bond-heading"
      style={{
        background: 'linear-gradient(180deg, #FFF9F5 0%, #F9F6F1 50%, #F4EFE8 100%)',
      }}
    >
      {/* Soft decorative arcs */}
      <div className="pointer-events-none absolute -left-32 top-20 h-64 w-64 rounded-full bg-[#C9A96E]/8 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-48 w-48 rounded-full bg-[#6B1E30]/6 blur-3xl" aria-hidden />

      <div className="section-container relative">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="recipient-bond-heading" className="section-heading">
            Thoughtful Gifts for Every <span className="text-[#6B1E30]">Bond</span>
            <Heart className="ml-2 inline-block h-5 w-5 text-[#6B1E30]" strokeWidth={1.75} aria-hidden />
          </h2>
          <div className="mx-auto mt-5 flex max-w-xs items-center justify-center gap-3">
            <span className="rule-line min-w-[2rem] flex-1" aria-hidden />
            <Gift className="h-5 w-5 shrink-0 text-[#C5A059]" strokeWidth={1.75} aria-hidden />
            <span className="rule-line min-w-[2rem] flex-1" aria-hidden />
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:mt-12">
          {topRow.map((item) => (
            <RecipientCardItem key={item.id} item={item} />
          ))}
        </div>

        <div className="mx-auto mt-4 grid max-w-6xl grid-cols-1 items-center gap-4 sm:mt-5 lg:grid-cols-[1fr_minmax(0,280px)_1fr] lg:gap-6">
          <FeatureHighlight
            title="Curated with Love"
            description="Handpicked gifts for every relationship."
            Icon={Gift}
            align="left"
          />
          <RecipientCardItem item={kidsCard} size="compact" />
          <FeatureHighlight
            title="Premium Quality"
            description="Finest quality, crafted to create lasting memories."
            Icon={Award}
            align="right"
          />
        </div>

        <div className="mt-10 flex justify-center lg:mt-12">
          <Link to="/shop/browse" className="btn-pill btn-pill-maroon px-8 py-3.5 text-[12px] sm:text-[13px]">
            <Gift className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
            Explore All Gifts
          </Link>
        </div>
      </div>
    </section>
  );
}
