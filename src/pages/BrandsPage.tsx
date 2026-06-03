import { useMemo, useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Gift, Check, X, ShieldCheck, Trophy, Headphones } from 'lucide-react';

type Brand = {
  name: string;
  image: string;
  letter: string;
  tags: string[];
};

// 50 premium brand database sorted alphabetically A-Z for visual excellence
// Sorted alphabetically for correct letter navigation and clean presentation
const BRANDS: Brand[] = [
  { name: 'Adidas', image: '/images/brands/imageye___-_imgi_93_f25939_ccba8b93bb264f559943bc9a569a56ac~mv2.jpg', letter: 'A', tags: ['popular', 'top'] },
  { name: 'Ajio', image: '/images/brands/imageye___-_imgi_1_white_letter_logo.png', letter: 'A', tags: ['popular'] },
  { name: 'Aldo', image: '/images/brands/imageye___-_imgi_94_f25939_0efc1d7beee545bbbd9753619ce6c2b7~mv2.jpg', letter: 'A', tags: ['popular'] },
  { name: 'Amazon', image: '/images/brands/imageye___-_imgi_100_f25939_7f99461f862e447a866cdc45d9194707~mv2.png', letter: 'A', tags: ['top', 'popular'] },
  { name: 'Amos', image: '/images/brands/imageye___-_imgi_56_f25939_c835095db04e4a8cbd3f7305b54fbf39~mv2.webp', letter: 'A', tags: ['new'] },
  { name: 'Apple', image: '/images/brands/imageye___-_imgi_101_f25939_0ca66acadc894ec48e3f3101f9de8e82~mv2.png', letter: 'A', tags: ['top'] },
  { name: 'Aquaminder', image: '/images/brands/imageye___-_imgi_55_f25939_cfc1e05faf5b456787722bc06761a849~mv2.png', letter: 'A', tags: ['new'] },
  { name: 'Art of Puja', image: '/images/brands/imageye___-_imgi_54_images.png', letter: 'A', tags: ['new'] },
  { name: 'Asics', image: '/images/brands/imageye___-_imgi_102_f25939_5f5fe90d6aa64485bfe21606c4da0f03~mv2.png', letter: 'A', tags: ['popular'] },
  { name: 'Baskin Robbins', image: '/images/brands/imageye___-_imgi_63_bfbb3caf432d0c1370b99e805bb1eec3.jpg', letter: 'B', tags: ['popular'] },
  { name: 'Bata', image: '/images/brands/imageye___-_imgi_62_f25939_3d3e7896e243463d888c86ddcdf8516d~mv2.jpg', letter: 'B', tags: ['popular'] },
  { name: 'boAt', image: '/images/brands/imageye___-_imgi_60_1200px-Boat_Logo_webp.png', letter: 'B', tags: ['popular'] },
  { name: 'Bosch', image: '/images/brands/imageye___-_imgi_96_f25939_1d28301c8cb74a928c2f174887b77cb0~mv2.png', letter: 'B', tags: ['top'] },
  { name: 'BOSS', image: '/images/brands/imageye___-_imgi_61_f25939_758f5155520d4631b0bfdb148278e926~mv2.png', letter: 'B', tags: ['top'] },
  { name: 'Brooks', image: '/images/brands/imageye___-_imgi_57_f25939_c6dae1ef691c4d63996feabcd7a7ac7f~mv2.png', letter: 'B', tags: ['new'] },
  { name: 'Bvlgari', image: '/images/brands/imageye___-_imgi_58_f25939_6c16ac99c41b4158a0b5884edd7a1b59~mv2.png', letter: 'B', tags: ['top'] },
  { name: 'Canon', image: '/images/brands/imageye___-_imgi_89_f25939_976e794e93a2475a953cd8e8ab5a1dd4~mv2.webp', letter: 'C', tags: ['top'] },
  { name: 'Casio', image: '/images/brands/imageye___-_imgi_64_f25939_dded8338f9be4e0c81e03e6f8e141de1~mv2.png', letter: 'C', tags: ['popular'] },
  { name: 'Chokhi Dhani', image: '/images/brands/imageye___-_imgi_65_f25939_28aa483a85fe4f5885b6847966be2cc4~mv2.png', letter: 'C', tags: ['new'] },
  { name: 'Deep Roots Farms', image: '/images/brands/imageye___-_imgi_66_Deep-Roots-Farms-Logo.png', letter: 'D', tags: ['new'] },
  { name: 'Dyson', image: '/images/brands/imageye___-_imgi_67_f25939_d5ea3fc7c4c64914b810e362407b6b6a~mv2.png', letter: 'D', tags: ['top'] },
  { name: 'Fastrack', image: '/images/brands/imageye___-_imgi_97_f25939_9e056ee340d74b4ab8d1393696156cb6~mv2.png', letter: 'F', tags: ['popular'] },
  { name: 'Fuzo', image: '/images/brands/imageye___-_imgi_69_fuzo-logo-png_seeklogo-379183.png', letter: 'F', tags: ['new'] },
  { name: 'Garmin', image: '/images/brands/imageye___-_imgi_70_f25939_e73e17bc2cf24a9da4f98458a2720cc5~mv2.jpg', letter: 'G', tags: ['top'] },
  { name: 'Goodwyn Tea', image: '/images/brands/imageye___-_imgi_72_images (1).png', letter: 'G', tags: ['new'] },
  { name: 'Google', image: '/images/brands/imageye___-_imgi_68_f25939_24116c3d2b9e43bb9a766fc7e459b9e5~mv2.png', letter: 'G', tags: ['top'] },
  { name: 'Greenbrrew', image: '/images/brands/imageye___-_imgi_71_f25939_1ee5f8c905c848ac95b50adc1fcd5d8f~mv2.jpg', letter: 'G', tags: ['new'] },
  { name: 'Haldirams', image: '/images/brands/imageye___-_imgi_73_f25939_20b5069932c949f498ff3ed38f3f4dd6~mv2.jpg', letter: 'H', tags: ['popular'] },
  { name: 'JBL', image: '/images/brands/imageye___-_imgi_74_f25939_bea46c63b2634397bd084dd36f9e2c6a~mv2.jpg', letter: 'J', tags: ['popular', 'top'] },
  { name: 'JW Marriott', image: '/images/brands/imageye___-_imgi_75_images (1).jpg', letter: 'J', tags: ['top'] },
  { name: 'Levi\'s', image: '/images/brands/imageye___-_imgi_78_f25939_93e96b87aaf549a8b85ab328c3da6021~mv2.webp', letter: 'L', tags: ['top', 'popular'] },
  { name: 'MAX', image: '/images/brands/imageye___-_imgi_79_f25939_e785f3af7eac487190e320ce200cf213~mv2.jpg', letter: 'M', tags: ['popular'] },
  { name: 'Mokobara', image: '/images/brands/imageye___-_imgi_77_f25939_4b6db1de71e844a9bb1f01afe4f447b5~mv2.jpg', letter: 'M', tags: ['new'] },
  { name: 'Mont Blanc', image: '/images/brands/imageye___-_imgi_76_montblanc-logo-01.jpg', letter: 'M', tags: ['top'] },
  { name: 'Nedis', image: '/images/brands/imageye___-_imgi_82_f25939_78801ef87c674aed8c45f703911479fb~mv2.png', letter: 'N', tags: ['new'] },
  { name: 'Nike', image: '/images/brands/imageye___-_imgi_81_f25939_669985f3a21849aa9b3582eb8bb02506~mv2.jpg', letter: 'N', tags: ['top'] },
  { name: 'Nykaa', image: '/images/brands/imageye___-_imgi_83_f25939_b267a1aed9c34c5f9537121aafc6469d~mv2.jpg', letter: 'N', tags: ['popular'] },
  { name: 'OnePlus', image: '/images/brands/imageye___-_imgi_84_f25939_ee8429bd385146b4b81683716af2c425~mv2.png', letter: 'O', tags: ['top'] },
  { name: 'Philips', image: '/images/brands/imageye___-_imgi_86_f25939_222a0f3334c14200bc894872d56df5e5~mv2.png', letter: 'P', tags: ['top'] },
  { name: 'Puma', image: '/images/brands/imageye___-_imgi_85_f25939_df0169a718604fc5be5e846587486b63~mv2.png', letter: 'P', tags: ['top', 'popular'] },
  { name: 'Rage Coffee', image: '/images/brands/imageye___-_imgi_88_f25939_1959c258edbe46f5869947660dde28be~mv2.png', letter: 'R', tags: ['new'] },
  { name: 'Samsung', image: '/images/brands/imageye___-_imgi_90_f25939_6370213bb3fb402fb8d2de0de2da791d~mv2.png', letter: 'S', tags: ['top'] },
  { name: 'Sony', image: '/images/brands/imageye___-_imgi_87_f25939_754b6d43207240d7a150a8bb3c3918c8~mv2.jpg', letter: 'S', tags: ['top'] },
  { name: 'Swiss Military', image: '/images/brands/imageye___-_imgi_59_f25939_05b0deacf0c54c72982685b4ce2c1fba~mv2.webp', letter: 'S', tags: ['top', 'new'] },
  { name: 'Titan', image: '/images/brands/imageye___-_imgi_95_f25939_7a7c368ff262471fbb9a1cefa12e30b2~mv2.png', letter: 'T', tags: ['top', 'popular'] },
  { name: 'WD', image: '/images/brands/imageye___-_imgi_91_f25939_10bd114af209459281a5b9375c9289f4~mv2.png', letter: 'W', tags: ['top'] },
  { name: 'Wildcraft', image: '/images/brands/imageye___-_imgi_98_f25939_5de41c999f414bd8b9bbe76552ada5b6~mv2.png', letter: 'W', tags: ['popular'] },
  { name: 'WOW Skin', image: '/images/brands/imageye___-_imgi_99_f25939_4cbccbb08e854d39b71a60ce912947d7~mv2.png', letter: 'W', tags: ['new'] },
  { name: 'Zara', image: '/images/brands/imageye___-_imgi_92_f25939_1d0ee1be9d0b4cbea62b8d7f42845d37~mv2.webp', letter: 'Z', tags: ['top'] },
  { name: 'Zippo', image: '/images/brands/imageye___-_imgi_80_f25939_f3df2163653e492288009c6acaabad1c~mv2.png', letter: 'Z', tags: ['new'] },
];

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function BrandsPage() {
  const [activeLetter, setActiveLetter] = useState<string>('ALL');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [requestModalOpen, setRequestModalOpen] = useState<boolean>(false);
  const [requestSuccess, setRequestSuccess] = useState<boolean>(false);

  // Form states for "Request a Brand"
  const [brandRequestName, setBrandRequestName] = useState('');
  const [brandRequestEmail, setBrandRequestEmail] = useState('');
  const [brandRequestMsg, setBrandRequestMsg] = useState('');

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

  // Submit Brand request form
  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandRequestName || !brandRequestEmail) return;

    // Simulate luxury API response with micro-delay
    setTimeout(() => {
      setRequestSuccess(true);
      setBrandRequestName('');
      setBrandRequestEmail('');
      setBrandRequestMsg('');
    }, 600);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF8F5] text-[#2C2523] font-sans antialiased">
      <Navbar />

      {/* Main Container */}
      <main className="page-main-offset flex-grow pb-16">
        
        {/* Breadcrumb section */}
        <div className="border-b border-[#E8E0D8]/40 bg-[#FAF8F5]">
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
            Explore our wide range of trusted brands we collaborate with to bring you the best quality gifts and products.
          </p>
        </section>

        {/* ─── ALPHABET FILTER BAR (Desktop & Mobile Responsive Styles) ─── */}
        <section className="section-container mb-8">
          <div className="rounded-[1.2rem] border border-[#E8E0D8]/75 bg-white p-3.5 shadow-[0_4px_16px_rgba(74,16,32,0.02)] md:p-3">
            
            {/* Desktop Alphabet Bar (Single line, smooth spacing) */}
            <div className="hidden md:flex flex-wrap items-center justify-between gap-1 w-full px-2">
              <button
                type="button"
                onClick={() => handleLetterClick('ALL')}
                className={`h-7 px-3.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider transition-all duration-300 ${
                  activeLetter === 'ALL'
                    ? 'bg-[#4A1020] text-white shadow-[0_4px_10px_rgba(74,16,32,0.2)]'
                    : 'text-[#4A1020] hover:bg-[#FAF8F5]'
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
                        ? 'text-[#4A1020] hover:bg-[#FAF8F5] cursor-pointer'
                        : 'text-[#C8C2BE] opacity-35 cursor-not-allowed'
                    }`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>

            {/* Mobile Alphabet Bar (Grid alignment, split rows with dividers matching Image 2) */}
            <div className="flex md:hidden flex-wrap items-center justify-center gap-y-2 text-[12px] font-bold text-[#4A1020] tracking-wide">
              <button
                onClick={() => handleLetterClick('ALL')}
                className={`px-2 py-0.5 rounded-md transition-all ${
                  activeLetter === 'ALL' ? 'bg-[#4A1020] text-white' : ''
                }`}
              >
                ALL
              </button>
              <span className="text-[#E8E0D8] mx-1">|</span>
              {ALPHABET.map((letter, idx) => {
                const hasBrands = (groupedBrands.get(letter)?.length ?? 0) > 0;
                return (
                  <div key={letter} className="flex items-center">
                    <button
                      disabled={!hasBrands}
                      onClick={() => handleLetterClick(letter)}
                      className={`px-1.5 py-0.5 rounded-md transition-all ${
                        activeLetter === letter
                          ? 'bg-[#4A1020] text-white'
                          : !hasBrands
                          ? 'text-[#C8C2BE] opacity-40'
                          : ''
                      }`}
                    >
                      {letter}
                    </button>
                    {idx < ALPHABET.length - 1 && <span className="text-[#E8E0D8] mx-1">|</span>}
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ─── DESKTOP TWO-COLUMN LAYOUT (Screen width >= 768px) ─── */}
        <div className="hidden md:block section-container">
          <div className="grid grid-cols-[240px_1fr] gap-8 items-start">
            
            {/* Left Sidebar Filter Section */}
            <aside className="space-y-6">
              
              {/* Browse brands category card */}
              <div className="rounded-[1.2rem] border border-[#E8E0D8]/60 bg-white p-5 shadow-sm">
                <h3 className="font-sans text-[13.5px] font-extrabold uppercase tracking-[0.16em] text-[#4A1020] mb-4 pb-2 border-b border-[#FAF8F5]">
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
                          ? 'bg-[#FAF8F5] text-[#C9A96E] pl-4.5 shadow-[inset_3px_0_0_#C9A96E]'
                          : 'hover:text-[#4A1020] hover:bg-black/[0.01]'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <ChevronRight className={`h-3.5 w-3.5 transition-transform duration-300 ${activeCategory === cat.key ? 'translate-x-0.5' : 'opacity-40'}`} strokeWidth={2.5} />
                    </button>
                  ))}
                </nav>
              </div>

              {/* Request a Brand Callout Container */}
              <div className="rounded-[1.2rem] border-2 border-[#E8E0D8]/80 bg-white p-5 shadow-sm relative overflow-hidden group">
                {/* Visual subtle corner pattern */}
                <div className="absolute top-0 right-0 h-16 w-16 bg-[#FAF8F5] rounded-bl-full border-l border-b border-[#E8E0D8]/40 -z-0" />
                
                <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FAF8F5] border border-[#E8E0D8]/60 text-[#C9A96E]">
                    <Gift className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-sans text-[13px] font-extrabold uppercase tracking-wide text-[#4A1020] leading-snug">
                      Can't find your<br/>favourite brand?
                    </h4>
                    <p className="mt-2 text-[11px] font-semibold text-[#8C7A76] leading-relaxed">
                      Let us know and we'll add it for you.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setRequestSuccess(false);
                      setRequestModalOpen(true);
                    }}
                    className="w-full inline-flex items-center justify-center rounded-full border border-[#C9A96E] hover:bg-[#FAF8F5] text-[#C9A96E] transition-all duration-300 px-4 py-2.5 text-[11px] font-sans font-extrabold uppercase tracking-[0.14em] cursor-pointer hover:shadow-sm"
                  >
                    REQUEST A BRAND
                  </button>
                </div>
              </div>
            </aside>

            {/* Right Side Logos Grid */}
            <div className="space-y-8">
              {paginatedBrands.length > 0 ? (
                <div>
                  <div className="grid grid-cols-5 gap-4">
                    {paginatedBrands.map((brand) => (
                      <div
                        key={brand.name}
                        className="group relative flex aspect-[1.8] items-center justify-center rounded-[1rem] border border-[#E8E0D8]/50 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#C9A96E]/50 cursor-pointer select-none"
                      >
                        <img
                          src={brand.image}
                          alt={brand.name}
                          className="h-full w-full object-contain filter transition-all duration-300 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
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
                          className={`h-8 w-8 inline-flex items-center justify-center rounded-full border border-[#E8E0D8]/60 transition-all ${
                            currentPage === 1
                              ? 'text-[#C8C2BE] opacity-35 cursor-not-allowed'
                              : 'text-[#4A1020] hover:bg-[#FAF8F5] hover:border-[#C9A96E] cursor-pointer'
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
                                  : 'text-[#4A1020] hover:bg-[#FAF8F5] cursor-pointer'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}

                        <button
                          disabled={currentPage === totalPages}
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                          className={`h-8 w-8 inline-flex items-center justify-center rounded-full border border-[#E8E0D8]/60 transition-all ${
                            currentPage === totalPages
                              ? 'text-[#C8C2BE] opacity-35 cursor-not-allowed'
                              : 'text-[#4A1020] hover:bg-[#FAF8F5] hover:border-[#C9A96E] cursor-pointer'
                          }`}
                        >
                          <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="rounded-[1.2rem] border border-[#E8E0D8]/60 bg-white p-12 text-center space-y-4 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FAF8F5] text-[#C9A96E] mx-auto">
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
                <section key={letter} id={`accordion-${letter}`} className="border-b border-[#E8E0D8]/40 pb-2">
                  
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleAccordion(letter)}
                    className="w-full flex items-center justify-between py-2 text-left focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      {/* Burgundy square icon with white letter */}
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#4A1020] font-sans text-[13px] font-extrabold text-white uppercase shadow-sm">
                        {letter}
                      </div>
                      <span className="font-sans text-[12.5px] font-extrabold uppercase tracking-[0.14em] text-[#4A1020]">
                        BRANDS STARTING WITH {letter}
                      </span>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-[#C9A96E]" strokeWidth={2.5} />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-[#C9A96E]" strokeWidth={2.5} />
                    )}
                  </button>

                  {/* Accordion Body Content */}
                  {isOpen && (
                    <div className="mt-3.5 pl-[2.5rem] pr-1 pb-2">
                      <div className="grid grid-cols-3 gap-3">
                        {brandsForLetter.map((brand) => (
                          <div
                            key={brand.name}
                            className="flex flex-col items-center justify-between rounded-lg border border-[#E8E0D8]/45 bg-white p-2.5 shadow-sm w-full aspect-square"
                          >
                            {/* Logo centered container */}
                            <div className="flex-1 flex items-center justify-center w-full min-h-0 overflow-hidden">
                              <img
                                src={brand.image}
                                alt={brand.name}
                                className="max-h-full max-w-full object-contain"
                                loading="lazy"
                              />
                            </div>
                            {/* Small name label underneath */}
                            <span className="mt-1.5 block w-full text-center truncate font-sans text-[9px] font-bold text-[#8C7A76] uppercase tracking-[0.06em]">
                              {brand.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </section>
              );
            })}
          </div>

          {/* Request a Brand Callout Box on Mobile (At the bottom of list) */}
          <div className="mt-8 rounded-[1rem] border border-[#E8E0D8]/60 bg-white p-5 shadow-sm text-center flex flex-col items-center space-y-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FAF8F5] border border-[#E8E0D8]/60 text-[#C9A96E]">
              <Gift className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-sans text-[12.5px] font-extrabold uppercase tracking-wide text-[#4A1020]">
                Can't find your favourite brand?
              </h4>
              <p className="mt-1 text-[11px] font-semibold text-[#8C7A76]">
                Let us know and we'll add it for you.
              </p>
            </div>
            <button
              onClick={() => {
                setRequestSuccess(false);
                setRequestModalOpen(true);
              }}
              className="w-full inline-flex items-center justify-center rounded-full border border-[#C9A96E] text-[#C9A96E] transition-all px-5 py-2.5 text-[10.5px] font-sans font-bold uppercase tracking-wider cursor-pointer"
            >
              REQUEST A BRAND
            </button>
          </div>
        </div>

      </main>

      {/* ─── TRUST BANNER FEATURE BAR (Beautiful, premium highlight above footer) ─── */}
      <section className="border-y border-[#E8E0D8]/50 bg-white py-8 md:py-9">
        <div className="section-container">
          <div className="grid grid-cols-2 gap-y-6 gap-x-4 md:grid-cols-4 md:gap-6">
            
            {/* Item 1 */}
            <div className="flex items-start gap-3 w-full pl-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#4A1020]/[0.04] border border-[#C9A96E]/20 text-[#C9A96E]">
                <Gift className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div className="min-w-0 pt-0.5">
                <h5 className="font-sans text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#4A1020] leading-none">
                  100+ Premium Brands
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

      {/* ─── REQUEST A BRAND MODAL DIALOG (Interactive Overlay) ─── */}
      {requestModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-4 backdrop-blur-[2px] transition-all duration-300 animate-fadeIn">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Request a brand form"
            className="w-full max-w-md transform rounded-[1.2rem] border border-[#E8E0D8]/60 bg-white p-6 shadow-2xl transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#FAF8F5] pb-4.5 mb-5">
              <div className="flex items-center gap-2.5">
                <Gift className="h-5 w-5 text-[#C9A96E]" strokeWidth={1.75} />
                <h3 className="font-sans text-[14.5px] font-extrabold uppercase tracking-wide text-[#4A1020]">
                  REQUEST A BRAND
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setRequestModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E8E0D8]/60 bg-[#FAF8F5] hover:bg-black/[0.02] text-[#4A1020] transition-colors"
                aria-label="Close dialog"
              >
                <X className="h-4.5 w-4.5" strokeWidth={2.5} />
              </button>
            </div>

            {/* Modal Body: Success state vs Form fields */}
            {requestSuccess ? (
              <div className="py-8 text-center space-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF7EC] text-[#2E7D32] mx-auto shadow-sm">
                  <Check className="h-7 w-7" strokeWidth={3} />
                </div>
                <h4 className="font-serif text-[18px] font-bold text-[#4A1020]">Request Received!</h4>
                <p className="text-[12.5px] font-medium text-[#8C7A76] leading-relaxed max-w-xs mx-auto">
                  Thank you for suggesting your favourite brand. Our curation team will review this immediately and notify you when it's added.
                </p>
                <button
                  type="button"
                  onClick={() => setRequestModalOpen(false)}
                  className="mt-4 px-6 py-2.5 text-[11px] font-sans font-bold uppercase tracking-wider text-white bg-[#4A1020] hover:bg-[#5C1629] rounded-full transition-all shadow-md cursor-pointer"
                >
                  Back to brands
                </button>
              </div>
            ) : (
              <form onSubmit={handleRequestSubmit} className="space-y-4 text-[13px] font-medium text-[#2C2523]">
                <p className="text-[12px] text-[#8C7A76] leading-relaxed">
                  Is your favourite brand missing from our premium catalog? Suggest it below and we will get in touch with them.
                </p>
                
                {/* Brand Name */}
                <div className="space-y-1.5">
                  <label htmlFor="brand-name" className="block text-[11px] font-extrabold uppercase tracking-wide text-[#8C7A76]">
                    Brand Name <span className="text-[#C9A96E]">*</span>
                  </label>
                  <input
                    id="brand-name"
                    type="text"
                    required
                    value={brandRequestName}
                    onChange={(e) => setBrandRequestName(e.target.value)}
                    placeholder="Enter brand name (e.g. Rolex)"
                    className="w-full rounded-xl border border-[#E8E0D8] bg-[#FAF8F5] px-4.5 py-3 outline-none focus:border-[#C9A96E] focus:bg-white transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.01)]"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label htmlFor="brand-email" className="block text-[11px] font-extrabold uppercase tracking-wide text-[#8C7A76]">
                    Your Email <span className="text-[#C9A96E]">*</span>
                  </label>
                  <input
                    id="brand-email"
                    type="email"
                    required
                    value={brandRequestEmail}
                    onChange={(e) => setBrandRequestEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full rounded-xl border border-[#E8E0D8] bg-[#FAF8F5] px-4.5 py-3 outline-none focus:border-[#C9A96E] focus:bg-white transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.01)]"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="brand-msg" className="block text-[11px] font-extrabold uppercase tracking-wide text-[#8C7A76]">
                    Why do you love this brand?
                  </label>
                  <textarea
                    id="brand-msg"
                    rows={3}
                    value={brandRequestMsg}
                    onChange={(e) => setBrandRequestMsg(e.target.value)}
                    placeholder="Tell us what items you'd like to gift from them..."
                    className="w-full rounded-xl border border-[#E8E0D8] bg-[#FAF8F5] px-4.5 py-3 outline-none focus:border-[#C9A96E] focus:bg-white transition-all resize-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.01)]"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full mt-4 inline-flex items-center justify-center rounded-full bg-[#4A1020] hover:bg-[#5C1629] text-white transition-all duration-300 px-5 py-3 text-[11px] font-sans font-extrabold uppercase tracking-[0.14em] cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                >
                  SUBMIT REQUEST
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
