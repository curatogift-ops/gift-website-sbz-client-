import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CorporateExpertsCtaSection from '@/components/corporate/CorporateExpertsCtaSection';
import WoodenGiftingSection from '@/components/corporate/WoodenGiftingSection';
import CorporateGiftingGallerySection from '@/components/corporate/CorporateGiftingGallerySection';
import CorporateHeroDecor from '@/components/corporate/CorporateHeroDecor';
import EventConferenceGiftingSection from '@/components/corporate/EventConferenceGiftingSection';
import AwardsTrophiesSection from '@/components/corporate/AwardsTrophiesSection';
import CorporateGiftingProcessSection from '@/components/corporate/CorporateGiftingProcessSection';
import BulkEnquiryFormSection from '@/components/shared/BulkEnquiryFormSection';
import FaqAccordionSection from '@/components/shared/FaqAccordionSection';
import AppImage from '@/components/ui/AppImage';
import { getCorporateSolutionsCategories } from '@/config/corporateGiftingData';
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
  { title: 'PREMIUM QUALITY', Icon: Gem },
  { title: 'CUSTOM BRANDING', Icon: Tag },
  { title: 'PAN INDIA DELIVERY', Icon: Truck },
  { title: 'BULK ORDER SUPPORT', Icon: Headset },
  { title: 'SECURE PACKAGING', Icon: Shield },
  { title: 'SUSTAINABLE CHOICES', Icon: Leaf },
] as const;

const GIFTING_SOLUTIONS = getCorporateSolutionsCategories().map((category) => ({
  id: category.slug,
  label: category.label.toUpperCase(),
  href: `/corporate/category/${category.slug}`,
  image: category.image,
  imageAlt: category.imageAlt,
}));

const STATS = [
  { Icon: Building2, value: 'Top', label: 'Corporate Clients' },
  { Icon: Gift, value: '1,00,000+', label: 'Gifts Delivered' },
  { Icon: Users, value: '10+ Years', label: 'Trust & Reliability' },
  { Icon: Star, value: '4.9/5', label: 'Client Satisfaction' },
] as const;

const HERO_SLIDES = [
  {
    id: 'corporate-hampers',
    eyebrow: 'CORPORATE HAMPERS',
    headingLight: "India's Trusted",
    headingItalic: 'Corporate Gifting Partner.',
    image: '/images/corporate/hero/corporate-hero-hampers.jpeg',
    imageAlt: 'Premium corporate gift hampers with branded packaging',
    textPosition: 'left',
    bgClass: 'bg-[#1A1010]',
    imgPosition: 'object-center',
    imgTranslate: 'md:object-[55%_center]',
  },
  {
    id: 'tech-gifting',
    eyebrow: 'TECH GIFTS',
    headingLight: 'Premium Tech',
    headingItalic: 'For Modern Teams.',
    image: '/images/corporate/hero/corporate-hero-tech.jpeg',
    imageAlt: 'Premium technology corporate gifting collection',
    textPosition: 'left',
    bgClass: 'bg-[#1A1010]',
    imgPosition: 'object-center',
    imgTranslate: 'md:object-center',
  },
  {
    id: 'premium-products',
    eyebrow: 'PREMIUM PRODUCTS',
    headingLight: 'Luxury Corporate',
    headingItalic: 'Gifting Solutions.',
    image: '/images/corporate/hero/corporate-hero-premium.jpeg',
    imageAlt: 'Luxury premium corporate gift products',
    textPosition: 'left',
    bgClass: 'bg-[#1A1010]',
    imgPosition: 'object-center',
    imgTranslate: 'md:object-[52%_center]',
  },
  {
    id: 'awards-trophies',
    eyebrow: 'AWARDS & TROPHIES',
    headingLight: 'Celebrate Every',
    headingItalic: 'Achievement.',
    image: '/images/corporate/hero/corporate-hero-awards.jpeg',
    imageAlt: 'Corporate awards, trophies and recognition gifts',
    textPosition: 'left',
    bgClass: 'bg-[#1A1010]',
    imgPosition: 'object-center',
    imgTranslate: 'md:object-center',
  },
  {
    id: 'eco-friendly',
    eyebrow: 'ECO-FRIENDLY GIFTING',
    headingLight: 'Sustainable Gifts',
    headingItalic: 'With Premium Finish.',
    image: '/images/corporate/hero/corporate-hero-eco.jpeg',
    imageAlt: 'Eco-friendly sustainable corporate gifting collection',
    textPosition: 'left',
    bgClass: 'bg-[#1A1010]',
    imgPosition: 'object-center',
    imgTranslate: 'md:object-center',
  },
] as const;

const HERO_SLIDE_THEME = {
  textColorLight: 'text-[#FFFDF9]',
  textColorItalic: 'text-[#C9A96E]',
  eyebrowColor: 'text-[#C9A96E]',
} as const;

const CORPORATE_FAQS = [
  {
    question: 'What is the minimum order quantity?',
    answer: 'Minimum order quantities typically start from 25 units for most corporate gifting categories. For custom branding and awards, MOQs may vary — our team will confirm based on your specific requirement.',
  },
  {
    question: 'What branding options are available?',
    answer: 'We offer logo printing, embossing, engraving, custom ribbons, branded sleeves, product tagging, and fully customized packaging. Share your brand guidelines and we will recommend the best options.',
  },
  {
    question: 'What are the delivery timelines?',
    answer: 'Standard bulk orders are delivered within 7–14 business days across India. Express delivery is available for urgent requirements — timelines are confirmed at the quotation stage.',
  },
  {
    question: 'Can I customize the packaging?',
    answer: 'Yes. We provide fully customizable packaging including box design, inserts, ribbons, sleeves, and branded messaging. Mockups are shared for approval before production.',
  },
  {
    question: 'Do you provide samples?',
    answer: 'Sample units can be arranged for bulk orders above a certain quantity. Sample costs may apply and are often adjustable against the final order — ask our team during your enquiry.',
  },
];

export default function CorporatePage() {
  const { hash } = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [giftingPageCount, setGiftingPageCount] = useState(1);
  const [activeGiftingPage, setActiveGiftingPage] = useState(0);
  const giftingSolutionsScrollRef = useRef<HTMLDivElement | null>(null);

  // Auto-play interval with reset on interaction
  useEffect(() => {
    if (HERO_SLIDES.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 3000);
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

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace('#', '');
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
    return () => window.clearTimeout(timer);
  }, [hash]);

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
    <div className="corporate-page flex min-h-screen flex-col bg-white font-sans">
      <Navbar />

      <main className="page-main-offset flex-grow">

        {/* ── Hero Slider ────────────────────────────────────────────────── */}
        <section className="relative w-full overflow-hidden bg-primary" aria-labelledby="corporate-hero-heading">
          <div className="relative mx-auto w-full max-w-[2500px]">

            {/* Slides Container */}
            <div className="relative h-[500px] sm:h-[540px] md:h-auto md:aspect-[1024/435] lg:aspect-[1024/410] xl:aspect-[1024/395] w-full overflow-hidden">
              {HERO_SLIDES.map((slide, index) => {
                const isActive = index === currentSlide;
                return (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 flex h-full w-full items-center justify-center transition-all duration-1000 ease-in-out md:justify-start ${slide.bgClass} ${
                      isActive ? 'z-10 opacity-100 pointer-events-auto' : 'z-0 opacity-0 pointer-events-none'
                    }`}
                  >
                    <CorporateHeroDecor />

                    <div className="absolute inset-0 z-0 h-full w-full">
                      <div
                        className="pointer-events-none absolute inset-0 z-[1] hidden bg-[linear-gradient(to_right,rgba(26,16,16,0.85)_0%,rgba(26,16,16,0.55)_35%,rgba(26,16,16,0.15)_65%,transparent_100%)] md:block"
                        aria-hidden
                      />
                      <div
                        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_bottom,rgba(26,16,16,0.85)_0%,rgba(26,16,16,0.5)_40%,rgba(26,16,16,0.15)_70%,transparent_100%)] md:hidden"
                        aria-hidden
                      />
                      <img
                        src={slide.image}
                        alt={slide.imageAlt}
                        width={2500}
                        height={662}
                        decoding="async"
                        fetchPriority={index === 0 ? 'high' : 'low'}
                        sizes="(max-width: 2500px) 100vw, 2500px"
                        className={`block h-full w-full object-cover ${slide.imgPosition} ${slide.imgTranslate}`}
                      />
                    </div>

                    <div
                      className={[
                        'relative z-10 flex w-full min-w-0 flex-col items-center px-4 pt-10 pb-6 text-center sm:px-6 md:absolute md:inset-y-0 md:w-auto md:max-w-[48%] md:items-start md:justify-center md:bg-transparent md:px-10 md:py-12 md:pt-0 md:pb-0 md:text-left lg:max-w-[45%] lg:px-12 lg:py-16 xl:max-w-[42%] xl:px-16 xl:py-20 2xl:max-w-[38%]',
                        slide.textPosition === 'left'
                          ? 'md:left-[5%] md:right-auto lg:left-[6.5%] xl:left-[7.5%] 2xl:left-[8.5%]'
                          : 'md:left-auto md:right-[5%] lg:right-[6.5%] xl:right-[7.5%] 2xl:right-[8.5%]',
                      ].join(' ')}
                    >
                      <motion.div
                        className="flex w-full max-w-[22rem] flex-col items-center bg-transparent sm:max-w-[26rem] md:max-w-none md:items-start"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 15 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className={`eyebrow tracking-[0.24em] sm:tracking-[0.32em] ${HERO_SLIDE_THEME.eyebrowColor}`}>
                          {slide.eyebrow}
                        </p>
                        <h1
                          id={index === 0 ? 'corporate-hero-heading' : undefined}
                          className="hero-heading-corporate mt-1.5 max-w-[20rem] text-center sm:max-w-[24rem] md:max-w-[27rem] md:text-left lg:max-w-[30rem] xl:max-w-[33rem]"
                        >
                          <span className={`block ${HERO_SLIDE_THEME.textColorLight}`}>{slide.headingLight}</span>
                          <span
                            className={`mt-2 block font-serif text-[clamp(1.35rem,3vw,2.25rem)] font-medium italic leading-[1.14] md:mt-2.5 ${HERO_SLIDE_THEME.textColorItalic}`}
                          >
                            {slide.headingItalic}
                          </span>
                        </h1>

                        <div className="mt-6 flex w-full max-w-[22rem] flex-row items-center justify-center gap-2.5 sm:mt-8 sm:max-w-none md:justify-start">
                          <Link
                            to="/corporate#bulk-order-enquiry"
                            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-primary-foreground shadow transition hover:bg-[#4A1020] sm:flex-none sm:px-6 sm:text-xs"
                          >
                            <Gift className="h-4 w-4 text-[#C9A96E]" strokeWidth={1.5} />
                            <span className="whitespace-nowrap">Get Bulk Quote</span>
                          </Link>
                          <Link
                            to="/shop"
                            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md border border-primary-foreground/80 bg-primary-foreground px-4 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-primary transition hover:bg-[var(--cream)] sm:flex-none sm:px-6 sm:text-xs"
                          >
                            <ShoppingBag className="h-4 w-4 text-[#9D7D47]" strokeWidth={1.5} />
                            <span className="whitespace-nowrap">Explore Shop</span>
                          </Link>
                        </div>
                      </motion.div>
                    </div>
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
                    className={`h-[3px] rounded-full transition-all duration-300 ${index === currentSlide ? 'w-8 bg-white' : 'w-5 bg-white/40 hover:bg-white/65'
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}

          </div>
        </section>

        {/* ── Mobile Stats Section (Premium Rectangular Dark Blue Boxes) ──── */}
        <div className="w-full bg-primary px-4 py-5 md:hidden">
          <div className="grid grid-cols-2 gap-2.5">
            {STATS.map(({ Icon, value, label }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 rounded-md border border-primary-foreground/15 bg-primary-foreground/[0.06] px-3 py-3"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#C9A96E]/35 bg-primary-foreground/[0.08] text-[#C9A96E]">
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.3} aria-hidden />
                </div>
                <div className="min-w-0 flex flex-col items-start justify-center">
                  <p className="font-serif text-[15px] font-semibold leading-none text-[#C9A96E]">
                    {value}
                  </p>
                  <p className="mt-1 font-sans text-[9px] font-bold uppercase leading-[1.25] tracking-[0.06em] text-primary-foreground/90">
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Desktop/Tablet Stats Section (Premium Wireframe Dark Grid) ──── */}
        <div className="hidden w-full bg-primary md:block">
          <div className="w-full">
            <div className="grid grid-cols-4 overflow-hidden border-y border-primary-foreground/10">
              {STATS.map(({ Icon, value, label }, i) => (
                <div
                  key={label}
                  className={[
                    'flex items-center justify-center gap-3.5 bg-primary px-5 py-6 lg:px-6',
                    i < 3 ? 'border-r border-primary-foreground/10' : '',
                  ].filter(Boolean).join(' ')}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#C9A96E]/35 bg-primary-foreground/[0.08] text-[#C9A96E]">
                    <Icon className="h-5 w-5" strokeWidth={1.2} aria-hidden />
                  </div>
                  <div className="min-w-0 flex flex-col items-start">
                    <p className="font-serif text-[17px] font-semibold leading-none text-[#C9A96E] lg:text-[19px]">
                      {value}
                    </p>
                    <p className="mt-1.5 font-sans text-[10px] font-bold uppercase leading-snug tracking-[0.08em] text-primary-foreground/90 lg:text-[11px]">
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Value Props Section ──────────────────────────────────── */}
        <section className="bg-[var(--cream)] py-6 sm:py-8 lg:py-10" aria-label="Why choose us">
          <div className="section-container">
            <div className="no-scrollbar -mx-4 flex overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:px-0 lg:grid-cols-6 lg:gap-4 xl:gap-5">
              {VALUE_PROPS.map((item) => {
                const Icon = item.Icon;
                return (
                  <div
                    key={item.title}
                    className="group flex w-[136px] shrink-0 flex-col items-center rounded-2xl border border-border bg-white px-3 py-5 text-center transition-colors duration-300 hover:border-[#C9A96E]/45 sm:w-full"
                  >
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-md border border-[#C9A96E]/30 bg-[#4A1020] text-[#C9A96E] transition-colors duration-300 group-hover:border-[#C9A96E]/55 group-hover:bg-[#5C1529] sm:h-14 sm:w-14"
                      aria-hidden
                    >
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
                    </div>
                    <p className="mt-3 px-1 font-sans text-[10px] font-bold uppercase leading-snug tracking-[0.08em] text-foreground sm:text-[11px] sm:tracking-[0.1em]">
                      {item.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Explore gifting solutions ─────────────────────────────────── */}
        <section className="bg-white py-12 sm:py-14 lg:py-16" aria-labelledby="gifting-solutions-heading">
          <div className="section-container">
            <div className="mx-auto max-w-3xl text-center">
              <h2
                id="gifting-solutions-heading"
                className="section-heading-corporate"
              >
                Our Corporate Gifting Solutions
              </h2>
            </div>

            {/* Mobile: horizontal scroll */}
            <div
              ref={giftingSolutionsScrollRef}
              className="no-scrollbar -mx-4 mt-7 flex gap-3 overflow-x-auto px-4 pb-1 sm:hidden"
            >
              {GIFTING_SOLUTIONS.map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  className="group flex w-[132px] shrink-0 flex-col outline-none transition-all duration-300"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-border bg-muted ring-1 ring-transparent transition-all duration-300 group-hover:border-[#C9A96E]/40 group-hover:ring-[#C9A96E]/20 group-focus-visible:ring-[#C9A96E]">
                    <AppImage
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="120px"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-3 flex min-h-[2.75rem] items-center justify-center text-center font-sans text-[11px] font-bold uppercase leading-snug tracking-[0.06em] text-foreground">
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
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border bg-white text-foreground transition-colors hover:bg-muted"
                  aria-label="Previous solutions"
                >
                  <ChevronLeft className="h-3 w-3" strokeWidth={2.25} />
                </button>
                {Array.from({ length: giftingPageCount }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => goToGiftingPage(index)}
                    className={`h-1.5 rounded-full transition-all ${index === activeGiftingPage ? 'w-4 bg-primary' : 'w-1.5 bg-border'
                      }`}
                    aria-label={`Go to solutions slide ${index + 1}`}
                  />
                ))}
                <button
                  type="button"
                  onClick={() => slideGiftingSolutions('next')}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border bg-white text-foreground transition-colors hover:bg-muted"
                  aria-label="Next solutions"
                >
                  <ChevronRight className="h-3 w-3" strokeWidth={2.25} />
                </button>
              </div>
            )}

            {/* sm+: flex wrap — full row fills width; incomplete last row stays centered */}
            <ul className="mt-8 hidden list-none flex-wrap justify-center gap-x-5 gap-y-8 sm:flex lg:mt-10 xl:gap-x-4">
              {GIFTING_SOLUTIONS.map((item) => (
                <li
                  key={item.id}
                  className="w-[calc((100%-2*1.25rem)/3)] lg:w-[calc((100%-3*1.25rem)/4)] xl:w-[calc((100%-5*1rem)/6)]"
                >
                  <Link
                    to={item.href}
                    className="group flex h-full flex-col rounded-xl p-2 outline-none transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-4"
                  >
                    <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-muted transition-colors duration-300 group-hover:border-[#C9A96E]/40">
                      <AppImage
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        sizes="(max-width:1280px) 22vw, 140px"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <p className="mt-3 flex min-h-[3rem] flex-1 items-center justify-center text-center font-sans text-[12px] font-bold uppercase leading-snug tracking-[0.08em] text-foreground lg:text-[13px] xl:text-[12px]">
                      <span className="line-clamp-2">{item.label}</span>
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <WoodenGiftingSection />

        <CorporateGiftingGallerySection />

        <EventConferenceGiftingSection />

        <AwardsTrophiesSection />

        <CorporateGiftingProcessSection />

        <BulkEnquiryFormSection
          title="Bulk Order Enquiry"
          imageSrc="/images/corporate-hero-banner.png"
          imageAlt="Premium corporate bulk gifting solutions"
        />

        <FaqAccordionSection items={CORPORATE_FAQS} />

        <CorporateExpertsCtaSection />
      </main>

      <Footer />
    </div>
  );
}
