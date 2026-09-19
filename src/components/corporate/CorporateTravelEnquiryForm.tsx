import { useEffect, useState, type FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { Check, Send } from 'lucide-react';
import { cn } from '@/utils/cn';
import { submitCorporateEnquiry } from '@/lib/submitCorporateEnquiry';
import { COMPANY_INFO } from '@/config/companyInfo';
import RequiredMark from '@/components/ui/RequiredMark';
import {
  TRAVEL_TRIP_TYPES,
  type TravelTripType,
} from '@/components/corporate/CorporateTravelSection';

function parseTripTypeFromHash(hash: string): TravelTripType | '' {
  const qIndex = hash.indexOf('?');
  if (qIndex === -1) return '';
  const params = new URLSearchParams(hash.slice(qIndex + 1));
  const raw = params.get('tripType') ?? '';
  const decoded = decodeURIComponent(raw.replace(/\+/g, ' '));
  return (TRAVEL_TRIP_TYPES as readonly string[]).includes(decoded)
    ? (decoded as TravelTripType)
    : '';
}

export default function CorporateTravelEnquiryForm() {
  const { hash, search } = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    tripType: '' as TravelTripType | '',
    message: '',
  });

  useEffect(() => {
    const fromHash = parseTripTypeFromHash(hash);
    const fromSearch = new URLSearchParams(search).get('tripType');
    const decodedSearch = fromSearch
      ? decodeURIComponent(fromSearch.replace(/\+/g, ' '))
      : '';
    const next =
      fromHash ||
      ((TRAVEL_TRIP_TYPES as readonly string[]).includes(decodedSearch)
        ? (decodedSearch as TravelTripType)
        : '');
    if (next) {
      setForm((f) => ({ ...f, tripType: next }));
    }
  }, [hash, search]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const result = await submitCorporateEnquiry({
      name: form.name,
      phone: form.phone,
      email: form.email,
      company: form.company,
      tripType: form.tripType,
      message: form.message
        ? `Type of Trip: ${form.tripType}\n\n${form.message}`
        : `Type of Trip: ${form.tripType}`,
      source: 'corporate-travel-enquiry',
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
      id="corporate-travel-enquiry"
      className="scroll-mt-28 bg-[#1A1010] py-12 sm:py-14 lg:py-16"
      aria-labelledby="corporate-travel-enquiry-heading"
    >
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-[#C9A96E]">Travel with us</p>
          <h2
            id="corporate-travel-enquiry-heading"
            className="mt-3 font-serif text-[clamp(1.5rem,3vw,2rem)] font-semibold text-white"
          >
            Corporate Travel Enquiry
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-white/70">
            Tell us about your trip — our team will craft a tailored corporate travel plan.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:mt-10 sm:p-8">
          {submitted ? (
            <div className="flex flex-col items-center py-10 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#ECFDF3] text-[#166534]">
                <Check className="h-7 w-7" strokeWidth={2} />
              </div>
              <p className="font-serif text-xl font-semibold text-white">
                Thank you for your enquiry!
              </p>
              <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-white/70">
                Our team will contact you shortly at {COMPANY_INFO.email}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-white/70">
                  Company Name
                  <RequiredMark />
                </span>
                <input
                  required
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                  className="rounded-md border border-white/15 bg-white/5 px-4 py-3 text-[14px] text-white outline-none placeholder:text-white/35 focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20"
                  placeholder="Company name"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-white/70">
                  Contact Person Name
                  <RequiredMark />
                </span>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="rounded-md border border-white/15 bg-white/5 px-4 py-3 text-[14px] text-white outline-none placeholder:text-white/35 focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20"
                  placeholder="Your full name"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-white/70">
                    Work Email
                    <RequiredMark />
                  </span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="rounded-md border border-white/15 bg-white/5 px-4 py-3 text-[14px] text-white outline-none placeholder:text-white/35 focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20"
                    placeholder="you@company.com"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-white/70">
                    Mobile Number
                    <RequiredMark />
                  </span>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="rounded-md border border-white/15 bg-white/5 px-4 py-3 text-[14px] text-white outline-none placeholder:text-white/35 focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20"
                    placeholder={COMPANY_INFO.phoneDisplay}
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1.5">
                <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-white/70">
                  Type of Trip
                  <RequiredMark />
                </span>
                <select
                  required
                  value={form.tripType}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      tripType: e.target.value as TravelTripType | '',
                    }))
                  }
                  className="rounded-md border border-white/15 bg-[#1A1010] px-4 py-3 text-[14px] text-white outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20"
                >
                  <option value="" disabled>
                    Select type of trip
                  </option>
                  {TRAVEL_TRIP_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-white/70">
                  Message (Optional)
                </span>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="resize-none rounded-md border border-white/15 bg-white/5 px-4 py-3 text-[14px] text-white outline-none placeholder:text-white/35 focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20"
                  placeholder="Destinations, dates, group size, preferences..."
                />
              </label>

              {error && (
                <p className="rounded-md border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
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
      </div>
    </section>
  );
}
