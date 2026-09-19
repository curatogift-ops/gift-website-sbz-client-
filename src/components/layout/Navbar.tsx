import { Link, useLocation } from 'react-router-dom';
import BrandLogo from '@/components/ui/BrandLogo';
import NavSearchBar from '@/components/layout/NavSearchBar';
import {
  ShoppingBag,
  CircleUser,
  Menu,
  Search,
  Heart,
  X,
  ChevronDown,
  ChevronRight,
  Download,
  ChevronLeft,
  Phone,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';
import { PROMOTIONAL_GIFTS_MEGA_MENU } from '@/config/promotionalGiftsMenu';
import { CORPORATE_GIFTING_MEGA_MENU } from '@/config/corporateGiftingMenu';
import { COMPANY_INFO } from '@/config/companyInfo';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';

const SURFACE = '#FFFFFF';
const MAROON_RIBBON = '#3D181C';

export default function Navbar() {
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const [menuLevel, setMenuLevel] = useState<0 | 1 | 2>(0);
  const [activeParent0, setActiveParent0] = useState<string | null>(null);
  const [activeParent1, setActiveParent1] = useState<string | null>(null);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const megaCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipScrollRestoreRef = useRef(false);

  const clearMegaCloseTimer = () => {
    if (megaCloseTimerRef.current) {
      clearTimeout(megaCloseTimerRef.current);
      megaCloseTimerRef.current = null;
    }
  };

  const scheduleMegaClose = () => {
    clearMegaCloseTimer();
    megaCloseTimerRef.current = setTimeout(() => setOpenMega(null), 180);
  };

  const openMegaMenu = (label: string) => {
    clearMegaCloseTimer();
    setOpenMega(label);
  };

  useEffect(() => {
    setOpenMega(null);
  }, [pathname]);

  useEffect(() => {
    return () => clearMegaCloseTimer();
  }, []);

  useEffect(() => {
    if (!openMega) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenMega(null);
    };
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('[data-mega-root]')) return;
      setOpenMega(null);
    };
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
    };
  }, [openMega]);


  useEffect(() => {
    if (!isMobileMenuOpen) {
      setMenuLevel(0);
      setActiveParent0(null);
      setActiveParent1(null);
    }
  }, [isMobileMenuOpen]);

  /* Lock page scroll while mobile drawer is open (prevents background scroll glitch) */
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const scrollY = window.scrollY;
    const { body, documentElement: html } = document;

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    html.style.overflow = 'hidden';

    return () => {
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      body.style.overflow = '';
      html.style.overflow = '';

      if (skipScrollRestoreRef.current) {
        skipScrollRestoreRef.current = false;
        window.scrollTo(0, 0);
      } else {
        window.scrollTo(0, scrollY);
      }
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    skipScrollRestoreRef.current = true;
    setIsMobileMenuOpen(false);
    setMobileSearchOpen(false);
    setMenuLevel(0);
    setActiveParent0(null);
    setActiveParent1(null);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) setIsVisible(true);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    // Keep header pinned on catalogue so sticky category chips don't float mid-page.
    const keepHeaderPinned =
      pathname === '/catalogue' || pathname === '/download-catalogue';
    if (keepHeaderPinned) {
      setIsVisible(true);
      return;
    }

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (isMobileMenuOpen) return;
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
  }, [isMobileMenuOpen, pathname]);

  const iconThin = 1.65;
  const cartCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
  const wishlistCount = useWishlistStore((s) => s.items.length);

  const isNavActive = (href: string) => {
    const baseHref = href.split('#')[0] || href;
    return pathname === baseHref || pathname.startsWith(`${baseHref}/`);
  };

  interface DropdownItem {
    label: string;
    href: string;
  }

  interface DropdownColumn {
    title?: string;
    items: DropdownItem[];
  }

  interface NavLinkItem {
    label: string;
    href: string;
    badge?: string;
    chevron?: boolean;
    dropdown?: DropdownColumn[];
  }



  const corporateNavLinks: NavLinkItem[] = [
    {
      label: 'Corporate Gifting',
      href: '/corporate',
      chevron: true,
      dropdown: CORPORATE_GIFTING_MEGA_MENU,
    },
    {
      label: 'Promotional Gifting',
      href: '/corporate#corporate-gift-enquiry',
      chevron: true,
      dropdown: PROMOTIONAL_GIFTS_MEGA_MENU,
    },
    { label: 'Our Brands', href: '/brands' },
    { label: 'Corporate Gift Enquiry', href: '/corporate#corporate-gift-enquiry' },
    { label: 'About us', href: '/about' },
  ];

  const desktopNavLinks = corporateNavLinks;

  const renderDesktopNavLink = (link: NavLinkItem, compact = false) => {
    const active = isNavActive(link.href);
    const hasDropdown = Boolean(link.dropdown?.length);
    const isOpen = openMega === link.label;

    return (
      <div
        key={link.label}
        data-mega-root={hasDropdown ? '' : undefined}
        className={cn(
          'shrink-0',
          hasDropdown ? 'static' : 'relative',
          compact ? 'px-2.5 pt-2.5 pb-1.5' : 'py-1.5',
        )}
        onMouseEnter={() => {
          if (hasDropdown) openMegaMenu(link.label);
        }}
        onMouseLeave={() => {
          if (hasDropdown) scheduleMegaClose();
        }}
      >
        {hasDropdown ? (
          <button
            type="button"
            aria-expanded={isOpen}
            aria-haspopup="true"
            onClick={() => {
              clearMegaCloseTimer();
              setOpenMega((prev) => (prev === link.label ? null : link.label));
            }}
            className={cn(
              'relative inline-flex items-center gap-0.5 py-0.5 font-sans font-bold uppercase tracking-[0.1em] transition-colors',
              compact ? 'text-[12.5px]' : 'text-[12.5px] 2xl:text-[13.5px] 2xl:tracking-[0.1em]',
              active || isOpen ? 'text-[#4A1020]' : 'text-[#111111] hover:text-[#4A1020]',
            )}
          >
            {link.badge && (
              <span className="pointer-events-none absolute -top-[23px] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center">
                <span className="rounded-[3px] bg-[#C9A96E] px-2 py-[2.5px] font-sans text-[9px] font-extrabold uppercase leading-none tracking-[0.06em] text-white shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                  {link.badge}
                </span>
                <span className="-mt-[0.5px] block h-0 w-0 border-x-[4px] border-t-[4px] border-solid border-x-transparent border-t-[#C9A96E]" />
              </span>
            )}
            {link.label}
            <ChevronDown
              className={cn(
                'h-3 w-3 shrink-0 opacity-60 transition-transform',
                isOpen && 'translate-y-0.5',
              )}
              strokeWidth={2}
              aria-hidden
            />
            <span
              className={cn(
                'absolute bottom-0 left-0 h-[2px] bg-[#4A0E1C] transition-all duration-300',
                isOpen || active ? 'w-full' : 'w-0 group-hover:w-full',
              )}
            />
          </button>
        ) : (
          <Link
            to={link.href}
            className={cn(
              'relative inline-flex items-center gap-0.5 py-0.5 font-sans font-bold uppercase tracking-[0.1em] transition-colors',
              compact ? 'text-[12.5px]' : 'text-[12.5px] 2xl:text-[13.5px] 2xl:tracking-[0.1em]',
              active ? 'text-[#4A1020]' : 'text-[#111111] hover:text-[#4A1020]',
            )}
          >
            {link.label}
            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#4A0E1C] transition-all duration-300 hover:w-full" />
          </Link>
        )}

        {hasDropdown && link.dropdown && (
          <div
            className={cn(
              'absolute top-full z-50 pt-2.5 transition-all duration-200 ease-out',
              link.label === 'Shop' || link.label === 'Promotional Gifting'
                ? 'left-1/2 w-[min(96vw,72rem)] -translate-x-1/2'
                : 'left-1/2 w-[85vw] max-w-5xl -translate-x-1/2',
              isOpen
                ? 'pointer-events-auto visible translate-y-0 opacity-100'
                : 'pointer-events-none invisible -translate-y-1 opacity-0',
            )}
            onMouseEnter={() => openMegaMenu(link.label)}
            onMouseLeave={scheduleMegaClose}
          >
            <div className="rounded-[1.2rem] border border-[#EBEBEB] bg-white p-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12),0_8px_24px_-8px_rgba(0,0,0,0.06)] lg:p-8">
              <div
                className={cn(
                  'grid gap-6 lg:gap-8',
                  link.dropdown.length >= 5
                    ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'
                    : 'grid-cols-2 lg:grid-cols-4',
                )}
              >
                {link.dropdown.map((col, idx) => (
                  <div key={col.title ?? idx} className="flex flex-col">
                    {col.title ? (
                      <div className="mb-4 border-b border-[#E0E0E0]/30 pb-2">
                        <p className="font-sans text-[10.5px] font-extrabold uppercase tracking-widest text-[#9D7D47] 2xl:text-[11.5px]">
                          {col.title}
                        </p>
                      </div>
                    ) : (
                      <div
                        className="mb-4 select-none border-b border-transparent pb-2 opacity-0 pointer-events-none"
                        aria-hidden
                      >
                        &nbsp;
                      </div>
                    )}
                    <ul className="flex flex-col gap-2.5">
                      {col.items.map((item) => (
                        <li key={item.label}>
                          <Link
                            to={item.href}
                            onClick={() => setOpenMega(null)}
                            className="block font-sans text-[13px] font-medium normal-case tracking-normal text-[#4A1020] transition-colors duration-200 hover:text-[#9D7D47]"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {link.href && (
                <div className="mt-5 flex justify-end border-t border-[#EBEBEB] pt-4">
                  <Link
                    to={link.href}
                    onClick={() => setOpenMega(null)}
                    className="inline-flex items-center gap-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[#4A1020] transition hover:text-[#9D7D47]"
                  >
                    View all {link.label}
                    <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={cn(
        'fixed top-0 z-50 w-full max-w-[100vw] bg-white transition-transform duration-300 md:bg-white',
        !isVisible && '-translate-y-full'
      )}
    >
      {/* Announcement bar */}
      <div
        className="flex items-center justify-center border-b border-white/10 px-3 py-2 text-center text-[10px] font-medium leading-snug text-white sm:px-4 sm:py-2.5 sm:text-[11.5px] lg:text-[12px]"
        style={{ backgroundColor: MAROON_RIBBON }}
      >
        <p className="flex min-w-0 flex-wrap items-center justify-center gap-x-1 gap-y-0.5 text-white/95">
          <Link
            to="/corporate"
            className="whitespace-nowrap font-semibold text-white underline-offset-2 hover:underline hover:text-[#E8C87A]"
          >
            Bulk &amp; Corporate Gifting
          </Link>
          <span aria-hidden>|</span>
          <Link
            to="/corporate#corporate-gift-enquiry"
            className="whitespace-nowrap font-semibold text-white underline-offset-2 hover:underline hover:text-[#E8C87A]"
          >
            Competitive Quote
          </Link>
          <span aria-hidden>|</span>
          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="whitespace-nowrap font-semibold text-[#E8C87A] underline-offset-2 hover:underline"
          >
            Contact
          </a>
        </p>
      </div>

      <header className="border-b border-black/[0.06] bg-white md:hidden">
        <div className="mx-auto max-w-7xl px-3 sm:px-5 lg:px-8">
          <div className="grid grid-cols-[minmax(5.5rem,auto)_minmax(0,1fr)_minmax(5.5rem,auto)] items-center gap-2 py-[14px] sm:gap-3">
            <div className="z-10 flex items-center justify-start gap-0.5">
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

            <div className="flex min-w-0 items-center justify-center px-1 pointer-events-auto">
              <BrandLogo
                to="/"
                logoHeightClass="h-[1.45rem] sm:h-[1.7rem]"
                widthClass="w-full max-w-[9.5rem] sm:max-w-[11.5rem]"
                priority
              />
            </div>

            <div className="z-10 flex items-center justify-end gap-0.5 sm:gap-1">
              <Link
                to="/wishlist"
                className="relative flex h-10 w-10 flex-col items-center justify-center text-[#1a1a1a] transition-opacity hover:opacity-80"
                aria-label={`Wishlist, ${wishlistCount} items`}
              >
                <Heart className="h-[18px] w-[18px]" strokeWidth={iconThin} strokeLinecap="round" strokeLinejoin="round" />
                {wishlistCount > 0 && (
                  <span className="absolute right-0.5 top-0.5 flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-[#e11d48] px-0.5 text-[9px] font-semibold leading-none text-white ring-2 ring-white">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </Link>
              <Link
                to="/contact"
                className="hidden h-10 w-10 flex-col items-center justify-center text-[#1a1a1a] transition-opacity hover:opacity-80 xs:flex"
                aria-label="Account"
              >
                <CircleUser className="h-[18px] w-[18px]" strokeWidth={iconThin} strokeLinecap="round" />
              </Link>
              <Link
                to="/cart"
                className="relative flex h-10 w-10 items-center justify-center text-[#1a1a1a]"
                aria-label={`Shopping cart, ${cartCount} items`}
              >
                <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={iconThin} strokeLinecap="round" strokeLinejoin="round" aria-hidden />
                <span className="absolute right-0 top-0 flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-[#e11d48] px-0.5 text-[9.5px] font-semibold leading-none text-white ring-2 ring-white">
                  {cartCount > 99 ? '99+' : cartCount}
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
            <NavSearchBar compact className="w-full border-0 bg-transparent shadow-none focus-within:ring-0" onSubmitted={() => setMobileSearchOpen(false)} />
          </div>

        </div>
      </header>

      <header className="hidden border-b border-black/[0.05] bg-white xl:block">
        <div className="w-full px-4 2xl:px-6">
          {/* Row 1: Logo (left) + Search & Icons (right) */}
          <div className="relative flex items-center justify-between pt-3 pb-3 border-b border-[#e8e4e1]/40">
            <BrandLogo
              to="/"
              className="z-10"
              logoHeightClass="h-[2.15rem] 2xl:h-[2.3rem]"
              widthClass="w-[14rem] 2xl:w-[15.5rem]"
              priority
            />

            <div className="flex items-center gap-6 z-10">
              {/* Search Bar next to icons */}
              <div className="hidden lg:block w-[18rem] 2xl:w-[20rem]">
                <NavSearchBar className="w-full shadow-none" />
              </div>

              {/* Utility icons on the right */}
              <div className="flex shrink-0 items-center gap-3 2xl:gap-5">
              <Link
                to="/wishlist"
                className="flex flex-col items-center gap-1 text-[#1a1a1a] transition-opacity hover:opacity-75"
                aria-label="Wishlist"
              >
                <Heart className="h-[20px] w-[20px] 2xl:h-[21px] 2xl:w-[21px]" strokeWidth={iconThin} strokeLinecap="round" strokeLinejoin="round" />
                <span className="font-sans text-[11.5px] font-semibold leading-none 2xl:text-[12.5px]">Wishlist</span>
              </Link>
              <Link
                to="/contact"
                className="flex flex-col items-center gap-1 text-[#1a1a1a] transition-opacity hover:opacity-75"
                aria-label="Account"
              >
                <CircleUser className="h-[20px] w-[20px] 2xl:h-[21px] 2xl:w-[21px]" strokeWidth={iconThin} strokeLinecap="round" />
                <span className="font-sans text-[11.5px] font-semibold leading-none 2xl:text-[12.5px]">Account</span>
              </Link>
              <Link
                to="/cart"
                className="relative flex flex-col items-center gap-1 text-[#1a1a1a]"
                aria-label={`Shopping cart, ${cartCount} items`}
              >
                <span className="relative inline-flex">
                  <ShoppingBag className="h-[20px] w-[20px] 2xl:h-[21px] 2xl:w-[21px]" strokeWidth={iconThin} strokeLinecap="round" strokeLinejoin="round" />
                  <span className="absolute -right-1.5 -top-1.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#e11d48] px-0.5 text-[10.5px] font-semibold leading-none text-white">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                </span>
                <span className="font-sans text-[11.5px] font-semibold leading-none 2xl:text-[12.5px] mt-0.5">Cart</span>
              </Link>
            </div>
            </div>
          </div>

          {/* Row 2: Centered Nav links + Catalogue button on the right */}
          <div className="flex items-center justify-between py-1.5">
            <div className="hidden w-[12.5rem] shrink-0 2xl:w-[14rem] xl:block" aria-hidden />

            <nav
              className="relative flex min-w-0 flex-1 items-center justify-center gap-4 2xl:gap-6 overflow-visible py-0.5"
              aria-label="Primary"
            >
              {desktopNavLinks.map((link) => renderDesktopNavLink(link))}
            </nav>

            {/* Right side: Download Catalogue → Catalogue Library */}
            <div className="flex justify-end w-[12.5rem] 2xl:w-[14rem] shrink-0">
              <Link
                to="/catalogue"
                className="inline-flex items-center gap-2 rounded-xl bg-[#4A1020] text-white hover:bg-[#5C1629] transition-all duration-300 px-4 py-2.5 text-[10px] font-sans font-bold uppercase tracking-[0.08em] shadow-[0_4px_12px_rgba(74,16,32,0.15)] hover:shadow-[0_6px_16px_rgba(74,16,32,0.25)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
              >
                <Download className="h-3.5 w-3.5 text-[#C9A96E]" strokeWidth={2} aria-hidden />
                <span className="whitespace-nowrap">Download Catalogue</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ─── TABLET / SMALL DESKTOP (md–xl) — two rows, full nav visible ── */}
      <header className="hidden border-b border-black/[0.06] bg-white md:block xl:hidden">
        <div className="w-full px-4 sm:px-5">
          <div className="flex items-start justify-between gap-4 py-4">
            <BrandLogo
              to="/"
              logoHeightClass="h-[2rem]"
              widthClass="w-[13rem]"
              priority
            />
            <div className="flex items-center gap-5">
              <Link to="/wishlist" className="flex flex-col items-center gap-0.5 text-[#1a1a1a] transition-opacity hover:opacity-75" aria-label="Wishlist">
                <Heart className="h-5 w-5" strokeWidth={iconThin} />
                <span className="text-[12px] font-semibold">Wishlist</span>
              </Link>
              <Link to="/contact" className="flex flex-col items-center gap-0.5 text-[#1a1a1a] transition-opacity hover:opacity-75" aria-label="Account">
                <CircleUser className="h-5 w-5" strokeWidth={iconThin} />
                <span className="text-[12px] font-semibold">Account</span>
              </Link>
              <Link to="/cart" className="relative flex flex-col items-center gap-0.5 text-[#1a1a1a]" aria-label={`Cart, ${cartCount} items`}>
                <ShoppingBag className="h-5 w-5" strokeWidth={iconThin} />
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e11d48] text-[10px] font-semibold text-white">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
                <span className="text-[12px] font-semibold">Cart</span>
              </Link>
            </div>
          </div>
          <div className="flex min-w-0 flex-col gap-2 border-t border-[#e8e4e1]/50 py-2.5">
            <div className="px-1">
              <NavSearchBar compact className="w-full max-w-none" />
            </div>
            <nav
              className="relative flex min-w-0 flex-wrap items-center justify-center gap-x-3 gap-y-1 overflow-visible px-1 py-0.5 sm:gap-x-3.5"
              aria-label="Primary"
            >
            {desktopNavLinks.map((link) => renderDesktopNavLink(link, true))}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          'fixed inset-0 z-[110] overscroll-none touch-none bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 md:hidden',
          isMobileMenuOpen
            ? 'pointer-events-auto visible opacity-100'
            : 'pointer-events-none invisible opacity-0'
        )}
        aria-hidden={!isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className={cn(
            'absolute left-0 top-0 flex h-[100dvh] max-h-[100dvh] w-[min(88vw,24rem)] max-w-sm flex-col overscroll-contain shadow-2xl transition-transform duration-300 ease-out touch-auto',
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          )}
          style={{ backgroundColor: SURFACE }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* DRAWER HEADER */}
          <div className="flex flex-shrink-0 items-center justify-between border-b border-[#EBEBEB] px-4 py-3 bg-white">
            <div className="flex shrink-0 w-[10.5rem] sm:w-[11.5rem]">
              <BrandLogo
                to="/"
                logoHeightClass="h-[1.55rem] sm:h-[1.7rem]"
                widthClass="w-full"
              />
            </div>
            <div className="flex items-center gap-1">
              <Link
                to="/wishlist"
                className="flex h-10 w-10 items-center justify-center text-[#1a1a1a]"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Wishlist"
              >
                <Heart className="h-[18px] w-[18px]" strokeWidth={iconThin} />
              </Link>
              <Link
                to="/contact"
                className="flex h-10 w-10 items-center justify-center text-[#1a1a1a]"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Account"
              >
                <CircleUser className="h-[18px] w-[18px]" strokeWidth={iconThin} />
              </Link>
              <Link
                to="/cart"
                className="relative flex h-10 w-10 items-center justify-center text-[#1a1a1a]"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label={`Shopping cart, ${cartCount} items`}
              >
                <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={iconThin} />
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#e11d48] px-0.5 text-[9.5px] font-semibold leading-none text-white ring-2 ring-white">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-[#e8e4e1] bg-white text-[#1a1a1a]"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* SLIDING PANELS */}
          <div className="relative flex-1 overflow-hidden min-h-0 flex flex-col">
            <div
              className="flex w-[300%] h-full transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${(menuLevel * 100) / 3}%)` }}
            >
              {/* PANEL 0 */}
              <div className="w-1/3 shrink-0 h-full overflow-y-auto no-scrollbar px-4 py-4 flex flex-col gap-1.5">
                <div className="mb-2 flex items-center gap-3 rounded-xl border border-[#C9A96E]/20 bg-[#C9A96E]/5 px-4 py-3 text-left">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#C9A96E]/30 bg-[#C9A96E]/10 text-[#9D7D47]">
                    <Phone className="h-4 w-4" strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-sans text-[9px] font-bold uppercase tracking-[0.16em] text-[#9D7D47]">Corporate Orders</p>
                    <a href={`tel:${COMPANY_INFO.phone}`} className="block text-[12.5px] font-bold text-[#4A1020] hover:underline">
                      {COMPANY_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setActiveParent0("Corporate Gifting");
                    setMenuLevel(1);
                  }}
                  className="rounded-xl px-4 py-3.5 font-sans text-[13px] font-bold uppercase tracking-[0.08em] flex items-center justify-between text-[#1f1f1f] bg-white/50 hover:bg-white/85 transition-colors border border-black/[0.02]"
                >
                  <span>Corporate Gifting</span>
                  <ChevronRight className="h-4 w-4 text-[#4A1020]" strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveParent0("Promotional Gifting");
                    setMenuLevel(1);
                  }}
                  className="rounded-xl px-4 py-3.5 font-sans text-[13px] font-bold uppercase tracking-[0.08em] flex items-center justify-between text-[#1f1f1f] bg-white/50 hover:bg-white/85 transition-colors border border-black/[0.02]"
                >
                  <span>Promotional Gifting</span>
                  <ChevronRight className="h-4 w-4 text-[#4A1020]" strokeWidth={2} />
                </button>
                <Link
                  to="/brands"
                  className="rounded-xl px-4 py-3.5 font-sans text-[13px] font-bold uppercase tracking-[0.08em] flex items-center justify-between text-[#1f1f1f] bg-white/50 hover:bg-white/85 transition-colors border border-black/[0.02]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Our Brands
                </Link>
                <Link
                  to="/corporate#corporate-gift-enquiry"
                  className="rounded-xl px-4 py-3.5 font-sans text-[13px] font-bold uppercase tracking-[0.08em] flex items-center justify-between text-[#1f1f1f] bg-white/50 hover:bg-white/85 transition-colors border border-black/[0.02]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Corporate Gift Enquiry
                </Link>
                <Link
                  to="/about"
                  className="rounded-xl px-4 py-3.5 font-sans text-[13px] font-bold uppercase tracking-[0.08em] flex items-center justify-between text-[#1f1f1f] bg-white/50 hover:bg-white/85 transition-colors border border-black/[0.02]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  className="rounded-xl px-4 py-3.5 font-sans text-[13px] font-bold uppercase tracking-[0.08em] flex items-center justify-between text-[#1f1f1f] bg-white/50 hover:bg-white/85 transition-colors border border-black/[0.02]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>

              {/* PANEL 1 */}
              <div className="w-1/3 shrink-0 h-full overflow-y-auto no-scrollbar px-4 py-4 flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setMenuLevel(0);
                    setActiveParent0(null);
                  }}
                  className="flex items-center gap-1.5 py-2 px-1 text-[#4A1020] hover:text-[#9D7D47] font-sans text-[11px] font-bold uppercase tracking-widest transition-colors mb-2"
                >
                  <ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
                  <span>Back</span>
                </button>

                {activeParent0 && (
                  <p className="px-1.5 pb-2 text-[14px] font-sans font-extrabold uppercase tracking-wider text-[#4A1020] border-b border-[#ebe6e2]/40 mb-2">
                    {activeParent0}
                  </p>
                )}

                {activeParent0 === "Corporate Gifting" && (
                  <>
                    {CORPORATE_GIFTING_MEGA_MENU.map((col) =>
                      col.title ? (
                        <button
                          key={col.title}
                          type="button"
                          onClick={() => {
                            setActiveParent1(col.title!);
                            setMenuLevel(2);
                          }}
                          className="rounded-xl px-4 py-3.5 font-sans text-[13px] font-semibold uppercase tracking-[0.08em] flex items-center justify-between text-[#1f1f1f] bg-white/50 hover:bg-white/80 transition-colors"
                        >
                          <span>{col.title}</span>
                          <ChevronRight className="h-4 w-4 text-[#C9A96E]" strokeWidth={2} />
                        </button>
                      ) : null,
                    )}
                  </>
                )}

                {activeParent0 === "Promotional Gifting" && (
                  <>
                    {PROMOTIONAL_GIFTS_MEGA_MENU.map((col) =>
                      col.title ? (
                        <button
                          key={col.title}
                          type="button"
                          onClick={() => {
                            setActiveParent1(col.title!);
                            setMenuLevel(2);
                          }}
                          className="rounded-xl px-4 py-3.5 font-sans text-[13px] font-semibold uppercase tracking-[0.08em] flex items-center justify-between text-[#1f1f1f] bg-white/50 hover:bg-white/80 transition-colors"
                        >
                          <span>{col.title}</span>
                          <ChevronRight className="h-4 w-4 text-[#C9A96E]" strokeWidth={2} />
                        </button>
                      ) : null,
                    )}
                  </>
                )}


              </div>

              {/* PANEL 2 */}
              <div className="w-1/3 shrink-0 h-full overflow-y-auto no-scrollbar px-4 py-4 flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setMenuLevel(1);
                    setActiveParent1(null);
                  }}
                  className="flex items-center gap-1.5 py-2 px-1 text-[#4A1020] hover:text-[#9D7D47] font-sans text-[11px] font-bold uppercase tracking-widest transition-colors mb-2"
                >
                  <ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
                  <span>Back</span>
                </button>

                {activeParent1 && (
                  <p className="px-1.5 pb-2 text-[14px] font-sans font-extrabold uppercase tracking-wider text-[#4A1020] border-b border-[#ebe6e2]/40 mb-2">
                    {activeParent1}
                  </p>
                )}

                {[...CORPORATE_GIFTING_MEGA_MENU, ...PROMOTIONAL_GIFTS_MEGA_MENU]
                  .filter((col) => col.title && col.title === activeParent1)
                  .flatMap((col) => col.items)
                  .map((item) => (
                    <Link
                      key={`${activeParent1}-${item.label}`}
                      to={item.href}
                      className="block rounded-xl px-4 py-3 font-sans text-[13px] font-medium text-[#4A1020] hover:bg-white/80 hover:text-[#9D7D47] transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
              </div>
            </div>
          </div>

          {/* DRAWER FOOTER */}
          <div className="flex-shrink-0 border-t border-[#ebe6e2] bg-white p-4 flex flex-col gap-2">
            <Link
              to="/catalogue"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#9D7D47] text-white hover:bg-[#8A6C3C] transition-colors py-3.5 font-sans text-[11px] font-bold uppercase tracking-widest shadow-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Download className="h-4 w-4 text-[#FFE9C9]" strokeWidth={2} />
              <span>Download Catalogue</span>
            </Link>
            
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#C9A96E]/40 bg-surface-muted hover:bg-surface-muted transition-colors py-3 font-sans text-[12px] font-semibold text-[#4A1020]"
            >
              <svg className="h-4.5 w-4.5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.706 1.458h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>Hey, Let's Chat</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
