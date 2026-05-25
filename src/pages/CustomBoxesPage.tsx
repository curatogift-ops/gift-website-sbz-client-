import { useEffect, useMemo, useState, type ComponentType } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Box,
  Check,
  CreditCard,
  Filter,
  Heart,
  Minus,
  Package,
  PenSquare,
  Plus,
  Search,
  ShoppingBag,
  X,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AppImage from '@/components/ui/AppImage';

type BuilderStep = 1 | 2 | 3 | 4 | 5;
type ProductCategory = 'All' | 'Accessories' | 'Keepsakes' | 'Self Care';

interface BoxOption {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface ProductItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: Exclude<ProductCategory, 'All'>;
}

interface CardOption {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface StepMeta {
  id: 1 | 2 | 3 | 4;
  title: string;
  Icon: ComponentType<{ className?: string; strokeWidth?: number }>;
}

interface CartChip {
  id: string;
  name: string;
  image: string;
  price: number;
  qty: number;
  type: 'box' | 'product' | 'card';
}

const BOX_OPTIONS: BoxOption[] = [
  {
    id: 'box-lilac',
    name: 'Lilac Serenity Box',
    price: 770,
    image:
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'box-kalamkari',
    name: 'Kalamkari Printed Bag',
    price: 400,
    image:
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'box-bamboo',
    name: 'Handcrafted Bamboo Flower Basket',
    price: 760,
    image:
      'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'box-marshall',
    name: 'Marshall Speaker Inspired Box',
    price: 1060,
    image:
      'https://images.unsplash.com/photo-1577085960689-3f7cb6c7526b?q=80&w=900&auto=format&fit=crop',
  },
];

const PRODUCT_OPTIONS: ProductItem[] = [
  {
    id: 'p-mermaid-scrunchie',
    name: 'Mermaid Scrunchie',
    price: 70,
    image:
      'https://images.unsplash.com/photo-1548907040-4d42b52125b0?q=80&w=900&auto=format&fit=crop',
    category: 'Accessories',
  },
  {
    id: 'p-mermaid-clip',
    name: 'Mermaid Clip',
    price: 280,
    image:
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=900&auto=format&fit=crop',
    category: 'Accessories',
  },
  {
    id: 'p-mini-crochet-teddy',
    name: 'Mini Crochet Teddy',
    price: 220,
    image:
      'https://images.unsplash.com/photo-1596701062351-8c2c14d1fcd0?q=80&w=900&auto=format&fit=crop',
    category: 'Keepsakes',
  },
  {
    id: 'p-crochet-bracelet',
    name: 'Crochet Bracelet',
    price: 130,
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=900&auto=format&fit=crop',
    category: 'Accessories',
  },
  {
    id: 'p-rose-candle',
    name: 'Rose Scented Candle',
    price: 240,
    image:
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=900&auto=format&fit=crop',
    category: 'Self Care',
  },
  {
    id: 'p-note-charm',
    name: 'Thought Card Charm',
    price: 160,
    image:
      'https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=900&auto=format&fit=crop',
    category: 'Keepsakes',
  },
  {
    id: 'p-silk-ribbon',
    name: 'Silk Ribbon Bow',
    price: 190,
    image:
      'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=900&auto=format&fit=crop',
    category: 'Accessories',
  },
  {
    id: 'p-coffee-sachet',
    name: 'Coffee Delight Sachet',
    price: 210,
    image:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=900&auto=format&fit=crop',
    category: 'Self Care',
  },
];

const CARD_OPTIONS: CardOption[] = [
  {
    id: 'card-welcome',
    name: 'Welcome Card',
    price: 25,
    image:
      'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'card-thinking',
    name: 'Thinking of You',
    price: 25,
    image:
      'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'card-thankyou',
    name: 'Thankyou',
    price: 25,
    image:
      'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'card-sorry',
    name: 'Im Sorry',
    price: 25,
    image:
      'https://images.unsplash.com/photo-1446708771591-5c7e7c5e0f08?q=80&w=900&auto=format&fit=crop',
  },
];

const FLOW_STEPS: StepMeta[] = [
  { id: 1, title: 'Choose Box', Icon: Box },
  { id: 2, title: 'Add Products', Icon: ShoppingBag },
  { id: 3, title: 'Select Card', Icon: CreditCard },
  { id: 4, title: 'Personalize', Icon: Heart },
];

const MIN_PRODUCTS_REQUIRED = 3;
const INDIAN_CURRENCY = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formatCurrency = (value: number): string => INDIAN_CURRENCY.format(value);

const getNextStep = (step: BuilderStep): BuilderStep =>
  step >= 5 ? 5 : ((step + 1) as BuilderStep);

export default function CustomBoxesPage() {
  const [step, setStep] = useState<BuilderStep>(1);
  const [selectedBoxId, setSelectedBoxId] = useState<string | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [productQuantities, setProductQuantities] = useState<Record<string, number>>({});
  const [fromName, setFromName] = useState<string>('');
  const [toName, setToName] = useState<string>('');
  const [giftMessage, setGiftMessage] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!toastMessage) {
      return undefined;
    }
    const timer = window.setTimeout(() => setToastMessage(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const selectedBox = useMemo(
    () => BOX_OPTIONS.find((box) => box.id === selectedBoxId) ?? null,
    [selectedBoxId]
  );

  const selectedCard = useMemo(
    () => CARD_OPTIONS.find((card) => card.id === selectedCardId) ?? null,
    [selectedCardId]
  );

  const selectedProductEntries = useMemo(
    () =>
      PRODUCT_OPTIONS.map((product) => ({
        product,
        quantity: productQuantities[product.id] ?? 0,
      })).filter((entry) => entry.quantity > 0),
    [productQuantities]
  );

  const totalProductCount = useMemo(
    () => selectedProductEntries.reduce((sum, entry) => sum + entry.quantity, 0),
    [selectedProductEntries]
  );

  const productSubtotal = useMemo(
    () =>
      selectedProductEntries.reduce(
        (sum, entry) => sum + entry.product.price * entry.quantity,
        0
      ),
    [selectedProductEntries]
  );

  const grandTotal = (selectedBox?.price ?? 0) + (selectedCard?.price ?? 0) + productSubtotal;
  const stepProgress = step >= 5 ? 4 : step;
  const canProceedFromProducts = totalProductCount >= MIN_PRODUCTS_REQUIRED;

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    return PRODUCT_OPTIONS.filter((product) => {
      const categoryMatch = activeCategory === 'All' || product.category === activeCategory;
      const searchMatch =
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch);
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, searchTerm]);

  const cartChips = useMemo(() => {
    const chips: CartChip[] = [];
    if (selectedBox) {
      chips.push({
        id: selectedBox.id,
        name: selectedBox.name,
        image: selectedBox.image,
        price: selectedBox.price,
        qty: 1,
        type: 'box',
      });
    }

    chips.push(
      ...selectedProductEntries.map((entry) => ({
        id: entry.product.id,
        name: entry.product.name,
        image: entry.product.image,
        price: entry.product.price,
        qty: entry.quantity,
        type: 'product' as const,
      }))
    );

    if (selectedCard) {
      chips.push({
        id: selectedCard.id,
        name: selectedCard.name,
        image: selectedCard.image,
        price: selectedCard.price,
        qty: 1,
        type: 'card',
      });
    }
    return chips;
  }, [selectedBox, selectedProductEntries, selectedCard]);

  const updateProductQuantity = (productId: string, nextQty: number) => {
    setProductQuantities((previous) => {
      const safeQty = Math.max(0, Math.floor(nextQty));
      if (safeQty === 0) {
        const updated = { ...previous };
        delete updated[productId];
        return updated;
      }
      return { ...previous, [productId]: safeQty };
    });
  };

  const increaseProduct = (productId: string) => {
    const currentQty = productQuantities[productId] ?? 0;
    updateProductQuantity(productId, currentQty + 1);
  };

  const decreaseProduct = (productId: string) => {
    const currentQty = productQuantities[productId] ?? 0;
    updateProductQuantity(productId, currentQty - 1);
  };

  const removeCartChip = (chipId: string, type: CartChip['type']) => {
    if (type === 'product') {
      updateProductQuantity(chipId, 0);
      return;
    }
    if (type === 'card') {
      setSelectedCardId(null);
      return;
    }
    setSelectedBoxId(null);
    if (step > 1) {
      setStep(1);
    }
    setToastMessage('Box removed. Please select a box to continue.');
  };

  const getBlockedMessageForTargetStep = (targetStep: BuilderStep): string | null => {
    if (targetStep >= 2 && !selectedBox) {
      return 'Please select a box first.';
    }
    if (targetStep >= 3 && !canProceedFromProducts) {
      return `Add at least ${MIN_PRODUCTS_REQUIRED} products on this step`;
    }
    if (targetStep >= 4 && !selectedCard) {
      return 'Please select a card before continuing.';
    }
    return null;
  };

  const goToStep = (targetStep: BuilderStep) => {
    const blockedMessage = getBlockedMessageForTargetStep(targetStep);
    if (blockedMessage) {
      setToastMessage(blockedMessage);
      return;
    }
    setStep(targetStep);
  };

  const handleNext = () => {
    const nextStep = getNextStep(step);
    const blockedMessage = getBlockedMessageForTargetStep(nextStep);
    if (blockedMessage) {
      setToastMessage(blockedMessage);
      return;
    }
    setStep(nextStep);
  };

  const resetBuilder = () => {
    setStep(1);
    setSelectedBoxId(null);
    setSelectedCardId(null);
    setProductQuantities({});
    setFromName('');
    setToName('');
    setGiftMessage('');
    setSearchTerm('');
    setActiveCategory('All');
    setToastMessage(null);
  };

  const nextButtonLabel = step === 4 ? 'Review' : 'Next';

  return (
    <div className="flex min-h-screen flex-col bg-[#f1efe8]">
      <Navbar />

      <main className="flex-1 px-3 pb-16 pt-[11.75rem] sm:px-5 md:pb-20 xl:pt-[7rem]">
        <div className="mx-auto max-w-[1480px]">
          <div className="relative overflow-hidden rounded-[28px] border border-[#d7d1c4] bg-[radial-gradient(circle_at_15%_0%,#ffffff_0%,#faf8f3_35%,#f4f1eb_100%)] px-4 pb-4 pt-6 shadow-[0_20px_50px_-42px_rgba(0,0,0,0.45)] sm:px-6 md:px-8 lg:px-10">

            <section aria-label="Hamper steps" className="mb-8">
              <div className="relative mx-auto max-w-[900px]">
                {/* Connector line background */}
                <div className="absolute left-[calc(12.5%+16px)] right-[calc(12.5%+16px)] top-[18px] hidden h-[2px] rounded-full bg-[#e4ddd1] md:block" />
                {/* Animated progress fill */}
                <motion.div
                  className="absolute left-[calc(12.5%+16px)] top-[18px] hidden h-[2px] rounded-full md:block"
                  style={{
                    background: 'linear-gradient(90deg, #2f7a5e 0%, #b58b4c 100%)',
                  }}
                  initial={{ width: '0%' }}
                  animate={{
                    width: `${((Math.min(stepProgress, 4) - 1) / 3) * 100}%`,
                  }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                />

                <div className="relative grid grid-cols-4 gap-1">
                  {FLOW_STEPS.map(({ id, title, Icon }) => {
                    const isDone = stepProgress > id;
                    const isActive = stepProgress === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => goToStep(id)}
                        className="group flex flex-col items-center gap-1.5 rounded-xl p-1.5 text-center transition-all hover:bg-white/50"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        <motion.div
                          className="relative"
                          whileTap={{ scale: 0.92 }}
                        >
                          {/* Glow ring for active */}
                          {isActive && (
                            <motion.div
                              className="absolute -inset-1 rounded-full bg-[#b58b4c]/15"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                          <span
                            className={[
                              'relative z-10 flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold shadow-sm transition-all duration-300',
                              isDone
                                ? 'bg-gradient-to-br from-[#2f7a5e] to-[#1d5c44] text-white shadow-[0_2px_8px_rgba(47,122,94,0.35)]'
                                : isActive
                                ? 'border-2 border-[#b58b4c] bg-gradient-to-br from-[#fff8ea] to-[#f5ecd6] text-[#7b5f36] shadow-[0_2px_10px_rgba(181,139,76,0.25)]'
                                : 'border border-[#ddd8cd] bg-[#f4f2ed] text-[#b5b0a7]',
                            ].join(' ')}
                          >
                            {isDone ? (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                              >
                                <Check className="h-4 w-4" strokeWidth={3} />
                              </motion.div>
                            ) : (
                              <Icon className="h-3.5 w-3.5" strokeWidth={isActive ? 2.4 : 1.8} />
                            )}
                          </span>
                        </motion.div>
                        <span
                          className={[
                            'text-[10px] font-semibold tracking-[0.04em] transition-colors sm:text-xs',
                            isDone
                              ? 'text-[#2f7a5e]'
                              : isActive
                              ? 'text-[#7b5f36]'
                              : 'text-[#b0aba3]',
                          ].join(' ')}
                        >
                          {title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.section
                  key="step-1"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="space-y-4"
                >
                  <p className="text-sm font-medium text-[#6d6457]" style={{ fontFamily: 'var(--font-sans)' }}>
                    Pick one packaging base to begin your hamper.
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {BOX_OPTIONS.map((box) => {
                      const selected = selectedBoxId === box.id;
                      return (
                        <article
                          key={box.id}
                          className={[
                            'group rounded-xl border bg-white/90 p-2 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all',
                            selected
                              ? 'border-[#2f7a5e] ring-2 ring-[#2f7a5e]/20'
                              : 'border-[#dfd9cd] hover:border-[#c6aa7a]',
                          ].join(' ')}
                        >
                          <div className="aspect-square overflow-hidden rounded-lg border border-[#ece6da] bg-[#f0ede6]">
                            <AppImage
                              src={box.image}
                              alt={box.name}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                            />
                          </div>

                          <div className="pt-2">
                            <button
                              type="button"
                              onClick={() => setSelectedBoxId(box.id)}
                              className={[
                                'mb-1.5 h-8 w-full rounded-lg text-xs font-semibold tracking-[0.02em] transition',
                                selected
                                  ? 'border border-[#2f7a5e] bg-[#eaf6f1] text-[#2f7a5e]'
                                  : 'bg-gradient-to-r from-[#1a6b52] to-[#0f4f43] text-white shadow-sm hover:from-[#15573f] hover:to-[#0b4036]',
                              ].join(' ')}
                            >
                              {selected ? '✓ Selected' : 'Choose Box'}
                            </button>
                            <h3
                              className="text-xs leading-tight text-[#143d36] sm:text-sm"
                              style={{ fontFamily: 'var(--font-serif)' }}
                            >
                              {box.name}
                            </h3>
                            <p
                              className="mt-0.5 text-xs font-semibold text-[#11172b] sm:text-sm"
                              style={{ fontFamily: 'var(--font-serif)' }}
                            >
                              {formatCurrency(box.price)}
                            </p>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </motion.section>
              )}

              {step === 2 && (
                <motion.section
                  key="step-2"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="space-y-4"
                >
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div className="inline-flex items-center gap-2 rounded-xl border border-[#d8d0c4] bg-[#f8f5ef] px-4 py-2 text-[#2f2d2a]">
                      <Filter className="h-4 w-4" strokeWidth={2.3} />
                      <span className="text-sm font-semibold">Filters</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {(['All', 'Accessories', 'Keepsakes', 'Self Care'] as ProductCategory[]).map(
                        (category) => (
                          <button
                            key={category}
                            type="button"
                            onClick={() => setActiveCategory(category)}
                            className={[
                              'rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-[0.08em] uppercase transition',
                              activeCategory === category
                                ? 'bg-[#0f4f43] text-white'
                                : 'border border-[#dcd6cb] bg-white text-[#726d65] hover:border-[#b58b4c] hover:text-[#5a4b33]',
                            ].join(' ')}
                          >
                            {category}
                          </button>
                        )
                      )}
                    </div>

                    <label className="flex h-10 w-full items-center gap-2 rounded-full border border-[#ddd7ce] bg-white px-4 lg:max-w-[260px]">
                      <Search className="h-4 w-4 text-[#a8a39a]" />
                      <input
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        className="h-full w-full bg-transparent text-sm text-[#4f4b45] outline-none placeholder:text-[#b0aca4]"
                        placeholder="Search products"
                      />
                    </label>
                  </div>

                  <p className="text-sm font-medium text-[#7c6b4f]" style={{ fontFamily: 'var(--font-sans)' }}>
                    Add at least {MIN_PRODUCTS_REQUIRED} products on this step.
                  </p>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {filteredProducts.map((product) => {
                      const quantity = productQuantities[product.id] ?? 0;
                      return (
                        <article
                          key={product.id}
                          className="group rounded-xl border border-[#dfd9cd] bg-white/90 p-2 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                        >
                          <div className="aspect-square overflow-hidden rounded-lg border border-[#ece6da] bg-[#f0ede6]">
                            <AppImage
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                            />
                          </div>

                          <div className="pt-2">
                            {quantity > 0 ? (
                              <div className="mb-1.5 flex h-8 items-center justify-between rounded-lg border border-[#cfcbbe] bg-[#faf8f4] px-2">
                                <button
                                  type="button"
                                  onClick={() => decreaseProduct(product.id)}
                                  className="rounded-md p-0.5 text-[#183f38] hover:bg-[#e8f2ee]"
                                >
                                  <Minus className="h-3.5 w-3.5" strokeWidth={2.6} />
                                </button>
                                <span className="text-xs font-semibold text-[#1d1c19]">
                                  {quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => increaseProduct(product.id)}
                                  className="rounded-md p-0.5 text-[#183f38] hover:bg-[#e8f2ee]"
                                >
                                  <Plus className="h-3.5 w-3.5" strokeWidth={2.6} />
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => increaseProduct(product.id)}
                                className="mb-1.5 h-8 w-full rounded-lg bg-gradient-to-r from-[#1a6b52] to-[#0f4f43] text-xs font-semibold text-white shadow-sm transition hover:from-[#15573f] hover:to-[#0b4036]"
                              >
                                Add To Box
                              </button>
                            )}
                            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8a8479]">
                              {product.category}
                            </p>
                            <h3
                              className="mt-0.5 text-xs leading-tight text-[#143d36] sm:text-sm"
                              style={{ fontFamily: 'var(--font-serif)' }}
                            >
                              {product.name}
                            </h3>
                            <p
                              className="mt-0.5 text-xs font-semibold text-[#11172b] sm:text-sm"
                              style={{ fontFamily: 'var(--font-serif)' }}
                            >
                              {formatCurrency(product.price)}
                            </p>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </motion.section>
              )}

              {step === 3 && (
                <motion.section
                  key="step-3"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="space-y-4"
                >
                  <p className="text-sm font-medium text-[#6d6457]" style={{ fontFamily: 'var(--font-sans)' }}>
                    Choose one card for your hamper.
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {CARD_OPTIONS.map((card) => {
                      const selected = selectedCardId === card.id;
                      return (
                        <article
                          key={card.id}
                          className={[
                            'group rounded-xl border bg-white/90 p-2 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all',
                            selected
                              ? 'border-[#2f7a5e] ring-2 ring-[#2f7a5e]/20'
                              : 'border-[#dfd9cd] hover:border-[#c6aa7a]',
                          ].join(' ')}
                        >
                          <div className="aspect-square overflow-hidden rounded-lg border border-[#ece6da] bg-[#f0ede6]">
                            <AppImage
                              src={card.image}
                              alt={card.name}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                            />
                          </div>

                          <div className="pt-2">
                            <button
                              type="button"
                              onClick={() => setSelectedCardId(card.id)}
                              className={[
                                'mb-1.5 h-8 w-full rounded-lg text-xs font-semibold tracking-[0.02em] transition',
                                selected
                                  ? 'border border-[#2f7a5e] bg-[#eaf6f1] text-[#2f7a5e]'
                                  : 'bg-gradient-to-r from-[#1a6b52] to-[#0f4f43] text-white shadow-sm hover:from-[#15573f] hover:to-[#0b4036]',
                              ].join(' ')}
                            >
                              {selected ? '✓ Selected' : 'Choose Card'}
                            </button>
                            <h3
                              className="text-xs leading-tight text-[#143d36] sm:text-sm"
                              style={{ fontFamily: 'var(--font-serif)' }}
                            >
                              {card.name}
                            </h3>
                            <p
                              className="mt-0.5 text-xs font-semibold text-[#11172b] sm:text-sm"
                              style={{ fontFamily: 'var(--font-serif)' }}
                            >
                              {formatCurrency(card.price)}
                            </p>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </motion.section>
              )}

              {step === 4 && (
                <motion.section
                  key="step-4"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="mx-auto max-w-[900px] space-y-4"
                >
                  <h2
                    className="text-center text-2xl text-[#173d36] sm:text-3xl"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    Personalize Your Message
                  </h2>

                  <div className="rounded-2xl border border-[#ddd5c8] bg-white p-4 sm:p-6">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <input
                        type="text"
                        value={fromName}
                        onChange={(event) => setFromName(event.target.value)}
                        placeholder="From"
                        className="h-11 rounded-xl border border-[#d5cec2] bg-[#faf8f4] px-3 text-sm text-[#2e2b26] outline-none transition focus:border-[#b58b4c]"
                      />
                      <input
                        type="text"
                        value={toName}
                        onChange={(event) => setToName(event.target.value)}
                        placeholder="To"
                        className="h-11 rounded-xl border border-[#d5cec2] bg-[#faf8f4] px-3 text-sm text-[#2e2b26] outline-none transition focus:border-[#b58b4c]"
                      />
                    </div>
                    <textarea
                      value={giftMessage}
                      onChange={(event) => setGiftMessage(event.target.value)}
                      placeholder="Enter your message..."
                      rows={6}
                      className="mt-3 w-full rounded-xl border border-[#d5cec2] bg-[#faf8f4] px-3 py-3 text-sm text-[#2e2b26] outline-none transition focus:border-[#b58b4c]"
                    />
                  </div>
                </motion.section>
              )}

              {step === 5 && (
                <motion.section
                  key="step-5"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="mx-auto max-w-[1220px] space-y-7"
                >
                  <div className="space-y-1 text-center">
                    <h2
                      className="text-3xl text-[#143d36] sm:text-4xl"
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      You&apos;re Ready To Checkout
                    </h2>
                    <p className="text-sm text-[#6f6659] sm:text-base">
                      Review your hamper details before placing order.
                    </p>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
                    <div className="rounded-2xl border border-[#ddd5c8] bg-white p-5">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#d4cebf] bg-[#f8f5ee] text-[#6b665c]">
                          <Package className="h-6 w-6" />
                        </div>
                        <div className="min-w-0">
                          <h3
                            className="text-2xl text-[#143d36]"
                            style={{ fontFamily: 'var(--font-serif)' }}
                          >
                            Make Your Own Hamper
                          </h3>
                          <p className="text-sm text-[#7c7468]">
                            {totalProductCount + (selectedBox ? 1 : 0) + (selectedCard ? 1 : 0)} item(s)
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 space-y-2 border-t border-[#ece6da] pt-4 text-sm text-[#3f3b35]">
                        <p className="font-semibold">Box: {selectedBox?.name ?? 'No box selected'}</p>
                        {selectedProductEntries.map((entry) => (
                          <p key={entry.product.id}>
                            {entry.product.name} x{entry.quantity}
                          </p>
                        ))}
                        <p>Card: {selectedCard?.name ?? 'No card selected'}</p>
                        <p>
                          Message: {giftMessage.trim() || 'No message added'}
                        </p>
                      </div>
                    </div>

                    <aside className="rounded-2xl border border-[#ddd5c8] bg-[#f7f3eb] p-5">
                      <h3
                        className="text-2xl text-[#1c1a16]"
                        style={{ fontFamily: 'var(--font-serif)' }}
                      >
                        Order Details
                      </h3>
                      <div className="mt-4 flex items-center justify-between text-sm font-semibold text-[#332f29]">
                        <span>Subtotal</span>
                        <span>{formatCurrency(grandTotal)}</span>
                      </div>

                      <button
                        type="button"
                        className="mt-4 h-11 w-full rounded-xl bg-gradient-to-r from-[#1a6b52] to-[#0f4f43] text-sm font-semibold text-white shadow-sm transition hover:from-[#15573f] hover:to-[#0b4036]"
                      >
                        Checkout
                      </button>
                      <button
                        type="button"
                        onClick={resetBuilder}
                        className="mt-3 h-11 w-full rounded-xl border border-[#23211d] bg-transparent text-sm font-semibold text-[#181713] transition hover:bg-[#f0ece3]"
                      >
                        Create New Box
                      </button>
                    </aside>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {step < 5 && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#d8d1c4] bg-white/97 px-3 py-1.5 shadow-[0_-4px_20px_-8px_rgba(0,0,0,0.12)] backdrop-blur-xl sm:px-5" style={{ fontFamily: 'var(--font-sans)' }}>
          <div className="mx-auto flex max-w-[1480px] items-center gap-3">
            {/* Buttons */}
            <div className="flex shrink-0 items-center gap-1.5">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((current) => (current - 1) as BuilderStep)}
                  className="h-7 shrink-0 rounded-md border border-[#1a6b52] px-3 text-[11px] font-semibold text-[#1a6b52] transition hover:bg-[#eaf6f1]"
                >
                  Back
                </button>
              ) : null}
              <button
                type="button"
                onClick={handleNext}
                className="h-7 shrink-0 rounded-md bg-gradient-to-r from-[#1a6b52] to-[#0f4f43] px-4 text-[11px] font-semibold text-white shadow-sm transition hover:from-[#15573f] hover:to-[#0b4036]"
              >
                {nextButtonLabel}
              </button>
            </div>

            {/* Cart chips — scrollable */}
            <div className="min-w-0 flex-1 overflow-x-auto no-scrollbar">
              <div className="flex gap-1.5">
                {cartChips.length > 0 ? (
                  cartChips.map((chip) => (
                    <div
                      key={`${chip.type}-${chip.id}`}
                      className="flex shrink-0 items-center gap-1 rounded-md border border-[#ddd7cb] bg-[#f8f5ee] px-1.5 py-0.5"
                    >
                      <div className="h-5 w-5 overflow-hidden rounded border border-[#dad3c6] bg-white">
                        <AppImage
                          src={chip.image}
                          alt={chip.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="max-w-[70px] truncate text-[9px] font-medium text-[#2a2722]">
                        {chip.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeCartChip(chip.id, chip.type)}
                        className="rounded-full bg-[#2a2927] p-px text-white transition hover:bg-[#454240]"
                        aria-label={`Remove ${chip.name}`}
                      >
                        <X className="h-2 w-2" strokeWidth={3} />
                      </button>
                    </div>
                  ))
                ) : (
                  <span className="text-[9px] text-[#7d7569]">No items selected.</span>
                )}
              </div>
            </div>

            {/* Total */}
            <div className="shrink-0 text-right">
              <p className="text-[8px] font-semibold uppercase tracking-[0.08em] text-[#7f7768]">Total</p>
              <p className="text-sm font-semibold text-[#0e4f42]" style={{ fontFamily: 'var(--font-serif)' }}>
                {formatCurrency(grandTotal)}
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />

      <AnimatePresence>
        {toastMessage ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 left-1/2 z-[70] -translate-x-1/2"
          >
            <div className="flex items-center gap-3 rounded-xl bg-[#b38445] px-4 py-3 text-white shadow-lg">
              <PenSquare className="h-4 w-4" />
              <p className="text-sm font-semibold tracking-[0.02em]">{toastMessage}</p>
              <button
                type="button"
                onClick={() => setToastMessage(null)}
                className="rounded-md border border-white/30 p-0.5 hover:bg-white/10"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
