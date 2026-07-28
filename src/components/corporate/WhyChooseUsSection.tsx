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
    tone: 'maroon' as const,
    card: false,
  },
  {
    step: '02',
    title: 'Quality Assured',
    description:
      'Every product undergoes strict quality checks before dispatch to ensure it creates the right impression.',
    Icon: BadgeCheck,
    tone: 'gold' as const,
    card: true,
  },
  {
    step: '03',
    title: 'Complete Customisation',
    description:
      'From logo printing and engraving to packaging — complete branding solutions under one roof.',
    Icon: Gift,
    tone: 'maroon' as const,
    card: false,
  },
  {
    step: '04',
    title: 'Pan India Delivery',
    description:
      'Timely and secure delivery across India with dedicated order tracking and support.',
    Icon: Truck,
    tone: 'gold' as const,
    card: true,
  },
  {
    step: '05',
    title: 'Dedicated Account Manager',
    description:
      'One point of contact from enquiry to delivery for a smooth and hassle-free experience.',
    Icon: UserRound,
    tone: 'maroon' as const,
    card: false,
  },
  {
    step: '06',
    title: '5000+ Corporate Gifting Products',
    description:
      'Wide range of eco-friendly, tech, lifestyle and customised gifts for every business need.',
    Icon: ShoppingBag,
    tone: 'gold' as const,
    card: true,
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
 * Why Choose Us — placed before Corporate Gifting Process on /corporate.
 * Structure follows the brief reference; styling matches site cream/maroon/gold system.
 */
export default function WhyChooseUsSection() {
  return (
    <section
      id="why-choose-us"
      className="relative scroll-mt-28 overflow-hidden bg-[var(--cream)] py-12 sm:py-14 lg:py-16"
      aria-labelledby="why-choose-us-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent"
        aria-hidden
      />

      <div className="section-container relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[#C9A96E]">
            Why Choose Us
          </p>
          <h2
            id="why-choose-us-heading"
            className="mt-2 font-serif text-[clamp(1.65rem,3.5vw,2.35rem)] font-medium leading-tight text-[#4A1020]"
          >
            Why Choose Giftz Gallerei?
          </h2>
          <p className="mt-3 font-sans text-[14px] leading-relaxed text-[#6E6360] sm:text-[15px]">
            We make corporate gifting easy, memorable and impactful.
          </p>
        </div>

        <ul className="mt-10 grid list-none grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {WHY_POINTS.map(({ step, title, description, Icon, tone, card }) => (
            <li
              key={step}
              className={
                card
                  ? 'rounded-2xl border border-[#EBE3D8] bg-white p-5 shadow-[0_12px_32px_-18px_rgba(74,16,32,0.18)] sm:p-6'
                  : 'rounded-2xl border border-transparent p-5 sm:p-6'
              }
            >
              <div
                className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full text-white shadow-sm ${
                  tone === 'gold' ? 'bg-[#C9A96E]' : 'bg-[#4A1020]'
                }`}
              >
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </div>
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#9D7D47]">
                {step} · {title}
              </p>
              <p className="mt-2 font-sans text-[13.5px] leading-relaxed text-[#6E6360] sm:text-[14px]">
                {description}
              </p>
              <span className="mt-4 block h-px w-10 bg-gradient-to-r from-[#C9A96E] to-transparent" aria-hidden />
            </li>
          ))}
        </ul>

        {/* Quote CTA bar */}
        <div className="mt-10 overflow-hidden rounded-2xl bg-[#4A1020] sm:mt-12">
          <div className="flex flex-col gap-6 px-5 py-6 sm:px-7 sm:py-7 lg:flex-row lg:items-center lg:gap-8 lg:px-8">
            <div className="flex min-w-0 flex-1 items-start gap-3.5 lg:max-w-[280px]">
              <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#C9A96E]/45 text-[#C9A96E]">
                <ClipboardEdit className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="font-serif text-[17px] font-medium leading-snug text-white sm:text-[18px]">
                  Looking for the best quote?
                </p>
                <p className="mt-1 font-sans text-[12px] leading-relaxed text-white/75 sm:text-[13px]">
                  Share your requirements with us and our experts will get back with the best
                  solution and pricing.
                </p>
              </div>
            </div>

            <div className="flex flex-1 flex-wrap items-start justify-start gap-x-5 gap-y-4 sm:justify-center lg:gap-x-6">
              {QUOTE_PERKS.map(({ label, Icon }) => (
                <div key={label} className="flex w-[6.5rem] flex-col items-center gap-1.5 text-center sm:w-[7.25rem]">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#C9A96E]/40 text-[#C9A96E]">
                    <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="font-sans text-[9.5px] font-semibold leading-snug tracking-wide text-white/90 sm:text-[10px]">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex shrink-0 justify-stretch lg:justify-end">
              <Link
                to="/corporate#bulk-order-enquiry"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-white px-5 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[#4A1020] transition hover:bg-[#F7F2EA] sm:w-auto"
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
