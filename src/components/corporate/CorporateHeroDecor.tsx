import { motion, useReducedMotion } from 'framer-motion';

/** Full-bleed background motion only — no panels, no boxes */
const PARTICLES = [
  { left: '8%', top: '28%', delay: 0 },
  { left: '14%', top: '52%', delay: 1.4 },
  { left: '22%', top: '18%', delay: 2.2 },
  { left: '28%', top: '68%', delay: 0.8 },
  { left: '18%', top: '42%', delay: 3.1 },
  { left: '32%', top: '32%', delay: 1.9 },
  { left: '12%', top: '74%', delay: 2.6 },
  { left: '26%', top: '58%', delay: 4 },
] as const;

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M12 2c4 6 4 12 0 20-4-8-4-14 0-20 4 6 4 12 0 20z"
        fill="currentColor"
        opacity="0.85"
      />
      <path d="M12 2v20" stroke="currentColor" strokeWidth="0.4" opacity="0.35" />
    </svg>
  );
}

function GiftOutline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 40" fill="none" className={className} aria-hidden>
      <rect x="4" y="14" width="40" height="24" rx="1.5" stroke="currentColor" strokeWidth="1" />
      <path d="M4 18h40M24 14V8M14 8q10-4 20 0" stroke="currentColor" strokeWidth="0.9" />
    </svg>
  );
}

export default function CorporateHeroDecor() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden>
      <div className="corporate-hero-pattern absolute inset-0 opacity-[0.22]" />

      <motion.div
        className="absolute -left-[10%] top-[10%] h-[55%] w-[45%] rounded-full bg-[radial-gradient(circle,rgba(201,169,110,0.14)_0%,transparent_70%)] blur-2xl"
        animate={reduceMotion ? undefined : { x: [0, 24, 0], y: [0, 12, 0], opacity: [0.5, 0.75, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-[20%] bottom-[5%] h-[40%] w-[35%] rounded-full bg-[radial-gradient(circle,rgba(74,16,32,0.06)_0%,transparent_70%)] blur-3xl"
        animate={reduceMotion ? undefined : { x: [0, -16, 0], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />

      <motion.div
        className="absolute left-[4%] top-1/2 h-[min(70%,320px)] w-[min(42%,380px)] -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,169,110,0.12)_0%,transparent_68%)]"
        animate={reduceMotion ? undefined : { scale: [1, 1.04, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <svg
        className="absolute left-0 top-[18%] w-[55%] text-[#C9A96E]/[0.07]"
        viewBox="0 0 500 80"
        fill="none"
        preserveAspectRatio="none"
      >
        <path d="M0 50 Q180 10 320 42 T500 28" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      <motion.div
        className="absolute left-[10%] top-[20%] text-[#966E31]/[0.05]"
        animate={reduceMotion ? undefined : { y: [0, -8, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <GiftOutline className="h-14 w-14 md:h-16 md:w-16" />
      </motion.div>
      <motion.div
        className="absolute left-[30%] bottom-[22%] text-[#4A1020]/[0.04]"
        animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      >
        <GiftOutline className="h-10 w-10 rotate-12" />
      </motion.div>

      {!reduceMotion && (
        <>
          <motion.div
            className="absolute left-[16%] top-[62%] text-[#966E31]/[0.12]"
            animate={{ y: [0, -14, 0], rotate: [0, 8, 0], opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <LeafIcon className="h-5 w-5" />
          </motion.div>
          <motion.div
            className="absolute left-[24%] top-[30%] text-[#C9A96E]/[0.1]"
            animate={{ y: [0, 10, 0], rotate: [0, -6, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          >
            <LeafIcon className="h-4 w-4 -rotate-45" />
          </motion.div>
        </>
      )}

      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="corporate-hero-sparkle absolute h-[2px] w-[2px] rounded-full bg-[#C9A96E]/80 md:h-[3px] md:w-[3px]"
          style={{ left: p.left, top: p.top, animationDelay: `${p.delay}s` }}
        />
      ))}
    </div>
  );
}
