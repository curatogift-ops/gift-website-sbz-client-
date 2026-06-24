import { Link, Navigate, useParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CorporateProductCard from '@/components/corporate/CorporateProductCard';
import {
  CORPORATE_CATEGORIES,
  getCategoryBySlug,
  getProductsByCategory,
} from '@/config/corporateGiftingData';

export default function CorporateCategoryPage() {
  const { categorySlug = '' } = useParams<{ categorySlug: string }>();
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return <Navigate to="/corporate" replace />;
  }

  const products = getProductsByCategory(categorySlug);

  return (
    <div className="corporate-page flex min-h-screen flex-col bg-white font-sans">
      <Navbar />

      <main className="page-main-offset flex-grow">
        <section className="border-b border-border bg-[var(--cream)] py-10 sm:py-12">
          <div className="section-container">
            <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1.5 text-[12px] text-muted-foreground">
              <Link to="/corporate" className="transition-colors hover:text-primary">
                Corporate Gifting
              </Link>
              <ChevronRight className="h-3.5 w-3.5 shrink-0" />
              <span className="font-medium text-foreground">{category.label}</span>
            </nav>

            <h1 className="section-heading-corporate max-w-3xl">{category.label}</h1>
            <p className="section-lede mt-4 max-w-2xl">{category.description}</p>
          </div>
        </section>

        <section className="py-10 sm:py-12 lg:py-14" aria-label={`${category.label} products`}>
          <div className="section-container">
            <p className="mb-6 text-sm text-muted-foreground">
              {products.length} product{products.length === 1 ? '' : 's'} · Click any item for details and bulk enquiry
            </p>

            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <CorporateProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-[var(--cream)] py-10 sm:py-12">
          <div className="section-container">
            <h2 className="font-serif text-xl font-semibold text-foreground">Explore other categories</h2>
            <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {CORPORATE_CATEGORIES.filter((c) => c.slug !== categorySlug).map((item) => (
                <li key={item.slug}>
                  <Link
                    to={`/corporate/category/${item.slug}`}
                    className="block rounded-lg border border-border bg-white px-3 py-2.5 text-[12px] font-bold uppercase tracking-[0.06em] text-foreground transition-colors hover:border-[#C9A96E]/40 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
