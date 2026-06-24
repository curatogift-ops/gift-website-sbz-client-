import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Check, ChevronRight, Gift } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AppImage from '@/components/ui/AppImage';
import CorporateEnquiryDialog from '@/components/corporate/CorporateEnquiryDialog';
import {
  getCategoryBySlug,
  getProductBySlug,
} from '@/config/corporateGiftingData';

function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export default function CorporateProductPage() {
  const { productSlug = '' } = useParams<{ productSlug: string }>();
  const product = getProductBySlug(productSlug);
  const [activeImage, setActiveImage] = useState(0);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  if (!product) {
    return <Navigate to="/corporate" replace />;
  }

  const category = getCategoryBySlug(product.categorySlug);

  return (
    <div className="corporate-page flex min-h-screen flex-col bg-white font-sans">
      <Navbar />

      <main className="page-main-offset flex-grow">
        <section className="py-8 sm:py-10 lg:py-12">
          <div className="section-container">
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-[12px] text-muted-foreground">
              <Link to="/corporate" className="transition-colors hover:text-primary">
                Corporate Gifting
              </Link>
              <ChevronRight className="h-3.5 w-3.5 shrink-0" />
              {category && (
                <>
                  <Link
                    to={`/corporate/category/${category.slug}`}
                    className="transition-colors hover:text-primary"
                  >
                    {category.label}
                  </Link>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                </>
              )}
              <span className="font-medium text-foreground">{product.name}</span>
            </nav>

            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Images */}
              <div>
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-muted">
                  <AppImage
                    src={product.images[activeImage]}
                    alt={product.name}
                    fill
                    sizes="(max-width:1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </div>
                {product.images.length > 1 && (
                  <div className="mt-3 flex gap-2">
                    {product.images.map((src, index) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setActiveImage(index)}
                        className={`relative h-16 w-16 overflow-hidden rounded-lg border-2 transition-colors ${
                          index === activeImage ? 'border-primary' : 'border-border'
                        }`}
                      >
                        <AppImage src={src} alt="" fill sizes="64px" className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex flex-col">
                {category && (
                  <p className="eyebrow text-[10px]">{category.label}</p>
                )}
                <h1 className="mt-2 font-serif text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-tight text-foreground">
                  {product.name}
                </h1>

                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                  {product.description}
                </p>

                <div className="mt-6 rounded-xl border border-border bg-[var(--cream)] p-5">
                  <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                    Price
                  </p>
                  <p className="mt-1 font-serif text-2xl font-semibold text-primary">
                    {formatPrice(product.price)}
                  </p>
                  <p className="mt-2 text-sm font-medium text-[#9D7D47]">
                    Best bulk price: {product.bulkPrice}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setEnquiryOpen(true)}
                  className="btn-pill btn-pill-maroon mt-6 w-full sm:w-auto"
                >
                  <Gift className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                  Enquire Now
                </button>

                <div className="mt-8">
                  <h2 className="font-serif text-lg font-semibold text-foreground">Features</h2>
                  <ul className="mt-3 space-y-2">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#9D7D47]" strokeWidth={2.5} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <h2 className="font-serif text-lg font-semibold text-foreground">Branding Options</h2>
                  <ul className="mt-3 space-y-2">
                    {product.brandingOptions.map((option) => (
                      <li key={option} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#9D7D47]" strokeWidth={2.5} />
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <CorporateEnquiryDialog
        open={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        context={{
          productName: product.name,
          productSlug: product.slug,
          categoryName: category?.label,
          categorySlug: category?.slug,
          source: 'product-detail-page',
        }}
      />
    </div>
  );
}
