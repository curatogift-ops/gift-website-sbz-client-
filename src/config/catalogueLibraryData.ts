export type CatalogueCategoryId =
  | 'corporate-gifts'
  | 'stationery'
  | 'technology'
  | 'lifestyle-travel'
  | 'festive-gifts'
  | 'chocolate-gourmet'
  | 'clothes'
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
  /** Extra category pages this catalogue should also appear in. */
  alsoIn?: CatalogueCategoryId[];
  /** Brand names (lowercase) whose icon should open this catalogue. */
  brandKeys?: string[];
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
  { id: 'stationery', label: 'Stationery' },
  { id: 'technology', label: 'Technology' },
  { id: 'lifestyle-travel', label: 'Lifestyle & Travel' },
  { id: 'festive-gifts', label: 'Festive Gifts' },
  { id: 'chocolate-gourmet', label: 'Chocolate & Gourmet' },
  { id: 'clothes', label: 'Clothes' },
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
  extra?: Pick<CatalogueItem, 'alsoIn' | 'brandKeys'>,
): CatalogueItem {
  return {
    id,
    title,
    categoryId,
    categoryLabel,
    shortCategory,
    file: PDF(file),
    coverAccent,
    keywords: `${title} ${shortCategory} ${categoryLabel} ${keywords}`.toLowerCase(),
    alsoIn: extra?.alsoIn,
    brandKeys: extra?.brandKeys?.map((key) => key.toLowerCase()),
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
        { brandKeys: ['urban gear', 'back bencher'] },
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
      item(
        'gift-box-catalog-new',
        'Gift Box Catalogue',
        'corporate-gifts',
        'Corporate Gifts',
        'Welcome Gifts',
        'gift-box-catalog-new.pdf',
        '#4A1020',
        'welcome gifts welcome gift gift box corporate gift corporate gifts joining gifts employee gifts gift boxes',
      ),
    ],
  },
  {
    id: 'stationery',
    label: 'Stationery',
    description: 'Pens, notebooks, and desk accessories that belong together on every corporate desk.',
    items: [
      item('classic-pen-collection', 'Classic Pen Collection', 'stationery', 'Stationery', 'Writing', 'classic-pen-collection.pdf', '#4A1020', 'classic series pen'),
      item('executive-pen-collection', 'Executive Pen Collection', 'stationery', 'Stationery', 'Writing', 'executive-pen-collection.pdf', '#6B1E30', 'executive series pen'),
      item('eco-pen-collection', 'Eco Pen Collection', 'stationery', 'Stationery', 'Writing', 'eco-pen-collection.pdf', '#2D5A3D', 'eco friendly pen'),
      item('metal-pen-collection', 'Metal Pen Collection', 'stationery', 'Stationery', 'Writing', 'metal-pen-collection.pdf', '#1A1010', 'metal pens'),
      item('s-series-pen-collection', 'S Series Pen Collection', 'stationery', 'Stationery', 'Writing', 's-series-pen-collection.pdf', '#9D7D47', 's series catalog'),
      item('parker-collection', 'Parker Collection', 'stationery', 'Stationery', 'Writing', 'parker-collection.pdf', '#4A1020', 'parker', { brandKeys: ['parker'] }),
      item('sheaffer-collection', 'Sheaffer Collection', 'stationery', 'Stationery', 'Writing', 'sheaffer-collection.pdf', '#6B1E30', 'sheaffer', { brandKeys: ['sheaffer'] }),
      item('sheaffer-gift-collection', 'Sheaffer Gift Collection', 'stationery', 'Stationery', 'Writing', 'sheaffer-gift-collection.pdf', '#C9A96E', 'sheaffer giftsets', { brandKeys: ['sheaffer'] }),
      item('iscape-notebook-collection', 'iScape Notebook Collection', 'stationery', 'Stationery', 'Notebooks', 'iscape-notebook-collection.pdf', '#4A1020', 'iscape notebook'),
      item('corporate-notebook-collection', 'Corporate Notebook Collection', 'stationery', 'Stationery', 'Notebooks', 'corporate-notebook-collection.pdf', '#6B1E30', 'sca iscape notebook'),
      item('premium-notebook-collection', 'Premium Notebook Collection', 'stationery', 'Stationery', 'Notebooks', 'premium-notebook-collection.pdf', '#9D7D47', 'notebook catalogue premium'),
      item('single-notebook-collection', 'Single Notebook Collection', 'stationery', 'Stationery', 'Notebooks', 'single-notebook-collection.pdf', '#1A1010', 'single notebook'),
      item('mobile-stands-calendars', 'Mobile Stands & Calendars', 'stationery', 'Stationery', 'Office Accessories', 'mobile-stands-calendars.pdf', '#C9A96E', 'metal mobile stand calendars'),
      item('keychain-collection', 'Keychain Collection', 'stationery', 'Stationery', 'Office Accessories', 'keychain-collection.pdf', '#4A1020', 'keychain'),
    ],
  },
  {
    id: 'technology',
    label: 'Technology',
    description: 'Smart devices, audio, and electronics for modern corporate programs.',
    items: [
      item('pebble-smart-devices', 'Pebble Smart Devices', 'technology', 'Technology', 'Smart Devices', 'pebble-smart-devices.pdf', '#4A1020', 'pebble tech gifts accessories', { brandKeys: ['pebble'] }),
      item('lapcare-collection', 'Lapcare Collection', 'technology', 'Technology', 'Tech Accessories', 'lapcare-collection.pdf', '#6B1E30', 'lapcare tech gifts accessories', { brandKeys: ['lapcare'] }),
      item('sound-crush-audio', 'Sound Crush Audio', 'technology', 'Technology', 'Audio', 'sound-crush-audio.pdf', '#1A1010', 'sound crush tech gifts'),
      item('rico-home-electronics', 'Rico Home Electronics', 'technology', 'Technology', 'Electronics', 'rico-home-electronics.pdf', '#9D7D47', 'rico tech gifts accessories', { brandKeys: ['rico home appliances', 'rico'] }),
      item('fuzo-black-flyers-sept-2026', 'FUZO Black Flyers Catalogue', 'technology', 'Technology', 'Audio', 'fuzo-black-flyers-sept-2026.pdf', '#1A1010', 'fuzo technology tech gifts accessories corporate tech gifts', { brandKeys: ['fuzo'] }),
      item('fuzo-catalogue-sept-2026', 'FUZO Catalogue', 'technology', 'Technology', 'Audio', 'fuzo-catalogue-sept-2026.pdf', '#4A1020', 'fuzo technology tech gifts accessories corporate tech gifts', { brandKeys: ['fuzo'] }),
      item('nuuk-product-catalog', 'NUUK Product Catalog', 'technology', 'Technology', 'Tech Accessories', 'nuuk-product-catalog.pdf', '#6B1E30', 'nuuk technology tech gifts accessories corporate tech gifts', { brandKeys: ['nuuk'] }),
      item('godrej-brands-catalogue', 'Godrej Brands Catalogue', 'technology', 'Technology', 'Appliances', 'godrej-brands-catalogue.pdf', '#9D7D47', 'godrej technology tech gifts accessories corporate tech gifts', { brandKeys: ['godrej'] }),
    ],
  },
  {
    id: 'lifestyle-travel',
    label: 'Lifestyle & Travel',
    description: 'Premium lifestyle, travel, apparel, drinkware, and lighting collections.',
    items: [
      item('goblin-luggage', 'Goblin Luggage', 'lifestyle-travel', 'Lifestyle & Travel', 'Travel', 'goblin-luggage.pdf', '#4A1020', 'goblin bags bag luggage travel bags', { brandKeys: ['globin', 'goblin'] }),
      item('house-of-crea-collection', 'House of Crea Collection', 'lifestyle-travel', 'Lifestyle & Travel', 'Lifestyle', 'house-of-crea-collection.pdf', '#6B1E30', 'crea'),
      item('moosario-backpacks', 'Moosario Backpacks', 'lifestyle-travel', 'Lifestyle & Travel', 'Travel', 'moosario-backpacks.pdf', '#1A1010', 'moosario bags bag backpack travel bags corporate bags', { brandKeys: ['moosario'] }),
      item('movenpac-bags', 'Movenpac Bags', 'lifestyle-travel', 'Lifestyle & Travel', 'Travel', 'movenpac-bags.pptx', '#9D7D47', 'movenpac bags bag travel bags corporate bags'),
      item('lapis-bard-luxury-collection', 'Lapis Bard Luxury Collection', 'lifestyle-travel', 'Lifestyle & Travel', 'Luxury', 'lapis-bard-luxury-collection.pdf', '#C9A96E', 'lapis bard', { brandKeys: ['lapis bard'] }),
      item('highline-apparel-collection', 'Highline Apparel Collection', 'lifestyle-travel', 'Lifestyle & Travel', 'Apparel', 'highline-apparel-collection.pdf', '#4A1020', 'highline clothing clothes'),
      item('pexpo-drinkware-collection', 'Pexpo Drinkware Collection', 'lifestyle-travel', 'Lifestyle & Travel', 'Drinkware', 'pexpo-drinkware-collection.pdf', '#6B1E30', 'pexpo bottles water bottles tiffins mugs mug drinkware', { brandKeys: ['pexpo'] }),
      item('timalfi-lighting-collection', 'Timalfi Lighting Collection', 'lifestyle-travel', 'Lifestyle & Travel', 'Lighting', 'timalfi-lighting-collection.pdf', '#9D7D47', 'timalfi', { brandKeys: ['timalfi'] }),
      item('883-police-catalogue-v2', '883 Police Catalogue', 'lifestyle-travel', 'Lifestyle & Travel', 'Bags', '883police-catalogue-v2.pdf', '#4A1020', 'bags bag travel bags corporate bags 883 police'),
      item('883-police-bag-catalogue', '883 Police Bag Catalogue', 'lifestyle-travel', 'Lifestyle & Travel', 'Bags', '883-police-bag-catalogue.pdf', '#6B1E30', 'bags bag travel bags corporate bags 883 police'),
      item('883-police-new-catalogue', '883 Police New Catalogue', 'lifestyle-travel', 'Lifestyle & Travel', 'Bags', '883-police-new-catalogue.pdf', '#1A1010', 'bags bag travel bags corporate bags 883 police'),
      item('oblique-catalog-jan-26', 'Oblique Catalogue', 'lifestyle-travel', 'Lifestyle & Travel', 'Bags', 'oblique-catalog-jan-26.pdf', '#9D7D47', 'bags bag travel bags corporate bags oblique obligue', { brandKeys: ['obligue', 'oblique'] }),
      item('eco-catalog-jan-26', 'Eco Catalogue', 'lifestyle-travel', 'Lifestyle & Travel', 'Bags', 'eco-catalog-jan-26.pdf', '#2D5A3D', 'bags bag travel bags corporate bags eco catalog'),
      item('hummel-accessories-catalogue', 'Hummel Accessories Catalogue', 'lifestyle-travel', 'Lifestyle & Travel', 'Bags', 'hummel-accessories-catalogue.pdf', '#C9A96E', 'bags bag travel bags corporate bags hummel'),
      item('luggit-catalogue', 'Luggit Catalogue', 'lifestyle-travel', 'Lifestyle & Travel', 'Bags', 'luggit-catalogue.pdf', '#4A1020', 'bags bag travel bags corporate bags luggit luggage'),
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
        'diwali gift set christmas new year diwali gifts festive gifts corporate diwali',
      ),
      item(
        'diwali-catalogue-vinod-chhajjer',
        'Diwali Catalogue',
        'festive-gifts',
        'Festive Gifts',
        'Diwali',
        'diwali-catalogue-vinod-chhajjer.pdf',
        '#4A1020',
        'diwali diwali gifts corporate diwali gifts festive gifts',
      ),
      item(
        'diwali-gifting-2026-eat-anytime',
        'Diwali Gifting 2026 — Eat Anytime',
        'festive-gifts',
        'Festive Gifts',
        'Diwali',
        'diwali-gifting-2026-eat-anytime.pdf',
        '#6B1E30',
        'diwali diwali gifting festive gifts corporate diwali eat anytime',
        { brandKeys: ['eat anytime'] },
      ),
      item(
        'eat-better-co-diwali-2026',
        'Eat Better Co Diwali Catalogue 2026',
        'festive-gifts',
        'Festive Gifts',
        'Diwali',
        'eat-better-co-diwali-catalogue-2026.pdf',
        '#9D7D47',
        'diwali gift boxes festive gifts corporate gifts eat better',
      ),
      item(
        'aop-diwali-catalogue',
        'AOP Diwali Catalogue',
        'festive-gifts',
        'Festive Gifts',
        'Diwali',
        'aop-diwali-catalogue.pdf',
        '#C9A96E',
        'diwali diwali gifts festive gifts corporate diwali art of puja',
        { brandKeys: ['art of puja'] },
      ),
      item(
        'aop-diwali-gifting',
        'AOP Diwali Gifting',
        'festive-gifts',
        'Festive Gifts',
        'Diwali',
        'aop-diwali-gifting.pdf',
        '#1A1010',
        'diwali diwali gifts festive gifts corporate diwali art of puja',
        { brandKeys: ['art of puja'] },
      ),
    ],
  },
  {
    id: 'chocolate-gourmet',
    label: 'Chocolate & Gourmet',
    description: 'Premium chocolate hampers and gourmet edible gifting collections.',
    items: [
      item('hersheys-gifting-catalogue', "Hershey's Gifting Catalogue", 'chocolate-gourmet', 'Chocolate & Gourmet', 'Chocolate', 'hersheys-gifting-catalogue.pdf', '#4A1020', "chocolate chocolates gourmet hershey's"),
      item('celebrations-brochure', 'Celebrations Brochure', 'chocolate-gourmet', 'Chocolate & Gourmet', 'Chocolate', 'celebrations-brochure.pdf', '#6B1E30', 'chocolate chocolates gourmet celebrations'),
      item('cadbury-product-catalogue', 'Cadbury Product Catalogue', 'chocolate-gourmet', 'Chocolate & Gourmet', 'Chocolate', 'cadbury-product-catalogue-range.pdf', '#9D7D47', 'chocolate chocolates cadbury gourmet'),
      item('hersheys-catalog-2026', "Hershey's Catalog 2026", 'chocolate-gourmet', 'Chocolate & Gourmet', 'Chocolate', 'hersheys-catalog-2026.pdf', '#C9A96E', "chocolate chocolates hershey's gourmet"),
      item('hersheys-brochure', "Hershey's Brochure", 'chocolate-gourmet', 'Chocolate & Gourmet', 'Chocolate', 'hersheys-brochure.pdf', '#1A1010', "chocolate chocolates hershey's gourmet"),
      item('4700-bc-popcorn-brochure', '4700 BC Popcorn Brochure', 'chocolate-gourmet', 'Chocolate & Gourmet', 'Gourmet', '4700-bc-popcorn-brochure.pdf', '#6B1E30', 'gourmet popcorn snacks gifting'),
      item('lindt-catalogue', 'Lindt Catalogue', 'chocolate-gourmet', 'Chocolate & Gourmet', 'Chocolate', 'lindt-catalogue.pdf', '#4A1020', 'chocolate chocolates lindt gourmet'),
      item('snackible-gifting-catalogue', 'Snackible Gifting Catalogue', 'chocolate-gourmet', 'Chocolate & Gourmet', 'Gourmet', 'snackible-gifting-catalogue.pdf', '#2D5A3D', 'gourmet snacks chocolate gifting snackible', { brandKeys: ['snackible'] }),
      item('ferrero-product-catalogue', 'Ferrero Product Catalogue', 'chocolate-gourmet', 'Chocolate & Gourmet', 'Chocolate', 'ferrero-product-catalogue.pdf', '#9D7D47', 'chocolate chocolates ferrero gourmet'),
    ],
  },
  {
    id: 'clothes',
    label: 'Clothes',
    description: 'Clothing, shawls, stoles, and wearable gifting catalogues.',
    items: [
      item('pashtush-jamawar-shawls', 'Pashtush Jamawar Shawls', 'clothes', 'Clothes', 'Shawls', 'pashtush-jamawar-shawls.pdf', '#4A1020', 'shawls shawl jamawar clothing gift shawls clothes stoles'),
      item('jamawar-gift-sets', 'Jamawar Gift Sets', 'clothes', 'Clothes', 'Shawls', 'jamawar-gift-sets.pdf', '#6B1E30', 'shawls shawl jamawar gift sets clothing clothes'),
      item(
        'his-and-her-sets',
        'His and Her Sets',
        'clothes',
        'Clothes',
        'Gift Sets',
        'his-and-her-sets.pdf',
        '#9D7D47',
        'shawls his & her his and her gift sets clothing clothes festive gifts',
        { alsoIn: ['festive-gifts'] },
      ),
      item(
        'fine-wool-stoles',
        'Fine Wool Stoles',
        'clothes',
        'Clothes',
        'Stoles',
        'fine-wool-stoles-catalog.pdf',
        '#C9A96E',
        'shawls shawl stoles stole wool clothing clothes festive gifts',
        { alsoIn: ['festive-gifts'] },
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

export function catalogueInCategory(item: CatalogueItem, categoryId: CatalogueCategoryId): boolean {
  return item.categoryId === categoryId || (item.alsoIn?.includes(categoryId) ?? false);
}

export function filterCatalogues(query: string): CatalogueItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return ALL_CATALOGUES;
  return ALL_CATALOGUES.filter(
    (entry) =>
      entry.title.toLowerCase().includes(q) ||
      entry.shortCategory.toLowerCase().includes(q) ||
      entry.categoryLabel.toLowerCase().includes(q) ||
      entry.keywords.includes(q) ||
      (entry.brandKeys?.some((key) => key.includes(q) || q.includes(key)) ?? false),
  );
}

export function cataloguesForBrand(brandName: string): CatalogueItem[] {
  const name = brandName.trim().toLowerCase();
  if (!name) return [];
  return ALL_CATALOGUES.filter((entry) =>
    (entry.brandKeys ?? []).some((key) => key === name || name.includes(key) || key.includes(name)),
  );
}

export function catalogueCategoryHref(categoryId: CatalogueCategoryId): string {
  return `/catalogue?category=${categoryId}`;
}
