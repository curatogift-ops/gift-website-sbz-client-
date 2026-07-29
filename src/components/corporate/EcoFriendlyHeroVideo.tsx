import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';

type EcoVideo = {
  id: string;
  src: string;
  title: string;
  caption: string;
};

/**
 * Add more files under public/images/corporate/ and append entries here (2–3 slides).
 * Arrows + swipe activate automatically when length > 1.
 */
const ECO_VIDEOS: EcoVideo[] = [
  {
    id: 'eco-hero-1',
    src: '/images/corporate/eco-friendly-hero.mp4',
    title: 'Eco-friendly corporate gifting showcase',
    caption: 'Sustainable gifts · premium finish',
  },
  // Add when ready:
  // {
  //   id: 'eco-hero-2',
  //   src: '/images/corporate/eco-friendly-hero-2.mp4',
  //   title: 'Bamboo & cork collection',
  //   caption: 'Conscious corporate programs',
  // },
  // {
  //   id: 'eco-hero-3',
  //   src: '/images/corporate/eco-friendly-hero-3.mp4',
  //   title: 'Recycled packaging stories',
  //   caption: 'Brand-ready eco hampers',
  // },
];

/**
 * Mobile-first eco video carousel with gold border finishing, arrows, and swipe.
 * Renders immediately after the Eco-Friendly Corporate Gifting section.
 */
export default function EcoFriendlyHeroVideo() {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const hasMultiple = ECO_VIDEOS.length > 1;

  const syncCarousel = useCallback((carouselApi: CarouselApi) => {
    if (!carouselApi) return;
    setActiveIndex(carouselApi.selectedScrollSnap());
    setCanScrollPrev(carouselApi.canScrollPrev());
    setCanScrollNext(carouselApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!api) return;
    syncCarousel(api);
    api.on('select', syncCarousel);
    api.on('reInit', syncCarousel);
    return () => {
      api.off('select', syncCarousel);
      api.off('reInit', syncCarousel);
    };
  }, [api, syncCarousel]);

  // Play only the active slide
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

  const goPrev = () => api?.scrollPrev();
  const goNext = () => api?.scrollNext();

  return (
    <section
      className="relative scroll-mt-28 overflow-hidden bg-[var(--cream)] pb-8 pt-5 sm:pb-10 sm:pt-6 lg:pb-12 lg:pt-8"
      aria-label="Eco-friendly corporate gifting videos"
    >
      {/* Soft section separators */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3D7A52]/35 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent"
        aria-hidden
      />

      <div className="section-container relative">
        {/* Carousel controls — heading lives with the eco product section above */}
        <div className="mb-3 flex justify-end gap-2 sm:mb-4">
            <button
              type="button"
              onClick={goPrev}
              disabled={!hasMultiple || !canScrollPrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C9A96E]/55 bg-white text-[#2D5A3D] shadow-[0_6px_16px_-8px_rgba(45,90,61,0.35)] transition enabled:active:scale-95 enabled:hover:border-[#3D7A52] enabled:hover:bg-[#F7FBF7] disabled:cursor-not-allowed disabled:opacity-35"
              aria-label="Previous video"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2.25} aria-hidden />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={!hasMultiple || !canScrollNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C9A96E]/55 bg-white text-[#2D5A3D] shadow-[0_6px_16px_-8px_rgba(45,90,61,0.35)] transition enabled:active:scale-95 enabled:hover:border-[#3D7A52] enabled:hover:bg-[#F7FBF7] disabled:cursor-not-allowed disabled:opacity-35"
              aria-label="Next video"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2.25} aria-hidden />
            </button>
        </div>

        {/* Bordered video stage — prevents the “stuck / unfinished” full-bleed look */}
        <div className="relative">
          <div className="rounded-[1.25rem] bg-gradient-to-br from-[#C9A96E] via-[#E8D5A8] to-[#9D7D47] p-[1.5px] shadow-[0_22px_50px_-22px_rgba(45,90,61,0.4)] sm:rounded-[1.45rem] sm:p-[2px]">
            <div className="rounded-[1.15rem] bg-[#FFFDF9] p-1.5 sm:rounded-[1.35rem] sm:p-2 lg:p-2.5">
              <div className="relative overflow-hidden rounded-[0.95rem] ring-1 ring-[#2D5A3D]/15 sm:rounded-[1.15rem]">
                <Carousel
                  setApi={setApi}
                  opts={{
                    align: 'start',
                    loop: hasMultiple,
                    dragFree: false,
                    containScroll: 'trimSnaps',
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-0">
                    {ECO_VIDEOS.map((video, index) => (
                      <CarouselItem key={video.id} className="basis-full pl-0">
                        <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#1A1010] sm:aspect-[16/9] md:aspect-[21/9]">
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

                          {/* Soft vignette + caption bar for finishing */}
                          <div
                            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(26,16,16,0.55)_0%,rgba(26,16,16,0.12)_28%,transparent_48%),linear-gradient(to_bottom,rgba(26,16,16,0.2)_0%,transparent_22%)]"
                            aria-hidden
                          />
                          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 sm:p-4 lg:p-5">
                            <div className="min-w-0">
                              <p className="truncate font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-[#C9A96E] sm:text-[11px]">
                                {video.caption}
                              </p>
                              <p className="mt-0.5 truncate font-serif text-[14px] font-medium text-white sm:text-[16px]">
                                {video.title}
                              </p>
                            </div>
                            {hasMultiple && (
                              <span className="shrink-0 rounded-full border border-white/25 bg-black/35 px-2.5 py-1 font-sans text-[10px] font-bold tabular-nums tracking-wider text-white backdrop-blur-sm">
                                {String(index + 1).padStart(2, '0')} / {String(ECO_VIDEOS.length).padStart(2, '0')}
                              </span>
                            )}
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>

                {/* Overlay arrows on the video frame (mobile + desktop) */}
                {hasMultiple && (
                  <>
                    <button
                      type="button"
                      onClick={goPrev}
                      disabled={!canScrollPrev}
                      className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-[#1A1010]/55 text-white shadow-lg backdrop-blur-md transition enabled:active:scale-95 enabled:hover:bg-[#1A1010]/75 disabled:opacity-30 sm:left-3 sm:h-11 sm:w-11"
                      aria-label="Previous video"
                    >
                      <ChevronLeft className="h-5 w-5" strokeWidth={2.25} aria-hidden />
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      disabled={!canScrollNext}
                      className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-[#1A1010]/55 text-white shadow-lg backdrop-blur-md transition enabled:active:scale-95 enabled:hover:bg-[#1A1010]/75 disabled:opacity-30 sm:right-3 sm:h-11 sm:w-11"
                      aria-label="Next video"
                    >
                      <ChevronRight className="h-5 w-5" strokeWidth={2.25} aria-hidden />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dots + swipe hint */}
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
                  onClick={() => api?.scrollTo(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'w-7 bg-[#2D5A3D]'
                      : 'w-2 bg-[#C9A96E]/45 hover:bg-[#C9A96E]/80'
                  }`}
                />
              ))}
            </div>
          ) : (
            <div className="flex h-1.5 w-12 overflow-hidden rounded-full bg-[#E8DDC8]" aria-hidden>
              <span className="h-full w-full rounded-full bg-gradient-to-r from-[#3D7A52] to-[#C9A96E]" />
            </div>
          )}

          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8C847C] sm:text-[11px]">
            {hasMultiple
              ? 'Swipe or use arrows to explore more videos'
              : 'More showcase videos coming soon'}
          </p>
        </div>
      </div>
    </section>
  );
}
