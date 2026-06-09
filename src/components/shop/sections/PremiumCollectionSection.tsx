import { Link } from 'react-router-dom';
import AppImage from '@/components/ui/AppImage';
import { ArrowRight, Crown, Diamond } from 'lucide-react';
import { PREMIUM_COLLECTION } from '@/config/personalizedSections';

export default function PremiumCollectionSection() {
  return (
    <section
      id="premium-collection"
      className="scroll-mt-28 relative overflow-hidden bg-[#4A1020] py-16 sm:py-20 lg:py-24"
      aria-labelledby="premium-heading"
    >
      {/* Decorative background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 50%, #C9A96E 0, transparent 50%), radial-gradient(circle at 85% 30%, #C9A96E 0, transparent 40%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #C9A96E 0, #C9A96E 1px, transparent 0, transparent 50%)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden
      />

      <div className="section-container relative">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[#C9A96E]/30 bg-[#C9A96E]/10 px-4 py-1.5">
            <Diamond className="h-3.5 w-3.5 text-[#C9A96E]" strokeWidth={1.75} aria-hidden />
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E]">Luxury tier</span>
          </div>
          <h2 id="premium-heading" className="font-serif text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-tight text-white">
            Premium <span className="italic text-[#C9A96E]">Collection</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-white/70">
            Exceptional gifts for those who appreciate the finest — executive sets, luxury boxes, and exclusive collections.
          </p>
        </div>

        {/* Overlapping portrait cards */}
        <div className="mx-auto mt-12 flex max-w-5xl flex-wrap items-end justify-center gap-4 sm:gap-0 lg:mt-16">
          {PREMIUM_COLLECTION.map((item, i) => {
            const Icon = item.Icon;
            const rotations = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2'];
            const offsets = ['', 'sm:-ml-6 lg:-ml-10', 'sm:-ml-6 lg:-ml-10', 'sm:-ml-6 lg:-ml-10'];
            const zIndex = ['z-10', 'z-20', 'z-30', 'z-40'];

            return (
              <Link
                key={item.id}
                to={item.href}
                className={`group relative w-[calc(50%-8px)] shrink-0 sm:w-[220px] lg:w-[240px] ${offsets[i]} ${zIndex[i]} transition-transform duration-300 hover:-translate-y-3 hover:rotate-0 hover:z-50`}
              >
                <div
                  className={`overflow-hidden rounded-2xl border-2 border-[#C9A96E]/30 bg-[#5C1629] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] transition-shadow group-hover:border-[#C9A96E]/60 group-hover:shadow-[0_30px_60px_-15px_rgba(201,169,110,0.3)] ${rotations[i]}`}
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <AppImage
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="240px"
                      className="object-cover opacity-85 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#4A1020] via-[#4A1020]/20 to-transparent" />
                    <div className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#C9A96E] text-[#4A1020] shadow-lg">
                      <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                    </div>
                  </div>
                  <div className="border-t border-[#C9A96E]/20 p-4">
                    <p className="font-serif text-[16px] font-semibold text-white">{item.label}</p>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#C9A96E] opacity-0 transition-opacity group-hover:opacity-100">
                      Discover
                      <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/shop/browse?cat=luxury"
            className="inline-flex items-center gap-2 rounded-full border border-[#C9A96E]/50 bg-transparent px-6 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#C9A96E] transition hover:bg-[#C9A96E] hover:text-[#4A1020]"
          >
            <Crown className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            View all premium gifts
          </Link>
        </div>
      </div>
    </section>
  );
}
