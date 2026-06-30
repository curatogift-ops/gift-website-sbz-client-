import { useEffect, useState, type FormEvent } from 'react';
import { Check, Send, X } from 'lucide-react';
import { cn } from '@/utils/cn';
import { submitCorporateEnquiry } from '@/lib/submitCorporateEnquiry';
import { COMPANY_INFO } from '@/config/companyInfo';

export type CorporateEnquiryContext = {
  productName?: string;
  productSlug?: string;
  categoryName?: string;
  categorySlug?: string;
  source?: string;
};

type CorporateEnquiryDialogProps = {
  open: boolean;
  onClose: () => void;
  context?: CorporateEnquiryContext;
};

const EMPTY_FORM = {
  name: '',
  phone: '',
  email: '',
  company: '',
  quantity: '',
  message: '',
};

export default function CorporateEnquiryDialog({
  open,
  onClose,
  context,
}: CorporateEnquiryDialogProps) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setSubmitted(false);
      setError('');
      setForm(EMPTY_FORM);
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const result = await submitCorporateEnquiry({
      ...form,
      ...context,
      source: context?.source ?? 'product-enquiry-popup',
    });

    setSubmitting(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.message);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-dialog-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-[#1A1010]/60 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Close enquiry form"
      />

      <div className="relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-border bg-white shadow-2xl sm:rounded-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
          <div>
            <p className="eyebrow text-[10px]">Bulk enquiry</p>
            <h2 id="enquiry-dialog-title" className="mt-1 font-serif text-xl font-semibold text-foreground">
              Enquire Now
            </h2>
            {context?.productName && (
              <p className="mt-1 text-sm text-muted-foreground">
                {context.productName}
                {context.categoryName ? ` · ${context.categoryName}` : ''}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-5 sm:px-6">
          {submitted ? (
            <div className="flex flex-col items-center py-8 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#ECFDF3] text-[#166534]">
                <Check className="h-7 w-7" strokeWidth={2} />
              </div>
              <p className="font-serif text-xl font-semibold text-foreground">
                Thank you for your enquiry.
              </p>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Our team will contact you shortly.
              </p>
              <button type="button" onClick={onClose} className="btn-pill btn-pill-maroon mt-6">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                  Name *
                </span>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="rounded-md border border-border bg-muted px-4 py-3 text-[14px] outline-none focus:border-[#9D7D47] focus:bg-white focus:ring-2 focus:ring-[#9D7D47]/15"
                  placeholder="Your full name"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                  Contact Number *
                </span>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="rounded-md border border-border bg-muted px-4 py-3 text-[14px] outline-none focus:border-[#9D7D47] focus:bg-white focus:ring-2 focus:ring-[#9D7D47]/15"
                  placeholder={COMPANY_INFO.phoneDisplay}
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                  Your Email *
                </span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="rounded-md border border-border bg-muted px-4 py-3 text-[14px] outline-none focus:border-[#9D7D47] focus:bg-white focus:ring-2 focus:ring-[#9D7D47]/15"
                  placeholder="you@company.com"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                  Company Name *
                </span>
                <input
                  required
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                  className="rounded-md border border-border bg-muted px-4 py-3 text-[14px] outline-none focus:border-[#9D7D47] focus:bg-white focus:ring-2 focus:ring-[#9D7D47]/15"
                  placeholder="Company name"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                  Approx. No. of Gifts *
                </span>
                <input
                  required
                  type="text"
                  value={form.quantity}
                  onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))}
                  className="rounded-md border border-border bg-muted px-4 py-3 text-[14px] outline-none focus:border-[#9D7D47] focus:bg-white focus:ring-2 focus:ring-[#9D7D47]/15"
                  placeholder="e.g. 50–100 units"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                  Message (Optional)
                </span>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="resize-none rounded-md border border-border bg-muted px-4 py-3 text-[14px] outline-none focus:border-[#9D7D47] focus:bg-white focus:ring-2 focus:ring-[#9D7D47]/15"
                  placeholder="Branding, delivery timeline, budget..."
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
                  'btn-pill btn-pill-maroon mt-1 w-full',
                  submitting && 'pointer-events-none opacity-70',
                )}
              >
                <Send className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                {submitting ? 'Submitting…' : 'Submit Enquiry'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
