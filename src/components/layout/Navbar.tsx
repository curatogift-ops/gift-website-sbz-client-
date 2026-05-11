'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  ShoppingBag,
  CircleUser,
  Menu,
  Search,
  Heart,
  X,
  Gift,
  Home,
  ChevronDown,
  ShoppingBasket,
  ChevronRight,
  Building2,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/utils/cn';

const LOGO_SRC = '/images/gift-gallerei (transparent-background).png';

/** Reference cream */
const CREAM = '#FFF9F5';
const GOLD = '#C5A059';
const FESTIVE_BG = '#FFEBE3';
const FESTIVE_TEXT = '#6B1E30';

const MAROON_RIBBON = '#3D181C';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const iconThin = 1.65;

  const isNavActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const searchShell = (compact: boolean) =>
    cn(
      'nav-header-search flex w-full items-center gap-2 rounded-full transition-colors duration-200',
      compact ? 'max-w-full px-3 py-2.5' : 'max-w-[min(100%,320px)] px-3.5 py-2 md:max-w-[min(100%,280px)] lg:max-w-[300px]'
    );

  const drawerLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Corporate gifting', href: '/corporate' },
    { label: 'Festive hampers', href: '/shop' },
    { label: 'Custom boxes', href: '/custom-boxes' },
    { label: 'About us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  const navDivider = <span className="h-5 w-px shrink-0 bg-[#dcd8d4]" aria-hidden />;

  return (
    <div className="fixed top-0 z-50 w-full bg-white md:bg-[#FFF9F5]">
      {/* Mobile — top announcement (chocolate / burgundy) */}
      <div
        className="flex items-center gap-2 border-b border-white/10 px-3 py-2.5 text-[9px] font-medium leading-snug text-white sm:text-[10px] md:hidden"
        style={{ backgroundColor: MAROON_RIBBON }}
      >
        <Gift className="h-3.5 w-3.5 shrink-0 text-white" strokeWidth={2} aria-hidden />
        <div className="flex min-w-0 flex-1 flex-wrap items-center justify-center gap-x-1 gap-y-0.5 text-center">
          <span className="whitespace-nowrap text-white/95">Flat 10%</span>
          <span className="font-semibold" style={{ color: '#E8C87A' }}>
            OFF
          </span>
          <span className="whitespace-nowrap text-white/95">on All Orders | Code:</span>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="rounded-full bg-white px-2 py-1 text-[9px] font-bold tracking-wide text-[#1a1010] sm:px-2.5 sm:text-[10px]">
            GIFTZ10
          </span>
          <ChevronRight className="h-4 w-4 text-white/90" strokeWidth={2} aria-hidden />
        </div>
      </div>

      <header className="border-b border-black/[0.06] bg-white md:border-b md:bg-transparent">
        <div className="mx-auto max-w-7xl px-3 sm:px-5 lg:px-8">
          {/* Top row — search | logo | actions */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 py-3 md:gap-4 md:py-4">
            <div className="flex min-w-0 items-center justify-start gap-0.5 md:gap-2">
              <button
                type="button"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[#1a1a1a] transition-colors hover:bg-black/[0.04] active:bg-black/[0.06] md:hidden"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-[21px] w-[21px]" strokeWidth={2} strokeLinecap="round" />
              </button>
              <button
                type="button"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[#1a1a1a] transition-colors hover:bg-black/[0.04] active:bg-black/[0.06] md:hidden"
                onClick={() => setMobileSearchOpen((o) => !o)}
                aria-expanded={mobileSearchOpen}
                aria-controls="mobile-search-panel"
                aria-label={mobileSearchOpen ? 'Close search' : 'Open search'}
              >
                <Search className="h-[20px] w-[20px]" strokeWidth={2} strokeLinecap="round" />
              </button>
              <div className="hidden min-w-0 md:block">
                <div className={searchShell(false)} role="search">
                  <Search className="h-4 w-4 shrink-0 text-[#9a9490]" strokeWidth={2} aria-hidden />
                  <input
                    type="search"
                    placeholder="Search luxury hampers, gifts..."
                    className="min-w-0 flex-1 bg-transparent text-[13px] text-[#1a1a1a] outline-none placeholder:text-[#a8a29e] md:text-sm"
                    aria-label="Search gifts and hampers"
                  />
                </div>
              </div>
            </div>

            <Link
              href="/"
              className="mx-auto flex min-w-0 max-w-[min(100vw-8rem,22rem)] flex-col items-center gap-1 sm:max-w-none md:max-w-none"
            >
              <div className="relative h-9 w-[11.5rem] shrink-0 sm:h-10 sm:w-[13rem] md:h-11 md:w-[14.5rem]">
                <Image
                  src={LOGO_SRC}
                  alt="Giftz Gallerei"
                  fill
                  className="object-contain object-center"
                  priority
                  sizes="(max-width: 640px) 184px, 232px"
                />
              </div>
              <div className="flex w-full max-w-[16rem] items-center justify-center gap-2 sm:max-w-[18rem]">
                <span className="h-px min-w-[1rem] flex-1 sm:min-w-[1.25rem]" style={{ backgroundColor: GOLD }} aria-hidden />
                <span className="font-sans text-[7px] font-semibold uppercase leading-tight tracking-[0.26em] text-[#1f1f1f] sm:text-[8px] md:text-[9px]">
                  Gifts that make an impression
                </span>
                <span className="h-px min-w-[1rem] flex-1 sm:min-w-[1.25rem]" style={{ backgroundColor: GOLD }} aria-hidden />
              </div>
            </Link>

            <div className="flex min-w-0 items-center justify-end gap-2 sm:gap-4 md:gap-6">
              <Link
                href="/wishlist"
                className="flex max-md:h-10 max-md:w-10 flex-col items-center justify-center gap-0.5 text-[#1a1a1a] transition-opacity hover:opacity-80"
                aria-label="Wishlist"
              >
                <Heart className="h-[20px] w-[20px] md:h-[21px] md:w-[21px]" strokeWidth={iconThin} strokeLinecap="round" strokeLinejoin="round" />
                <span className="hidden font-sans text-[11px] font-normal leading-none md:block">Wishlist</span>
              </Link>
              <Link
                href="/account"
                className="flex max-md:h-10 max-md:w-10 flex-col items-center justify-center gap-0.5 text-[#1a1a1a] transition-opacity hover:opacity-80"
                aria-label="Account"
              >
                <CircleUser className="h-[20px] w-[20px] md:h-[21px] md:w-[21px]" strokeWidth={iconThin} strokeLinecap="round" />
                <span className="hidden font-sans text-[11px] font-normal leading-none md:block">Account</span>
              </Link>
              <Link
                href="/cart"
                className="relative flex max-md:h-10 max-md:w-10 items-center justify-center text-[#1a1a1a] md:inline-flex md:h-auto md:w-auto md:items-center md:gap-2 md:rounded-lg md:border md:border-[#c9a574] md:bg-white md:px-2.5 md:py-2 md:shadow-sm md:transition md:hover:shadow-md sm:px-3.5"
                aria-label="Shopping cart, 0 items"
              >
                <ShoppingBag className="h-[20px] w-[20px] md:h-[19px] md:w-[19px]" strokeWidth={iconThin} strokeLinecap="round" strokeLinejoin="round" />
                <span className="hidden pr-0.5 font-sans text-[13px] font-medium text-black md:inline">Cart</span>
                <span className="absolute right-0 top-0 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#e11d48] px-0.5 text-[9px] font-semibold leading-none text-white ring-2 ring-white md:-right-1 md:-top-1 md:h-[18px] md:min-w-[18px] md:text-[10px] md:ring-[#FFF9F5]">
                  0
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile — collapsible search */}
          <div
            id="mobile-search-panel"
            className={cn(
              'overflow-hidden border-t border-black/[0.06] transition-all duration-200 md:hidden',
              mobileSearchOpen ? 'max-h-28 pb-3 pt-2 opacity-100' : 'max-h-0 border-t-0 py-0 opacity-0'
            )}
          >
            <div className={searchShell(true)} role="search">
              <Search className="h-4 w-4 shrink-0 text-[#9a9490]" strokeWidth={2} aria-hidden />
              <input
                type="search"
                placeholder="Search luxury hampers, gifts..."
                className="min-w-0 flex-1 bg-transparent text-[13px] text-[#1a1a1a] outline-none placeholder:text-[#a8a29e]"
                aria-label="Search gifts and hampers"
              />
            </div>
          </div>

          {/* Mobile — pill category row */}
          <div className="flex gap-2.5 border-t border-black/[0.06] bg-white px-3 pb-3 pt-2.5 md:hidden">
            <Link
              href="/corporate"
              className="flex min-h-[3.25rem] flex-1 items-center justify-center gap-2 rounded-full px-2 py-2.5 text-center font-sans text-[9px] font-bold uppercase leading-tight tracking-[0.1em] text-white shadow-sm active:scale-[0.98] sm:text-[10px]"
              style={{ backgroundColor: MAROON_RIBBON }}
            >
              <Building2 className="h-4 w-4 shrink-0 text-white" strokeWidth={2} aria-hidden />
              <span className="leading-tight">Corporate gifting</span>
            </Link>
            <Link
              href="/shop"
              className="flex min-h-[3.25rem] flex-1 items-center justify-center gap-2 rounded-full border border-[#e8e0d8] bg-[#FAF7F4] px-2 py-2.5 text-center font-sans text-[9px] font-bold uppercase leading-tight tracking-[0.1em] text-[#A67C32] shadow-sm active:scale-[0.98] sm:text-[10px]"
            >
              <Gift className="h-4 w-4 shrink-0 text-[#B8924F]" strokeWidth={2} aria-hidden />
              <span className="leading-tight">Festive hampers</span>
            </Link>
          </div>

          {/* Floating white nav pill (md+) */}
          <div className="hidden pb-4 pt-1 md:block">
            <div className="flex justify-center px-2">
              <nav
                className="inline-flex max-w-full items-center gap-0.5 overflow-x-auto overflow-y-visible rounded-full border border-[#e8e4e0] bg-white px-2 py-1.5 shadow-[0_8px_28px_-6px_rgba(0,0,0,0.12),0_2px_8px_-2px_rgba(0,0,0,0.06)] [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-1 sm:px-3 sm:py-2 [&::-webkit-scrollbar]:hidden"
                aria-label="Primary"
              >
                <Link
                  href="/"
                  className={cn(
                    'inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-2 font-sans text-[10px] font-bold uppercase tracking-[0.14em] sm:px-3 sm:text-[11px]',
                    isNavActive('/') ? 'text-[#4A0E1C]' : 'text-black hover:text-[#4A0E1C]'
                  )}
                >
                  <Home className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2} aria-hidden />
                  Home
                </Link>

                {navDivider}

                <Link
                  href="/shop"
                  className="inline-flex shrink-0 items-center gap-0.5 rounded-full px-2.5 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-black hover:text-[#4A0E1C] sm:px-3 sm:text-[11px]"
                >
                  Shop
                  <ChevronDown className="h-3 w-3 opacity-65" strokeWidth={2} aria-hidden />
                </Link>

                {navDivider}

                <Link href="/corporate" className="relative flex shrink-0 flex-col items-center pt-2">
                  <span
                    className="absolute left-1/2 top-0 z-10 -translate-x-1/2 rounded bg-[#C5A059] px-1.5 py-0.5 text-[7px] font-bold uppercase leading-none tracking-wide text-white shadow-sm"
                    aria-hidden
                  >
                    New
                  </span>
                  <span
                    className={cn(
                      'mt-1 inline-flex items-center gap-1.5 rounded-lg px-3 py-2 font-sans text-[9px] font-bold uppercase tracking-[0.1em] text-white sm:px-3.5 sm:text-[10px] sm:tracking-[0.12em]',
                      isNavActive('/corporate') ? 'bg-[#3a0b12]' : 'bg-[#4A0E1C]'
                    )}
                  >
                    <Gift className="h-3.5 w-3.5 shrink-0 text-white" strokeWidth={2} aria-hidden />
                    <span className="whitespace-nowrap">Corporate gifting</span>
                  </span>
                </Link>

                <Link href="/shop" className="relative flex shrink-0 flex-col items-center pt-2">
                  <span
                    className="absolute left-1/2 top-0 z-10 -translate-x-1/2 rounded bg-[#C5A059] px-1.5 py-0.5 text-[7px] font-bold uppercase leading-none tracking-wide text-white shadow-sm"
                    aria-hidden
                  >
                    New
                  </span>
                  <span
                    className="mt-1 inline-flex items-center gap-1.5 rounded-lg px-3 py-2 font-sans text-[9px] font-bold uppercase tracking-[0.1em] sm:px-3.5 sm:text-[10px] sm:tracking-[0.12em]"
                    style={{ backgroundColor: FESTIVE_BG, color: FESTIVE_TEXT }}
                  >
                    <ShoppingBasket className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
                    <span className="whitespace-nowrap">Festive hampers</span>
                  </span>
                </Link>

                {navDivider}

                {[
                  { label: 'Custom boxes', href: '/custom-boxes' },
                  { label: 'About us', href: '/about' },
                  { label: 'Blog', href: '/blog' },
                  { label: 'Contact', href: '/contact' },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'shrink-0 whitespace-nowrap rounded-full px-2.5 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.11em] text-black hover:text-[#4A0E1C] sm:px-3 sm:text-[11px]',
                      isNavActive(link.href) && 'text-[#4A0E1C]'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          'fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity md:hidden',
          isMobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={cn(
            'absolute left-0 top-0 flex h-full w-[88%] max-w-sm flex-col shadow-2xl transition-transform duration-300 ease-out',
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          )}
          style={{ backgroundColor: CREAM }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-shrink-0 items-center justify-between border-b border-[#ebe6e2] px-5 py-4">
            <div className="relative h-9 w-44 min-w-0 sm:h-10 sm:w-52">
              <Image src={LOGO_SRC} alt="Giftz Gallerei" fill className="object-contain object-left" sizes="208px" />
            </div>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e8e4e1] bg-white text-[#1a1a1a]"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-4">
            <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a9490]">Menu</p>
            {drawerLinks.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={cn(
                  'rounded-xl px-4 py-3.5 font-sans text-[13px] font-semibold uppercase tracking-[0.08em]',
                  isNavActive(item.href) ? 'bg-white text-[#4A0E1C] shadow-sm' : 'text-[#1f1f1f] hover:bg-white/70'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="grid flex-shrink-0 grid-cols-3 gap-2 border-t border-[#ebe6e2] p-4">
            <Link
              href="/wishlist"
              className="flex flex-col items-center gap-1 rounded-xl border border-[#e8e4e1] bg-white py-3 font-sans text-[10px] font-medium uppercase tracking-wide text-[#1a1a1a]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Heart className="h-4 w-4" strokeWidth={1.75} />
              Wishlist
            </Link>
            <Link
              href="/account"
              className="flex flex-col items-center gap-1 rounded-xl border border-[#e8e4e1] bg-white py-3 font-sans text-[10px] font-medium uppercase tracking-wide text-[#1a1a1a]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <CircleUser className="h-4 w-4" strokeWidth={1.75} />
              Account
            </Link>
            <Link
              href="/cart"
              className="relative flex flex-col items-center gap-1 rounded-xl border border-[#c9a574] bg-white py-3 font-sans text-[10px] font-medium uppercase tracking-wide text-[#1a1a1a]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <ShoppingBag className="h-4 w-4" strokeWidth={1.75} />
              Cart
              <span className="absolute right-3 top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#e11d48] px-0.5 text-[9px] font-semibold text-white">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
