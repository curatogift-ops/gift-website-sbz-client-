import { ArrowRight, BadgeCheck, Clock, Gift, Shield, UserRound } from 'lucide-react';

const WA = '919876543210';

const CTA_FEATURES = [
  { label: 'Custom Solutions', Icon: Shield },
  { label: 'Dedicated Account Manager', Icon: UserRound },
  { label: 'Timely Delivery', Icon: Clock },
  { label: 'Uncompromised Quality', Icon: BadgeCheck },
] as const;

export default function CorporateExpertsCtaSection() {
  const contactHref = `https://wa.me/${WA}?text=${encodeURIComponent(
    "Hi, I'd like to speak with your corporate gifting experts."
  )}`;

  return (
    <section
      className="relative overflow-hidden bg-[#3D0A14] border-t border-white/5"
      aria-labelledby="corporate-experts-cta-heading"
    >
      {/* Subtle texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_50%,rgba(201,169,110,0.08),transparent_55%),radial-gradient(ellipse_70%_50%_at_90%_30%,rgba(255,255,255,0.04),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.5\'/%3E%3C/svg%3E")',
        }}
        aria-hidden
      />

      <div className="section-container relative py-10 sm:py-12 lg:py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-0">
          {/* Left — icon + headline */}
          <div className="flex gap-5 sm:gap-6 lg:min-w-0 lg:flex-[0.9] lg:pr-8">
            <div
              className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-full border-2 border-[#C9A96E] sm:h-20 sm:w-20"
              aria-hidden
            >
              <Gift className="h-9 w-9 text-[#C9A96E] sm:h-10 sm:w-10" strokeWidth={1.35} />
            </div>
            <div className="min-w-0 pt-1">
              <p className="font-sans text-[14.5px] font-normal leading-snug text-[#F2EDE8]/90 sm:text-[15.5px]">
                Looking for a reliable gifting partner for your business?
              </p>
              <h2
                id="corporate-experts-cta-heading"
                className="mt-2 font-serif text-[clamp(1.35rem,3.5vw,2rem)] font-semibold leading-[1.2] tracking-[-0.01em] text-white lg:mt-2.5 lg:text-[1.75rem] xl:text-[2rem]"
              >
                Let&apos;s create{' '}
                <span className="text-[#C9A96E]">meaningful gifting</span> experiences together.
              </h2>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden w-px shrink-0 self-stretch bg-[#C9A96E]/25 lg:block lg:mx-6" aria-hidden />

          {/* Right — features + CTA */}
          <div className="flex flex-col gap-6 lg:min-w-0 lg:flex-[1.25] sm:gap-8">
            <ul className="grid list-none grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:gap-x-10 lg:gap-y-4 xl:gap-x-12">
              {CTA_FEATURES.map((item) => {
                const Icon = item.Icon;
                return (
                  <li key={item.label} className="flex items-center gap-3">
                    <Icon className="h-5 w-5 shrink-0 text-[#C9A96E]" strokeWidth={1.65} aria-hidden />
                    <span className="font-sans text-[14.5px] font-medium text-[#F2EDE8] sm:text-[15.5px] whitespace-nowrap">{item.label}</span>
                  </li>
                );
              })}
            </ul>

            <div className="flex flex-col items-center sm:items-start lg:shrink-0">
              <a
                href={contactHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[3rem] items-center justify-center gap-2.5 rounded-md bg-[#C9A96E] px-6 py-3.5 font-sans text-[13px] font-bold uppercase tracking-[0.14em] text-[#1A1010] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.45)] transition duration-300 hover:bg-[#b89355] hover:scale-[1.02] active:scale-[0.98] sm:min-h-[3.25rem] sm:px-8 sm:text-[14px] sm:tracking-[0.16em]"
              >
                Contact our experts
                <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden />
              </a>
              <p className="mt-3 text-center sm:text-left font-sans text-sm italic text-[#F2EDE8]/90 sm:text-[15px]">
                We&apos;re here to{' '}
                <span className="underline decoration-[#C9A96E] decoration-2 underline-offset-[5px]">
                  help!
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
