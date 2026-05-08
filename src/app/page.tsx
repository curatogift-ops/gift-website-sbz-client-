import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Gift, Sparkles, Truck, Heart, Star, ChevronRight, CheckCircle } from "lucide-react";
import { cn } from "@/utils/cn";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white selection:bg-primary/20">
      <Navbar />
      
      <main className="flex-grow pt-[140px] md:pt-[160px]">
        {/* Boxup-Style Hero Section */}
        <section className="relative min-h-[70vh] md:h-[85vh] flex items-center overflow-hidden bg-[#F9F9F9] py-12 md:py-0">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 items-center gap-12 h-full">
            {/* Left Image Area */}
            <div className="relative h-[300px] md:h-[500px] w-full order-2 md:order-1">
              <Image 
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80"
                alt="Premium Gift Hamper"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Right Content Area */}
            <div className="text-center md:text-left space-y-8 order-1 md:order-2">
              <div className="space-y-4">
                <p className="text-[#1B3022] font-black uppercase tracking-[0.3em] text-xs">Give a Gift That Counts...</p>
                <h1 className="text-4xl md:text-7xl font-serif italic text-[#1B3022] leading-[1.1]">
                  A hamper for every <br />
                  <span className="font-sans not-italic font-black uppercase tracking-tighter block mt-2">Occasion & Mood!</span>
                </h1>
              </div>
              
              <div className="pt-4">
                <Link href="/shop" className="inline-flex items-center gap-3 bg-[#1B3022] text-white px-10 py-5 rounded-lg text-lg font-bold hover:bg-black transition-all group shadow-xl">
                  Discover Now <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Background Decorative Element */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/50 to-transparent pointer-events-none" />
        </section>

        {/* Info Bar Section */}
        <section className="bg-[#B08968] text-white py-5 overflow-hidden relative z-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-between items-center gap-8 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
              <div className="flex items-center gap-3">
                <Truck size={16} /> 24 - 48 hours delivery available
              </div>
              <div className="flex items-center gap-3">
                <Star size={16} /> Flat 10% Off sitewide
              </div>
              <div className="flex items-center gap-3">
                <Gift size={16} /> Customize your Gifts
              </div>
              <div className="hidden lg:flex items-center gap-3">
                <CheckCircle size={16} /> Premium Quality Guaranteed
              </div>
            </div>
          </div>
        </section>

        {/* Perfect Picks Section */}
        <section className="py-24 bg-[#FCF9F6] relative overflow-hidden">
          {/* Botanical Background SVGs */}
          <div className="absolute top-10 left-10 opacity-10 pointer-events-none">
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M40 160C40 160 60 100 100 80C140 60 160 40 160 40M40 160C40 160 100 140 120 100C140 60 160 40 160 40" stroke="#B08968" strokeWidth="1" />
              <circle cx="160" cy="40" r="5" fill="#B08968" />
            </svg>
          </div>
          <div className="absolute bottom-10 right-10 opacity-10 pointer-events-none rotate-180">
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M40 160C40 160 60 100 100 80C140 60 160 40 160 40M40 160C40 160 100 140 120 100C140 60 160 40 160 40" stroke="#B08968" strokeWidth="1" />
              <circle cx="160" cy="40" r="5" fill="#B08968" />
            </svg>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif italic text-[#B08968] tracking-tight">Perfect Picks for Every Relationship</h2>
            </div>

            <div className="flex overflow-x-auto no-scrollbar pb-8 snap-x items-end justify-start md:justify-center gap-4 md:gap-8 lg:gap-12 flex-nowrap">
              {[
                { label: "For Her", img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80" },
                { label: "For Him", img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6?auto=format&fit=crop&q=80" },
                { label: "For Couple", img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80" },
                { label: "For Parents", img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80" },
                { label: "For Kids", img: "https://images.unsplash.com/photo-1544717305-996b815c338c?auto=format&fit=crop&q=80" }
              ].map((item, idx, arr) => (
                <div key={idx} className="flex items-center gap-4 md:gap-8 lg:gap-12 flex-shrink-0 snap-center">
                  <Link href={`/shop?relationship=${item.label.toLowerCase().replace(' ', '-')}`} className="group block text-center">
                    <div className="w-24 h-40 md:w-40 md:h-64 lg:w-48 lg:h-80 relative overflow-hidden rounded-t-full shadow-lg transition-transform duration-500 group-hover:-translate-y-2">
                      <Image 
                        src={item.img} 
                        alt={item.label} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    <div className="mt-4 bg-[#F5E6D3] py-2 md:py-4 px-2 rounded-lg text-[#1B3022] font-serif italic text-sm md:text-xl shadow-sm group-hover:bg-[#B08968] group-hover:text-white transition-colors">
                      {item.label}
                    </div>
                  </Link>
                  {idx < arr.length - 1 && (
                    <div className="hidden lg:block text-[#B08968] opacity-50">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20"/></svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Most Loved Gift Hampers Section */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-serif italic text-[#B08968] tracking-tight">Most Loved Gift Hampers</h2>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
              <div className="flex flex-wrap gap-3">
                {[
                  { name: "Mother's Day Gifts", active: true },
                  { name: "Romantic Love Gifts", active: false },
                  { name: "Birthday Gifts", active: false },
                  { name: "Eco-Friendly Gifts", active: false },
                  { name: "Chocolate Gift Box", active: false }
                ].map((tab, idx) => (
                  <button 
                    key={idx}
                    className={cn(
                      "px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border border-border",
                      tab.active ? "bg-[#F5E6D3] text-[#1B3022] border-[#F5E6D3]" : "bg-white text-muted-foreground hover:bg-muted"
                    )}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
              <Link href="/shop" className="text-sm font-bold flex items-center gap-2 text-[#1B3022] hover:text-[#B08968] transition-colors group">
                View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Product Carousel / Grid */}
            <div className="relative group">
              <div className="flex overflow-x-auto gap-8 pb-8 no-scrollbar snap-x">
                {[
                  { id: 1, name: "Purple Lily Bouquet", price: "785", img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80", cat: "Mother's Day Gifts" },
                  { id: 2, name: "The Kalamkari Collection", price: "1,190", img: "https://images.unsplash.com/photo-1544787210-2211d64b5d2b?auto=format&fit=crop&q=80", cat: "Mother's Day Gifts" },
                  { id: 3, name: "The Mama To Be Hamper", price: "680", img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80", cat: "Mother's Day Gifts" },
                  { id: 4, name: "The Golden Indulgence for Mom", price: "1,680", img: "https://images.unsplash.com/photo-1548598141-efd3979912a1?auto=format&fit=crop&q=80", cat: "Mother's Day Gifts" },
                  { id: 5, name: "The Lilac Serenity Hamper", price: "2,345", img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80", cat: "Mother's Day Gifts" },
                  { id: 6, name: "A Little Lavender Joy", price: "1,280", img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80", cat: "Mother's Day Gifts" }
                ].map((p) => (
                  <div key={p.id} className="min-w-[280px] md:min-w-[320px] snap-start group/card">
                    <div className="relative aspect-square bg-[#F9F9F9] overflow-hidden mb-4 rounded-xl">
                      <Image src={p.img} fill className="object-cover group-hover/card:scale-105 transition-transform duration-700" alt={p.name} />
                      <button className="absolute top-4 right-4 text-white hover:text-primary transition-colors drop-shadow-md">
                        <Heart size={20} className={cn(p.id === 1 ? "fill-white" : "")} />
                      </button>
                    </div>
                    <h3 className="text-sm md:text-base font-bold text-[#1B3022] mb-1 line-clamp-1">{p.name}</h3>
                    <p className="text-[10px] text-muted-foreground mb-2 uppercase tracking-wider">{p.cat}</p>
                    <p className="text-sm md:text-base font-black text-[#1B3022]">₹ {p.price}</p>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-[#1B3022]">
                <ChevronRight className="rotate-180" size={24} />
              </button>
              <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-[#1B3022]">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </section>

        {/* Price Based Collection Section */}
        <section className="py-24 bg-[#F9F9F9]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-4xl font-serif italic text-[#B08968] tracking-tight">Luxury Gift Hampers in India for Every Occasion</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Elegant Finds", price: "Under ₹500", img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80" },
                { title: "Premium Selections", price: "₹500- ₹1500", img: "https://images.unsplash.com/photo-1544787210-2211d64b5d2b?auto=format&fit=crop&q=80" },
                { title: "Exquisite Indulgence", price: "₹1500- ₹3000", img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80" },
                { title: "Bespoke Luxury", price: "Above ₹3000", img: "https://images.unsplash.com/photo-1548598141-efd3979912a1?auto=format&fit=crop&q=80" }
              ].map((item, idx) => (
                <Link key={idx} href="/shop" className="group block relative aspect-[3/4] bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all rounded-lg border border-border/50">
                  {/* Top Label */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#F5E6D3] px-6 py-2 rounded shadow-sm z-10 transition-transform group-hover:scale-105">
                    <span className="text-[#1B3022] text-[10px] md:text-xs font-bold uppercase tracking-widest">{item.title}</span>
                  </div>

                  {/* Image */}
                  <Image 
                    src={item.img} 
                    alt={item.title} 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />

                  {/* Bottom Price Label */}
                  <div className="absolute bottom-6 left-6 right-6 bg-black text-white py-3 text-center z-10 font-black uppercase tracking-widest text-xs md:text-sm group-hover:bg-[#1B3022] transition-colors">
                    {item.price}
                  </div>

                  {/* Overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Personalized & Custom Gift Hampers Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-2xl md:text-4xl font-serif italic text-[#B08968] tracking-tight">Personalized & Custom Gift Hampers</h2>
              <p className="text-muted-foreground text-sm max-w-2xl mx-auto">Add a personal touch with customized messages, unique packaging, and handpicked products for a meaningful gift.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {[
                { name: "The Custom Newspaper", price: "315", img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80", soldOut: true },
                { name: "Love in Frames Bouquet", price: "860", img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80", soldOut: false },
                { name: "The Custom Crest", price: "400", img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80", soldOut: false },
                { name: "Magnetic Memories", price: "525", img: "https://images.unsplash.com/photo-1544717305-996b815c338c?auto=format&fit=crop&q=80", soldOut: false }
              ].map((p, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="relative aspect-square bg-[#F9F9F9] overflow-hidden mb-4 rounded-sm">
                    <Image src={p.img} fill className="object-cover group-hover:scale-105 transition-transform duration-700" alt={p.name} />
                    {p.soldOut && (
                      <div className="absolute bottom-4 left-4 bg-[#FFB100] text-white text-[10px] font-bold px-2 py-1 rounded-sm">
                        Sold out
                      </div>
                    )}
                  </div>
                  <h3 className="text-base font-serif italic text-[#1B3022] mb-1">{p.name}</h3>
                  <p className="text-sm font-bold text-[#1B3022]">₹ {p.price}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/shop" className="inline-block bg-[#B08968] text-white px-10 py-3 rounded text-sm font-bold uppercase tracking-widest hover:bg-[#1B3022] transition-colors shadow-md">
                View all
              </Link>
            </div>
          </div>
        </section>

        {/* Make Your Own Hamper Section */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-2xl md:text-4xl font-serif italic text-[#B08968] tracking-tight">Make your Own Hamper</h2>
              <p className="text-muted-foreground text-[10px] md:text-xs max-w-3xl mx-auto leading-relaxed uppercase tracking-widest">Curate a bespoke hamper with gourmet treats, artisanal delights, and premium lifestyle essentials. Elegantly packaged and thoughtfully designed, each hamper is a unique expression of care and refined taste.</p>
            </div>

            <div className="relative group cursor-pointer">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative aspect-[4/3] md:aspect-auto md:h-[500px] overflow-hidden rounded-sm shadow-md">
                  <Image src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" alt="Personalizing your gift" />
                </div>
                <div className="relative aspect-[4/3] md:aspect-auto md:h-[500px] overflow-hidden rounded-sm shadow-md">
                  <Image src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" alt="Luxury gift boxes" />
                </div>
              </div>

              {/* Central Floating Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <Link href="/hamper-builder" className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex flex-col items-center justify-center text-center p-4 shadow-2xl border border-border group-hover:scale-110 transition-transform duration-500">
                  <span className="text-[10px] md:text-xs font-serif italic text-[#1B3022] leading-tight">Make your Own Hamper</span>
                  <ArrowRight size={16} className="text-[#B08968] mt-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Elegant Gifts for Every Celebration Section */}
        <section className="py-24 bg-[#FCF9F6]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-2xl md:text-4xl font-serif italic text-[#B08968] tracking-tight">Elegant Gifts for Every Celebration</h2>
              <p className="text-muted-foreground text-[10px] md:text-xs max-w-3xl mx-auto leading-relaxed uppercase tracking-widest">Explore premium gift hampers thoughtfully curated to suit every occasion - with gourmet delights, elegant packaging, and a personal touch that makes every gift memorable.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[800px]">
              {/* Left Column: Two Stacked */}
              <div className="grid grid-rows-2 gap-6 h-full">
                <Link href="/shop?occasion=birthday" className="group relative overflow-hidden rounded-sm shadow-md h-full">
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-8 py-2 z-10">
                    <span className="text-[#1B3022] text-[10px] font-bold uppercase tracking-widest">Birthday Gifts</span>
                  </div>
                  <Image src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80" fill className="object-cover group-hover:scale-105 transition-transform duration-700" alt="Birthday Gifts" />
                </Link>
                <div className="relative overflow-hidden rounded-sm shadow-md h-full bg-[#1B3022] flex items-center justify-center p-8">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center mx-auto">
                      <Image src="/images/gift-gallerei (transparent-background).png" width={40} height={40} className="invert opacity-50" alt="Logo Icon" />
                    </div>
                    <p className="text-white/50 text-[10px] uppercase tracking-[0.3em] font-bold">Luxury Gifting</p>
                  </div>
                </div>
              </div>

              {/* Center Column: One Large Vertical */}
              <Link href="/shop?occasion=housewarming" className="group relative overflow-hidden rounded-sm shadow-md h-full">
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-8 py-2 z-10">
                  <span className="text-[#1B3022] text-[10px] font-bold uppercase tracking-widest">Housewarming Gifts</span>
                </div>
                <Image src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80" fill className="object-cover group-hover:scale-105 transition-transform duration-700" alt="Housewarming Gifts" />
              </Link>

              {/* Right Column: One Large Vertical */}
              <Link href="/shop?occasion=baby-shower" className="group relative overflow-hidden rounded-sm shadow-md h-full">
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-8 py-2 z-10">
                  <span className="text-[#1B3022] text-[10px] font-bold uppercase tracking-widest">Baby Shower Hampers</span>
                </div>
                <Image src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80" fill className="object-cover group-hover:scale-105 transition-transform duration-700" alt="Baby Shower Hampers" />
              </Link>
            </div>
          </div>
        </section>

        {/* Corporate Banner */}
        <section className="py-24 bg-[#1B3022] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 grayscale">
            <Image src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80" fill className="object-cover" alt="Corporate" />
          </div>
          <div className="container mx-auto px-6 relative z-10 space-y-12">
            <div className="max-w-2xl space-y-6">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
                Bulk Corporate <br />
                <span className="text-[#B08968]">Gifting Solutions</span>
              </h2>
              <p className="text-xl text-white/70 font-medium leading-relaxed">
                Impress your clients and team with custom-branded luxury hampers. Hand-packed and delivered with precision.
              </p>
              <div className="flex flex-wrap gap-6 pt-6">
                <div className="flex items-center gap-3 font-bold uppercase tracking-widest text-[10px]">
                  <CheckCircle size={14} className="text-[#B08968]" /> Custom Branding
                </div>
                <div className="flex items-center gap-3 font-bold uppercase tracking-widest text-[10px]">
                  <CheckCircle size={14} className="text-[#B08968]" /> Bulk Discounts
                </div>
                <div className="flex items-center gap-3 font-bold uppercase tracking-widest text-[10px]">
                  <CheckCircle size={14} className="text-[#B08968]" /> Fast Logistics
                </div>
              </div>
            </div>
            <button className="bg-white text-[#1B3022] px-12 py-5 rounded-lg text-xl font-bold uppercase tracking-tighter hover:bg-[#B08968] hover:text-white transition-all">
              Get a Quote Now
            </button>
          </div>
        </section>

        {/* Social / Most Loved Gifts Reel Section */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-4xl font-serif italic text-[#B08968] tracking-tight">Most Loved Gifts</h2>
            </div>

            <div className="flex overflow-x-auto gap-4 no-scrollbar pb-8 snap-x">
              {[
                { title: "Curating Happiness", label: "The New Year Box", img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80" },
                { title: "The Velvet Season", label: "The Velvet Box", img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80" },
                { title: "Diwali Traditions", label: "Traditional Hamper", img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80" },
                { title: "SCRUMPTIOUS", label: "Gourmet Selection", img: "https://images.unsplash.com/photo-1544787210-2211d64b5d2b?auto=format&fit=crop&q=80" },
                { title: "The Diwali Glow", label: "Glow Box", img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80" },
                { title: "Diwali-e-Sanganer", label: "Sanganer Hamper", img: "https://images.unsplash.com/photo-1548598141-efd3979912a1?auto=format&fit=crop&q=80" },
                { title: "Refreshing Vibes", label: "Gift Box", img: "https://images.unsplash.com/photo-1544717305-996b815c338c?auto=format&fit=crop&q=80" },
                { title: "Magnetic Memories", label: "Custom Frame", img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80" }
              ].map((reel, idx) => (
                <div key={idx} className="min-w-[180px] md:min-w-[240px] aspect-[9/16] relative rounded-lg overflow-hidden group cursor-pointer snap-start shadow-xl">
                  <Image src={reel.img} fill className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]" alt={reel.title} />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

                  {/* Top Text */}
                  <div className="absolute top-8 left-4 right-4 text-center">
                    <p className="text-white font-serif italic text-lg md:text-2xl leading-tight drop-shadow-lg">{reel.title}</p>
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-6 left-4 right-4 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-sm overflow-hidden border border-white/30 flex-shrink-0 bg-white/20 backdrop-blur">
                      <Image src={reel.img} width={24} height={24} className="object-cover" alt="icon" />
                    </div>
                    <span className="text-white text-[10px] font-bold uppercase tracking-widest truncate">{reel.label}</span>
                  </div>

                  {/* Play/Hover Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                      <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials / Reviews Section */}
        <section className="py-24 bg-[#FCF9F6]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-4xl font-serif italic text-[#B08968] tracking-tight">Gifts that made an impression!</h2>
            </div>

            <div className="relative group">
              <div className="flex overflow-x-auto gap-6 no-scrollbar pb-12 snap-x">
                {[
                  { name: "nethra c.", text: "Amazing service and delivery time. Loved the gift I ordered for my friend. I would recommend Boxup for even corporate gifts.", rating: 5 },
                  { name: "Aanchal Agarwal", text: "Loved the gift from my husband. Thank you for a seamless experience", rating: 5 },
                  { name: "Milcah Shekinah", text: "Excellent experience with Giftz Gallerei! Beautiful presentation and timely delivery. Highly recommended.", rating: 5 },
                  { name: "Vanshika Rathi", text: "Great experience with Giftz Gallerei! Excellent hamper curation, beautiful presentation, timely delivery, and very smooth coordination.", rating: 5 }
                ].map((review, idx) => (
                  <div key={idx} className="min-w-[300px] md:min-w-[400px] bg-white p-8 rounded-2xl shadow-sm border border-border/50 snap-start flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-[#1B3022]">
                          {review.name[0]}
                        </div>
                        <span className="font-bold text-[#1B3022] text-sm">{review.name}</span>
                      </div>
                      <div className="flex gap-1 text-[#FF9800]">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={16} fill="currentColor" />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed italic">&quot;{review.text}&quot;</p>
                    </div>
                    <div className="mt-6 flex justify-end">
                      <Image src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" width={20} height={20} alt="Google" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Indicators */}
              <div className="flex justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#B08968]" />
                <div className="w-2 h-2 rounded-full bg-[#B08968]/20" />
                <div className="w-2 h-2 rounded-full bg-[#B08968]/20" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
