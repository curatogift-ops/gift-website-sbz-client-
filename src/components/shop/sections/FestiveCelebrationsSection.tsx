import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppImage from '@/components/ui/AppImage';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { FESTIVE_CELEBRATIONS } from '@/config/personalizedSections';
import { cn } from '@/utils/cn';

const ROTATE_MS = 6000;

const FESTIVE_TINTS: Record<string, string> = {
  'new-year': 'from-[#0f1a2e]/95 via-[#0f1a2e]/30',
  diwali: 'from-[#3a1f0a]/95 via-[#5c2a0a]/30',
  christmas: 'from-[#10240f]/95 via-[#1a3020]/30',
  eid: 'from-[#0a2e28]/95 via-[#123d35]/30',
  holi: 'from-[#4a0a28]/95 via-[#6b1238]/30',
};

const FESTIVE_TAGLINES: Record<string, string> = {
  'new-year': 'Sparkle into the new year',
  diwali: 'Lights, laddoos & love',
  christmas: 'Wrapped in holiday magic',
  eid: 'Sweetness for the season',
  holi: 'A splash of every color',
};

const SHORT_NAMES: Record<string, string> = {
  'new-year': 'New Year',
  diwali: 'Diwali',
  christmas: 'Christmas',
  eid: 'Eid',
  holi: 'Holi',
};

export default function FestiveCelebrationsSection() {
  const [active, setActive] = useState(0);
  const current = FESTIVE_CELEBRATIONS[active];
  const tint = FESTIVE_TINTS[current.id] ?? 'from-[#1A1010]/95 via-[#1A1010]/30';

  /* Gentle auto-rotate; every manual selection restarts the timer */
  useEffect(() => {
    const t = window.setTimeout(
      () => setActive((i) => (i + 1) % FESTIVE_CELEBRATIONS.length),
      ROTATE_MS
    );
    return () => window.clearTimeout(t);
  }, [active]);

  return (
    <section
      id="festive-celebrations"
      className="section-pad relative scroll-mt-28 overflow-hidden bg-[#1A1010]"
      aria-labelledby="festive-heading"
    >
      {/* Atmospheric glows */}
      <div className="pointer-events-none absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-[#C9A96E]/[0.07] blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-80 w-80 rounded-full bg-[#6B1E30]/30 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" aria-hidden />

      <div className="section-container relative">
        <div className="max-w-lg">
          <div className="flex items-center gap-2 text-[#C9A96E]">
            <Sparkles className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.22em]">Season of joy</p>
          </div>
          <h2
            id="festive-heading"
            className="mt-3 font-serif text-[length:var(--font-size-h2)] font-semibold leading-[1.2] tracking-[-0.01em] text-white"
          >
            Festive <span className="italic text-[#C9A96E]">Celebrations</span>
          </h2>
        </div>

        {/* Mobile festival selector — chips */}
        <div className="no-scrollbar -mx-4 mt-8 flex gap-2.5 overflow-x-auto px-4 pb-1 sm:-mx-8 sm:px-8 lg:hidden">
          {FESTIVE_CELEBRATIONS.map((f, i) => {
            const Icon = f.Icon;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={cn(
                  'flex min-h-[44px] shrink-0 items-center gap-2 rounded-full border px-5 py-2.5 font-sans text-[12px] font-bold uppercase tracking-[0.1em] transition-all',
                  i === active
                    ? 'border-[#C9A96E] bg-[#C9A96E] text-[#1A1010]'
                    : 'border-white/20 bg-white/5 text-white/80'
                )}
              >
                <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
                {SHORT_NAMES[f.id] ?? f.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid gap-8 lg:mt-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch lg:gap-14">
          {/* Desktop festival menu — editorial index */}
          <div className="hidden flex-col justify-center lg:flex" role="list">
            {FESTIVE_CELEBRATIONS.map((f, i) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={cn(
                  'group flex items-center gap-5 border-b border-white/10 py-5 text-left transition-all duration-300 first:border-t',
                  i === active ? 'pl-2' : 'opacity-45 hover:pl-2 hover:opacity-80'
                )}
              >
                <span className="font-sans text-[11px] font-bold tabular-nums tracking-[0.14em] text-[#C9A96E]">
                  0{i + 1}
                </span>
                <span
                  className={cn(
                    'font-serif text-[clamp(1.5rem,2vw,2rem)] leading-tight transition-colors duration-300',
                    i === active ? 'italic text-[#C9A96E]' : 'text-white'
                  )}
                >
                  {f.label}
                </span>
                <ArrowRight
                  className={cn(
                    'ml-auto h-5 w-5 shrink-0 text-[#C9A96E] transition-all duration-300',
                    i === active ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'
                  )}
                  strokeWidth={2}
                  aria-hidden
                />
              </button>
            ))}

            <p className="mt-6 font-sans text-[12px] leading-relaxed text-white/50">
              Curated gifts for every festival — pick a celebration to preview its collection.
            </p>
          </div>

          {/* Cinematic spotlight panel */}
          <div className="relative overflow-hidden rounded-[1.5rem] shadow-[0_32px_80px_-24px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
            <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[480px]">
              {/* Crossfading image stack */}
              {FESTIVE_CELEBRATIONS.map((f, i) => (
                <div
                  key={f.id}
                  className={cn(
                    'absolute inset-0 transition-opacity duration-700 ease-out',
                    i === active ? 'opacity-100' : 'opacity-0'
                  )}
                  aria-hidden={i !== active}
                >
                  <AppImage
                    src={f.image}
                    alt={i === active ? f.imageAlt : ''}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className={cn(
                      'object-cover transition-transform duration-[7000ms] ease-out',
                      i === active ? 'scale-105' : 'scale-100'
                    )}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${FESTIVE_TINTS[f.id] ?? tint} to-transparent`} />
                </div>
              ))}

              {/* Oversized ghost number */}
              <span
                key={`num-${current.id}`}
                className="pointer-events-none absolute right-4 top-2 font-serif text-[110px] font-bold leading-none text-white/10 sm:text-[140px]"
                aria-hidden
              >
                0{active + 1}
              </span>

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
                <p
                  key={`tag-${current.id}`}
                  className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A96E]"
                >
                  {FESTIVE_TAGLINES[current.id] ?? 'Celebrate in style'}
                </p>
                <h3
                  key={`title-${current.id}`}
                  className="mt-2 font-serif text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.15] text-white"
                >
                  {current.label}
                </h3>
                <Link
                  to={current.href}
                  className="group mt-6 inline-flex min-h-[48px] w-fit items-center gap-2.5 rounded-full bg-white px-7 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#1A1010] transition-all hover:bg-[#C9A96E]"
                >
                  Shop {SHORT_NAMES[current.id] ?? 'festival'} gifts
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.25} aria-hidden />
                </Link>

                {/* Progress indicators */}
                <div className="mt-7 flex items-center gap-2" aria-hidden>
                  {FESTIVE_CELEBRATIONS.map((f, i) => (
                    <button
                      key={f.id}
                      type="button"
                      tabIndex={-1}
                      onClick={() => setActive(i)}
                      className={cn(
                        'h-1 rounded-full transition-all duration-500',
                        i === active ? 'w-8 bg-[#C9A96E]' : 'w-2.5 bg-white/25'
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
