import { useState } from 'react';
import { cn } from '@/utils/cn';

type TrustedBrand = {
  id: string;
  name: string;
  /** Optional local asset under /public — preferred when available */
  src?: string;
  /** Remote logo fallback */
  logoUrl?: string;
  fallbackClassName?: string;
};

const TRUSTED_BRANDS_ROW_1: TrustedBrand[] = [
  { id: 'gulf', name: 'Gulf', logoUrl: 'https://logo.clearbit.com/gulfoilltd.com', fallbackClassName: 'text-[#f58220] font-bold' },
  { id: 'biocon', name: 'Biocon', logoUrl: 'https://logo.clearbit.com/biocon.com', fallbackClassName: 'text-[#0066b3] font-semibold' },
  { id: 'finastra', name: 'Finastra', logoUrl: 'https://logo.clearbit.com/finastra.com', fallbackClassName: 'text-[#5c2d91] font-semibold' },
  {
    id: 'msn',
    name: 'MSN Laboratories',
    logoUrl: 'https://logo.clearbit.com/msnlabs.com',
    fallbackClassName: 'text-[#c41230] font-bold tracking-tight',
  },
  {
    id: 'med-manor',
    name: 'Med Manor Organics',
    logoUrl: 'https://logo.clearbit.com/medmanor.com',
    fallbackClassName: 'text-[#00857c] font-semibold text-[10px]',
  },
  {
    id: 'micro-labs',
    name: 'Micro Labs',
    logoUrl: 'https://logo.clearbit.com/microlabsltd.com',
    fallbackClassName: 'text-[#003da5] font-bold text-[11px]',
  },
  {
    id: 'reward-360',
    name: 'Reward 360',
    logoUrl: 'https://logo.clearbit.com/reward360.in',
    fallbackClassName: 'text-[#e31837] font-bold',
  },
];

const TRUSTED_BRANDS_ROW_2: TrustedBrand[] = [
  {
    id: 'pulse-group',
    name: 'The Pulse Group',
    fallbackClassName: 'text-[#3d3d3d] font-semibold tracking-wide text-[11px]',
  },
  {
    id: 'coca-cola-india',
    name: 'Coca-Cola India',
    logoUrl: 'https://logo.clearbit.com/coca-colaindia.com',
    fallbackClassName: 'text-[#f40009] font-bold italic',
  },
  {
    id: 'pes-university',
    name: 'PES University',
    logoUrl: 'https://logo.clearbit.com/pes.edu',
    fallbackClassName: 'text-[#003366] font-semibold text-[11px]',
  },
  { id: 'onestudio', name: 'OneStudio', fallbackClassName: 'text-[#1a1a1a] font-semibold tracking-[0.2em] text-[11px]' },
  { id: 'kia', name: 'Kia', logoUrl: 'https://logo.clearbit.com/kia.com', fallbackClassName: 'text-[#05141f] font-bold tracking-[0.35em]' },
  {
    id: 'intas',
    name: 'Intas',
    logoUrl: 'https://logo.clearbit.com/intaspharma.com',
    fallbackClassName: 'text-[#0054a6] font-bold tracking-[0.12em]',
  },
  {
    id: 'zydus',
    name: 'Zydus',
    logoUrl: 'https://logo.clearbit.com/zyduslife.com',
    fallbackClassName: 'text-[#0033a0] font-semibold',
  },
];

function BrandLogo({ brand }: { brand: TrustedBrand }) {
  const [useFallback, setUseFallback] = useState(false);
  const imageSrc = brand.src ?? brand.logoUrl;

  if (!imageSrc || useFallback) {
    return (
      <span
        className={cn(
          'block max-w-[9.5rem] text-center font-sans text-xs leading-tight sm:max-w-[11rem] sm:text-sm',
          brand.fallbackClassName
        )}
      >
        {brand.name}
      </span>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={brand.name}
      width={160}
      height={48}
      loading="lazy"
      decoding="async"
      onError={() => setUseFallback(true)}
      className="h-8 w-auto max-w-[7.5rem] object-contain object-center sm:h-9 sm:max-w-[8.5rem] lg:h-10 lg:max-w-[9.5rem]"
    />
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
