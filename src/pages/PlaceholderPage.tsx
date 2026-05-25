import { useState, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from 'lucide-react';

type PlaceholderPageProps = {
  title: string;
  categoryKey?: string;
  minPrice?: number;
  maxPrice?: number;
};

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  isSoldOut?: boolean;
  category: string;
}

// Comprehensive database of premium Unsplash images matching the luxury branding
const MOCK_IMAGES = {
  feltOrganizer: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop',
  canvasPouch: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop',
  techOrganizer: 'https://images.unsplash.com/photo-1540829916875-f77b76d5396e?q=80&w=600&auto=format&fit=crop',
  passportOrganizer: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=600&auto=format&fit=crop',
  luggageTag: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=600&auto=format&fit=crop',
  sunglassPouch: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop',
  passportPouch: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop',
  travelPouch: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop',
  storagePouches: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600&auto=format&fit=crop',

  deskMat: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?q=80&w=600&auto=format&fit=crop',
  brassPen: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=600&auto=format&fit=crop',
  journal: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=600&auto=format&fit=crop',
  penCup: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop',
  paperweight: 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=600&auto=format&fit=crop',
  notebook: 'https://images.unsplash.com/photo-1453733190148-c44698c265f8?q=80&w=600&auto=format&fit=crop',

  planter: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=600&auto=format&fit=crop',
  candle: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=600&auto=format&fit=crop',
  lamp: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=600&auto=format&fit=crop',
  vase: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=600&auto=format&fit=crop',
  diffuser: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=600&auto=format&fit=crop',
  frame: 'https://images.unsplash.com/photo-1544273677-c433136021d4?q=80&w=600&auto=format&fit=crop',

  chocolates: 'https://images.unsplash.com/photo-1548907040-4d42b52125b0?q=80&w=600&auto=format&fit=crop',
  coffee: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop',
  tea: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop',
  nuts: 'https://images.unsplash.com/photo-1596701062351-8c2c14d1fcd0?q=80&w=600&auto=format&fit=crop',
  cookies: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=600&auto=format&fit=crop',
  trailMix: 'https://images.unsplash.com/photo-1536735515515-555df3fbca3a?q=80&w=600&auto=format&fit=crop',

  flask: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=600&auto=format&fit=crop',
  mug: 'https://images.unsplash.com/photo-1517256064527-09c53b2d0bc6?q=80&w=600&auto=format&fit=crop',
  bottle: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=600&auto=format&fit=crop',
  tumbler: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop',

  charger: 'https://images.unsplash.com/photo-1622445262465-2481c4574875?q=80&w=600&auto=format&fit=crop',
  speaker: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=600&auto=format&fit=crop',
  earbuds: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop',

  box1: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop',
  box2: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=600&auto=format&fit=crop',
  box3: 'https://images.unsplash.com/photo-1577085960689-3f7cb6c7526b?q=80&w=600&auto=format&fit=crop',

  generic1: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop',
  generic2: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=600&auto=format&fit=crop',
  generic3: 'https://images.unsplash.com/photo-1577085960689-3f7cb6c7526b?q=80&w=600&auto=format&fit=crop',
};

// Returns category-appropriate dynamic mock products based on the page name
function getCategoryProducts(categoryName: string): Product[] {
  const norm = categoryName.toLowerCase();

  if (
    norm.includes('recipient') ||
    norm.includes('women') ||
    norm.includes('men') ||
    norm.includes('wife') ||
    norm.includes('husband') ||
    norm.includes('couple') ||
    norm.includes('kids') ||
    norm.includes('parents') ||
    norm.includes('boyfriend') ||
    norm.includes('girlfriend')
  ) {
    return [
      { id: 'r1', name: 'Curated Luxury Hamper', brand: 'GIFTZ GALLEREI', price: 2499, image: MOCK_IMAGES.box1, category: 'Curated Hampers' },
      { id: 'r2', name: 'Personalized Keepsake Box', brand: 'GIFTZ GALLEREI', price: 1890, image: MOCK_IMAGES.box2, category: 'Personalized' },
      { id: 'r3', name: 'Artisan Gourmet Collection', brand: 'GIFTZ GALLEREI', price: 1650, image: MOCK_IMAGES.chocolates, category: 'Gourmet' },
      { id: 'r4', name: 'Wellness & Self Care Set', brand: 'GIFTZ GALLEREI', price: 2100, image: MOCK_IMAGES.candle, category: 'Self Care' },
    ];
  }

  if (norm.includes('bouquet') || norm.includes('spotlight') || norm.includes('collection')) {
    return [
      { id: 'cl1', name: 'Signature Floral Hamper', brand: 'GIFTZ GALLEREI', price: 1799, image: MOCK_IMAGES.box1, category: 'Bouquets' },
      { id: 'cl2', name: 'Spotlight Luxury Box', brand: 'GIFTZ GALLEREI', price: 3299, image: MOCK_IMAGES.box2, category: 'Spotlight' },
      { id: 'cl3', name: 'Luxe Collective Edition', brand: 'GIFTZ GALLEREI', price: 4599, image: MOCK_IMAGES.box3, category: 'Luxe' },
      { id: 'cl4', name: 'Same Day Bangalore Express', brand: 'GIFTZ GALLEREI', price: 1299, image: MOCK_IMAGES.generic1, category: 'Express' },
    ];
  }

  if (
    norm.includes('birthday') ||
    norm.includes('anniversary') ||
    norm.includes('thank') ||
    norm.includes('housewarming') ||
    norm.includes('get-well') ||
    norm.includes('office') ||
    norm.includes('occasion')
  ) {
    return [
      { id: 'oc1', name: 'Celebration Gift Hamper', brand: 'GIFTZ GALLEREI', price: 2199, image: MOCK_IMAGES.box1, category: 'Celebration' },
      { id: 'oc2', name: 'Thank You Gourmet Box', brand: 'GIFTZ GALLEREI', price: 1450, image: MOCK_IMAGES.chocolates, category: 'Thank You' },
      { id: 'oc3', name: 'Office Appreciation Kit', brand: 'GIFTZ GALLEREI', price: 1980, image: MOCK_IMAGES.deskMat, category: 'Office' },
      { id: 'oc4', name: 'Milestone Keepsake Set', brand: 'GIFTZ GALLEREI', price: 2750, image: MOCK_IMAGES.frame, category: 'Milestones' },
    ];
  }

  if (norm.includes('love') || norm.includes('interest')) {
    return [
      { id: 'in1', name: 'Romantic Indulgence Hamper', brand: 'GIFTZ GALLEREI', price: 2899, image: MOCK_IMAGES.chocolates, category: 'Love' },
      { id: 'in2', name: 'Couples Celebration Box', brand: 'GIFTZ GALLEREI', price: 3200, image: MOCK_IMAGES.box2, category: 'Love' },
      { id: 'in3', name: 'Gourmet Date Night Set', brand: 'GIFTZ GALLEREI', price: 1750, image: MOCK_IMAGES.coffee, category: 'Gourmet' },
    ];
  }

  if (norm.includes('gift card')) {
    return [
      { id: 'gc1', name: 'Digital Gift Card — Rs 1000', brand: 'GIFTZ GALLEREI', price: 1000, image: MOCK_IMAGES.box1, category: 'Gift Cards' },
      { id: 'gc2', name: 'Digital Gift Card — Rs 2500', brand: 'GIFTZ GALLEREI', price: 2500, image: MOCK_IMAGES.box2, category: 'Gift Cards' },
      { id: 'gc3', name: 'Digital Gift Card — Rs 5000', brand: 'GIFTZ GALLEREI', price: 5000, image: MOCK_IMAGES.box3, category: 'Gift Cards' },
    ];
  }

  if (norm.includes('travel') || norm.includes('luggage') || norm.includes('lifestyle')) {
    return [
      { id: 't1', name: 'Wire organiser - felt', brand: 'BOX BUILDER', price: 80, image: MOCK_IMAGES.feltOrganizer, category: 'Travel' },
      { id: 't2', name: 'Canvas - White Pouch', brand: 'BOX BUILDER', price: 190, image: MOCK_IMAGES.canvasPouch, category: 'Travel' },
      { id: 't3', name: 'Tech Organizer - Apollo', brand: 'BOX BUILDER', price: 1105, image: MOCK_IMAGES.techOrganizer, category: 'Travel' },
      { id: 't4', name: 'Passport Organizer', brand: 'BOX BUILDER', price: 870, image: MOCK_IMAGES.passportOrganizer, category: 'Travel' },
      { id: 't5', name: 'Luggage tag - Deri', brand: 'BOX BUILDER', price: 580, image: MOCK_IMAGES.luggageTag, category: 'Travel' },
      { id: 't6', name: 'Sunglass pouch', brand: 'BOX BUILDER', price: 625, image: MOCK_IMAGES.sunglassPouch, category: 'Travel' },
      { id: 't7', name: 'Passport Pouch', brand: 'BOX BUILDER', price: 780, image: MOCK_IMAGES.passportPouch, category: 'Travel' },
      { id: 't8', name: 'Travel Pouch - Felt', brand: 'BOX BUILDER', price: 625, image: MOCK_IMAGES.travelPouch, category: 'Travel' },
      { id: 't9', name: 'Storage pouches - felt', brand: 'BOX BUILDER', price: 825, image: MOCK_IMAGES.storagePouches, isSoldOut: true, category: 'Travel' },
    ];
  }
  
  if (norm.includes('desk') || norm.includes('journal') || norm.includes('pen') || norm.includes('stationery') || norm.includes('work')) {
    return [
      { id: 'd1', name: 'Leather Desk Mat - Tan', brand: 'BOX BUILDER', price: 1299, image: MOCK_IMAGES.deskMat, category: 'Desk Essentials' },
      { id: 'd2', name: 'Sleek Executive Brass Pen', brand: 'BOX BUILDER', price: 450, image: MOCK_IMAGES.brassPen, category: 'Desk Essentials' },
      { id: 'd3', name: 'Minimalist Linen Journal', brand: 'BOX BUILDER', price: 550, image: MOCK_IMAGES.journal, category: 'Desk Essentials' },
      { id: 'd4', name: 'Cork Desk Pen Cup', brand: 'BOX BUILDER', price: 290, image: MOCK_IMAGES.penCup, category: 'Desk Essentials' },
      { id: 'd5', name: 'Brass Paperweight - Crown', brand: 'BOX BUILDER', price: 850, image: MOCK_IMAGES.paperweight, category: 'Desk Essentials' },
      { id: 'd6', name: 'Handcrafted Leather Notebook', brand: 'BOX BUILDER', price: 950, image: MOCK_IMAGES.notebook, category: 'Desk Essentials' },
    ];
  }
  
  if (norm.includes('plant') || norm.includes('pot') || norm.includes('decor') || norm.includes('light') || norm.includes('lamp') || norm.includes('fragrance')) {
    return [
      { id: 'h1', name: 'Geometric Ceramic Planter', brand: 'BOX BUILDER', price: 420, image: MOCK_IMAGES.planter, category: 'Home & Decor' },
      { id: 'h2', name: 'Soy Wax Scented Candle', brand: 'BOX BUILDER', price: 380, image: MOCK_IMAGES.candle, category: 'Home & Decor' },
      { id: 'h3', name: 'Minimalist Wooden Desk Lamp', brand: 'BOX BUILDER', price: 1850, image: MOCK_IMAGES.lamp, category: 'Home & Decor' },
      { id: 'h4', name: 'Earthy Terrazzo Flower Vase', brand: 'BOX BUILDER', price: 890, image: MOCK_IMAGES.vase, category: 'Home & Decor' },
      { id: 'h5', name: 'Luxury Lavender Reed Diffuser', brand: 'BOX BUILDER', price: 650, image: MOCK_IMAGES.diffuser, category: 'Home & Decor' },
      { id: 'h6', name: 'Handcrafted Walnut Photo Frame', brand: 'BOX BUILDER', price: 750, image: MOCK_IMAGES.frame, category: 'Home & Decor' },
    ];
  }
  
  if (norm.includes('choc') || norm.includes('coffee') || norm.includes('tea') || norm.includes('snack') || norm.includes('edible') || norm.includes('nut') || norm.includes('seed')) {
    return [
      { id: 'g1', name: 'Artisanal Dark Chocolate Box', brand: 'BOX BUILDER', price: 320, image: MOCK_IMAGES.chocolates, category: 'Gourmet' },
      { id: 'g2', name: 'Single-Origin Premium Coffee Blend', brand: 'BOX BUILDER', price: 480, image: MOCK_IMAGES.coffee, category: 'Gourmet' },
      { id: 'g3', name: 'Organic Lavender Herbal Tea Box', brand: 'BOX BUILDER', price: 450, image: MOCK_IMAGES.tea, category: 'Gourmet' },
      { id: 'g4', name: 'Slow-Roasted Gourmet Nuts Mix', brand: 'BOX BUILDER', price: 390, image: MOCK_IMAGES.nuts, category: 'Gourmet' },
      { id: 'g5', name: 'Handcrafted Butter Cookies Box', brand: 'BOX BUILDER', price: 280, image: MOCK_IMAGES.cookies, category: 'Gourmet' },
      { id: 'g6', name: 'Superfood Organic Trail Mix', brand: 'BOX BUILDER', price: 340, image: MOCK_IMAGES.trailMix, category: 'Gourmet' },
    ];
  }

  if (norm.includes('drink')) {
    return [
      { id: 'dr1', name: 'Insulated Stainless Steel Flask', brand: 'BOX BUILDER', price: 890, image: MOCK_IMAGES.flask, category: 'Drinkware' },
      { id: 'dr2', name: 'Luxury Matte Coffee Mug Set', brand: 'BOX BUILDER', price: 680, image: MOCK_IMAGES.mug, category: 'Drinkware' },
      { id: 'dr3', name: 'Handcrafted Copper Water Bottle', brand: 'BOX BUILDER', price: 980, image: MOCK_IMAGES.bottle, category: 'Drinkware' },
      { id: 'dr4', name: 'Double-Walled Glass Coffee Tumbler', brand: 'BOX BUILDER', price: 420, image: MOCK_IMAGES.tumbler, category: 'Drinkware' },
    ];
  }

  if (norm.includes('gadget') || norm.includes('electronic') || norm.includes('tech')) {
    return [
      { id: 'tc1', name: 'Elite Wireless Charging Pad', brand: 'BOX BUILDER', price: 1499, image: MOCK_IMAGES.charger, category: 'Tech' },
      { id: 'tc2', name: 'Sleek Retro Bluetooth Speaker', brand: 'BOX BUILDER', price: 2450, image: MOCK_IMAGES.speaker, category: 'Tech' },
      { id: 'tc3', name: 'Premium Noise-Cancelling Earbuds', brand: 'BOX BUILDER', price: 3850, image: MOCK_IMAGES.earbuds, category: 'Tech' },
      { id: 'tc4', name: 'Leather Tech Organizer Roll', brand: 'BOX BUILDER', price: 1250, image: MOCK_IMAGES.techOrganizer, category: 'Tech' },
    ];
  }

  if (norm.includes('welcome') || norm.includes('anniversary') || norm.includes('reward') || norm.includes('kit') || norm.includes('box')) {
    return [
      { id: 'cb1', name: 'Elite Executive Welcome Box', brand: 'BOX BUILDER', price: 3499, image: MOCK_IMAGES.box1, category: 'Corporate Hampers' },
      { id: 'cb2', name: 'Milestone Celebration Box', brand: 'BOX BUILDER', price: 4250, image: MOCK_IMAGES.box2, category: 'Corporate Hampers' },
      { id: 'cb3', name: 'Premium Employee Reward Set', brand: 'BOX BUILDER', price: 2850, image: MOCK_IMAGES.box3, category: 'Corporate Hampers' },
    ];
  }

  // Fallback beautiful generic gift set items
  return [
    { id: 'gn1', name: 'Luxury Leather Cardholder', brand: 'BOX BUILDER', price: 650, image: MOCK_IMAGES.generic1, category: 'Premium Gifts' },
    { id: 'gn2', name: 'Elegant Scented Reed Diffuser', brand: 'BOX BUILDER', price: 780, image: MOCK_IMAGES.generic2, category: 'Premium Gifts' },
    { id: 'gn3', name: 'Handcrafted Walnut Desk Block', brand: 'BOX BUILDER', price: 890, image: MOCK_IMAGES.generic3, category: 'Premium Gifts' },
    { id: 'gn4', name: 'Minimalist Vegan Leather Desk Pad', brand: 'BOX BUILDER', price: 1290, image: MOCK_IMAGES.generic1, category: 'Premium Gifts' },
  ];
}

export default function PlaceholderPage({ title, categoryKey, minPrice, maxPrice }: PlaceholderPageProps) {
  // Sorting state
  const [sortBy, setSortBy] = useState<'best' | 'low' | 'high' | 'new' | 'rec'>('best');
  
  // Collapse sidebar states
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(true);

  // Active filters states
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);

  // Get raw products based on page name
  const rawProducts = useMemo(
    () => getCategoryProducts(categoryKey ?? title),
    [title, categoryKey]
  );

  // Dynamically filter and sort products list in real-time!
  const processedProducts = useMemo(() => {
    let list = [...rawProducts];

    // Filter by availability
    if (inStockOnly) {
      list = list.filter(p => !p.isSoldOut);
    }

    // Filter by category
    if (selectedCategoryFilter) {
      list = list.filter(p => p.category === selectedCategoryFilter);
    }

    if (minPrice != null) {
      list = list.filter(p => p.price >= minPrice);
    }
    if (maxPrice != null) {
      list = list.filter(p => p.price <= maxPrice);
    }

    // Apply sorting
    if (sortBy === 'low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'new') {
      // Reverses mock IDs to pretend newness
      list.reverse();
    }

    return list;
  }, [rawProducts, sortBy, inStockOnly, selectedCategoryFilter, minPrice, maxPrice]);

  // Dynamic filter categories available in this list
  const availableCategories = useMemo(() => {
    const set = new Set(rawProducts.map(p => p.category));
    return Array.from(set);
  }, [rawProducts]);

  return (
    <div className="flex min-h-screen flex-col bg-[#FFF9F5]">
      <Navbar />

      <main className="flex-grow pb-24 px-4 sm:px-6 lg:px-8 pt-[12rem] md:pt-[10.5rem] xl:pt-[6.5rem] 2xl:pt-[7rem]">
        <div className="mx-auto max-w-7xl">
          {/* Centered Page Title Section */}
          <div className="flex flex-col items-center justify-center pt-8 pb-10 text-center">
            {/* Gold Flourish lines and cross */}
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-[1px] bg-[#d8cec1]" />
              <X className="h-3 w-3 text-[#9D7D47] opacity-80 rotate-45" strokeWidth={2.5} />
              <span className="w-8 h-[1px] bg-[#d8cec1]" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-normal tracking-wide text-[#4A1020] uppercase">
              {title.endsWith('Gifts') || title.endsWith('Gifting') ? title : `${title} Gifts`}
            </h1>
          </div>

          {/* Controls Bar: Sort, View, Result counter */}
          <div className="flex flex-col gap-4 border-b border-[#d8cec1]/40 pb-4 mb-8 sm:flex-row sm:items-center sm:justify-between text-[13px] font-sans">
            {/* Left side: Sort options */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-gray-500">
              <span className="font-semibold text-gray-800">Sort By:</span>
              <button
                onClick={() => setSortBy('best')}
                className={`px-2 py-0.5 rounded transition-colors font-medium ${sortBy === 'best' ? 'text-[#9D7D47] font-bold underline decoration-2 underline-offset-4' : 'hover:text-[#4A1020]'}`}
              >
                Best Selling
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => setSortBy('high')}
                className={`px-2 py-0.5 rounded transition-colors font-medium ${sortBy === 'high' ? 'text-[#9D7D47] font-bold underline decoration-2 underline-offset-4' : 'hover:text-[#4A1020]'}`}
              >
                Price: High to Low
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => setSortBy('low')}
                className={`px-2 py-0.5 rounded transition-colors font-medium ${sortBy === 'low' ? 'text-[#9D7D47] font-bold underline decoration-2 underline-offset-4' : 'hover:text-[#4A1020]'}`}
              >
                Price: Low to High
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => setSortBy('new')}
                className={`px-2 py-0.5 rounded transition-colors font-medium ${sortBy === 'new' ? 'text-[#9D7D47] font-bold underline decoration-2 underline-offset-4' : 'hover:text-[#4A1020]'}`}
              >
                New
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => setSortBy('rec')}
                className={`px-2 py-0.5 rounded transition-colors font-medium ${sortBy === 'rec' ? 'text-[#9D7D47] font-bold underline decoration-2 underline-offset-4' : 'hover:text-[#4A1020]'}`}
              >
                Recommended
              </button>
            </div>

            {/* Right side: Product counter */}
            <div className="font-sans font-medium text-gray-500">
              Search Result: {processedProducts.length} {processedProducts.length === 1 ? 'product' : 'products'}
            </div>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            {/* Left Sidebar Filter Section */}
            <aside className="w-full lg:w-64 shrink-0 bg-white border border-[#d8cec1]/40 rounded-2xl p-6 shadow-sm">
              {/* Product Category collapsible */}
              <div className="border-b border-[#d8cec1]/30 pb-4 mb-4">
                <button
                  onClick={() => setIsCategoryOpen(o => !o)}
                  className="flex w-full items-center justify-between font-sans text-[13px] font-bold uppercase tracking-wider text-[#4A1020]"
                >
                  <span>Product Category</span>
                  {isCategoryOpen ? <ChevronUp className="h-4 w-4 text-[#9D7D47]" /> : <ChevronDown className="h-4 w-4 text-[#9D7D47]" />}
                </button>
                {isCategoryOpen && (
                  <div className="mt-3 flex flex-col gap-2.5 pl-0.5">
                    <button
                      onClick={() => setSelectedCategoryFilter(null)}
                      className={`text-left text-[13.5px] transition-colors ${!selectedCategoryFilter ? 'text-[#9D7D47] font-bold' : 'text-gray-600 hover:text-[#4A1020]'}`}
                    >
                      All Categories
                    </button>
                    {availableCategories.map(cat => (
                      <label key={cat} className="flex items-center gap-2.5 text-[13.5px] text-gray-600 hover:text-[#4A1020] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategoryFilter === cat}
                          onChange={() => setSelectedCategoryFilter(selectedCategoryFilter === cat ? null : cat)}
                          className="rounded border-[#d8cec1] text-[#9D7D47] focus:ring-[#9D7D47]/30 h-4 w-4 shrink-0 cursor-pointer"
                        />
                        <span>{cat}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Price collapsible */}
              <div className="border-b border-[#d8cec1]/30 pb-4 mb-4">
                <button
                  onClick={() => setIsPriceOpen(o => !o)}
                  className="flex w-full items-center justify-between font-sans text-[13px] font-bold uppercase tracking-wider text-[#4A1020]"
                >
                  <span>Price</span>
                  {isPriceOpen ? <ChevronUp className="h-4 w-4 text-[#9D7D47]" /> : <ChevronDown className="h-4 w-4 text-[#9D7D47]" />}
                </button>
                {isPriceOpen && (
                  <div className="mt-3 flex flex-col pl-0.5">
                    {/* Visual premium slider track */}
                    <div className="relative h-1 w-full bg-[#FAF7F4] border border-[#d8cec1]/40 rounded-full mb-3">
                      <div className="absolute top-0 bottom-0 left-0 right-0 bg-[#9D7D47] rounded-full opacity-60" />
                      <span className="absolute -top-1.5 left-0 h-4 w-4 rounded-full bg-white border-2 border-[#9D7D47] shadow cursor-pointer" />
                      <span className="absolute -top-1.5 right-0 h-4 w-4 rounded-full bg-white border-2 border-[#9D7D47] shadow cursor-pointer" />
                    </div>
                    <div className="flex items-center justify-between text-[12.5px] font-sans text-gray-600 font-semibold mt-1">
                      <span>Rs 1</span>
                      <span>Rs 4999</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Availability collapsible */}
              <div className="pb-2">
                <button
                  onClick={() => setIsAvailabilityOpen(o => !o)}
                  className="flex w-full items-center justify-between font-sans text-[13px] font-bold uppercase tracking-wider text-[#4A1020]"
                >
                  <span>Availability</span>
                  {isAvailabilityOpen ? <ChevronUp className="h-4 w-4 text-[#9D7D47]" /> : <ChevronDown className="h-4 w-4 text-[#9D7D47]" />}
                </button>
                {isAvailabilityOpen && (
                  <div className="mt-3 flex flex-col gap-2.5 pl-0.5">
                    <label className="flex items-center gap-2.5 text-[13.5px] text-gray-600 hover:text-[#4A1020] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => setInStockOnly(e.target.checked)}
                        className="rounded border-[#d8cec1] text-[#9D7D47] focus:ring-[#9D7D47]/30 h-4 w-4 shrink-0 cursor-pointer"
                      />
                      <span>In stock ({rawProducts.filter(p => !p.isSoldOut).length})</span>
                    </label>
                    <label className="flex items-center gap-2.5 text-[13.5px] text-gray-600 hover:text-[#4A1020] cursor-pointer opacity-70">
                      <input
                        type="checkbox"
                        disabled
                        checked={false}
                        className="rounded border-[#d8cec1] text-[#9D7D47] focus:ring-[#9D7D47]/30 h-4 w-4 shrink-0 cursor-not-allowed"
                      />
                      <span>Out of stock ({rawProducts.filter(p => p.isSoldOut).length})</span>
                    </label>
                  </div>
                )}
              </div>
            </aside>

            {/* Right Product Grid Area */}
            <div className="flex-1">
              {processedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                  {processedProducts.map((product) => (
                    <div key={product.id} className="group relative flex flex-col overflow-visible">
                      {/* Product Image Box */}
                      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#F6F3EE] border border-[#d8cec1]/20 transition-all duration-300 group-hover:shadow-[0_8px_24px_rgba(74,16,32,0.06)]">
                        {/* Sold out Badge overlay */}
                        {product.isSoldOut && (
                          <span className="absolute left-3 top-3 z-10 bg-[#FFF9F5]/90 border border-[#d8cec1] text-gray-600 font-sans font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-[4px] leading-none shadow-sm select-none">
                            Sold out
                          </span>
                        )}
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                        {/* Hover Overlay CTA */}
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 pointer-events-none">
                          <span className="bg-[#4A1020] text-white font-sans font-bold text-[10px] uppercase tracking-widest px-4.5 py-2.5 rounded-full shadow-md leading-none transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            Select Gift
                          </span>
                        </div>
                      </div>

                      {/* Brand name */}
                      <span className="font-sans text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#9D7D47] mt-3.5 leading-none">
                        {product.brand}
                      </span>

                      {/* Product Name */}
                      <h3 className="font-sans text-[14px] font-bold text-[#1A1010] mt-1.5 group-hover:text-[#9D7D47] transition-colors leading-snug cursor-pointer tracking-tight">
                        {product.name}
                      </h3>

                      {/* Price */}
                      <span className="font-sans text-[14.5px] font-bold text-[#4A1020] mt-1">
                        ₹ {product.price.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white border border-[#d8cec1]/20 rounded-2xl p-8">
                  <SlidersHorizontal className="mx-auto h-8 w-8 text-[#9D7D47] opacity-60 mb-3" />
                  <h3 className="font-sans text-[15px] font-bold uppercase tracking-wide text-[#4A1020]">No products match these filters</h3>
                  <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
                    Try relaxing your sidebar filter choices to browse the full luxurious category selection.
                  </p>
                  <button
                    onClick={() => {
                      setInStockOnly(false);
                      setSelectedCategoryFilter(null);
                    }}
                    className="mt-4 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#4A1020] hover:bg-[#5C1629] rounded-full transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
