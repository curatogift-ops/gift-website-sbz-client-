import { Navigate, Route, Routes } from 'react-router-dom';
import ScrollToTop from '@/components/layout/ScrollToTop';
import ShopPage from '@/pages/ShopPage';
import ShopBrowsePage from '@/pages/ShopBrowsePage';
import WishlistPage from '@/pages/WishlistPage';
import CustomBoxesPage from '@/pages/CustomBoxesPage';
import PlaceholderPage from '@/pages/PlaceholderPage';
import CorporatePage from '@/pages/CorporatePage';
import BrandsPage from '@/pages/BrandsPage';
import ImageRequirementsPage from '@/pages/ImageRequirementsPage';
import WhatsAppWidget from '@/components/layout/WhatsAppWidget';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/corporate" replace />} />
        <Route path="/home" element={<Navigate to="/corporate" replace />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/browse" element={<ShopBrowsePage />} />
        <Route path="/shop/:slug" element={<PlaceholderPage title="Product details" />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/custom-boxes" element={<CustomBoxesPage />} />
        <Route path="/corporate" element={<CorporatePage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/admin/image-requirements" element={<ImageRequirementsPage />} />
        <Route path="/promotional-gifts" element={<PlaceholderPage title="Promotional Gifts" />} />
        {/* Promotional Gifts sub-pages */}
        <Route path="/promotional-gifts/desk-essentials" element={<PlaceholderPage title="Desk Essentials" />} />
        <Route path="/promotional-gifts/journal" element={<PlaceholderPage title="Journal" />} />
        <Route path="/promotional-gifts/pens" element={<PlaceholderPage title="Pens" />} />
        <Route path="/promotional-gifts/stationery-and-accessories" element={<PlaceholderPage title="Stationery & Accessories" />} />
        <Route path="/promotional-gifts/planters-and-pots" element={<PlaceholderPage title="Planters & Pots" />} />
        <Route path="/promotional-gifts/photo-frames" element={<PlaceholderPage title="Photo Frames" />} />
        <Route path="/promotional-gifts/lights-and-lamps" element={<PlaceholderPage title="Lights & Lamps" />} />
        <Route path="/promotional-gifts/home-and-decor" element={<PlaceholderPage title="Home & Decor" />} />
        <Route path="/promotional-gifts/fragrance" element={<PlaceholderPage title="Fragrance" />} />
        <Route path="/promotional-gifts/apparels" element={<PlaceholderPage title="Apparels" />} />
        <Route path="/promotional-gifts/bags-and-luggage" element={<PlaceholderPage title="Bags & Luggage" />} />
        <Route path="/promotional-gifts/travel" element={<PlaceholderPage title="Travel" />} />
        <Route path="/promotional-gifts/lifestyle" element={<PlaceholderPage title="Lifestyle" />} />
        <Route path="/promotional-gifts/keychains" element={<PlaceholderPage title="Keychains" />} />
        <Route path="/promotional-gifts/chocolates" element={<PlaceholderPage title="Chocolates" />} />
        <Route path="/promotional-gifts/coffee-and-tea-delights" element={<PlaceholderPage title="Coffee & Tea Delights" />} />
        <Route path="/promotional-gifts/gourmet-snacks" element={<PlaceholderPage title="Gourmet Snacks" />} />
        <Route path="/promotional-gifts/healthy-munchies" element={<PlaceholderPage title="Healthy Munchies" />} />
        <Route path="/promotional-gifts/nuts-and-seeds" element={<PlaceholderPage title="Nuts & Seeds" />} />
        <Route path="/promotional-gifts/drinkware" element={<PlaceholderPage title="Drinkware" />} />
        <Route path="/promotional-gifts/electronic-gadgets" element={<PlaceholderPage title="Electronic Gadgets" />} />
        <Route path="/promotional-gifts/eco-friendly-gifts" element={<PlaceholderPage title="Eco-Friendly Gifts" />} />

        <Route path="/corporate-gifting" element={<PlaceholderPage title="Corporate Gifting" />} />
        {/* Corporate Gifting sub-pages */}
        <Route path="/corporate-gifting/work-anniversary-gifts" element={<PlaceholderPage title="Work Anniversary Gifts" />} />
        <Route path="/corporate-gifting/rewards-and-recognition" element={<PlaceholderPage title="Rewards and Recognition" />} />
        <Route path="/corporate-gifting/employee-welcome-kits" element={<PlaceholderPage title="Employee Welcome Kits" />} />
        <Route path="/corporate-gifting/under-rs-1000" element={<PlaceholderPage title="Under Rs 1000" />} />
        <Route path="/corporate-gifting/rs-1000-to-rs-2000" element={<PlaceholderPage title="Rs 1000 to Rs 2000" />} />
        <Route path="/corporate-gifting/rs-2000-to-rs-3000" element={<PlaceholderPage title="Rs 2000 to Rs 3000" />} />
        <Route path="/corporate-gifting/above-rs-3000" element={<PlaceholderPage title="Above Rs 3000" />} />
        <Route path="/corporate-gifting/branded-gifts" element={<PlaceholderPage title="Branded Gifts" />} />
        <Route path="/corporate-gifting/tech-gifts" element={<PlaceholderPage title="Tech Gifts" />} />
        <Route path="/corporate-gifting/architecture-gifts" element={<PlaceholderPage title="Architecture Gifts" />} />
        <Route path="/corporate-gifting/real-estate-gifts" element={<PlaceholderPage title="Real Estate Gifts" />} />
        <Route path="/corporate-gifting/executive-gifts" element={<PlaceholderPage title="Executive Gifts" />} />
        <Route path="/about" element={<PlaceholderPage title="About us" />} />
        <Route path="/blog" element={<PlaceholderPage title="Blog" />} />
        <Route path="/contact" element={<PlaceholderPage title="Contact" />} />
        <Route path="/account" element={<PlaceholderPage title="Account" />} />
        <Route path="/cart" element={<PlaceholderPage title="Cart" />} />
        <Route path="/hamper-builder" element={<CustomBoxesPage />} />
        <Route path="/track-order" element={<PlaceholderPage title="Track your order" />} />
        <Route path="/shipping" element={<PlaceholderPage title="Shipping & delivery" />} />
        <Route path="/returns" element={<PlaceholderPage title="Returns policy" />} />
        <Route path="/faq" element={<PlaceholderPage title="FAQs" />} />
        <Route path="/privacy" element={<PlaceholderPage title="Privacy" />} />
        <Route path="/terms" element={<PlaceholderPage title="Terms" />} />
        <Route path="/sitemap" element={<PlaceholderPage title="Sitemap" />} />
        <Route path="*" element={<PlaceholderPage title="Page not found" />} />
      </Routes>
      <WhatsAppWidget />
    </>
  );
}
