import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AppImage from '@/components/ui/AppImage';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  Building2,
  Calendar,
  Diamond,
  Gift,
  Heart,
  Leaf,
  Pencil,
  Sparkles,
  Tag,
  Users,
} from 'lucide-react';
import { cn } from '@/utils/cn';

const WA = '919876543210';

type GiftType = {
  id: string;
  title: string;
  description: string;
  href: string;
  bgClass: string;
  iconWrapClass: string;
  ctaButtonClass: string;
  Icon: LucideIcon;
  image: string;
  imageAlt: string;
  waMessage: string;
};

const PERSONALIZED_GIFT_TYPES: GiftType[] = [
  {
    id: 'hamper',
    title: 'Build your own hamper',
    description: 'Pick items, add a personal note, and choose packaging that fits the occasion.',
    href: '/hamper-builder',
    bgClass: 'bg-[#FFF4EC]',
    iconWrapClass: 'bg-[#5D1016] text-white',
    ctaButtonClass: 'bg-[#5D1016] text-white hover:bg-[#4A0E1C]',
    Icon: Gift,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600',
    imageAlt: 'Custom gift hamper',
    waMessage: "Hi, I'd like to build a personalized hamper.",
  },
  {
    id: 'engraved',
    title: 'Engraved & monogrammed',
    description: 'Names, initials, and logos etched on premium keepsakes and accessories.',
    href: '/shop?type=engraved',
    bgClass: 'bg-[#F3E8FF]',
    iconWrapClass: 'bg-[#6b21a8] text-white',
    ctaButtonClass: 'bg-[#5b21b6] text-white hover:bg-[#4c1d95]',
    Icon: Pencil,
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=600',
    imageAlt: 'Engraved personalized gift',
    waMessage: "Hi, I'm interested in engraved and monogrammed gifts.",
  },
  {
    id: 'photo',
    title: 'Photo & message gifts',
    description: 'Custom photo frames, printed cards, and message tags for a heartfelt touch.',
    href: '/shop?type=photo',
    bgClass: 'bg-[#FFEDD5]',
    iconWrapClass: 'bg-[#C2410C] text-white',
    ctaButtonClass: 'bg-[#C2410C] text-white hover:bg-[#9a3412]',
    Icon: Heart,
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600',
    imageAlt: 'Photo personalized gift',
    waMessage: "Hi, I'd like photo and message personalized gifts.",
  },
  {
    id: 'wedding',
    title: 'Wedding & celebration',
    description: 'Favors, welcome bags, and milestone keepsakes tailored to your event theme.',
    href: '/shop?type=wedding',
    bgClass: 'bg-[#FFFBF8]',
    iconWrapClass: 'bg-[#6B1E30] text-white',
    ctaButtonClass: 'bg-[#6B1E30] text-white hover:bg-[#4A0E1C]',
    Icon: Calendar,
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=600',
    imageAlt: 'Wedding personalized gifts',
    waMessage: "Hi, I need personalized gifts for a wedding or celebration.",
  },
  {
    id: 'corporate',
    title: 'Corporate branded',
    description: 'Logo-ready merchandise, executive kits, and client hampers with your branding.',
    href: '/corporate',
    bgClass: 'bg-[#ECFDF3]',
    iconWrapClass: 'bg-[#14532d] text-white',
    ctaButtonClass: 'bg-[#166534] text-white hover:bg-[#14532d]',
    Icon: Building2,
    image: 'https://images.unsplash.com/photo-1549463574-04d2c2b46ac?auto=format&fit=crop&q=80&w=600',
    imageAlt: 'Corporate branded gifts',
    waMessage: "Hi, I'd like branded corporate personalized gifts.",
  },
  {
    id: 'luxury',
    title: 'Luxury personalized boxes',
    description: 'Premium finishes, curated indulgences, and elegant unboxing with custom details.',
    href: '/shop?type=luxury',
    bgClass: 'bg-[#F3E8FF]',
    iconWrapClass: 'bg-[#6b21a8] text-white',
    ctaButtonClass: 'bg-[#5b21b6] text-white hover:bg-[#4c1d95]',
    Icon: Diamond,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38f7968?auto=format&fit=crop&q=80&w=600',
    imageAlt: 'Luxury personalized gift box',
    waMessage: "Hi, I'm looking for luxury personalized gift boxes.",
  },
  {
    id: 'employee',
    title: 'Employee welcome kits',
    description: 'Onboarding packs and milestone gifts your team will use and remember.',
    href: '/shop?type=employee',
    bgClass: 'bg-[#EFF6FF]',
    iconWrapClass: 'bg-[#1e3a8a] text-white',
    ctaButtonClass: 'bg-[#1e3a8a] text-white hover:bg-[#172554]',
    Icon: Users,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600',
    imageAlt: 'Employee personalized kit',
    waMessage: "Hi, I'd like personalized employee welcome kits.",
  },
  {
    id: 'eco',
    title: 'Eco-friendly custom',
    description: 'Sustainable materials, reusable items, and mindful packaging with personal touches.',
    href: '/shop?type=eco',
    bgClass: 'bg-[#F0F5EC]',
    iconWrapClass: 'bg-[#3f6212] text-white',
    ctaButtonClass: 'bg-[#4d7c0f] text-white hover:bg-[#3f6212]',
    Icon: Leaf,
    image: 'https://images.unsplash.com/photo-1610552050899-df6c5848284a?auto=format&fit=crop&q=80&w=600',
    imageAlt: 'Eco-friendly personalized gifts',
    waMessage: "Hi, I'd like eco-friendly personalized gifts.",
  },
];

const PERSONALIZE_FEATURES = [
  { title: 'Your logo & branding', desc: 'Sleeves, ribbons, and product branding.', Icon: Tag },
  { title: 'Personal messages', desc: 'Handwritten-style cards and custom notes.', Icon: Pencil },
  { title: 'Curated by experts', desc: 'Our team helps you pick the perfect mix.', Icon: Sparkles },
] as const;

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const activeType = searchParams.get('type') ?? searchParams.get('cat');

  const conciergeHref = `https://wa.me/${WA}?text=${encodeURIComponent(
    "Hi, I'd like help choosing a personalized gift type."
  )}`;

  return (
    <div className="flex min-h-screen flex-col bg-[#F9F6F1]">
      <Navbar />

      <main className="flex-grow pb-20 pt-[calc(12.5rem+env(safe-area-inset-top,0px))] md:pt-[9.5rem] xl:pt-[5.75rem] 2xl:pt-[6rem]">
        {/* Hero */}
        <section className="section-container border-b border-[#e8e0d8] pb-12 md:pb-16" aria-labelledby="personalized-heading">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Personalized gifting</p>
            <h1 id="personalized-heading" className="section-heading mt-3">
              Choose Your <span className="text-[#6B1E30]">Gift Type</span>
            </h1>
            <div className="mx-auto mt-5 flex max-w-xs items-center justify-center gap-3">
              <span className="rule-line min-w-[2rem] flex-1" aria-hidden />
              <Gift className="h-5 w-5 shrink-0 text-[#C5A059]" strokeWidth={1.75} aria-hidden />
              <span className="rule-line min-w-[2rem] flex-1" aria-hidden />
            </div>
            <p className="section-lede mx-auto mt-4">
              Every gift can be tailored — add names, logos, messages, and handpicked items. Select a type below
              and we will help you create something truly personal.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/hamper-builder" className="btn-pill btn-pill-maroon">
                <Gift className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                Start hamper builder
              </Link>
              <a href={conciergeHref} target="_blank" rel="noopener noreferrer" className="btn-pill btn-pill-ghost-gold">
                Talk to concierge
              </a>
            </div>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
            {PERSONALIZE_FEATURES.map((item) => {
              const Icon = item.Icon;
              return (
                <div
                  key={item.title}
                  className="flex flex-col items-center rounded-2xl border border-[#ebe8e4] bg-white px-4 py-6 text-center shadow-sm"
                >
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#FAF7F4] text-[#A67C37] ring-1 ring-[#C5A059]/25">
                    <Icon className="h-5 w-5" strokeWidth={1.65} aria-hidden />
                  </div>
                  <p className="font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[#1A1010]">
                    {item.title}
                  </p>
                  <p className="mt-2 text-[12px] leading-relaxed text-[#6b6560]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Gift types grid */}
        <section className="section-pad" aria-labelledby="gift-types-heading">
          <div className="section-container">
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow">Gift types</p>
              <h2 id="gift-types-heading" className="section-heading mt-3">
                What Would You Like to <span className="text-[#6B1E30]">Personalize?</span>
              </h2>
              <p className="section-lede mx-auto mt-4">
                Tap a category to explore options or message us for a fully bespoke curation.
              </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-2 lg:gap-6 xl:grid-cols-2">
              {PERSONALIZED_GIFT_TYPES.map((type) => {
                const Icon = type.Icon;
                const isHighlighted =
                  activeType === type.id ||
                  (activeType === 'festive' && type.id === 'hamper') ||
                  (activeType === 'employee' && type.id === 'employee') ||
                  (activeType === 'luxury' && type.id === 'luxury') ||
                  (activeType === 'eco' && type.id === 'eco');

                const waHref = `https://wa.me/${WA}?text=${encodeURIComponent(type.waMessage)}`;

                return (
                  <article
                    key={type.id}
                    className={cn(
                      'group relative flex flex-row items-stretch overflow-hidden rounded-2xl border shadow-[0_8px_28px_-12px_rgba(74,16,32,0.12)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_-12px_rgba(74,16,32,0.2)]',
                      type.bgClass,
                      isHighlighted ? 'border-[#6B1E30] ring-2 ring-[#6B1E30]/20' : 'border-black/[0.06]'
                    )}
                  >
                    <div className="relative z-[1] flex min-w-0 flex-1 flex-col justify-center px-5 py-5 sm:py-6 sm:pl-6">
                      <div
                        className={`mb-3 flex h-10 w-10 items-center justify-center rounded-full shadow-sm ${type.iconWrapClass}`}
                      >
                        <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" strokeWidth={2} aria-hidden />
                      </div>
                      <h3 className="card-title">{type.title}</h3>
                      <p className="mt-2 max-w-[16rem] text-[12.5px] leading-relaxed text-[#5c5652] sm:text-[13px]">
                        {type.description}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <Link
                          to={type.href}
                          className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#1A1010] hover:text-[#6B1E30] sm:text-[11px]"
                        >
                          Explore type
                        </Link>
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-md transition-transform duration-200 group-hover:translate-x-0.5 sm:h-9 sm:w-9 ${type.ctaButtonClass}`}
                          aria-hidden
                        >
                          <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.5} />
                        </span>
                      </div>
                      <a
                        href={waHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex text-[10px] font-semibold uppercase tracking-[0.14em] text-[#A67C37] hover:text-[#6B1E30] sm:text-[11px]"
                      >
                        Enquire on WhatsApp
                      </a>
                    </div>
                    <div className="relative z-0 -mr-px w-[40%] min-w-[7rem] shrink-0 self-stretch sm:w-[42%] sm:min-w-[8rem]">
                      <div className="absolute inset-y-3 right-3 left-0 overflow-hidden rounded-xl border border-white/60 shadow-md ring-1 ring-black/[0.04]">
                        <AppImage
                          src={type.image}
                          alt={type.imageAlt}
                          fill
                          sizes="(max-width:640px) 45vw, (max-width:1024px) 40vw, 320px"
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-14">
              <Link to="/custom-boxes" className="btn-pill btn-pill-ghost-gold">
                Custom boxes
              </Link>
              <a href={conciergeHref} target="_blank" rel="noopener noreferrer" className="btn-pill btn-pill-maroon">
                Request bespoke curation
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
