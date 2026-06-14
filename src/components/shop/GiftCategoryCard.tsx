import { Link } from 'react-router-dom';
import AppImage from '@/components/ui/AppImage';
import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

export type GiftCategoryItem = {
  id: string;
  label: string;
  href: string;
  image: string;
  imageAlt: string;
  Icon: LucideIcon;
};

type GiftCategoryCardProps = {
  item: GiftCategoryItem;
  className?: string;
};

export function GiftCategoryCard({ item, className }: GiftCategoryCardProps) {
  const Icon = item.Icon;

  return (
    <Link
      to={item.href}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-colors duration-300 hover:border-[#C9A96E]/45',
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <AppImage
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 280px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className="absolute left-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-md bg-primary text-primary-foreground ring-4 ring-white sm:h-12 sm:w-12"
          aria-hidden
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 border-t border-border px-4 py-4">
        <span className="font-serif text-[16px] font-semibold leading-snug text-primary sm:text-[17px]">
          {item.label}
        </span>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-primary transition-transform duration-200 group-hover:translate-x-0.5">
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </span>
      </div>
    </Link>
  );
}
