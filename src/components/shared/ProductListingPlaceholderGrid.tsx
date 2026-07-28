/**
 * Temporary 20-card placeholder grid for product listing pages.
 * Title/description are stubs (ABC / 123) until real content is wired.
 */
const PLACEHOLDER_ITEMS = Array.from({ length: 20 }, (_, i) => ({
  id: `placeholder-${i + 1}`,
  title: 'ABC',
  description: '123',
}));

type ProductListingPlaceholderGridProps = {
  /** Optional aria label for the listing region */
  label?: string;
};

export default function ProductListingPlaceholderGrid({
  label = 'Product listing placeholders',
}: ProductListingPlaceholderGridProps) {
  return (
    <div aria-label={label}>
      {/* Desktop / tablet: compact multi-column grid */}
      <div className="hidden sm:grid sm:grid-cols-2 sm:gap-4 md:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {PLACEHOLDER_ITEMS.map((item) => (
          <article
            key={item.id}
            className="flex flex-col overflow-hidden rounded-xl border border-border bg-white"
          >
            <div className="aspect-[5/4] bg-gradient-to-br from-[#F7F2EA] via-[#F0EAE0] to-[#E8E0D4]" aria-hidden />
            <div className="flex flex-1 flex-col px-3.5 py-3 sm:px-4 sm:py-3.5">
              <h3 className="font-serif text-[15px] font-semibold leading-snug text-[#4A1020] sm:text-[16px]">
                {item.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-[12.5px] leading-relaxed text-[#6E6360]">
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Mobile: shorter cards + horizontal swipe so they are not overly tall */}
      <div className="sm:hidden">
        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {PLACEHOLDER_ITEMS.map((item) => (
            <article
              key={item.id}
              className="flex w-[42vw] min-w-[9.5rem] max-w-[11.5rem] shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-border bg-white"
            >
              <div className="aspect-[5/4] bg-gradient-to-br from-[#F7F2EA] via-[#F0EAE0] to-[#E8E0D4]" aria-hidden />
              <div className="flex flex-1 flex-col px-2.5 py-2.5">
                <h3 className="font-serif text-[13px] font-semibold leading-snug text-[#4A1020]">
                  {item.title}
                </h3>
                <p className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-[#6E6360]">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-2 font-sans text-[11px] font-medium tracking-wide text-[#8C847C]">
          Swipe cards to explore →
        </p>
      </div>
    </div>
  );
}
