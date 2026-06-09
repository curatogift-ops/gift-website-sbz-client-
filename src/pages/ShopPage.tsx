import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PersonalizedHeroSection from '@/components/shop/PersonalizedHeroSection';
import RecipientBondSection from '@/components/shop/RecipientBondSection';
import MostLovedHampersSection from '@/components/shop/sections/MostLovedHampersSection';
import FestiveCelebrationsSection from '@/components/shop/sections/FestiveCelebrationsSection';
import CustomGiftCollectionSection from '@/components/shop/sections/CustomGiftCollectionSection';
import GiftHampersSection from '@/components/shop/sections/GiftHampersSection';
import PremiumCollectionSection from '@/components/shop/sections/PremiumCollectionSection';
import GiftsByBudgetSection from '@/components/shop/sections/GiftsByBudgetSection';
import ShopClosingCtaSection from '@/components/shop/sections/ShopClosingCtaSection';

export default function ShopPage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace('#', '');
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
    return () => window.clearTimeout(timer);
  }, [hash]);

  return (
    <div className="flex min-h-screen flex-col bg-[#F9F6F1]">
      <Navbar />

      <main className="page-main-offset flex-grow">
        <PersonalizedHeroSection />
        <RecipientBondSection />
        <MostLovedHampersSection />
        <FestiveCelebrationsSection />
        <CustomGiftCollectionSection />
        <GiftHampersSection />
        <PremiumCollectionSection />
        <GiftsByBudgetSection />
        <ShopClosingCtaSection />
      </main>

      <Footer />
    </div>
  );
}
