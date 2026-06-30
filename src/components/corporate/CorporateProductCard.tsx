import { Link } from 'react-router-dom';
import AppImage from '@/components/ui/AppImage';
import { formatCorporatePrice, type CorporateProduct } from '@/config/corporateGiftingData';

type CorporateProductCardProps = {
  product: CorporateProduct;
};

export default function CorporateProductCard({ product }: CorporateProductCardProps) {
  return (
    <Link
      to={`/corporate/product/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C9A96E]/40 hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <AppImage
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-serif text-[15px] font-semibold leading-snug text-[#4A1020] transition-colors group-hover:text-[#6B1E30] sm:text-[16px]">
          {product.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-relaxed text-[#6E6360]">
          {product.description}
        </p>
        <div className="mt-auto pt-3">
          <p className="font-serif text-[14px] font-bold text-[#4A1020]">{formatCorporatePrice(product.price)}</p>
          <p className="mt-0.5 text-[11px] font-medium text-[#9D7D47]">{product.bulkPrice}</p>
        </div>
      </div>
    </Link>
  );
}
