import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Award,
  Flame,
  Gift,
  HeartHandshake,
  Leaf,
  Moon,
  PartyPopper,
  TreePine,
  Truck,
} from "lucide-react";

type Festival = {
  name: string;
  description: string;
  href: string;
  Icon: LucideIcon;
  gradient: string;
  iconClass: string;
};

const FESTIVALS: Festival[] = [
  {
    name: "Diwali",
    description: "Brighten relationships with thoughtful gifts that sparkle with joy.",
    href: "/shop?occasion=diwali",
    Icon: Flame,
    gradient: "from-[#3a1f4d] via-[#4a1a38] to-[#5c1528]",
    iconClass: "text-[#E8C87A]",
  },
  {
    name: "New Year",
    description: "Welcome new beginnings with gifts that inspire and motivate.",
    href: "/shop?occasion=new-year",
    Icon: PartyPopper,
    gradient: "from-[#14261f] via-[#1b3022] to-[#0f241c]",
    iconClass: "text-[#D4B87A]",
  },
  {
    name: "Christmas",
    description: "Share the warmth of the season with premium gifts.",
    href: "/shop?occasion=christmas",
    Icon: TreePine,
    gradient: "from-[#6b1a22] via-[#5c1218] to-[#4a0e14]",
    iconClass: "text-[#E8C87A]",
  },
  {
    name: "Ramadan",
    description: "Honor traditions and strengthen bonds with meaningful gifts.",
    href: "/shop?occasion=ramadan",
    Icon: Moon,
    gradient: "from-[#0f3a30] via-[#123d32] to-[#0a2e26]",
    iconClass: "text-[#D4B87A]",
  },
];

const BAR_FEATURES: { title: string; subtitle: string; Icon: LucideIcon }[] = [
  {
    title: "Premium quality",
    subtitle: "Carefully selected products & packaging",
    Icon: Award,
  },
  {
    title: "Customizable gifts",
    subtitle: "Tailored to reflect your brand",
    Icon: Gift,
  },
  {
    title: "Timely delivery",
    subtitle: "On-time, every time, across India",
    Icon: Truck,
  },
  {
    title: "Made with care",
    subtitle: "Thoughtful gifts for every celebration",
    Icon: HeartHandshake,
  },
];

export default function FestiveCollectionSection() {
  return (
    <section className="section-pad bg-white" aria-labelledby="festive-collection-heading">
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 flex items-center justify-center gap-2 text-[#A67C37]">
            <Leaf className="h-4 w-4 shrink-0 opacity-80" strokeWidth={1.75} aria-hidden />
            <p className="eyebrow">Festive collection</p>
            <Leaf className="h-4 w-4 shrink-0 scale-x-[-1] opacity-80" strokeWidth={1.75} aria-hidden />
          </div>
          <h2 id="festive-collection-heading" className="section-heading mt-3">
            <span className="text-[#1B3022]">Celebrate </span>
            <span className="text-[#6B1E30]">Every Moment</span>
          </h2>
          <div className="mx-auto mt-5 flex max-w-xs items-center justify-center gap-3">
            <span className="rule-line min-w-[2rem] flex-1" aria-hidden />
            <Gift className="h-5 w-5 shrink-0 text-[#C5A059]" strokeWidth={1.75} aria-hidden />
            <span className="rule-line min-w-[2rem] flex-1" aria-hidden />
          </div>
          <p className="section-lede mx-auto mt-4">
            Thoughtfully curated gifts and hampers for every festival and celebration. Spread joy, build connections, and
            make every occasion memorable.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-4 lg:gap-5">
          {FESTIVALS.map((f) => {
            const Icon = f.Icon;
            return (
              <article
                key={f.name}
                className={`group relative flex min-h-[18rem] flex-col items-center overflow-hidden rounded-2xl border border-black/[0.06] bg-gradient-to-b px-5 pb-8 pt-10 text-center shadow-[0_16px_48px_-24px_rgba(74,16,32,0.35)] transition-transform duration-300 hover:-translate-y-1 sm:min-h-[20rem] md:px-6 md:pt-12 lg:min-h-[22rem] ${f.gradient}`}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.12]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 20% 20%, #fff 0, transparent 45%), radial-gradient(circle at 80% 60%, #fff 0, transparent 40%)",
                  }}
                  aria-hidden
                />
                <div className="relative z-[1] flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/5 backdrop-blur-[1px]">
                  <Icon className={`h-7 w-7 ${f.iconClass}`} strokeWidth={1.5} aria-hidden />
                </div>
                <h3 className="relative z-[1] mt-5 font-serif text-2xl font-semibold tracking-tight text-white md:text-[1.625rem]">
                  {f.name}
                </h3>
                <p className="relative z-[1] mt-3 max-w-[18rem] text-[13.5px] leading-relaxed text-white/85 sm:text-sm">
                  {f.description}
                </p>
                <Link
                  to={f.href}
                  className="relative z-[1] mt-6 inline-flex items-center gap-2 rounded-full border border-white/45 bg-white/5 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-[2px] transition hover:border-white/70 hover:bg-white/15 sm:text-[11px] sm:tracking-[0.18em]"
                >
                  Explore gifts
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
                </Link>
              </article>
            );
          })}
        </div>

        <div className="mx-auto mt-12 max-w-6xl rounded-2xl border border-[#e8e0d8] bg-[#F4EFE8] px-5 py-7 sm:px-8 md:mt-14 md:py-9">
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-6">
            {BAR_FEATURES.map((item) => {
              const Icon = item.Icon;
              return (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#c4a574]/35 bg-white/60 text-[#6B4E2E]">
                    <Icon className="h-5 w-5" strokeWidth={1.65} aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] font-bold text-[#3d2e22] sm:text-[15px]">{item.title}</p>
                    <p className="mt-1 text-[12px] leading-snug text-[#6b5d52] sm:text-[13px]">{item.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
