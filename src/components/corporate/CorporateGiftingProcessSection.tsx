import { CheckCircle2, ClipboardList, Eye, MessageSquare, Package, Truck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const STEPS: { step: number; title: string; description: string; Icon: LucideIcon }[] = [
  {
    step: 1,
    title: 'Share Your Requirement',
    description: 'Tell us about your occasion, quantity, budget, and branding needs.',
    Icon: MessageSquare,
  },
  {
    step: 2,
    title: 'Receive Curated Gift Options',
    description: 'Our experts handpick options tailored to your brand and audience.',
    Icon: ClipboardList,
  },
  {
    step: 3,
    title: 'Approve Design & Branding',
    description: 'Review mockups, packaging, and logo placement before production.',
    Icon: Eye,
  },
  {
    step: 4,
    title: 'Production & Packaging',
    description: 'We craft, brand, and elegantly package every gift with care.',
    Icon: Package,
  },
  {
    step: 5,
    title: 'Delivery Across India',
    description: 'On-time pan-India logistics with tracking and dedicated support.',
    Icon: Truck,
  },
];

const WHY_CHOOSE_US = [
  { title: 'Minimum Order Quantities', description: 'Flexible MOQs starting from 25 units for most categories.' },
  { title: 'Custom Quotations', description: 'Transparent pricing tailored to your budget and volume.' },
  { title: 'Fast Turnaround Time', description: 'Standard orders delivered within 7–14 business days.' },
  { title: 'Dedicated Support Team', description: 'A single point of contact from enquiry to delivery.' },
];

export default function CorporateGiftingProcessSection() {
  return (
    <section
      id="gifting-process"
      className="section-pad scroll-mt-28 bg-white"
      aria-labelledby="gifting-process-heading"
    >
      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">How it works</p>
          <h2 id="gifting-process-heading" className="section-heading-corporate mt-3">
            Corporate Gifting <span className="text-[#6B1E30]">Process</span>
          </h2>
        </div>

        <ol className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:mt-12 lg:gap-3">
          {STEPS.map(({ step, title, description, Icon }) => (
            <li
              key={step}
              className="relative flex flex-col rounded-2xl border border-[#EBEBEB]/80 bg-white p-5 shadow-sm"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#6B1E30] font-sans text-[12px] font-bold text-white">
                  {step}
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#C9A96E]/25 bg-surface-muted text-[#9D7D47]">
                  <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                </div>
              </div>
              <h3 className="font-serif text-[15px] font-semibold leading-snug text-[#1A1010]">{title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#6b6560]">{description}</p>
            </li>
          ))}
        </ol>

        <div className="mx-auto mt-14 max-w-6xl">
          <div className="flex items-center justify-center gap-4">
            <span className="rule-line min-w-[2rem] max-w-[6rem] flex-1" aria-hidden />
            <h3 className="shrink-0 font-serif text-[20px] font-semibold text-[#1A1010] sm:text-[22px]">
              Why Choose Us
            </h3>
            <span className="rule-line min-w-[2rem] max-w-[6rem] flex-1" aria-hidden />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CHOOSE_US.map((item) => (
              <div
                key={item.title}
                className="flex gap-3 rounded-2xl border border-[#EBEBEB]/60 bg-white px-5 py-4 shadow-sm"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#9D7D47]" strokeWidth={1.75} aria-hidden />
                <div>
                  <p className="font-serif text-[15px] font-semibold text-[#1A1010]">{item.title}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-[#6b6560]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
