import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { GIFTS_BY_BUDGET } from '@/config/personalizedSections';
import { cn } from '@/utils/cn';

const BUDGET_META: Record<string, { price: string; accent: string; bg: string; border: string }> = {
  'under-499': {
    price: '₹499',
    accent: 'text-[#6B6560]',
    bg: 'bg-white',
    border: 'border-[#EBEBEB]',
  },
  'under-999': {
    price: '₹999',
    accent: 'text-[#9D7D47]',
    bg: 'bg-white',
    border: 'border-[#C9A96E]/25',
  },
  'under-1999': {
    price: '₹1,999',
    accent: 'text-[#6B1E30]',
    bg: 'bg-[#FAF0F3]',
    border: 'border-[#6B1E30]/20',
  },
  'premium-gifts': {
    price: 'Premium',
    accent: 'text-[#C9A96E]',
    bg: 'bg-[#4A1020]',
    border: 'border-[#C9A96E]/40',
  },
};

export default function GiftsByBudgetSection() {
  return (
    <section
      id="gifts-by-budget"
      className="section-pad scroll-mt-28 section-alt"
      aria-labelledby="budget-heading"
    >
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Shop smart</p>
          <h2 id="budget-heading" className="section-heading mt-2">
            Gifts by <span className="text-[#6B1E30]">Budget</span>
          </h2>
          <p className="section-lede mx-auto mt-4">
            Thoughtful gifting at every price point — find the perfect present without compromise.
          </p>
        </div>

        {/* Price ladder — ascending tiers */}
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-4">
          {GIFTS_BY_BUDGET.map((item, i) => {
            const meta = BUDGET_META[item.id] ?? BUDGET_META['under-499'];
            const isPremium = item.id === 'premium-gifts';
            const isLast = i === GIFTS_BY_BUDGET.length - 1;

            return (
              <Link
                key={item.id}
                to={item.href}
                className={cn(
                  'group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
                  meta.bg,
                  meta.border,
                  isLast && 'lg:scale-105 lg:shadow-[0_16px_40px_-12px_rgba(74,16,32,0.25)]'
                )}
              >
                {/* Tier connector line (desktop) */}
                {i < GIFTS_BY_BUDGET.length - 1 && (
                  <div
                    className="pointer-events-none absolute -right-2 top-1/2 hidden h-0.5 w-4 -translate-y-1/2 bg-[#C9A96E]/40 lg:block"
                    aria-hidden
                  />
                )}

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p
                    className={cn(
                      'font-serif text-[clamp(2rem,4vw,2.75rem)] font-bold leading-none tracking-tight',
                      isPremium ? 'text-[#C9A96E]' : meta.accent
                    )}
                  >
                    {meta.price}
                  </p>
                  <p className={cn('mt-1 font-sans text-[10px] font-bold uppercase tracking-[0.16em]', isPremium ? 'text-white/60' : 'text-[#9a9490]')}>
                    {isPremium ? 'No limit' : '& below'}
                  </p>
                  <p className={cn('mt-4 font-serif text-[16px] font-semibold', isPremium ? 'text-white' : 'text-[#1A1010]')}>
                    {item.label}
                  </p>
                  <span
                    className={cn(
                      'mt-auto inline-flex items-center gap-2 pt-6 text-[11px] font-bold uppercase tracking-[0.14em] transition group-hover:gap-3',
                      isPremium ? 'text-[#C9A96E]' : 'text-[#6B1E30]'
                    )}
                  >
                    Browse gifts
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                </div>

                {/* Bottom accent bar */}
                <div
                  className={cn(
                    'h-1 w-full',
                    isPremium ? 'bg-[#C9A96E]' : i === 0 ? 'bg-[#e8e4e1]' : i === 1 ? 'bg-[#C9A96E]/50' : 'bg-[#6B1E30]/60'
                  )}
                  aria-hidden
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
