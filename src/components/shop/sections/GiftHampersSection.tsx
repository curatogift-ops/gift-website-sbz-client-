import { Link } from 'react-router-dom';
import AppImage from '@/components/ui/AppImage';
import { ArrowRight, Gift } from 'lucide-react';
import { GIFT_HAMPERS } from '@/config/personalizedSections';

export default function GiftHampersSection() {
  const [hero, ...listItems] = GIFT_HAMPERS;

  return (
    <section
      id="gift-hampers"
      className="section-pad scroll-mt-28 section-alt"
      aria-labelledby="gift-hampers-heading"
    >
      <div className="section-container">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          {/* Left: immersive showcase */}
          <div className="relative">
            <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-[#C9A96E]/15 blur-2xl" aria-hidden />
            <div className="absolute -bottom-6 -right-4 h-32 w-32 rounded-full bg-[#6B1E30]/10 blur-2xl" aria-hidden />

            <div className="relative overflow-hidden rounded-3xl shadow-[0_24px_60px_-20px_rgba(74,16,32,0.25)]">
              <div className="relative aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5]">
                <AppImage
                  src={hero.image}
                  alt={hero.imageAlt}
                  fill
                  sizes="(max-width:1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A1020]/80 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E]">Signature pick</p>
                <h2 id="gift-hampers-heading" className="mt-2 font-serif text-[length:var(--font-size-h3)] font-semibold leading-[1.2] text-white">
                  Gift Hampers
                </h2>
                <p className="mt-3 max-w-sm text-[15px] leading-[1.65] text-white/85 sm:text-base">
                  Indulgent collections of chocolates, dry fruits, wellness treats, and premium boxes.
                </p>
                <Link
                  to={hero.href}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#4A1020] transition hover:bg-[#C9A96E] hover:text-white"
                >
                  Explore {hero.label}
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </div>

          {/* Right: stacked list */}
          <div className="flex flex-col gap-3">
            {listItems.map((item, i) => {
              const Icon = item.Icon;
              return (
                <Link
                  key={item.id}
                  to={item.href}
                  className="group flex items-center gap-4 rounded-2xl border border-[#E5E5E5]/80 bg-white/80 p-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-[#C9A96E]/40 hover:bg-white hover:shadow-md sm:p-4"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl sm:h-[72px] sm:w-[72px]">
                    <AppImage
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="72px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-[#9D7D47]">
                      0{i + 2} — Hamper
                    </p>
                    <p className="font-serif text-[16px] font-semibold text-[#1A1010] sm:text-[17px]">{item.label}</p>
                  </div>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-muted text-[#6B1E30] transition group-hover:bg-[#6B1E30] group-hover:text-white">
                    <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                  </div>
                </Link>
              );
            })}

            <Link
              to="/hamper-builder"
              className="mt-2 flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#C9A96E]/50 bg-surface-muted/50 py-4 text-[12px] font-bold uppercase tracking-[0.12em] text-[#6B1E30] transition hover:border-[#6B1E30] hover:bg-[#6B1E30] hover:text-white"
            >
              <Gift className="h-4 w-4" strokeWidth={2} aria-hidden />
              Create Your Own Hamper
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
