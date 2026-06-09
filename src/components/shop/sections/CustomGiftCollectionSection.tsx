import { Link } from 'react-router-dom';
import AppImage from '@/components/ui/AppImage';
import { ArrowRight, PenLine } from 'lucide-react';
import { CUSTOM_GIFT_COLLECTION } from '@/config/personalizedSections';
import { cn } from '@/utils/cn';

export default function CustomGiftCollectionSection() {
  return (
    <section
      id="custom-gift-collection"
      className="section-pad scroll-mt-28 bg-white"
      aria-labelledby="custom-gift-heading"
    >
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FAF0F3] text-[#6B1E30]">
            <PenLine className="h-5 w-5" strokeWidth={1.75} aria-hidden />
          </div>
          <h1 id="custom-gift-heading" className="section-heading">
            Custom Gift <span className="text-[#6B1E30]">Collection</span>
          </h1>
          <p className="section-lede mx-auto mt-4">
            Make it truly yours — personalized photo gifts, engraved keepsakes, and custom creations.
          </p>
        </div>

        {/* Zigzag alternating rows */}
        <div className="mx-auto mt-12 max-w-4xl space-y-3 sm:space-y-4 lg:mt-14">
          {CUSTOM_GIFT_COLLECTION.map((item, i) => {
            const Icon = item.Icon;
            const isEven = i % 2 === 0;

            return (
              <Link
                key={item.id}
                to={item.href}
                className={cn(
                  'group flex overflow-hidden rounded-2xl border border-[#ebe6e0]/70 bg-[#FAFAF8] transition-all duration-300 hover:border-[#C9A96E]/40 hover:shadow-[0_12px_40px_-12px_rgba(74,16,32,0.15)]',
                  isEven ? 'flex-row' : 'flex-row-reverse'
                )}
              >
                <div className="relative w-[38%] min-w-[120px] shrink-0 sm:w-[32%]">
                  <div className="relative aspect-[4/3] h-full min-h-[100px] sm:min-h-[120px]">
                    <AppImage
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="200px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="flex min-w-0 flex-1 items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5">
                  <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#6B1E30] text-white shadow-sm sm:h-11 sm:w-11">
                      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <p className="font-serif text-[15px] font-semibold text-[#1A1010] sm:text-[17px]">{item.label}</p>
                      <p className="mt-0.5 hidden text-[13px] text-[#6b6560] sm:block">Personalize &amp; order</p>
                    </div>
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#ebe6e0] bg-white text-[#6B1E30] transition-all group-hover:border-[#6B1E30] group-hover:bg-[#6B1E30] group-hover:text-white">
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
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
