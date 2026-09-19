export interface PromotionalMenuItem {
  label: string;
  href: string;
}

export interface PromotionalMenuColumn {
  title?: string;
  items: PromotionalMenuItem[];
}

const ENQUIRY = '/corporate#corporate-gift-enquiry';

/**
 * Promotional Gifting mega-menu — matches brief mockup columns.
 * Leaf links use real corporate categories when they map cleanly; otherwise enquiry.
 */
export const PROMOTIONAL_GIFTS_MEGA_MENU: PromotionalMenuColumn[] = [
  {
    title: 'EXECUTIVE ESSENTIALS',
    items: [
      { label: 'Pens', href: ENQUIRY },
      { label: 'Journal', href: ENQUIRY },
      { label: 'Drinkware', href: '/corporate/category/drinkware' },
      { label: 'Desk Essential', href: ENQUIRY },
    ],
  },
  {
    title: 'HOME & LIVING',
    items: [
      { label: 'Fragrance', href: ENQUIRY },
      { label: 'Photo Frames', href: ENQUIRY },
      { label: 'Home & Decor', href: ENQUIRY },
      { label: 'Lights & Lamps', href: ENQUIRY },
      { label: 'Planters & Pots', href: ENQUIRY },
    ],
  },
  {
    title: 'LIFESTYLE & ACCESSORIES',
    items: [
      { label: 'Travel', href: ENQUIRY },
      { label: 'Apparels', href: ENQUIRY },
      { label: 'Lifestyle', href: ENQUIRY },
      { label: 'Keychains', href: ENQUIRY },
      { label: 'Bags & Luggage', href: ENQUIRY },
    ],
  },
  {
    title: 'GOURMET INDULGENCE',
    items: [
      { label: 'Chocolates', href: ENQUIRY },
      { label: 'Nuts & Seeds', href: ENQUIRY },
      { label: 'Gourmet Snacks', href: ENQUIRY },
      { label: 'Healthy Munchies', href: ENQUIRY },
      { label: 'Coffee & Tea Delights', href: ENQUIRY },
    ],
  },
  {
    title: 'SMART GIFTS',
    items: [
      { label: 'Eco-Friendly Gifts', href: '/corporate/category/eco-friendly-gifting' },
      { label: 'Electronic Gadgets', href: '/corporate/category/tech-gifts' },
      { label: 'Stationery & Accessories', href: ENQUIRY },
    ],
  },
];
