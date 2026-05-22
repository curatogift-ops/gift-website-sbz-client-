import { Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import ShopPage from '@/pages/ShopPage';
import WishlistPage from '@/pages/WishlistPage';
import CustomBoxesPage from '@/pages/CustomBoxesPage';
import PlaceholderPage from '@/pages/PlaceholderPage';
import CorporatePage from '@/pages/CorporatePage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/shop/:slug" element={<PlaceholderPage title="Product details" />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/custom-boxes" element={<CustomBoxesPage />} />
      <Route path="/corporate" element={<CorporatePage />} />
      <Route path="/about" element={<PlaceholderPage title="About us" />} />
      <Route path="/blog" element={<PlaceholderPage title="Blog" />} />
      <Route path="/contact" element={<PlaceholderPage title="Contact" />} />
      <Route path="/account" element={<PlaceholderPage title="Account" />} />
      <Route path="/cart" element={<PlaceholderPage title="Cart" />} />
      <Route path="/hamper-builder" element={<PlaceholderPage title="Hamper builder" />} />
      <Route path="/track-order" element={<PlaceholderPage title="Track your order" />} />
      <Route path="/shipping" element={<PlaceholderPage title="Shipping & delivery" />} />
      <Route path="/returns" element={<PlaceholderPage title="Returns policy" />} />
      <Route path="/faq" element={<PlaceholderPage title="FAQs" />} />
      <Route path="/privacy" element={<PlaceholderPage title="Privacy" />} />
      <Route path="/terms" element={<PlaceholderPage title="Terms" />} />
      <Route path="/sitemap" element={<PlaceholderPage title="Sitemap" />} />
      <Route path="*" element={<PlaceholderPage title="Page not found" />} />
    </Routes>
  );
}
