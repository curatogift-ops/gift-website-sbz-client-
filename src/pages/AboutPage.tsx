import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AppImage from '@/components/ui/AppImage';
import BulkEnquiryFormSection from '@/components/shared/BulkEnquiryFormSection';

const FOUNDER_PARAGRAPHS = [
  'Entrepreneurship has never been about simply chasing success—it has always been about creating possibilities, embracing innovation, and staying ahead of change.',
  'My professional journey began in 1997 in the pharmaceutical distribution industry, where I spent a decade building a strong foundation in business, relationships, and large-scale distribution. In 2007, I moved into the technology sector, becoming a distributor for Apple and BlackBerry handsets across Karnataka’s modern retail network.',
  'My entrepreneurial journey continued with the launch of Coconut Express, which grew into a network of 10 stores and over 50 mobile carts across Bengaluru. In 2012–2013, I also introduced one of India’s early dedicated Nail Art concepts, helping bring a new lifestyle trend to the market.',
  'Innovation has remained the common thread throughout my journey. Since 2007, I have been associated with the corporate gifting industry, and from 2014 onwards, I focused on building a business driven by creativity, quality, and innovation. Today, I have the privilege of working with leading corporates across Bengaluru, creating thoughtfully curated gifting solutions that make a lasting impression.',
  'I believe businesses must continuously evolve with changing markets, technology, and generations. Every new opportunity is a chance to learn, adapt, and create something meaningful.',
  'My philosophy is simple: Never stop learning. Stay relevant. Keep evolving. Think bigger, dream fearlessly, and always strive to create something extraordinary.',
] as const;

/** IMPLEMENTATION_NOTES: Founder portrait → public/images/about/founder.jpg */
const FOUNDER_IMAGE = '/images/about/founder.jpg';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Navbar />

      <main className="page-main-offset flex-grow">
        <section className="relative overflow-hidden border-b border-border bg-[var(--cream)] py-14 sm:py-18 lg:py-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(201,169,110,0.2) 1px, transparent 0)',
              backgroundSize: '28px 28px',
            }}
            aria-hidden
          />
          <div className="section-container relative text-center">
            <p className="eyebrow">About Giftz Gallerei</p>
            <h1 className="mt-3 font-serif text-[clamp(2rem,4.5vw,3.25rem)] font-semibold tracking-tight text-primary">
              Meet the Founder
            </h1>
            <p className="mt-3 font-serif text-[1.25rem] italic text-[#9D7D47] sm:text-[1.4rem]">
              Vinod Chajjer
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20" aria-labelledby="founder-bio-heading">
          <div className="section-container">
            <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
              <div className="relative mx-auto w-full max-w-md lg:mx-0">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-[#1A1010]">
                  <AppImage
                    src={FOUNDER_IMAGE}
                    alt="Vinod Chajjer, Founder of Giftz Gallerei"
                    fill
                    sizes="(max-width:1024px) 90vw, 420px"
                    className="object-cover"
                  />
                  {/* Placeholder overlay when image is missing — AppImage still renders; CSS handles empty feel */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1A1010]/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                    <p className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A96E]">
                      Founder
                    </p>
                    <p className="mt-1 font-serif text-xl font-semibold text-white">Vinod Chajjer</p>
                  </div>
                </div>
                <p className="mt-3 text-center text-[11px] text-muted-foreground lg:text-left">
                  Portrait placeholder — add <code className="text-[#9D7D47]">public/images/about/founder.jpg</code>
                </p>
              </div>

              <article>
                <h2 id="founder-bio-heading" className="sr-only">
                  Founder biography
                </h2>
                <div className="space-y-5 font-serif text-[15px] leading-[1.75] text-foreground/90 sm:text-[16px] sm:leading-[1.8]">
                  {FOUNDER_PARAGRAPHS.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <BulkEnquiryFormSection
          id="corporate-gift-enquiry"
          title="Corporate Gift Enquiry"
          imageSrc="/images/corporate/hero/corporate-hero-hampers.jpeg"
          imageAlt="Corporate gifting consultation with Giftz Gallerei"
        />
      </main>

      <Footer />
    </div>
  );
}
