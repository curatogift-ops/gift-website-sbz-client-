'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, User, Menu, Search, Heart, ChevronDown, Truck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 w-full z-50">
      {/* Announcement Bar */}
      <div className="bg-[#1B3022] text-white py-2 px-4 text-center text-[10px] md:text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-4">
        <span>Flat 10% Off Sitewide | Use Code: <span className="bg-white text-[#1B3022] px-2 py-0.5 rounded ml-1">GIFTZ10</span></span>
        <span className="hidden md:flex items-center gap-2 border-l border-white/20 pl-4">
          <Truck size={14} /> Track your order
        </span>
      </div>

      <nav className={cn(
        "w-full transition-all duration-300 px-4 md:px-8 bg-white",
        isScrolled ? "shadow-md py-2" : "py-4"
      )}>
        <div className="max-w-7xl mx-auto">
          {/* Top Row: Buttons | Logo | Icons */}
          <div className="flex items-center justify-between gap-4 mb-4">
            {/* Left Buttons */}
            <div className="hidden lg:flex items-center gap-2">
              <Link href="/personalized" className="border border-border px-4 py-2 rounded text-[10px] font-bold uppercase tracking-wider hover:bg-muted transition-colors flex items-center gap-2">
                <Heart size={14} /> Personalized Gifts
              </Link>
              <Link href="/corporate" className="border border-border px-4 py-2 rounded text-[10px] font-bold uppercase tracking-wider hover:bg-muted transition-colors">
                Corporate Gifts
              </Link>
            </div>

            {/* Logo */}
            <Link href="/" className="relative w-40 h-10 md:w-52 md:h-14 transition-all duration-300 mx-auto">
              <Image 
                src="/images/gift-gallerei (transparent-background).png" 
                alt="Giftz Gallerei Logo" 
                fill
                className="object-contain"
                priority
              />
            </Link>

            {/* Right Icons */}
            <div className="flex items-center gap-4 md:gap-6 text-foreground">
              <div className="hidden md:flex items-center bg-muted/50 rounded-lg px-3 py-1.5 border border-border">
                <Search size={16} className="text-muted-foreground" />
                <input type="text" placeholder="Search for gifts..." className="bg-transparent border-none outline-none text-xs ml-2 w-40" />
              </div>
              <button className="hover:text-primary transition-colors hidden sm:block relative">
                <Heart size={20} />
                <span className="absolute -top-1 -right-1 primary-gradient text-white text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full">0</span>
              </button>
              <Link href="/account" className="hover:text-primary transition-colors"><User size={20} /></Link>
              <Link href="/cart" className="hover:text-primary transition-colors relative">
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 primary-gradient text-white text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full">0</span>
              </Link>
              <button className="lg:hidden hover:text-primary transition-colors"><Menu size={24} /></button>
            </div>
          </div>

          {/* Bottom Row: Navigation Menu */}
          <div className="hidden lg:flex items-center justify-center gap-8 text-[11px] uppercase tracking-[0.15em] font-bold border-t border-border pt-4">
            <Link href="/shop?new=true" className="flex items-center gap-1 hover:text-primary transition-colors relative">
              <span className="absolute -top-4 left-0 text-[8px] bg-primary text-white px-1.5 py-0.5 rounded">NEW</span>
              Mother&apos;s Day Gifts <ChevronDown size={12} />
            </Link>
            <Link href="/shop?category=wedding" className="hover:text-primary transition-colors">Wedding Return Gifts</Link>
            <Link href="/shop" className="flex items-center gap-1 hover:text-primary transition-colors">Shop Gifts <ChevronDown size={12} /></Link>
            <Link href="/hamper-builder" className="hover:text-primary transition-colors">Make Your Own Hamper</Link>
            <Link href="/shop?new=true" className="flex items-center gap-1 hover:text-primary transition-colors relative">
              <span className="absolute -top-4 left-0 text-[8px] bg-primary text-white px-1.5 py-0.5 rounded">NEW</span>
              New Arrivals
            </Link>
            <Link href="/shop" className="hover:text-primary transition-colors">All Gifts</Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
