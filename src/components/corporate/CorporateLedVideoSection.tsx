/**
 * Discover the Details — four product clips with centre play/pause
 * and a separate mute control.
 */
import ManagedVideo from '@/components/corporate/ManagedVideo';

const LED_VIDEOS = [
  { id: 'led-1', src: '/images/corporate/showcase-videos/xech-product-showcase.mp4', label: 'Xech product showcase' },
  { id: 'led-2', src: '/images/corporate/showcase-videos/eon-voltra.mp4', label: 'Eon Voltra showcase' },
  { id: 'led-3', src: '/images/corporate/showcase-videos/rico-slow-juicer.mp4', label: 'Rico slow juicer showcase' },
  { id: 'led-4', src: '/images/corporate/eco-friendly-hero.mp4', label: 'Eco-friendly gifting showcase' },
] as const;

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
            <div
              key={video.id}
              className="box-border min-w-0 overflow-hidden rounded-xl border border-[#C9A96E]/35 bg-[#0D0A0A]"
            >
              <ManagedVideo src={video.src} label={video.label} autoPlay loop />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
