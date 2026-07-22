import { useMemo, useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Gift, ShieldCheck, Trophy, Headphones } from 'lucide-react';
import { ALPHABET, BRANDS } from '@/config/brandsData';

type Brand = (typeof BRANDS)[number];

export default function BrandsPage() {
  const [activeLetter, setActiveLetter] = useState<string>('ALL');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Mobile Accordion state: map of letter -> boolean (whether expanded)
  const [expandedAccordions, setExpandedAccordions] = useState<Record<string, boolean>>({
    A: true, // Default open letter A accordion to match mobile reference exactly
  });

  // Automatically reset pagination when category or alphabet filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeLetter, activeCategory]);

  // Group brands by starting letter for the mobile accordion view
  const groupedBrands = useMemo(() => {
    const map = new Map<string, Brand[]>();
    for (const letter of ALPHABET) {
      map.set(letter, []);
    }
    
    // Sort all brands alphabetically so they look highly polished in letter-based accordions
    const sortedBrands = [...BRANDS].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    
    // De-duplicate items with same name in letter sections
    const seen = new Set<string>();
    for (const brand of sortedBrands) {
      const key = `${brand.letter}-${brand.name.toLowerCase()}`;
      if (!seen.has(key)) {
        seen.add(key);
        map.get(brand.letter)?.push(brand);
      }
    }
    return map;
  }, []);

  // Filter brands based on selected letter (Alphabet Bar) and category (Sidebar)
  const filteredBrands = useMemo(() => {
    let result = [...BRANDS];

    // 1. Filter by category
    if (activeCategory !== 'all') {
      result = result.filter(brand => brand.tags.includes(activeCategory));
    }

    // 2. Filter by selected starting letter
    if (activeLetter !== 'ALL') {
      result = result.filter(brand => brand.letter === activeLetter);
    }

    // De-duplicate by name to ensure clean, distinct grid elements
    const seen = new Set<string>();
    return result.filter(brand => {
      const nameKey = brand.name.toLowerCase();
      if (seen.has(nameKey)) return false;
      seen.add(nameKey);
      return true;
    });
  }, [activeLetter, activeCategory]);

  // Pagination calculation
  const ITEMS_PER_PAGE = 20;
  const totalItems = filteredBrands.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const paginatedBrands = useMemo(() => {
    // If we've selected a specific letter filter, disable pagination page-splitting
    // so they can see all brands for that letter at once
    if (activeLetter !== 'ALL') {
      return filteredBrands;
    }
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBrands.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredBrands, currentPage, activeLetter]);

  // Toggle mobile accordion expand/collapse state
  const toggleAccordion = (letter: string) => {
    setExpandedAccordions(prev => ({
      ...prev,
      [letter]: !prev[letter],
    }));
  };

  // Click letter from mobile or desktop alphabet filter bar
  const handleLetterClick = (letter: string) => {
    setActiveLetter(letter);

    // If on mobile (detected by screen width or accordion interaction),
    // automatically expand that accordion and scroll to it smoothly
    if (window.innerWidth < 768 && letter !== 'ALL') {
      setExpandedAccordions(prev => ({ ...prev, [letter]: true }));
      setTimeout(() => {
        const element = document.getElementById(`accordion-${letter}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#2C2523] font-sans antialiased">
      <Navbar />

      {/* Main Container */}
      <main className="page-main-offset flex-grow pb-16">
        
        {/* Breadcrumb section */}
        <div className="border-b border-[#EBEBEB]/40 bg-white">
          <div className="section-container py-3">
            <nav className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8C7A76]">
              <a href="/" className="hover:text-[#4A1020] transition-colors">Home</a>
              <span className="text-[#C9A96E]/80">&gt;</span>
              <span className="text-[#4A1020] font-bold">Brands</span>
            </nav>
          </div>
        </div>

        {/* Header Titles & Decorative Dividers */}
        <section className="flex flex-col items-center justify-center py-10 text-center">
          <h1 className="font-serif text-[32px] font-normal tracking-[0.06em] text-[#4A1020] uppercase md:text-[42px] leading-tight">
            OUR BRANDS
          </h1>
          {/* Gold Divider Ribbon matching both layouts */}
          <div className="my-4 flex items-center justify-center gap-6 w-full max-w-md">
            <span className="h-[1.5px] w-24 bg-gradient-to-r from-transparent to-[#C9A96E]/70" />
            <Gift className="h-5 w-5 text-[#C9A96E] animate-pulse" strokeWidth={1.5} />
            <span className="h-[1.5px] w-24 bg-gradient-to-l from-transparent to-[#C9A96E]/70" />
          </div>
          <p className="section-lede mx-auto px-4 text-center text-[#6E6360] font-medium leading-relaxed max-w-[650px] text-[13px] md:text-[14.5px]">
            Curated collection of leading brands. Click on any brand to explore products and submit your enquiry for corporate gifting requirements.
          </p>
        </section>

        {/* ─── ALPHABET FILTER BAR (Desktop & Mobile Responsive Styles) ─── */}
        <section className="section-container mb-8">
          <div className="rounded-[1.2rem] border border-[#EBEBEB]/75 bg-white p-3.5 shadow-[0_4px_16px_rgba(74,16,32,0.02)] md:p-3">
            
            {/* Desktop Alphabet Bar (Single line, smooth spacing) */}
            <div className="hidden md:flex flex-wrap items-center justify-between gap-1 w-full px-2">
              <button
                type="button"
                onClick={() => handleLetterClick('ALL')}
                className={`h-7 px-3.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider transition-all duration-300 ${
                  activeLetter === 'ALL'
                    ? 'bg-[#4A1020] text-white shadow-[0_4px_10px_rgba(74,16,32,0.2)]'
                    : 'text-[#4A1020] hover:bg-white'
                }`}
              >
                ALL
              </button>
              {ALPHABET.map((letter) => {
                const hasBrands = (groupedBrands.get(letter)?.length ?? 0) > 0;
                return (
                  <button
                    key={letter}
                    type="button"
                    disabled={!hasBrands}
                    onClick={() => handleLetterClick(letter)}
                    className={`h-7 w-7 rounded-full text-[11px] font-extrabold transition-all duration-300 ${
                      activeLetter === letter
                        ? 'bg-[#4A1020] text-white shadow-[0_4px_10px_rgba(74,16,32,0.2)]'
                        : hasBrands
                        ? 'text-[#4A1020] hover:bg-white cursor-pointer'
                        : 'text-[#C8C2BE] opacity-35 cursor-not-allowed'
                    }`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>

            {/* Mobile Alphabet Bar — compact single-row strip, swipe sideways to reach more letters */}
            <div className="md:hidden">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <button
                  onClick={() => handleLetterClick('ALL')}
                  className={`h-8 shrink-0 rounded-full px-3.5 text-[11px] font-extrabold uppercase tracking-wider transition-all ${
                    activeLetter === 'ALL'
                      ? 'bg-[#4A1020] text-white shadow-[0_3px_8px_rgba(74,16,32,0.25)]'
                      : 'bg-[#F7F2EA] text-[#4A1020]'
                  }`}
                >
                  ALL
                </button>
                {ALPHABET.map((letter) => {
                  const hasBrands = (groupedBrands.get(letter)?.length ?? 0) > 0;
                  if (!hasBrands) return null;
                  return (
                    <button
                      key={letter}
                      onClick={() => handleLetterClick(letter)}
                      className={`h-8 w-8 shrink-0 rounded-full text-[11.5px] font-extrabold transition-all ${
                        activeLetter === letter
                          ? 'bg-[#4A1020] text-white shadow-[0_3px_8px_rgba(74,16,32,0.25)]'
                          : 'bg-[#F7F2EA] text-[#4A1020]'
                      }`}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
              <p className="mt-1.5 text-center text-[9px] font-bold uppercase tracking-[0.14em] text-[#C9A96E]">
                Swipe letters · Tap to jump to a brand
              </p>
            </div>

          </div>
        </section>

        {/* ─── DESKTOP TWO-COLUMN LAYOUT (Screen width >= 768px) ─── */}
        <div className="hidden md:block section-container">
          <div className="grid grid-cols-[240px_1fr] gap-8 items-start">
            
            {/* Left Sidebar Filter Section */}
            <aside className="space-y-6">
              
              {/* Browse brands category card */}
              <div className="rounded-[1.2rem] border border-[#EBEBEB]/60 bg-white p-5 shadow-sm">
                <h3 className="font-sans text-[13.5px] font-extrabold uppercase tracking-[0.16em] text-[#4A1020] mb-4 pb-2 border-b border-[#F0F0F0]">
                  BROWSE BRANDS
                </h3>
                <nav className="flex flex-col gap-1 text-[13.5px] font-bold text-[#6E6360]">
                  {[
                    { key: 'all', label: 'All Brands' },
                    { key: 'top', label: 'Top Brands' },
                    { key: 'new', label: 'New Brands' },
                    { key: 'popular', label: 'Popular Brands' },
                  ].map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setActiveCategory(cat.key)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300 ${
                        activeCategory === cat.key
                          ? 'bg-white text-[#C9A96E] pl-4.5 shadow-[inset_3px_0_0_#C9A96E]'
                          : 'hover:text-[#4A1020] hover:bg-black/[0.01]'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <ChevronRight className={`h-3.5 w-3.5 transition-transform duration-300 ${activeCategory === cat.key ? 'translate-x-0.5' : 'opacity-40'}`} strokeWidth={2.5} />
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Right Side Logos Grid */}
            <div className="space-y-8">
              {paginatedBrands.length > 0 ? (
                <div>
                  {/* Results header — always tells the user exactly what they are viewing */}
                  <div className="mb-5 flex items-end justify-between border-b border-[#EBE3D8] pb-3">
                    <div>
                      <h2 className="font-serif text-[19px] font-bold text-[#4A1020]">
                        {activeLetter !== 'ALL'
                          ? `Brands starting with "${activeLetter}"`
                          : activeCategory === 'top'
                          ? 'Top Brands'
                          : activeCategory === 'new'
                          ? 'New Brands'
                          : activeCategory === 'popular'
                          ? 'Popular Brands'
                          : 'All Brands'}
                      </h2>
                      <span className="mt-1 block h-[2px] w-10 rounded-full bg-gradient-to-r from-[#C9A96E] to-transparent" />
                    </div>
                    <span className="rounded-full bg-[#F7F2EA] px-3 py-1 text-[10.5px] font-extrabold uppercase tracking-[0.1em] text-[#8B5A2B]">
                      {totalItems} {totalItems === 1 ? 'Brand' : 'Brands'}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-5 xl:grid-cols-5">
                    {paginatedBrands.map((brand) => (
                      <div
                        key={brand.name}
                        className="group relative rounded-[1.1rem] bg-gradient-to-br from-[#E9E1D4] via-[#F4EFE7] to-[#E9E1D4] p-[1.5px] transition-all duration-500 hover:from-[#C9A96E] hover:via-[#EBD9B4] hover:to-[#C9A96E] hover:-translate-y-1.5 hover:shadow-[0_16px_32px_rgba(74,16,32,0.14)] cursor-pointer select-none"
                      >
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[1rem] bg-white">

                          {/* Shine sweep on hover */}
                          <span
                            aria-hidden
                            className="pointer-events-none absolute inset-y-0 left-[-60%] z-20 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:left-[110%] group-hover:opacity-100"
                          />

                          {/* Top / New / Popular badge */}
                          {(brand.tags.includes('top') || brand.tags.includes('new') || brand.tags.includes('popular')) && (
                            <span className="absolute right-2 top-2 z-10 rounded-full bg-gradient-to-r from-[#4A1020] to-[#6B1A32] px-2.5 py-[3px] text-[7.5px] font-extrabold uppercase tracking-[0.16em] text-[#EBD9B4] shadow-[0_2px_6px_rgba(74,16,32,0.3)] ring-1 ring-[#C9A96E]/40">
                              {brand.tags.includes('top') ? '★ Top' : brand.tags.includes('popular') ? '♦ Popular' : '✦ New'}
                            </span>
                          )}

                          {/* Logo well with radial glow and gold corner accents */}
                          <div className="relative flex h-[96px] w-full items-center justify-center bg-[radial-gradient(ellipse_at_center,#FFFDF9_0%,#F7F2EA_100%)] p-4">
                            {/* Corner accents */}
                            <span aria-hidden className="absolute left-2 top-2 h-3 w-3 border-l-[1.5px] border-t-[1.5px] border-[#C9A96E]/45 rounded-tl-sm transition-all duration-300 group-hover:border-[#C9A96E] group-hover:h-4 group-hover:w-4" />
                            <span aria-hidden className="absolute bottom-2 right-2 h-3 w-3 border-b-[1.5px] border-r-[1.5px] border-[#C9A96E]/45 rounded-br-sm transition-all duration-300 group-hover:border-[#C9A96E] group-hover:h-4 group-hover:w-4" />

                            {brand.image ? (
                              <img
                                src={brand.image}
                                alt={brand.name}
                                className="max-h-full max-w-[78%] rounded-md object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-[1.08]"
                                loading="lazy"
                              />
                            ) : (
                              <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-gradient-to-br from-[#4A1020] to-[#6B1A32] font-serif text-[22px] font-bold text-[#EBD9B4] shadow-[0_4px_10px_rgba(74,16,32,0.25)] ring-2 ring-[#C9A96E]/30 ring-offset-2 ring-offset-[#F7F2EA] transition-transform duration-500 group-hover:scale-[1.08]">
                                {brand.name.charAt(0).toUpperCase()}
                              </span>
                            )}
                          </div>

                          {/* Gold hairline divider */}
                          <div className="flex items-center gap-2 px-4">
                            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A96E]/50 to-transparent" />
                            <span className="h-[3px] w-[3px] rotate-45 bg-[#C9A96E]/70" />
                            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A96E]/50 to-transparent" />
                          </div>

                          {/* Brand name + hover CTA */}
                          <div className="flex flex-col items-center gap-0.5 px-2 pb-3 pt-2 text-center">
                            <span className="w-full truncate font-serif text-[12.5px] font-bold tracking-[0.05em] text-[#4A1020] transition-colors duration-300 group-hover:text-[#8B5A2B]">
                              {brand.name}
                            </span>
                            <span className="relative h-[12px] w-full overflow-hidden">
                              <span className="absolute inset-0 flex items-center justify-center text-[7.5px] font-extrabold uppercase tracking-[0.18em] text-[#C9A96E]/80 transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0">
                                Premium Gifting
                              </span>
                              <span className="absolute inset-0 flex translate-y-full items-center justify-center gap-1 text-[7.5px] font-extrabold uppercase tracking-[0.18em] text-[#4A1020] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                Explore Gifts <ChevronRight className="h-2.5 w-2.5" strokeWidth={3} />
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination and showing count */}
                  <div className="mt-10 flex flex-col items-center justify-center gap-4">
                    <p className="font-sans text-[12px] font-bold text-[#8C7A76] uppercase tracking-[0.1em]">
                      Showing {activeLetter !== 'ALL' ? `1 - ${filteredBrands.length}` : `${(currentPage - 1) * ITEMS_PER_PAGE + 1} - ${Math.min(currentPage * ITEMS_PER_PAGE, totalItems)}`} of {totalItems} brands
                    </p>
                    
                    {/* Pagination Controls */}
                    {activeLetter === 'ALL' && totalPages > 1 && (
                      <div className="flex items-center gap-1.5">
                        <button
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          className={`h-8 w-8 inline-flex items-center justify-center rounded-full border border-[#EBEBEB]/60 transition-all ${
                            currentPage === 1
                              ? 'text-[#C8C2BE] opacity-35 cursor-not-allowed'
                              : 'text-[#4A1020] hover:bg-white hover:border-[#C9A96E] cursor-pointer'
                          }`}
                        >
                          <ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
                        </button>
                        
                        {Array.from({ length: totalPages }).map((_, index) => {
                          const pageNum = index + 1;
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`h-8 w-8 inline-flex items-center justify-center rounded-full text-[12.5px] font-extrabold transition-all duration-300 ${
                                currentPage === pageNum
                                  ? 'bg-[#4A1020] text-white shadow-md'
                                  : 'text-[#4A1020] hover:bg-white cursor-pointer'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}

                        <button
                          disabled={currentPage === totalPages}
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                          className={`h-8 w-8 inline-flex items-center justify-center rounded-full border border-[#EBEBEB]/60 transition-all ${
                            currentPage === totalPages
                              ? 'text-[#C8C2BE] opacity-35 cursor-not-allowed'
                              : 'text-[#4A1020] hover:bg-white hover:border-[#C9A96E] cursor-pointer'
                          }`}
                        >
                          <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="rounded-[1.2rem] border border-[#EBEBEB]/60 bg-white p-12 text-center space-y-4 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#C9A96E] mx-auto">
                    <Gift className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-[18px] font-semibold text-[#4A1020]">No brands match your selection</h3>
                  <p className="text-[13px] font-medium text-[#8C7A76] max-w-sm mx-auto">
                    Try selecting a different letter from the alphabet filter or checking a different collection.
                  </p>
                  <button
                    onClick={() => {
                      setActiveLetter('ALL');
                      setActiveCategory('all');
                    }}
                    className="inline-flex items-center justify-center rounded-full bg-[#4A1020] text-white hover:bg-[#5C1629] transition-all px-6 py-2.5 text-[11px] font-sans font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* ─── MOBILE ACCORDION LAYOUT (Screen width < 768px) ─── */}
        <div className="block md:hidden section-container">
          <div className="space-y-3">
            {ALPHABET.map((letter) => {
              const brandsForLetter = groupedBrands.get(letter) ?? [];
              if (brandsForLetter.length === 0) return null; // Only show sections that have brands

              const isOpen = expandedAccordions[letter] ?? false;

              return (
                <section key={letter} id={`accordion-${letter}`} className="border-b border-[#EBEBEB]/40 pb-2">
                  
                  {/* Accordion Header — slim row: letter chip, count, chevron */}
                  <button
                    onClick={() => toggleAccordion(letter)}
                    className="w-full flex items-center justify-between py-2.5 text-left focus:outline-none active:opacity-70"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#4A1020] font-sans text-[12px] font-extrabold text-white uppercase shadow-sm">
                        {letter}
                      </div>
                      <span className="truncate font-sans text-[12px] font-extrabold uppercase tracking-[0.1em] text-[#4A1020]">
                        Brands · {letter}
                      </span>
                      <span className="shrink-0 rounded-full bg-[#F7F2EA] px-2 py-[2px] text-[9.5px] font-extrabold text-[#8B5A2B]">
                        {brandsForLetter.length}
                      </span>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 shrink-0 text-[#C9A96E]" strokeWidth={2.5} />
                    ) : (
                      <ChevronDown className="h-4 w-4 shrink-0 text-[#C9A96E]" strokeWidth={2.5} />
                    )}
                  </button>

                  {/* Accordion Body Content — clean 2-col cards, big logos, readable names */}
                  {isOpen && (
                    <div className="mt-2 pb-3">
                      <div className="grid grid-cols-2 gap-3">
                        {brandsForLetter.map((brand) => (
                          <div
                            key={brand.name}
                            className="flex flex-col overflow-hidden rounded-xl border border-[#EBE3D8] bg-white shadow-[0_2px_8px_rgba(74,16,32,0.05)] select-none active:scale-[0.98] transition-transform"
                          >
                            <div className="flex h-[84px] w-full items-center justify-center bg-[#FAF7F2] p-3">
                              {brand.image ? (
                                <img
                                  src={brand.image}
                                  alt={brand.name}
                                  className="max-h-full max-w-[75%] rounded-md object-contain"
                                  loading="lazy"
                                />
                              ) : (
                                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#4A1020] to-[#6B1A32] font-serif text-[18px] font-bold text-[#EBD9B4] ring-1 ring-[#C9A96E]/40">
                                  {brand.name.charAt(0).toUpperCase()}
                                </span>
                              )}
                            </div>
                            <div className="flex flex-col items-center gap-[2px] border-t border-[#F0EAE0] px-2 py-2 text-center">
                              <span className="w-full truncate font-sans text-[11px] font-extrabold text-[#4A1020]">
                                {brand.name}
                              </span>
                              <span className="text-[7.5px] font-extrabold uppercase tracking-[0.16em] text-[#C9A96E]">
                                Premium Gifting
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </section>
              );
            })}
          </div>
        </div>

      </main>

      {/* ─── TRUST BANNER FEATURE BAR (Beautiful, premium highlight above footer) ─── */}
      <section className="border-y border-[#EBEBEB]/50 bg-white py-8 md:py-9">
        <div className="section-container">
          <div className="grid grid-cols-2 gap-y-6 gap-x-4 md:grid-cols-4 md:gap-6">
            
            {/* Item 1 */}
            <div className="flex items-start gap-3 w-full pl-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#4A1020]/[0.04] border border-[#C9A96E]/20 text-[#C9A96E]">
                <Gift className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div className="min-w-0 pt-0.5">
                <h5 className="font-sans text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#4A1020] leading-none">
                  {BRANDS.length}+ Premium Brands
                </h5>
                <p className="mt-1 text-[11px] font-semibold text-[#8C7A76] truncate">
                  Curated with quality
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-start gap-3 w-full pl-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#4A1020]/[0.04] border border-[#C9A96E]/20 text-[#C9A96E]">
                <ShieldCheck className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div className="min-w-0 pt-0.5">
                <h5 className="font-sans text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#4A1020] leading-none">
                  100% Authentic
                </h5>
                <p className="mt-1 text-[11px] font-semibold text-[#8C7A76] truncate">
                  Genuine products assured
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-start gap-3 w-full pl-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#4A1020]/[0.04] border border-[#C9A96E]/20 text-[#C9A96E]">
                <Trophy className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div className="min-w-0 pt-0.5">
                <h5 className="font-sans text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#4A1020] leading-none">
                  Trusted by Thousands
                </h5>
                <p className="mt-1 text-[11px] font-semibold text-[#8C7A76] truncate">
                  Happy customers
                </p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="flex items-start gap-3 w-full pl-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#4A1020]/[0.04] border border-[#C9A96E]/20 text-[#C9A96E]">
                <Headphones className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div className="min-w-0 pt-0.5">
                <h5 className="font-sans text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#4A1020] leading-none">
                  Need Help?
                </h5>
                <p className="mt-1 text-[11px] font-semibold text-[#8C7A76] truncate">
                  We're here for you
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />

    </div>
  );
}
