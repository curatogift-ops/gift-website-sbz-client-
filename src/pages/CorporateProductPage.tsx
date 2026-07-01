import { Fragment, useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  BadgeCheck,
  ChevronRight,
  Heart,
  Package,
  Share2,
  ShieldCheck,
  Star,
  Truck,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AppImage from '@/components/ui/AppImage';
import CorporateEnquiryDialog from '@/components/corporate/CorporateEnquiryDialog';
import CorporateProductCarouselSection from '@/components/corporate/CorporateProductCarouselSection';
import CorporateRecentlyViewedSection from '@/components/corporate/CorporateRecentlyViewedSection';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  CORPORATE_PRODUCTS,
  formatCorporatePrice,
  getCategoryBySlug,
  getProductBySlug,
  getRelatedProducts,
  type CorporateProduct,
} from '@/config/corporateGiftingData';
import {
  addCorporateRecentlyViewed,
  getRecentlyViewedProducts,
} from '@/lib/corporateRecentlyViewed';

const TRUST_PILLS = [
  { Icon: Truck, label: 'Timely Delivery' },
  { Icon: ShieldCheck, label: 'Secure Payment' },
  { Icon: Package, label: 'Premium Package' },
] as const;

function Stars({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClass = size === 'lg' ? 'h-4 w-4' : size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5';
  return (
    <div className="flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${sizeClass} ${i < Math.round(rating) ? 'fill-[#C9A96E] text-[#C9A96E]' : 'fill-transparent text-border'}`}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

function RelatedProductCard({ product }: { product: CorporateProduct }) {
  return (
    <Link
      to={`/corporate/product/${product.slug}`}
      className="corp-related-card-ref group block h-full min-w-0 overflow-hidden rounded-xl border border-border bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C9A96E]/40 hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <AppImage
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width:640px) 45vw, 260px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <span className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-muted-foreground shadow-sm">
          <Heart className="h-3.5 w-3.5" strokeWidth={1.75} />
        </span>
      </div>
      <div className="px-3 py-4 text-center sm:px-4">
        <p className="line-clamp-2 font-serif text-[13px] font-semibold leading-snug text-foreground group-hover:text-primary sm:text-[14px]">
          {product.name}
        </p>
        <p className="mt-1.5 text-[11px] text-muted-foreground">No. of Gifts in Hamper</p>
        <p className="mt-2 font-serif text-[14px] font-semibold text-foreground">
          {formatCorporatePrice(product.price)}
        </p>
      </div>
    </Link>
  );
}

export default function CorporateProductPage() {
  const { productSlug = '' } = useParams<{ productSlug: string }>();
  const product = getProductBySlug(productSlug);
  const [activeImage, setActiveImage] = useState(0);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<CorporateProduct[]>([]);

  useEffect(() => {
    if (!productSlug) return;
    addCorporateRecentlyViewed(productSlug);
    setRecentlyViewed(getRecentlyViewedProducts(productSlug));
  }, [productSlug]);

  const category = product ? getCategoryBySlug(product.categorySlug) : undefined;
  const related = product ? getRelatedProducts(product.slug, product.categorySlug) : [];

  const recentlyViewedDisplay = useMemo(() => {
    if (recentlyViewed.length > 0) return recentlyViewed;
    if (!product) return [];
    return CORPORATE_PRODUCTS.filter(
      (item) => item.slug !== product.slug && !related.some((rel) => rel.slug === item.slug),
    ).slice(0, 6);
  }, [recentlyViewed, product, related]);

  if (!product) {
    return <Navigate to="/corporate" replace />;
  }

  const longPreview = product.longDescription.slice(0, 320);
  const showReadMore = product.longDescription.length > longPreview.length;

  const openEnquiry = () => setEnquiryOpen(true);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, url });
      } else {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      /* user cancelled */
    }
  };

  return (
    <div className="corporate-page corporate-product-page flex min-h-screen flex-col bg-white font-sans">
      <Navbar />

      <main className="page-main-offset flex-grow pb-24 sm:pb-28">
        <section className="corp-product-hero border-b border-border">
          <div className="section-container py-5 sm:py-8 lg:py-10">
            <nav
              aria-label="Breadcrumb"
              className="mb-5 flex flex-wrap items-center gap-1.5 text-[12px] text-muted-foreground sm:mb-6"
            >
              <Link to="/" className="transition-colors hover:text-primary">
                Home
              </Link>
              <ChevronRight className="h-3 w-3 shrink-0 opacity-50" />
              {category && (
                <>
                  <Link
                    to={`/corporate/category/${category.slug}`}
                    className="transition-colors hover:text-primary"
                  >
                    {category.label}
                  </Link>
                  <ChevronRight className="h-3 w-3 shrink-0 opacity-50" />
                </>
              )}
              <span className="line-clamp-1 text-foreground">{product.name}</span>
            </nav>

            <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-14">
              <div className="corp-product-gallery min-w-0">
                <div className="flex gap-3 sm:gap-4">
                  <div className="hidden shrink-0 flex-col gap-2.5 sm:flex">
                    {product.images.map((src, index) => (
                      <button
                        key={`${src}-${index}`}
                        type="button"
                        onClick={() => setActiveImage(index)}
                        className={`corp-product-thumb relative h-[4.25rem] w-[4.25rem] overflow-hidden lg:h-[4.75rem] lg:w-[4.75rem] ${
                          index === activeImage ? 'is-active' : ''
                        }`}
                      >
                        <AppImage src={src} alt="" fill sizes="76px" className="object-cover" />
                      </button>
                    ))}
                  </div>

                  <div className="corp-product-gallery-main relative min-h-[280px] flex-1 overflow-hidden sm:aspect-square sm:min-h-[320px] md:min-h-0">
                    <AppImage
                      src={product.images[activeImage]}
                      alt={product.name}
                      fill
                      sizes="(max-width:1024px) 100vw, 50vw"
                      className="object-cover"
                      priority
                    />
                    <button
                      type="button"
                      onClick={() => setWishlisted((v) => !v)}
                      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-foreground shadow-sm"
                      aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <Heart
                        className={`h-4 w-4 ${wishlisted ? 'fill-primary text-primary' : ''}`}
                        strokeWidth={1.75}
                      />
                    </button>
                  </div>
                </div>

                <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto sm:hidden">
                  {product.images.map((src, index) => (
                    <button
                      key={`${src}-${index}`}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      className={`corp-product-thumb relative h-16 w-16 shrink-0 overflow-hidden ${
                        index === activeImage ? 'is-active' : ''
                      }`}
                    >
                      <AppImage src={src} alt="" fill sizes="64px" className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="min-w-0 lg:pt-1">
                <div className="flex items-start justify-between gap-3 sm:gap-4">
                  <h1 className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.12] text-primary">
                    {product.name}
                  </h1>
                  <button
                    type="button"
                    onClick={handleShare}
                    className="mt-0.5 flex shrink-0 items-center gap-1 text-[12px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Share2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                    Share
                  </button>
                </div>

                <div className="mt-4 sm:mt-5">
                  <p className="font-serif text-[clamp(1.2rem,2vw,1.5rem)] font-semibold text-foreground">
                    {formatCorporatePrice(product.price)}
                  </p>
                  <p className="mt-1 text-[12px] text-muted-foreground">Inclusive of all taxes</p>
                </div>

                <button type="button" onClick={openEnquiry} className="btn-pill btn-pill-maroon mt-5 w-full sm:mt-6">
                  Enquire for Bulk
                </button>

                <div className="corp-product-trust mt-5 border-y border-border sm:mt-6">
                  {TRUST_PILLS.map(({ Icon, label }, index) => (
                    <Fragment key={label}>
                      <div className="corp-product-trust-item">
                        <Icon className="h-5 w-5 shrink-0 text-[#C9A96E]" strokeWidth={1.5} aria-hidden />
                        <p className="text-[9px] font-bold uppercase leading-snug tracking-[0.04em] text-foreground sm:text-[10px]">
                          {label}
                        </p>
                      </div>
                      {index < TRUST_PILLS.length - 1 && (
                        <div className="corp-product-trust-divider" aria-hidden />
                      )}
                    </Fragment>
                  ))}
                </div>

                <Accordion defaultValue={['contents']} className="corp-product-accordion mt-5 flex w-full flex-col sm:mt-6">
                  <AccordionItem value="contents">
                    <AccordionTrigger className="corp-accordion-trigger">
                      {product.contentsLabel}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc space-y-1.5 pl-5 text-[13px] leading-relaxed text-muted-foreground">
                        {product.contents.map((item) => (
                          <li key={item.name}>{item.name}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="description">
                    <AccordionTrigger className="corp-accordion-trigger">Description</AccordionTrigger>
                    <AccordionContent className="text-[13px] leading-relaxed text-muted-foreground">
                      {product.description}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="know-more">
                    <AccordionTrigger className="corp-accordion-trigger">Click to know More</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc space-y-1.5 pl-5 text-[13px] leading-relaxed text-muted-foreground">
                        {product.brandingOptions.map((option) => (
                          <li key={option}>{option}</li>
                        ))}
                      </ul>
                      <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{product.knowMore}</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="shipping">
                    <AccordionTrigger className="corp-accordion-trigger">
                      Shipping &amp; Fulfillment
                    </AccordionTrigger>
                    <AccordionContent className="text-[13px] leading-relaxed text-muted-foreground">
                      {product.shippingInfo}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="assistance">
                    <AccordionTrigger className="corp-accordion-trigger">Assistance</AccordionTrigger>
                    <AccordionContent className="text-[13px] leading-relaxed text-muted-foreground">
                      {product.assistanceInfo}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        <section className="corp-product-reviews" aria-labelledby="reviews-heading">
          <div className="section-container py-8 sm:py-10 lg:py-12">
            <div className="corp-reviews-summary">
              <span className="font-serif text-[1.75rem] font-semibold leading-none text-foreground">
                {product.rating.toFixed(1)}
              </span>
              <Stars rating={product.rating} size="lg" />
              <button
                type="button"
                className="text-[13px] text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
              >
                {product.reviewCount} reviews
              </button>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
                <BadgeCheck className="h-3.5 w-3.5" strokeWidth={1.75} />
                Verified
              </span>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 id="reviews-heading" className="section-heading-corporate">
                Customer Reviews
              </h2>
              <button type="button" onClick={openEnquiry} className="btn-pill btn-pill-maroon w-full sm:w-auto">
                Write a review
              </button>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <CorporateProductCarouselSection
            id="related-heading"
            title="You may also like"
            products={related}
            className="bg-[var(--cream)]"
            titleClassName="section-heading-corporate text-center"
            renderCard={(item) => <RelatedProductCard product={item} />}
            gridWhenFew={false}
          />
        )}

        <CorporateRecentlyViewedSection products={recentlyViewedDisplay} />

        <section className="border-t border-border bg-white">
          <div className="section-container py-10 sm:py-12 lg:py-14">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-serif text-[clamp(1.15rem,2vw,1.4rem)] font-semibold leading-snug text-primary">
                {product.name} – Premium Bulk Corporate Gift
              </h2>
              <div className="mt-4 text-[14px] leading-[1.8] text-muted-foreground">
                <p>{readMore ? product.longDescription : `${longPreview}${showReadMore ? '…' : ''}`}</p>
                {showReadMore && (
                  <button
                    type="button"
                    onClick={() => setReadMore((v) => !v)}
                    className="mt-3 font-semibold text-primary hover:underline"
                  >
                    {readMore ? 'Read less' : 'Read more…'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <div className="corp-product-sticky-bar">
        <button type="button" onClick={openEnquiry}>
          Enquire for Bulk
        </button>
      </div>

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
