import { Link } from 'react-router-dom';
import AppImage from '@/components/ui/AppImage';
import CorporateProductCard from '@/components/corporate/CorporateProductCard';
import { getDiwaliHomeProducts } from '@/config/corporateGiftingData';

const HERO_SRC = '/images/catalog/diwali/hero.jpg';

export default function CorporateDiwaliSection() {
  const products = getDiwaliHomeProducts();

  return (
    <section
      id="diwali-gifting"
      className="scroll-mt-28 border-t border-border bg-[var(--cream)] py-12 sm:py-14 lg:py-16"
      aria-labelledby="diwali-gifting-heading"
    >
      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-[#9D7D47]">Festive corporate gifting</p>
          <h2 id="diwali-gifting-heading" className="section-heading-corporate mt-3">
            Diwali Gifting
          </h2>
          <p className="section-lede mx-auto mt-4 max-w-2xl">
            Gift boxes for client and team Diwali programmes.
          </p>
        </div>

        <div className="relative mt-8 overflow-hidden rounded-2xl border border-[#C9A96E]/30 bg-[#1A1010] sm:mt-10">
          <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
            <AppImage
              src={HERO_SRC}
              alt="Premium Diwali gift boxes with sweets, diyas, and marigolds"
              fill
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-cover object-center"
              priority
            />
          </div>
        </div>

        <ul className="mt-8 grid list-none grid-cols-2 gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <li key={product.slug}>
              <CorporateProductCard product={product} />
            </li>
          ))}
        </ul>

        <div className="mt-8 flex justify-center">
          <Link
            to="/corporate/category/festive-gifts"
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#4A1020] px-6 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#F2EDE8] transition hover:bg-[#5C1529]"
          >
            View all Diwali gifts
          </Link>
        </div>
      </div>
    </section>
  );
}
