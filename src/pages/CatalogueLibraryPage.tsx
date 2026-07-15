import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BulkEnquiryFormSection from '@/components/shared/BulkEnquiryFormSection';
import {
  ALL_CATALOGUES,
  CATALOGUE_NAV,
  CATALOGUE_SECTIONS,
  type CatalogueItem,
} from '@/config/catalogueLibraryData';
import { cn } from '@/utils/cn';

const STICKY_TOP =
  'top-[var(--site-header-mobile)] md:top-[var(--site-header-tablet)] xl:top-[var(--site-header-desktop)] 2xl:top-[var(--site-header-desktop-lg)]';

async function downloadCatalogueFile(url: string, fileName: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = await res.arrayBuffer();
    const head = new Uint8Array(buffer.slice(0, 5));
    const signature = String.fromCharCode(...head);
    const looksLikePdf = signature.startsWith('%PDF');
    const looksLikeHtml = signature.toLowerCase().includes('<!') || signature.toLowerCase().includes('<ht');
    const isPptx = fileName.toLowerCase().endsWith('.pptx');

    if (looksLikeHtml || (!looksLikePdf && !isPptx)) {
      window.alert(
        'This catalogue file is not available right now. Please try again later or contact us on WhatsApp.',
      );
      return;
    }

    const blob = new Blob([buffer], {
      type: isPptx
        ? 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        : 'application/pdf',
    });
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(objectUrl);
  } catch {
    window.alert(
      'Unable to download this catalogue. Please try again or contact us on WhatsApp.',
    );
  }
}

function CatalogueCard({ item }: { item: CatalogueItem }) {
  const fileName = item.file.split('/').pop() ?? 'catalogue.pdf';

  return (
    <article className="flex h-full flex-col">
      <a
        href={item.file}
        target="_blank"
        rel="noopener noreferrer"
        className="group block overflow-hidden rounded-sm border border-[#E5D9C8] bg-[#F7F1EA] shadow-[0_2px_10px_-6px_rgba(26,16,16,0.18)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-14px_rgba(74,16,32,0.28)]"
        aria-label={`Open ${item.title}`}
      >
        {/* Catalogue cover — book-style frame like reference sites */}
        <div
          className="relative aspect-square overflow-hidden"
          style={{ backgroundColor: item.coverAccent }}
        >
          <div
            className="absolute inset-3 rounded-[2px] border border-[#C9A96E]/45 bg-[linear-gradient(180deg,#FFFBF6_0%,#F3E8D8_100%)] sm:inset-4"
            aria-hidden
          />
          <div className="absolute inset-3 flex flex-col items-center justify-between px-4 py-5 text-center sm:inset-4 sm:px-5 sm:py-6">
            <p className="font-sans text-[9px] font-bold uppercase tracking-[0.22em] text-[#9D7D47]">
              giftz gallerei
            </p>
            <div className="px-1">
              <div className="mx-auto mb-3 h-px w-10 bg-[#C9A96E]/70" aria-hidden />
              <p className="line-clamp-3 font-serif text-[15px] font-semibold leading-snug text-[#4A1020] sm:text-[16px]">
                {item.title}
              </p>
              <div className="mx-auto mt-3 h-px w-10 bg-[#C9A96E]/70" aria-hidden />
            </div>
            <p className="font-sans text-[9px] font-semibold uppercase tracking-[0.14em] text-[#9D7D47]/90">
              {item.shortCategory}
            </p>
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[#4A1020]/0 transition group-hover:bg-[#4A1020]/[0.06]" />
        </div>
      </a>

      <h3 className="mt-3 line-clamp-2 min-h-[2.75rem] text-center font-sans text-[13px] font-medium leading-snug text-[#3A2A2A] sm:text-[14px]">
        {item.title}
      </h3>

      <button
        type="button"
        onClick={() => void downloadCatalogueFile(item.file, fileName)}
        className="mt-3 inline-flex w-full items-center justify-center bg-[#4A1020] px-3 py-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#5C1629]"
      >
        Download PDF
      </button>
    </article>
  );
}

export default function CatalogueLibraryPage() {
  const [activeNav, setActiveNav] = useState<'all' | string>('all');

  const visibleItems = useMemo(() => {
    if (activeNav === 'all') return ALL_CATALOGUES;
    return ALL_CATALOGUES.filter((item) => item.categoryId === activeNav);
  }, [activeNav]);

  const awardsSection = CATALOGUE_SECTIONS.find((s) => s.id === 'awards-recognition');

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Navbar />

      <main className="page-main-offset flex-grow bg-[#FBF7F2]">
        <section className="border-b border-[#E8DFD2] bg-[#FBF7F2] pt-8 pb-6 sm:pt-10 sm:pb-8">
          <div className="section-container">
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center gap-1.5 text-[12px] text-muted-foreground"
            >
              <Link to="/corporate" className="transition-colors hover:text-primary">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5 shrink-0" />
              <span className="font-medium text-foreground">Corporate Gift Catalogue</span>
            </nav>

            <h1 className="text-center font-serif text-[28px] font-semibold tracking-tight text-[#4A1020] sm:text-[34px] lg:text-[40px]">
              Corporate Gift Catalogue
            </h1>
          </div>
        </section>

        <div
          className={cn(
            'sticky z-40 border-b border-[#E8DFD2] bg-[#FBF7F2]/95 backdrop-blur-md',
            STICKY_TOP,
          )}
        >
          <div className="section-container">
            <nav
              className="no-scrollbar -mx-4 flex justify-start gap-2.5 overflow-x-auto px-4 py-4 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
              aria-label="Catalogue categories"
            >
              {CATALOGUE_NAV.map((nav) => {
                const isActive = activeNav === nav.id;
                return (
                  <button
                    key={nav.id}
                    type="button"
                    onClick={() => setActiveNav(nav.id)}
                    className={cn(
                      'shrink-0 rounded-md border px-4 py-2 font-sans text-[12px] font-semibold tracking-wide transition-all sm:text-[13px]',
                      isActive
                        ? 'border-[#4A1020] bg-[#4A1020] text-white'
                        : 'border-[#C9A96E]/70 bg-white text-[#4A1020] hover:border-[#4A1020] hover:bg-[#4A1020]/[0.04]',
                    )}
                  >
                    {nav.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="section-container py-10 sm:py-12 lg:py-14">
          {visibleItems.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#E8DFD2] bg-white px-6 py-16 text-center">
              <p className="font-serif text-xl font-semibold text-[#4A1020]">No catalogues yet</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try another category, or check back soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-x-8 sm:gap-y-12">
              {visibleItems.map((item: CatalogueItem) => (
                <CatalogueCard key={item.id} item={item} />
              ))}
            </div>
          )}

          {activeNav === 'all' && awardsSection && (
            <div className="mt-14 rounded-xl border border-dashed border-[#E8DFD2] bg-white px-6 py-10 text-center">
              <p className="font-serif text-lg font-semibold text-[#4A1020]">
                Awards &amp; Recognition
              </p>
              <p className="mt-2 text-sm text-muted-foreground">Coming soon</p>
            </div>
          )}
        </div>

        <BulkEnquiryFormSection
          title="Bulk Order Enquiry"
          subtitle="Share your requirements and our team will send curated catalogue picks with pricing."
        />
      </main>

      <Footer />
    </div>
  );
}
