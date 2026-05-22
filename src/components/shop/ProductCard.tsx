import { Link } from 'react-router-dom';
import AppImage from '@/components/ui/AppImage';
import { Heart, ShoppingBag, Star } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    slug: string;
    price: string;
    compare_price?: string;
    images: { cloudinary_url: string; alt_text: string }[];
    category_name: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.images[0]?.cloudinary_url || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80';

  return (
    <div className="group relative bg-white dark:bg-slate-900 overflow-hidden transition-all duration-500">
      <Link to={`/shop/${product.slug}`}>
        <div className="relative aspect-[4/5] overflow-hidden bg-muted rounded-2xl">
          <AppImage
            src={mainImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Quick Actions */}
          <div className="absolute bottom-4 left-4 right-4 translate-y-12 group-hover:translate-y-0 transition-transform duration-300 flex gap-2">
            <button
              type="button"
              className="flex-grow primary-gradient text-white py-3 rounded-xl text-[13.5px] font-bold shadow-lg flex items-center justify-center gap-2.5 ring-1 ring-white/15"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={2.35} strokeLinecap="round" strokeLinejoin="round" aria-hidden />
              ADD TO CART
            </button>
            <button
              type="button"
              className="w-12 h-12 bg-white/95 backdrop-blur-md rounded-xl flex items-center justify-center text-foreground border border-black/[0.06] shadow-md hover:text-[#6B1E30] hover:border-[#C9A96E]/45 transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart className="h-[19px] w-[19px]" strokeWidth={2.35} strokeLinecap="round" strokeLinejoin="round" />
            </button>
          </div>

          {product.compare_price && (
            <div className="absolute top-4 left-4 bg-accent text-white text-[11px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest leading-none">
              OFFER
            </div>
          )}
        </div>
      </Link>

      <div className="pt-4 pb-2 space-y-2 px-1">
        <div className="flex items-center gap-1 text-[12.5px] text-yellow-500 font-medium">
          <Star size={13} fill="currentColor" />
          <Star size={13} fill="currentColor" />
          <Star size={13} fill="currentColor" />
          <Star size={13} fill="currentColor" />
          <Star size={13} fill="currentColor" />
          <span className="text-[#8c827a] font-normal ml-1">(4.9)</span>
        </div>
        
        <Link to={`/shop/${product.slug}`} className="block">
          <h3 className="font-serif font-semibold text-base text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-baseline gap-2">
          <span className="font-sans font-semibold text-xl text-foreground">₹{parseFloat(product.price).toLocaleString()}</span>
          {product.compare_price && (
            <span className="text-muted text-sm line-through">₹{parseFloat(product.compare_price).toLocaleString()}</span>
          )}
        </div>
      </div>
    </div>
  );
}
