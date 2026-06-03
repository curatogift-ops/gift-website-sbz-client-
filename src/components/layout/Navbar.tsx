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
  Download,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';
import { SHOP_MEGA_MENU } from '@/config/shopMenu';
import { PROMOTIONAL_GIFTS_MEGA_MENU } from '@/config/promotionalGiftsMenu';

const LOGO_SRC = '/images/gift-gallerei-logo.png';

const CREAM = '#FFF9F5';
const MAROON_RIBBON = '#3D181C';

type GiftModeSwitcherSize = 'mobile' | 'compact' | 'desktop';

function giftModeTabClass(active: boolean, size: GiftModeSwitcherSize) {
  return cn(
    'inline-flex w-full min-w-0 items-center justify-center font-sans font-extrabold uppercase transition-all duration-300 active:scale-[0.98]',
    size === 'mobile' &&
      'min-h-[2.85rem] flex-col gap-1 rounded-[0.72rem] px-1.5 py-2 text-[9px] leading-tight tracking-[0.04em] sm:min-h-[3rem] sm:flex-row sm:gap-2 sm:px-3 sm:py-2.5 sm:text-[11px] sm:tracking-[0.06em]',
    size === 'compact' &&
      'min-h-[2.65rem] gap-1.5 rounded-[0.72rem] px-2 py-2 text-[10px] leading-tight tracking-[0.05em] sm:gap-2 sm:px-3.5 sm:text-[11px]',
    size === 'desktop' &&
      'min-h-[2.75rem] gap-2 rounded-[0.65rem] px-3 py-2.5 text-[10px] leading-none tracking-[0.06em] lg:px-4 lg:text-[11px]',
    active
      ? 'bg-[#4A1020] text-[#F2EDE8] shadow-[0_3px_8px_rgba(74,16,32,0.08)]'
      : 'bg-transparent text-[#4A1020] hover:bg-[#4A1020]/[0.06]'
  );
}

function GiftModeSwitcher({
  isCorporateActive,
  size = 'desktop',
}: {
  isCorporateActive: boolean;
  size?: GiftModeSwitcherSize;
}) {
  const iconClass =
    size === 'mobile' ? 'h-3.5 w-3.5 sm:h-4 sm:w-4' : size === 'compact' ? 'h-3.5 w-3.5' : 'h-3.5 w-3.5';

  const labelClass = 'min-w-0 max-w-full text-center leading-tight [text-wrap:balance]';

  return (
    <div
      className={cn(
        'grid w-full min-w-0 max-w-full grid-cols-2 gap-1 rounded-[0.95rem] border border-[#d8cec1] bg-[#F6F3EE] p-1 shadow-sm',
        size === 'desktop' && 'w-auto max-w-none rounded-[0.8rem] p-0.5 shadow-[0_3px_8px_rgba(74,16,32,0.08)]',
        size === 'compact' && 'max-w-full'
      )}
      role="tablist"
      aria-label="Gift shopping mode"
    >
      <Link
        to="/shop"
        role="tab"
        aria-selected={!isCorporateActive}
        className={giftModeTabClass(!isCorporateActive, size)}
      >
        <Heart className={cn(iconClass, 'shrink-0')} strokeWidth={2} aria-hidden />
        <span className={labelClass}>
          <span className="hidden sm:inline">Personalized Gifts</span>
          <span className="sm:hidden">Personalized</span>
        </span>
      </Link>
      <Link
        to="/corporate"
        role="tab"
        aria-selected={isCorporateActive}
        className={giftModeTabClass(isCorporateActive, size)}
      >
        <BriefcaseBusiness className={cn(iconClass, 'shrink-0')} strokeWidth={1.9} aria-hidden />
        <span className={labelClass}>
          <span className="hidden sm:inline">Corporate Gifts</span>
          <span className="sm:hidden">Corporate</span>
        </span>
      </Link>
    </div>
  );
}

export default function Navbar() {
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const [mobilePromotionalOpen, setMobilePromotionalOpen] = useState(false);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      setMobileShopOpen(false);
      setMobilePromotionalOpen(false);
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
      window.scrollTo(0, scrollY);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileSearchOpen(false);
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
  }, [isMobileMenuOpen]);

  const iconThin = 1.65;

  const isNavActive = (href: string) => {
    if (href === '/' || href === '/shop') {
      return (
        pathname === '/' ||
        pathname === '/shop' ||
        pathname.startsWith('/shop/browse')
      );
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const searchShell = (compact: boolean) =>
    cn(
      'nav-header-search flex w-full items-center gap-2 rounded-full transition-colors duration-200',
      compact ? 'max-w-full px-3 py-2.5' : 'max-w-[min(100%,320px)] px-3.5 py-2 md:max-w-[min(100%,280px)] lg:max-w-[300px]'
    );

  const isCorporateActive =
    pathname === '/corporate' ||
    pathname === '/brands' ||
    pathname.startsWith('/corporate/') ||
    pathname.startsWith('/corporate-gifting') ||
    pathname.startsWith('/promotional-gifts') ||
    pathname.startsWith('/brands/');

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

  const personalizedDrawerLinks: NavLinkItem[] = [
    { label: 'Shop', href: '/shop' },
    { label: 'Personalized gifts', href: '/shop' },
    { label: 'Corporate gifting', href: '/corporate' },
    { label: 'Make Your Own Hamper', href: '/custom-boxes' },
    { label: 'About us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const corporateDrawerLinks: NavLinkItem[] = [
    { label: 'Promotional Gifts', href: '/promotional-gifts' },
    { label: 'Corporate Gifting', href: '/corporate-gifting' },
    { label: 'Our Brands', href: '/brands' },
    { label: 'Bulk Enquiry', href: '/contact' },
    { label: 'Bulk Gifting', href: '/corporate', badge: 'New' },
    { label: 'About us', href: '/about' },
  ];

  const drawerLinks = isCorporateActive ? corporateDrawerLinks : personalizedDrawerLinks;

  const personalizedNavLinks: NavLinkItem[] = [
    { label: 'Shop', href: '/shop', chevron: true, dropdown: SHOP_MEGA_MENU },
    { label: 'Make Your Own Hamper', href: '/hamper-builder' },
    { label: 'About us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const corporateNavLinks: NavLinkItem[] = [
    {
      label: 'Promotional Gifts',
      href: '/promotional-gifts',
      chevron: true,
      dropdown: PROMOTIONAL_GIFTS_MEGA_MENU,
    },
    {
      label: 'Corporate Gifting',
      href: '/corporate-gifting',
      chevron: true,
      dropdown: [
        {
          title: 'CORPORATE GIFTING BY CELEBRATION',
          items: [
            { label: 'Work Anniversary Gifts', href: '/corporate-gifting/work-anniversary-gifts' },
            { label: 'Rewards and Recognition', href: '/corporate-gifting/rewards-and-recognition' },
            { label: 'Employee Welcome Kits', href: '/corporate-gifting/employee-welcome-kits' },
          ],
        },
        {
          title: 'CORPORATE GIFTING BY PRICE',
          items: [
            { label: 'Under Rs 1000', href: '/corporate-gifting/under-rs-1000' },
            { label: 'Rs 1000 to Rs 2000', href: '/corporate-gifting/rs-1000-to-rs-2000' },
            { label: 'Rs 2000 to Rs 3000', href: '/corporate-gifting/rs-2000-to-rs-3000' },
            { label: 'Above Rs 3000', href: '/corporate-gifting/above-rs-3000' },
          ],
        },
        {
          items: [
            { label: 'Branded Gifts', href: '/corporate-gifting/branded-gifts' },
            { label: 'Tech Gifts', href: '/corporate-gifting/tech-gifts' },
            { label: 'Architecture Gifts', href: '/corporate-gifting/architecture-gifts' },
            { label: 'Real Estate Gifts', href: '/corporate-gifting/real-estate-gifts' },
            { label: 'Executive Gifts', href: '/corporate-gifting/executive-gifts' },
          ],
        },
      ],
    },
    { label: 'Our Brands', href: '/brands' },
    { label: 'Bulk Enquiry', href: '/contact' },
    { label: 'Bulk Gifting', href: '/corporate', badge: 'New' },
    { label: 'About us', href: '/about' },
  ];

  const desktopNavLinks = isCorporateActive ? corporateNavLinks : personalizedNavLinks;

  return (
    <div
      className={cn(
        'fixed top-0 z-50 w-full max-w-[100vw] overflow-x-clip bg-white transition-transform duration-300 md:bg-[#FFF9F5]',
        !isVisible && '-translate-y-full'
      )}
    >
      {/* ─── MOBILE ONLY (unchanged) ─────────────────────────────────────── */}
      <div
        className="flex items-center gap-1.5 border-b border-white/10 px-2 py-2 text-[10px] font-medium leading-snug text-white sm:gap-2 sm:px-3 sm:py-2.5 sm:text-[11.5px] md:hidden"
        style={{ backgroundColor: MAROON_RIBBON }}
      >
        <Gift className="h-3 w-3 shrink-0 text-white sm:h-3.5 sm:w-3.5" strokeWidth={2} aria-hidden />
        <div className="flex min-w-0 flex-1 flex-wrap items-center justify-center gap-x-1 gap-y-0.5 text-center">
          <span className="text-white/95">Flat 10%</span>
          <span className="font-semibold" style={{ color: '#E8C87A' }}>
            OFF
          </span>
          <span className="hidden text-white/95 min-[360px]:inline">on All Orders</span>
          <span className="hidden text-white/95 min-[420px]:inline">| Code:</span>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold tracking-wide text-[#1a1010] sm:px-2.5 sm:py-1 sm:text-[11px]">
            GIFTZ10
          </span>
          <ChevronRight className="h-3.5 w-3.5 text-white/90 sm:h-4 sm:w-4" strokeWidth={2} aria-hidden />
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
              to="/"
              className="mx-auto flex min-w-0 max-w-[44vw] flex-col items-center gap-1 shrink sm:max-w-none sm:w-[12.5rem]"
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

          <div className="min-w-0 border-t border-black/[0.06] bg-white px-2 pb-3 pt-2.5 sm:px-3">
            <GiftModeSwitcher isCorporateActive={isCorporateActive} size="mobile" />
          </div>
        </div>
      </header>

      <header className="hidden border-b border-black/[0.05] bg-[#FFF9F5] xl:block">
        <div className="w-full px-4 2xl:px-6">
          {/* Row 1: Logo (left) + Search Bar (centered) + Utility icons (right) */}
          <div className="relative flex items-center justify-between py-4 border-b border-[#e8e4e1]/40">
            {/* Logo on the left */}
            <Link
              to="/"
              className="flex flex-col items-start gap-1 shrink-0 w-[12.5rem] 2xl:w-[14rem] z-10"
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

            {/* Small elegant search bar in the absolute center */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="flex items-center gap-2 rounded-full border border-[#d8cec1]/80 bg-[#FAF7F4] hover:bg-[#F6F3EE] px-3.5 py-1.5 w-[16rem] transition-all focus-within:border-[#9D7D47] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#9D7D47]/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
                <Search className="h-3.5 w-3.5 shrink-0 text-[#9a9490]" strokeWidth={2} />
                <input
                  type="text"
                  placeholder="Search luxury hampers, gifts..."
                  className="min-w-0 flex-1 bg-transparent text-[12px] font-medium text-[#1A1010] outline-none placeholder:text-[#a8a29e]"
                />
              </div>
            </div>

            {/* Utility icons on the right */}
            <div className="flex shrink-0 items-center gap-2.5 border-l border-[#dcd8d4] pl-2.5 2xl:gap-5 2xl:pl-5 z-10">
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

          {/* Row 2: Centered Nav links + Catalogue button on the right */}
          <div className="flex items-center justify-between py-1.5">
            {/* Left side: Compact Switcher capsule */}
            <div className="flex shrink-0 items-center">
              <GiftModeSwitcher isCorporateActive={isCorporateActive} size="desktop" />
            </div>

            {/* Main nav links — aligned center so it fits perfectly on all desktops */}
            <nav
              className="relative flex min-w-0 items-center justify-center gap-3.5 2xl:gap-5 overflow-visible py-0.5"
              aria-label="Primary"
            >
              {desktopNavLinks.map((link) => {
                const active = isNavActive(link.href);
                return (
                  <div key={link.label} className="group static shrink-0 py-1.5">
                    <Link
                      to={link.href}
                      className={cn(
                        'relative inline-flex items-center gap-0.5 py-0.5 font-sans text-[10px] font-bold uppercase tracking-[0.08em] transition-colors 2xl:text-[11px] 2xl:tracking-[0.09em]',
                        active ? 'text-[#4A0E1C]' : 'text-[#1A1010] hover:text-[#4A0E1C]'
                      )}
                    >
                      {link.badge && (
                        <span className="absolute -top-[23px] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10">
                          <span className="bg-[#C9A96E] text-white font-sans font-extrabold text-[9px] uppercase tracking-[0.06em] px-2 py-[2.5px] rounded-[3px] leading-none shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                            {link.badge}
                          </span>
                          <span className="block h-0 w-0 border-solid border-x-[4px] border-t-[4px] border-x-transparent border-t-[#C9A96E] -mt-[0.5px]" />
                        </span>
                      )}
                      {link.label}
                      {'chevron' in link && link.chevron && (
                        <ChevronDown className="h-3 w-3 shrink-0 opacity-60 transition-transform group-hover:translate-y-0.5" strokeWidth={2} aria-hidden />
                      )}
                      <span
                        className={cn(
                          "absolute bottom-0 left-0 h-[2px] bg-[#4A0E1C] transition-all duration-300 w-0 group-hover:w-full"
                        )}
                      />
                    </Link>

                    {/* Mega-Dropdown panel on hover */}
                    {link.dropdown && (
                      <div
                        className={cn(
                          'absolute top-full pt-2.5 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 ease-out z-50',
                          link.label === 'Shop'
                            ? 'left-1/2 -translate-x-1/2 w-[min(96vw,72rem)]'
                            : 'left-1/2 -translate-x-1/2 w-[85vw] max-w-5xl'
                        )}
                      >
                        <div className="bg-[#FFF9F5] border border-[#d8cec1]/60 rounded-[1.2rem] p-6 lg:p-8 shadow-[0_12px_36px_rgba(0,0,0,0.08)]">
                          <div className={cn(
                            'grid gap-6 lg:gap-8',
                            link.dropdown.length >= 5 ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5' : 'grid-cols-2 lg:grid-cols-3'
                          )}>
                            {link.dropdown.map((col, idx) => (
                              <div key={idx} className="flex flex-col">
                                {col.title ? (
                                  <div className="mb-4 pb-2 border-b border-[#d8cec1]/30">
                                    <h4 className="font-sans text-[10.5px] 2xl:text-[11.5px] font-extrabold uppercase tracking-widest text-[#9D7D47]">
                                      {col.title}
                                    </h4>
                                  </div>
                                ) : (
                                  <div className="mb-4 pb-2 border-b border-transparent select-none pointer-events-none opacity-0" aria-hidden="true">
                                    &nbsp;
                                  </div>
                                )}
                                <ul className="flex flex-col gap-2.5">
                                  {col.items.map((item) => (
                                    <li key={item.label}>
                                      <Link
                                        to={item.href}
                                        className="font-sans text-[13px] font-medium text-[#4A1020] hover:text-[#9D7D47] transition-colors duration-200 normal-case tracking-normal block"
                                      >
                                        {item.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right side: Gold "Download Catalogue" button */}
            <div className="flex justify-end w-[12.5rem] 2xl:w-[14rem] shrink-0">
              <Link
                to={isCorporateActive ? '/contact' : '/'}
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
      <header className="hidden border-b border-black/[0.06] bg-[#FFF9F5] md:block xl:hidden">
        <div className="w-full px-4 sm:px-5">
          <div className="flex items-center justify-between gap-4 py-[18px]">
            <Link to="/" className="flex flex-col items-start gap-1 shrink-0 w-[11.5rem]">
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
          <div className="flex min-w-0 flex-col gap-2 border-t border-[#e8e4e1]/50 py-2.5">
            <div className="w-full min-w-0 px-1">
              <GiftModeSwitcher isCorporateActive={isCorporateActive} size="compact" />
            </div>
            <nav
              className="no-scrollbar flex min-w-0 items-center gap-1 overflow-x-auto px-1 pb-0.5"
              aria-label="Primary"
            >
            {desktopNavLinks.map((link) => {
              const active = isNavActive(link.href);
              return (
                <div key={link.label} className="group static shrink-0 px-2.5 pt-2.5 pb-1.5">
                  <Link
                    to={link.href}
                    className={cn(
                      'relative inline-flex items-center gap-0.5 py-0.5 font-sans text-[12px] font-bold uppercase tracking-[0.08em] transition-colors',
                      active ? 'text-[#4A0E1C]' : 'text-[#1A1010] hover:text-[#4A0E1C]'
                    )}
                  >
                    {link.badge && (
                      <span className="absolute -top-[23px] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10">
                        <span className="bg-[#C9A96E] text-white font-sans font-extrabold text-[9px] uppercase tracking-[0.06em] px-2 py-[2.5px] rounded-[3px] leading-none shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                          {link.badge}
                        </span>
                        <span className="block h-0 w-0 border-solid border-x-[4px] border-t-[4px] border-x-transparent border-t-[#C9A96E] -mt-[0.5px]" />
                      </span>
                    )}
                    {link.label}
                    {'chevron' in link && link.chevron && (
                      <ChevronDown className="h-3 w-3 shrink-0 opacity-60 transition-transform group-hover:translate-y-0.5" strokeWidth={2} aria-hidden />
                    )}
                    <span
                      className={cn(
                        "absolute bottom-0 left-0 h-[2px] bg-[#4A0E1C] transition-all duration-300 w-0 group-hover:w-full"
                      )}
                    />
                  </Link>

                  {/* Mega-Dropdown panel on hover */}
                  {link.dropdown && (
                    <div
                      className={cn(
                        'absolute top-full pt-2.5 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 ease-out z-50',
                        link.label === 'Shop'
                          ? 'left-1/2 -translate-x-1/2 w-[min(96vw,72rem)]'
                          : 'left-1/2 -translate-x-1/2 w-[85vw] max-w-5xl'
                      )}
                    >
                      <div className="bg-[#FFF9F5] border border-[#d8cec1]/60 rounded-[1.2rem] p-6 lg:p-8 shadow-[0_12px_36px_rgba(0,0,0,0.08)]">
                        <div
                          className={cn(
                            'grid gap-6 lg:gap-8',
                            link.dropdown.length >= 5 ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5' : 'grid-cols-2 lg:grid-cols-3'
                          )}
                        >
                          {link.dropdown.map((col, idx) => (
                            <div key={idx} className="flex flex-col">
                              {col.title ? (
                                <div className="mb-4 pb-2 border-b border-[#d8cec1]/30">
                                  <h4 className="font-sans text-[10.5px] font-extrabold uppercase tracking-widest text-[#9D7D47]">
                                    {col.title}
                                  </h4>
                                </div>
                              ) : (
                                <div className="mb-4 pb-2 border-b border-transparent select-none pointer-events-none opacity-0" aria-hidden="true">
                                  &nbsp;
                                </div>
                              )}
                              <ul className="flex flex-col gap-2.5">
                                {col.items.map((item) => (
                                  <li key={item.label}>
                                    <Link
                                      to={item.href}
                                      className="font-sans text-[13px] font-medium text-[#4A1020] hover:text-[#9D7D47] transition-colors duration-200 normal-case tracking-normal block"
                                    >
                                      {item.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
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

          <div className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-contain px-4 py-4 [-webkit-overflow-scrolling:touch]">
            <p className="px-2 pb-2 text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#9a9490]">Menu</p>
            {!isCorporateActive && (
              <div className="mb-2">
                <button
                  type="button"
                  onClick={() => setMobileShopOpen((o) => !o)}
                  className={cn(
                    'flex w-full items-center justify-between rounded-xl px-4 py-3.5 font-sans text-[13px] font-semibold uppercase tracking-[0.08em]',
                    pathname === '/' || pathname.startsWith('/shop/browse')
                      ? 'bg-white text-[#4A0E1C] shadow-sm'
                      : 'text-[#1f1f1f] hover:bg-white/70'
                  )}
                >
                  <span>Shop</span>
                  <ChevronDown
                    className={cn('h-4 w-4 transition-transform', mobileShopOpen && 'rotate-180')}
                    strokeWidth={2}
                    aria-hidden
                  />
                </button>
                {mobileShopOpen && (
                  <div className="mt-1 max-h-[50vh] overflow-y-auto rounded-xl border border-[#ebe6e2] bg-white/80 px-3 py-3">
                    <Link
                      to="/"
                      className="block rounded-lg px-3 py-2 font-sans text-[12px] font-bold uppercase tracking-[0.06em] text-[#4A1020] hover:bg-[#FAF7F4]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      All gift types
                    </Link>
                    {SHOP_MEGA_MENU.map((col) => (
                      <div key={col.title ?? 'featured'} className="mt-3 border-t border-[#ebe6e2] pt-3 first:mt-2 first:border-t-0 first:pt-0">
                        {col.title && (
                          <p className="px-3 pb-1.5 font-sans text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#9D7D47]">
                            {col.title}
                          </p>
                        )}
                        <ul className="flex flex-col gap-0.5">
                          {col.items.map((item) => (
                            <li key={item.href + item.label}>
                              <Link
                                to={item.href}
                                className="block rounded-lg px-3 py-2 font-sans text-[13px] font-medium normal-case tracking-normal text-[#4A1020] hover:bg-[#FAF7F4] hover:text-[#9D7D47]"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {isCorporateActive && (
              <div className="mb-2">
                <button
                  type="button"
                  onClick={() => setMobilePromotionalOpen((o) => !o)}
                  className={cn(
                    'flex w-full items-center justify-between rounded-xl px-4 py-3.5 font-sans text-[13px] font-semibold uppercase tracking-[0.08em]',
                    pathname === '/promotional-gifts' || pathname.startsWith('/promotional-gifts/')
                      ? 'bg-white text-[#4A0E1C] shadow-sm'
                      : 'text-[#1f1f1f] hover:bg-white/70'
                  )}
                  aria-expanded={mobilePromotionalOpen}
                >
                  <span>Promotional Gifts</span>
                  <ChevronDown
                    className={cn('h-4 w-4 transition-transform', mobilePromotionalOpen && 'rotate-180')}
                    strokeWidth={2}
                    aria-hidden
                  />
                </button>
                {mobilePromotionalOpen && (
                  <div className="mt-1 max-h-[50vh] overflow-y-auto rounded-xl border border-[#ebe6e2] bg-white/80 px-3 py-3">
                    <Link
                      to="/promotional-gifts"
                      className="block rounded-lg px-3 py-2 font-sans text-[12px] font-bold uppercase tracking-[0.06em] text-[#4A1020] hover:bg-[#FAF7F4]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      All promotional gifts
                    </Link>
                    {PROMOTIONAL_GIFTS_MEGA_MENU.map((col) => (
                      <div
                        key={col.title ?? 'more'}
                        className="mt-3 border-t border-[#ebe6e2] pt-3 first:mt-2 first:border-t-0 first:pt-0"
                      >
                        {col.title && (
                          <p className="px-3 pb-1.5 font-sans text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#9D7D47]">
                            {col.title}
                          </p>
                        )}
                        <ul className="flex flex-col gap-0.5">
                          {col.items.map((item) => (
                            <li key={item.href + item.label}>
                              <Link
                                to={item.href}
                                className="block rounded-lg px-3 py-2 font-sans text-[13px] font-medium normal-case tracking-normal text-[#4A1020] hover:bg-[#FAF7F4] hover:text-[#9D7D47]"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {(isCorporateActive
              ? drawerLinks.filter((item) => item.label !== 'Promotional Gifts')
              : drawerLinks.filter(
                  (item) => item.label !== 'Shop' && item.label !== 'Personalized gifts'
                )
            ).map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  'rounded-xl px-4 py-3.5 font-sans text-[13px] font-semibold uppercase tracking-[0.08em] flex items-center justify-between',
                  isNavActive(item.href) ? 'bg-white text-[#4A0E1C] shadow-sm' : 'text-[#1f1f1f] hover:bg-white/70'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="rounded bg-[#C9A96E] px-2 py-0.5 text-[9px] font-sans font-extrabold uppercase tracking-wide text-white">
                    {item.badge}
                  </span>
                )}
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
