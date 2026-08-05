import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';

type ShowcaseVideo = {
  id: string;
  src: string;
  title: string;
};

const SHOWCASE_VIDEOS: ShowcaseVideo[] = [
  {
    id: 'eco-friendly-hero',
    src: '/images/corporate/eco-friendly-hero.mp4',
    title: 'Eco-Friendly Corporate Gifting',
  },
];

const AUTO_ADVANCE_MS = 12_000;

/**
 * Product showcase video carousel — placed before Eco-Friendly Corporate Gifting.
 * Captions removed per brief; auto-scrolls between clips when more than one is present.
 */
export default function EcoFriendlyHeroVideo() {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasMultiple = SHOWCASE_VIDEOS.length > 1;

  const syncCarousel = useCallback((carouselApi: CarouselApi) => {
    if (!carouselApi) return;
    setActiveIndex(carouselApi.selectedScrollSnap());
    setCanScrollPrev(carouselApi.canScrollPrev());
    setCanScrollNext(carouselApi.canScrollNext());
  }, []);

  const clearAutoTimer = useCallback(() => {
    if (autoTimerRef.current) {
      clearTimeout(autoTimerRef.current);
      autoTimerRef.current = null;
    }
  }, []);

  const goNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const goPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

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

  useEffect(() => {
    clearAutoTimer();

    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeIndex) {
        video.currentTime = 0;
        void video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });

    if (!hasMultiple || !api) return;

    const activeVideo = videoRefs.current[activeIndex];
    let advanced = false;

    const advanceOnce = () => {
      if (advanced) return;
      advanced = true;
      clearAutoTimer();
      api.scrollNext();
    };

    const onEnded = () => advanceOnce();
    activeVideo?.addEventListener('ended', onEnded);

    const startBackup = () => {
      clearAutoTimer();
      const durationMs =
        activeVideo && Number.isFinite(activeVideo.duration) && activeVideo.duration > 0
          ? Math.min(activeVideo.duration * 1000 + 600, 90_000)
          : AUTO_ADVANCE_MS;
      autoTimerRef.current = setTimeout(advanceOnce, durationMs);
    };

    if (activeVideo && (!Number.isFinite(activeVideo.duration) || activeVideo.duration === 0)) {
      activeVideo.addEventListener('loadedmetadata', startBackup, { once: true });
      autoTimerRef.current = setTimeout(advanceOnce, AUTO_ADVANCE_MS);
    } else {
      startBackup();
    }

    return () => {
      clearAutoTimer();
      activeVideo?.removeEventListener('ended', onEnded);
      activeVideo?.removeEventListener('loadedmetadata', startBackup);
    };
  }, [activeIndex, api, clearAutoTimer, hasMultiple]);

  return (
    <section
      className="relative scroll-mt-28 overflow-hidden bg-[var(--cream)] pb-8 pt-5 sm:pb-10 sm:pt-6 lg:pb-12 lg:pt-8"
      aria-label="Corporate product showcase videos"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent"
        aria-hidden
      />

      <div className="section-container relative">
        <div className={`mb-3 justify-end gap-2 sm:mb-4 ${hasMultiple ? 'flex' : 'hidden'}`}>
          <button
            type="button"
            onClick={goPrev}
            disabled={!hasMultiple || !canScrollPrev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C9A96E]/55 bg-white text-[#4A1020] shadow-[0_6px_16px_-8px_rgba(74,16,32,0.25)] transition enabled:active:scale-95 enabled:hover:border-[#4A1020] enabled:hover:bg-[#FFFDF9] disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Previous video"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.25} aria-hidden />
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={!hasMultiple || !canScrollNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C9A96E]/55 bg-white text-[#4A1020] shadow-[0_6px_16px_-8px_rgba(74,16,32,0.25)] transition enabled:active:scale-95 enabled:hover:border-[#4A1020] enabled:hover:bg-[#FFFDF9] disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Next video"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.25} aria-hidden />
          </button>
        </div>

        <div className="relative">
          <div className="rounded-[1.25rem] bg-gradient-to-br from-[#C9A96E] via-[#E8D5A8] to-[#9D7D47] p-[1.5px] shadow-[0_22px_50px_-22px_rgba(74,16,32,0.35)] sm:rounded-[1.45rem] sm:p-[2px]">
            <div className="rounded-[1.15rem] bg-[#FFFDF9] p-1.5 sm:rounded-[1.35rem] sm:p-2 lg:p-2.5">
              <div className="relative overflow-hidden rounded-[0.95rem] ring-1 ring-[#4A1020]/10 sm:rounded-[1.15rem]">
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
                    {SHOWCASE_VIDEOS.map((video, index) => (
                      <CarouselItem key={video.id} className="basis-full pl-0">
                        <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#1A1010] sm:aspect-[16/9] md:aspect-[21/9]">
                          <video
                            ref={(node) => {
                              videoRefs.current[index] = node;
                            }}
                            className="absolute inset-0 h-full w-full object-cover object-center"
                            src={video.src}
                            muted
                            loop={!hasMultiple}
                            playsInline
                            preload={index === 0 ? 'auto' : 'metadata'}
                            controls={false}
                            aria-label={video.title}
                          />

                          {hasMultiple && (
                            <div className="absolute bottom-3 right-3 z-10 sm:bottom-4 sm:right-4">
                              <span className="rounded-full border border-white/25 bg-black/35 px-2.5 py-1 font-sans text-[10px] font-bold tabular-nums tracking-wider text-white backdrop-blur-sm">
                                {String(index + 1).padStart(2, '0')} /{' '}
                                {String(SHOWCASE_VIDEOS.length).padStart(2, '0')}
                              </span>
                            </div>
                          )}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>

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

        <div
          className={`mt-4 flex-col items-center gap-2.5 sm:mt-5 ${hasMultiple ? 'flex' : 'hidden'}`}
        >
          <div className="flex items-center gap-2" role="tablist" aria-label="Video slides">
            {SHOWCASE_VIDEOS.map((video, index) => (
              <button
                key={video.id}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Go to video ${index + 1}`}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'w-7 bg-[#4A1020]'
                    : 'w-2 bg-[#C9A96E]/45 hover:bg-[#C9A96E]/80'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
