export type CatalogueCategoryId =
  | 'corporate-gifts'
  | 'writing-office'
  | 'technology'
  | 'lifestyle-travel'
  | 'festive-gifts'
  | 'awards-recognition';

export type CatalogueItem = {
  id: string;
  title: string;
  categoryId: CatalogueCategoryId;
  categoryLabel: string;
  shortCategory: string;
  file: string;
  coverAccent: string;
  keywords: string;
};

export type CatalogueSection = {
  id: CatalogueCategoryId;
  label: string;
  description: string;
  items: CatalogueItem[];
  /** Spec: Awards section left empty for later additions */
  empty?: boolean;
};

const PDF = (name: string) => `/catalogues/${name}`;

export const CATALOGUE_NAV: { id: 'all' | CatalogueCategoryId; label: string }[] = [
  { id: 'all', label: 'All categories' },
  { id: 'corporate-gifts', label: 'Corporate Gifts' },
  { id: 'writing-office', label: 'Writing & Office' },
  { id: 'technology', label: 'Technology' },
  { id: 'lifestyle-travel', label: 'Lifestyle & Travel' },
  { id: 'festive-gifts', label: 'Festive Gifts' },
];

function item(
  id: string,
  title: string,
  categoryId: CatalogueCategoryId,
  categoryLabel: string,
  shortCategory: string,
  file: string,
  coverAccent: string,
  keywords = '',
): CatalogueItem {
  return {
    id,
    title,
    categoryId,
    categoryLabel,
    shortCategory,
    file: PDF(file),
    coverAccent,
    keywords: `${title} ${shortCategory} ${keywords}`.toLowerCase(),
  };
}

/** Exact mapping from developer catalogue rename list */
export const CATALOGUE_SECTIONS: CatalogueSection[] = [
  {
    id: 'corporate-gifts',
    label: 'Corporate Gifts',
    description: 'Corporate gifting solutions companies purchase for clients, teams, and leadership.',
    items: [
      item(
        'corporate-gift-catalogue',
        'Corporate Gift Catalogue',
        'corporate-gifts',
        'Corporate Gifts',
        'Gift Sets',
        'corporate-gift-catalogue.pdf',
        '#4A1020',
        'gift set corporate hamper',
      ),
      item(
        'urban-gear-collection',
        'Urban Gear Collection',
        'corporate-gifts',
        'Corporate Gifts',
        'Urban Gear',
        'urban-gear-collection.pdf',
        '#6B1E30',
        'backbencher urban gear software',
      ),
      item(
        'everyday-organisers',
        'Everyday Organisers',
        'corporate-gifts',
        'Corporate Gifts',
        'Organisers',
        'everyday-organisers.pdf',
        '#9D7D47',
        'eo organisers desk',
      ),
      item(
        'corporate-gift-set-collection',
        'Corporate Gift Set Collection',
        'corporate-gifts',
        'Corporate Gifts',
        'Gift Sets',
        'corporate-gift-catalogue.pdf',
        '#C9A96E',
        'corporate gift set collection',
      ),
      item(
        'brillare-wellness-collection',
        'Brillare Wellness Collection',
        'corporate-gifts',
        'Corporate Gifts',
        'Wellness',
        'brillare-wellness-collection.pdf',
        '#2D5A3D',
        'brillare wellness science',
      ),
    ],
  },
  {
    id: 'writing-office',
    label: 'Writing & Office',
    description: 'Pens, notebooks, and desk accessories that belong together on every corporate desk.',
    items: [
      item('classic-pen-collection', 'Classic Pen Collection', 'writing-office', 'Writing & Office', 'Writing', 'classic-pen-collection.pdf', '#4A1020', 'classic series pen'),
      item('executive-pen-collection', 'Executive Pen Collection', 'writing-office', 'Writing & Office', 'Writing', 'executive-pen-collection.pdf', '#6B1E30', 'executive series pen'),
      item('eco-pen-collection', 'Eco Pen Collection', 'writing-office', 'Writing & Office', 'Writing', 'eco-pen-collection.pdf', '#2D5A3D', 'eco friendly pen'),
      item('metal-pen-collection', 'Metal Pen Collection', 'writing-office', 'Writing & Office', 'Writing', 'metal-pen-collection.pdf', '#1A1010', 'metal pens'),
      item('s-series-pen-collection', 'S Series Pen Collection', 'writing-office', 'Writing & Office', 'Writing', 's-series-pen-collection.pdf', '#9D7D47', 's series catalog'),
      item('parker-collection', 'Parker Collection', 'writing-office', 'Writing & Office', 'Writing', 'parker-collection.pdf', '#4A1020', 'parker'),
      item('sheaffer-collection', 'Sheaffer Collection', 'writing-office', 'Writing & Office', 'Writing', 'sheaffer-collection.pdf', '#6B1E30', 'sheaffer'),
      item('sheaffer-gift-collection', 'Sheaffer Gift Collection', 'writing-office', 'Writing & Office', 'Writing', 'sheaffer-gift-collection.pdf', '#C9A96E', 'sheaffer giftsets'),
      item('iscape-notebook-collection', 'iScape Notebook Collection', 'writing-office', 'Writing & Office', 'Notebooks', 'iscape-notebook-collection.pdf', '#4A1020', 'iscape notebook'),
      item('corporate-notebook-collection', 'Corporate Notebook Collection', 'writing-office', 'Writing & Office', 'Notebooks', 'corporate-notebook-collection.pdf', '#6B1E30', 'sca iscape notebook'),
      item('premium-notebook-collection', 'Premium Notebook Collection', 'writing-office', 'Writing & Office', 'Notebooks', 'premium-notebook-collection.pdf', '#9D7D47', 'notebook catalogue premium'),
      item('single-notebook-collection', 'Single Notebook Collection', 'writing-office', 'Writing & Office', 'Notebooks', 'single-notebook-collection.pdf', '#1A1010', 'single notebook'),
      item('mobile-stands-calendars', 'Mobile Stands & Calendars', 'writing-office', 'Writing & Office', 'Office Accessories', 'mobile-stands-calendars.pdf', '#C9A96E', 'metal mobile stand calendars'),
      item('keychain-collection', 'Keychain Collection', 'writing-office', 'Writing & Office', 'Office Accessories', 'keychain-collection.pdf', '#4A1020', 'keychain'),
    ],
  },
  {
    id: 'technology',
    label: 'Technology',
    description: 'Smart devices, audio, and electronics for modern corporate programs.',
    items: [
      item('pebble-smart-devices', 'Pebble Smart Devices', 'technology', 'Technology', 'Smart Devices', 'pebble-smart-devices.pdf', '#4A1020', 'pebble'),
      item('lapcare-collection', 'Lapcare Collection', 'technology', 'Technology', 'Tech Accessories', 'lapcare-collection.pdf', '#6B1E30', 'lapcare'),
      item('sound-crush-audio', 'Sound Crush Audio', 'technology', 'Technology', 'Audio', 'sound-crush-audio.pdf', '#1A1010', 'sound crush'),
      item('rico-home-electronics', 'Rico Home Electronics', 'technology', 'Technology', 'Electronics', 'rico-home-electronics.pdf', '#9D7D47', 'rico'),
    ],
  },
  {
    id: 'lifestyle-travel',
    label: 'Lifestyle & Travel',
    description: 'Premium lifestyle, travel, apparel, drinkware, and lighting collections.',
    items: [
      item('goblin-luggage', 'Goblin Luggage', 'lifestyle-travel', 'Lifestyle & Travel', 'Travel', 'goblin-luggage.pdf', '#4A1020', 'goblin'),
      item('house-of-crea-collection', 'House of Crea Collection', 'lifestyle-travel', 'Lifestyle & Travel', 'Lifestyle', 'house-of-crea-collection.pdf', '#6B1E30', 'crea'),
      item('moosario-backpacks', 'Moosario Backpacks', 'lifestyle-travel', 'Lifestyle & Travel', 'Travel', 'moosario-backpacks.pdf', '#1A1010', 'moosario'),
      item('movenpac-bags', 'Movenpac Bags', 'lifestyle-travel', 'Lifestyle & Travel', 'Travel', 'movenpac-bags.pptx', '#9D7D47', 'movenpac bags'),
      item('lapis-bard-luxury-collection', 'Lapis Bard Luxury Collection', 'lifestyle-travel', 'Lifestyle & Travel', 'Luxury', 'lapis-bard-luxury-collection.pdf', '#C9A96E', 'lapis bard'),
      item('highline-apparel-collection', 'Highline Apparel Collection', 'lifestyle-travel', 'Lifestyle & Travel', 'Apparel', 'highline-apparel-collection.pdf', '#4A1020', 'highline'),
      item('pexpo-drinkware-collection', 'Pexpo Drinkware Collection', 'lifestyle-travel', 'Lifestyle & Travel', 'Drinkware', 'pexpo-drinkware-collection.pdf', '#6B1E30', 'pexpo'),
      item('timalfi-lighting-collection', 'Timalfi Lighting Collection', 'lifestyle-travel', 'Lifestyle & Travel', 'Lighting', 'timalfi-lighting-collection.pdf', '#9D7D47', 'timalfi'),
    ],
  },
  {
    id: 'festive-gifts',
    label: 'Festive Gifts',
    description: 'Seasonal and festive gifting collections — ready to expand for Christmas, New Year, and more.',
    items: [
      item(
        'festive-gift-collection',
        'Festive Gift Collection',
        'festive-gifts',
        'Festive Gifts',
        'Festive',
        'festive-gift-collection.pdf',
        '#6B1E30',
        'diwali gift set christmas new year',
      ),
    ],
  },
  {
    id: 'awards-recognition',
    label: 'Awards & Recognition',
    description: 'Awards, trophies, recognition awards, and table pieces — coming soon.',
    empty: true,
    items: [],
  },
];

export const ALL_CATALOGUES: CatalogueItem[] = CATALOGUE_SECTIONS.flatMap((s) => s.items);

export function filterCatalogues(query: string): CatalogueItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return ALL_CATALOGUES;
  return ALL_CATALOGUES.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.shortCategory.toLowerCase().includes(q) ||
      item.categoryLabel.toLowerCase().includes(q) ||
      item.keywords.includes(q),
  );
}
