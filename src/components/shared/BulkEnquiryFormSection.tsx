import { useState, type FormEvent } from 'react';
import AppImage from '@/components/ui/AppImage';
import { Check, Gift, Send } from 'lucide-react';
import { cn } from '@/utils/cn';

type BulkEnquiryFormSectionProps = {
  id?: string;
  title: string;
  subtitle?: string;
  variant?: 'inline' | 'full';
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function BulkEnquiryFormSection({
  id = 'bulk-order-enquiry',
  title,
  subtitle,
  variant = 'full',
  imageSrc = 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800',
  imageAlt = 'Corporate bulk gifting consultation',
  className,
}: BulkEnquiryFormSectionProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    quantity: '',
    message: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id={id}
      className={cn('section-pad scroll-mt-28 section-alt', className)}
      aria-labelledby={`${id}-heading`}
    >
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center lg:max-w-3xl">
          <p className="eyebrow">Get in touch</p>
          <h2 id={`${id}-heading`} className="section-heading-corporate mt-3">
            {title}
          </h2>
          {subtitle && <p className="section-lede mx-auto mt-4">{subtitle}</p>}
        </div>

        <div
          className={cn(
            'mx-auto mt-10 grid max-w-6xl gap-8 lg:mt-12',
            variant === 'full' ? 'lg:grid-cols-[1fr_1fr]' : 'lg:grid-cols-[1.1fr_0.9fr]'
          )}
        >
          <div className="rounded-2xl border border-[#EBEBEB]/80 bg-white p-6 shadow-[0_8px_32px_-12px_rgba(74,16,32,0.1)] sm:p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#ECFDF3] text-[#166534]">
                  <Check className="h-7 w-7" strokeWidth={2} />
                </div>
                <p className="font-serif text-xl font-semibold text-[#1A1010]">Thank you for your enquiry!</p>
                <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-[#6b6560]">
                  Our gifting experts will reach out within 24 hours with curated options for your requirement.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#6b6560]">Full Name *</span>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="rounded-xl border border-[#e8e4e1] bg-surface-muted px-4 py-3 text-[14px] outline-none transition-colors focus:border-[#9D7D47] focus:bg-white focus:ring-2 focus:ring-[#9D7D47]/10"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#6b6560]">Company *</span>
                    <input
                      required
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                      className="rounded-xl border border-[#e8e4e1] bg-surface-muted px-4 py-3 text-[14px] outline-none transition-colors focus:border-[#9D7D47] focus:bg-white focus:ring-2 focus:ring-[#9D7D47]/10"
                      placeholder="Company name"
                    />
                  </label>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#6b6560]">Email *</span>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="rounded-xl border border-[#e8e4e1] bg-surface-muted px-4 py-3 text-[14px] outline-none transition-colors focus:border-[#9D7D47] focus:bg-white focus:ring-2 focus:ring-[#9D7D47]/10"
                      placeholder="you@company.com"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#6b6560]">Phone *</span>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      className="rounded-xl border border-[#e8e4e1] bg-surface-muted px-4 py-3 text-[14px] outline-none transition-colors focus:border-[#9D7D47] focus:bg-white focus:ring-2 focus:ring-[#9D7D47]/10"
                      placeholder="+91 98765 43210"
                    />
                  </label>
                </div>
                <label className="flex flex-col gap-1.5">
                  <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#6b6560]">Estimated Quantity</span>
                  <input
                    type="text"
                    value={form.quantity}
                    onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))}
                    className="rounded-xl border border-[#e8e4e1] bg-surface-muted px-4 py-3 text-[14px] outline-none transition-colors focus:border-[#9D7D47] focus:bg-white focus:ring-2 focus:ring-[#9D7D47]/10"
                    placeholder="e.g. 50–100 units"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#6b6560]">Your Requirement *</span>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="resize-none rounded-xl border border-[#e8e4e1] bg-surface-muted px-4 py-3 text-[14px] outline-none transition-colors focus:border-[#9D7D47] focus:bg-white focus:ring-2 focus:ring-[#9D7D47]/10"
                    placeholder="Tell us about your gifting needs, occasion, budget, and branding requirements..."
                  />
                </label>
                <button type="submit" className="btn-pill btn-pill-maroon mt-2 w-full sm:w-auto sm:self-start">
                  <Send className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                  Submit Enquiry
                </button>
              </form>
            )}
          </div>

          <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-[#EBEBEB]/80 shadow-[0_8px_32px_-12px_rgba(74,16,32,0.1)] lg:min-h-0">
            <AppImage
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#4A1020]/80 via-[#4A1020]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-[#C9A96E] backdrop-blur-sm">
                <Gift className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </div>
              <p className="font-serif text-[20px] font-semibold leading-snug text-white sm:text-[22px]">
                End-to-end corporate gifting, from curation to delivery.
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-white/85">
                Custom branding, bulk packaging, and pan-India logistics — handled by our dedicated team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
