import type { ReactNode } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import type { CorporateProduct } from '@/config/corporateGiftingData';

type CorporateProductCarouselSectionProps = {
  id: string;
  title: string;
  products: CorporateProduct[];
  renderCard: (product: CorporateProduct) => ReactNode;
  className?: string;
  titleClassName?: string;
  /** Use a responsive grid when item count is small (avoids empty carousel space). */
  gridWhenFew?: boolean;
};

export default function CorporateProductCarouselSection({
  id,
  title,
  products,
  renderCard,
  className = 'bg-[var(--cream)]',
  titleClassName = 'section-heading-corporate text-center',
  gridWhenFew = true,
}: CorporateProductCarouselSectionProps) {
  if (products.length === 0) return null;

  const useGrid = gridWhenFew && products.length <= 4;

  return (
    <section className={`corp-product-carousel-section ${className}`} aria-labelledby={id}>
      <div className="section-container py-10 sm:py-12 lg:py-14">
        <h2 id={id} className={titleClassName}>
          {title}
        </h2>

        {useGrid ? (
          <ul className="mt-6 grid list-none grid-cols-2 gap-x-4 gap-y-8 sm:mt-8 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
            {products.map((item) => (
              <li key={item.slug} className="min-w-0">
                {renderCard(item)}
              </li>
            ))}
          </ul>
        ) : (
          <div className="corp-product-carousel-wrap relative mt-6 sm:mt-8">
            <Carousel opts={{ align: 'start', loop: false, dragFree: true }} className="w-full">
              <CarouselContent className="-ml-3 sm:-ml-4">
                {products.map((item) => (
                  <CarouselItem
                    key={item.slug}
                    className="basis-[72%] pl-3 sm:basis-[48%] sm:pl-4 md:basis-[36%] lg:basis-[28%] xl:basis-[22%]"
                  >
                    {renderCard(item)}
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="corp-carousel-nav corp-carousel-nav-dark -left-0 sm:-left-1" />
              <CarouselNext className="corp-carousel-nav corp-carousel-nav-dark -right-0 sm:-right-1" />
            </Carousel>
          </div>
        )}
      </div>
    </section>
  );
}
