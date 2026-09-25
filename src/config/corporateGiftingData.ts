import {
  CATALOG_SEED,
  DIWALI_HOME_SLUGS,
  ECO_CATALOG_FEATURED_SLUGS,
} from '@/config/corporateCatalogSeed';

export type CorporateCategory = {
  slug: string;
  label: string;
  image: string;
  imageAlt: string;
  description: string;
};

export type CorporateProductItem = {
  name: string;
  description: string;
};

export type CorporateProduct = {
  slug: string;
  categorySlug: string;
  name: string;
  description: string;
  features: string[];
  brandingOptions: string[];
  price: number;
  bulkPrice: string;
  images: string[];
  contents: CorporateProductItem[];
  contentsLabel: string;
  longDescription: string;
  shippingInfo: string;
  assistanceInfo: string;
  knowMore: string;
  rating: number;
  reviewCount: number;
};

export const ECO_FRIENDLY_CATEGORY_SLUG = 'eco-friendly-gifting';

export const ECO_FRIENDLY_FEATURED_SLUGS = ECO_CATALOG_FEATURED_SLUGS;

export const CORPORATE_CATEGORIES: CorporateCategory[] = [
  {
    slug: 'corporate-hampers',
    label: 'Corporate Hampers',
    image: '/images/catalog/corporate-listing/download-13.jpg',
    imageAlt: 'Premium corporate hamper gift boxes with branded packaging',
    description: 'Curated gift hampers for clients, teams, and leadership.',
  },
  {
    slug: 'employee-joining-kits',
    label: 'Employee Joining Kits',
    image: '/images/catalog/employee-joining/01.jpg',
    imageAlt: 'Employee joining kit flat lay with branded welcome items',
    description: 'Welcome kits that make every new joiner feel valued from day one.',
  },
  {
    slug: 'festive-gifts',
    label: 'Festive Gifts',
    image: '/images/catalog/diwali/05.jpg',
    imageAlt: 'Festive gift boxes with sweets and seasonal treats',
    description: 'Diwali, Christmas, and seasonal gifting collections for teams and clients.',
  },
  {
    slug: 'custom-merchandise',
    label: 'Custom Merchandise',
    image: '/images/catalog/tech/06.jpg',
    imageAlt: 'Branded corporate merchandise in studio setting',
    description: 'Branded apparel, accessories, and merchandise for corporate programs.',
  },
  {
    slug: 'tech-gifts',
    label: 'Tech Gifts',
    image: '/images/catalog/tech/18.jpg',
    imageAlt: 'Premium technology gifting category with gadgets and accessories',
    description: 'Premium gadgets and tech accessories for modern corporate gifting.',
  },
  {
    slug: 'drinkware',
    label: 'Drinkware',
    image: '/images/catalog/drinkware/07.jpg',
    imageAlt: 'Elegant insulated bottles and branded mugs',
    description: 'Branded bottles, mugs, and sipper collections for everyday use.',
  },
  {
    slug: 'event-conference-gifting',
    label: 'Event & Conference Gifting',
    image: '/images/catalog/eco-friendly/05.jpg',
    imageAlt: 'Business event essentials and conference gifting studio setup',
    description: 'Delegate kits, speaker gifts, and conference takeaway solutions.',
  },
  {
    slug: 'luxury-packaging',
    label: 'Luxury Packaging Solutions',
    image: '/images/catalog/diwali/36.jpg',
    imageAlt: 'Luxury packaging with rigid gift boxes and premium finishes',
    description: 'Premium boxes, sleeves, and presentation packaging for elevated gifting.',
  },
  {
    slug: 'eco-friendly-gifting',
    label: 'Eco-Friendly Corporate Gifting',
    image: '/images/catalog/eco-friendly/01.jpg',
    imageAlt: 'Sustainable eco-friendly corporate products arranged elegantly',
    description: 'Sustainable wooden, bamboo, and eco-conscious corporate gift options.',
  },
  {
    slug: 'events-conferences',
    label: 'Events & Conferences',
    image: '/images/catalog/eco-friendly/11.jpg',
    imageAlt: 'Conference welcome kits catalog for corporate events',
    description: 'End-to-end gifting solutions for corporate events, summits, and conferences.',
  },
  {
    slug: 'trophies-vouchers',
    label: 'Trophies & Vouchers',
    image: '/images/catalog/trophies/01.jpg',
    imageAlt: 'Luxury awards and trophies on studio surface',
    description: 'Custom awards, trophies, and branded voucher programs.',
  },
];

function buildGallery(image: string | string[]): string[] {
  if (Array.isArray(image)) {
    return image;
  }
  const normalized = image.replace(/w=\d+/, 'w=800');
  return [800, 720, 640, 560].map((w) => normalized.replace('w=800', `w=${w}`));
}

function getContentsLabel(categorySlug: string): string {
  if (
    categorySlug.includes('hamper') ||
    categorySlug === 'festive-gifts' ||
    categorySlug === 'eco-friendly-gifting'
  ) {
    return "What's in the hamper?";
  }
  if (categorySlug.includes('joining') || categorySlug.includes('event') || categorySlug.includes('conference')) {
    return "What's in the kit?";
  }
  if (categorySlug === 'luxury-packaging') {
    return 'Package includes';
  }
  return "What's included?";
}

function buildContents(features: string[], categorySlug: string): CorporateProductItem[] {
  const extras: CorporateProductItem[] =
    categorySlug.includes('hamper') || categorySlug === 'festive-gifts'
      ? [
          {
            name: 'Premium gift packaging',
            description: 'Elegant box or hamper presentation with ribbon finish and protective inner packaging.',
          },
          {
            name: 'Custom note card',
            description: 'Personalised message card with your brand logo and greeting for recipients.',
          },
        ]
      : categorySlug.includes('joining') || categorySlug.includes('event')
        ? [
            {
              name: 'Branded carry solution',
              description: 'Tote, backpack, or kit bag with your company logo — practical and premium.',
            },
            {
              name: 'Welcome message card',
              description: 'Custom welcome note or event branding insert for a polished first impression.',
            },
          ]
        : [];

  const featureItems = features.map((name) => ({
    name,
    description:
      'Thoughtfully selected for corporate programs with logo printing, embossing, or custom packaging available.',
  }));

  return [...featureItems, ...extras].slice(0, 6);
}

function stableRating(slug: string): { rating: number; reviewCount: number } {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) hash += slug.charCodeAt(i);
  return {
    rating: 4.5 + (hash % 5) * 0.08,
    reviewCount: 90 + (hash % 180),
  };
}

const SHIPPING_INFO =
  'Pan-India delivery available for bulk corporate orders. Standard dispatch is 7–14 business days after artwork approval. Express fulfilment can be arranged for urgent requirements — timelines are confirmed at quotation stage.';

const ASSISTANCE_INFO =
  'Need help choosing quantities, branding, or delivery schedules? Use the bulk enquiry form or contact our corporate gifting team. We provide mockups, sampling options, and dedicated support for large orders.';

function product(
  categorySlug: string,
  slug: string,
  name: string,
  description: string,
  price: number,
  bulkPrice: string,
  image: string | string[],
  features?: string[],
): CorporateProduct {
  const featureList = features ?? [
    'Premium quality materials',
    'Custom branding available',
    'Pan-India bulk delivery',
    'Gift-ready packaging',
  ];
  const { rating, reviewCount } = stableRating(slug);

  return {
    slug,
    categorySlug,
    name,
    description,
    features: featureList,
    brandingOptions: [
      'Logo printing & embossing',
      'Custom ribbons & sleeves',
      'Branded message cards',
      'Company colour-matched packaging',
    ],
    price,
    bulkPrice,
    images: buildGallery(image),
    contentsLabel: getContentsLabel(categorySlug),
    contents: buildContents(featureList, categorySlug),
    longDescription: description,
    shippingInfo: SHIPPING_INFO,
    assistanceInfo: ASSISTANCE_INFO,
    knowMore: [
      'Custom branding with your logo on products and packaging.',
      'Bulk pricing tiers based on order quantity.',
      'Mockups shared for approval before production.',
      'Pan-India logistics with secure, gift-ready dispatch.',
    ].join(' '),
    rating,
    reviewCount,
  };
}

export const CORPORATE_PRODUCTS: CorporateProduct[] = CATALOG_SEED.map((item) =>
  product(
    item.categorySlug,
    item.slug,
    item.name,
    item.description,
    item.price,
    item.bulkPrice,
    item.images,
    item.features,
  ),
);

export const CORPORATE_SOLUTIONS_ORDER = [
  'corporate-hampers',
  'employee-joining-kits',
  'eco-friendly-gifting',
  'tech-gifts',
  'drinkware',
  'trophies-vouchers',
  'event-conference-gifting',
  'festive-gifts',
] as const;

export function getCorporateSolutionsCategories(
  excludeSlug?: string,
): CorporateCategory[] {
  return CORPORATE_SOLUTIONS_ORDER.map((slug) => getCategoryBySlug(slug)).filter(
    (category): category is CorporateCategory =>
      Boolean(category) && category!.slug !== excludeSlug,
  );
}

export function getCategoryBySlug(slug: string): CorporateCategory | undefined {
  return CORPORATE_CATEGORIES.find((c) => c.slug === slug);
}

export function getProductsByCategory(categorySlug: string): CorporateProduct[] {
  return CORPORATE_PRODUCTS.filter((p) => p.categorySlug === categorySlug);
}

export function getDiwaliHomeProducts(): CorporateProduct[] {
  const bySlug = new Map(getProductsByCategory('festive-gifts').map((item) => [item.slug, item]));
  return DIWALI_HOME_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (item): item is CorporateProduct => Boolean(item),
  );
}

export function getEcoFriendlyFeaturedProducts(): CorporateProduct[] {
  const bySlug = new Map(
    getProductsByCategory(ECO_FRIENDLY_CATEGORY_SLUG).map((product) => [product.slug, product]),
  );
  return ECO_FRIENDLY_FEATURED_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (product): product is CorporateProduct => Boolean(product),
  );
}

export function getProductBySlug(productSlug: string): CorporateProduct | undefined {
  return CORPORATE_PRODUCTS.find((p) => p.slug === productSlug);
}

export function getRelatedProducts(
  productSlug: string,
  categorySlug: string,
  limit = 8,
): CorporateProduct[] {
  return CORPORATE_PRODUCTS.filter(
    (p) => p.categorySlug === categorySlug && p.slug !== productSlug,
  ).slice(0, limit);
}

export function formatCorporatePrice(amount: number): string {
  return `₹ ${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
