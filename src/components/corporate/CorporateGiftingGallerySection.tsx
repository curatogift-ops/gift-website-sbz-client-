import AppImage from '@/components/ui/AppImage';

const BANNER_IMG = (index: number) =>
  `/images/corporate/scrolling-banner/banner-${String(index).padStart(2, '0')}.jpeg`;

const GALLERY_ROW_TOP = Array.from({ length: 9 }, (_, i) => BANNER_IMG(i + 1));
const GALLERY_ROW_BOTTOM = Array.from({ length: 9 }, (_, i) => BANNER_IMG(i + 10));

function GalleryTile({ src, index }: { src: string; index: number }) {
  return (
    <div className="relative h-[200px] w-[140px] shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.45)] sm:h-[240px] sm:w-[168px] md:h-[280px] md:w-[200px] lg:h-[320px] lg:w-[228px]">
      <AppImage
        src={src}
        alt={`Corporate gifting showcase ${index + 1}`}
        fill
        sizes="(max-width: 640px) 140px, 228px"
        className="pointer-events-none object-cover select-none"
        draggable={false}
      />
    </div>
  );
}

function MarqueeRow({ images, direction }: { images: string[]; direction: 'left' | 'right' }) {
  const track = [...images, ...images];

  return (
    <div className="corporate-gallery-marquee overflow-hidden" aria-hidden>
      <div
        className={
          direction === 'left'
            ? 'corporate-gallery-track corporate-gallery-track--left'
            : 'corporate-gallery-track corporate-gallery-track--right'
        }
      >
        {track.map((src, i) => (
          <GalleryTile key={`${direction}-${i}`} src={src} index={i % images.length} />
        ))}
      </div>
    </div>
  );
}

/** Dual-row lifestyle gallery — top scrolls left, bottom scrolls right. No text. */
export default function CorporateGiftingGallerySection() {
  return (
    <section
      className="relative overflow-hidden bg-[#1A1010] py-6 sm:py-8 lg:py-10"
      aria-label="Corporate gifting showcase"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(201,169,110,0.12) 0, transparent 45%), radial-gradient(circle at 80% 70%, rgba(107,30,48,0.2) 0, transparent 50%)',
        }}
        aria-hidden
      />
      <div className="relative flex flex-col gap-4 sm:gap-5">
        <MarqueeRow images={GALLERY_ROW_TOP} direction="left" />
        <MarqueeRow images={GALLERY_ROW_BOTTOM} direction="right" />
      </div>
    </section>
  );
}
