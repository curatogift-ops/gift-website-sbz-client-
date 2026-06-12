import AppImage from '@/components/ui/AppImage';

const GALLERY_ROW_TOP = [
  'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=480&h=640',
  'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=480&h=640',
  'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=480&h=640',
  'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&q=80&w=480&h=640',
  'https://images.unsplash.com/photo-1561715276-a2d087060f1d?auto=format&fit=crop&q=80&w=480&h=640',
  'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=480&h=640',
  'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=480&h=640',
  'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?auto=format&fit=crop&q=80&w=480&h=640',
];

const GALLERY_ROW_BOTTOM = [
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=480&h=640',
  'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=480&h=640',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=480&h=640',
  'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=480&h=640',
  'https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&q=80&w=480&h=640',
  'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=480&h=640',
  'https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?auto=format&fit=crop&q=80&w=480&h=640',
  'https://images.unsplash.com/photo-1549007953-2f2dc0b24019?auto=format&fit=crop&q=80&w=480&h=640',
];

function GalleryTile({ src }: { src: string }) {
  return (
    <div className="relative h-[200px] w-[140px] shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.45)] sm:h-[240px] sm:w-[168px] md:h-[280px] md:w-[200px] lg:h-[320px] lg:w-[228px]">
      <AppImage
        src={src}
        alt=""
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
          <GalleryTile key={`${direction}-${i}`} src={src} />
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
      aria-hidden
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
