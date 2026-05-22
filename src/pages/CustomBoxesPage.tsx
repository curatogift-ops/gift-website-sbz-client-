import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Package } from 'lucide-react';

export default function CustomBoxesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-grow pb-24 px-6 pt-[12rem] md:pt-[9.5rem] xl:pt-[5.75rem] 2xl:pt-[6rem]">
        <div className="container mx-auto max-w-lg text-center py-16">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#C9A96E]/40 bg-gradient-to-b from-white to-[#FAF7F4] text-[#6B1E30] shadow-sm">
            <Package className="h-7 w-7" strokeWidth={2.25} aria-hidden />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Custom boxes</h1>
          <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
            Build bespoke hampers and branded gift boxes. Tell us your occasion and budget — we will help you curate
            something unforgettable.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#6B1E30] px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#F2EDE8] shadow-md transition-colors hover:bg-[#8C3048]"
          >
            Start with the shop
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
