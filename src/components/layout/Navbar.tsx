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
  Gift,
  ChevronDown,
  BriefcaseBusiness,
  ChevronRight,
  Download,
  ChevronLeft,
  Phone,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';
import { SHOP_MEGA_MENU } from '@/config/shopMenu';
import { PROMOTIONAL_GIFTS_MEGA_MENU } from '@/config/promotionalGiftsMenu';

const SURFACE = '#FFFFFF';
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
  onToggle,
}: {
  isCorporateActive: boolean;
  size?: GiftModeSwitcherSize;
  onToggle?: (isCorporate: boolean) => void;
}) {
  const iconClass =
    size === 'mobile' ? 'h-3.5 w-3.5 sm:h-4 sm:w-4' : size === 'compact' ? 'h-3.5 w-3.5' : 'h-3.5 w-3.5';

  const labelClass = 'min-w-0 max-w-full text-center leading-tight [text-wrap:balance]';

  const handleTabClick = (e: React.MouseEvent, isCorporate: boolean) => {
    if (onToggle) {
      e.preventDefault();
      onToggle(isCorporate);
    }
  };

  return (
    <div
      className={cn(
        'grid w-full min-w-0 max-w-full grid-cols-2 gap-1 rounded-[0.95rem] border border-[#E0E0E0] bg-surface-muted p-1 shadow-sm',
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
        onClick={(e) => handleTabClick(e, false)}
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
        onClick={(e) => handleTabClick(e, true)}
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

  const [menuLevel, setMenuLevel] = useState<0 | 1 | 2>(0);
  const [activeParent0, setActiveParent0] = useState<string | null>(null);
  const [activeParent1, setActiveParent1] = useState<string | null>(null);

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
      window.scrollTo(0, scrollY);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
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
    const baseHref = href.split('#')[0] || href;
    if (baseHref === '/' || baseHref === '/shop') {
      return (
        pathname === '/' ||
        pathname === '/shop' ||
        pathname.startsWith('/shop/browse')
      );
    }
    return pathname === baseHref || pathname.startsWith(`${baseHref}/`);
  };

  const isCorporateActive =
    pathname === '/corporate' ||
    pathname === '/brands' ||
    pathname.startsWith('/corporate/') ||
    pathname.startsWith('/corporate-gifting') ||
    pathname.startsWith('/promotional-gifts') ||
    pathname.startsWith('/brands/');

  const [drawerCorporateActive, setDrawerCorporateActive] = useState(isCorporateActive);

  useEffect(() => {
    setDrawerCorporateActive(isCorporateActive);
  }, [isMobileMenuOpen, isCorporateActive]);

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



  const personalizedNavLinks: NavLinkItem[] = [
    { label: 'Shop', href: '/shop', chevron: true, dropdown: SHOP_MEGA_MENU },
    { label: 'Celebrations', href: '/shop#celebrations' },
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
    { label: 'Bulk Enquiry', href: '/corporate#bulk-order-enquiry' },
    { label: 'Bulk Gifting', href: '/corporate#bulk-order-enquiry', badge: 'New' },
    { label: 'About us', href: '/about' },
  ];

  const desktopNavLinks = isCorporateActive ? corporateNavLinks : personalizedNavLinks;

  return (
    <div
      className={cn(
        'fixed top-0 z-50 w-full max-w-[100vw] overflow-x-clip bg-white transition-transform duration-300 md:bg-white',
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
          <div className="relative flex items-center justify-between py-[14px] md:gap-4 md:py-4">
            <div className="flex min-w-0 items-center justify-start gap-0.5 md:gap-2 z-10">
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

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
              <BrandLogo
                to="/"
                logoHeightClass="h-[1.65rem] sm:h-[1.85rem]"
                widthClass="w-[11rem] sm:w-[12.5rem]"
                priority
              />
            </div>

            <div className="flex min-w-0 items-center justify-end gap-1.5 sm:gap-4 z-10">
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
            <NavSearchBar compact className="w-full border-0 bg-transparent shadow-none focus-within:ring-0" onSubmitted={() => setMobileSearchOpen(false)} />
          </div>

          <div className="min-w-0 border-t border-black/[0.06] bg-white px-2 pb-3 pt-2.5 sm:px-3">
            <GiftModeSwitcher isCorporateActive={isCorporateActive} size="mobile" />
          </div>
        </div>
      </header>

      <header
        className={cn(
          'hidden bg-white xl:block',
          !isCorporateActive && 'border-b border-black/[0.05]'
        )}
      >
        <div className="w-full px-4 2xl:px-6">
          {/* Row 1: Logo (left) + Search Bar (centered) + Utility icons (right) */}
          <div className="relative flex items-start justify-between pt-4 pb-3 border-b border-[#e8e4e1]/40">
            <BrandLogo
              to="/"
              className="z-10"
              logoHeightClass="h-[2rem] 2xl:h-[2.15rem]"
              widthClass="w-[13rem] 2xl:w-[14.5rem]"
              priority
            />

            {/* Small elegant search bar in the absolute center */}
            <div className="absolute left-1/2 top-[1.35rem] -translate-x-1/2 z-10 2xl:top-[1.4rem]">
              <NavSearchBar className="w-[16rem] hover:bg-white" />
            </div>

            {/* Utility icons on the right */}
            <div className="flex shrink-0 items-start gap-2.5 border-l border-[#dcd8d4] pl-2.5 pt-0.5 2xl:gap-5 2xl:pl-5 z-10">
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
                        <div className="bg-white border border-[#EBEBEB] rounded-[1.2rem] p-6 lg:p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12),0_8px_24px_-8px_rgba(0,0,0,0.06)]">
                          <div className={cn(
                            'grid gap-6 lg:gap-8',
                            link.dropdown.length >= 5 ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5' : 'grid-cols-2 lg:grid-cols-3'
                          )}>
                            {link.dropdown.map((col, idx) => (
                              <div key={idx} className="flex flex-col">
                                {col.title ? (
                                  <div className="mb-4 pb-2 border-b border-[#E0E0E0]/30">
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
      <header
        className={cn(
          'hidden bg-white md:block xl:hidden',
          !isCorporateActive && 'border-b border-black/[0.06]'
        )}
      >
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
            <div className="px-1">
              <NavSearchBar compact className="w-full max-w-none" />
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
                      <div className="bg-white border border-[#EBEBEB] rounded-[1.2rem] p-6 lg:p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12),0_8px_24px_-8px_rgba(0,0,0,0.06)]">
                        <div
                          className={cn(
                            'grid gap-6 lg:gap-8',
                            link.dropdown.length >= 5 ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5' : 'grid-cols-2 lg:grid-cols-3'
                          )}
                        >
                          {link.dropdown.map((col, idx) => (
                            <div key={idx} className="flex flex-col">
                              {col.title ? (
                                <div className="mb-4 pb-2 border-b border-[#E0E0E0]/30">
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
                to="/account"
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
                aria-label="Shopping cart"
              >
                <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={iconThin} />
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#e11d48] px-0.5 text-[9.5px] font-semibold leading-none text-white ring-2 ring-white">
                  0
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

          {/* MODE SWITCHER */}
          <div className="flex-shrink-0 border-b border-[#ebe6e2]/40 bg-white/30 px-4 py-2.5">
            <GiftModeSwitcher
              isCorporateActive={drawerCorporateActive}
              size="mobile"
              onToggle={(isCorporate) => {
                setDrawerCorporateActive(isCorporate);
                setMenuLevel(0);
                setActiveParent0(null);
                setActiveParent1(null);
              }}
            />
          </div>

          {/* SLIDING PANELS */}
          <div className="relative flex-1 overflow-hidden min-h-0 flex flex-col">
            <div
              className="flex w-[300%] h-full transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${(menuLevel * 100) / 3}%)` }}
            >
              {/* PANEL 0 */}
              <div className="w-1/3 shrink-0 h-full overflow-y-auto no-scrollbar px-4 py-4 flex flex-col gap-1.5">
                {drawerCorporateActive && (
                  <div className="mb-2 flex items-center gap-3 rounded-xl border border-[#C9A96E]/20 bg-[#C9A96E]/5 px-4 py-3 text-left">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#C9A96E]/30 bg-[#C9A96E]/10 text-[#9D7D47]">
                      <Phone className="h-4 w-4" strokeWidth={2} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-sans text-[9px] font-bold uppercase tracking-[0.16em] text-[#9D7D47]">Bulk Orders</p>
                      <a href="tel:+919876543210" className="block text-[12.5px] font-bold text-[#4A1020] hover:underline">
                        +91 98765 43210
                      </a>
                    </div>
                  </div>
                )}

                {!drawerCorporateActive ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveParent0("Shop Gifts");
                        setMenuLevel(1);
                      }}
                      className="rounded-xl px-4 py-3.5 font-sans text-[13px] font-bold uppercase tracking-[0.08em] flex items-center justify-between text-[#1f1f1f] bg-white/50 hover:bg-white/85 transition-colors border border-black/[0.02]"
                    >
                      <span>Shop Gifts</span>
                      <ChevronRight className="h-4 w-4 text-[#4A1020]" strokeWidth={2} />
                    </button>
                    <Link
                      to="/shop#celebrations"
                      className="rounded-xl px-4 py-3.5 font-sans text-[13px] font-bold uppercase tracking-[0.08em] flex items-center justify-between text-[#1f1f1f] bg-white/50 hover:bg-white/85 transition-colors border border-black/[0.02]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Celebrations
                    </Link>
                    <Link
                      to="/hamper-builder"
                      className="rounded-xl px-4 py-3.5 font-sans text-[13px] font-bold uppercase tracking-[0.08em] flex items-center justify-between text-[#1f1f1f] bg-white/50 hover:bg-white/85 transition-colors border border-black/[0.02]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Make Your Own Hamper
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
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveParent0("Promotional Gifts");
                        setMenuLevel(1);
                      }}
                      className="rounded-xl px-4 py-3.5 font-sans text-[13px] font-bold uppercase tracking-[0.08em] flex items-center justify-between text-[#1f1f1f] bg-white/50 hover:bg-white/85 transition-colors border border-black/[0.02]"
                    >
                      <span>Promotional Gifts</span>
                      <ChevronRight className="h-4 w-4 text-[#4A1020]" strokeWidth={2} />
                    </button>
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
                    <Link
                      to="/brands"
                      className="rounded-xl px-4 py-3.5 font-sans text-[13px] font-bold uppercase tracking-[0.08em] flex items-center justify-between text-[#1f1f1f] bg-white/50 hover:bg-white/85 transition-colors border border-black/[0.02]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Our Brands
                    </Link>
                    <Link
                      to="/corporate#bulk-order-enquiry"
                      className="rounded-xl px-4 py-3.5 font-sans text-[13px] font-bold uppercase tracking-[0.08em] flex items-center justify-between text-[#1f1f1f] bg-white/50 hover:bg-white/85 transition-colors border border-black/[0.02]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Bulk Enquiry
                    </Link>
                    <Link
                      to="/corporate#bulk-order-enquiry"
                      className="rounded-xl px-4 py-3.5 font-sans text-[13px] font-bold uppercase tracking-[0.08em] flex items-center justify-between text-[#1f1f1f] bg-white/50 hover:bg-white/85 transition-colors border border-black/[0.02]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>Bulk Gifting</span>
                      <span className="rounded bg-[#C9A96E] px-2 py-0.5 text-[9px] font-sans font-extrabold uppercase tracking-wide text-white">
                        New
                      </span>
                    </Link>
                    <Link
                      to="/about"
                      className="rounded-xl px-4 py-3.5 font-sans text-[13px] font-bold uppercase tracking-[0.08em] flex items-center justify-between text-[#1f1f1f] bg-white/50 hover:bg-white/85 transition-colors border border-black/[0.02]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      About Us
                    </Link>
                  </>
                )}
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

                {activeParent0 === "Shop Gifts" && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveParent1("SHOP BY RECIPIENT");
                        setMenuLevel(2);
                      }}
                      className="rounded-xl px-4 py-3.5 font-sans text-[13px] font-semibold uppercase tracking-[0.08em] flex items-center justify-between text-[#1f1f1f] bg-white/50 hover:bg-white/80 transition-colors"
                    >
                      <span>Shop By Recipient</span>
                      <ChevronRight className="h-4 w-4 text-[#C9A96E]" strokeWidth={2} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveParent1("SHOP BY OCCASION");
                        setMenuLevel(2);
                      }}
                      className="rounded-xl px-4 py-3.5 font-sans text-[13px] font-semibold uppercase tracking-[0.08em] flex items-center justify-between text-[#1f1f1f] bg-white/50 hover:bg-white/80 transition-colors"
                    >
                      <span>Shop By Occasion</span>
                      <ChevronRight className="h-4 w-4 text-[#C9A96E]" strokeWidth={2} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveParent1("SHOP BY INTEREST");
                        setMenuLevel(2);
                      }}
                      className="rounded-xl px-4 py-3.5 font-sans text-[13px] font-semibold uppercase tracking-[0.08em] flex items-center justify-between text-[#1f1f1f] bg-white/50 hover:bg-white/80 transition-colors"
                    >
                      <span>Shop By Interest</span>
                      <ChevronRight className="h-4 w-4 text-[#C9A96E]" strokeWidth={2} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveParent1("BY PRICE");
                        setMenuLevel(2);
                      }}
                      className="rounded-xl px-4 py-3.5 font-sans text-[13px] font-semibold uppercase tracking-[0.08em] flex items-center justify-between text-[#1f1f1f] bg-white/50 hover:bg-white/80 transition-colors"
                    >
                      <span>By Price</span>
                      <ChevronRight className="h-4 w-4 text-[#C9A96E]" strokeWidth={2} />
                    </button>
                    
                    <div className="mt-2 border-t border-[#ebe6e2]/40 pt-3">
                      <p className="px-4 pb-1.5 font-sans text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#9D7D47]">
                        Featured Collections
                      </p>
                      {SHOP_MEGA_MENU[4].items.map((item) => (
                        <Link
                          key={item.label}
                          to={item.href}
                          className="block rounded-xl px-4 py-3 font-sans text-[13px] font-medium text-[#4A1020] hover:bg-white/80 hover:text-[#9D7D47] transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </>
                )}

                {activeParent0 === "Promotional Gifts" && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveParent1("WORK & DESK ESSENTIALS");
                        setMenuLevel(2);
                      }}
                      className="rounded-xl px-4 py-3.5 font-sans text-[13px] font-semibold uppercase tracking-[0.08em] flex items-center justify-between text-[#1f1f1f] bg-white/50 hover:bg-white/80 transition-colors"
                    >
                      <span>Work & Desk Essentials</span>
                      <ChevronRight className="h-4 w-4 text-[#C9A96E]" strokeWidth={2} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveParent1("HOME & LIVING");
                        setMenuLevel(2);
                      }}
                      className="rounded-xl px-4 py-3.5 font-sans text-[13px] font-semibold uppercase tracking-[0.08em] flex items-center justify-between text-[#1f1f1f] bg-white/50 hover:bg-white/80 transition-colors"
                    >
                      <span>Home & Living</span>
                      <ChevronRight className="h-4 w-4 text-[#C9A96E]" strokeWidth={2} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveParent1("LIFESTYLE & ACCESSORIES");
                        setMenuLevel(2);
                      }}
                      className="rounded-xl px-4 py-3.5 font-sans text-[13px] font-semibold uppercase tracking-[0.08em] flex items-center justify-between text-[#1f1f1f] bg-white/50 hover:bg-white/80 transition-colors"
                    >
                      <span>Lifestyle & Accessories</span>
                      <ChevronRight className="h-4 w-4 text-[#C9A96E]" strokeWidth={2} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveParent1("GOURMET & EDIBLE TREATS");
                        setMenuLevel(2);
                      }}
                      className="rounded-xl px-4 py-3.5 font-sans text-[13px] font-semibold uppercase tracking-[0.08em] flex items-center justify-between text-[#1f1f1f] bg-white/50 hover:bg-white/80 transition-colors"
                    >
                      <span>Gourmet & Edible Treats</span>
                      <ChevronRight className="h-4 w-4 text-[#C9A96E]" strokeWidth={2} />
                    </button>
                    
                    <div className="mt-2 border-t border-[#ebe6e2]/40 pt-3">
                      <p className="px-4 pb-1.5 font-sans text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#9D7D47]">
                        Other Categories
                      </p>
                      {PROMOTIONAL_GIFTS_MEGA_MENU[4].items.map((item) => (
                        <Link
                          key={item.label}
                          to={item.href}
                          className="block rounded-xl px-4 py-3 font-sans text-[13px] font-medium text-[#4A1020] hover:bg-white/80 hover:text-[#9D7D47] transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </>
                )}

                {activeParent0 === "Corporate Gifting" && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveParent1("CORPORATE GIFTING BY CELEBRATION");
                        setMenuLevel(2);
                      }}
                      className="rounded-xl px-4 py-3.5 font-sans text-[13px] font-semibold uppercase tracking-[0.08em] flex items-center justify-between text-[#1f1f1f] bg-white/50 hover:bg-white/80 transition-colors"
                    >
                      <span>Gifting By Celebration</span>
                      <ChevronRight className="h-4 w-4 text-[#C9A96E]" strokeWidth={2} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveParent1("CORPORATE GIFTING BY PRICE");
                        setMenuLevel(2);
                      }}
                      className="rounded-xl px-4 py-3.5 font-sans text-[13px] font-semibold uppercase tracking-[0.08em] flex items-center justify-between text-[#1f1f1f] bg-white/50 hover:bg-white/80 transition-colors"
                    >
                      <span>Gifting By Price</span>
                      <ChevronRight className="h-4 w-4 text-[#C9A96E]" strokeWidth={2} />
                    </button>
                    
                    <div className="mt-2 border-t border-[#ebe6e2]/40 pt-3">
                      <p className="px-4 pb-1.5 font-sans text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#9D7D47]">
                        Featured Executive Gifts
                      </p>
                      {[
                        { label: 'Branded Gifts', href: '/corporate-gifting/branded-gifts' },
                        { label: 'Tech Gifts', href: '/corporate-gifting/tech-gifts' },
                        { label: 'Architecture Gifts', href: '/corporate-gifting/architecture-gifts' },
                        { label: 'Real Estate Gifts', href: '/corporate-gifting/real-estate-gifts' },
                        { label: 'Executive Gifts', href: '/corporate-gifting/executive-gifts' }
                      ].map((item) => (
                        <Link
                          key={item.label}
                          to={item.href}
                          className="block rounded-xl px-4 py-3 font-sans text-[13px] font-medium text-[#4A1020] hover:bg-white/80 hover:text-[#9D7D47] transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
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

                {activeParent1 === "SHOP BY RECIPIENT" && SHOP_MEGA_MENU[0].items.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="block rounded-xl px-4 py-3 font-sans text-[13px] font-medium text-[#4A1020] hover:bg-white/80 hover:text-[#9D7D47] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                {activeParent1 === "SHOP BY OCCASION" && SHOP_MEGA_MENU[1].items.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="block rounded-xl px-4 py-3 font-sans text-[13px] font-medium text-[#4A1020] hover:bg-white/80 hover:text-[#9D7D47] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                {activeParent1 === "SHOP BY INTEREST" && SHOP_MEGA_MENU[2].items.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="block rounded-xl px-4 py-3 font-sans text-[13px] font-medium text-[#4A1020] hover:bg-white/80 hover:text-[#9D7D47] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                {activeParent1 === "BY PRICE" && SHOP_MEGA_MENU[3].items.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="block rounded-xl px-4 py-3 font-sans text-[13px] font-medium text-[#4A1020] hover:bg-white/80 hover:text-[#9D7D47] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                {activeParent1 === "WORK & DESK ESSENTIALS" && PROMOTIONAL_GIFTS_MEGA_MENU[0].items.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="block rounded-xl px-4 py-3 font-sans text-[13px] font-medium text-[#4A1020] hover:bg-white/80 hover:text-[#9D7D47] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                {activeParent1 === "HOME & LIVING" && PROMOTIONAL_GIFTS_MEGA_MENU[1].items.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="block rounded-xl px-4 py-3 font-sans text-[13px] font-medium text-[#4A1020] hover:bg-white/80 hover:text-[#9D7D47] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                {activeParent1 === "LIFESTYLE & ACCESSORIES" && PROMOTIONAL_GIFTS_MEGA_MENU[2].items.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="block rounded-xl px-4 py-3 font-sans text-[13px] font-medium text-[#4A1020] hover:bg-white/80 hover:text-[#9D7D47] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                {activeParent1 === "GOURMET & EDIBLE TREATS" && PROMOTIONAL_GIFTS_MEGA_MENU[3].items.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="block rounded-xl px-4 py-3 font-sans text-[13px] font-medium text-[#4A1020] hover:bg-white/80 hover:text-[#9D7D47] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                {activeParent1 === "CORPORATE GIFTING BY CELEBRATION" && [
                  { label: 'Work Anniversary Gifts', href: '/corporate-gifting/work-anniversary-gifts' },
                  { label: 'Rewards and Recognition', href: '/corporate-gifting/rewards-and-recognition' },
                  { label: 'Employee Welcome Kits', href: '/corporate-gifting/employee-welcome-kits' }
                ].map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="block rounded-xl px-4 py-3 font-sans text-[13px] font-medium text-[#4A1020] hover:bg-white/80 hover:text-[#9D7D47] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                {activeParent1 === "CORPORATE GIFTING BY PRICE" && [
                  { label: 'Under Rs 1000', href: '/corporate-gifting/under-rs-1000' },
                  { label: 'Rs 1000 to Rs 2000', href: '/corporate-gifting/rs-1000-to-rs-2000' },
                  { label: 'Rs 2000 to Rs 3000', href: '/corporate-gifting/rs-2000-to-rs-3000' },
                  { label: 'Above Rs 3000', href: '/corporate-gifting/above-rs-3000' }
                ].map((item) => (
                  <Link
                    key={item.label}
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
            {drawerCorporateActive && (
              <Link
                to="/contact"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#9D7D47] text-white hover:bg-[#8A6C3C] transition-colors py-3.5 font-sans text-[11px] font-bold uppercase tracking-widest shadow-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Download className="h-4 w-4 text-[#FFE9C9]" strokeWidth={2} />
                <span>Download Catalogue</span>
              </Link>
            )}
            
            <a
              href="https://wa.me/919876543210"
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
