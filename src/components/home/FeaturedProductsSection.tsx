'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  Box,
  ChevronLeft,
  ChevronRight,
  Diamond,
  Gift,
  Heart,
  Leaf,
  Package,
  Shield,
  Sparkles,
  Tag,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

type ButtonVariant = 'maroon' | 'gold' | 'green';

type FeaturedProduct = {
  category: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  features: { label: string; Icon: LucideIcon }[];
  buttonVariant: ButtonVariant;
  waMessage: string;
};

const BUTTON: Record<ButtonVariant, string> = {
  maroon: 'bg-[#4A1010] text-white hover:bg-[#3d0d0d]',
  gold: 'bg-[#C9A96E] text-[#1A1010] hover:bg-[#b89355]',
  green: 'bg-[#1B3022] text-white hover:bg-[#14281c]',
};

const PRODUCTS: FeaturedProduct[] = [
  {
    category: 'Corporate gift',
    title: 'Executive Desk Set',
    description: 'Refined desk essentials and branded touches for leadership and client meetings.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600',
    imageAlt: 'Executive desk and corporate gifts',
    features: [
      { label: 'Premium quality', Icon: Diamond },
      { label: 'Custom branding', Icon: Tag },
    ],
    buttonVariant: 'maroon',
    waMessage: 'Hi, I would like to enquire about the Executive Desk Set.',
  },
  {
    category: 'Festive hamper',
    title: 'Diwali Delight Hamper',
    description: 'Artisan sweets, festive accents, and elegant packaging for celebrations.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600',
    imageAlt: 'Festive Diwali hamper with treats',
    features: [
      { label: 'Festive special', Icon: Sparkles },
      { label: 'Premium packaging', Icon: Shield },
    ],
    buttonVariant: 'gold',
    waMessage: 'Hi, I would like to enquire about the Diwali Delight Hamper.',
  },
  {
    category: 'Employee kit',
    title: 'Welcome Kit',
    description: 'Onboarding essentials new hires will use and remember from day one.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600',
    imageAlt: 'Employee welcome kit',
    features: [
      { label: 'Useful essentials', Icon: Package },
      { label: 'Custom branding', Icon: Tag },
    ],
    buttonVariant: 'green',
    waMessage: 'Hi, I would like to enquire about the Welcome Kit.',
  },
  {
    category: 'Luxury box',
    title: 'Indulgence Box',
    description: 'Curated indulgences with luxury finishes for your most discerning recipients.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38f7968?auto=format&fit=crop&q=80&w=600',
    imageAlt: 'Luxury gift box with premium items',
    features: [
      { label: 'Luxury packaging', Icon: Box },
      { label: 'Premium quality', Icon: Diamond },
    ],
    buttonVariant: 'maroon',
    waMessage: 'Hi, I would like to enquire about the Indulgence Box.',
  },
  {
    category: 'Eco-friendly gift',
    title: 'Sustainable Gift Box',
    description: 'Mindful materials and reusable pieces that still feel beautifully premium.',
    image: 'https://images.unsplash.com/photo-1610552050899-df6c5848284a?auto=format&fit=crop&q=80&w=600',
    imageAlt: 'Sustainable eco-friendly gift box',
    features: [
      { label: 'Eco friendly', Icon: Leaf },
      { label: 'Sustainable choice', Icon: Gift },
    ],
    buttonVariant: 'gold',
    waMessage: 'Hi, I would like to enquire about the Sustainable Gift Box.',
  },
];

const WA = '919876543210';

export default function FeaturedProductsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const updateActiveFromScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>('[data-featured-card]');
    if (!first) return;
    const gap = 16;
    const step = first.offsetWidth + gap;
    if (step <= 0) return;
    const i = Math.min(PRODUCTS.length - 1, Math.max(0, Math.round(el.scrollLeft / step)));
    setActive(i);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateActiveFromScroll();
    el.addEventListener('scroll', updateActiveFromScroll, { passive: true });
    return () => el.removeEventListener('scroll', updateActiveFromScroll);
  }, [updateActiveFromScroll]);

  const scrollByDir = (dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>('[data-featured-card]');
    const gap = 16;
    const step = (first?.offsetWidth ?? 280) + gap;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const goTo = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>('[data-featured-card]');
    const gap = 16;
    const step = (first?.offsetWidth ?? 280) + gap;
    el.scrollTo({ left: index * step, behavior: 'smooth' });
  };

  return (
    <section className="section-pad bg-white" aria-labelledby="featured-products-heading">
      <div className="section-container">
        <div className="mb-10 flex flex-col gap-6 lg:mb-12 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="text-center lg:flex-1 lg:text-left">
            <p className="eyebrow">Featured products</p>
            <h2 id="featured-products-heading" className="section-heading mt-3 text-[#1B3022]">
              Curated Gifts for Every Occasion
            </h2>
            <p className="section-lede mx-auto mt-3 lg:mx-0">
              Handpicked premium hampers and gifts loved by our clients.
            </p>
          </div>
          <Link href="/shop" className="btn-pill btn-pill-ghost-gold mx-auto lg:mx-0">
            <Gift className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
            View all products
          </Link>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => scrollByDir(-1)}
            className="absolute left-0 top-[42%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#e5e2de] bg-white/95 text-[#4a4846] shadow-md transition hover:bg-white md:flex lg:left-1 lg:h-12 lg:w-12"
            aria-label="Previous products"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => scrollByDir(1)}
            className="absolute right-0 top-[42%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#e5e2de] bg-white/95 text-[#4a4846] shadow-md transition hover:bg-white md:flex lg:right-1 lg:h-12 lg:w-12"
            aria-label="Next products"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2} />
          </button>

          <div
            ref={scrollRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:px-14 lg:px-16"
          >
            {PRODUCTS.map((product) => {
              const waHref = `https://wa.me/${WA}?text=${encodeURIComponent(product.waMessage)}`;
              return (
                <article
                  key={product.title}
                  data-featured-card
                  className="w-[min(88vw,20rem)] shrink-0 snap-start sm:w-[min(82vw,18.5rem)] md:w-[min(32vw,17.5rem)] lg:w-[min(28vw,18rem)] xl:w-[17.25rem]"
                >
                  <div className="flex h-full flex-col rounded-2xl border border-[#ebe8e4] bg-white p-4 shadow-[0_10px_36px_-18px_rgba(74,16,32,0.12)] sm:p-5">
                    <div className="relative aspect-square overflow-hidden rounded-xl bg-[#f0eeeb]">
                      <Image
                        src={product.image}
                        alt={product.imageAlt}
                        fill
                        sizes="(max-width:640px) 88vw, (max-width:1024px) 32vw, 280px"
                        className="object-cover object-center"
                      />
                      <button
                        type="button"
                        className="absolute right-2.5 top-2.5 flex h-9 w-9 items-center justify-center rounded-full border border-[#e8e4e0] bg-white/95 text-[#4A1010] shadow-sm transition hover:bg-white"
                        aria-label={`Save ${product.title} to wishlist`}
                      >
                        <Heart className="h-4 w-4" strokeWidth={1.75} />
                      </button>
                    </div>
                    <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#A67C37]">
                      {product.category}
                    </p>
                    <h3 className="card-title mt-1.5">{product.title}</h3>
                    <p className="mt-2 line-clamp-2 min-h-[2.75rem] text-[12.5px] leading-relaxed text-[#6b6560] sm:text-[13px]">
                      {product.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2 border-t border-[#f0ebe4] pt-4">
                      {product.features.map((f) => (
                        <span
                          key={f.label}
                          className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#A67C37]"
                        >
                          <f.Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
                          {f.label}
                        </span>
                      ))}
                    </div>
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl py-3 text-[10px] font-bold uppercase tracking-[0.16em] transition active:scale-[0.98] sm:text-[11px] sm:tracking-[0.18em] ${BUTTON[product.buttonVariant]}`}
                    >
                      Enquire now
                      <ArrowRight className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} aria-hidden />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-4 flex justify-center gap-6 md:hidden">
            <button
              type="button"
              onClick={() => scrollByDir(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e2de] bg-white text-[#4a4846] shadow-sm"
              aria-label="Previous products"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => scrollByDir(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e2de] bg-white text-[#4a4846] shadow-sm"
              aria-label="Next products"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 md:mt-8">
            {PRODUCTS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={
                  i === active
                    ? 'h-2 w-8 rounded-full bg-[#A67C37] transition-all'
                    : 'h-2 w-2 rounded-full bg-[#d4cfc8] transition-all hover:bg-[#b8b3ac]'
                }
                aria-label={`Go to product ${i + 1}`}
                aria-current={i === active ? 'true' : undefined}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center md:mt-14">
          <a
            href={`https://wa.me/${WA}?text=${encodeURIComponent("Hi, I'd like to request your catalogue.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill btn-pill-maroon"
          >
            Request Catalogue
          </a>
        </div>
      </div>
    </section>
  );
}
