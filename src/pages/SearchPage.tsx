import { Link, useSearchParams } from 'react-router-dom';
import { ChevronRight, Search } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AppImage from '@/components/ui/AppImage';
import { downloadCatalogueFile } from '@/lib/catalogueDownload';
import { searchSite } from '@/lib/siteSearch';

export default function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get('q')?.trim() ?? '';
  const results = searchSite(query);
  const hasResults =
    results.categories.length > 0 || results.products.length > 0 || results.catalogues.length > 0;

  return (
    <div className="flex min-h-screen flex-col bg-[#FBF7F2] font-sans">
      <Navbar />
      <main className="page-main-offset flex-grow">
        <section className="border-b border-[#E8DFD2] bg-white py-8 sm:py-10">
          <div className="section-container">
            <p className="eyebrow">Search</p>
            <h1 className="section-heading-corporate mt-3">
              {query ? `Results for “${query}”` : 'Search Giftz Gallerei'}
            </h1>
            <p className="section-lede mt-3 max-w-2xl">
              Categories, products, and catalogues that match this search.
            </p>
          </div>
        </section>

        <div className="section-container space-y-12 py-10 sm:py-12">
          {!query || !hasResults ? (
            <div className="rounded-2xl border border-dashed border-[#E8DFD2] bg-white px-6 py-14 text-center">
              <Search className="mx-auto h-6 w-6 text-[#C9A96E]" aria-hidden />
              <p className="mt-4 font-serif text-xl text-[#4A1020]">
                {query ? 'No matching products or catalogues' : 'Type a gift, category, or brand in the search bar'}
              </p>
              <Link
                to="/corporate#corporate-gift-enquiry"
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-[#4A1020] px-5 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-white"
              >
                Send an enquiry
              </Link>
            </div>
          ) : null}

          {results.categories.length > 0 && (
            <section aria-labelledby="search-categories-heading">
              <h2 id="search-categories-heading" className="font-serif text-[1.5rem] font-semibold text-[#4A1020]">
                Categories
              </h2>
              <ul className="mt-4 grid list-none gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {results.categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      to={category.href}
                      className="flex h-full items-center justify-between gap-3 rounded-xl border border-[#E8DFD2] bg-white px-4 py-4 transition hover:border-[#C9A96E]"
                    >
                      <span>
                        <span className="block font-serif text-[1.15rem] font-semibold text-[#4A1020]">
                          {category.label}
                        </span>
                        <span className="mt-1 block font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[#9D7D47]">
                          {category.detail}
                        </span>
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-[#C9A96E]" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {results.products.length > 0 && (
            <section aria-labelledby="search-products-heading">
              <h2 id="search-products-heading" className="font-serif text-[1.5rem] font-semibold text-[#4A1020]">
                Products
              </h2>
              <ul className="mt-4 grid list-none grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                {results.products.slice(0, 12).map((product) => (
                  <li key={product.slug}>
                    <Link
                      to={product.href}
                      className="flex h-full flex-col overflow-hidden rounded-xl border border-[#E8DFD2] bg-white transition hover:-translate-y-0.5 hover:border-[#C9A96E]"
                    >
                      <div className="relative aspect-square bg-[#F7F2EA]">
                        {product.image ? (
                          <AppImage src={product.image} alt="" fill sizes="240px" className="object-cover" />
                        ) : null}
                      </div>
                      <div className="flex flex-1 flex-col p-3">
                        <p className="font-sans text-[10px] font-bold uppercase tracking-[0.12em] text-[#9D7D47]">
                          {product.category}
                        </p>
                        <p className="mt-1 line-clamp-2 font-serif text-[14px] font-semibold text-[#1A1010]">
                          {product.name}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {results.catalogues.length > 0 && (
            <section aria-labelledby="search-catalogues-heading">
              <h2 id="search-catalogues-heading" className="font-serif text-[1.5rem] font-semibold text-[#4A1020]">
                Catalogues
              </h2>
              <ul className="mt-4 grid list-none gap-4 lg:grid-cols-2">
                {results.catalogues.map((item) => {
                  const fileName = item.file.split('/').pop() ?? 'catalogue.pdf';
                  return (
                    <li key={item.id}>
                      <article className="flex h-full flex-col gap-4 rounded-2xl border border-[#C9A96E]/40 bg-white p-4 sm:flex-row sm:items-center sm:p-5">
                        <div
                          className="flex h-20 w-16 shrink-0 items-center justify-center rounded-md text-center font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-[#F2EDE8]"
                          style={{ backgroundColor: item.coverAccent }}
                        >
                          Catalogue
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#9D7D47]">
                            Catalogue · {item.categoryLabel}
                          </p>
                          <h3 className="mt-1 font-serif text-[1.2rem] font-semibold text-[#4A1020]">
                            {item.title}
                          </h3>
                        </div>
                        <div className="flex shrink-0 gap-2 sm:flex-col">
                          <Link
                            to={`/catalogue?category=${item.categoryId}&focus=${item.id}`}
                            className="inline-flex flex-1 items-center justify-center rounded-md border border-[#4A1020] px-3 py-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-[#4A1020] transition hover:bg-[#4A1020]/5"
                          >
                            View catalogue
                          </Link>
                          <button
                            type="button"
                            onClick={() => void downloadCatalogueFile(item.file, fileName)}
                            className="inline-flex flex-1 items-center justify-center rounded-md bg-[#4A1020] px-3 py-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#5C1529]"
                          >
                            Download
                          </button>
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
