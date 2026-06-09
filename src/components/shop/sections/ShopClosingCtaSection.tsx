import { Link } from 'react-router-dom';
import { Gift, MessageCircle } from 'lucide-react';

const WA = '919876543210';

export default function ShopClosingCtaSection() {
  const waHref = `https://wa.me/${WA}?text=${encodeURIComponent(
    "Hi, I'd like help curating a personalized gift."
  )}`;

  return (
    <section className="relative overflow-hidden bg-[#6B1E30] py-16 sm:py-20" aria-labelledby="shop-cta-heading">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 80%, #C9A96E 0, transparent 50%), radial-gradient(circle at 80% 20%, #fff 0, transparent 40%)',
        }}
        aria-hidden
      />
      <div className="section-container relative text-center">
        <h2 id="shop-cta-heading" className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-tight text-white">
          Not sure what to pick?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-white/80">
          Our gifting concierge will help you find the perfect personalized gift — or build a custom hamper from scratch.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/hamper-builder" className="btn-pill bg-white text-[#4A1020] hover:bg-[#C9A96E] hover:text-white">
            <Gift className="h-4 w-4" strokeWidth={2} aria-hidden />
            Start Hamper Builder
          </Link>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill border border-white/30 bg-transparent text-white hover:bg-white/10"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={2} aria-hidden />
            Chat with Us
          </a>
        </div>
      </div>
    </section>
  );
}
