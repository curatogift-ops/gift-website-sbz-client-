import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { mapLegacyShopQuery } from '@/lib/shopBrowseParams';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PersonalizedHeroSection from '@/components/shop/PersonalizedHeroSection';
import RelationshipPicksSection from '@/components/shop/RelationshipPicksSection';
import MostLovedHampersSection from '@/components/shop/sections/MostLovedHampersSection';
import FestiveCelebrationsSection from '@/components/shop/sections/FestiveCelebrationsSection';
import CustomGiftCollectionSection from '@/components/shop/sections/CustomGiftCollectionSection';
import GiftHampersSection from '@/components/shop/sections/GiftHampersSection';
import GiftsByBudgetSection from '@/components/shop/sections/GiftsByBudgetSection';
import PremiumCollectionSection from '@/components/shop/sections/PremiumCollectionSection';
import ShopClosingCtaSection from '@/components/shop/sections/ShopClosingCtaSection';

export default function ShopPage() {
  const { hash, search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = mapLegacyShopQuery(search);
    if (redirect) navigate(redirect, { replace: true });
  }, [search, navigate]);

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace('#', '');
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
    return () => window.clearTimeout(timer);
  }, [hash]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="page-main-offset flex-grow">
        <PersonalizedHeroSection />
        <RelationshipPicksSection />
        <MostLovedHampersSection />
        <FestiveCelebrationsSection />
        <CustomGiftCollectionSection />
        <GiftHampersSection />
        <GiftsByBudgetSection />
        <PremiumCollectionSection />
        <ShopClosingCtaSection />
      </main>

      <Footer />
    </div>
  );
}
