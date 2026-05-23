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
} from 'lucide-react';

const VALUE_PROPS = [
  { title: 'PREMIUM QUALITY',     Icon: Gem },
  { title: 'CUSTOM BRANDING',     Icon: Tag },
  { title: 'PAN INDIA DELIVERY',  Icon: Truck },
  { title: 'BULK ORDER SUPPORT',  Icon: Users },
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
  },
  {
    id: 'brand-your-way',
    eyebrow: 'Custom corporate merchandising',
    headingLight: 'Designed to Brand ',
    headingItalic: 'Your Way.',
    image: '/images/corporate-hero-slide-2.png',
    mobileImage: undefined,
    imageAlt: 'Customized brand-your-way corporate gifts',
    textPosition: 'right',
    theme: 'dark',
    bgClass: 'bg-[#C5A57A]',
    textColorLight: 'text-white',
    textColorItalic: 'text-[#F5E6D3]',
    eyebrowColor: 'text-[#F5E6D3]/90',
    gradientClass: 'from-transparent via-[#C5A57A]/80 to-[#C5A57A]/95 right-0 w-[55%] lg:w-[48%]',
    imgTranslate: 'md:translate-x-[0%]',
    hasEmbeddedText: true,
    hasMobileEmbeddedText: false
  }
] as const;

export default function CorporatePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play interval with reset on interaction
  useEffect(() => {
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
                          <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-3 w-full">
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
                  </div>
                );
              })}
            </div>

            {/* Dot Indicators */}
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

          </div>
        </section>

        {/* ── Stats badge ──────────────────────────────────────────────── */}
        <div className="bg-[#F9F6F1] px-4 pb-2 pt-2 sm:px-6 sm:pt-3 md:px-8">
          <div className="mx-auto max-w-[72rem]">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-[#C9A96E]/25 shadow-[0_6px_24px_-8px_rgba(26,16,16,0.2)] sm:grid-cols-4 sm:rounded-full">
              {STATS.map(({ Icon, value, label }, i) => (
                <div
                  key={label}
                  className={[
                    'flex items-center gap-2.5 bg-[#152033] px-3.5 py-3 sm:justify-center sm:px-5 sm:py-3.5 lg:px-7 lg:py-4',
                    i === 0 && 'rounded-tl-2xl sm:rounded-l-full',
                    i === 1 && 'rounded-tr-2xl sm:rounded-none',
                    i === 2 && 'rounded-bl-2xl sm:rounded-none',
                    i === 3 && 'rounded-br-2xl sm:rounded-r-full',
                  ].filter(Boolean).join(' ')}
                >
                  <Icon className="h-5 w-5 shrink-0 text-[#C9A96E] sm:h-6 sm:w-6" strokeWidth={1.4} aria-hidden />
                  <div className="min-w-0">
                    <p className="font-sans text-[14px] font-bold leading-tight text-[#C9A96E] sm:text-[16px] lg:text-[18px]">
                      {value}
                    </p>
                    <p className="mt-0.5 font-sans text-[8.5px] font-semibold uppercase leading-snug tracking-[0.1em] text-white/55 sm:text-[9.5px]">
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Value props (icon rings) ──────────────────────────────────── */}
        <section className="bg-[#F9F6F1] py-4 sm:py-6 lg:py-8" aria-label="Why choose us">
          <div className="section-container">
            <div className="no-scrollbar -mx-4 flex overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
              <ul className="flex shrink-0 list-none items-start gap-4 pb-1 sm:flex-wrap sm:justify-center sm:gap-x-8 sm:gap-y-6 sm:pb-0 lg:gap-x-12 xl:gap-x-14">
                {VALUE_PROPS.map((item) => {
                  const Icon = item.Icon;
                  return (
                    <li key={item.title} className="flex shrink-0 flex-col items-center gap-3 text-center">
                      <div
                        className="flex h-[60px] w-[60px] items-center justify-center rounded-full border border-[#C9A96E]/50 bg-[#F9F6F1] sm:h-[72px] sm:w-[72px]"
                        aria-hidden
                      >
                        <Icon className="h-5 w-5 text-[#C9A96E] sm:h-7 sm:w-7" strokeWidth={1.25} />
                      </div>
                      <p className="w-[5.5rem] font-sans text-[10.5px] font-bold uppercase leading-snug tracking-[0.08em] text-[#1A1010] sm:w-[7.5rem] sm:text-[12px] sm:tracking-[0.1em]">
                        {item.title}
                      </p>
                    </li>
                  );
                })}
              </ul>
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
