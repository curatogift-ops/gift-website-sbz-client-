import { Link, useLocation } from 'react-router-dom';
import AppImage from '@/components/ui/AppImage';
import {
  ShoppingBag,
  CircleUser,
  Menu,
  Search,
  Heart,
  X,
  Gift,
  ChevronDown,
  ShoppingBasket,
  ChevronRight,
  Building2,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';

const LOGO_SRC = '/images/gift-gallerei-logo.png';

const CREAM = '#FFF9F5';
const MAROON_RIBBON = '#3D181C';

const NewBadge = () => (
  <span
    className="absolute -top-1.5 -right-1 z-10 rounded-full bg-[#C9A96E] px-1.5 py-0.5 text-[9px] font-bold uppercase leading-none tracking-[0.05em] text-[#1A1010] shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-transform duration-300 pointer-events-none"
    aria-hidden
  >
    New
  </span>
);

export default function Navbar() {
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const iconThin = 1.65;

  const isNavActive = (href: string) => {
    if (href === '/home') return pathname === '/' || pathname === '/home';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const searchShell = (compact: boolean) =>
    cn(
      'nav-header-search flex w-full items-center gap-2 rounded-full transition-colors duration-200',
      compact ? 'max-w-full px-3 py-2.5' : 'max-w-[min(100%,320px)] px-3.5 py-2 md:max-w-[min(100%,280px)] lg:max-w-[300px]'
    );

  const drawerLinks = [
    { label: 'Home', href: '/home' },
    { label: 'Shop', href: '/shop' },
    { label: 'Corporate gifting', href: '/corporate' },
    { label: 'Personalized gifts', href: '/shop' },
    { label: 'Custom boxes', href: '/custom-boxes' },
    { label: 'About us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  const desktopNavLinks = [
    { label: 'Home', href: '/home' },
    { label: 'Shop', href: '/shop', chevron: true },
    { label: 'Custom boxes', href: '/custom-boxes' },
    { label: 'About us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ] as const;

  return (
    <div className={cn("fixed top-0 z-50 w-full bg-white md:bg-[#FFF9F5] transition-transform duration-300", !isVisible && "-translate-y-full")}>
      {/* ─── MOBILE ONLY (unchanged) ─────────────────────────────────────── */}
      <div
        className="flex items-center gap-2 border-b border-white/10 px-3 py-2.5 text-[11.5px] font-medium leading-snug text-white sm:text-xs md:hidden"
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
          <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-bold tracking-wide text-[#1a1010] sm:text-xs">
            GIFTZ10
          </span>
          <ChevronRight className="h-4 w-4 text-white/90" strokeWidth={2} aria-hidden />
        </div>
      </div>

      <header className="border-b border-black/[0.06] bg-white md:hidden">
        <div className="mx-auto max-w-7xl px-3 sm:px-5 lg:px-8">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 py-[14px] md:gap-4 md:py-4">
            <div className="flex min-w-0 items-center justify-start gap-0.5 md:gap-2">
              <button
                type="button"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[#1a1a1a] transition-colors hover:bg-black/[0.04] active:bg-black/[0.06]"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-[21px] w-[21px]" strokeWidth={2} strokeLinecap="round" />
              </button>
              <button
                type="button"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[#1a1a1a] transition-colors hover:bg-black/[0.04] active:bg-black/[0.06]"
                onClick={() => setMobileSearchOpen((o) => !o)}
                aria-expanded={mobileSearchOpen}
                aria-controls="mobile-search-panel"
                aria-label={mobileSearchOpen ? 'Close search' : 'Open search'}
              >
                <Search className="h-[20px] w-[20px]" strokeWidth={2} strokeLinecap="round" />
              </button>
            </div>

            <Link
              to="/home"
              className="mx-auto flex flex-col items-center gap-1 shrink-0 w-[11rem] sm:w-[12rem]"
            >
              <div className="relative h-[2.0rem] w-full shrink-0 sm:h-[2.2rem]">
                <AppImage
                  src={LOGO_SRC}
                  alt="Giftz Gallerei"
                  fill
                  className="object-contain object-center"
                  priority
                  sizes="(max-width: 640px) 184px, 232px"
                />
              </div>
              <span className="text-[7.5px] sm:text-[8.2px] font-bold tracking-[0.08em] text-[#4A1020] uppercase whitespace-nowrap leading-none mt-1.5">
                Gifts That Make An Impression
              </span>
            </Link>

            <div className="flex min-w-0 items-center justify-end gap-2 sm:gap-4">
              <Link
                to="/wishlist"
                className="flex h-10 w-10 flex-col items-center justify-center gap-0.5 text-[#1a1a1a] transition-opacity hover:opacity-80"
                aria-label="Wishlist"
              >
                <Heart className="h-[20px] w-[20px]" strokeWidth={iconThin} strokeLinecap="round" strokeLinejoin="round" />
              </Link>
              <Link
                to="/account"
                className="flex h-10 w-10 flex-col items-center justify-center gap-0.5 text-[#1a1a1a] transition-opacity hover:opacity-80"
                aria-label="Account"
              >
                <CircleUser className="h-[20px] w-[20px]" strokeWidth={iconThin} strokeLinecap="round" />
              </Link>
              <Link
                to="/cart"
                className="relative flex h-10 w-10 items-center justify-center text-[#1a1a1a]"
                aria-label="Shopping cart, 0 items"
              >
                <ShoppingBag className="h-[20px] w-[20px]" strokeWidth={iconThin} strokeLinecap="round" strokeLinejoin="round" aria-hidden />
                <span className="absolute right-0 top-0 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#e11d48] px-0.5 text-[10.5px] font-semibold leading-none text-white ring-2 ring-white">
                  0
                </span>
              </Link>
            </div>
          </div>

          <div
            id="mobile-search-panel"
            className={cn(
              'overflow-hidden border-t border-black/[0.06] transition-all duration-200',
              mobileSearchOpen ? 'max-h-28 pb-3 pt-2 opacity-100' : 'max-h-0 border-t-0 py-0 opacity-0'
            )}
          >
            <div className={searchShell(true)} role="search">
              <Search className="h-4 w-4 shrink-0 text-[#9a9490]" strokeWidth={2} aria-hidden />
              <input
                type="search"
                placeholder="Search luxury hampers, gifts..."
                className="min-w-0 flex-1 bg-transparent text-[14.5px] text-[#1a1a1a] outline-none placeholder:text-[#a8a29e]"
                aria-label="Search gifts and hampers"
              />
            </div>
          </div>

          <div className="flex gap-2.5 border-t border-black/[0.06] bg-white px-3 pb-3 pt-2.5">
            <Link
              to="/corporate"
              className="flex min-h-[3.25rem] flex-1 items-center justify-center gap-2 rounded-full px-2 py-2.5 text-center font-sans text-[11.5px] font-bold uppercase leading-tight tracking-[0.08em] text-white shadow-sm active:scale-[0.98] sm:text-xs"
              style={{ backgroundColor: MAROON_RIBBON }}
            >
              <Building2 className="h-4 w-4 shrink-0 text-white" strokeWidth={2} aria-hidden />
              <span className="leading-tight">Corporate gifting</span>
            </Link>
            <Link
              to="/shop"
              className="flex min-h-[3.25rem] flex-1 items-center justify-center gap-2 rounded-full border border-[#e8e0d8] bg-[#FAF7F4] px-2 py-2.5 text-center font-sans text-[11.5px] font-bold uppercase leading-tight tracking-[0.08em] text-[#A67C32] shadow-sm active:scale-[0.98] sm:text-xs"
            >
              <Gift className="h-4 w-4 shrink-0 text-[#B8924F]" strokeWidth={2} aria-hidden />
              <span className="leading-tight">Personalized Gifts</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ─── DESKTOP (xl+) — single-row reference layout ───────────────────── */}
      <header className="hidden border-b border-black/[0.05] bg-[#FFF9F5] xl:block">
        <div className="mx-auto max-w-[90rem] px-8 2xl:px-10">
          <div className="grid grid-cols-[15.5rem_auto_minmax(0,1fr)_auto] items-center gap-x-4 py-[18px] 2xl:grid-cols-[16.5rem_auto_minmax(0,1fr)_auto] 2xl:gap-x-5 2xl:py-[22px]">
            {/* Logo */}
            <Link
              to="/home"
              className="mx-auto flex flex-col items-center gap-1 shrink-0 w-[12.5rem] 2xl:w-[13.5rem]"
            >
              <div className="relative h-[2.2rem] w-full 2xl:h-[2.4rem] shrink-0">
                <AppImage
                  src={LOGO_SRC}
                  alt="Giftz Gallerei"
                  fill
                  className="object-contain object-center"
                  priority
                  sizes="200px"
                />
              </div>
              <span className="text-[8.5px] 2xl:text-[9.5px] font-bold tracking-[0.1em] text-[#4A1020] uppercase whitespace-nowrap leading-none mt-2">
                Gifts That Make An Impression
              </span>
            </Link>

            {/* CTA buttons */}
            <div className="flex shrink-0 items-center gap-2.5">
              <Link to="/corporate" className="relative shrink-0">
                <NewBadge />
                <span
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_4px_12px_rgba(74,16,32,0.12)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_6px_16px_rgba(74,16,32,0.18)] active:scale-[0.97] 2xl:px-6 2xl:py-3 2xl:text-[12.5px]',
                    isNavActive('/corporate') ? 'bg-[#3D0A14]' : 'bg-[#4A1020] hover:bg-[#3D0A14]'
                  )}
                >
                  <Gift className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
                  <span className="whitespace-nowrap">Corporate gifting</span>
                </span>
              </Link>
              <Link to="/shop" className="relative shrink-0">
                <NewBadge />
                <span
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full border border-[#C9A96E]/55 bg-white px-5 py-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-[#4A1020] shadow-[0_4px_12px_rgba(201,169,110,0.08)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_6px_16px_rgba(201,169,110,0.15)] active:scale-[0.97] 2xl:px-6 2xl:py-3 2xl:text-[12.5px]',
                    isNavActive('/shop') ? 'bg-[#FAF7F4]' : 'hover:bg-[#FAF7F4]/80'
                  )}
                >
                  <ShoppingBasket className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
                  <span className="whitespace-nowrap">Personalized Gifts</span>
                </span>
              </Link>
            </div>

            {/* Main nav links — align toward utilities so Contact is never clipped */}
            <nav
              className="flex min-w-0 items-center justify-end gap-4 overflow-x-auto overflow-y-visible py-1 pl-2 pr-1 [-ms-overflow-style:none] [scrollbar-width:none] 2xl:gap-6 [&::-webkit-scrollbar]:hidden"
              aria-label="Primary"
            >
              {desktopNavLinks.map((link) => {
                const active = isNavActive(link.href);
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      'relative shrink-0 whitespace-nowrap px-0.5 font-sans text-[12px] font-bold uppercase tracking-[0.08em] transition-colors 2xl:text-[13.5px] 2xl:tracking-[0.1em]',
                      active ? 'text-[#4A0E1C]' : 'text-[#1A1010] hover:text-[#4A0E1C]'
                    )}
                  >
                    <span className="inline-flex items-center gap-0.5">
                      {link.label}
                      {'chevron' in link && link.chevron && (
                        <ChevronDown className="h-3 w-3 shrink-0 opacity-60" strokeWidth={2} aria-hidden />
                      )}
                    </span>
                    {active && link.href === '/home' && (
                      <span
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#4A0E1C]"
                        aria-hidden
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Utility icons */}
            <div className="flex shrink-0 items-center gap-3 border-l border-[#dcd8d4] pl-3 2xl:gap-6 2xl:pl-6">
              <Link
                to="/wishlist"
                className="flex flex-col items-center gap-1 text-[#1a1a1a] transition-opacity hover:opacity-75"
                aria-label="Wishlist"
              >
                <Heart className="h-[21px] w-[21px]" strokeWidth={iconThin} strokeLinecap="round" strokeLinejoin="round" />
                <span className="font-sans text-[12.5px] font-semibold leading-none">Wishlist</span>
              </Link>
              <Link
                to="/account"
                className="flex flex-col items-center gap-1 text-[#1a1a1a] transition-opacity hover:opacity-75"
                aria-label="Account"
              >
                <CircleUser className="h-[21px] w-[21px]" strokeWidth={iconThin} strokeLinecap="round" />
                <span className="font-sans text-[12.5px] font-semibold leading-none">Account</span>
              </Link>
              <Link
                to="/cart"
                className="relative flex flex-col items-center gap-1 text-[#1a1a1a]"
                aria-label="Shopping cart, 0 items"
              >
                <span className="relative inline-flex">
                  <ShoppingBag className="h-[21px] w-[21px]" strokeWidth={iconThin} strokeLinecap="round" strokeLinejoin="round" />
                  <span className="absolute -right-1.5 -top-1.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#e11d48] px-0.5 text-[10.5px] font-semibold leading-none text-white">
                    0
                  </span>
                </span>
                <span className="font-sans text-[12.5px] font-semibold leading-none">Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ─── TABLET / SMALL DESKTOP (md–xl) — two rows, full nav visible ── */}
      <header className="hidden border-b border-black/[0.06] bg-[#FFF9F5] md:block xl:hidden">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex items-center justify-between gap-4 py-[18px]">
            <Link to="/home" className="flex flex-col items-center gap-1 shrink-0 w-[12.5rem]">
              <div className="relative h-[2.1rem] w-full shrink-0">
                <AppImage src={LOGO_SRC} alt="Giftz Gallerei" fill className="object-contain object-center" priority sizes="192px" />
              </div>
              <span className="text-[8.5px] font-bold tracking-[0.08em] text-[#4A1020] uppercase whitespace-nowrap leading-none mt-2">
                Gifts That Make An Impression
              </span>
            </Link>
            <div className="flex items-center gap-5">
              <Link to="/wishlist" className="flex flex-col items-center gap-0.5 text-[#1a1a1a] transition-opacity hover:opacity-75" aria-label="Wishlist">
                <Heart className="h-5 w-5" strokeWidth={iconThin} />
                <span className="text-[12px] font-semibold">Wishlist</span>
              </Link>
              <Link to="/account" className="flex flex-col items-center gap-0.5 text-[#1a1a1a] transition-opacity hover:opacity-75" aria-label="Account">
                <CircleUser className="h-5 w-5" strokeWidth={iconThin} />
                <span className="text-[12px] font-semibold">Account</span>
              </Link>
              <Link to="/cart" className="relative flex flex-col items-center gap-0.5 text-[#1a1a1a]" aria-label="Cart">
                <ShoppingBag className="h-5 w-5" strokeWidth={iconThin} />
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e11d48] text-[10px] font-semibold text-white">
                  0
                </span>
                <span className="text-[12px] font-semibold">Cart</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 overflow-x-auto pb-[18px] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <Link to="/corporate" className="relative shrink-0">
              <NewBadge />
              <span
                className={cn(
                  'inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.06em] text-white shadow-[0_2px_8px_rgba(74,16,32,0.1)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.97]',
                  isNavActive('/corporate') ? 'bg-[#3D0A14]' : 'bg-[#4A1020] hover:bg-[#3D0A14]'
                )}
              >
                <Gift className="h-3 w-3" strokeWidth={2} aria-hidden />
                Corporate
              </span>
            </Link>
            <Link to="/shop" className="relative shrink-0">
              <NewBadge />
              <span
                className={cn(
                  'inline-flex items-center gap-1 rounded-full border border-[#C9A96E]/55 bg-white px-3.5 py-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.06em] text-[#4A1020] shadow-[0_2px_8px_rgba(201,169,110,0.06)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.97]',
                  isNavActive('/shop') ? 'bg-[#FAF7F4]' : 'hover:bg-[#FAF7F4]/80'
                )}
              >
                <ShoppingBasket className="h-3 w-3" strokeWidth={2} aria-hidden />
                Personalized
              </span>
            </Link>
            {desktopNavLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'shrink-0 whitespace-nowrap px-2.5 py-1 font-sans text-[12px] font-bold uppercase tracking-[0.08em] transition-colors',
                  isNavActive(link.href) ? 'text-[#4A0E1C]' : 'text-[#1A1010] hover:text-[#4A0E1C]'
                )}
              >
                {link.label}
              </Link>
            ))}
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
            <div className="flex flex-col items-center gap-1 shrink-0 w-[9.5rem] sm:w-[10.5rem]">
              <div className="relative h-[1.8rem] w-full sm:h-[2.1rem] shrink-0">
                <AppImage src={LOGO_SRC} alt="Giftz Gallerei" fill className="object-contain object-center" sizes="208px" />
              </div>
              <span className="text-[7px] sm:text-[8px] font-bold tracking-[0.08em] text-[#4A1020] uppercase whitespace-nowrap leading-none mt-1.5">
                Gifts That Make An Impression
              </span>
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
            <p className="px-2 pb-2 text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#9a9490]">Menu</p>
            {drawerLinks.map((item) => (
              <Link
                key={item.href + item.label}
                to={item.href}
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
              to="/wishlist"
              className="flex flex-col items-center gap-1 rounded-xl border border-[#e8e4e1] bg-white py-3 font-sans text-[12px] font-semibold uppercase tracking-wide text-[#1a1a1a]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Heart className="h-4 w-4" strokeWidth={1.75} />
              Wishlist
            </Link>
            <Link
              to="/account"
              className="flex flex-col items-center gap-1 rounded-xl border border-[#e8e4e1] bg-white py-3 font-sans text-[12px] font-semibold uppercase tracking-wide text-[#1a1a1a]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <CircleUser className="h-4 w-4" strokeWidth={1.75} />
              Account
            </Link>
            <Link
              to="/cart"
              className="relative flex flex-col items-center gap-1 rounded-xl border border-[#c9a574] bg-white py-3 font-sans text-[12px] font-semibold uppercase tracking-wide text-[#1a1a1a]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <ShoppingBag className="h-4 w-4" strokeWidth={1.75} />
              Cart
              <span className="absolute right-3 top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#e11d48] px-0.5 text-[10.5px] font-semibold text-white">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
