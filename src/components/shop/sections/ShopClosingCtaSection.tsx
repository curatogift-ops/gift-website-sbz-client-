import { Link } from 'react-router-dom';
import { Gift, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '@/config/companyInfo';

export default function ShopClosingCtaSection() {
  const waHref = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
    "Hi, I'd like help curating a personalized gift."
  )}`;

  return (
    <section className="section-pad relative overflow-hidden bg-[#6B1E30]" aria-labelledby="shop-cta-heading">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 80%, #C9A96E 0, transparent 50%), radial-gradient(circle at 80% 20%, #fff 0, transparent 40%)',
        }}
        aria-hidden
      />
      <div className="section-container relative text-center">
        <h2 id="shop-cta-heading" className="mx-auto max-w-2xl font-serif text-[length:var(--font-size-h2)] font-semibold leading-[1.2] tracking-[-0.01em] text-white">
          Not sure what to pick?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-[1.65] text-white/80 sm:text-base">
          Our gifting concierge will help you find the perfect personalized gift — or build a custom hamper from scratch.
        </p>
        <div className="mx-auto mt-8 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center">
          <Link to="/hamper-builder" className="btn-pill w-full bg-white text-[#4A1020] hover:bg-[#C9A96E] hover:text-white sm:w-auto">
            <Gift className="h-4 w-4" strokeWidth={2} aria-hidden />
            Start Hamper Builder
          </Link>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill w-full border border-white/30 bg-transparent text-white hover:bg-white/10 sm:w-auto"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={2} aria-hidden />
            Chat with Us
          </a>
        </div>
      </div>
    </section>
  );
}
