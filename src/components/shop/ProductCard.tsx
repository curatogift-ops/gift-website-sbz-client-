import { Link } from 'react-router-dom';
import AppImage from '@/components/ui/AppImage';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';

interface ProductCardProps {
  product: {
    id: number | string;
    name: string;
    slug: string;
    price: string | number;
    compare_price?: string;
    images: { cloudinary_url: string; alt_text: string }[];
    category_name: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const mainImage =
    product.images[0]?.cloudinary_url ||
    'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80';
  const priceNum =
    typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0;
  const addToCart = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const wishlisted = useWishlistStore((s) => s.items.some((i) => i.id === String(product.id)));

  const commerceItem = {
    id: String(product.id),
    slug: product.slug,
    name: product.name,
    price: priceNum,
    image: mainImage,
    categoryName: product.category_name,
    href: `/corporate/product/${product.slug}`,
  };

  return (
    <div className="group relative overflow-hidden bg-white transition-all duration-500">
      <Link to={`/corporate/product/${product.slug}`}>
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
          <AppImage
            src={mainImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute bottom-4 left-4 right-4 flex translate-y-12 gap-2 transition-transform duration-300 group-hover:translate-y-0">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(commerceItem);
              }}
              className="primary-gradient flex flex-grow items-center justify-center gap-2.5 rounded-xl py-3 text-[13.5px] font-bold text-white shadow-lg ring-1 ring-white/15"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={2.35} aria-hidden />
              ADD TO CART
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlist(commerceItem);
              }}
              className={`flex h-12 w-12 items-center justify-center rounded-xl border bg-white/95 shadow-md backdrop-blur-md transition-colors ${
                wishlisted
                  ? 'border-[#C9A96E]/45 text-[#6B1E30]'
                  : 'border-black/[0.06] text-foreground hover:border-[#C9A96E]/45 hover:text-[#6B1E30]'
              }`}
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart
                className={`h-[19px] w-[19px] ${wishlisted ? 'fill-current' : ''}`}
                strokeWidth={2.35}
              />
            </button>
          </div>

          {product.compare_price && (
            <div className="absolute left-4 top-4 rounded-lg bg-accent px-3 py-1.5 text-[11px] font-black uppercase leading-none tracking-widest text-white">
              OFFER
            </div>
          )}
        </div>
      </Link>

      <div className="space-y-2 px-1 pb-2 pt-4">
        <div className="flex items-center gap-1 text-[12.5px] font-medium text-yellow-500">
          <Star size={13} fill="currentColor" />
          <Star size={13} fill="currentColor" />
          <Star size={13} fill="currentColor" />
          <Star size={13} fill="currentColor" />
          <Star size={13} fill="currentColor" />
          <span className="ml-1 font-normal text-[#8c827a]">(4.9)</span>
        </div>

        <Link to={`/corporate/product/${product.slug}`} className="block">
          <h3 className="line-clamp-1 font-sans text-[14.5px] font-bold leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-baseline gap-2">
          <span className="font-sans text-xl font-semibold text-foreground">
            ₹{priceNum.toLocaleString()}
          </span>
          {product.compare_price && (
            <span className="text-sm text-muted line-through">
              ₹{parseFloat(product.compare_price).toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
