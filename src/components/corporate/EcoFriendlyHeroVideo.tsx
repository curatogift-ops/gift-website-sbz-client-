/**
 * Full-width hero video for the Eco-Friendly Corporate Gifting section.
 * Served from /images/ so Vercel static rewrites do not intercept the file.
 */
export default function EcoFriendlyHeroVideo() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#1A1010]"
      aria-label="Eco-friendly corporate gifting video"
    >
      <div className="relative mx-auto w-full max-w-[2500px]">
        <div className="relative h-[280px] w-full overflow-hidden sm:h-[360px] md:h-auto md:aspect-[1024/435] lg:aspect-[1024/410] xl:aspect-[1024/395]">
          <video
            className="absolute inset-0 h-full w-full object-cover object-center"
            src="/images/corporate/eco-friendly-hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Eco-friendly corporate gifting showcase"
          />
        </div>
      </div>
    </section>
  );
}
