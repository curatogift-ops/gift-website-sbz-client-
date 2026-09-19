import { Navigate, Route, Routes } from 'react-router-dom';
import ScrollToTop from '@/components/layout/ScrollToTop';
import WishlistPage from '@/pages/WishlistPage';
import CartPage from '@/pages/CartPage';
import CustomBoxesPage from '@/pages/CustomBoxesPage';
import PlaceholderPage from '@/pages/PlaceholderPage';
import CorporatePage from '@/pages/CorporatePage';
import CorporateCategoryPage from '@/pages/CorporateCategoryPage';
import CorporateProductPage from '@/pages/CorporateProductPage';
import ContactPage from '@/pages/ContactPage';
import AboutPage from '@/pages/AboutPage';
import TermsPage from '@/pages/TermsPage';
import PrivacyPage from '@/pages/PrivacyPage';
import BrandsPage from '@/pages/BrandsPage';
import VouchersBrandsPage from '@/pages/VouchersBrandsPage';
import CatalogueLibraryPage from '@/pages/CatalogueLibraryPage';
import ImageRequirementsPage from '@/pages/ImageRequirementsPage';
import WelcomePopup from '@/components/layout/WelcomePopup';
import WhatsAppWidget from '@/components/layout/WhatsAppWidget';
import CursorSparkles from '@/components/ui/CursorSparkles';

/** Brief rule: dead / placeholder CTAs → enquiry or contact (no fake content pages). */
function RedirectEnquiry() {
  return <Navigate to="/corporate#corporate-gift-enquiry" replace />;
}
function RedirectTravelEnquiry() {
  return <Navigate to="/corporate#corporate-travel-enquiry" replace />;
}
function RedirectContact() {
  return <Navigate to="/contact" replace />;
}

export default function App() {
  return (
    <>
      <CursorSparkles />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/corporate" replace />} />
        <Route path="/home" element={<Navigate to="/corporate" replace />} />
        {/* Personalized shop hidden for now — redirect to corporate */}
        <Route path="/shop" element={<Navigate to="/corporate" replace />} />
        <Route path="/shop/browse" element={<Navigate to="/corporate" replace />} />
        <Route path="/shop/:slug" element={<Navigate to="/corporate" replace />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/custom-boxes" element={<CustomBoxesPage />} />
        <Route path="/corporate" element={<CorporatePage />} />
        <Route path="/corporate/category/:categorySlug" element={<CorporateCategoryPage />} />
        <Route path="/corporate/product/:productSlug" element={<CorporateProductPage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/vouchers-brands" element={<VouchersBrandsPage />} />
        <Route
          path="/trophies"
          element={<Navigate to="/corporate/category/trophies-vouchers" replace />}
        />
        <Route path="/catalogue" element={<CatalogueLibraryPage />} />
        <Route path="/download-catalogue" element={<Navigate to="/catalogue" replace />} />
        <Route path="/admin/image-requirements" element={<ImageRequirementsPage />} />

        {/* Promotional mega-menu — no dedicated listing pages yet → enquiry */}
        <Route path="/promotional-gifts" element={<RedirectEnquiry />} />
        <Route path="/promotional-gifts/desk-essentials" element={<RedirectEnquiry />} />
        <Route path="/promotional-gifts/journal" element={<RedirectEnquiry />} />
        <Route path="/promotional-gifts/pens" element={<RedirectEnquiry />} />
        <Route path="/promotional-gifts/stationery-and-accessories" element={<RedirectEnquiry />} />
        <Route path="/promotional-gifts/planters-and-pots" element={<RedirectEnquiry />} />
        <Route path="/promotional-gifts/photo-frames" element={<RedirectEnquiry />} />
        <Route path="/promotional-gifts/lights-and-lamps" element={<RedirectEnquiry />} />
        <Route path="/promotional-gifts/home-and-decor" element={<RedirectEnquiry />} />
        <Route path="/promotional-gifts/fragrance" element={<RedirectEnquiry />} />
        <Route path="/promotional-gifts/apparels" element={<RedirectEnquiry />} />
        <Route path="/promotional-gifts/bags-and-luggage" element={<RedirectEnquiry />} />
        <Route path="/promotional-gifts/travel" element={<RedirectTravelEnquiry />} />
        <Route path="/promotional-gifts/lifestyle" element={<RedirectEnquiry />} />
        <Route path="/promotional-gifts/keychains" element={<RedirectEnquiry />} />
        <Route path="/promotional-gifts/chocolates" element={<RedirectEnquiry />} />
        <Route path="/promotional-gifts/coffee-and-tea-delights" element={<RedirectEnquiry />} />
        <Route path="/promotional-gifts/gourmet-snacks" element={<RedirectEnquiry />} />
        <Route path="/promotional-gifts/healthy-munchies" element={<RedirectEnquiry />} />
        <Route path="/promotional-gifts/nuts-and-seeds" element={<RedirectEnquiry />} />
        <Route
          path="/promotional-gifts/drinkware"
          element={<Navigate to="/corporate/category/drinkware" replace />}
        />
        <Route
          path="/promotional-gifts/electronic-gadgets"
          element={<Navigate to="/corporate/category/tech-gifts" replace />}
        />
        <Route
          path="/promotional-gifts/eco-friendly-gifts"
          element={<Navigate to="/corporate/category/eco-friendly-gifting" replace />}
        />

        <Route path="/corporate-gifting" element={<Navigate to="/corporate" replace />} />
        {/* Corporate mega-menu leaves — real category where one exists, else enquiry */}
        <Route
          path="/corporate-gifting/employee-welcome-kits"
          element={<Navigate to="/corporate/category/employee-joining-kits" replace />}
        />
        <Route
          path="/corporate-gifting/rewards-and-recognition"
          element={<Navigate to="/corporate/category/trophies-vouchers" replace />}
        />
        <Route path="/corporate-gifting/work-anniversary-gifts" element={<RedirectEnquiry />} />
        <Route path="/corporate-gifting/client-appreciation-gifts" element={<RedirectEnquiry />} />
        <Route path="/corporate-gifting/corporate-birthday-gifts" element={<RedirectEnquiry />} />
        <Route path="/corporate-gifting/thank-you-gifts" element={<RedirectEnquiry />} />
        <Route
          path="/corporate-gifting/diwali-gifts"
          element={<Navigate to="/corporate/category/festive-gifts" replace />}
        />
        <Route
          path="/corporate-gifting/christmas-gifts"
          element={<Navigate to="/corporate/category/festive-gifts" replace />}
        />
        <Route
          path="/corporate-gifting/new-year-gifts"
          element={<Navigate to="/corporate/category/festive-gifts" replace />}
        />
        <Route
          path="/corporate-gifting/womens-day-gifts"
          element={<Navigate to="/corporate/category/festive-gifts" replace />}
        />
        <Route path="/corporate-gifting/under-rs-1000" element={<RedirectEnquiry />} />
        <Route path="/corporate-gifting/rs-1000-to-rs-2000" element={<RedirectEnquiry />} />
        <Route path="/corporate-gifting/rs-2000-to-rs-3000" element={<RedirectEnquiry />} />
        <Route path="/corporate-gifting/above-rs-3000" element={<RedirectEnquiry />} />
        <Route
          path="/corporate-gifting/tech-gifts"
          element={<Navigate to="/corporate/category/tech-gifts" replace />}
        />
        <Route path="/corporate-gifting/architecture-gifts" element={<RedirectEnquiry />} />
        <Route path="/corporate-gifting/real-estate-gifts" element={<RedirectEnquiry />} />
        <Route path="/corporate-gifting/branded-gifts" element={<RedirectEnquiry />} />
        <Route path="/corporate-gifting/executive-gifts" element={<RedirectEnquiry />} />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<RedirectContact />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/account" element={<RedirectContact />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/hamper-builder" element={<CustomBoxesPage />} />
        <Route path="/track-order" element={<RedirectContact />} />
        <Route path="/shipping" element={<RedirectContact />} />
        <Route path="/returns" element={<RedirectContact />} />
        <Route path="/faq" element={<RedirectContact />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/sitemap" element={<RedirectContact />} />
        <Route path="*" element={<PlaceholderPage title="Page not found" />} />
      </Routes>
      <WhatsAppWidget />
      <WelcomePopup />
    </>
  );
}
