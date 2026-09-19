import { Link } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AppImage from '@/components/ui/AppImage';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { formatCorporatePrice } from '@/config/corporateGiftingData';

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);
  const removeItem = useWishlistStore((s) => s.removeItem);
  const addToCart = useCartStore((s) => s.addItem);

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Navbar />

      <main className="page-main-offset flex-grow pb-16">
        <section className="border-b border-border bg-[var(--cream)] py-10 sm:py-12">
          <div className="section-container text-center">
            <p className="eyebrow">Saved for later</p>
            <h1 className="mt-3 font-serif text-[clamp(1.75rem,4vw,2.5rem)] font-semibold text-primary">
              Your Wishlist
            </h1>
          </div>
        </section>

        <section className="py-10 sm:py-12">
          <div className="section-container">
            {items.length === 0 ? (
              <div className="mx-auto max-w-md py-12 text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#C9A96E]/40 bg-[var(--cream)] text-[#4A1020]">
                  <Heart className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                </div>
                <h2 className="font-serif text-xl font-semibold text-foreground">
                  Your wishlist is empty
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Tap the heart on any product to save it here.
                </p>
                <Link to="/corporate" className="btn-pill btn-pill-maroon mt-6 inline-flex">
                  Browse corporate gifts
                </Link>
              </div>
            ) : (
              <ul className="grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white"
                  >
                    <Link
                      to={item.href ?? `/corporate/product/${item.slug}`}
                      className="relative aspect-square bg-muted"
                    >
                      <AppImage
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width:640px) 100vw, 25vw"
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col p-4">
                      <Link
                        to={item.href ?? `/corporate/product/${item.slug}`}
                        className="font-serif text-[15px] font-semibold leading-snug text-foreground hover:text-primary"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-1.5 font-serif text-[14px] font-semibold">
                        {formatCorporatePrice(item.price)}
                      </p>
                      <div className="mt-4 flex gap-2">
                        <button
                          type="button"
                          className="btn-pill btn-pill-maroon flex-1 text-[10px]"
                          onClick={() =>
                            addToCart({
                              id: item.id,
                              slug: item.slug,
                              name: item.name,
                              price: item.price,
                              image: item.image,
                              categoryName: item.categoryName,
                              href: item.href,
                            })
                          }
                        >
                          Add to cart
                        </button>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-red-600"
                          aria-label={`Remove ${item.name} from wishlist`}
                        >
                          <Trash2 className="h-4 w-4" strokeWidth={1.75} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
