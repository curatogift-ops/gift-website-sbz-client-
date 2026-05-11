'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/shop/ProductCard';
import { SlidersHorizontal, ChevronDown, Sparkles } from 'lucide-react';

async function fetchProducts() {
  const { data } = await api.get('/products/list/');
  return data;
}

export default function ShopPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-grow pb-24 px-6 pt-[12rem] md:pt-[10.5rem]">
        <div className="container mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 py-12 border-b border-border/50">
            <div className="space-y-4 max-w-2xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
                <Sparkles size={14} /> Premium Selection
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">The <br className="hidden md:block"/><span className="text-gradient">Hamper Shop</span></h1>
              <p className="text-[#4A4A4A] font-medium text-lg leading-relaxed">Discover our full range of curated gift hampers for weddings, corporate events, and personal milestones.</p>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button className="flex-grow md:flex-none flex items-center justify-center gap-3 border-2 border-foreground px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-foreground hover:text-white transition-all">
                <SlidersHorizontal size={18} /> Filters
              </button>
              <button className="flex-grow md:flex-none flex items-center justify-center gap-3 border-2 border-foreground px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-foreground hover:text-white transition-all">
                Sort by <ChevronDown size={18} />
              </button>
            </div>
          </div>

          {/* Product Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse space-y-6">
                  <div className="aspect-[4/5] bg-muted rounded-[2rem]" />
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded w-1/4" />
                    <div className="h-8 bg-muted rounded w-3/4" />
                    <div className="h-6 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-24 bg-muted/50 rounded-[3rem]">
              <h2 className="text-3xl font-black uppercase tracking-tight mb-4">Connection Issue</h2>
              <p className="text-muted-foreground font-medium mb-8">We're having trouble reaching our catalog. Please try again in a moment.</p>
              <button onClick={() => window.location.reload()} className="btn-primary">RETRY LOAD</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
              {data?.results?.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
              
              {/* If no products, show empty state */}
              {data?.results?.length === 0 && (
                <div className="col-span-full text-center py-24">
                  <h3 className="text-2xl font-black uppercase">No Hampers Found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
