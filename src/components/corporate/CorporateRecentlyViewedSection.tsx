import { Link } from 'react-router-dom';
import AppImage from '@/components/ui/AppImage';
import CorporateProductCarouselSection from '@/components/corporate/CorporateProductCarouselSection';
import { formatCorporatePrice, type CorporateProduct } from '@/config/corporateGiftingData';

type CorporateRecentlyViewedSectionProps = {
  products: CorporateProduct[];
};

function RecentlyViewedCard({ product }: { product: CorporateProduct }) {
  return (
    <Link to={`/corporate/product/${product.slug}`} className="group block h-full min-w-0">
      <div className="relative aspect-square overflow-hidden rounded-sm border border-border bg-white">
        <AppImage
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width:640px) 45vw, 220px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className="mt-3 w-full text-left">
        <p className="line-clamp-2 font-sans text-[13px] font-medium leading-snug text-foreground group-hover:text-primary">
          {product.name}
        </p>
        <p className="mt-1.5 font-sans text-[13px] font-semibold text-foreground">
          {formatCorporatePrice(product.price)}
        </p>
      </div>
    </Link>
  );
}

export default function CorporateRecentlyViewedSection({
  products,
}: CorporateRecentlyViewedSectionProps) {
  return (
    <CorporateProductCarouselSection
      id="recently-viewed-heading"
      title="Recently Viewed"
      products={products}
      className="border-t border-border bg-white"
      titleClassName="text-center font-serif text-[clamp(1.35rem,3vw,1.85rem)] font-semibold text-[#C9A96E]"
      renderCard={(product) => <RecentlyViewedCard product={product} />}
    />
  );
}
