import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CorporateExpertsCtaSection from '@/components/corporate/CorporateExpertsCtaSection';
import TrustedLeadingBrandsSection from '@/components/corporate/TrustedLeadingBrandsSection';
import AppImage from '@/components/ui/AppImage';
import { cn } from '@/utils/cn';
import {
  Gift,
  Headphones,
  PackageOpen,
  Tag,
  Truck,
  Users,
} from 'lucide-react';

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
  return (
    <div className="flex min-h-screen flex-col bg-[#F9F6F1]">
      <Navbar />

      <main className="flex-grow pb-16 pt-[calc(12.5rem+env(safe-area-inset-top,0px))] md:pb-20 md:pt-[9.5rem] xl:pt-[5.75rem] 2xl:pt-[6rem]">
        <section
          className="w-full overflow-hidden bg-[#F9F6F1]"
          aria-labelledby="corporate-hero-heading"
        >
          <div className="relative mx-auto w-full max-w-[2500px]">
            {/* Copy — stacked on mobile, overlaid on banner from md up */}
            <div className="relative z-[2] px-4 pb-6 pt-2 sm:px-6 sm:pb-8 md:pointer-events-none md:absolute md:inset-y-0 md:left-0 md:flex md:max-w-[50%] md:flex-col md:justify-center md:bg-transparent md:px-8 md:py-8 lg:max-w-[46%] lg:px-10 xl:max-w-[42%] 2xl:max-w-[38%]">
              <div className="md:pointer-events-auto">
                <p className="eyebrow text-[#A67C37] sm:tracking-[0.32em]">
                  Premium corporate gifting solutions
                </p>

                <h1
                  id="corporate-hero-heading"
                  className="hero-heading-corporate mt-3 max-w-[21rem] sm:mt-4 sm:max-w-[25rem] md:max-w-[28rem] lg:max-w-[32rem] xl:max-w-[36rem]"
                >
                  <span className="text-[#1A1010] block">
                    Thoughtfully Curated
                    <br /> Gifts{' '}
                  </span>
                  <span className="text-[#A67C37] italic font-medium block mt-1.5 md:mt-2">
                    That Build Stronger
                    <br /> Business Relationships.
                  </span>
                </h1>
              </div>
            </div>

            {/* Banner — intrinsic 2500×662 (1250∶331); scales proportionally */}
            <div className="relative w-full">
              <div
                className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-[55%] bg-gradient-to-r from-[#F9F6F1]/95 via-[#F9F6F1]/80 to-transparent md:block lg:w-[48%]"
                aria-hidden
              />
              <img
                src="/images/corporate-hero-banner.png"
                alt=""
                width={2500}
                height={662}
                decoding="async"
                fetchPriority="high"
                sizes="(max-width: 2500px) 100vw, 2500px"
                className="block h-auto w-full"
              />
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
                className="flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1 font-accent text-[16.5px] font-normal italic leading-relaxed text-[#1A1010] sm:text-[18px] sm:leading-[1.65] lg:text-[20px]"
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
                      <h3 className="font-sans text-[13.5px] font-bold uppercase leading-snug tracking-[0.08em] text-[#1A1010] sm:text-[14px] lg:tracking-[0.06em]">
                        {item.title}
                      </h3>
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
                className="section-heading-corporate shrink-0 text-center leading-snug text-[#1A1010] sm:tracking-[0.2em] lg:tracking-[0.22em]"
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
                    <p className="mt-3 text-center font-sans text-[12px] font-bold uppercase leading-snug tracking-[0.06em] text-[#1A1010] min-[380px]:text-[13px] sm:text-[14px] sm:tracking-[0.08em] lg:text-[14px] xl:text-[13px] xl:tracking-[0.06em]">
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
