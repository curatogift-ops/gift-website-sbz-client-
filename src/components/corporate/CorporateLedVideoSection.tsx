/**
 * LED-style 4-video grid scaffold.
 * IMPLEMENTATION_NOTES:
 * - Drop files at:
 *   public/videos/led/01.mp4
 *   public/videos/led/02.mp4
 *   public/videos/led/03.mp4
 *   public/videos/led/04.mp4
 * - Optional posters: public/videos/led/01-poster.jpg … 04-poster.jpg
 */
import { useState } from 'react';
import { Volume2 } from 'lucide-react';

const LED_VIDEOS = [
  { id: 'led-1', src: '/videos/led/01.mp4', poster: '/videos/led/01-poster.jpg', label: 'LED Screen 01' },
  { id: 'led-2', src: '/videos/led/02.mp4', poster: '/videos/led/02-poster.jpg', label: 'LED Screen 02' },
  { id: 'led-3', src: '/videos/led/03.mp4', poster: '/videos/led/03-poster.jpg', label: 'LED Screen 03' },
  { id: 'led-4', src: '/videos/led/04.mp4', poster: '/videos/led/04-poster.jpg', label: 'LED Screen 04' },
] as const;

function LedVideoTile({
  src,
  poster,
  label,
}: {
  src: string;
  poster: string;
  label: string;
}) {
  const [available, setAvailable] = useState(true);

  return (
    <div className="relative overflow-hidden rounded-xl border border-[#C9A96E]/25 bg-[#0D0A0A] shadow-[inset_0_0_40px_rgba(201,169,110,0.08)]">
      <div className="relative aspect-video w-full">
        {available ? (
          <video
            className="h-full w-full object-cover"
            poster={poster}
            preload="none"
            muted
            loop
            playsInline
            controls
            onError={() => setAvailable(false)}
          >
            {/* TODO: Provide LED video assets */}
            <source src={src} type="video/mp4" />
          </video>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#1A1010] px-3 text-center">
            <Volume2 className="h-5 w-5 text-[#C9A96E]/60" strokeWidth={1.5} aria-hidden />
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-white/70">
              {label}
            </p>
            <p className="text-[11px] text-white/40">Asset pending</p>
          </div>
        )}
        <div
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#C9A96E]/15"
          aria-hidden
        />
      </div>
    </div>
  );
}

export default function CorporateLedVideoSection() {
  return (
    <section
      id="corporate-led-videos"
      className="scroll-mt-28 bg-[#1A1010] py-12 sm:py-14 lg:py-16"
      aria-labelledby="corporate-led-videos-heading"
    >
      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-[#C9A96E]">On display</p>
          <h2
            id="corporate-led-videos-heading"
            className="mt-3 font-serif text-[clamp(1.5rem,3vw,2rem)] font-semibold text-white"
          >
            LED Showcase
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-white/65">
            Four-screen LED experience — videos load when assets are available.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:gap-5">
          {LED_VIDEOS.map((video) => (
            <LedVideoTile
              key={video.id}
              src={video.src}
              poster={video.poster}
              label={video.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
