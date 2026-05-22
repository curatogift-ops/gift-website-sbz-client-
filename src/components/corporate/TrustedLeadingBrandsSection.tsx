import React from 'react';

type TrustedBrand = {
  id: string;
  name: string;
  logoSvg: React.ReactNode;
};

const TRUSTED_BRANDS_ROW_1: TrustedBrand[] = [
  {
    id: 'gulf',
    name: 'Gulf',
    logoSvg: (
      <svg viewBox="0 0 120 40" className="h-7 w-auto text-stone-500/80 hover:text-[#f58220] transition-colors duration-300" fill="currentColor" aria-hidden="true">
        <circle cx="16" cy="20" r="11" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="16" cy="20" r="8" fill="currentColor" className="opacity-10" />
        <path d="M11 20 h10 M16 15 v10" stroke="currentColor" strokeWidth="1.5" />
        <text x="36" y="26" className="font-sans font-extrabold tracking-wider text-[15px]">GULF</text>
      </svg>
    ),
  },
  {
    id: 'biocon',
    name: 'Biocon',
    logoSvg: (
      <svg viewBox="0 0 120 40" className="h-7 w-auto text-stone-500/80 hover:text-[#0066b3] transition-colors duration-300" fill="currentColor" aria-hidden="true">
        <path d="M8 12 C8 12, 14 8, 20 20 C26 32, 32 28, 32 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 28 C8 28, 14 32, 20 20 C26 8, 32 12, 32 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="opacity-50" />
        <circle cx="8" cy="12" r="2.5" />
        <circle cx="32" cy="28" r="2.5" />
        <circle cx="8" cy="28" r="2.5" className="opacity-50" />
        <circle cx="32" cy="12" r="2.5" className="opacity-50" />
        <text x="42" y="26" className="font-sans font-bold text-[16px] tracking-tight">Biocon</text>
      </svg>
    ),
  },
  {
    id: 'finastra',
    name: 'Finastra',
    logoSvg: (
      <svg viewBox="0 0 120 40" className="h-7 w-auto text-stone-500/80 hover:text-[#5c2d91] transition-colors duration-300" fill="currentColor" aria-hidden="true">
        <path d="M6 12 L18 8 L28 20 L18 32 L6 28 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M6 12 L18 20 L6 28 M18 8 L18 32 M28 20 L18 20" stroke="currentColor" strokeWidth="1.2" className="opacity-70" />
        <text x="36" y="26" className="font-sans font-black tracking-tighter text-[15px]">FINASTRA</text>
      </svg>
    ),
  },
  {
    id: 'msn',
    name: 'MSN Laboratories',
    logoSvg: (
      <svg viewBox="0 0 150 40" className="h-7 w-auto text-stone-500/80 hover:text-[#c41230] transition-colors duration-300" fill="currentColor" aria-hidden="true">
        <path d="M8 20 L15 11 L25 11 L32 20 L25 29 L15 29 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M32 20 L39 11 L49 11 L56 20 L49 29 L39 29 Z" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-60" />
        <text x="66" y="22" className="font-sans font-black tracking-wide text-[14px]">MSN</text>
        <text x="66" y="31" className="font-sans font-bold tracking-[0.1em] text-[7.5px] opacity-70">LABORATORIES</text>
      </svg>
    ),
  },
  {
    id: 'med-manor',
    name: 'Med Manor Organics',
    logoSvg: (
      <svg viewBox="0 0 160 40" className="h-7 w-auto text-stone-500/80 hover:text-[#00857c] transition-colors duration-300" fill="currentColor" aria-hidden="true">
        <path d="M10 20 H24 M17 13 V27" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M18 15 C21 18, 23 23, 18 26 C15 23, 13 18, 18 15 Z" fill="currentColor" className="opacity-80" />
        <text x="34" y="21" className="font-sans font-bold tracking-tight text-[13px]">MED MANOR</text>
        <text x="34" y="30" className="font-sans font-bold tracking-[0.12em] text-[8px] opacity-70">ORGANICS</text>
      </svg>
    ),
  },
  {
    id: 'micro-labs',
    name: 'Micro Labs',
    logoSvg: (
      <svg viewBox="0 0 130 40" className="h-7 w-auto text-stone-500/80 hover:text-[#003da5] transition-colors duration-300" fill="currentColor" aria-hidden="true">
        <circle cx="16" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M11 20 C11 17, 21 17, 21 20 C21 23, 11 23, 11 20 Z" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <text x="34" y="26" className="font-sans font-extrabold tracking-wide text-[14px]">MICRO LABS</text>
      </svg>
    ),
  },
  {
    id: 'reward-360',
    name: 'Reward 360',
    logoSvg: (
      <svg viewBox="0 0 140 40" className="h-7 w-auto text-stone-500/80 hover:text-[#e31837] transition-colors duration-300" fill="currentColor" aria-hidden="true">
        <circle cx="16" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M16 10 L16 30 M10 20 L22 20 M12 14 L20 26 M12 26 L20 14" stroke="currentColor" strokeWidth="1.2" className="opacity-75" />
        <circle cx="16" cy="20" r="3.5" fill="currentColor" />
        <text x="34" y="25" className="font-sans font-black tracking-wide text-[13.5px]">REWARD</text>
        <text x="94" y="25" className="font-sans font-normal text-[13.5px] text-[#A67C37]">360</text>
      </svg>
    ),
  },
];

const TRUSTED_BRANDS_ROW_2: TrustedBrand[] = [
  {
    id: 'pulse-group',
    name: 'The Pulse Group',
    logoSvg: (
      <svg viewBox="0 0 150 40" className="h-7 w-auto text-stone-500/80 hover:text-[#e11d48] transition-colors duration-300" fill="currentColor" aria-hidden="true">
        <circle cx="16" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M8 20 H12 L14 13 L18 27 L20 17 L22 20 H24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
        <text x="34" y="21" className="font-sans font-bold tracking-wider text-[13.5px]">THE PULSE</text>
        <text x="34" y="30" className="font-sans font-bold tracking-[0.18em] text-[8.5px] opacity-70">GROUP</text>
      </svg>
    ),
  },
  {
    id: 'coca-cola-india',
    name: 'Coca-Cola India',
    logoSvg: (
      <svg viewBox="0 0 160 40" className="h-7 w-auto text-stone-500/80 hover:text-[#f40009] transition-colors duration-300" fill="currentColor" aria-hidden="true">
        <path d="M6 25 C8 18, 12 12, 20 12 C23 12, 25 14, 23 18 C21 21, 16 24, 10 25 Z" fill="currentColor" className="opacity-15" />
        <text x="8" y="26" className="font-serif font-black italic tracking-tighter text-[19px]">Coca-Cola</text>
        <text x="100" y="24" className="font-sans font-bold tracking-[0.1em] text-[9.5px] opacity-60">INDIA</text>
      </svg>
    ),
  },
  {
    id: 'pes-university',
    name: 'PES University',
    logoSvg: (
      <svg viewBox="0 0 150 40" className="h-7 w-auto text-stone-500/80 hover:text-[#003366] transition-colors duration-300" fill="currentColor" aria-hidden="true">
        <path d="M8 10 H24 V20 C24 25, 16 29, 16 29 C16 29, 8 25, 8 20 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M12 15 H20 M12 19 H20" stroke="currentColor" strokeWidth="1.2" />
        <text x="32" y="21" className="font-sans font-black tracking-wide text-[14px]">PES</text>
        <text x="32" y="30" className="font-sans font-bold tracking-[0.12em] text-[8px] opacity-70">UNIVERSITY</text>
      </svg>
    ),
  },
  {
    id: 'onestudio',
    name: 'OneStudio',
    logoSvg: (
      <svg viewBox="0 0 130 40" className="h-7 w-auto text-stone-500/80 hover:text-[#1a1a1a] transition-colors duration-300" fill="currentColor" aria-hidden="true">
        <circle cx="16" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="13.5" y="24" className="font-sans font-black text-[11px]">1</text>
        <text x="34" y="25" className="font-sans font-bold tracking-[0.16em] text-[13px]">ONESTUDIO</text>
      </svg>
    ),
  },
  {
    id: 'kia',
    name: 'Kia',
    logoSvg: (
      <svg viewBox="0 0 100 40" className="h-6 w-auto text-stone-500/80 hover:text-[#05141f] transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M 6 28 L 15 12 M 15 28 L 24 12 M 24 28 V 12 M 28 28 L 37 12 M 37 28 L 46 12" />
        <path d="M 15 12 H 24 M 24 12 H 37" />
      </svg>
    ),
  },
  {
    id: 'intas',
    name: 'Intas',
    logoSvg: (
      <svg viewBox="0 0 120 40" className="h-7 w-auto text-stone-500/80 hover:text-[#0054a6] transition-colors duration-300" fill="currentColor" aria-hidden="true">
        <path d="M8 12 H24 M16 12 V28 M10 28 H22" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="16" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2,2" />
        <text x="34" y="26" className="font-sans font-black tracking-wider text-[15px]">INTAS</text>
      </svg>
    ),
  },
  {
    id: 'zydus',
    name: 'Zydus',
    logoSvg: (
      <svg viewBox="0 0 120 40" className="h-7 w-auto text-stone-500/80 hover:text-[#0033a0] transition-colors duration-300" fill="currentColor" aria-hidden="true">
        <path d="M10 12 H24 L10 28 H24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="17" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="0.8" className="opacity-60" />
        <text x="34" y="26" className="font-sans font-bold text-[15px] tracking-tight">Zydus</text>
      </svg>
    ),
  },
];

function BrandLogo({ brand }: { brand: TrustedBrand }) {
  return (
    <div className="flex items-center justify-center filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
      {brand.logoSvg}
    </div>
  );
}

function BrandRow({ brands }: { brands: TrustedBrand[] }) {
  return (
    <ul className="grid list-none grid-cols-2 items-center justify-items-center gap-x-4 gap-y-10 sm:grid-cols-4 sm:gap-x-6 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-0">
      {brands.map((brand) => (
        <li key={brand.id} className="flex w-full items-center justify-center px-1">
          <BrandLogo brand={brand} />
        </li>
      ))}
    </ul>
  );
}

export default function TrustedLeadingBrandsSection() {
  return (
    <section
      className="border-t border-[#ebe6e0] bg-[#F9F7F2] py-12 sm:py-14 lg:py-16"
      aria-labelledby="trusted-brands-heading"
    >
      <div className="section-container">
        <div className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-8">
          <span className="rule-line min-w-[2.5rem] max-w-[6rem] flex-1 sm:max-w-[8rem] lg:max-w-[10rem]" aria-hidden />
          <h2
            id="trusted-brands-heading"
            className="shrink-0 text-center font-sans text-[10px] font-bold uppercase leading-snug tracking-[0.14em] text-[#1A1010] sm:text-[11px] sm:tracking-[0.2em] lg:text-xs lg:tracking-[0.22em]"
          >
            Trusted by leading brands
          </h2>
          <span className="rule-line min-w-[2.5rem] max-w-[6rem] flex-1 sm:max-w-[8rem] lg:max-w-[10rem]" aria-hidden />
        </div>

        <div className="mx-auto mt-10 max-w-[72rem] space-y-10 sm:mt-12 sm:space-y-12 lg:mt-14">
          <BrandRow brands={TRUSTED_BRANDS_ROW_1} />
          <BrandRow brands={TRUSTED_BRANDS_ROW_2} />
        </div>
      </div>
    </section>
  );
}
