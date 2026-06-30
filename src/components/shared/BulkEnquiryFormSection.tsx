import { useState, type FormEvent } from 'react';
import AppImage from '@/components/ui/AppImage';
import { Check, Gift, Send } from 'lucide-react';
import { cn } from '@/utils/cn';
import { submitCorporateEnquiry } from '@/lib/submitCorporateEnquiry';
import { COMPANY_INFO } from '@/config/companyInfo';

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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    quantity: '',
    message: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const result = await submitCorporateEnquiry({
      name: form.name,
      phone: form.phone,
      email: form.email,
      company: form.company,
      quantity: form.quantity,
      message: form.message,
      source: 'bulk-order-enquiry-section',
    });

    setSubmitting(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.message);
    }
  };

  return (
    <section
      id={id}
      className={cn('scroll-mt-28 section-alt py-12 sm:py-14 lg:py-16', className)}
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
            'mx-auto grid max-w-6xl gap-8',
            subtitle ? 'mt-10 lg:mt-12' : 'mt-8 lg:mt-10',
            variant === 'full' ? 'lg:grid-cols-[1fr_1fr]' : 'lg:grid-cols-[1.1fr_0.9fr]'
          )}
        >
          <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#ECFDF3] text-[#166534]">
                  <Check className="h-7 w-7" strokeWidth={2} />
                </div>
                <p className="font-serif text-xl font-semibold text-foreground">Thank you for your enquiry!</p>
                <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-muted-foreground">
                  Our team will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Full Name *</span>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="rounded-md border border-border bg-muted px-4 py-3 text-[14px] outline-none transition-colors focus:border-[#9D7D47] focus:bg-white focus:ring-2 focus:ring-[#9D7D47]/15"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Company *</span>
                    <input
                      required
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                      className="rounded-md border border-border bg-muted px-4 py-3 text-[14px] outline-none transition-colors focus:border-[#9D7D47] focus:bg-white focus:ring-2 focus:ring-[#9D7D47]/15"
                      placeholder="Company name"
                    />
                  </label>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Email *</span>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="rounded-md border border-border bg-muted px-4 py-3 text-[14px] outline-none transition-colors focus:border-[#9D7D47] focus:bg-white focus:ring-2 focus:ring-[#9D7D47]/15"
                      placeholder="you@company.com"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Phone *</span>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      className="rounded-md border border-border bg-muted px-4 py-3 text-[14px] outline-none transition-colors focus:border-[#9D7D47] focus:bg-white focus:ring-2 focus:ring-[#9D7D47]/15"
                      placeholder={COMPANY_INFO.phoneDisplay}
                    />
                  </label>
                </div>
                <label className="flex flex-col gap-1.5">
                  <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Approx. No. of Gifts</span>
                  <input
                    type="text"
                    value={form.quantity}
                    onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))}
                    className="rounded-md border border-border bg-muted px-4 py-3 text-[14px] outline-none transition-colors focus:border-[#9D7D47] focus:bg-white focus:ring-2 focus:ring-[#9D7D47]/15"
                    placeholder="e.g. 50–100 units"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Message (Optional)</span>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="resize-none rounded-md border border-border bg-muted px-4 py-3 text-[14px] outline-none transition-colors focus:border-[#9D7D47] focus:bg-white focus:ring-2 focus:ring-[#9D7D47]/15"
                    placeholder="Tell us about your gifting needs, occasion, budget, and branding requirements..."
                  />
                </label>
                {error && (
                  <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className={cn(
                    'btn-pill btn-pill-maroon mt-2 w-full sm:w-auto sm:self-start',
                    submitting && 'pointer-events-none opacity-70',
                  )}
                >
                  <Send className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                  {submitting ? 'Submitting…' : 'Submit Enquiry'}
                </button>
              </form>
            )}
          </div>

          <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-border lg:min-h-0">
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
