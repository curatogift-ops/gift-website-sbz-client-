/**
 * Discover the Details — first four clips in an LED-style grid,
 * then any further distinct clips in a plain frame.
 * Local files only. Do not repeat an LED clip to fill the second row.
 * Repo search found four unique mp4s; discover-details.mp4 matches eco-friendly-hero.mp4.
 */
const LED_VIDEOS = [
  { id: 'led-1', src: '/images/corporate/showcase-videos/xech-product-showcase.mp4' },
  { id: 'led-2', src: '/images/corporate/showcase-videos/eon-voltra.mp4' },
  { id: 'led-3', src: '/images/corporate/showcase-videos/rico-slow-juicer.mp4' },
  { id: 'led-4', src: '/images/corporate/eco-friendly-hero.mp4' },
] as const;

const DETAIL_VIDEOS: readonly { id: string; src: string }[] = [];

function LedTile({ src }: { src: string }) {
  return (
    <div className="box-border min-w-0 overflow-hidden rounded-xl border border-[#C9A96E]/35 bg-[#0D0A0A]">
      <div className="relative aspect-video w-full">
        <video
          className="absolute inset-0 h-full w-full object-contain"
          preload="metadata"
          muted
          loop
          playsInline
          controls
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

function DetailFrame({ src }: { src: string }) {
  return (
    <div className="box-border w-full max-w-full rounded-2xl border border-[#C9A96E]/45 bg-[#1A1010] p-2 sm:p-3">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
        <video
          className="absolute inset-0 h-full w-full object-contain"
          preload="metadata"
          muted
          loop
          playsInline
          controls
        >
          <source src={src} type="video/mp4" />
        </video>
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
            Discover the Details
          </h2>
        </div>

        <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:gap-5">
          {LED_VIDEOS.map((video) => (
            <LedTile key={video.id} src={video.src} />
          ))}
        </div>

        {DETAIL_VIDEOS.length > 0 && (
          <div className="mx-auto mt-6 grid w-full max-w-5xl gap-4 overflow-visible sm:mt-8 sm:grid-cols-2">
            {DETAIL_VIDEOS.map((video) => (
              <DetailFrame key={video.id} src={video.src} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
