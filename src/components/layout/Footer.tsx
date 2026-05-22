import { Link } from 'react-router-dom';
import AppImage from '@/components/ui/AppImage';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

const LOGO_SRC = '/images/gift-gallerei-logo.png';

const Instagram = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Facebook = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Twitter = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative z-0 overflow-visible border-t border-white/10 bg-[#4A1020] pb-10 pt-14 text-[#F2EDE8] md:pb-12 md:pt-16">
      <div className="section-container">
        {/* Top — brand, links, newsletter */}
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-12 md:grid-cols-2 md:gap-x-12 md:gap-y-10 lg:grid-cols-12 lg:pb-14">
          <div className="space-y-5 lg:col-span-4">
            <div className="relative h-12 w-52 sm:h-14 sm:w-60">
              <AppImage
                src={LOGO_SRC}
                alt="Giftz Gallerei"
                fill
                className="object-contain object-left"
                sizes="(max-width:768px) 208px, 240px"
              />
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[#F2EDE8]/75">
              Curating luxury hampers with a personal touch. Elevating the art of gifting across India with handcrafted
              excellence.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              {[
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Twitter, label: 'Twitter' },
              ].map(({ Icon, label }, idx) => (
                <Link
                  key={idx}
                  to="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-[#F2EDE8]/90 transition hover:border-[#C9A96E]/80 hover:bg-white/5 hover:text-[#E8CF9A]"
                  aria-label={label}
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-10 md:col-span-2 lg:col-span-5">
            <div>
              <h4 className="mb-4 text-[13px] font-bold uppercase tracking-[0.2em] text-[#C9A96E]">Shop hampers</h4>
              <ul className="space-y-3 text-[14px] font-medium text-[#F2EDE8]/80">
                <li>
                  <Link to="/shop" className="inline-flex items-center gap-1.5 transition hover:text-[#E8CF9A]">
                    All products <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-70" strokeWidth={2} />
                  </Link>
                </li>
                <li>
                  <Link to="/shop?category=wedding" className="inline-flex items-center gap-1.5 transition hover:text-[#E8CF9A]">
                    Wedding collection <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-70" strokeWidth={2} />
                  </Link>
                </li>
                <li>
                  <Link to="/shop?category=corporate" className="inline-flex items-center gap-1.5 transition hover:text-[#E8CF9A]">
                    Corporate gifting <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-70" strokeWidth={2} />
                  </Link>
                </li>
                <li>
                  <Link to="/shop?category=birthday" className="inline-flex items-center gap-1.5 transition hover:text-[#E8CF9A]">
                    Birthday hampers <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-70" strokeWidth={2} />
                  </Link>
                </li>
                <li>
                  <Link to="/hamper-builder" className="inline-flex items-center gap-1.5 text-[#E8CF9A]/95 transition hover:text-[#f5e6bc]">
                    Build your own <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-70" strokeWidth={2} />
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-[13px] font-bold uppercase tracking-[0.2em] text-[#C9A96E]">Support</h4>
              <ul className="space-y-3 text-[14px] font-medium text-[#F2EDE8]/80">
                <li>
                  <Link to="/track-order" className="transition hover:text-[#E8CF9A]">
                    Track your order
                  </Link>
                </li>
                <li>
                  <Link to="/shipping" className="transition hover:text-[#E8CF9A]">
                    Shipping &amp; delivery
                  </Link>
                </li>
                <li>
                  <Link to="/returns" className="transition hover:text-[#E8CF9A]">
                    Returns policy
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="transition hover:text-[#E8CF9A]">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="transition hover:text-[#E8CF9A]">
                    Contact support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4 md:col-span-2 lg:col-span-3">
            <h4 className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#C9A96E]">Stay inspired</h4>
            <p className="text-[14px] leading-relaxed text-[#F2EDE8]/70">
              Join our list for gifting ideas and new collections — no spam, unsubscribe anytime.
            </p>
            <form className="flex flex-col gap-2.5 sm:flex-row sm:items-stretch" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                name="email"
                type="email"
                placeholder="Your email address"
                autoComplete="email"
                className="min-h-[2.75rem] w-full flex-1 rounded-xl border border-white/15 bg-white/[0.07] px-4 py-2.5 text-sm text-[#F2EDE8] outline-none ring-0 placeholder:text-[#F2EDE8]/45 transition focus:border-[#C9A96E]/60 focus:bg-white/[0.1] focus:ring-2 focus:ring-[#C9A96E]/35"
              />
              <button
                type="submit"
                className="min-h-[2.75rem] shrink-0 rounded-xl bg-[#C9A96E] px-6 font-sans text-[12.5px] font-bold uppercase tracking-[0.18em] text-[#3a0d14] shadow-md transition hover:bg-[#dfc48a] active:scale-[0.98] sm:px-7"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Contact row */}
        <div className="grid grid-cols-1 gap-8 border-b border-white/10 py-10 sm:grid-cols-3 sm:gap-6 md:py-9">
          <div className="flex gap-4 sm:items-start">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#C9A96E]/45 bg-[#C9A96E]/12 text-[#E8CF9A]">
              <MapPin className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </div>
            <div className="min-w-0 pt-0.5">
              <p className="font-sans text-[12px] font-bold uppercase tracking-[0.22em] text-[#C9A96E]">Visit us</p>
              <p className="mt-1 text-sm font-medium leading-snug text-[#F2EDE8]">Bangalore, Karnataka, India</p>
            </div>
          </div>
          <div className="flex gap-4 sm:items-start">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#C9A96E]/45 bg-[#C9A96E]/12 text-[#E8CF9A]">
              <Phone className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </div>
            <div className="min-w-0 pt-0.5">
              <p className="font-sans text-[12px] font-bold uppercase tracking-[0.22em] text-[#C9A96E]">Call us</p>
              <a href="tel:+919876543210" className="mt-1 block text-sm font-medium text-[#F2EDE8] transition hover:text-[#E8CF9A]">
                +91 98765 43210
              </a>
            </div>
          </div>
          <div className="flex gap-4 sm:items-start">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#C9A96E]/45 bg-[#C9A96E]/12 text-[#E8CF9A]">
              <Mail className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </div>
            <div className="min-w-0 pt-0.5">
              <p className="font-sans text-[12px] font-bold uppercase tracking-[0.22em] text-[#C9A96E]">Email us</p>
              <a
                href="mailto:hello@giftzgallerei.com"
                className="mt-1 block break-all text-sm font-medium text-[#F2EDE8] transition hover:text-[#E8CF9A]"
              >
                hello@giftzgallerei.com
              </a>
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className="flex flex-col items-center justify-between gap-6 pt-8 text-center md:flex-row md:gap-4 md:text-left">
          <p className="max-w-xl font-sans text-[12px] font-semibold uppercase leading-relaxed tracking-[0.14em] text-[#F2EDE8]/45 sm:text-[13px] sm:tracking-[0.16em]">
            © {new Date().getFullYear()} Giftz Gallerei. Crafting memories, one box at a time.
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-sans text-[12px] font-bold uppercase tracking-[0.18em] text-[#F2EDE8]/55">
            <Link to="/privacy" className="transition hover:text-[#E8CF9A]">
              Privacy
            </Link>
            <Link to="/terms" className="transition hover:text-[#E8CF9A]">
              Terms
            </Link>
            <Link to="/sitemap" className="transition hover:text-[#E8CF9A]">
              Sitemap
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
