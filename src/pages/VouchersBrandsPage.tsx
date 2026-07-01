import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CorporateEnquiryDialog from '@/components/corporate/CorporateEnquiryDialog';
import { VOUCHER_BRANDS } from '@/config/voucherBrandsData';

const LOGO_API_TOKEN = 'pk_CMw_iB1FQuWiQT75l8pqZg';

function brandLogoUrl(domain: string): string {
  return `https://img.logo.dev/${domain}?token=${LOGO_API_TOKEN}&size=120`;
}

function brandLogoFallback(name: string): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f0ebe6&color=4A1020&bold=true&size=120`;
}

export default function VouchersBrandsPage() {
  const [query, setQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const filteredBrands = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return VOUCHER_BRANDS;
    return VOUCHER_BRANDS.filter((brand) => brand.name.toLowerCase().includes(q));
  }, [query]);

  const closeEnquiry = () => setSelectedBrand(null);

  return (
    <div className="corporate-page flex min-h-screen flex-col bg-white font-sans">
      <Navbar />

      <main className="page-main-offset flex-grow">
        <section className="border-b border-border bg-[var(--cream)] py-10 sm:py-14 lg:py-16">
          <div className="section-container">
            <Link
              to="/corporate#awards-trophies"
              className="mb-5 inline-flex items-center gap-2 text-[12px] font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
              Back to Trophies &amp; vouchers
            </Link>

            <div className="max-w-3xl">
              <p className="eyebrow">Corporate vouchers</p>
              <h1 className="section-heading-corporate mt-3">Voucher brands</h1>
              <p className="section-lede mt-4">
                Browse {VOUCHER_BRANDS.length}+ premium partner brands available for corporate gift
                vouchers and employee rewards. Click any brand to submit an enquiry.
              </p>
            </div>

            <div className="relative mt-8 max-w-xl">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                strokeWidth={2}
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search brands…"
                className="w-full rounded-md border border-border bg-white py-3 pl-11 pr-4 text-[14px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15"
                aria-label="Search voucher brands"
              />
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-14 lg:py-16" aria-label="Voucher brand list">
          <div className="section-container">
            <p className="mb-6 text-sm text-muted-foreground">
              Showing {filteredBrands.length} of {VOUCHER_BRANDS.length} brands
            </p>

            {filteredBrands.length === 0 ? (
              <div className="rounded-xl border border-border bg-[var(--cream)] px-6 py-12 text-center">
                <p className="font-serif text-lg font-semibold text-primary">No brands found</p>
                <p className="mt-2 text-sm text-muted-foreground">Try a different search term.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {filteredBrands.map((brand) => (
                  <button
                    key={brand.name}
                    type="button"
                    onClick={() => setSelectedBrand(brand.name)}
                    className="group flex h-[132px] flex-col items-center justify-center rounded-xl border border-border bg-white p-3 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C9A96E]/45 hover:shadow-md sm:h-[140px] sm:p-4"
                  >
                    <div className="relative mb-2.5 flex h-14 w-14 items-center justify-center sm:mb-3 sm:h-16 sm:w-16">
                      <img
                        src={brandLogoUrl(brand.domain)}
                        alt=""
                        className="h-full w-full object-contain grayscale-[25%] transition-all duration-300 group-hover:grayscale-0"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = brandLogoFallback(brand.name);
                        }}
                      />
                    </div>
                    <span className="line-clamp-2 px-1 font-sans text-[11px] font-medium leading-snug text-primary sm:text-[12px]">
                      {brand.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      <CorporateEnquiryDialog
        open={selectedBrand !== null}
        onClose={closeEnquiry}
        context={
          selectedBrand
            ? {
                productName: selectedBrand,
                categoryName: 'Voucher Brands',
                categorySlug: 'trophies-vouchers',
                source: 'voucher-brand-inquiry',
              }
            : undefined
        }
      />
    </div>
  );
}
