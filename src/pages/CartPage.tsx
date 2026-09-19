import { Link } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AppImage from '@/components/ui/AppImage';
import { useCartStore } from '@/store/cartStore';
import { formatCorporatePrice } from '@/config/corporateGiftingData';

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal());

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Navbar />

      <main className="page-main-offset flex-grow pb-16">
        <section className="border-b border-border bg-[var(--cream)] py-10 sm:py-12">
          <div className="section-container text-center">
            <p className="eyebrow">Your selection</p>
            <h1 className="mt-3 font-serif text-[clamp(1.75rem,4vw,2.5rem)] font-semibold text-primary">
              Shopping Cart
            </h1>
          </div>
        </section>

        <section className="py-10 sm:py-12">
          <div className="section-container">
            {items.length === 0 ? (
              <div className="mx-auto max-w-md py-12 text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#C9A96E]/40 bg-[var(--cream)] text-[#4A1020]">
                  <ShoppingBag className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                </div>
                <h2 className="font-serif text-xl font-semibold text-foreground">Your cart is empty</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Browse corporate gifts and add products to your cart.
                </p>
                <Link
                  to="/corporate"
                  className="btn-pill btn-pill-maroon mt-6 inline-flex"
                >
                  Explore Corporate Gifting
                </Link>
              </div>
            ) : (
              <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.4fr_0.8fr]">
                <ul className="flex list-none flex-col gap-4">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex gap-4 rounded-2xl border border-border bg-white p-4 sm:p-5"
                    >
                      <Link
                        to={item.href ?? `/corporate/product/${item.slug}`}
                        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-28 sm:w-28"
                      >
                        <AppImage
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="112px"
                          className="object-cover"
                        />
                      </Link>
                      <div className="flex min-w-0 flex-1 flex-col">
                        {item.categoryName && (
                          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9D7D47]">
                            {item.categoryName}
                          </p>
                        )}
                        <Link
                          to={item.href ?? `/corporate/product/${item.slug}`}
                          className="mt-0.5 font-serif text-[15px] font-semibold leading-snug text-foreground hover:text-primary sm:text-[16px]"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-1 font-serif text-[15px] font-semibold text-foreground">
                          {formatCorporatePrice(item.price)}
                        </p>
                        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                          <div className="inline-flex items-center rounded-full border border-border">
                            <button
                              type="button"
                              className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground"
                              onClick={() => setQuantity(item.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3.5 w-3.5" strokeWidth={2} />
                            </button>
                            <span className="min-w-[2rem] text-center text-sm font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground"
                              onClick={() => setQuantity(item.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground transition hover:text-red-600"
                          >
                            <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <aside className="h-fit rounded-2xl border border-border bg-[var(--cream)] p-6">
                  <h2 className="font-serif text-lg font-semibold text-foreground">Order summary</h2>
                  <div className="mt-4 flex items-center justify-between border-b border-border pb-4">
                    <span className="text-sm text-muted-foreground">Subtotal</span>
                    <span className="font-serif text-lg font-semibold text-foreground">
                      {formatCorporatePrice(subtotal)}
                    </span>
                  </div>
                  <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
                    Final pricing, branding, and delivery are confirmed via our Corporate Gift Enquiry.
                  </p>
                  <Link
                    to="/corporate#corporate-gift-enquiry"
                    className="btn-pill btn-pill-maroon mt-5 w-full"
                  >
                    Request Quote
                  </Link>
                  <Link
                    to="/corporate"
                    className="mt-3 block text-center text-[12px] font-semibold uppercase tracking-[0.1em] text-primary hover:underline"
                  >
                    Continue shopping
                  </Link>
                </aside>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
