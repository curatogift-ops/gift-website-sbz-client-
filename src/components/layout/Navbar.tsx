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
  BriefcaseBusiness,
  ChevronRight,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';

const LOGO_SRC = '/images/gift-gallerei-logo.png';

const CREAM = '#FFF9F5';
const MAROON_RIBBON = '#3D181C';

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
    { label: 'Shop', href: '/shop' },
    { label: 'Brands', href: '/brands' },
    { label: 'Personalized gifts', href: '/shop' },
    { label: 'Corporate gifting', href: '/corporate' },
    { label: 'Make Your Own Hamper', href: '/custom-boxes' },
    { label: 'About us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const desktopNavLinks = [
    { label: 'Shop', href: '/shop', chevron: true },
    { label: 'Brands', href: '/brands' },
    { label: 'Make Your Own Hamper', href: '/custom-boxes' },
    { label: 'About us', href: '/about' },
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
              className="mx-auto flex flex-col items-center gap-1 shrink-0 w-[11.5rem] sm:w-[12.5rem]"
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

          <div className="border-t border-black/[0.06] bg-white px-3 pb-3 pt-2.5">
            <div className="flex w-full overflow-hidden rounded-[0.95rem] border border-[#d8cec1] bg-[#F6F3EE] p-1 shadow-sm">
            <Link
              to="/shop"
              className={cn(
                "relative flex min-h-[3.05rem] flex-1 items-center justify-center gap-2 rounded-[0.72rem] px-2 py-2.5 text-center font-serif text-[13px] font-semibold leading-tight active:scale-[0.98] sm:text-[14px] transition-colors",
                isNavActive('/shop')
                  ? 'bg-[#4A1020] text-[#F2EDE8] shadow-[0_5px_12px_rgba(74,16,32,0.28)]'
                  : 'text-[#4A1020]'
              )}
            >
              <Heart
                className={cn(
                  "h-4 w-4 shrink-0",
                  isNavActive('/shop') ? 'text-[#F2EDE8]' : 'text-[#6B1E30]'
                )}
                strokeWidth={2}
                aria-hidden
              />
              <span className="leading-tight">Personalized Gifts</span>
            </Link>
            <Link
              to="/corporate"
              className={cn(
                "flex min-h-[3.05rem] flex-1 items-center justify-center gap-2 rounded-[0.72rem] px-2 py-2.5 text-center font-serif text-[13px] font-semibold leading-tight active:scale-[0.98] sm:text-[14px] transition-colors",
                isNavActive('/corporate')
                  ? 'bg-[#4A1020] text-[#F2EDE8] shadow-[0_5px_12px_rgba(74,16,32,0.28)]'
                  : 'text-[#4A1020]'
              )}
            >
              <BriefcaseBusiness
                className={cn(
                  "h-4 w-4 shrink-0",
                  isNavActive('/corporate') ? 'text-[#F2EDE8]' : 'text-[#6B1E30]'
                )}
                strokeWidth={1.9}
                aria-hidden
              />
              <span className="leading-tight">Corporate Gifts</span>
            </Link>
            </div>
          </div>
        </div>
      </header>

      <header className="hidden border-b border-black/[0.05] bg-[#FFF9F5] xl:block">
        <div className="w-full px-4 2xl:px-6">
          <div className="grid grid-cols-[12.5rem_auto_minmax(0,1fr)_auto] items-center gap-x-3 py-[16px] 2xl:grid-cols-[14rem_auto_minmax(0,1fr)_auto] 2xl:gap-x-4.5 2xl:py-[20px]">
            {/* Logo */}
            <Link
              to="/home"
              className="flex flex-col items-start gap-1 shrink-0 w-[11.5rem] 2xl:w-[12.5rem]"
            >
              <div className="relative h-[2.2rem] w-full 2xl:h-[2.4rem] shrink-0">
                <AppImage
                  src={LOGO_SRC}
                  alt="Giftz Gallerei"
                  fill
                  className="object-contain object-left"
                  priority
                  sizes="200px"
                />
              </div>
            </Link>
 
            {/* CTA buttons */}
            <div className="flex shrink-0 items-center">
              <div className="flex overflow-hidden rounded-[1rem] border border-[#d8cec1] bg-[#F6F3EE] p-1 shadow-[0_3px_10px_rgba(74,16,32,0.08)]">
                <Link
                  to="/shop"
                  className={cn(
                    'inline-flex items-center gap-2 rounded-[0.75rem] px-5 py-2.5 font-serif text-[15px] font-semibold tracking-[0.01em] transition-all duration-300 active:scale-[0.98]',
                    isNavActive('/shop')
                      ? 'bg-[#4A1020] text-[#F2EDE8] shadow-[0_6px_14px_rgba(74,16,32,0.3)]'
                      : 'text-[#4A1020] hover:bg-[#EEE7DC]'
                  )}
                >
                  <Heart className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                  <span className="whitespace-nowrap">Personalized Gifts</span>
                </Link>
                <Link
                  to="/corporate"
                  className={cn(
                    'inline-flex items-center gap-2 rounded-[0.75rem] px-5 py-2.5 font-serif text-[15px] font-semibold tracking-[0.01em] transition-all duration-300 active:scale-[0.98]',
                    isNavActive('/corporate')
                      ? 'bg-[#4A1020] text-[#F2EDE8] shadow-[0_6px_14px_rgba(74,16,32,0.3)]'
                      : 'text-[#4A1020] hover:bg-[#EEE7DC]'
                  )}
                >
                  <BriefcaseBusiness className="h-4 w-4 shrink-0" strokeWidth={1.9} aria-hidden />
                  <span className="whitespace-nowrap">Corporate Gifts</span>
                </Link>
              </div>
            </div>
 
            {/* Main nav links — aligned center so it fits perfectly on all desktops */}
            <nav
              className="flex min-w-0 items-center justify-start xl:justify-center gap-2.5 overflow-x-auto overflow-y-visible py-1 pl-2 pr-1 [-ms-overflow-style:none] [scrollbar-width:none] 2xl:gap-4 [&::-webkit-scrollbar]:hidden"
              aria-label="Primary"
            >
              {desktopNavLinks.map((link) => {
                const active = isNavActive(link.href);
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      'group relative shrink-0 whitespace-nowrap px-0.5 font-sans text-[10.5px] font-bold uppercase tracking-[0.07em] transition-colors 2xl:text-[12px] 2xl:tracking-[0.09em]',
                      active ? 'text-[#4A0E1C]' : 'text-[#1A1010] hover:text-[#4A0E1C]'
                    )}
                  >
                    <span className="relative inline-flex items-center gap-0.5 py-1">
                      {link.label}
                      {'chevron' in link && link.chevron && (
                        <ChevronDown className="h-3 w-3 shrink-0 opacity-60 transition-transform group-hover:translate-y-0.5" strokeWidth={2} aria-hidden />
                      )}
                      <span
                        className={cn(
                          "absolute bottom-0 left-0 h-[2px] bg-[#4A0E1C] transition-all duration-300",
                          active ? "w-full" : "w-0 group-hover:w-full"
                        )}
                      />
                    </span>
                  </Link>
                );
              })}
            </nav>
 
            {/* Utility icons */}
            <div className="flex shrink-0 items-center gap-2.5 border-l border-[#dcd8d4] pl-2.5 2xl:gap-5 2xl:pl-5">
              <Link
                to="/wishlist"
                className="flex flex-col items-center gap-1 text-[#1a1a1a] transition-opacity hover:opacity-75"
                aria-label="Wishlist"
              >
                <Heart className="h-[20px] w-[20px] 2xl:h-[21px] 2xl:w-[21px]" strokeWidth={iconThin} strokeLinecap="round" strokeLinejoin="round" />
                <span className="font-sans text-[11.5px] font-semibold leading-none 2xl:text-[12.5px]">Wishlist</span>
              </Link>
              <Link
                to="/account"
                className="flex flex-col items-center gap-1 text-[#1a1a1a] transition-opacity hover:opacity-75"
                aria-label="Account"
              >
                <CircleUser className="h-[20px] w-[20px] 2xl:h-[21px] 2xl:w-[21px]" strokeWidth={iconThin} strokeLinecap="round" />
                <span className="font-sans text-[11.5px] font-semibold leading-none 2xl:text-[12.5px]">Account</span>
              </Link>
              <Link
                to="/cart"
                className="relative flex flex-col items-center gap-1 text-[#1a1a1a]"
                aria-label="Shopping cart, 0 items"
              >
                <span className="relative inline-flex">
                  <ShoppingBag className="h-[20px] w-[20px] 2xl:h-[21px] 2xl:w-[21px]" strokeWidth={iconThin} strokeLinecap="round" strokeLinejoin="round" />
                  <span className="absolute -right-1.5 -top-1.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#e11d48] px-0.5 text-[10.5px] font-semibold leading-none text-white">
                    0
                  </span>
                </span>
                <span className="font-sans text-[11.5px] font-semibold leading-none 2xl:text-[12.5px]">Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ─── TABLET / SMALL DESKTOP (md–xl) — two rows, full nav visible ── */}
      <header className="hidden border-b border-black/[0.06] bg-[#FFF9F5] md:block xl:hidden">
        <div className="w-full px-4 sm:px-5">
          <div className="flex items-center justify-between gap-4 py-[18px]">
            <Link to="/home" className="flex flex-col items-start gap-1 shrink-0 w-[11.5rem]">
              <div className="relative h-[2.1rem] w-full shrink-0">
                <AppImage src={LOGO_SRC} alt="Giftz Gallerei" fill className="object-contain object-left" priority sizes="192px" />
              </div>
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
            <div className="flex overflow-hidden rounded-[0.95rem] border border-[#d8cec1] bg-[#F6F3EE] p-1 shadow-[0_3px_10px_rgba(74,16,32,0.08)]">
              <Link
                to="/shop"
                className={cn(
                  'inline-flex items-center gap-2 rounded-[0.72rem] px-4 py-2.5 font-serif text-[13.5px] font-semibold tracking-[0.01em] transition-all duration-300 active:scale-[0.98]',
                  isNavActive('/shop')
                    ? 'bg-[#4A1020] text-[#F2EDE8] shadow-[0_5px_12px_rgba(74,16,32,0.3)]'
                    : 'text-[#4A1020] hover:bg-[#EEE7DC]'
                )}
              >
                <Heart className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                Personalized Gifts
              </Link>
              <Link
                to="/corporate"
                className={cn(
                  'inline-flex items-center gap-2 rounded-[0.72rem] px-4 py-2.5 font-serif text-[13.5px] font-semibold tracking-[0.01em] transition-all duration-300 active:scale-[0.98]',
                  isNavActive('/corporate')
                    ? 'bg-[#4A1020] text-[#F2EDE8] shadow-[0_5px_12px_rgba(74,16,32,0.3)]'
                    : 'text-[#4A1020] hover:bg-[#EEE7DC]'
                )}
              >
                <BriefcaseBusiness className="h-3.5 w-3.5" strokeWidth={1.9} aria-hidden />
                Corporate Gifts
              </Link>
            </div>
            {desktopNavLinks.map((link) => {
              const active = isNavActive(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'group relative shrink-0 whitespace-nowrap px-2.5 py-1 font-sans text-[12px] font-bold uppercase tracking-[0.08em] transition-colors',
                    active ? 'text-[#4A0E1C]' : 'text-[#1A1010] hover:text-[#4A0E1C]'
                  )}
                >
                  <span className="relative inline-flex items-center py-0.5">
                    {link.label}
                    <span
                      className={cn(
                        "absolute bottom-0 left-0 h-[2px] bg-[#4A0E1C] transition-all duration-300",
                        active ? "w-full" : "w-0 group-hover:w-full"
                      )}
                    />
                  </span>
                </Link>
              );
            })}
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
