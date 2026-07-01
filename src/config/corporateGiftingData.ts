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

const IMG = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=${w}`;

const CATEGORY_IMG = (slug: string) => `/images/corporate/categories/${slug}.jpeg`;
const ECO_IMG = (filename: string) => `/images/corporate/eco-friendly/${filename}`;

export const ECO_FRIENDLY_CATEGORY_SLUG = 'eco-friendly-gifting';

export const ECO_FRIENDLY_FEATURED_SLUGS = [
  'coffee-mug-cork-detail',
  'sustainable-gift-hamper',
  'bamboo-coffee-sipper',
  'cork-notebook-set',
  'bamboo-desk-organizer',
  'seed-paper-stationery',
] as const;

export const CORPORATE_CATEGORIES: CorporateCategory[] = [
  {
    slug: 'corporate-hampers',
    label: 'Corporate Hampers',
    image: CATEGORY_IMG('corporate-hampers'),
    imageAlt: 'Premium corporate hamper gift boxes with branded packaging',
    description: 'Curated gift hampers for clients, teams, and leadership.',
  },
  {
    slug: 'employee-joining-kits',
    label: 'Employee Joining Kits',
    image: CATEGORY_IMG('employee-joining-kits'),
    imageAlt: 'Employee joining kit flat lay with branded welcome items',
    description: 'Welcome kits that make every new joiner feel valued from day one.',
  },
  {
    slug: 'festive-gifts',
    label: 'Festive Gifts',
    image: CATEGORY_IMG('festive-gifts'),
    imageAlt: 'Festive gift boxes with sweets and seasonal treats',
    description: 'Diwali, Christmas, and seasonal gifting collections for teams and clients.',
  },
  {
    slug: 'custom-merchandise',
    label: 'Custom Merchandise',
    image: CATEGORY_IMG('custom-merchandise'),
    imageAlt: 'Branded corporate merchandise in studio setting',
    description: 'Branded apparel, accessories, and merchandise for corporate programs.',
  },
  {
    slug: 'tech-gifts',
    label: 'Tech Gifts',
    image: CATEGORY_IMG('tech-gifts'),
    imageAlt: 'Premium technology gifting category with gadgets and accessories',
    description: 'Premium gadgets and tech accessories for modern corporate gifting.',
  },
  {
    slug: 'drinkware',
    label: 'Drinkware',
    image: CATEGORY_IMG('drinkware'),
    imageAlt: 'Elegant insulated bottles and branded mugs',
    description: 'Branded bottles, mugs, and sipper collections for everyday use.',
  },
  {
    slug: 'event-conference-gifting',
    label: 'Event & Conference Gifting',
    image: CATEGORY_IMG('event-conference-gifting'),
    imageAlt: 'Business event essentials and conference gifting studio setup',
    description: 'Delegate kits, speaker gifts, and conference takeaway solutions.',
  },
  {
    slug: 'luxury-packaging',
    label: 'Luxury Packaging Solutions',
    image: CATEGORY_IMG('luxury-packaging'),
    imageAlt: 'Luxury packaging with rigid gift boxes and premium finishes',
    description: 'Premium boxes, sleeves, and presentation packaging for elevated gifting.',
  },
  {
    slug: 'eco-friendly-gifting',
    label: 'Eco-Friendly Corporate Gifting',
    image: CATEGORY_IMG('eco-friendly-gifting'),
    imageAlt: 'Sustainable eco-friendly corporate products arranged elegantly',
    description: 'Sustainable wooden, bamboo, and eco-conscious corporate gift options.',
  },
  {
    slug: 'events-conferences',
    label: 'Events & Conferences',
    image: CATEGORY_IMG('events-conferences'),
    imageAlt: 'Conference welcome kits catalog for corporate events',
    description: 'End-to-end gifting solutions for corporate events, summits, and conferences.',
  },
  {
    slug: 'trophies-vouchers',
    label: 'Trophies & Vouchers',
    image: CATEGORY_IMG('trophies-vouchers'),
    imageAlt: 'Luxury awards and trophies on studio surface',
    description: 'Custom awards, trophies, and branded voucher programs.',
  },
];

function buildGallery(image: string): string[] {
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
  image: string,
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
    longDescription: `${name} – Premium Bulk Corporate Gift. ${description} Whether you are welcoming new team members, celebrating festivals, or thanking clients, this solution delivers a refined unboxing experience with custom branding and bulk packaging. ${bulkPrice}.`,
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

export const CORPORATE_PRODUCTS: CorporateProduct[] = [
  // Corporate Hampers
  product(
    'corporate-hampers',
    'executive-gift-hamper',
    'Executive Gift Hamper',
    'A premium hamper curated for leadership gifting — fine chocolates, gourmet treats, and elegant presentation for C-suite and VIP clients.',
    3499,
    'From ₹2,499/unit (50+ qty)',
    IMG('photo-1549465220-1a8b9238cd48'),
    ['Assorted gourmet treats', 'Luxury rigid gift box', 'Personalised message card', 'Ideal for leadership gifting'],
  ),
  product(
    'corporate-hampers',
    'premium-gift-hamper',
    'Premium Gift Hamper',
    'Our signature corporate hamper with a balanced mix of snacks, beverages, and branded keepsakes — perfect for client appreciation.',
    2499,
    'From ₹1,899/unit (50+ qty)',
    IMG('photo-1513201099705-a9746e1e201f'),
  ),
  product(
    'corporate-hampers',
    'dry-fruit-hamper',
    'Dry Fruit Hamper',
    'Premium dry fruits and nuts in an elegant hamper — a timeless corporate gift for festivals and year-end appreciation.',
    1999,
    'From ₹1,499/unit (50+ qty)',
    IMG('photo-1606312619070-d48b4c652cec'),
  ),
  product(
    'corporate-hampers',
    'chocolate-hamper',
    'Chocolate Hamper',
    'Artisan chocolates and confections in a beautifully packaged hamper — a crowd-pleaser for teams and clients alike.',
    1799,
    'From ₹1,299/unit (50+ qty)',
    IMG('photo-1549007953-2f2dc6b1f8f3'),
  ),
  product(
    'corporate-hampers',
    'wellness-hamper',
    'Wellness Hamper',
    'A thoughtful wellness-focused hamper with healthy snacks, herbal teas, and self-care essentials for employee wellbeing programs.',
    2199,
    'From ₹1,699/unit (50+ qty)',
    IMG('photo-1505576399279-585b6584a271'),
  ),
  // Employee Joining Kits
  product('employee-joining-kits', 'starter-welcome-kit', 'Starter Welcome Kit', 'Essential branded items for new hires — notebook, pen, bottle, and welcome card in a premium kit.', 899, 'From ₹649/unit (25+ qty)', IMG('photo-1553062407-98eeb64c6a62')),
  product('employee-joining-kits', 'premium-onboarding-kit', 'Premium Onboarding Kit', 'Elevated welcome kit with backpack, tech accessories, and branded apparel for a memorable first day.', 2499, 'From ₹1,899/unit (25+ qty)', IMG('photo-1553062407-98eeb64c6a62')),
  product('employee-joining-kits', 'remote-joiner-kit', 'Remote Joiner Kit', 'Ship-ready kit for remote employees with desk essentials, sipper, and branded merchandise.', 1499, 'From ₹1,099/unit (25+ qty)', IMG('photo-1456324504439-367cee3b3c32')),
  product('employee-joining-kits', 'executive-joiner-kit', 'Executive Joiner Kit', 'Luxury welcome kit for senior hires with premium leather goods, pen set, and custom packaging.', 4999, 'From ₹3,999/unit (10+ qty)', IMG('photo-1627123424574-724758594e93')),
  // Festive Gifts
  product('festive-gifts', 'diwali-delight-box', 'Diwali Delight Box', 'Festive sweets, diyas, and premium packaging for Diwali corporate gifting programs.', 1299, 'From ₹899/unit (50+ qty)', IMG('photo-1604423376506-02708d1bd4f8')),
  product('festive-gifts', 'christmas-celebration-hamper', 'Christmas Celebration Hamper', 'Holiday treats and festive décor in an elegant gift box for year-end celebrations.', 1599, 'From ₹1,199/unit (50+ qty)', IMG('photo-1513885535751-8b9238bd345a')),
  product('festive-gifts', 'new-year-gift-set', 'New Year Gift Set', 'Premium new year gifting set with calendar, treats, and branded keepsake.', 999, 'From ₹749/unit (50+ qty)', IMG('photo-1482517967863-00a4517d36b1')),
  product('festive-gifts', 'festive-assorted-hamper', 'Festive Assorted Hamper', 'Versatile festive hamper suitable for multiple occasions and client segments.', 1899, 'From ₹1,399/unit (50+ qty)', IMG('photo-1549465220-1a8b9238cd48')),
  // Custom Merchandise
  product('custom-merchandise', 'branded-polo-set', 'Branded Polo Set', 'High-quality polo shirts with embroidery or print — ideal for team events and corporate uniforms.', 799, 'From ₹549/unit (50+ qty)', IMG('photo-1583743814966-8936f5b7be1a')),
  product('custom-merchandise', 'corporate-cap-collection', 'Corporate Cap Collection', 'Adjustable caps with embroidered logo in multiple colourways.', 399, 'From ₹279/unit (50+ qty)', IMG('photo-1588850561407-ed78c282e989')),
  product('custom-merchandise', 'branded-tote-bag', 'Branded Tote Bag', 'Durable canvas tote with screen-printed or woven logo for events and daily use.', 349, 'From ₹249/unit (100+ qty)', IMG('photo-1590874103328-eac38a683ce7')),
  product('custom-merchandise', 'custom-lanyard-kit', 'Custom Lanyard Kit', 'Branded lanyards with ID holders for conferences and office programs.', 149, 'From ₹99/unit (100+ qty)', IMG('photo-1556761175-5973dc0f32e7')),
  // Tech Gifts
  product('tech-gifts', 'wireless-earbuds', 'Wireless Earbuds', 'Premium wireless earbuds with custom logo case — a popular tech gift for employees and clients.', 1999, 'From ₹1,499/unit (25+ qty)', IMG('photo-1505740420928-5e560c06d30e')),
  product('tech-gifts', 'power-bank-10000mah', 'Power Bank 10000mAh', 'Slim power bank with dual USB ports and laser-engraved branding.', 899, 'From ₹649/unit (50+ qty)', IMG('photo-1609091839311-d5365addc022')),
  product('tech-gifts', 'bluetooth-speaker', 'Bluetooth Speaker', 'Compact speaker with rich sound and custom logo print on grille.', 1499, 'From ₹1,099/unit (25+ qty)', IMG('photo-1608043152269-423dbba4e7e1')),
  product('tech-gifts', 'wireless-charging-pad', 'Wireless Charging Pad', 'Desk-friendly wireless charger with subtle brand embossing.', 799, 'From ₹549/unit (50+ qty)', IMG('photo-1591290619762-c588a81c1e3e')),
  // Drinkware
  product('drinkware', 'insulated-steel-bottle', 'Insulated Steel Bottle', 'Double-wall vacuum bottle with laser-engraved logo — keeps drinks hot or cold for hours.', 649, 'From ₹449/unit (50+ qty)', IMG('photo-1602143407151-7111542de6e8')),
  product('drinkware', 'ceramic-coffee-mug', 'Ceramic Coffee Mug', 'Premium ceramic mug with full-wrap or logo print for office and client gifting.', 299, 'From ₹199/unit (100+ qty)', IMG('photo-1514228742587-6b1558fcca3d')),
  product('drinkware', 'glass-water-bottle', 'Glass Water Bottle', 'Borosilicate glass bottle with silicone sleeve and custom branding.', 549, 'From ₹399/unit (50+ qty)', IMG('photo-1602143407151-7111542de6e8')),
  // Event & Conference Gifting
  product('event-conference-gifting', 'delegate-welcome-kit', 'Delegate Welcome Kit', 'Complete delegate kit with badge, notebook, pen, and branded tote for conferences.', 599, 'From ₹449/unit (100+ qty)', IMG('photo-1556761175-5973dc0f32e7')),
  product('event-conference-gifting', 'speaker-appreciation-set', 'Speaker Appreciation Set', 'Premium gift set for keynote speakers and panelists with luxury packaging.', 2999, 'From ₹2,299/unit (10+ qty)', IMG('photo-1540575467063-178a50c2df87')),
  product('event-conference-gifting', 'exhibition-goodie-bag', 'Exhibition Goodie Bag', 'Curated goodie bag contents for trade shows and exhibition booths.', 399, 'From ₹299/unit (200+ qty)', IMG('photo-1590874103328-eac38a683ce7')),
  product('event-conference-gifting', 'vip-lounge-gift', 'VIP Lounge Gift', 'Exclusive gift for VIP attendees with premium presentation box.', 4999, 'From ₹3,999/unit (10+ qty)', IMG('photo-1549465220-1a8b9238cd48')),
  // Luxury Packaging
  product('luxury-packaging', 'rigid-gift-box', 'Rigid Gift Box', 'Magnetic closure rigid box with custom insert and ribbon — elevates any corporate gift.', 349, 'From ₹249/unit (100+ qty)', IMG('photo-1513201099705-a9746e1e201f')),
  product('luxury-packaging', 'satin-ribbon-sleeve', 'Satin Ribbon Sleeve', 'Elegant sleeve wrap with satin ribbon and foil-stamped logo.', 199, 'From ₹149/unit (200+ qty)', IMG('photo-1549465220-1a8b9238cd48')),
  product('luxury-packaging', 'wooden-presentation-box', 'Wooden Presentation Box', 'Handcrafted wooden box with laser-engraved lid for premium gifting.', 899, 'From ₹649/unit (50+ qty)', IMG('photo-1576092768241-dec231879fc3')),
  product('luxury-packaging', 'custom-insert-tray', 'Custom Insert Tray', 'Foam or cardboard insert tray tailored to your product dimensions and branding.', 149, 'From ₹99/unit (200+ qty)', IMG('photo-1513201099705-a9746e1e201f')),
  // Eco-Friendly
  product('eco-friendly-gifting', 'coffee-mug-cork-detail', 'Coffee Mug With Cork Detail', 'Matte finish mug with natural cork base — insulated, reusable, and brand-ready.', 450, 'From ₹325/unit (50+ qty)', ECO_IMG('coffee-mug-cork-detail.jpeg')),
  product('eco-friendly-gifting', 'sustainable-gift-hamper', 'Savvy and Sustainable Gift Hamper', 'Eco-conscious hamper with wooden items, organic treats, and recycled packaging.', 1470, 'From ₹1,099/unit (25+ qty)', ECO_IMG('sustainable-gift-hamper.jpeg')),
  product('eco-friendly-gifting', 'bamboo-coffee-sipper', 'Bamboo Coffee Sipper', 'Eco-friendly bamboo sipper with cork detail and brand engraving.', 350, 'From ₹249/unit (50+ qty)', ECO_IMG('bamboo-coffee-sipper.jpeg')),
  product('eco-friendly-gifting', 'cork-notebook-set', 'Journal - Rumi', 'Cork-covered notebook and pen set — fully biodegradable packaging.', 250, 'From ₹199/unit (50+ qty)', ECO_IMG('cork-notebook-set.jpeg')),
  product('eco-friendly-gifting', 'bamboo-desk-organizer', 'Bamboo Desk Organizer', 'Sustainable bamboo desk organizer with engraved company logo.', 599, 'From ₹449/unit (50+ qty)', ECO_IMG('bamboo-desk-organizer.jpeg')),
  product('eco-friendly-gifting', 'seed-paper-stationery', 'Seed Paper Stationery Set', 'Plantable seed paper notebooks and cards for green corporate programs.', 299, 'From ₹219/unit (100+ qty)', ECO_IMG('seed-paper-stationery.jpeg')),
  // Events & Conferences
  product('events-conferences', 'summit-delegate-kit', 'Summit Delegate Kit', 'Full summit kit with lanyard, notebook, bottle, and event-branded merchandise.', 799, 'From ₹599/unit (100+ qty)', IMG('photo-1540575467063-178a50c2df87')),
  product('events-conferences', 'annual-day-gift', 'Annual Day Gift', 'Celebratory gift for annual day and town hall events with custom branding.', 999, 'From ₹749/unit (50+ qty)', IMG('photo-1513885535751-8b9238bd345a')),
  product('events-conferences', 'product-launch-kit', 'Product Launch Kit', 'Launch event kit with premium packaging and branded collateral for attendees.', 1999, 'From ₹1,499/unit (25+ qty)', IMG('photo-1556761175-5973dc0f32e7')),
  product('events-conferences', 'awards-night-favor', 'Awards Night Favor', 'Elegant favor gift for awards ceremonies and gala dinners.', 1499, 'From ₹1,099/unit (25+ qty)', IMG('photo-1567427017947-545c5f8d16ad')),
  // Trophies & Vouchers
  product('trophies-vouchers', 'crystal-achievement-award', 'Crystal Achievement Award', 'Custom crystal trophy with engraved recipient details and company logo.', 2499, 'From ₹1,899/unit (10+ qty)', IMG('photo-1567427017947-545c5f8d16ad')),
  product('trophies-vouchers', 'metal-trophy-plaque', 'Metal Trophy Plaque', 'Premium metal plaque award for employee recognition programs.', 1799, 'From ₹1,299/unit (10+ qty)', IMG('photo-1571015733145-7f03d1e0fd8e')),
  product('trophies-vouchers', 'branded-gift-voucher', 'Branded Gift Voucher', 'Custom-branded gift voucher cards for flexible employee and client rewards.', 500, 'From ₹450/unit (50+ qty)', IMG('photo-1556742049-0cfed4f6a45d')),
  product('trophies-vouchers', 'employee-of-month-award', 'Employee of the Month Award', 'Signature award trophy with monthly personalization option.', 1999, 'From ₹1,499/unit (10+ qty)', IMG('photo-1567427017947-545c5f8d16ad')),
];

export function getCategoryBySlug(slug: string): CorporateCategory | undefined {
  return CORPORATE_CATEGORIES.find((c) => c.slug === slug);
}

export function getProductsByCategory(categorySlug: string): CorporateProduct[] {
  return CORPORATE_PRODUCTS.filter((p) => p.categorySlug === categorySlug);
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
