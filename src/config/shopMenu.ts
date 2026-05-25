export interface ShopMenuItem {
  label: string;
  href: string;
}

export interface ShopMenuColumn {
  title?: string;
  items: ShopMenuItem[];
}

/** Personalized Gifts — Shop mega-menu (BoxUp-style) */
export const SHOP_MEGA_MENU: ShopMenuColumn[] = [
  {
    title: 'SHOP BY RECIPIENT',
    items: [
      { label: 'Gifts for Women', href: '/shop/browse?recipient=women' },
      { label: 'Gifts for Men', href: '/shop/browse?recipient=men' },
      { label: 'Gifts for Wife', href: '/shop/browse?recipient=wife' },
      { label: 'Gifts for Husband', href: '/shop/browse?recipient=husband' },
      { label: 'Gifts for Girlfriend', href: '/shop/browse?recipient=girlfriend' },
      { label: 'Gifts for Boyfriend', href: '/shop/browse?recipient=boyfriend' },
      { label: 'Gifts for Parents', href: '/shop/browse?recipient=parents' },
      { label: 'Gifts for Couple', href: '/shop/browse?recipient=couple' },
      { label: 'Gifts for Moms to Be', href: '/shop/browse?recipient=moms-to-be' },
      { label: 'Gifts for Kids', href: '/shop/browse?recipient=kids' },
    ],
  },
  {
    title: 'SHOP BY OCCASION',
    items: [
      { label: 'Thank You', href: '/shop/browse?occasion=thank-you' },
      { label: 'Birthday', href: '/shop/browse?occasion=birthday' },
      { label: 'Anniversary', href: '/shop/browse?occasion=anniversary' },
      { label: 'Housewarming Gifts', href: '/shop/browse?occasion=housewarming' },
      { label: 'Get Well Soon Gifts', href: '/shop/browse?occasion=get-well-soon' },
      { label: 'Office Gifts', href: '/shop/browse?occasion=office' },
      { label: 'Wedding & Celebration', href: '/shop?type=wedding' },
    ],
  },
  {
    title: 'SHOP BY INTEREST',
    items: [
      { label: 'Love Gifts', href: '/shop/browse?interest=love' },
      { label: 'Dry Fruit Gifts', href: '/shop/browse?interest=dry-fruit' },
      { label: 'Eco-friendly Gifts', href: '/shop?type=eco' },
      { label: 'Home Decor Gifts', href: '/shop/browse?interest=home-decor' },
      { label: 'Gourmet Edibles', href: '/shop/browse?interest=gourmet' },
      { label: 'Self Care Hampers', href: '/shop/browse?interest=self-care' },
      { label: 'Gifts for Coffee Lovers', href: '/shop/browse?interest=coffee' },
      { label: 'Gifts for Fitness Freaks', href: '/shop/browse?interest=fitness' },
      { label: 'Luxury Personalized Boxes', href: '/shop?type=luxury' },
    ],
  },
  {
    title: 'BY PRICE',
    items: [
      { label: 'Gifts Under Rs 999', href: '/shop/browse?price=under-999' },
      { label: 'Rs 1000 to Rs 2000', href: '/shop/browse?price=1000-2000' },
      { label: 'Rs 2000 to Rs 3000', href: '/shop/browse?price=2000-3000' },
      { label: 'Above Rs 3000', href: '/shop/browse?price=above-3000' },
    ],
  },
  {
    items: [
      { label: 'Bouquets', href: '/shop/browse?collection=bouquets' },
      { label: 'Gifts in Spotlight', href: '/shop/browse?collection=spotlight' },
      { label: 'Romantic Love Gifts', href: '/shop/browse?interest=love' },
      { label: 'Luxe Collective', href: '/shop/browse?collection=luxe' },
      { label: 'Gift Cards', href: '/shop/browse?collection=gift-cards' },
      { label: 'Best Sellers', href: '/shop/browse?collection=best-sellers' },
      { label: 'Same Day Delivery — Bangalore', href: '/shop/browse?collection=same-day-bangalore' },
      { label: 'Build Your Own Hamper', href: '/hamper-builder' },
      { label: 'All Gift Types', href: '/' },
    ],
  },
];

const RECIPIENT_LABELS: Record<string, string> = {
  women: 'Gifts for Women',
  men: 'Gifts for Men',
  wife: 'Gifts for Wife',
  husband: 'Gifts for Husband',
  girlfriend: 'Gifts for Girlfriend',
  boyfriend: 'Gifts for Boyfriend',
  parents: 'Gifts for Parents',
  couple: 'Gifts for Couple',
  'moms-to-be': 'Gifts for Moms to Be',
  kids: 'Gifts for Kids',
};

const OCCASION_LABELS: Record<string, string> = {
  'thank-you': 'Thank You',
  birthday: 'Birthday',
  anniversary: 'Anniversary',
  housewarming: 'Housewarming',
  'get-well-soon': 'Get Well Soon',
  office: 'Office',
};

const INTEREST_LABELS: Record<string, string> = {
  love: 'Love',
  'dry-fruit': 'Dry Fruit',
  'home-decor': 'Home Decor',
  gourmet: 'Gourmet Edibles',
  'self-care': 'Self Care',
  coffee: 'Coffee Lovers',
  fitness: 'Fitness',
};

const PRICE_LABELS: Record<string, string> = {
  'under-999': 'Under Rs 999',
  '1000-2000': 'Rs 1000 to Rs 2000',
  '2000-3000': 'Rs 2000 to Rs 3000',
  'above-3000': 'Above Rs 3000',
};

const COLLECTION_LABELS: Record<string, string> = {
  bouquets: 'Bouquets',
  spotlight: 'Gifts in Spotlight',
  luxe: 'Luxe Collective',
  'gift-cards': 'Gift Cards',
  'best-sellers': 'Best Sellers',
  'same-day-bangalore': 'Same Day Delivery — Bangalore',
};

/** Page title for ShopBrowse / Placeholder catalog */
export function getShopBrowseTitle(params: URLSearchParams): string {
  const recipient = params.get('recipient');
  if (recipient && RECIPIENT_LABELS[recipient]) return RECIPIENT_LABELS[recipient];

  const occasion = params.get('occasion');
  if (occasion && OCCASION_LABELS[occasion]) return OCCASION_LABELS[occasion];

  const interest = params.get('interest');
  if (interest && INTEREST_LABELS[interest]) return INTEREST_LABELS[interest];

  const price = params.get('price');
  if (price && PRICE_LABELS[price]) return PRICE_LABELS[price];

  const collection = params.get('collection');
  if (collection && COLLECTION_LABELS[collection]) return COLLECTION_LABELS[collection];

  return 'Shop Gifts';
}

/** Maps browse filters to PlaceholderPage product category seed */
export function getShopBrowseCategoryKey(params: URLSearchParams): string {
  const recipient = params.get('recipient');
  if (recipient) return `recipient ${recipient}`;

  const occasion = params.get('occasion');
  if (occasion) return `occasion ${occasion}`;

  const interest = params.get('interest');
  if (interest) {
    if (interest === 'coffee' || interest === 'gourmet' || interest === 'dry-fruit') return 'gourmet';
    if (interest === 'home-decor') return 'home decor';
    if (interest === 'self-care') return 'hamper';
    if (interest === 'fitness') return 'lifestyle';
    return `interest ${interest}`;
  }

  const collection = params.get('collection');
  if (collection) return `collection ${collection}`;

  const price = params.get('price');
  if (price) return 'hamper';

  return 'shop gifts';
}
