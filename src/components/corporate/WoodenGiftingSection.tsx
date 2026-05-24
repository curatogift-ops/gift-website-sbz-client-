import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import { Heart } from 'lucide-react';
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
    image: 'https://images.unsplash.com/photo-1517256064527-09c53b2d0c6b?auto=format&fit=crop&q=80&w=600',
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
    <section className="bg-white py-12 sm:py-16 lg:py-20 border-t border-[#ebe6e0]" aria-labelledby="wooden-gifting-heading">
      <div className="section-container">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-14">
          <h2
            id="wooden-gifting-heading"
            className="font-serif text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-[#A67C37] tracking-[0.02em] leading-tight capitalize"
          >
            Eco friendly corporate gifting
          </h2>
        </div>

        {/* 2-Column Grid on Mobile, 4-Column Grid on Desktop */}
        <div className="grid grid-cols-2 gap-x-3.5 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-6">
          {WOODEN_PRODUCTS.map((prod) => {
            const isFavorite = !!favorites[prod.id];
            return (
              <div
                key={prod.id}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-black/[0.04] shadow-[0_4px_18px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1"
              >
                {/* Image Container with precise aspect-square */}
                <div className="relative aspect-square w-full overflow-hidden bg-[#FAF8F5]">
                  <AppImage
                    src={prod.image}
                    alt={prod.title}
                    fill
                    sizes="(max-width: 640px) 50vw, 280px"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Dynamic interactive annotation overlay for "Savvy & Sustainable Gift Hamper" */}
                  {prod.hasOverlay && (
                    <div className="absolute inset-0 pointer-events-none select-none z-10 bg-black/5">
                      {/* SVG Canvas for Elegant Pointer Lines */}
                      <svg className="absolute inset-0 h-full w-full opacity-90" viewBox="0 0 100 100" fill="none" preserveAspectRatio="none">
                        {/* Sipper pointer (top-left) */}
                        <path d="M22 24 L22 36" stroke="white" strokeWidth="0.75" strokeDasharray="1.5 1.5" />
                        
                        {/* Reusable box pointer (top-center) */}
                        <path d="M52 24 L52 48" stroke="white" strokeWidth="0.75" strokeDasharray="1.5 1.5" />

                        {/* Journal pointer (top-right) */}
                        <path d="M78 32 L78 60" stroke="white" strokeWidth="0.75" strokeDasharray="1.5 1.5" />

                        {/* Coffee cup pointer (bottom-left) */}
                        <path d="M34 88 L34 72" stroke="white" strokeWidth="0.75" strokeDasharray="1.5 1.5" />

                        {/* Sipper pointer (bottom-right) */}
                        <path d="M66 88 L66 75" stroke="white" strokeWidth="0.75" strokeDasharray="1.5 1.5" />
                      </svg>

                      {/* Text Labels overlaid cleanly via percentages */}
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

                      {/* Little white intersection indicator dots */}
                      <div className="absolute top-[36%] left-[24%] -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white shadow-sm ring-2 ring-white/50 animate-pulse" />
                      <div className="absolute top-[48%] left-[54%] -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white shadow-sm ring-2 ring-white/50 animate-pulse" />
                      <div className="absolute top-[60%] left-[74%] -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white shadow-sm ring-2 ring-white/50 animate-pulse" />
                      <div className="absolute top-[72%] left-[34%] -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white shadow-sm ring-2 ring-white/50 animate-pulse" />
                      <div className="absolute top-[75%] left-[66%] -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white shadow-sm ring-2 ring-white/50 animate-pulse" />
                    </div>
                  )}

                  {/* Favorite button with transparent overlay */}
                  <button
                    type="button"
                    onClick={(e) => toggleFavorite(prod.id, e)}
                    className="absolute right-2.5 top-2.5 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-white/70 backdrop-blur-md text-[#1a1a1a] shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all hover:bg-white hover:scale-105 active:scale-95"
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
                  {/* Category */}
                  <p className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.06em] text-[#9a9490]">
                    {prod.category}
                  </p>

                  {/* Title */}
                  <h3 className="mt-1 sm:mt-1.5 font-sans text-[12.5px] sm:text-[15px] font-semibold text-[#1A1010] leading-snug group-hover:text-[#A67C37] transition-colors line-clamp-1 sm:line-clamp-2 min-h-[1.75rem] sm:min-h-[2.5rem]">
                    {prod.title}
                  </h3>

                  {/* Price Row */}
                  <div className="mt-2 flex items-baseline justify-between border-t border-black/[0.03] pt-2">
                    <span className="font-sans text-[13px] sm:text-base font-bold text-[#1A1010]">
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
