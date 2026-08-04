export interface PromotionalMenuItem {
  label: string;
  href: string;
}

export interface PromotionalMenuColumn {
  title?: string;
  items: PromotionalMenuItem[];
}

/**
 * Promotional Gifting mega-menu — matches brief mockup columns.
 */
export const PROMOTIONAL_GIFTS_MEGA_MENU: PromotionalMenuColumn[] = [
  {
    title: 'EXECUTIVE ESSENTIALS',
    items: [
      { label: 'Pens', href: '/promotional-gifts/pens' },
      { label: 'Journal', href: '/promotional-gifts/journal' },
      { label: 'Drinkware', href: '/promotional-gifts/drinkware' },
      { label: 'Desk Essential', href: '/promotional-gifts/desk-essentials' },
    ],
  },
  {
    title: 'HOME & LIVING',
    items: [
      { label: 'Fragrance', href: '/promotional-gifts/fragrance' },
      { label: 'Photo Frames', href: '/promotional-gifts/photo-frames' },
      { label: 'Home & Decor', href: '/promotional-gifts/home-and-decor' },
      { label: 'Lights & Lamps', href: '/promotional-gifts/lights-and-lamps' },
      { label: 'Planters & Pots', href: '/promotional-gifts/planters-and-pots' },
    ],
  },
  {
    title: 'LIFESTYLE & ACCESSORIES',
    items: [
      { label: 'Travel', href: '/promotional-gifts/travel' },
      { label: 'Apparels', href: '/promotional-gifts/apparels' },
      { label: 'Lifestyle', href: '/promotional-gifts/lifestyle' },
      { label: 'Keychains', href: '/promotional-gifts/keychains' },
      { label: 'Bags & Luggage', href: '/promotional-gifts/bags-and-luggage' },
    ],
  },
  {
    title: 'GOURMET INDULGENCE',
    items: [
      { label: 'Chocolates', href: '/promotional-gifts/chocolates' },
      { label: 'Nuts & Seeds', href: '/promotional-gifts/nuts-and-seeds' },
      { label: 'Gourmet Snacks', href: '/promotional-gifts/gourmet-snacks' },
      { label: 'Healthy Munchies', href: '/promotional-gifts/healthy-munchies' },
      { label: 'Coffee & Tea Delights', href: '/promotional-gifts/coffee-and-tea-delights' },
    ],
  },
  {
    title: 'SMART GIFTS',
    items: [
      { label: 'Eco-Friendly Gifts', href: '/promotional-gifts/eco-friendly-gifts' },
      { label: 'Electronic Gadgets', href: '/promotional-gifts/electronic-gadgets' },
      { label: 'Stationery & Accessories', href: '/promotional-gifts/stationery-and-accessories' },
    ],
  },
];
