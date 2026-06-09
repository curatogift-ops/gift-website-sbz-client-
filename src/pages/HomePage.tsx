import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeaturedProductsSection from "@/components/home/FeaturedProductsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import ClientsAndTestimonialsSection from "@/components/home/ClientsAndTestimonialsSection";
import FestiveCollectionSection from "@/components/home/FestiveCollectionSection";
import { Link } from "react-router-dom";
import AppImage from "@/components/ui/AppImage";
import type { LucideIcon } from "lucide-react";
import {
  Gift,
  Truck,
  Diamond,
  Tag,
  Users,
  ShieldCheck,
  Leaf,
  ArrowRight,
  Building2,
  Calendar,
  Plus,
} from "lucide-react";

const WA = "919876543210";

/* Inline Instagram icon (lucide-react in this project doesn't export Instagram) */
const InstagramIcon = ({
  className = "",
  strokeWidth = 1.75,
}: {
  className?: string;
  strokeWidth?: number;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

/* ─── Trust strip data ─── */
const TRUST_FEATURES = [
  { title: "Premium quality", desc: "Finest & handpicked gifts.", Icon: Diamond, mobileLines: ["Premium", "Quality"] as const },
  { title: "Custom branding", desc: "Add your logo & personal touch.", Icon: Tag, mobileLines: ["Custom", "Branding"] as const },
  { title: "Pan India delivery", desc: "On-time, every time.", Icon: Truck, mobileLines: ["Pan India", "Delivery"] as const },
  { title: "Bulk order support", desc: "Dedicated corporate assistance.", Icon: Users, mobileLines: ["Bulk order", "Support"] as const },
  { title: "Secure packaging", desc: "Safe & elegant packaging.", Icon: ShieldCheck, mobileLines: ["Secure", "Packaging"] as const },
  { title: "Sustainable choices", desc: "Eco-friendly gifting options.", Icon: Leaf, mobileLines: ["Sustainable", "Choices"] as const },
] as const;

/* ─── Shop by category data ─── */
type ShopCategory = {
  title: string;
  description: string;
  href: string;
  bgClass: string;
  iconWrapClass: string;
  ctaButtonClass: string;
  Icon: LucideIcon;
  image: string;
  imageAlt: string;
};

const SHOP_BY_CATEGORY: ShopCategory[] = [
  {
    title: "Corporate Gifts",
    description: "Boardroom-ready hampers and branded keepsakes for teams and clients.",
    href: "/corporate",
    bgClass: "bg-[#FFF4EC]",
    iconWrapClass: "bg-[#5D1016] text-white",
    ctaButtonClass: "bg-[#5D1016] text-white hover:bg-[#4A0E1C]",
    Icon: Building2,
    image: "https://images.unsplash.com/photo-1549463574-04d2c2b46ac?auto=format&fit=crop&q=80&w=600",
    imageAlt: "Corporate gift box with notebook and bottle",
  },
  {
    title: "Festive Hampers",
    description: "Seasonal sweets, décor, and celebratory touches for every festival.",
    href: "/shop?cat=festive",
    bgClass: "bg-[#FFEDD5]",
    iconWrapClass: "bg-[#C2410C] text-white",
    ctaButtonClass: "bg-[#C2410C] text-white hover:bg-[#9a3412]",
    Icon: Gift,
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600",
    imageAlt: "Festive hamper with treats and gifts",
  },
  {
    title: "Employee Kits",
    description: "Welcome kits and milestone packs your people will actually use.",
    href: "/shop?cat=employee",
    bgClass: "bg-[#ECFDF3]",
    iconWrapClass: "bg-[#14532d] text-white",
    ctaButtonClass: "bg-[#166534] text-white hover:bg-[#14532d]",
    Icon: Users,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600",
    imageAlt: "Team onboarding kit and supplies",
  },
  {
    title: "Luxury Boxes",
    description: "Elevated finishes, premium products, and unforgettable unboxing.",
    href: "/shop?cat=luxury",
    bgClass: "bg-[#F3E8FF]",
    iconWrapClass: "bg-[#6b21a8] text-white",
    ctaButtonClass: "bg-[#5b21b6] text-white hover:bg-[#4c1d95]",
    Icon: Diamond,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38f7968?auto=format&fit=crop&q=80&w=600",
    imageAlt: "Luxury gift box with perfumes and candles",
  },
  {
    title: "Eco-Friendly Gifts",
    description: "Thoughtful gifting with sustainable materials and mindful packaging.",
    href: "/shop?cat=eco",
    bgClass: "bg-[#F0F5EC]",
    iconWrapClass: "bg-[#3f6212] text-white",
    ctaButtonClass: "bg-[#4d7c0f] text-white hover:bg-[#3f6212]",
    Icon: Leaf,
    image: "https://images.unsplash.com/photo-1610552050899-df6c5848284a?auto=format&fit=crop&q=80&w=600",
    imageAlt: "Eco-friendly reusable gifts and plants",
  },
  {
    title: "Event Gifting",
    description: "Conferences, launches, and milestones — tailored kits at every scale.",
    href: "/shop?cat=event",
    bgClass: "bg-[#EFF6FF]",
    iconWrapClass: "bg-[#1e3a8a] text-white",
    ctaButtonClass: "bg-[#1e3a8a] text-white hover:bg-[#172554]",
    Icon: Calendar,
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=600",
    imageAlt: "Event and conference gift materials",
  },
];

/* ─── Instagram tiles ─── */
const INSTAGRAM_TILES = [
  "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1544787210-2211d64b5d2b?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1548598141-efd3979912a1?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1544717305-996b815c338c?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1518131348421-4f11467406a0?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600",
];

/* ─── FAQ data ─── */
const FAQS = [
  {
    q: "How long does delivery take?",
    a: "Most orders ship within 24–48 hours of confirmation and arrive across India within 3–5 business days. Bulk corporate orders are scheduled with your team for a chosen delivery window.",
  },
  {
    q: "Can I customize the hamper contents?",
    a: "Yes. Use our hamper builder for self-serve customisation, or talk to our concierge for fully bespoke curation, branded packaging, and personal notes.",
  },
  {
    q: "Do you offer bulk discounts for corporate orders?",
    a: "Absolutely — pricing tiers begin at 25+ units, with dedicated account support, branded sleeves, and consolidated invoicing for finance teams.",
  },
  {
    q: "What are the payment options?",
    a: "We accept all major credit and debit cards, UPI, net banking, and bank transfer for corporate purchase orders.",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white selection:bg-[#6B1E30]/20">
      <Navbar />

      <main className="flex-grow">
        {/* ───── HERO ───────────────────────────────────────────────────── */}
        <section
          className="relative isolate z-0 overflow-hidden min-h-[min(100svh,52rem)] md:min-h-[min(82vh,48rem)] lg:min-h-[min(88vh,52rem)]"
          aria-labelledby="hero-heading"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-[#1b3022]" aria-hidden />
          <AppImage
            src="/hero-new.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[55%_55%] md:object-[58%_56%] lg:object-[60%_55%] scale-[1.02]"
          />
          {/* Left-fade gradient */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden
            style={{
              background:
                "linear-gradient(to right, rgba(27,48,34,0.96) 0%, rgba(27,48,34,0.86) 30%, rgba(27,48,34,0.55) 55%, rgba(27,48,34,0.1) 78%, transparent 100%)",
            }}
          />
          {/* Top fade so nav reads */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#1b3022]/55 to-transparent" aria-hidden />

          {/* Gold corner brackets — subtle */}
          <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
            <div className="absolute left-3 top-3 h-12 w-12 rounded-tl-lg border-l border-t border-[#C5A059]/45 sm:left-6 sm:top-6 sm:h-16 sm:w-16 md:h-20 md:w-20" />
            <div className="absolute right-3 top-3 h-12 w-12 rounded-tr-lg border-r border-t border-[#C5A059]/45 sm:right-6 sm:top-6 sm:h-16 sm:w-16 md:h-20 md:w-20" />
            <div className="absolute bottom-3 left-3 h-12 w-12 rounded-bl-lg border-b border-l border-[#C5A059]/35 sm:bottom-6 sm:left-6 sm:h-16 sm:w-16 md:h-20 md:w-20" />
            <div className="absolute bottom-3 right-3 h-12 w-12 rounded-br-lg border-b border-r border-[#C5A059]/35 sm:bottom-6 sm:right-6 sm:h-16 sm:w-16 md:h-20 md:w-20" />
          </div>

          {/* Content — large top padding below md: clears fixed ribbon + header + category pills (~260–300px) */}
          <div className="section-container relative z-[2] flex min-h-[min(100svh,52rem)] flex-col justify-start pb-16 pt-[calc(17.5rem+env(safe-area-inset-top,0px))] sm:pb-20 sm:pt-[calc(18rem+env(safe-area-inset-top,0px))] md:min-h-[min(82vh,48rem)] md:justify-center md:pb-24 md:pt-[9.5rem] xl:min-h-[min(88vh,52rem)] xl:pb-28 xl:pt-[6.5rem] 2xl:pt-[7rem]">
            <div className="w-full max-w-[28rem] sm:max-w-[32rem] lg:max-w-[34rem]">
              {/* Eyebrow with ornament */}
              <div className="mb-5 flex items-center gap-2.5">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="#C5A059" aria-hidden>
                  <polygon points="7,0 8.5,5.5 14,7 8.5,8.5 7,14 5.5,8.5 0,7 5.5,5.5" />
                </svg>
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.28em] text-[#C5A059] sm:text-[11px] sm:tracking-[0.32em]">
                  Thoughtful · Premium · Memorable
                </p>
              </div>

              <h1
                id="hero-heading"
                className="font-serif text-[clamp(2.25rem,7vw,4rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white"
              >
                Premium Gifting
                <br />
                <span className="text-[#C5A059]">Experiences</span>
              </h1>

              <p className="font-accent mt-4 text-[clamp(1.05rem,3vw,1.5rem)] italic font-medium leading-snug text-white/95">
                for Clients, Teams &amp; Celebrations
              </p>

              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/80 sm:text-base">
                Curated corporate hampers and festive gifts crafted to leave lasting impressions.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
                <Link to="/shop" className="btn-pill btn-pill-maroon">
                  Explore collection
                  <ArrowRight className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} aria-hidden />
                </Link>
                <a
                  href={`https://wa.me/${WA}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill btn-pill-ghost-light"
                >
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Bulk enquiry
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ───── TRUST / USP STRIP ─────────────────────────────────────── */}
        <section className="relative bg-white border-y border-[#F0F0F0] py-8 md:py-10 lg:py-12" aria-label="Why choose Giftz Gallerei">
          {/* Mobile — premium flat grid (no card borders/shadows, direct on cream background) */}
          <div className="section-container md:hidden">
            <ul className="grid grid-cols-2 gap-y-8 sm:grid-cols-3">
              {TRUST_FEATURES.map((item, index) => {
                const Icon = item.Icon;
                const isEven = index % 2 === 0;
                const isNotThird = index % 3 !== 2;
                return (
                  <li
                    key={item.title}
                    className={`flex flex-col items-center text-center px-2 border-[#E8E2DC]/80 ${
                      isEven ? 'border-r' : 'border-r-0'
                    } ${isNotThird ? 'sm:border-r' : 'sm:border-r-0'}`}
                  >
                    <div className="mb-2.5 flex h-10 w-10 items-center justify-center rounded-full border border-[#C5A059]/30 text-[#B8924F] bg-white/80 shadow-sm">
                      <Icon className="h-4.5 w-4.5" strokeWidth={1.65} aria-hidden />
                    </div>
                    <h3 className="font-sans text-[11.5px] font-bold uppercase tracking-[0.12em] text-[#1A1010] leading-tight">
                      <span className="block">{item.mobileLines[0]}</span>
                      <span className="block text-[#5c5652]">{item.mobileLines[1]}</span>
                    </h3>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Tablet+ — six column grid with gold rings */}
          <div className="section-container hidden md:block">
            <div className="grid grid-cols-3 gap-y-10 lg:flex lg:justify-between lg:divide-x lg:divide-[#E8E2DC]/80">
              {TRUST_FEATURES.map((item, index) => {
                const Icon = item.Icon;
                const isNotThird = index % 3 !== 2;
                return (
                  <div 
                    key={item.title} 
                    className={`flex flex-col items-center px-4 text-center lg:flex-1 lg:px-6 ${
                      isNotThird ? 'md:border-r md:border-[#E8E2DC]/80 lg:border-r-0' : 'lg:border-r-0'
                    }`}
                  >
                    <div className="mb-3.5 flex h-12 w-12 items-center justify-center rounded-full border border-[#C5A059]/35 text-[#B8924F] bg-white/80 shadow-sm transition-transform duration-300 hover:scale-110">
                      <Icon className="h-5 w-5" strokeWidth={1.65} aria-hidden />
                    </div>
                    <h3 className="font-sans text-[12.5px] font-bold uppercase tracking-[0.14em] text-[#1A1010]">{item.title}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ───── SHOP BY CATEGORY ───────────────────────────────────────── */}
        <section className="bg-white pb-12 pt-8 sm:pb-14 sm:pt-10 md:pb-20 md:pt-20 lg:pb-24 lg:pt-24" aria-labelledby="shop-by-category-heading">
          <div className="section-container">
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow">— Shop by category —</p>
              <h2 id="shop-by-category-heading" className="section-heading mt-3">
                Thoughtful Gifts for <span className="text-[#6B1E30]">Every Occasion</span>
              </h2>
              <div className="mx-auto mt-5 flex max-w-xs items-center justify-center gap-3">
                <span className="rule-line min-w-[2rem] flex-1" aria-hidden />
                <Gift className="h-5 w-5 shrink-0 text-[#C5A059]" strokeWidth={1.75} aria-hidden />
                <span className="rule-line min-w-[2rem] flex-1" aria-hidden />
              </div>
            </div>

            <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-3 lg:gap-6">
              {SHOP_BY_CATEGORY.map((cat) => {
                const Icon = cat.Icon;
                return (
                  <Link
                    key={cat.title}
                    to={cat.href}
                    className={`group relative flex flex-row items-stretch overflow-hidden rounded-2xl border border-black/[0.06] shadow-[0_8px_28px_-12px_rgba(74,16,32,0.12)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_-12px_rgba(74,16,32,0.2)] ${cat.bgClass}`}
                  >
                    <div className="relative z-[1] flex min-w-0 flex-1 flex-col justify-center px-5 py-5 sm:py-6 sm:pl-6">
                      <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-full shadow-sm ${cat.iconWrapClass}`}>
                        <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" strokeWidth={2} aria-hidden />
                      </div>
                      <h3 className="card-title">{cat.title}</h3>
                      <p className="mt-2 max-w-[16rem] text-[14px] leading-relaxed text-[#5c5652] sm:text-[14.5px]">
                        {cat.description}
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#1A1010] sm:text-[13px]">
                          Explore now
                        </span>
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-md transition-transform duration-200 group-hover:translate-x-0.5 sm:h-9 sm:w-9 ${cat.ctaButtonClass}`}
                          aria-hidden
                        >
                          <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.5} />
                        </span>
                      </div>
                    </div>
                    <div className="relative z-0 -mr-px w-[40%] min-w-[7rem] shrink-0 self-stretch sm:w-[42%] sm:min-w-[8rem]">
                      <div className="absolute inset-y-3 right-3 left-0 overflow-hidden rounded-xl border border-white/60 shadow-md ring-1 ring-black/[0.04]">
                        <AppImage
                          src={cat.image}
                          alt={cat.imageAlt}
                          fill
                          sizes="(max-width:640px) 45vw, (max-width:1024px) 30vw, 280px"
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-12 flex justify-center md:mt-14">
              <a
                href={`https://wa.me/${WA}?text=${encodeURIComponent("Hi, I'd like to request your catalogue.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill btn-pill-maroon"
              >
                Request Catalogue
              </a>
            </div>
          </div>
        </section>

        {/* ───── FEATURED PRODUCTS ─────────────────────────────────────── */}
        <FeaturedProductsSection />

        {/* ───── HOW IT WORKS ──────────────────────────────────────────── */}
        <HowItWorksSection />

        {/* ───── FESTIVE COLLECTION ────────────────────────────────────── */}
        <FestiveCollectionSection />

        {/* ───── INSTAGRAM GALLERY ─────────────────────────────────────── */}
        <section className="section-pad bg-white" aria-labelledby="instagram-heading">
          <div className="section-container">
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow">Follow us @giftzgallerei</p>
              <h2 id="instagram-heading" className="section-heading mt-3">
                Stories from the <span className="text-[#6B1E30]">gram</span>
              </h2>
              <p className="section-lede mx-auto mt-4">
                Behind-the-scenes packaging, gifting moments, and the little details our clients love.
              </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 md:gap-4">
              {INSTAGRAM_TILES.map((src, idx) => (
                <a
                  key={src + idx}
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square overflow-hidden rounded-xl border border-black/[0.06]"
                  aria-label={`Instagram post ${idx + 1}`}
                >
                  <AppImage
                    src={src}
                    alt=""
                    fill
                    sizes="(max-width:768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[#1A1010]/0 transition-colors duration-300 group-hover:bg-[#1A1010]/45" />
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <InstagramIcon className="h-7 w-7 text-white drop-shadow" strokeWidth={1.75} />
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-10 flex justify-center md:mt-12">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill btn-pill-ghost-gold"
              >
                <InstagramIcon className="h-4 w-4 shrink-0" strokeWidth={2} />
                Follow on Instagram
              </a>
            </div>
          </div>
        </section>

        {/* ───── CLIENTS & TESTIMONIALS ────────────────────────────────── */}
        <ClientsAndTestimonialsSection />

        {/* ───── FAQ ───────────────────────────────────────────────────── */}
        <section className="section-pad bg-white" aria-labelledby="faq-heading">
          <div className="section-container">
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow">Frequently asked</p>
              <h2 id="faq-heading" className="section-heading mt-3">
                Got questions? <span className="text-[#6B1E30]">We&apos;ve got answers.</span>
              </h2>
              <p className="section-lede mx-auto mt-4">
                If you don&apos;t find what you need below, our concierge is one message away.
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-3xl space-y-3 md:mt-12">
              {FAQS.map((item, idx) => (
                <details
                  key={item.q}
                  className="group rounded-2xl border border-[#ebe5dd] bg-white px-5 py-4 shadow-[0_2px_10px_-6px_rgba(0,0,0,0.06)] transition open:shadow-[0_10px_32px_-12px_rgba(74,16,32,0.15)] sm:px-6 sm:py-5"
                  open={idx === 0}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                    <h3 className="font-sans text-[15.5px] font-semibold text-[#1A1010] sm:text-[16.5px]">{item.q}</h3>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#e8e0d5] text-[#6B1E30] transition-transform duration-300 group-open:rotate-45">
                      <Plus className="h-4 w-4" strokeWidth={2} aria-hidden />
                    </span>
                  </summary>
                  <p className="mt-3 max-w-[58ch] text-[14.5px] leading-relaxed text-[#5c5652] sm:text-[15.5px]">{item.a}</p>
                </details>
              ))}
            </div>

            <div className="mt-10 flex justify-center md:mt-12">
              <a
                href={`https://wa.me/${WA}?text=${encodeURIComponent("Hi, I have a question about gifting.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill btn-pill-forest"
              >
                Talk to our concierge
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

