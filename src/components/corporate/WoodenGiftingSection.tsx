import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import { Heart, Leaf } from 'lucide-react';
import { cn } from '@/utils/cn';

type Product = {
  id: string;
  title: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  reviewsCount: number;
  hasOverlay?: boolean;
};

const WOODEN_PRODUCTS: Product[] = [
  {
    id: 'coffee-mug-cork',
    title: 'Coffee Mug With Cork Detail',
    category: 'Corporate Gifting',
    price: 450,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600',
    rating: 4.0,
    reviewsCount: 2,
  },
  {
    id: 'savvy-sustainable-hamper',
    title: 'Savvy and Sustainable Gift Hamper',
    category: 'Corporate Gifting',
    price: 1470,
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=600',
    rating: 5.0,
    reviewsCount: 4,
    hasOverlay: true,
  },
  {
    id: 'bamboo-coffee-sipper',
    title: 'Bamboo Coffee Sipper',
    category: 'Corporate Gifting',
    price: 350,
    rating: 4.5,
    reviewsCount: 6,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'journal-rumi',
    title: 'Journal - Rumi',
    category: 'Corporate Gifting',
    price: 250,
    rating: 4.8,
    reviewsCount: 5,
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=600',
  },
];

export default function WoodenGiftingSection() {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="bg-[var(--cream)] py-12 sm:py-14 lg:py-16" aria-labelledby="wooden-gifting-heading">
      <div className="section-container">
        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
          <h2
            id="wooden-gifting-heading"
            className="section-heading-corporate"
          >
            Eco-Friendly Corporate Gifting
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-x-3.5 gap-y-7 sm:gap-x-6 sm:gap-y-8 lg:grid-cols-4 lg:gap-6">
          {WOODEN_PRODUCTS.map((prod) => {
            const isFavorite = !!favorites[prod.id];
            return (
              <div
                key={prod.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-colors duration-300 hover:border-[#C9A96E]/45"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-muted">
                  <AppImage
                    src={prod.image}
                    alt={prod.title}
                    fill
                    sizes="(max-width: 640px) 50vw, 280px"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />

                  {prod.hasOverlay && (
                    <div className="absolute inset-0 pointer-events-none select-none z-10 bg-black/5">
                      <svg className="absolute inset-0 h-full w-full opacity-90" viewBox="0 0 100 100" fill="none" preserveAspectRatio="none">
                        <path d="M22 24 L22 36" stroke="white" strokeWidth="0.75" strokeDasharray="1.5 1.5" />
                        <path d="M52 24 L52 48" stroke="white" strokeWidth="0.75" strokeDasharray="1.5 1.5" />
                        <path d="M78 32 L78 60" stroke="white" strokeWidth="0.75" strokeDasharray="1.5 1.5" />
                        <path d="M34 88 L34 72" stroke="white" strokeWidth="0.75" strokeDasharray="1.5 1.5" />
                        <path d="M66 88 L66 75" stroke="white" strokeWidth="0.75" strokeDasharray="1.5 1.5" />
                      </svg>
                      <span className="absolute top-[18%] left-[22%] -translate-x-1/2 text-[8px] sm:text-[9.5px] font-sans font-bold uppercase tracking-wider text-white bg-black/35 backdrop-blur-[1px] px-1.5 py-0.5 rounded shadow-sm">
                        Sipper
                      </span>
                      <span className="absolute top-[18%] left-[52%] -translate-x-1/2 text-[8px] sm:text-[9.5px] font-sans font-bold uppercase tracking-wider text-white bg-black/35 backdrop-blur-[1px] px-1.5 py-0.5 rounded shadow-sm">
                        Reusable box
                      </span>
                      <span className="absolute top-[26%] left-[78%] -translate-x-1/2 text-[8px] sm:text-[9.5px] font-sans font-bold uppercase tracking-wider text-white bg-black/35 backdrop-blur-[1px] px-1.5 py-0.5 rounded shadow-sm">
                        Journal
                      </span>
                      <span className="absolute bottom-[6%] left-[34%] -translate-x-1/2 text-[8px] sm:text-[9.5px] font-sans font-bold uppercase tracking-wider text-white bg-black/35 backdrop-blur-[1px] px-1.5 py-0.5 rounded shadow-sm">
                        Coffee cup
                      </span>
                      <span className="absolute bottom-[6%] left-[66%] -translate-x-1/2 text-[8px] sm:text-[9.5px] font-sans font-bold uppercase tracking-wider text-white bg-black/35 backdrop-blur-[1px] px-1.5 py-0.5 rounded shadow-sm">
                        Sipper
                      </span>

                      <div className="absolute top-[36%] left-[24%] -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white shadow-sm ring-2 ring-white/50" />
                      <div className="absolute top-[48%] left-[54%] -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white shadow-sm ring-2 ring-white/50" />
                      <div className="absolute top-[60%] left-[74%] -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white shadow-sm ring-2 ring-white/50" />
                      <div className="absolute top-[72%] left-[34%] -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white shadow-sm ring-2 ring-white/50" />
                      <div className="absolute top-[75%] left-[66%] -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white shadow-sm ring-2 ring-white/50" />
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={(e) => toggleFavorite(prod.id, e)}
                    className="absolute right-2.5 top-2.5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 text-foreground backdrop-blur-md transition-colors hover:bg-white"
                    aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart
                      className={cn(
                        "h-4 w-4 transition-colors",
                        isFavorite ? "fill-[#e11d48] text-[#e11d48]" : "text-[#1a1a1a]/80"
                      )}
                      strokeWidth={2}
                    />
                  </button>
                </div>

                {/* Content Area */}
                <div className="flex flex-1 flex-col p-3 sm:p-4.5 bg-white">
                  <p className="flex items-center gap-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.08em] text-muted-foreground sm:text-[11px]">
                    <Leaf className="h-3 w-3 text-[#9D7D47]" strokeWidth={1.75} aria-hidden />
                    {prod.category}
                  </p>

                  <h3 className="mt-1.5 min-h-[2.25rem] font-serif text-[14px] font-semibold leading-snug text-foreground transition-colors group-hover:text-primary sm:min-h-[2.75rem] sm:text-[17px]">
                    {prod.title}
                  </h3>

                  <div className="mt-2 flex items-baseline justify-between border-t border-black/[0.03] pt-2">
                    <span className="font-sans text-[13px] font-bold text-primary sm:text-base">
                      &#8377; {prod.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
