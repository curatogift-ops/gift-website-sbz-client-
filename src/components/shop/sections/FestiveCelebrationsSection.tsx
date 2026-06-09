import { useRef } from 'react';
import { Link } from 'react-router-dom';
import AppImage from '@/components/ui/AppImage';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { FESTIVE_CELEBRATIONS } from '@/config/personalizedSections';

const FESTIVE_GRADIENTS: Record<string, string> = {
  'new-year': 'from-[#0f1a2e] via-[#1a2744] to-[#2a1f3d]',
  diwali: 'from-[#3a1f0a] via-[#5c2a0a] to-[#7a3a12]',
  christmas: 'from-[#1a2e1a] via-[#2a3d22] to-[#1a3020]',
  eid: 'from-[#0a2e28] via-[#123d35] to-[#0f3028]',
  holi: 'from-[#4a0a28] via-[#6b1238] to-[#8b1848]',
};

export default function FestiveCelebrationsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'prev' | 'next') => {
    const node = scrollRef.current;
    if (!node) return;
    node.scrollBy({ left: dir === 'next' ? 320 : -320, behavior: 'smooth' });
  };

  return (
    <section
      id="festive-celebrations"
      className="scroll-mt-28 overflow-hidden border-y border-[#ebe6e0]/60 bg-[#1A1010] py-14 sm:py-16 lg:py-20"
      aria-labelledby="festive-heading"
    >
      <div className="section-container">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-lg">
            <div className="flex items-center gap-2 text-[#C9A96E]">
              <Sparkles className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.22em]">Season of joy</p>
            </div>
            <h2 id="festive-heading" className="mt-3 font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight text-white">
              Festive <span className="italic text-[#C9A96E]">Celebrations</span>
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-white/70">
              Curated gifts for every festival — swipe through and find the perfect celebration hamper.
            </p>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scroll('prev')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
              aria-label="Previous festivals"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => scroll('next')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
              aria-label="Next festivals"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="no-scrollbar -mx-4 mt-10 flex gap-4 overflow-x-auto px-4 pb-2 sm:gap-5 lg:mt-12"
        >
          {FESTIVE_CELEBRATIONS.map((item, i) => {
            const Icon = item.Icon;
            const gradient = FESTIVE_GRADIENTS[item.id] ?? 'from-[#2a1a20] to-[#4a1020]';

            return (
              <Link
                key={item.id}
                to={item.href}
                className={`group relative flex w-[min(78vw,300px)] shrink-0 flex-col overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:-translate-y-1 sm:w-[280px] lg:w-[320px]`}
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className="relative h-44 overflow-hidden sm:h-48">
                  <AppImage
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="320px"
                    className="object-cover opacity-60 mix-blend-luminosity transition-all duration-500 group-hover:opacity-80 group-hover:mix-blend-normal group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/10 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm">
                    0{i + 1}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/5 text-[#C9A96E]">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </div>
                  <h3 className="mt-4 font-serif text-[20px] font-semibold text-white">{item.label}</h3>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#C9A96E] transition group-hover:gap-3">
                    Shop festival gifts
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
