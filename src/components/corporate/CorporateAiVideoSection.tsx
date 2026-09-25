/**
 * AI Corporate video section scaffold.
 * IMPLEMENTATION_NOTES:
 * - Drop the AI video file at: public/videos/ai-corporate/hero.mp4
 * - Optional poster: public/videos/ai-corporate/poster.jpg
 * - Component auto-shows the player when the file is present (override via VIDEO_SRC).
 */
import { useRef, useState } from 'react';
import { Play, Volume2 } from 'lucide-react';

const VIDEO_SRC = '/videos/ai-corporate/hero.mp4';
const POSTER_SRC = '/videos/ai-corporate/poster.jpg';

export default function CorporateAiVideoSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasSource, setHasSource] = useState(true);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    const el = videoRef.current;
    if (!el || !hasSource) return;
    void el.play().then(() => setPlaying(true)).catch(() => setHasSource(false));
  };

  return (
    <section
      id="corporate-ai-video"
      className="scroll-mt-28 bg-[var(--cream)] py-12 sm:py-14 lg:py-16"
      aria-labelledby="corporate-ai-video-heading"
    >
      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">See Giftz Gallerei</p>
          <h2 id="corporate-ai-video-heading" className="section-heading-corporate mt-3">
            Experience Our Corporate Gifting
          </h2>
          <p className="section-lede mx-auto mt-4">
            A short film of curated hampers, branding, and delivery — coming soon.
          </p>
        </div>

        <div className="relative mx-auto mt-8 max-w-5xl overflow-hidden rounded-2xl border border-border bg-[#1A1010] shadow-lg sm:mt-10">
          <div className="relative aspect-video w-full">
            {hasSource ? (
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                poster={POSTER_SRC}
                preload="none"
                playsInline
                controls={playing}
                onError={() => setHasSource(false)}
                onEnded={() => setPlaying(false)}
              >
                {/* TODO: Replace when AI video ZIP is provided */}
                <source src={VIDEO_SRC} type="video/mp4" />
              </video>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#1A1010] px-6 text-center">
                <Volume2 className="h-8 w-8 text-[#C9A96E]/70" strokeWidth={1.5} aria-hidden />
                <p className="font-serif text-lg text-white/90">Video coming soon</p>
                <p className="max-w-sm text-[13px] text-white/55">
                  Place your file at <code className="text-[#C9A96E]">public/videos/ai-corporate/hero.mp4</code>
                </p>
              </div>
            )}

            {hasSource && !playing && (
              <button
                type="button"
                onClick={handlePlay}
                className="absolute inset-0 flex items-center justify-center bg-[#1A1010]/35 transition hover:bg-[#1A1010]/45"
                aria-label="Play corporate video"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#C9A96E]/50 bg-[#4A1020] text-[#C9A96E] shadow-lg sm:h-16 sm:w-16">
                  <Play className="h-6 w-6 fill-current" strokeWidth={0} aria-hidden />
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
