export interface PromotionalMenuItem {
  label: string;
  href: string;
}

export interface PromotionalMenuColumn {
  title?: string;
  items: PromotionalMenuItem[];
}

/** Promotional Gifts mega-menu (desktop + mobile) */
export const PROMOTIONAL_GIFTS_MEGA_MENU: PromotionalMenuColumn[] = [
  {
    title: 'WORK & DESK ESSENTIALS',
    items: [
      { label: 'Desk Essentials', href: '/promotional-gifts/desk-essentials' },
      { label: 'Journal', href: '/promotional-gifts/journal' },
      { label: 'Pens', href: '/promotional-gifts/pens' },
      { label: 'Stationery & Accessories', href: '/promotional-gifts/stationery-and-accessories' },
    ],
  },
  {
    title: 'HOME & LIVING',
    items: [
      { label: 'Planters & Pots', href: '/promotional-gifts/planters-and-pots' },
      { label: 'Photo Frames', href: '/promotional-gifts/photo-frames' },
      { label: 'Lights & Lamps', href: '/promotional-gifts/lights-and-lamps' },
      { label: 'Home & Decor', href: '/promotional-gifts/home-and-decor' },
      { label: 'Fragrance', href: '/promotional-gifts/fragrance' },
    ],
  },
  {
    title: 'LIFESTYLE & ACCESSORIES',
    items: [
      { label: 'Apparels', href: '/promotional-gifts/apparels' },
      { label: 'Bags & Luggage', href: '/promotional-gifts/bags-and-luggage' },
      { label: 'Travel', href: '/promotional-gifts/travel' },
      { label: 'Lifestyle', href: '/promotional-gifts/lifestyle' },
      { label: 'Keychains', href: '/promotional-gifts/keychains' },
    ],
  },
  {
    title: 'GOURMET & EDIBLE TREATS',
    items: [
      { label: 'Chocolates', href: '/promotional-gifts/chocolates' },
      { label: 'Coffee & Tea Delights', href: '/promotional-gifts/coffee-and-tea-delights' },
      { label: 'Gourmet Snacks', href: '/promotional-gifts/gourmet-snacks' },
      { label: 'Healthy Munchies', href: '/promotional-gifts/healthy-munchies' },
      { label: 'Nuts & Seeds', href: '/promotional-gifts/nuts-and-seeds' },
    ],
  },
  {
    items: [
      { label: 'Drinkware', href: '/promotional-gifts/drinkware' },
      { label: 'Electronic Gadgets', href: '/promotional-gifts/electronic-gadgets' },
      { label: 'Eco-Friendly Gifts', href: '/promotional-gifts/eco-friendly-gifts' },
    ],
  },
];
