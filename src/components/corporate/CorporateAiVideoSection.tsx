import ManagedVideo from '@/components/corporate/ManagedVideo';

const VIDEO_SRC = '/videos/experience-our-corporate-gifting.mp4';

export default function CorporateAiVideoSection() {
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
            A short film of curated hampers, branding, and delivery.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-2xl border border-border shadow-lg sm:mt-10">
          <ManagedVideo src={VIDEO_SRC} label="Experience Our Corporate Gifting" />
        </div>
      </div>
    </section>
  );
}
