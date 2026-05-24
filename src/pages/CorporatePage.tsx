import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CorporateExpertsCtaSection from '@/components/corporate/CorporateExpertsCtaSection';
import TrustedLeadingBrandsSection from '@/components/corporate/TrustedLeadingBrandsSection';
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
    eyebrow: 'Premium corporate gifting solutions',
    headingLight: "Thoughtfully\nCurated Gifts",
    headingItalic: "For Stronger\nBusiness Relationships.",
    image: '/images/corporate-hero-banner.png',
    mobileImage: '/images/corporate-hero-banner-mobile.png',
    imageAlt: 'Curated premium corporate gifts',
    textPosition: 'left',
    theme: 'light',
    bgClass: 'bg-[#F9F6F1]',
    textColorLight: 'text-[#1A1010]',
    textColorItalic: 'text-[#966E31]',
    eyebrowColor: 'text-[#966E31]',
    gradientClass: 'from-[#F9F6F1]/95 via-[#F9F6F1]/80 to-transparent left-0 w-[55%] lg:w-[48%]',
    imgTranslate: 'md:object-[72%_center]',
    hasEmbeddedText: false,
    hasMobileEmbeddedText: false
  }
] as const;

export default function CorporatePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play interval with reset on interaction
  useEffect(() => {
    if (HERO_SLIDES.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [currentSlide]);



  return (
    <div className="flex min-h-screen flex-col bg-[#F9F6F1]">
      <Navbar />

      <main className="flex-grow pt-[calc(11.5rem+env(safe-area-inset-top,0px))] md:pt-[9rem] xl:pt-[5.75rem] 2xl:pt-[6rem]">

        {/* ── Hero Slider ────────────────────────────────────────────────── */}
        <section className="relative w-full overflow-hidden bg-[#F9F6F1]" aria-labelledby="corporate-hero-heading">
          <div className="relative mx-auto w-full max-w-[2500px]">
            
            {/* Slides Container */}
            <div className="relative h-[530px] sm:h-[570px] md:h-auto md:aspect-[1024/385] w-full overflow-hidden">
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
                          'relative z-[2] w-full md:w-auto px-4 pb-4 pt-5 sm:px-6 text-center md:text-left flex flex-col items-center md:items-start md:pointer-events-none md:absolute md:inset-y-0 md:max-w-[50%] md:justify-center md:bg-transparent md:px-8 md:py-8 lg:max-w-[46%] lg:px-10 xl:max-w-[42%] 2xl:max-w-[38%]',
                          slide.textPosition === 'left' ? 'md:left-[4%] lg:left-[6%] xl:left-[8%] 2xl:left-[10%] md:right-auto md:text-left' : 'md:right-[4%] lg:right-[6%] xl:right-[8%] 2xl:right-[10%] md:left-auto md:text-left'
                        ].join(' ')}
                      >
                        <div className="md:pointer-events-auto">
                          <p className={`eyebrow sm:tracking-[0.32em] ${slide.eyebrowColor}`}>
                            {slide.eyebrow}
                          </p>
                          <h1
                            id="corporate-hero-heading"
                            className="hero-heading-corporate mt-2 max-w-[21rem] sm:mt-3 sm:max-w-[25rem] md:max-w-[28rem] lg:max-w-[32rem] xl:max-w-[36rem]"
                          >
                            <span className={`block ${slide.textColorLight}`}>
                              {slide.headingLight.split('\n').map((line, i) => (
                                <span key={i} className="block">{line}</span>
                              ))}
                            </span>
                            <span className={`mt-1.5 block font-serif font-medium italic text-[0.88em] leading-[1.3] md:mt-2.5 ${slide.textColorItalic}`}>
                              {slide.headingItalic.split('\n').map((line, i) => (
                                <span key={i} className="block leading-[1.3]">{line}</span>
                              ))}
                            </span>
                          </h1>

                          {/* Hero CTA buttons — aligned center on mobile, left on desktop */}
                          <div className="mt-6 hidden md:flex flex-wrap items-center justify-center md:justify-start gap-3 w-full">
                            <Link
                              to="/contact"
                              className="inline-flex items-center gap-2 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] px-5 py-3 font-sans text-[11px] md:text-[12px] font-bold uppercase tracking-[0.08em] text-white shadow-md transition-all active:scale-[0.98]"
                            >
                              <Gift className="h-4 w-4 text-[#C9A96E]" strokeWidth={1.5} />
                              <span>Get Bulk Quote</span>
                            </Link>
                            <Link
                              to="/shop"
                              className="inline-flex items-center gap-2 rounded-lg border border-[#C9A96E] bg-[#FAF7F4] hover:bg-[#FFF9F5] px-5 py-3 font-sans text-[11px] md:text-[12px] font-bold uppercase tracking-[0.08em] text-[#1A1010] shadow-sm transition-all active:scale-[0.98]"
                            >
                              <ShoppingBag className="h-4 w-4 text-[#C9A96E]" strokeWidth={1.5} />
                              <span>Explore Collections</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
 
                    {/* Banner image */}
                    <div className={`relative w-full ${slide.hasMobileEmbeddedText ? 'h-full absolute inset-0' : 'h-[58%] sm:h-[62%]'} md:absolute md:inset-0 md:h-full`}>
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
                          className={`block h-full w-full object-cover object-center ${slide.imgTranslate}`}
                        />
                      </picture>
                    </div>

                    {/* Mobile CTA buttons — rendered below the banner image on mobile view */}
                    {!slide.hasEmbeddedText && (
                      <div className="flex md:hidden flex-col items-center justify-center gap-2.5 w-full px-4 py-4 bg-[#F9F6F1] border-t border-[#ebe6e0]/40 shrink-0">
                        <div className="flex gap-3 w-full max-w-[28rem]">
                          <Link
                            to="/contact"
                            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] py-3.5 px-3 font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.06em] text-white shadow-md active:scale-[0.98]"
                          >
                            <Gift className="h-4 w-4 text-[#C9A96E]" strokeWidth={1.5} />
                            <span className="whitespace-nowrap">Get Bulk Quote</span>
                          </Link>
                          <Link
                            to="/shop"
                            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-[#C9A96E] bg-[#FAF7F4] hover:bg-[#FFF9F5] py-3.5 px-3 font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.06em] text-[#1A1010] shadow-sm active:scale-[0.98]"
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

            {/* Dot Indicators */}
            {HERO_SLIDES.length > 1 && (
              <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
                {HERO_SLIDES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'w-6 bg-[#A67C37]' : 'w-2.5 bg-black/20 hover:bg-black/40'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}

          </div>
        </section>

        {/* ── Stats Section ──────────────────────────────────────────────── */}
        <div className="bg-[#F9F6F1] px-4 pb-2 pt-4 sm:px-6 sm:pt-6 md:px-8">
          <div className="mx-auto max-w-[72rem]">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#C9A96E]/20 bg-[#152033] shadow-[0_12px_36px_-12px_rgba(26,16,16,0.35)] sm:grid-cols-4">
              {STATS.map(({ Icon, value, label }, i) => (
                <div
                  key={label}
                  className={[
                    'flex items-center gap-3 bg-gradient-to-b from-[#18263D] to-[#111A28] px-4 py-4 sm:justify-center sm:px-5 sm:py-5 lg:px-7 lg:py-6',
                    i < 3 ? 'md:border-r border-[#C9A96E]/15' : '', // Gold border separator on desktop
                    i === 0 && 'rounded-tl-2xl sm:rounded-l-2xl sm:rounded-tr-none',
                    i === 1 && 'rounded-tr-2xl sm:rounded-none',
                    i === 2 && 'rounded-bl-2xl sm:rounded-none',
                    i === 3 && 'rounded-br-2xl sm:rounded-r-2xl sm:rounded-bl-none',
                  ].filter(Boolean).join(' ')}
                >
                  {/* Gold-rimmed circular icon wrapper */}
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border border-[#C9A96E]/35 bg-[#152033]/80 text-[#C9A96E] shadow-[0_3px_10px_rgba(201,169,110,0.12)]">
                    <Icon className="h-5.5 w-5.5 sm:h-6 sm:w-6" strokeWidth={1.3} aria-hidden />
                  </div>
                  
                  {/* Number & label vertical stack */}
                  <div className="min-w-0 flex flex-col items-start">
                    <p className="font-serif text-[16px] font-bold leading-none text-[#C9A96E] sm:text-[19px] lg:text-[21px] tracking-wide">
                      {value}
                    </p>
                    <p className="mt-1 font-sans text-[8.5px] font-bold uppercase leading-snug tracking-[0.08em] text-white/80 sm:text-[9.5px]">
                      {label}
                    </p>
                    {/* Mockup custom horizontal divider line */}
                    <div className="mt-1.5 h-[1.5px] w-7 bg-[#C9A96E]/30 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Value Props Section ──────────────────────────────────── */}
        <section className="bg-[#F9F6F1] py-6 sm:py-8 lg:py-12" aria-label="Why choose us">
          <div className="section-container">
            {/* Scrollable on mobile, beautiful cards grid on desktop */}
            <div className="no-scrollbar -mx-4 flex overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:px-0 lg:grid-cols-6 lg:gap-4 xl:gap-5">
              {VALUE_PROPS.map((item) => {
                const Icon = item.Icon;
                return (
                  <div
                    key={item.title}
                    className="flex w-[140px] shrink-0 flex-col items-center text-center bg-[#FAF8F5] border border-[#C9A96E]/12 rounded-2xl px-3 py-6 shadow-[0_4px_16px_rgba(26,16,16,0.03)] sm:w-full transition-all duration-300 hover:bg-white hover:border-[#C9A96E]/30 hover:shadow-[0_8px_24px_-4px_rgba(166,124,55,0.08)] hover:-translate-y-0.5 group"
                  >
                    {/* Gold-ringed circular icon button container */}
                    <div
                      className="flex h-[64px] w-[64px] sm:h-[72px] sm:w-[72px] items-center justify-center rounded-full border border-[#C9A96E]/25 bg-gradient-to-b from-[#FFFDFB] to-[#F5F2ED] shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),0_4px_12px_rgba(166,124,55,0.04)] transition-all duration-300 group-hover:scale-[1.03] group-hover:border-[#C9A96E]/45 group-hover:shadow-[0_4px_16px_rgba(166,124,55,0.08)]"
                      aria-hidden
                    >
                      <Icon className="h-6.5 w-6.5 sm:h-7 sm:w-7 text-[#A67C37] transition-colors duration-300 group-hover:text-[#B8924F]" strokeWidth={1.25} />
                    </div>
                    
                    {/* Label */}
                    <p className="mt-4 font-sans text-[11px] sm:text-[12.5px] font-bold uppercase leading-snug tracking-[0.08em] text-[#1A1010] sm:tracking-[0.1em] px-1">
                      {item.title}
                    </p>
                    
                    {/* Mockup premium gold center-dot divider ornament */}
                    <div className="mt-3 flex items-center justify-center gap-1.5 w-full">
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
                className="section-heading-corporate shrink-0 text-center leading-snug text-[#1A1010] sm:tracking-[0.2em] lg:tracking-[0.22em]"
              >
                Explore our gifting solutions
              </h2>
              <span className="rule-line min-w-[2.5rem] max-w-[6rem] flex-1 sm:max-w-[8rem] lg:max-w-[10rem]" aria-hidden />
            </div>

            {/* Mobile: horizontal scroll */}
            <div className="no-scrollbar -mx-4 mt-4 flex gap-3 overflow-x-auto px-4 pb-1 sm:hidden">
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

        <TrustedLeadingBrandsSection />

        <CorporateExpertsCtaSection />
      </main>

      <Footer />
    </div>
  );
}
