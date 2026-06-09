import { Gift } from 'lucide-react';
import { GiftCategoryCard, type GiftCategoryItem } from '@/components/shop/GiftCategoryCard';
import { cn } from '@/utils/cn';

type GiftCategoryGridSectionProps = {
  id?: string;
  heading: string;
  headingAccent?: string;
  headingTag?: 'h1' | 'h2';
  items: GiftCategoryItem[];
  columns?: 2 | 3 | 4;
  showOrnament?: boolean;
  className?: string;
  bgClass?: string;
};

export default function GiftCategoryGridSection({
  id,
  heading,
  headingAccent,
  headingTag = 'h2',
  items,
  columns = 4,
  showOrnament = true,
  className,
  bgClass = 'bg-white',
}: GiftCategoryGridSectionProps) {
  const HeadingTag = headingTag;

  const gridCols =
    columns === 2
      ? 'sm:grid-cols-2'
      : columns === 3
        ? 'sm:grid-cols-2 lg:grid-cols-3'
        : 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

  return (
    <section
      id={id}
      className={cn('section-pad scroll-mt-28', bgClass, className)}
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center">
          <HeadingTag
            id={id ? `${id}-heading` : undefined}
            className={cn(
              'section-heading',
              headingTag === 'h1' && 'text-[clamp(1.75rem,3vw+0.75rem,2.5rem)]'
            )}
          >
            {headingAccent ? (
              <>
                {heading}{' '}
                <span className="text-[#6B1E30]">{headingAccent}</span>
              </>
            ) : (
              heading
            )}
          </HeadingTag>
          {showOrnament && (
            <div className="mx-auto mt-5 flex max-w-xs items-center justify-center gap-3">
              <span className="rule-line min-w-[2rem] flex-1" aria-hidden />
              <Gift className="h-5 w-5 shrink-0 text-[#C5A059]" strokeWidth={1.75} aria-hidden />
              <span className="rule-line min-w-[2rem] flex-1" aria-hidden />
            </div>
          )}
        </div>

        <div className={cn('mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-4 sm:gap-5 lg:mt-12', gridCols)}>
          {items.map((item) => (
            <GiftCategoryCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
