import type { LucideIcon } from "lucide-react";
import {
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Gift,
  MapPin,
  MonitorCheck,
  Package,
  Pencil,
  ShoppingBag,
  ShoppingBasket,
  Truck,
} from "lucide-react";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";

const FOREST = "#1B3022";
const GOLD = "#A67C37";

type Step = {
  num: string;
  title: string;
  description: string;
  titleAccent: "forest" | "gold";
  TopIcon: LucideIcon;
  BottomIcon: LucideIcon;
  bottomIconClass: string;
};

const STEPS: Step[] = [
  {
    num: "01",
    title: "Choose Product",
    description: "Explore our wide range of premium gifts and hampers for every occasion.",
    titleAccent: "forest",
    TopIcon: ShoppingBag,
    BottomIcon: ShoppingBasket,
    bottomIconClass: "text-[#1B3022]",
  },
  {
    num: "02",
    title: "Customize",
    description: "Add your logo, select items, and personalize your gift to reflect your brand.",
    titleAccent: "gold",
    TopIcon: Pencil,
    BottomIcon: Gift,
    bottomIconClass: "text-[#A67C37]",
  },
  {
    num: "03",
    title: "Confirm Design",
    description: "Review the final design and confirm to ensure everything is perfect.",
    titleAccent: "forest",
    TopIcon: ClipboardCheck,
    BottomIcon: MonitorCheck,
    bottomIconClass: "text-[#1B3022]",
  },
  {
    num: "04",
    title: "Delivery",
    description: "We pack with care and deliver on time, anywhere in India, with complete trust.",
    titleAccent: "gold",
    TopIcon: Truck,
    BottomIcon: Package,
    bottomIconClass: "text-[#A67C37]",
  },
];

const WA = "919876543210";

function StepCard({ step, className }: { step: Step; className?: string }) {
  const Top = step.TopIcon;
  const Bottom = step.BottomIcon;
  const titleClass =
    step.titleAccent === "forest" ? "text-[#1B3022]" : "text-[#A67C37]";

  return (
    <article
      className={cn(
        "relative flex flex-col items-center rounded-2xl border border-[#ebe8e4] bg-white px-5 pb-8 pt-12 shadow-[0_10px_36px_-20px_rgba(27,48,34,0.12)] sm:px-6 sm:pb-10 sm:pt-14",
        className
      )}
    >
      <div className="relative flex flex-col items-center">
        <div className="flex h-[5.25rem] w-[5.25rem] items-center justify-center rounded-full border-2 border-[#C5A059]/45 bg-white sm:h-[5.75rem] sm:w-[5.75rem]">
          <Top className="h-9 w-9 text-[#B8924F] sm:h-10 sm:w-10" strokeWidth={1.5} aria-hidden />
        </div>
        <div
          className="absolute -bottom-3 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full font-sans text-[12.5px] font-bold text-white shadow-sm sm:h-9 sm:w-9 sm:text-[13.5px]"
          style={{ backgroundColor: FOREST }}
          aria-hidden
        >
          {step.num}
        </div>
      </div>

      <h3 className={`mt-8 text-center font-serif text-xl font-bold leading-snug sm:text-2xl ${titleClass}`}>
        {step.title}
      </h3>
      <div className="mx-auto mt-4 h-px w-10 bg-[#d4cfc8]" aria-hidden />
      <p className="mt-4 text-center font-sans text-[14.5px] leading-relaxed text-[#3d4a42] sm:text-[15.5px]">
        {step.description}
      </p>

      <div className="mt-8 flex items-center justify-center gap-1">
        {step.num === "04" ? (
          <>
            <Bottom className={`h-8 w-8 sm:h-9 sm:w-9 ${step.bottomIconClass}`} strokeWidth={1.5} aria-hidden />
            <MapPin className={`h-7 w-7 sm:h-8 sm:w-8 ${step.bottomIconClass}`} strokeWidth={1.5} aria-hidden />
          </>
        ) : (
          <Bottom className={`h-9 w-9 sm:h-10 sm:w-10 ${step.bottomIconClass}`} strokeWidth={1.5} aria-hidden />
        )}
      </div>
    </article>
  );
}

function DesktopConnector() {
  return (
    <div className="relative hidden w-8 shrink-0 self-center lg:block xl:w-11" aria-hidden>
      <div className="relative py-5">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-[1px] border-t border-dotted border-[#c0b8ae]" />
        <div className="relative mx-auto flex h-9 w-9 items-center justify-center rounded-full border border-[#e5e0d8] bg-[#FFFBF8] shadow-sm">
          <ChevronRight className="h-4 w-4 text-[#7a756d]" strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}

export default function HowItWorksSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const updateActiveFromScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>("[data-how-card]");
    if (!first) return;
    const gap = 12;
    const step = first.offsetWidth + gap;
    if (step <= 0) return;
    const i = Math.min(STEPS.length - 1, Math.max(0, Math.round(el.scrollLeft / step)));
    setActive(i);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateActiveFromScroll();
    el.addEventListener("scroll", updateActiveFromScroll, { passive: true });
    return () => el.removeEventListener("scroll", updateActiveFromScroll);
  }, [updateActiveFromScroll]);

  const scrollByDir = (dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>("[data-how-card]");
    const gap = 12;
    const step = (first?.offsetWidth ?? 300) + gap;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const goTo = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>("[data-how-card]");
    const gap = 12;
    const step = (first?.offsetWidth ?? 300) + gap;
    el.scrollTo({ left: index * step, behavior: "smooth" });
  };

  return (
    <section className="section-pad bg-[#FFFBF8]" aria-labelledby="how-it-works-heading">
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">How it works</p>
          <h2 id="how-it-works-heading" className="section-heading mt-3">
            <span className="text-[#1B3022]">Simple Steps,</span>{" "}
            <span style={{ color: GOLD }}>Exceptional Gifting</span>
          </h2>
          <div className="mx-auto mt-5 flex max-w-xs items-center justify-center gap-3">
            <span className="rule-line min-w-[2rem] flex-1" aria-hidden />
            <Gift className="h-5 w-5 shrink-0 text-[#C5A059]" strokeWidth={1.75} aria-hidden />
            <span className="rule-line min-w-[2rem] flex-1" aria-hidden />
          </div>
          <p className="section-lede mx-auto mt-4">
            From choosing the perfect gift to doorstep delivery, we make corporate and festive gifting effortless.
          </p>
        </div>

        {/* Mobile — horizontal snap slider */}
        <div className="mt-10 lg:hidden">
          <div
            ref={scrollRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-pb-2 pb-2"
          >
            {STEPS.map((step) => (
              <div
                key={`slide-${step.num}`}
                data-how-card
                className="w-[min(88vw,19.5rem)] shrink-0 snap-start sm:w-[min(82vw,20rem)]"
              >
                <StepCard step={step} className="h-full w-full" />
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-center gap-5">
            <button
              type="button"
              onClick={() => scrollByDir(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e2de] bg-white text-[#4a4846] shadow-sm transition active:scale-95"
              aria-label="Previous step"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => scrollByDir(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e2de] bg-white text-[#4a4846] shadow-sm transition active:scale-95"
              aria-label="Next step"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            {STEPS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={
                  i === active
                    ? "h-2 w-8 rounded-full bg-[#A67C37] transition-all"
                    : "h-2 w-2 rounded-full bg-[#d4cfc8] transition-all hover:bg-[#b8b3ac]"
                }
                aria-label={`Go to step ${i + 1}`}
                aria-current={i === active ? "true" : undefined}
              />
            ))}
          </div>
        </div>

        {/* Desktop — row + dotted connectors */}
        <div className="mx-auto mt-12 hidden max-w-6xl items-center justify-center gap-1 lg:mt-14 lg:flex">
          {STEPS.map((step, i) => (
            <Fragment key={step.num}>
              <StepCard step={step} className="min-w-0 flex-1" />
              {i < STEPS.length - 1 && <DesktopConnector />}
            </Fragment>
          ))}
        </div>

        <div className="mt-12 flex justify-center md:mt-14">
          <a
            href={`https://wa.me/${WA}?text=${encodeURIComponent("Hi, I'd like to request your catalogue.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill btn-pill-forest"
          >
            Request Catalogue
          </a>
        </div>
      </div>
    </section>
  );
}
