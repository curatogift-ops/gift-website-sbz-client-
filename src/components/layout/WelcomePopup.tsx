import { useEffect, useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Gift, ArrowRight } from 'lucide-react';
import BrandLogo from '@/components/ui/BrandLogo';
import { COMPANY_INFO } from '@/config/companyInfo';

const STORAGE_KEY = 'gg-welcome-popup-dismissed-v1';

/**
 * First-visit welcome popup — centered on all breakpoints (including mobile).
 */
export default function WelcomePopup() {
  const titleId = useId();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === '1') return;
    } catch {
      /* ignore */
    }
    const t = window.setTimeout(() => setOpen(true), 700);
    return () => window.clearTimeout(t);
  }, []);

  // Lock background scroll while open (prevents horizontal shift / off-center feel)
  useEffect(() => {
    if (!open) return;
    const { body, documentElement } = document;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;
    const scrollbarGap = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = 'hidden';
    if (scrollbarGap > 0) {
      body.style.paddingRight = `${scrollbarGap}px`;
    }

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
    };
  }, [open]);

  const dismiss = () => {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* ignore */
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center px-4 py-6 sm:px-6"
      style={{
        paddingTop: 'max(1.5rem, env(safe-area-inset-top, 0px))',
        paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom, 0px))',
        paddingLeft: 'max(1rem, env(safe-area-inset-left, 0px))',
        paddingRight: 'max(1rem, env(safe-area-inset-right, 0px))',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-[#1A1010]/55 backdrop-blur-[2px]"
        aria-label="Close welcome popup"
        onClick={dismiss}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[22rem] max-h-[min(92dvh,40rem)] flex-col overflow-hidden rounded-2xl border border-[#E8DFD2] bg-[#FFFDF9] shadow-[0_28px_64px_-24px_rgba(26,16,16,0.45)] sm:max-w-md">
        <div className="relative shrink-0 bg-[linear-gradient(145deg,#4A1020_0%,#2A1518_55%,#1A1010_100%)] px-5 pb-6 pt-5 sm:px-6 sm:pb-8">
          <button
            type="button"
            onClick={dismiss}
            className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/90 transition hover:bg-white/10"
            aria-label="Close"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>

          <div className="flex justify-center pt-2">
            <div className="rounded-xl bg-white/95 px-4 py-3 shadow-sm">
              <BrandLogo to="/" logoHeightClass="h-[1.75rem]" widthClass="w-[11.5rem]" />
            </div>
          </div>

          <p className="mt-5 text-center font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-[#E8C87A]">
            India&apos;s one-stop gifting solution
          </p>
          <h2
            id={titleId}
            className="mt-2 text-center font-serif text-[1.45rem] font-semibold leading-snug text-white sm:text-[1.7rem]"
          >
            Welcome to {COMPANY_INFO.brandName}
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-center font-sans text-[13px] leading-relaxed text-white/80">
            Premium corporate gifts, custom branding, and pan-India delivery — curated for teams,
            clients, and celebrations.
          </p>
        </div>

        <div className="space-y-3 overflow-y-auto px-5 py-5 sm:px-6">
          <Link
            to="/corporate"
            onClick={dismiss}
            className="inline-flex w-full min-h-11 items-center justify-center gap-2 rounded-xl bg-[#4A1020] px-4 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#5C1629]"
          >
            <Gift className="h-4 w-4 shrink-0 text-[#C9A96E]" strokeWidth={1.75} aria-hidden />
            <span className="text-center">Explore Corporate Gifting</span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
          </Link>
          <Link
            to="/catalogue"
            onClick={dismiss}
            className="inline-flex w-full min-h-11 items-center justify-center rounded-xl border border-[#4A1020]/15 bg-[var(--cream)] px-4 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[#4A1020] transition hover:border-[#C9A96E]/50 hover:bg-white"
          >
            Download Catalogue
          </Link>
          <button
            type="button"
            onClick={dismiss}
            className="w-full py-2 font-sans text-[12px] font-medium text-[#8C847C] transition hover:text-[#4A1020]"
          >
            Continue browsing
          </button>
        </div>
      </div>
    </div>
  );
}
