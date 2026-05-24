import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CorporateExpertsCtaSection from '@/components/corporate/CorporateExpertsCtaSection';
import TrustedLeadingBrandsSection from '@/components/corporate/TrustedLeadingBrandsSection';
import CorporateTestimonialsSection from '@/components/corporate/CorporateTestimonialsSection';
import WoodenGiftingSection from '@/components/corporate/WoodenGiftingSection';
import AppImage from '@/components/ui/AppImage';
import {
  Building2,
  Gem,
  Gift,
  Leaf,
  Shield,
  ShoppingBag,
  Star,
  Tag,
  Truck,
  Users,
  Headset,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const VALUE_PROPS = [
  { title: 'PREMIUM QUALITY',     Icon: Gem },
  { title: 'CUSTOM BRANDING',     Icon: Tag },
  { title: 'PAN INDIA DELIVERY',  Icon: Truck },
  { title: 'BULK ORDER SUPPORT',  Icon: Headset },
  { title: 'SECURE PACKAGING',    Icon: Shield },
  { title: 'SUSTAINABLE CHOICES', Icon: Leaf },
] as const;

const GIFTING_SOLUTIONS = [
  {
    id: 'corporate-hampers',
    label: 'CORPORATE HAMPERS',
    href: '/shop?cat=corporate-hampers',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=480&h=480',
    imageAlt: 'Premium corporate hamper gift box',
  },
  {
    id: 'employee-joining',
    label: 'EMPLOYEE JOINING KITS',
    href: '/shop?type=employee',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=480&h=480',
    imageAlt: 'Employee welcome kit with backpack and branded items',
  },
  {
    id: 'festive',
    label: 'FESTIVE GIFTS',
    href: '/shop?cat=festive',
    image: 'https://images.unsplash.com/photo-1513885536991-8b943e177042?auto=format&fit=crop&q=80&w=480&h=480',
    imageAlt: 'Festive gift boxes with gold ribbon',
  },
  {
    id: 'custom-merchandise',
    label: 'CUSTOM MERCHANDISE',
    href: '/shop?type=merch',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=480&h=480',
    imageAlt: 'Custom branded polo shirt and cap',
  },
  {
    id: 'tech',
    label: 'TECH GIFTS',
    href: '/shop?type=tech',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=480&h=480',
    imageAlt: 'Premium tech gifts including headphones',
  },
  {
    id: 'drinkware',
    label: 'DRINKWARE',
    href: '/shop?type=drinkware',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=480&h=480',
    imageAlt: 'Branded drinkware bottles and mugs',
  },
  {
    id: 'event-conference',
    label: 'EVENT & CONFERENCE GIFTING',
    href: '/shop?type=event',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=480&h=480',
    imageAlt: 'Event and conference gifting tote and badge',
  },
  {
    id: 'luxury-packaging',
    label: 'LUXURY PACKAGING SOLUTIONS',
    href: '/shop?type=packaging',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38f7968?auto=format&fit=crop&q=80&w=480&h=480',
    imageAlt: 'Luxury gift packaging with ribbon',
  },
] as const;

const STATS = [
  { Icon: Building2, value: '500+',      label: 'Corporate Clients' },
  { Icon: Gift,      value: '1,00,000+', label: 'Gifts Delivered' },
  { Icon: Users,     value: '10+ Years', label: 'Trust & Reliability' },
  { Icon: Star,      value: '4.9/5',     label: 'Client Satisfaction' },
] as const;

const HERO_SLIDES = [
  {
    id: 'curated-gifts',
    eyebrow: '',
    headingLight: "Thoughtfully\nCurated Gifts",
    headingItalic: "For Stronger\nBusiness Relationships.",
    image: '/images/corporate-hero-banner.png',
    mobileImage: '/images/corporate-hero-banner-mobile-custom.png',
    imageAlt: 'Curated premium corporate gifts',
    textPosition: 'left',
    theme: 'light',
    bgClass: 'bg-[#F9F6F1]',
    textColorLight: 'text-[#1A1010]',
    textColorItalic: 'text-[#966E31]',
    eyebrowColor: 'text-[#966E31]',
    gradientClass: 'from-[#F9F6F1]/95 via-[#F9F6F1]/80 to-transparent left-0 w-[55%] lg:w-[48%]',
    imgTranslate: 'md:object-[72%_center]',
    imgPosition: 'object-center',
    hasEmbeddedText: false,
    hasMobileEmbeddedText: false
  },
  {
    id: 'corporate-showcase-2',
    eyebrow: '',
    headingLight: '',
    headingItalic: '',
    image: '/images/corporate-hero-slide-2.png',
    mobileImage: '/images/corporate-hero-slide-2-mobile.png',
    imageAlt: 'Premium custom corporate gifts collection showcase',
    textPosition: 'left',
    theme: 'light',
    bgClass: 'bg-[#F9F6F1]',
    textColorLight: '',
    textColorItalic: '',
    eyebrowColor: '',
    imgTranslate: '',
    imgPosition: 'object-[center_92%] md:object-[center_55%]',
    hasEmbeddedText: true,
    hasMobileEmbeddedText: true
  }
] as const;

export default function CorporatePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [giftingPageCount, setGiftingPageCount] = useState(1);
  const [activeGiftingPage, setActiveGiftingPage] = useState(0);
  const giftingSolutionsScrollRef = useRef<HTMLDivElement | null>(null);

  // Auto-play interval with reset on interaction
  useEffect(() => {
    if (HERO_SLIDES.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [currentSlide]);

  useEffect(() => {
    const node = giftingSolutionsScrollRef.current;
    if (!node) return;

    const updatePager = () => {
      const maxScroll = Math.max(0, node.scrollWidth - node.clientWidth);
      const pages = Math.max(1, Math.round(node.scrollWidth / node.clientWidth));
      setGiftingPageCount(pages);
      if (maxScroll <= 0) {
        setActiveGiftingPage(0);
        return;
      }
      const ratio = node.scrollLeft / maxScroll;
      const index = Math.round(ratio * (pages - 1));
      setActiveGiftingPage(Math.min(pages - 1, Math.max(0, index)));
    };

    updatePager();
    node.addEventListener('scroll', updatePager, { passive: true });
    window.addEventListener('resize', updatePager);

    return () => {
      node.removeEventListener('scroll', updatePager);
      window.removeEventListener('resize', updatePager);
    };
  }, []);

  const goToGiftingPage = (page: number) => {
    const node = giftingSolutionsScrollRef.current;
    if (!node) return;
    const target = page * node.clientWidth;
    node.scrollTo({ left: target, behavior: 'smooth' });
  };

  const slideGiftingSolutions = (direction: 'prev' | 'next') => {
    const node = giftingSolutionsScrollRef.current;
    if (!node) return;
    const amount = Math.max(96, Math.floor(node.clientWidth * 0.45));
    node.scrollBy({
      left: direction === 'next' ? amount : -amount,
      behavior: 'smooth',
    });
  };



  return (
    <div className="flex min-h-screen flex-col bg-[#F9F6F1]">
      <Navbar />

      <main className="flex-grow pt-[calc(11.5rem+env(safe-area-inset-top,0px))] md:pt-[9rem] xl:pt-[5.75rem] 2xl:pt-[6rem]">

        {/* ── Hero Slider ────────────────────────────────────────────────── */}
        <section className="relative w-full overflow-hidden bg-[#F9F6F1]" aria-labelledby="corporate-hero-heading">
          <div className="relative mx-auto w-full max-w-[2500px]">
            
            {/* Slides Container */}
            <div className="relative h-[500px] sm:h-[540px] md:h-auto md:aspect-[1024/385] w-full overflow-hidden">
              {HERO_SLIDES.map((slide, index) => {
                const isActive = index === currentSlide;
                return (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 w-full h-full flex flex-col justify-between md:justify-center transition-all duration-1000 ease-in-out ${slide.bgClass} ${
                      isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    {/* Copy — stacked on mobile, overlaid on banner from md up */}
                    {!slide.hasEmbeddedText && (
                      <div
                        className={[
                          slide.hasMobileEmbeddedText ? 'hidden md:flex' : 'flex',
                          'relative z-[2] w-full md:w-auto px-4 pb-3 pt-4 sm:px-6 text-center md:text-left flex flex-col items-center md:items-start md:pointer-events-none md:absolute md:inset-y-0 md:max-w-[48%] md:justify-center md:bg-transparent md:px-8 md:py-8 lg:max-w-[45%] lg:px-10 xl:max-w-[41%] 2xl:max-w-[38%]',
                          slide.textPosition === 'left' ? 'md:left-[2.5%] lg:left-[3.5%] xl:left-[4.5%] 2xl:left-[5%] md:right-auto md:text-left' : 'md:right-[2.5%] lg:right-[3.5%] xl:right-[4.5%] 2xl:right-[5%] md:left-auto md:text-left'
                        ].join(' ')}
                      >
                        <div className="md:pointer-events-auto">
                          <p className={`eyebrow sm:tracking-[0.32em] ${slide.eyebrowColor}`}>
                            {slide.eyebrow}
                          </p>
                          <h1
                            id="corporate-hero-heading"
                            className="hero-heading-corporate mt-1.5 max-w-[20rem] sm:mt-2 sm:max-w-[24rem] md:max-w-[27rem] lg:max-w-[30rem] xl:max-w-[33rem]"
                          >
                            <span className={`block ${slide.textColorLight}`}>
                              {slide.headingLight.split('\n').map((line, i) => (
                                <span key={i} className="block">{line}</span>
                              ))}
                            </span>
                            <span className={`mt-2 block font-serif italic font-semibold text-[clamp(1.75rem,3.9vw,3.05rem)] leading-[1.14] md:mt-2.5 ${slide.textColorItalic}`}>
                              {slide.headingItalic.split('\n').map((line, i) => (
                                <span key={i} className="block">{line}</span>
                              ))}
                            </span>
                          </h1>

                          {/* Hero CTA buttons — aligned center on mobile, left on desktop */}
                          <div className="mt-8 hidden md:flex flex-wrap items-center justify-center md:justify-start gap-[18px] w-full">
                            <Link
                              to="/contact"
                              className="inline-flex items-center gap-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] px-5 py-3.5 font-sans text-[11px] md:text-[12px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_10px_24px_-10px_rgba(15,23,42,0.45)] transition-all active:scale-[0.98]"
                            >
                              <Gift className="h-4 w-4 text-[#C9A96E]" strokeWidth={1.5} />
                              <span>Get Bulk Quote</span>
                            </Link>
                            <Link
                              to="/shop"
                              className="inline-flex items-center gap-2 rounded-xl border border-[#9D7D47] bg-[#FAF7F4] hover:bg-[#FFF9F5] px-5 py-3.5 font-sans text-[11px] md:text-[12px] font-bold uppercase tracking-[0.08em] text-[#1A1010] shadow-sm transition-all active:scale-[0.98]"
                            >
                              <ShoppingBag className="h-4 w-4 text-[#C9A96E]" strokeWidth={1.5} />
                              <span>Explore Collections</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
 
                    {/* Banner image */}
                    <div className={`relative w-full ${slide.hasMobileEmbeddedText ? 'h-full absolute inset-0' : 'h-[67%] sm:h-[70%]'} md:absolute md:inset-0 md:h-full`}>
                      {!slide.hasEmbeddedText && (
                        <div
                          className={`pointer-events-none absolute inset-y-0 z-[1] hidden md:block bg-gradient-to-r ${slide.gradientClass}`}
                          aria-hidden
                        />
                      )}
                      <picture className="block h-full w-full">
                        {slide.mobileImage && (
                          <source media="(max-width: 767px)" srcSet={slide.mobileImage} />
                        )}
                        <img
                          src={slide.image}
                          alt={slide.imageAlt}
                          width={2500}
                          height={662}
                          decoding="async"
                          fetchPriority={index === 0 ? "high" : "low"}
                          sizes="(max-width: 2500px) 100vw, 2500px"
                          className={`block h-full w-full object-cover ${slide.imgPosition || 'object-center'} ${slide.imgTranslate || ''} ${slide.id === 'curated-gifts' ? 'object-[50%_43%] sm:object-[52%_44%] md:object-[72%_center]' : ''}`}
                        />
                      </picture>
                    </div>

                    {/* Mobile CTA buttons — rendered below the banner image on mobile view */}
                    {!slide.hasEmbeddedText && (
                      <div className="flex md:hidden flex-col items-center justify-center gap-2.5 w-full px-4 py-3.5 bg-[#F9F6F1] border-t border-[#ebe6e0]/40 shrink-0">
                        <div className="flex flex-col gap-2.5 w-full max-w-[21rem]">
                          <Link
                            to="/contact"
                            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] py-3.5 px-3 font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.06em] text-white shadow-md active:scale-[0.98]"
                          >
                            <Gift className="h-4 w-4 text-[#C9A96E]" strokeWidth={1.5} />
                            <span className="whitespace-nowrap">Get Bulk Quote</span>
                          </Link>
                          <Link
                            to="/shop"
                            className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-[#9D7D47] bg-[#FAF7F4] hover:bg-[#FFF9F5] py-3.5 px-3 font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.06em] text-[#1A1010] shadow-sm active:scale-[0.98]"
                          >
                            <ShoppingBag className="h-4 w-4 text-[#C9A96E]" strokeWidth={1.5} />
                            <span className="whitespace-nowrap">Explore Collections</span>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Pill / Dash Indicators */}
            {HERO_SLIDES.length > 1 && (
              <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5">
                {HERO_SLIDES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-[3px] rounded-full transition-all duration-300 ${ 
                      index === currentSlide ? 'w-8 bg-white' : 'w-5 bg-white/40 hover:bg-white/65'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}

          </div>
        </section>

        {/* ── Mobile Stats Section (Premium Rectangular Dark Blue Boxes) ──── */}
        <div className="mt-2 bg-[#F9F6F1] py-5 px-4 w-full md:hidden border-b border-[#ebe6e0]/30">
          <div className="grid grid-cols-2 gap-2.5">
            {STATS.map(({ Icon, value, label }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 rounded-lg border border-[#C9A96E]/20 bg-gradient-to-br from-[#1A2A44] via-[#121E30] to-[#0B1220] px-3 py-3 shadow-[0_6px_16px_rgba(0,0,0,0.2)]"
              >
                {/* Elegant gold box outline badge (keep box like previous) */}
                <div className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-lg border border-[#C9A96E]/30 bg-[#1C2C45]/60 text-[#C9A96E] shadow-[inset_0_1px_2px_rgba(201,169,110,0.1)]">
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.3} aria-hidden />
                </div>
                {/* Text stack — slightly bigger, highlighted */}
                <div className="min-w-0 flex flex-col items-start justify-center">
                  <p className="font-serif text-[14px] font-bold leading-none text-[#C9A96E] tracking-wide whitespace-nowrap">
                    {value}
                  </p>
                  <p className="mt-1 font-sans text-[8px] font-extrabold uppercase leading-[1.25] tracking-[0.04em] text-[#FFFDF9]/95">
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Desktop/Tablet Stats Section (Premium Wireframe Dark Grid) ──── */}
        <div className="hidden md:block w-full pt-0 pb-0">
          <div className="w-full">
            <div className="grid grid-cols-4 gap-px overflow-hidden border-y border-[#C9A96E]/20 bg-[#152033] shadow-[0_12px_36px_-12px_rgba(26,16,16,0.35)]">
              {STATS.map(({ Icon, value, label }, i) => (
                <div
                  key={label}
                  className={[
                    'flex items-center justify-center gap-3.5 bg-gradient-to-br from-[#1A2A44] via-[#121E30] to-[#0B1220] px-5 py-6 lg:px-6 lg:py-6.5',
                    i < 3 ? 'border-r border-[#C9A96E]/15' : '', // Gold border separator on desktop
                  ].filter(Boolean).join(' ')}
                >
                  {/* Elegant premium transparent wireframe gold box outline badge */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#C9A96E]/30 bg-[#1C2C45]/40 text-[#C9A96E] shadow-[inset_0_1px_2px_rgba(201,169,110,0.15)]">
                    <Icon className="h-5 w-5" strokeWidth={1.2} aria-hidden />
                  </div>
                  
                  {/* Number & label vertical stack */}
                  <div className="min-w-0 flex flex-col items-start">
                    <p className="font-serif text-[16px] lg:text-[18.5px] font-bold leading-none text-[#C9A96E] tracking-wide">
                      {value}
                    </p>
                    <p className="mt-1.5 font-sans text-[9px] lg:text-[10px] font-bold uppercase leading-snug tracking-[0.06em] text-white/90">
                      {label}
                    </p>
                    {/* Golden horizontal divider line */}
                    <div className="mt-1.5 h-[1.5px] w-7 bg-[#C9A96E]/30 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Value Props Section ──────────────────────────────────── */}
        <section className="bg-[#F9F6F1] py-4 sm:py-6 lg:py-8" aria-label="Why choose us">
          <div className="section-container">
            {/* Scrollable on mobile, beautiful cards grid on desktop */}
            <div className="no-scrollbar -mx-4 flex overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:px-0 lg:grid-cols-6 lg:gap-4 xl:gap-5">
              {VALUE_PROPS.map((item) => {
                const Icon = item.Icon;
                return (
                  <div
                    key={item.title}
                    className="flex w-[130px] shrink-0 flex-col items-center text-center bg-[#FAF8F5] border border-[#C9A96E]/12 rounded-2xl px-2.5 py-4.5 shadow-[0_4px_16px_rgba(26,16,16,0.03)] sm:w-full transition-all duration-300 hover:bg-white hover:border-[#C9A96E]/30 hover:shadow-[0_8px_24px_-4px_rgba(166,124,55,0.08)] hover:-translate-y-0.5 group"
                  >
                    {/* Gold-ringed circular icon button container */}
                    <div
                      className="flex h-[52px] w-[52px] sm:h-[60px] sm:w-[60px] items-center justify-center rounded-full border border-[#C9A96E]/25 bg-gradient-to-b from-[#FFFDFB] to-[#F5F2ED] shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),0_4px_12px_rgba(166,124,55,0.04)] transition-all duration-300 group-hover:scale-[1.03] group-hover:border-[#C9A96E]/45 group-hover:shadow-[0_4px_16px_rgba(166,124,55,0.08)]"
                      aria-hidden
                    >
                      <Icon className="h-5.5 w-5.5 sm:h-6 sm:w-6 text-[#A67C37] transition-colors duration-300 group-hover:text-[#B8924F]" strokeWidth={1.25} />
                    </div>
                    
                    {/* Label */}
                    <p className="mt-3 font-sans text-[9.5px] sm:text-[11px] font-bold uppercase leading-snug tracking-[0.08em] text-[#1A1010] sm:tracking-[0.1em] px-1">
                      {item.title}
                    </p>
                    
                    {/* Mockup premium gold center-dot divider ornament */}
                    <div className="mt-2.5 flex items-center justify-center gap-1.5 w-full">
                      <div className="h-[1px] w-5 bg-[#C9A96E]/35 transition-colors duration-300 group-hover:bg-[#C9A96E]/50" />
                      <div className="h-1.5 w-1.5 rounded-full bg-[#A67C37] transition-all duration-300 group-hover:bg-[#B8924F] group-hover:scale-[1.1] shadow-[0_0_4px_rgba(166,124,55,0.2)]" />
                      <div className="h-[1px] w-5 bg-[#C9A96E]/35 transition-colors duration-300 group-hover:bg-[#C9A96E]/50" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Explore gifting solutions ─────────────────────────────────── */}
        <section className="border-t border-[#ebe6e0] bg-[#F9F6F1] py-5 sm:py-8 lg:py-10" aria-labelledby="gifting-solutions-heading">
          <div className="section-container">
            <div className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-8">
              <span className="rule-line min-w-[2.5rem] max-w-[6rem] flex-1 sm:max-w-[8rem] lg:max-w-[10rem]" aria-hidden />
              <h2
                id="gifting-solutions-heading"
                className="section-heading-corporate shrink-0 text-center leading-snug text-[#1A1010] sm:tracking-[0.2em] lg:tracking-[0.22em] capitalize"
              >
                Our Corporate Gifting Solutions
              </h2>
              <span className="rule-line min-w-[2.5rem] max-w-[6rem] flex-1 sm:max-w-[8rem] lg:max-w-[10rem]" aria-hidden />
            </div>

            {/* Mobile: horizontal scroll */}
            <div
              ref={giftingSolutionsScrollRef}
              className="no-scrollbar -mx-4 mt-4 flex gap-3 overflow-x-auto px-4 pb-1 sm:hidden"
            >
              {GIFTING_SOLUTIONS.map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  className="group flex w-[120px] shrink-0 flex-col transition-opacity hover:opacity-90"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-[#ebe6e0]/80 bg-[#f5f2ee] shadow-[0_2px_12px_-4px_rgba(26,16,16,0.08)]">
                    <AppImage
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="120px"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-2 text-center font-sans text-[10.5px] font-bold uppercase leading-snug tracking-[0.06em] text-[#1A1010]">
                    {item.label}
                  </p>
                </Link>
              ))}
            </div>

            {giftingPageCount > 1 && (
              <div className="mt-2.5 flex items-center justify-center gap-2 sm:hidden">
                <button
                  type="button"
                  onClick={() => slideGiftingSolutions('prev')}
                  className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#d8d1c8] bg-white text-[#1A1010] shadow-sm transition-colors hover:bg-[#f7f3ee]"
                  aria-label="Previous solutions"
                >
                  <ChevronLeft className="h-3 w-3" strokeWidth={2.25} />
                </button>
                {Array.from({ length: giftingPageCount }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => goToGiftingPage(index)}
                    className={`h-1.5 rounded-full transition-all ${
                      index === activeGiftingPage ? 'w-4 bg-[#1A1010]' : 'w-1.5 bg-[#b9b2aa]'
                    }`}
                    aria-label={`Go to solutions slide ${index + 1}`}
                  />
                ))}
                <button
                  type="button"
                  onClick={() => slideGiftingSolutions('next')}
                  className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#d8d1c8] bg-white text-[#1A1010] shadow-sm transition-colors hover:bg-[#f7f3ee]"
                  aria-label="Next solutions"
                >
                  <ChevronRight className="h-3 w-3" strokeWidth={2.25} />
                </button>
              </div>
            )}

            {/* sm+: grid */}
            <ul className="mt-6 hidden list-none grid-cols-4 gap-x-4 gap-y-6 sm:grid lg:mt-8 xl:grid-cols-8 xl:gap-x-3">
              {GIFTING_SOLUTIONS.map((item) => (
                <li key={item.id}>
                  <Link to={item.href} className="group flex flex-col transition-opacity hover:opacity-90">
                    <div className="relative aspect-square overflow-hidden rounded-lg border border-[#ebe6e0]/80 bg-[#f5f2ee] shadow-[0_2px_12px_-4px_rgba(26,16,16,0.08)]">
                      <AppImage
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        sizes="(max-width:1280px) 22vw, 140px"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <p className="mt-2.5 text-center font-sans text-[12.5px] font-bold uppercase leading-snug tracking-[0.06em] text-[#1A1010] sm:tracking-[0.08em] lg:text-[13px] xl:text-[12px]">
                      {item.label}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <WoodenGiftingSection />

        <TrustedLeadingBrandsSection />

        <CorporateTestimonialsSection />

        <CorporateExpertsCtaSection />
      </main>

      <Footer />
    </div>
  );
}
