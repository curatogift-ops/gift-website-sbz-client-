import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CorporateExpertsCtaSection from '@/components/corporate/CorporateExpertsCtaSection';
import TrustedLeadingBrandsSection from '@/components/corporate/TrustedLeadingBrandsSection';
import AppImage from '@/components/ui/AppImage';
import { cn } from '@/utils/cn';
import {
  Briefcase,
  Building2,
  Gift,
  Headphones,
  PackageOpen,
  Star,
  Tag,
  Truck,
  Users,
} from 'lucide-react';

const WA = '919876543210';

const STATS = [
  { value: '500+', label: 'CORPORATE CLIENTS', Icon: Building2 },
  { value: '1,00,000+', label: 'GIFTS DELIVERED', Icon: Gift },
  { value: '10+ YEARS', label: 'OF TRUST & RELIABILITY', Icon: Users },
  { value: '4.9/5', label: 'CLIENT SATISFACTION', Icon: Star },
] as const;

const VALUE_PROPS = [
  {
    title: 'WIDE RANGE OF PRODUCTS',
    desc: '1000+ premium options for every occasion',
    Icon: Gift,
  },
  {
    title: 'CUSTOMISATION & BRANDING',
    desc: 'Add your logo, personalise & create lasting impressions',
    Icon: Tag,
  },
  {
    title: 'PREMIUM PACKAGING',
    desc: 'Elegant, sturdy & custom packaging that stands out',
    Icon: PackageOpen,
  },
  {
    title: 'BULK ORDER EXPERTISE',
    desc: 'Scalable solutions for businesses of all sizes',
    Icon: Users,
  },
  {
    title: 'PAN INDIA DELIVERY',
    desc: 'Reliable & on-time delivery across India',
    Icon: Truck,
  },
  {
    title: 'END TO END SUPPORT',
    desc: 'From idea to delivery, we manage everything for you',
    Icon: Headphones,
  },
] as const;

const GIFTING_SOLUTIONS = [
  {
    id: 'corporate-hampers',
    label: 'CORPORATE HAMPERS',
    href: '/shop?cat=corporate-hampers',
    image:
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=480&h=480',
    imageAlt: 'Premium corporate hamper gift box',
  },
  {
    id: 'employee-joining',
    label: 'EMPLOYEE JOINING KITS',
    href: '/shop?type=employee',
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=480&h=480',
    imageAlt: 'Employee welcome kit with backpack and branded items',
  },
  {
    id: 'festive',
    label: 'FESTIVE GIFTS',
    href: '/shop?cat=festive',
    image:
      'https://images.unsplash.com/photo-1513885536991-8b943e177042?auto=format&fit=crop&q=80&w=480&h=480',
    imageAlt: 'Festive gift boxes with gold ribbon',
  },
  {
    id: 'custom-merchandise',
    label: 'CUSTOM MERCHANDISE',
    href: '/shop?type=merch',
    image:
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=480&h=480',
    imageAlt: 'Custom branded polo shirt and cap',
  },
  {
    id: 'tech',
    label: 'TECH GIFTS',
    href: '/shop?type=tech',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=480&h=480',
    imageAlt: 'Premium tech gifts including headphones',
  },
  {
    id: 'drinkware',
    label: 'DRINKWARE',
    href: '/shop?type=drinkware',
    image:
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=480&h=480',
    imageAlt: 'Branded drinkware bottles and mugs',
  },
  {
    id: 'event-conference',
    label: 'EVENT & CONFERENCE GIFTING',
    href: '/shop?type=event',
    image:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=480&h=480',
    imageAlt: 'Event and conference gifting tote and badge',
  },
  {
    id: 'luxury-packaging',
    label: 'LUXURY PACKAGING SOLUTIONS',
    href: '/shop?type=packaging',
    image:
      'https://images.unsplash.com/photo-1512496015851-a90fb38f7968?auto=format&fit=crop&q=80&w=480&h=480',
    imageAlt: 'Luxury gift packaging with ribbon',
  },
] as const;

export default function CorporatePage() {
  const bulkQuoteHref = `https://wa.me/${WA}?text=${encodeURIComponent(
    "Hi, I'd like to get a bulk quote for corporate gifting."
  )}`;

  return (
    <div className="flex min-h-screen flex-col bg-[#F9F6F1]">
      <Navbar />

      <main className="flex-grow pb-16 pt-[calc(12.5rem+env(safe-area-inset-top,0px))] md:pb-20 md:pt-[9.5rem] xl:pt-[5.75rem] 2xl:pt-[6rem]">
        <section className="section-container" aria-labelledby="corporate-hero-heading">
          {/* Centered hero image with copy + stats overlay */}
          <div className="relative mx-auto w-full max-w-[72rem]">
            <div className="mb-8 max-w-xl lg:pointer-events-none lg:absolute lg:inset-y-0 lg:left-0 lg:z-[2] lg:mb-0 lg:flex lg:max-w-[min(42%,28rem)] lg:flex-col lg:justify-center lg:py-6 lg:pl-2 lg:pr-4 xl:max-w-[min(40%,30rem)] xl:pl-4">
              <div className="lg:pointer-events-auto">
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.32em] text-[#A67C37] sm:text-[11px]">
                  Premium corporate gifting solutions
                </p>

                <h1
                  id="corporate-hero-heading"
                  className="mt-4 font-serif text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-[#1A1010] lg:text-[clamp(1.75rem,2.8vw,3.25rem)]"
                >
                  Thoughtfully Curated Gifts{' '}
                  <span className="text-[#A67C37]">That Build Stronger Business Relationships.</span>
                </h1>

                <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[#4a4846] sm:text-base lg:max-w-md">
                  From luxury hampers to branded merchandise, we help you create memorable gifting experiences
                  that strengthen relationships and elevate your brand.
                </p>

                <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
                  <a
                    href={bulkQuoteHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-md bg-[#4A0E1C] px-5 py-3 font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_8px_24px_-10px_rgba(74,14,28,0.45)] transition hover:bg-[#3a0b12] sm:px-6 sm:text-[11px] sm:tracking-[0.18em]"
                  >
                    <Gift className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                    Get bulk quote
                  </a>
                  <Link
                    to="/shop"
                    className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-md border border-[#C5A059] bg-white px-5 py-3 font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-[#A67C37] transition hover:bg-[#FAF7F4] sm:px-6 sm:text-[11px] sm:tracking-[0.18em]"
                  >
                    <Briefcase className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                    Explore collections
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex justify-center lg:pt-2">
              <img
                src="/images/corporate-hero.png"
                alt="Premium corporate gift box with branded merchandise from Giftz Gallerei"
                width={1200}
                height={900}
                decoding="async"
                fetchPriority="high"
                className="mx-auto h-auto w-full max-w-full object-contain object-center"
              />
            </div>

            {/* Stats stack — aligned to image right */}
            <div className="absolute right-[2%] top-[6%] z-[3] flex flex-col gap-2 sm:right-[4%] sm:top-[8%] sm:gap-2.5 lg:right-[6%] lg:top-[10%] lg:gap-3 xl:right-[8%]">
              {STATS.map((stat) => {
                const Icon = stat.Icon;
                return (
                  <div
                    key={stat.label}
                    className="flex min-w-[10.5rem] items-center gap-3 rounded-sm border border-[#C5A059]/55 bg-[#1A1010]/82 px-3 py-2.5 shadow-[0_8px_28px_-8px_rgba(0,0,0,0.35)] backdrop-blur-[2px] sm:min-w-[11.5rem] sm:px-3.5 sm:py-3"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-[#C5A059]/40 text-[#E8CF9A]">
                      <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <p className="font-serif text-lg font-semibold leading-none text-[#E8CF9A] sm:text-xl">
                        {stat.value}
                      </p>
                      <p className="mt-1 font-sans text-[8px] font-bold uppercase leading-tight tracking-[0.14em] text-white/90 sm:text-[9px]">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Trust quote + six-column value props (reference design) */}
        <section
          className="border-t border-[#ebe6e0] bg-[#FDFBF7] py-12 sm:py-14 lg:py-16"
          aria-labelledby="corporate-trust-heading"
        >
          <div className="section-container">
            <figure className="mx-auto max-w-4xl px-2 text-center">
              <blockquote
                id="corporate-trust-heading"
                className="flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1 font-sans text-[15px] font-normal italic leading-relaxed text-[#1A1010] sm:text-[16px] sm:leading-[1.65] lg:text-[17px]"
              >
                <span
                  className="shrink-0 font-sans text-[2.75rem] font-normal leading-none text-[#C9A96E] not-italic sm:text-[3.25rem]"
                  aria-hidden
                >
                  “
                </span>
                <span className="max-w-[36rem]">
                  Trusted by leading brands across healthcare, technology, education &amp; enterprise sectors.
                </span>
                <span
                  className="shrink-0 font-sans text-[2.75rem] font-normal leading-none text-[#C9A96E] not-italic sm:text-[3.25rem]"
                  aria-hidden
                >
                  ”
                </span>
              </blockquote>
            </figure>

            <div className="mx-auto mt-10 max-w-[80rem] rounded-sm border border-[#ebe6e0] bg-white px-4 py-8 shadow-[0_1px_0_rgba(26,16,16,0.04)] sm:mt-12 sm:px-6 sm:py-10 lg:mt-14 lg:px-8 lg:py-12">
              <ul className="grid list-none grid-cols-1 sm:grid-cols-2 lg:flex lg:divide-x lg:divide-[#e8e2dc]">
                {VALUE_PROPS.map((item, index) => {
                  const Icon = item.Icon;
                  return (
                    <li
                      key={item.title}
                      className={cn(
                        'flex flex-col items-center px-3 py-6 text-center sm:px-4 sm:py-5 lg:flex-1 lg:px-5 lg:py-4',
                        index > 0 && 'border-t border-[#e8e2dc] lg:border-t-0',
                        index % 2 === 1 && 'sm:border-l sm:border-[#e8e2dc]',
                        index % 2 === 1 && index < 2 && 'sm:border-t-0',
                        index >= 2 && 'sm:border-t sm:border-[#e8e2dc]'
                      )}
                    >
                      <Icon
                        className="mb-5 h-10 w-10 shrink-0 text-[#1A1010] sm:h-11 sm:w-11"
                        strokeWidth={1.15}
                        aria-hidden
                      />
                      <h3 className="font-sans text-[10px] font-bold uppercase leading-snug tracking-[0.06em] text-[#1A1010] sm:text-[11px] lg:tracking-[0.04em]">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 max-w-[12.5rem] font-sans text-[11px] font-normal leading-relaxed text-[#5c5854] sm:text-[12px] lg:max-w-[10.5rem]">
                        {item.desc}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        {/* Explore gifting solutions — 8 category grid */}
        <section
          className="bg-[#F9F6F1] py-12 sm:py-14 lg:py-16"
          aria-labelledby="gifting-solutions-heading"
        >
          <div className="section-container">
            <div className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-8">
              <span className="rule-line min-w-[2.5rem] max-w-[6rem] flex-1 sm:max-w-[8rem] lg:max-w-[10rem]" aria-hidden />
              <h2
                id="gifting-solutions-heading"
                className="shrink-0 text-center font-sans text-[10px] font-bold uppercase leading-snug tracking-[0.14em] text-[#1A1010] sm:text-[11px] sm:tracking-[0.2em] lg:text-xs lg:tracking-[0.22em]"
              >
                Explore our gifting solutions
              </h2>
              <span className="rule-line min-w-[2.5rem] max-w-[6rem] flex-1 sm:max-w-[8rem] lg:max-w-[10rem]" aria-hidden />
            </div>

            <ul className="mt-10 grid list-none grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-4 sm:gap-x-4 sm:gap-y-10 lg:mt-12 xl:grid-cols-8 xl:gap-x-3">
              {GIFTING_SOLUTIONS.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.href}
                    className="group flex flex-col transition-opacity hover:opacity-90"
                  >
                    <div className="relative aspect-square overflow-hidden rounded-lg border border-[#ebe6e0]/80 bg-[#f5f2ee] shadow-[0_2px_12px_-4px_rgba(26,16,16,0.08)]">
                      <AppImage
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        sizes="(max-width:640px) 45vw, (max-width:1280px) 22vw, 140px"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <p className="mt-3 text-center font-sans text-[8px] font-bold uppercase leading-snug tracking-[0.06em] text-[#1A1010] min-[380px]:text-[9px] sm:text-[10px] sm:tracking-[0.08em] lg:text-[10px] xl:text-[9px] xl:tracking-[0.05em]">
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
