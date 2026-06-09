import { Link } from 'react-router-dom';
import AppImage from '@/components/ui/AppImage';
import { ArrowRight, Gift } from 'lucide-react';
import { MOST_LOVED_HAMPERS } from '@/config/personalizedSections';
import { cn } from '@/utils/cn';

export default function MostLovedHampersSection() {
  const [featured, ...rest] = MOST_LOVED_HAMPERS;
  const FeaturedIcon = featured.Icon;

  return (
    <section
      id="celebrations"
      className="section-pad scroll-mt-28 bg-white"
      aria-labelledby="most-loved-heading"
    >
      <div className="section-container">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">Celebrations</p>
            <h2 id="most-loved-heading" className="section-heading mt-2">
              Most Loved Gift <span className="text-[#6B1E30]">Hampers</span>
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#6b6560]">
              Handpicked hampers for life&apos;s biggest moments — from birthdays to weddings and everything in between.
            </p>
          </div>
          <Link
            to="/shop/browse?cat=hampers"
            className="inline-flex shrink-0 items-center gap-2 self-start font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-[#6B1E30] hover:text-[#4A0E1C] lg:self-auto"
          >
            View all hampers
            <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
          </Link>
        </div>

        {/* Bento editorial grid */}
        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-3 sm:gap-4 lg:mt-12 lg:grid-cols-12 lg:grid-rows-[auto_auto] lg:gap-5">
          {/* Featured large tile */}
          <Link
            to={featured.href}
            className="group relative col-span-2 row-span-2 overflow-hidden rounded-3xl bg-[#6B1E30] shadow-[0_20px_50px_-20px_rgba(74,16,32,0.45)] lg:col-span-5 lg:row-span-2 lg:min-h-[420px]"
          >
            <AppImage
              src={featured.image}
              alt={featured.imageAlt}
              fill
              sizes="(max-width:1024px) 100vw, 42vw"
              className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#4A1020]/95 via-[#4A1020]/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-[#C9A96E] backdrop-blur-sm">
                <FeaturedIcon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
              </div>
              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E]">Most popular</p>
              <h3 className="mt-1 font-serif text-[26px] font-semibold leading-tight text-white sm:text-[32px]">
                {featured.label}
              </h3>
              <span className="mt-4 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-white/90 transition group-hover:gap-3">
                Explore collection
                <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
              </span>
            </div>
          </Link>

          {/* Smaller bento tiles */}
          {rest.map((item, i) => {
            const Icon = item.Icon;
            const spanClass =
              i === 0
                ? 'lg:col-span-4 lg:col-start-6'
                : i === 1
                  ? 'lg:col-span-3 lg:col-start-10'
                  : i === 2
                    ? 'lg:col-span-3 lg:col-start-6'
                    : i === 3
                      ? 'lg:col-span-4 lg:col-start-9'
                      : i === 4
                        ? 'lg:col-span-4 lg:col-start-6'
                        : 'lg:col-span-3 lg:col-start-10';

            return (
              <Link
                key={item.id}
                to={item.href}
                className={cn(
                  'group relative overflow-hidden rounded-2xl border border-[#EBEBEB]/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg',
                  spanClass,
                  i >= 2 ? 'min-h-[140px] lg:min-h-[195px]' : 'min-h-[120px] lg:min-h-[195px]'
                )}
              >
                <div className="absolute inset-0">
                  <AppImage
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="280px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
                <div className="relative flex h-full min-h-[inherit] flex-col justify-end p-4">
                  <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#6B1E30] text-white shadow-md">
                    <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                  </div>
                  <p className="font-serif text-[14px] font-semibold leading-snug text-white sm:text-[15px]">{item.label}</p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center lg:hidden">
          <Link to="/hamper-builder" className="btn-pill btn-pill-maroon">
            <Gift className="h-4 w-4" strokeWidth={2} aria-hidden />
            Build Custom Hamper
          </Link>
        </div>
      </div>
    </section>
  );
}
