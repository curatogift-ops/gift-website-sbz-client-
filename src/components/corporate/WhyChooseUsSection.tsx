import { Link } from 'react-router-dom';
import {
  BadgeCheck,
  ClipboardEdit,
  Gift,
  Headset,
  Lightbulb,
  Package,
  PencilRuler,
  ShoppingBag,
  Tag,
  Truck,
  UserRound,
} from 'lucide-react';

const WHY_POINTS = [
  {
    step: '01',
    title: 'Competitive Market Pricing',
    description:
      'We source directly from trusted manufacturers and leading brands to offer you the best value.',
    Icon: Tag,
  },
  {
    step: '02',
    title: 'Quality Assured',
    description:
      'Every product undergoes strict quality checks before dispatch to ensure it creates the right impression.',
    Icon: BadgeCheck,
  },
  {
    step: '03',
    title: 'Complete Customisation',
    description:
      'From logo printing and engraving to packaging — complete branding solutions under one roof.',
    Icon: Gift,
  },
  {
    step: '04',
    title: 'Pan India Delivery',
    description:
      'Timely and secure delivery across India with dedicated order tracking and support.',
    Icon: Truck,
  },
  {
    step: '05',
    title: 'Dedicated Account Manager',
    description:
      'One point of contact from enquiry to delivery for a smooth and hassle-free experience.',
    Icon: UserRound,
  },
  {
    step: '06',
    title: '5000+ Corporate Gifting Products',
    description:
      'Wide range of eco-friendly, tech, lifestyle and customised gifts for every business need.',
    Icon: ShoppingBag,
  },
] as const;

const QUOTE_PERKS = [
  { label: 'Competitive Pricing', Icon: Tag },
  { label: 'Expert Product Recommendations', Icon: Lightbulb },
  { label: 'Free Branding Support', Icon: PencilRuler },
  { label: 'Fast Quotation', Icon: Package },
  { label: 'End-to-End Support', Icon: Headset },
] as const;

/**
 * Why Choose Giftz Gallerei — premium redesigned layout (cream / maroon / gold).
 */
export default function WhyChooseUsSection() {
  return (
    <section
      id="why-choose-us"
      className="relative scroll-mt-28 overflow-hidden bg-white py-14 sm:py-16 lg:py-20"
      aria-labelledby="why-choose-us-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            'radial-gradient(circle at 12% 18%, rgba(201,169,110,0.14) 0, transparent 42%), radial-gradient(circle at 88% 8%, rgba(74,16,32,0.06) 0, transparent 40%)',
        }}
        aria-hidden
      />

      <div className="section-container relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#C9A96E]" aria-hidden />
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-[#9D7D47]">
              Why Choose Us
            </p>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#C9A96E]" aria-hidden />
          </div>
          <h2
            id="why-choose-us-heading"
            className="font-serif text-[clamp(1.85rem,4vw,2.75rem)] font-semibold leading-[1.15] tracking-tight text-[#4A1020]"
          >
            Why Choose Giftz Gallerei?
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-sans text-[15px] leading-relaxed text-[#6E6360] sm:text-[16px]">
            We make corporate gifting easy, memorable and impactful — with premium quality and
            reliable delivery at every step.
          </p>
        </div>

        <ul className="mt-12 grid list-none grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {WHY_POINTS.map(({ step, title, description, Icon }, index) => {
            const gold = index % 2 === 1;
            return (
              <li
                key={step}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#EBE3D8] bg-[var(--cream)] p-6 shadow-[0_10px_28px_-20px_rgba(74,16,32,0.2)] transition duration-300 hover:-translate-y-1 hover:border-[#C9A96E]/45 hover:bg-white hover:shadow-[0_22px_40px_-22px_rgba(74,16,32,0.28)] sm:p-7"
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-sm transition duration-300 group-hover:scale-105 ${
                      gold ? 'bg-[#C9A96E]' : 'bg-[#4A1020]'
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="font-serif text-[28px] font-semibold leading-none text-[#4A1020]/10 transition group-hover:text-[#C9A96E]/35">
                    {step}
                  </span>
                </div>
                <h3 className="font-serif text-[18px] font-semibold leading-snug text-[#1A1010] sm:text-[19px]">
                  {title}
                </h3>
                <p className="mt-2.5 flex-1 font-sans text-[13.5px] leading-relaxed text-[#6E6360] sm:text-[14px]">
                  {description}
                </p>
                <span
                  className="mt-5 block h-0.5 w-12 rounded-full bg-gradient-to-r from-[#C9A96E] to-transparent"
                  aria-hidden
                />
              </li>
            );
          })}
        </ul>

        <div className="relative mt-12 overflow-hidden rounded-2xl bg-[#4A1020] sm:mt-14">
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 0%, rgba(201,169,110,0.35) 0, transparent 45%)',
            }}
            aria-hidden
          />
          <div className="relative flex flex-col gap-7 px-5 py-7 sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:gap-10">
            <div className="flex min-w-0 flex-1 items-start gap-4 lg:max-w-sm">
              <span className="mt-0.5 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#C9A96E]/45 bg-white/5 text-[#C9A96E]">
                <ClipboardEdit className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="font-serif text-[20px] font-semibold leading-snug text-white sm:text-[22px]">
                  Looking for the best quote?
                </p>
                <p className="mt-2 font-sans text-[13px] leading-relaxed text-white/75 sm:text-[14px]">
                  Share your requirements and our experts will reply with curated options and
                  pricing.
                </p>
              </div>
            </div>

            <div className="flex flex-1 flex-wrap items-start justify-start gap-x-5 gap-y-4 sm:justify-center lg:gap-x-6">
              {QUOTE_PERKS.map(({ label, Icon }) => (
                <div
                  key={label}
                  className="flex w-[6.75rem] flex-col items-center gap-2 text-center sm:w-[7.5rem]"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#C9A96E]/40 bg-white/5 text-[#C9A96E]">
                    <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="font-sans text-[10px] font-semibold leading-snug tracking-wide text-white/90 sm:text-[11px]">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex shrink-0 justify-stretch lg:justify-end">
              <Link
                to="/corporate#bulk-order-enquiry"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-white px-6 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#4A1020] transition hover:bg-[#F7F2EA] sm:w-auto"
              >
                Get My Best Quote →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
