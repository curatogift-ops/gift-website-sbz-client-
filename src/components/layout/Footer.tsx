import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

// Mock Social Icons (Lucide removed brand icons)
const Instagram = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const Facebook = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

const Twitter = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-border pt-24 pb-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Column */}
          <div className="space-y-8">
            <div className="relative block w-48 h-16">
              <Image 
                src="/images/gift-gallerei (transparent-background).png" 
                alt="Giftz Gallerei Logo" 
                fill
                className="object-contain"
              />
            </div>
            <p className="text-[#4A4A4A] dark:text-slate-400 font-medium leading-relaxed">
              We specialize in creating bespoke luxury hampers that leave a lasting impression. From corporate events to personal celebrations, we deliver joy.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-xl font-black uppercase tracking-tight mb-8">Shop Hampers</h4>
            <ul className="space-y-4 text-sm font-bold text-[#4A4A4A] dark:text-slate-400">
              <li><Link href="/shop" className="hover:text-primary transition-all flex items-center gap-2">All Products <ArrowUpRight size={14} /></Link></li>
              <li><Link href="/shop?category=wedding" className="hover:text-primary transition-all flex items-center gap-2">Wedding Collection <ArrowUpRight size={14} /></Link></li>
              <li><Link href="/shop?category=corporate" className="hover:text-primary transition-all flex items-center gap-2">Corporate Gifting <ArrowUpRight size={14} /></Link></li>
              <li><Link href="/shop?category=birthday" className="hover:text-primary transition-all flex items-center gap-2">Birthday Hampers <ArrowUpRight size={14} /></Link></li>
              <li><Link href="/hamper-builder" className="hover:text-primary transition-all flex items-center gap-2 text-accent">Build Your Own <ArrowUpRight size={14} /></Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="text-xl font-black uppercase tracking-tight mb-8">Support</h4>
            <ul className="space-y-4 text-sm font-bold text-[#4A4A4A] dark:text-slate-400">
              <li><Link href="/track-order" className="hover:text-primary transition-all">Track Your Order</Link></li>
              <li><Link href="/shipping" className="hover:text-primary transition-all">Shipping & Delivery</Link></li>
              <li><Link href="/returns" className="hover:text-primary transition-all">Returns Policy</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-all">FAQs</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-all">Contact Support</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-8">
            <h4 className="text-xl font-black uppercase tracking-tight">Stay Inspired</h4>
            <p className="text-sm font-medium text-[#4A4A4A] dark:text-slate-400">
              Join 5,000+ subscribers and get early access to new collections and gifting tips.
            </p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-muted border-none rounded-xl px-6 py-4 text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
              />
              <button className="btn-primary w-full py-4 text-xs font-bold uppercase tracking-widest shadow-lg">SUBSCRIBE</button>
            </div>
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-y border-border mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-primary">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Visit Us</p>
              <p className="font-bold">Indiranagar, Bangalore, India</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-primary">
              <Phone size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Call Us</p>
              <p className="font-bold">+91 9886491500</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-primary">
              <Mail size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Email Us</p>
              <p className="font-bold">hello@giftzgallerei.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">
          <p>© 2026 Giftz Gallerei. Crafting Memories, One Box at a Time.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-primary transition-all">Privacy</Link>
            <Link href="/terms" className="hover:text-primary transition-all">Terms</Link>
            <Link href="/sitemap" className="hover:text-primary transition-all">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
