import React from 'react';

type TrustedBrand = {
  id: string;
  name: string;
  logoSvg: React.ReactNode;
};

/* ── Row 1 ─────────────────────────────────────────────── */
const TRUSTED_BRANDS_ROW_1: TrustedBrand[] = [
  {
    id: 'gulf',
    name: 'Gulf',
    logoSvg: (
      <svg viewBox="0 0 120 44" className="h-8 w-auto" fill="none" aria-hidden="true">
        <circle cx="20" cy="22" r="14" fill="#f58220" />
        <circle cx="20" cy="22" r="10" fill="white" />
        <circle cx="20" cy="22" r="6"  fill="#f58220" />
        <text x="42" y="28" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="17" fill="#f58220" letterSpacing="2">GULF</text>
      </svg>
    ),
  },
  {
    id: 'biocon',
    name: 'Biocon',
    logoSvg: (
      <svg viewBox="0 0 120 44" className="h-8 w-auto" fill="none" aria-hidden="true">
        <path d="M8 14 C8 14, 14 8, 22 22 C30 36, 36 30, 36 30" stroke="#0066b3" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <path d="M8 30 C8 30, 14 36, 22 22 C30 8, 36 14, 36 14" stroke="#0066b3" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5"/>
        <circle cx="8"  cy="14" r="3" fill="#0066b3"/>
        <circle cx="36" cy="30" r="3" fill="#0066b3"/>
        <text x="44" y="28" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="17" fill="#0066b3">Biocon</text>
      </svg>
    ),
  },
  {
    id: 'finastra',
    name: 'Finastra',
    logoSvg: (
      <svg viewBox="0 0 130 44" className="h-8 w-auto" fill="none" aria-hidden="true">
        <path d="M6 14 L20 8 L32 22 L20 36 L6 30 Z" stroke="#5c2d91" strokeWidth="2" fill="#5c2d91" fillOpacity="0.1"/>
        <path d="M6 14 L20 22 L6 30 M20 8 L20 36 M32 22 L20 22" stroke="#5c2d91" strokeWidth="1.5" fill="none"/>
        <text x="40" y="28" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="14" fill="#5c2d91">Finastra</text>
      </svg>
    ),
  },
  {
    id: 'msn',
    name: 'MSN Laboratories',
    logoSvg: (
      <svg viewBox="0 0 155 44" className="h-8 w-auto" fill="none" aria-hidden="true">
        <rect x="4"  y="9" width="16" height="16" fill="#c41230"/>
        <rect x="4"  y="9" width="8"  height="8"  fill="white"/>
        <rect x="12" y="17" width="8"  height="8"  fill="white"/>
        <text x="26" y="25" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="16" fill="#c41230">MSN</text>
        <text x="26" y="34" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="8"  fill="#c41230" opacity="0.75" letterSpacing="1">LABORATORIES</text>
      </svg>
    ),
  },
  {
    id: 'med-manor',
    name: 'Med Manor Organics',
    logoSvg: (
      <svg viewBox="0 0 165 44" className="h-8 w-auto" fill="none" aria-hidden="true">
        <path d="M12 22 H26 M19 15 V29" stroke="#00857c" strokeWidth="4" strokeLinecap="round"/>
        <path d="M20 17 C23 20, 25 25, 20 28 C17 25, 15 20, 20 17 Z" fill="#00857c" fillOpacity="0.7"/>
        <text x="36" y="23" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="13" fill="#00857c">MED MANOR</text>
        <text x="36" y="33" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="9"  fill="#00857c" opacity="0.8" letterSpacing="1">ORGANICS</text>
      </svg>
    ),
  },
  {
    id: 'micro-labs',
    name: 'Micro Labs',
    logoSvg: (
      <svg viewBox="0 0 140 44" className="h-8 w-auto" fill="none" aria-hidden="true">
        <rect x="4" y="8" width="28" height="28" rx="2" fill="#003da5" fillOpacity="0.1" stroke="#003da5" strokeWidth="1.5"/>
        <path d="M8 22 H28 M18 12 V32 M12 16 H24" stroke="#003da5" strokeWidth="1.8" strokeLinecap="round"/>
        <text x="38" y="24" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="13" fill="#003da5">MICRO</text>
        <text x="38" y="35" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="13" fill="#003da5">LABS</text>
      </svg>
    ),
  },
  {
    id: 'reward360',
    name: 'Reward 360',
    logoSvg: (
      <svg viewBox="0 0 140 44" className="h-8 w-auto" fill="none" aria-hidden="true">
        <circle cx="18" cy="22" r="13" fill="#e31837" fillOpacity="0.1" stroke="#e31837" strokeWidth="2"/>
        <circle cx="18" cy="22" r="4"  fill="#e31837"/>
        <text x="36" y="23" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="13" fill="#e31837">REWARD</text>
        <text x="36" y="34" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="12" fill="#e31837" opacity="0.85">360</text>
      </svg>
    ),
  },
];

/* ── Row 2 ─────────────────────────────────────────────── */
const TRUSTED_BRANDS_ROW_2: TrustedBrand[] = [
  {
    id: 'pulse-group',
    name: 'The Pulse Group',
    logoSvg: (
      <svg viewBox="0 0 155 44" className="h-8 w-auto" fill="none" aria-hidden="true">
        <circle cx="18" cy="22" r="13" fill="none" stroke="#e11d48" strokeWidth="2"/>
        <path d="M9 22 H13 L15 15 L19 29 L21 19 L23 22 H27" fill="none" stroke="#e11d48" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
        <text x="36" y="21" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="13" fill="#1a1a1a">THE PULSE</text>
        <text x="36" y="32" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="12" fill="#1a1a1a" letterSpacing="2">GROUP</text>
      </svg>
    ),
  },
  {
    id: 'cocacola-india',
    name: 'Coca-Cola India',
    logoSvg: (
      <svg viewBox="0 0 165 44" className="h-8 w-auto" fill="none" aria-hidden="true">
        <path d="M5 28 C8 18, 13 10, 22 10 C26 10, 28 13, 26 18 C23 23, 16 27, 8 28 Z" fill="#f40009" fillOpacity="0.12"/>
        <text x="5" y="29" fontFamily="Georgia, serif" fontWeight="900" fontStyle="italic" fontSize="20" fill="#f40009">Coca-Cola</text>
        <text x="105" y="27" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="9" fill="#f40009" opacity="0.65" letterSpacing="1">INDIA</text>
      </svg>
    ),
  },
  {
    id: 'pes',
    name: 'PES University',
    logoSvg: (
      <svg viewBox="0 0 155 44" className="h-8 w-auto" fill="none" aria-hidden="true">
        <path d="M8 8 H28 V22 C28 30, 18 36, 18 36 C18 36, 8 30, 8 22 Z" fill="none" stroke="#003366" strokeWidth="2"/>
        <path d="M12 16 H24 M12 21 H24" stroke="#003366" strokeWidth="1.5" strokeLinecap="round"/>
        <text x="34" y="22" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="16" fill="#003366">PES</text>
        <text x="34" y="32" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="9"  fill="#003366" opacity="0.8" letterSpacing="1">UNIVERSITY</text>
      </svg>
    ),
  },
  {
    id: 'onestudio',
    name: 'OneStudio',
    logoSvg: (
      <svg viewBox="0 0 140 44" className="h-8 w-auto" fill="none" aria-hidden="true">
        <circle cx="16" cy="22" r="12" fill="none" stroke="#1a1a1a" strokeWidth="2"/>
        <text x="12" y="27" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="12" fill="#1a1a1a">1</text>
        <text x="34" y="27" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="13" fill="#1a1a1a" letterSpacing="1">ONESTUDIO</text>
      </svg>
    ),
  },
  {
    id: 'kia',
    name: 'Kia',
    logoSvg: (
      <svg viewBox="0 0 100 44" className="h-8 w-auto" fill="none" stroke="#05141f" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M 6 30 L 17 14 M 17 30 L 28 14 M 28 30 V 14 M 33 30 L 44 14 M 44 30 L 55 14" />
        <path d="M 17 14 H 28 M 33 14 H 44" />
      </svg>
    ),
  },
  {
    id: 'intas',
    name: 'Intas',
    logoSvg: (
      <svg viewBox="0 0 130 44" className="h-8 w-auto" fill="none" aria-hidden="true">
        <circle cx="20" cy="22" r="14" fill="none" stroke="#0054a6" strokeWidth="2"/>
        <text x="13" y="27" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="10" fill="#0054a6">IN</text>
        <text x="38" y="27" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="15" fill="#0054a6" letterSpacing="1">INTAS</text>
      </svg>
    ),
  },
  {
    id: 'zydus',
    name: 'Zydus',
    logoSvg: (
      <svg viewBox="0 0 130 44" className="h-8 w-auto" fill="none" aria-hidden="true">
        <path d="M6 12 H28 L6 32 H28" fill="none" stroke="#0033a0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="36" y="22" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="16" fill="#0033a0">Zydus</text>
        <text x="36" y="32" fontFamily="Georgia, serif" fontStyle="italic" fontSize="9" fill="#0033a0" opacity="0.7">dedicated to life</text>
      </svg>
    ),
  },
];

function BrandLogo({ brand }: { brand: TrustedBrand }) {
  return (
    <div className="flex shrink-0 items-center justify-center w-[120px] sm:w-[150px] px-3.5 opacity-60 hover:opacity-100 hover:scale-105 transition-all duration-300">
      {brand.logoSvg}
    </div>
  );
}

export default function TrustedLeadingBrandsSection() {
  const ALL_BRANDS = [...TRUSTED_BRANDS_ROW_1, ...TRUSTED_BRANDS_ROW_2];

  return (
    <section
      className="border-t border-[#ebe6e0] bg-[#F9F7F2] py-8 sm:py-10 lg:py-12 overflow-hidden"
      aria-labelledby="trusted-brands-heading"
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-scroll {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .animate-marquee-scroll:hover {
          animation-play-state: paused;
        }
      `}} />

      <div className="w-full">
        {/* Title with horizontal rules */}
        <div className="section-container flex items-center justify-center gap-4 sm:gap-6 lg:gap-8">
          <span className="rule-line min-w-[2.5rem] max-w-[6rem] flex-1 sm:max-w-[8rem] lg:max-w-[10rem]" aria-hidden />
          <h2
            id="trusted-brands-heading"
            className="shrink-0 text-center font-sans text-[10px] font-bold uppercase leading-snug tracking-[0.14em] text-[#1A1010] sm:text-[11px] sm:tracking-[0.2em] lg:text-xs lg:tracking-[0.22em]"
          >
            Trusted by leading brands
          </h2>
          <span className="rule-line min-w-[2.5rem] max-w-[6rem] flex-1 sm:max-w-[8rem] lg:max-w-[10rem]" aria-hidden />
        </div>

        {/* Infinite sliding marquee */}
        <div className="relative mt-8 sm:mt-10 lg:mt-12 w-full overflow-hidden py-2 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-16 sm:before:w-24 before:bg-gradient-to-r before:from-[#F9F7F2] before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-16 sm:after:w-24 after:bg-gradient-to-l after:from-[#F9F7F2] after:to-transparent">
          <div className="animate-marquee-scroll gap-6 sm:gap-10">
            {/* Render 1st set of logos */}
            {ALL_BRANDS.map((brand, idx) => (
              <BrandLogo key={`${brand.id}-1-${idx}`} brand={brand} />
            ))}
            {/* Render 2nd duplicate set of logos for seamless infinite looping */}
            {ALL_BRANDS.map((brand, idx) => (
              <BrandLogo key={`${brand.id}-2-${idx}`} brand={brand} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
