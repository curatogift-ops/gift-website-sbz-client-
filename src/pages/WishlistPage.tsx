import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Heart } from 'lucide-react';

export default function WishlistPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-grow pb-24 px-6 pt-[12rem] md:pt-[9.5rem] xl:pt-[5.75rem] 2xl:pt-[6rem]">
        <div className="container mx-auto max-w-lg text-center py-16">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#C9A96E]/40 bg-gradient-to-b from-white to-surface-muted text-[#6B1E30] shadow-sm">
            <Heart className="h-7 w-7" strokeWidth={2.25} aria-hidden />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Your wishlist</h1>
          <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
            Save hampers you love here. We will connect this to your account soon.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#6B1E30] px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#F2EDE8] shadow-md transition-colors hover:bg-[#8C3048]"
          >
            Browse shop
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
