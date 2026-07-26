import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type EcoVideo = {
  id: string;
  src: string;
  title: string;
};

/**
 * Add more MP4s under public/images/corporate/ and append entries here.
 * Carousel arrows + swipe activate automatically when length > 1.
 */
const ECO_VIDEOS: EcoVideo[] = [
  {
    id: 'eco-hero-1',
    src: '/images/corporate/eco-friendly-hero.mp4',
    title: 'Eco-friendly corporate gifting showcase',
  },
  // Ready for upcoming videos:
  // { id: 'eco-hero-2', src: '/images/corporate/eco-friendly-hero-2.mp4', title: '...' },
  // { id: 'eco-hero-3', src: '/images/corporate/eco-friendly-hero-3.mp4', title: '...' },
];

/**
 * Polished, mobile-first eco video carousel — bordered frame, arrows, swipe.
 * Placed immediately after the Eco-Friendly Corporate Gifting section.
 */
export default function EcoFriendlyHeroVideo() {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultiple = ECO_VIDEOS.length > 1;

  const updateActiveFromScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>('[data-eco-video-slide]');
    if (!slide) return;
    const step = slide.offsetWidth;
    if (step <= 0) return;
    const index = Math.round(el.scrollLeft / step);
    setActiveIndex(Math.min(ECO_VIDEOS.length - 1, Math.max(0, index)));
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateActiveFromScroll();
    el.addEventListener('scroll', updateActiveFromScroll, { passive: true });
    window.addEventListener('resize', updateActiveFromScroll);
    return () => {
      el.removeEventListener('scroll', updateActiveFromScroll);
      window.removeEventListener('resize', updateActiveFromScroll);
    };
  }, [updateActiveFromScroll]);

  // Only the active slide plays
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeIndex) {
        void video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [activeIndex]);

  const goTo = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>('[data-eco-video-slide]');
    if (!slide) return;
    const next = Math.min(ECO_VIDEOS.length - 1, Math.max(0, index));
    el.scrollTo({ left: next * slide.offsetWidth, behavior: 'smooth' });
    setActiveIndex(next);
  };

  const goPrev = () => goTo(activeIndex - 1);
  const goNext = () => goTo(activeIndex + 1);

  return (
    <section
      className="relative scroll-mt-28 bg-[var(--cream)] py-6 sm:py-8 lg:py-10"
      aria-label="Eco-friendly corporate gifting videos"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3D7A52]/30 to-transparent"
        aria-hidden
      />

      <div className="section-container relative">
        <div className="mb-4 flex items-end justify-between gap-3 sm:mb-5">
          <div className="min-w-0">
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#3D7A52] sm:text-[11px]">
              Watch & explore
            </p>
            <h2 className="mt-1 font-serif text-[18px] font-medium leading-snug text-[#1A1010] sm:text-[22px]">
              Eco-Friendly Gifting in Action
            </h2>
          </div>

          {/* Always show arrows so carousel structure is clear; enable when 2+ videos */}
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              disabled={!hasMultiple || activeIndex === 0}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E3D9C8] bg-white text-[#2D5A3D] shadow-sm transition enabled:hover:border-[#3D7A52]/45 enabled:hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous video"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2.25} aria-hidden />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={!hasMultiple || activeIndex === ECO_VIDEOS.length - 1}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E3D9C8] bg-white text-[#2D5A3D] shadow-sm transition enabled:hover:border-[#3D7A52]/45 enabled:hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next video"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2.25} aria-hidden />
            </button>
          </div>
        </div>

        <div className="relative">
          {/* Gold/cream border frame — fixes the unfinished “stuck” look */}
          <div className="rounded-[1.15rem] border border-[#C9A96E]/50 bg-gradient-to-br from-[#FFFDF9] via-white to-[#F3EDE2] p-1.5 shadow-[0_18px_48px_-20px_rgba(45,90,61,0.28)] sm:rounded-[1.35rem] sm:p-2 lg:rounded-[1.5rem] lg:p-2.5">
            <div className="overflow-hidden rounded-[0.95rem] ring-1 ring-[#2D5A3D]/12 sm:rounded-[1.1rem] lg:rounded-[1.2rem]">
              <div
                ref={trackRef}
                className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth"
              >
                {ECO_VIDEOS.map((video, index) => (
                  <div
                    key={video.id}
                    data-eco-video-slide
                    className="relative aspect-[16/10] w-full shrink-0 snap-center overflow-hidden bg-[#1A1010] sm:aspect-[16/9] md:aspect-[1024/435]"
                  >
                    <video
                      ref={(node) => {
                        videoRefs.current[index] = node;
                      }}
                      className="absolute inset-0 h-full w-full object-cover object-center"
                      src={video.src}
                      muted
                      loop
                      playsInline
                      preload={index === 0 ? 'metadata' : 'none'}
                      controls={false}
                      aria-label={video.title}
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(26,16,16,0.28)_0%,transparent_32%),linear-gradient(to_bottom,rgba(26,16,16,0.14)_0%,transparent_26%)]"
                      aria-hidden
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={goPrev}
                disabled={activeIndex === 0}
                className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#E3D9C8] bg-white/95 text-[#2D5A3D] shadow-[0_12px_28px_-12px_rgba(26,16,16,0.45)] backdrop-blur-sm transition enabled:hover:border-[#C9A96E] disabled:opacity-35 md:flex"
                aria-label="Previous video"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={2.25} aria-hidden />
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={activeIndex === ECO_VIDEOS.length - 1}
                className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-[#E3D9C8] bg-white/95 text-[#2D5A3D] shadow-[0_12px_28px_-12px_rgba(26,16,16,0.45)] backdrop-blur-sm transition enabled:hover:border-[#C9A96E] disabled:opacity-35 md:flex"
                aria-label="Next video"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2.25} aria-hidden />
              </button>
            </>
          )}
        </div>

        <div className="mt-4 flex flex-col items-center gap-2.5 sm:mt-5">
          {hasMultiple ? (
            <div className="flex items-center gap-2" role="tablist" aria-label="Video slides">
              {ECO_VIDEOS.map((video, index) => (
                <button
                  key={video.id}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`Go to video ${index + 1}`}
                  onClick={() => goTo(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'w-6 bg-[#2D5A3D]'
                      : 'w-2 bg-[#C9A96E]/45 hover:bg-[#C9A96E]/75'
                  }`}
                />
              ))}
            </div>
          ) : (
            <div className="h-1.5 w-10 rounded-full bg-[#C9A96E]/55" aria-hidden />
          )}

          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8C847C] sm:text-[11px]">
            {hasMultiple ? 'Swipe to explore more videos →' : 'Eco gifting showcase'}
          </p>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/35 to-transparent"
        aria-hidden
      />
    </section>
  );
}
