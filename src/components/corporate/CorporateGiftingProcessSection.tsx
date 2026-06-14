import { Link } from 'react-router-dom';
import { ArrowRight, ClipboardList, Headset, MessageSquare, Sparkles, Truck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

type ProcessStep = {
  step: string;
  title: string;
  description: string;
  Icon: LucideIcon;
};

const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Brief',
    description: 'Share occasion, budget and quantity',
    Icon: MessageSquare,
  },
  {
    step: '02',
    title: 'Curate',
    description: 'Receive tailored gift recommendations',
    Icon: Sparkles,
  },
  {
    step: '03',
    title: 'Approve',
    description: 'Review branding and packaging proofs',
    Icon: ClipboardList,
  },
  {
    step: '04',
    title: 'Deliver',
    description: 'Pan-India fulfilment and tracking',
    Icon: Truck,
  },
];

const TRUST_INDICATORS = [
  { value: '25+', label: 'MOQ' },
  { value: '7–14', label: 'Business Days' },
  { value: '1', label: 'Dedicated Account Manager', icon: Headset },
] as const;

function StepIcon({ Icon }: { Icon: LucideIcon }) {
  return (
    <span className="relative z-10 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#C9A96E]/35 bg-gradient-to-br from-[#FFFDF9] via-[#F8F0E4] to-[#EDD9B8] text-[#9D7D47] shadow-[0_10px_28px_-16px_rgba(157,125,71,0.5),inset_0_1px_0_rgba(255,255,255,0.95)] transition-all duration-300 group-hover:scale-105 group-hover:border-[#C9A96E]/55 group-hover:shadow-[0_14px_32px_-14px_rgba(157,125,71,0.55)]">
      <Icon className="h-5 w-5" strokeWidth={1.65} aria-hidden />
    </span>
  );
}

function DesktopTimeline() {
  return (
    <ol className="relative hidden lg:grid lg:max-h-[280px] lg:grid-cols-4 lg:gap-3">
      <div
        className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-6 h-px overflow-hidden bg-[#E8E0DA]"
        aria-hidden
      >
        <div className="process-timeline-beam h-full w-full origin-left bg-gradient-to-r from-[#C9A96E]/20 via-[#C9A96E] to-[#6B1E30]/80" />
      </div>

      {PROCESS_STEPS.map(({ step, title, description, Icon }, index) => (
        <li key={step} className="group relative flex flex-col items-center text-center">
          <div className="relative mb-4 flex flex-col items-center">
            <StepIcon Icon={Icon} />
            <span className="mt-2 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-[#9D7D47]">
              Step {step}
            </span>
          </div>

          <div
            className={cn(
              'flex w-full flex-1 flex-col rounded-2xl border border-[#E8E0DA]/90 bg-white/90 p-4 shadow-[0_12px_36px_-28px_rgba(26,16,16,0.35)] backdrop-blur-sm transition-all duration-300',
              'group-hover:-translate-y-0.5 group-hover:border-[#C9A96E]/45 group-hover:shadow-[0_20px_44px_-24px_rgba(74,16,32,0.28)]'
            )}
          >
            <h3 className="font-serif text-[1.35rem] font-semibold leading-tight text-primary xl:text-[1.5rem]">
              {title}
            </h3>
            <p className="mt-2 font-sans text-[13px] leading-snug text-muted-foreground xl:text-[14px]">
              {description}
            </p>
            <div className="mt-3 h-0.5 overflow-hidden rounded-full bg-[#F0EBE6]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#C9A96E] to-primary transition-all duration-500 group-hover:opacity-100"
                style={{ width: `${((index + 1) / PROCESS_STEPS.length) * 100}%`, opacity: 0.85 }}
              />
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

function MobileTimeline() {
  return (
    <ol className="relative mt-6 space-y-3 lg:hidden">
      <div
        className="absolute bottom-4 left-[1.375rem] top-4 w-px bg-gradient-to-b from-[#C9A96E]/30 via-[#C9A96E]/70 to-primary/60"
        aria-hidden
      />

      {PROCESS_STEPS.map(({ step, title, description, Icon }) => (
        <li key={step} className="group relative pl-11">
          <span
            className="absolute left-0 top-3 flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-white bg-gradient-to-br from-[#FFFDF9] to-[#F8F0E4] shadow-sm"
            aria-hidden
          >
            <Icon className="h-[18px] w-[18px] text-[#9D7D47]" strokeWidth={1.65} />
          </span>

          <div className="rounded-xl border border-[#E8E0DA] bg-white px-4 py-3.5 shadow-[0_8px_24px_-20px_rgba(26,16,16,0.35)] transition-colors group-active:border-[#C9A96E]/40">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-serif text-[1.125rem] font-semibold text-primary">{title}</h3>
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-[#9D7D47]">
                {step}
              </span>
            </div>
            <p className="mt-1 font-sans text-[13px] leading-snug text-muted-foreground">{description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function CorporateGiftingProcessSection() {
  return (
    <section
      id="gifting-process"
      className="relative scroll-mt-28 overflow-hidden bg-white py-10 sm:py-11 lg:max-h-none lg:py-12"
      aria-labelledby="gifting-process-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(201,169,110,0.08),transparent_40%),linear-gradient(180deg,rgba(242,237,232,0.45),transparent_55%)]"
        aria-hidden
      />

      <div className="section-container relative">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <div className="max-w-xl">
            <p className="eyebrow">How It Works</p>
            <h2
              id="gifting-process-heading"
              className="mt-2 font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.08] text-primary lg:mt-3"
            >
              Corporate Gifting Process
            </h2>
            <p className="mt-2 font-sans text-[14px] leading-relaxed text-muted-foreground sm:text-[15px]">
              From brief to doorstep in four simple steps
            </p>
          </div>

          <ul className="flex flex-wrap gap-2 sm:gap-3 lg:shrink-0 lg:justify-end">
            {TRUST_INDICATORS.map((item) => (
              <li
                key={item.label}
                className="inline-flex min-h-[3rem] items-center gap-2 rounded-xl border border-[#C9A96E]/25 bg-[var(--cream)]/80 px-3 py-2 backdrop-blur-sm sm:px-4"
              >
                {'icon' in item && item.icon && (
                  <item.icon className="hidden h-4 w-4 text-[#9D7D47] sm:block" strokeWidth={1.75} aria-hidden />
                )}
                <div>
                  <p className="font-serif text-lg font-semibold leading-none text-primary sm:text-xl">{item.value}</p>
                  <p className="mt-0.5 font-sans text-[9px] font-bold uppercase tracking-[0.12em] text-muted-foreground sm:text-[10px]">
                    {item.label}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:mt-8">
          <DesktopTimeline />
          <MobileTimeline />
        </div>

        <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-[#C9A96E]/25 bg-gradient-to-r from-[#FAF7F4] via-white to-[#FAF7F4] p-5 shadow-[0_16px_48px_-32px_rgba(74,16,32,0.35)] sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6 lg:mt-7">
          <div>
            <p className="font-serif text-[clamp(1.125rem,2.5vw,1.5rem)] font-semibold leading-snug text-primary">
              Ready to Start Your Gifting Project?
            </p>
            <p className="mt-1 font-sans text-[13px] text-muted-foreground sm:text-sm">
              Share your brief and our team will curate options within 24 hours.
            </p>
          </div>

          <Link
            to="/corporate#bulk-order-enquiry"
            className="group inline-flex min-h-[3rem] shrink-0 items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#4A1020] via-[#6B1E30] to-[#4A1020] px-6 py-3 font-sans text-[12px] font-bold uppercase tracking-[0.12em] text-primary-foreground shadow-[0_14px_36px_-16px_rgba(74,16,32,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-14px_rgba(74,16,32,0.72)] sm:min-h-[3.25rem] sm:px-7"
          >
            Start Bulk Enquiry
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
