/**
 * Central image requirements registry.
 *
 * Future-proofing: add new slots here OR push partial entries to `customImageSlots`
 * in src/types/imageRequirements.ts. Config arrays (personalizedSections, brandsData)
 * are expanded automatically on each build.
 */
import {
  CUSTOM_GIFT_COLLECTION,
  FESTIVE_CELEBRATIONS,
  MOST_LOVED_HAMPERS,
  PREMIUM_COLLECTION,
} from '@/config/personalizedSections';
import {
  browseProductTemplateSlot,
  buildImageSlot,
  categoryThumbnailSlot,
  dim,
  festiveSpotlightSlot,
  formSupportingPhotoSlot,
  galleryTileSlot,
  giftTagSlot,
  heroBannerSlot,
  portraitCardSlot,
  premiumHoverPreviewSlot,
  productImageSlot,
} from '@/lib/imageRequirements/specBuilders';
import { customImageSlots, type ImageRequirement } from '@/types/imageRequirements';

/** Canonical page → section order for the designer handoff admin view */
export type SiteSectionCatalogEntry = {
  order: number;
  name: string;
  component: string;
  description: string;
};

export type SitePageCatalogEntry = {
  order: number;
  pageName: string;
  pageRoute: string;
  sections: SiteSectionCatalogEntry[];
};

export const SITE_PAGE_CATALOG: SitePageCatalogEntry[] = [
  {
    order: 0,
    pageName: 'Global (All Pages)',
    pageRoute: '—',
    sections: [
      {
        order: 1,
        name: 'Site Logo & Branding',
        component: 'BrandLogo.tsx',
        description: 'Primary logo in navbar and footer on every page.',
      },
    ],
  },
  {
    order: 1,
    pageName: 'Corporate',
    pageRoute: '/corporate',
    sections: [
      {
        order: 1,
        name: 'Hero Slider',
        component: 'CorporatePage.tsx',
        description: 'Main hero carousel — deliver 4 separate files: 2 desktop + 2 mobile (one pair per slide).',
      },
      {
        order: 2,
        name: 'Corporate Gifting Solutions',
        component: 'CorporatePage.tsx',
        description: '8 square category thumbnails in the solutions grid.',
      },
      {
        order: 3,
        name: 'Eco Friendly Corporate Gifting',
        component: 'WoodenGiftingSection.tsx',
        description: '4 sustainable wooden product card images.',
      },
      {
        order: 4,
        name: 'Corporate Gifting Gallery',
        component: 'CorporateGiftingGallerySection.tsx',
        description: '16 lifestyle gallery tiles in the scrolling marquee.',
      },
      {
        order: 5,
        name: 'Events & Conferences',
        component: 'EventConferenceGiftingSection.tsx',
        description: '4 event gifting category card images.',
      },
      {
        order: 6,
        name: 'Customized Awards & Trophies',
        component: 'AwardsTrophiesSection.tsx',
        description: '3 awards and trophies category card images.',
      },
      {
        order: 7,
        name: 'Bulk Order Enquiry',
        component: 'BulkEnquiryFormSection.tsx',
        description: 'Supporting photo beside the single bulk enquiry form.',
      },
    ],
  },
  {
    order: 2,
    pageName: 'Personalized Shop',
    pageRoute: '/shop',
    sections: [
      {
        order: 1,
        name: 'Personalized Hero',
        component: 'PersonalizedHeroSection.tsx',
        description: 'Home hero banner — desktop and mobile variants.',
      },
      {
        order: 2,
        name: 'Most Loved Gift Hampers',
        component: 'RelationshipPicksSection.tsx',
        description: '5 hanging gift-tag images: For Her, For Him, For Couple, For Parents, For Kids.',
      },
      {
        order: 3,
        name: 'Celebrations & Occasions',
        component: 'MostLovedHampersSection.tsx',
        description: '7 occasion hamper cards (Birthday, Wedding, Anniversary, etc.).',
      },
      {
        order: 4,
        name: 'Festive Celebrations',
        component: 'FestiveCelebrationsSection.tsx',
        description: '5 festival spotlight images (New Year, Diwali, Christmas, Eid, Holi).',
      },
      {
        order: 5,
        name: 'Custom Gift Collection',
        component: 'CustomGiftCollectionSection.tsx',
        description: '7 personalized gift category card images.',
      },
      {
        order: 6,
        name: 'Premium Collection',
        component: 'PremiumCollectionSection.tsx',
        description: '4 premium category cards plus desktop hover preview images.',
      },
    ],
  },
  {
    order: 3,
    pageName: 'Hamper Builder',
    pageRoute: '/hamper-builder',
    sections: [
      {
        order: 1,
        name: 'Step 1 — Choose Box',
        component: 'CustomBoxesPage.tsx',
        description: '4 hamper box option product shots.',
      },
      {
        order: 2,
        name: 'Step 2 — Add Products',
        component: 'CustomBoxesPage.tsx',
        description: '8 add-on product shots for the builder.',
      },
      {
        order: 3,
        name: 'Step 3 — Select Card',
        component: 'CustomBoxesPage.tsx',
        description: '4 greeting card option images.',
      },
      {
        order: 4,
        name: 'Sticky Cart Bar',
        component: 'CustomBoxesPage.tsx',
        description: 'Tiny cart chip thumbnails (derived from selected items).',
      },
    ],
  },
  {
    order: 4,
    pageName: 'Shop Browse & Placeholder Pages',
    pageRoute: '/shop/browse, /promotional-gifts/*, /corporate-gifting/*',
    sections: [
      {
        order: 1,
        name: 'Product Grid',
        component: 'ShopBrowsePage.tsx / PlaceholderPage.tsx',
        description: 'Square product thumbnail template for browse and placeholder routes.',
      },
    ],
  },
  {
    order: 5,
    pageName: 'Home (unrouted)',
    pageRoute: '/home',
    sections: [
      {
        order: 1,
        name: 'Hero',
        component: 'HomePage.tsx',
        description: 'Legacy home hero — page redirects to /corporate but assets may still be referenced.',
      },
    ],
  },
];

export type SectionGroup = {
  sectionName: string;
  sectionOrder: number;
  sectionDescription: string;
  componentName: string;
  requirements: ImageRequirement[];
  stats: { total: number; production: number; placeholder: number; missing: number };
};

export type PageGroup = {
  pageName: string;
  pageRoute: string;
  pageOrder: number;
  sections: SectionGroup[];
  stats: { total: number; production: number; placeholder: number; missing: number };
};

function sectionStats(requirements: ImageRequirement[]) {
  return {
    total: requirements.length,
    production: requirements.filter((r) => r.status === 'production').length,
    placeholder: requirements.filter((r) => r.status === 'placeholder').length,
    missing: requirements.filter((r) => r.status === 'missing').length,
  };
}

function applyCatalogMeta(slots: ImageRequirement[]): ImageRequirement[] {
  return slots.map((slot) => {
    const page = SITE_PAGE_CATALOG.find((p) => p.pageName === slot.pageName);
    const section = page?.sections.find((s) => s.name === slot.sectionName);
    return {
      ...slot,
      pageOrder: page?.order ?? 99,
      sectionOrder: section?.order ?? 99,
      sectionDescription: section?.description,
    };
  });
}

/** Group requirements into page → section hierarchy for the admin UI */
export function groupImageRequirements(requirements: ImageRequirement[]): PageGroup[] {
  const byPage = new Map<string, ImageRequirement[]>();
  for (const r of requirements) {
    const list = byPage.get(r.pageName) ?? [];
    list.push(r);
    byPage.set(r.pageName, list);
  }

  const pages: PageGroup[] = [];

  for (const catalogPage of SITE_PAGE_CATALOG) {
    const pageReqs = byPage.get(catalogPage.pageName) ?? [];
    if (pageReqs.length === 0) continue;

    const sections: SectionGroup[] = [];

    for (const catalogSection of catalogPage.sections) {
      const sectionReqs = pageReqs.filter((r) => r.sectionName === catalogSection.name);
      if (sectionReqs.length === 0) continue;

      sections.push({
        sectionName: catalogSection.name,
        sectionOrder: catalogSection.order,
        sectionDescription: catalogSection.description,
        componentName: catalogSection.component,
        requirements: sectionReqs.sort((a, b) => a.imageName.localeCompare(b.imageName)),
        stats: sectionStats(sectionReqs),
      });
    }

    const uncatalogued = pageReqs.filter(
      (r) => !catalogPage.sections.some((s) => s.name === r.sectionName)
    );
    if (uncatalogued.length > 0) {
      const bySection = new Map<string, ImageRequirement[]>();
      for (const r of uncatalogued) {
        const list = bySection.get(r.sectionName) ?? [];
        list.push(r);
        bySection.set(r.sectionName, list);
      }
      for (const [sectionName, sectionReqs] of bySection) {
        sections.push({
          sectionName,
          sectionOrder: 999,
          sectionDescription: 'Uncatalogued section — add to SITE_PAGE_CATALOG in imageRequirementsRegistry.ts',
          componentName: sectionReqs[0]?.componentName ?? '—',
          requirements: sectionReqs,
          stats: sectionStats(sectionReqs),
        });
      }
    }

    sections.sort((a, b) => a.sectionOrder - b.sectionOrder);

    pages.push({
      pageName: catalogPage.pageName,
      pageRoute: catalogPage.pageRoute,
      pageOrder: catalogPage.order,
      sections,
      stats: sectionStats(pageReqs),
    });

    byPage.delete(catalogPage.pageName);
  }

  for (const [pageName, pageReqs] of byPage) {
    const bySection = new Map<string, ImageRequirement[]>();
    for (const r of pageReqs) {
      const list = bySection.get(r.sectionName) ?? [];
      list.push(r);
      bySection.set(r.sectionName, list);
    }
    pages.push({
      pageName,
      pageRoute: pageReqs[0]?.pageRoute ?? '—',
      pageOrder: 99,
      sections: [...bySection.entries()].map(([sectionName, sectionReqs]) => ({
        sectionName,
        sectionOrder: 999,
        sectionDescription: 'Uncatalogued page — add to SITE_PAGE_CATALOG',
        componentName: sectionReqs[0]?.componentName ?? '—',
        requirements: sectionReqs,
        stats: sectionStats(sectionReqs),
      })),
      stats: sectionStats(pageReqs),
    });
  }

  return pages.sort((a, b) => a.pageOrder - b.pageOrder);
}

function buildGlobalSlots(): ImageRequirement[] {
  return [
    buildImageSlot({
      id: 'global-brand-logo',
      pageName: 'Global (All Pages)',
      pageRoute: '/',
      sectionName: 'Site Logo & Branding',
      componentName: 'BrandLogo.tsx',
      imageName: 'Giftz Gallerei logo',
      purpose: 'Logo',
      currentSource: '/images/gift-gallerei-logo.png',
      technical: {
        desktop: dim(220, 56),
        tablet: dim(200, 52),
        mobile: dim(180, 48),
        aspectRatio: '~4:1',
        format: 'PNG',
        compressionQuality: 90,
        retinaExport: dim(440, 112, 1),
        maxFileSizeKb: 80,
        cropRules: 'Full logo mark with wordmark — transparent background',
        safeArea: 'Entire logo visible; no cropping',
        focalPoint: 'Center-left (icon + wordmark)',
        transparency: true,
      },
      content: {
        subject: 'Giftz Gallerei primary brand logo with gift box icon and wordmark',
        composition: 'Horizontal lockup on transparent PNG',
        style: 'Brand-official colors — pink/orange gift icon, dark wordmark',
        brandColors: 'As per brand guidelines',
        mood: 'Premium, approachable gifting',
        additionalNotes: 'Used in Navbar and Footer via BrandLogo.tsx',
      },
    }),
  ];
}

const CORPORATE_SOLUTIONS = [
  { id: 'corporate-hampers', label: 'Corporate Hampers', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=480&h=480' },
  { id: 'employee-joining', label: 'Employee Joining Kits', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=480&h=480' },
  { id: 'festive', label: 'Festive Gifts', image: 'https://images.unsplash.com/photo-1513885536991-8b943e177042?auto=format&fit=crop&q=80&w=480&h=480' },
  { id: 'custom-merchandise', label: 'Custom Merchandise', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=480&h=480' },
  { id: 'tech', label: 'Tech Gifts', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=480&h=480' },
  { id: 'drinkware', label: 'Drinkware', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=480&h=480' },
  { id: 'event-conference', label: 'Event & Conference Gifting', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=480&h=480' },
  { id: 'luxury-packaging', label: 'Luxury Packaging Solutions', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38f7968?auto=format&fit=crop&q=80&w=480&h=480' },
] as const;

const WOODEN_PRODUCTS = [
  { id: 'coffee-mug-cork', title: 'Coffee Mug With Cork Detail', image: 'https://images.unsplash.com/photo-1517256064527-09c53b2d0c6b?auto=format&fit=crop&q=80&w=600' },
  { id: 'savvy-sustainable-hamper', title: 'Savvy and Sustainable Gift Hamper', image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=600' },
  { id: 'bamboo-coffee-sipper', title: 'Bamboo Coffee Sipper', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600' },
  { id: 'journal-rumi', title: 'Journal - Rumi', image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=600' },
] as const;

const EVENT_CONFERENCE_CATEGORIES = [
  { id: 'delegate-kits', label: 'Delegate Kits', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600' },
  { id: 'conference-giveaways', label: 'Conference Giveaways', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600' },
  { id: 'speaker-vip', label: 'Speaker & VIP Gifts', image: 'https://images.unsplash.com/photo-1549463574-04d2c2b46ac?auto=format&fit=crop&q=80&w=600' },
  { id: 'awards-trophies', label: 'Awards & Trophies', image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=600' },
] as const;

const AWARDS_CATEGORIES = [
  { id: 'crystal-awards', label: 'Crystal Awards', image: '/images/corporate/awards-crystal.jpeg' },
  { id: 'vouchers', label: 'Vouchers', image: '/images/corporate/awards-vouchers.jpeg' },
  { id: 'trophies', label: 'Trophies', image: '/images/corporate/awards-trophies.jpeg' },
] as const;

const GALLERY_ROW_TOP = [
  'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=480&h=640',
  'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=480&h=640',
  'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=480&h=640',
  'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&q=80&w=480&h=640',
  'https://images.unsplash.com/photo-1561715276-a2d087060f1d?auto=format&fit=crop&q=80&w=480&h=640',
  'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=480&h=640',
  'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=480&h=640',
  'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?auto=format&fit=crop&q=80&w=480&h=640',
];

const GALLERY_ROW_BOTTOM = [
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=480&h=640',
  'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=480&h=640',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=480&h=640',
  'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=480&h=640',
  'https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&q=80&w=480&h=640',
  'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=480&h=640',
  'https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?auto=format&fit=crop&q=80&w=480&h=640',
  'https://images.unsplash.com/photo-1549007953-2f2dc0b24019?auto=format&fit=crop&q=80&w=480&h=640',
];

const GALLERY_THEMES = [
  'Eco-friendly journal and wooden gift set',
  'Premium engraved keepsake box',
  'Custom branded mug corporate gift',
  'Executive leather desk accessories',
  'Luxury hamper with gold ribbon',
  'Bamboo sustainable corporate gift',
  'Branded drinkware collection',
  'Festive New Year celebration hamper',
  'Conference delegate welcome kit',
  'Branded merchandise polo and cap',
  'Premium wireless headphones gift',
  'Wedding celebration gift box',
  'Corporate team appreciation gifts',
  'Refined gift for him — grooming set',
  'Premium chocolate hamper',
  'Artisan chocolate gift collection',
];

const RELATIONSHIP_PICKS = [
  { id: 'for-her', label: 'For Her', image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=600' },
  { id: 'for-him', label: 'For Him', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=600' },
  { id: 'for-couple', label: 'For Couple', image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=600' },
  { id: 'for-parents', label: 'For Parents', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600' },
  { id: 'for-kids', label: 'For Kids', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=600' },
] as const;

const HAMPER_BUILDER_BOXES = [
  { id: 'box-lilac', name: 'Lilac Serenity Box', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=900&auto=format&fit=crop' },
  { id: 'box-kalamkari', name: 'Kalamkari Printed Bag', image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=900&auto=format&fit=crop' },
  { id: 'box-bamboo', name: 'Handcrafted Bamboo Flower Basket', image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=900&auto=format&fit=crop' },
  { id: 'box-marshall', name: 'Marshall Box', image: 'https://images.unsplash.com/photo-1577085960689-3f7cb6c7526b?q=80&w=900&auto=format&fit=crop' },
] as const;

const HAMPER_BUILDER_PRODUCTS = [
  { id: 'scrunchie', name: 'Mermaid Scrunchie', image: 'https://images.unsplash.com/photo-1548907040-4d42b52125b0?q=80&w=900&auto=format&fit=crop' },
  { id: 'clip', name: 'Mermaid Clip', image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=900&auto=format&fit=crop' },
  { id: 'teddy', name: 'Mini Crochet Teddy', image: 'https://images.unsplash.com/photo-1596701062351-8c2c14d1fcd0?q=80&w=900&auto=format&fit=crop' },
  { id: 'bracelet', name: 'Crochet Bracelet', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=900&auto=format&fit=crop' },
  { id: 'candle', name: 'Rose Scented Candle', image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=900&auto=format&fit=crop' },
  { id: 'charm', name: 'Thought Card Charm', image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=900&auto=format&fit=crop' },
  { id: 'ribbon', name: 'Silk Ribbon Bow', image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=900&auto=format&fit=crop' },
  { id: 'coffee', name: 'Coffee Delight Sachet', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=900&auto=format&fit=crop' },
] as const;

const HAMPER_BUILDER_CARDS = [
  { id: 'welcome', name: 'Welcome Card', image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=900&auto=format&fit=crop' },
  { id: 'thinking', name: 'Thinking of You', image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=900&auto=format&fit=crop' },
  { id: 'thankyou', name: 'Thank You Card', image: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?q=80&w=900&auto=format&fit=crop' },
  { id: 'sorry', name: "I'm Sorry Card", image: 'https://images.unsplash.com/photo-1446708771591-5c7e7c5e0f08?q=80&w=900&auto=format&fit=crop' },
] as const;

function buildCorporatePageSlots(): ImageRequirement[] {
  const slots: ImageRequirement[] = [
    heroBannerSlot({
      id: 'corp-hero-slide1-desktop',
      pageName: 'Corporate',
      pageRoute: '/corporate',
      sectionName: 'Hero Slider',
      componentName: 'CorporatePage.tsx',
      imageName: 'Curated Corporate Gifts Hero',
      variant: 'desktop',
      currentSource: '/images/corporate-hero-banner.png',
      subject: 'Premium corporate gift hampers, branded merchandise, and executive keepsakes arranged elegantly',
      textSafeArea: 'Left 45% — headline "Thoughtfully Curated Gifts" overlays here',
      ctaSafeArea: 'Below headline, left-aligned',
      focalPoint: 'Right-center — products and packaging',
    }),
    heroBannerSlot({
      id: 'corp-hero-slide1-mobile',
      pageName: 'Corporate',
      pageRoute: '/corporate',
      sectionName: 'Hero Slider',
      componentName: 'CorporatePage.tsx',
      imageName: 'Curated Corporate Gifts Hero',
      variant: 'mobile',
      currentSource: '/images/corporate-hero-banner-mobile-custom.png',
      subject: 'Stacked corporate gift boxes and hampers — mobile-first vertical composition',
      textSafeArea: 'Top 35% cream gradient overlay for headline',
      focalPoint: 'Center-lower — gift boxes',
      mobileCropNotes: '500px fixed height container on mobile',
    }),
    heroBannerSlot({
      id: 'corp-hero-slide2-desktop',
      pageName: 'Corporate',
      pageRoute: '/corporate',
      sectionName: 'Hero Slider',
      componentName: 'CorporatePage.tsx',
      imageName: 'Corporate Showcase Hero',
      variant: 'desktop',
      currentSource: '/images/corporate-hero-slide-2.png',
      subject: 'Showcase of branded corporate gifting solutions — may include embedded typography in artwork',
      textSafeArea: 'Text may be baked into artwork — confirm with design',
      focalPoint: 'Center',
    }),
    heroBannerSlot({
      id: 'corp-hero-slide2-mobile',
      pageName: 'Corporate',
      pageRoute: '/corporate',
      sectionName: 'Hero Slider',
      componentName: 'CorporatePage.tsx',
      imageName: 'Corporate Showcase Hero',
      variant: 'mobile',
      currentSource: '/images/corporate-hero-slide-2-mobile.png',
      subject: 'Mobile variant of corporate showcase slide',
      textSafeArea: 'Top third for any overlay text',
      focalPoint: 'Center',
    }),
    formSupportingPhotoSlot({
      id: 'corp-bulk-enquiry-main',
      pageName: 'Corporate',
      pageRoute: '/corporate',
      sectionName: 'Bulk Order Enquiry',
      imageName: 'Corporate gifting enquiry photo',
      currentSource: '/images/corporate-hero-banner.png',
    }),
  ];

  for (const item of CORPORATE_SOLUTIONS) {
    slots.push(
      categoryThumbnailSlot({
        id: `corp-solution-${item.id}`,
        pageName: 'Corporate',
        pageRoute: '/corporate',
        sectionName: 'Corporate Gifting Solutions',
        componentName: 'CorporatePage.tsx',
        imageName: item.label,
        label: item.label,
        currentSource: item.image,
        renderedDesktop: 140,
      })
    );
  }

  for (const product of WOODEN_PRODUCTS) {
    slots.push(
      productImageSlot({
        id: `corp-eco-${product.id}`,
        pageName: 'Corporate',
        pageRoute: '/corporate',
        sectionName: 'Eco Friendly Corporate Gifting',
        componentName: 'WoodenGiftingSection.tsx',
        imageName: product.title,
        productName: product.title,
        currentSource: product.image,
      })
    );
  }

  [...GALLERY_ROW_TOP, ...GALLERY_ROW_BOTTOM].forEach((src, i) => {
    slots.push(
      galleryTileSlot({
        id: `corp-gallery-${i}`,
        pageName: 'Corporate',
        pageRoute: '/corporate',
        sectionName: 'Corporate Gifting Gallery',
        componentName: 'CorporateGiftingGallerySection.tsx',
        imageName: `Gallery tile ${i + 1}`,
        theme: GALLERY_THEMES[i] ?? 'Corporate gifting lifestyle moment',
        currentSource: src,
        index: i,
      })
    );
  });

  for (const cat of EVENT_CONFERENCE_CATEGORIES) {
    slots.push(
      categoryThumbnailSlot({
        id: `corp-event-${cat.id}`,
        pageName: 'Corporate',
        pageRoute: '/corporate',
        sectionName: 'Events & Conferences',
        componentName: 'EventConferenceGiftingSection.tsx',
        imageName: cat.label,
        label: cat.label,
        currentSource: cat.image,
        renderedDesktop: 280,
      })
    );
  }

  for (const cat of AWARDS_CATEGORIES) {
    slots.push(
      categoryThumbnailSlot({
        id: `corp-awards-${cat.id}`,
        pageName: 'Corporate',
        pageRoute: '/corporate',
        sectionName: 'Customized Awards & Trophies',
        componentName: 'AwardsTrophiesSection.tsx',
        imageName: cat.label,
        label: cat.label,
        currentSource: cat.image,
        renderedDesktop: 360,
      })
    );
  }

  return slots;
}

function buildShopPageSlots(): ImageRequirement[] {
  const slots: ImageRequirement[] = [
    heroBannerSlot({
      id: 'shop-hero-desktop',
      pageName: 'Personalized Shop',
      pageRoute: '/shop',
      sectionName: 'Personalized Hero',
      componentName: 'PersonalizedHeroSection.tsx',
      imageName: 'Personalized Gifts Hero',
      variant: 'desktop',
      currentSource: '/images/personalized-hero-desktop.png',
      subject: 'Luxury burgundy gift boxes, ribbons, and personalized keepsakes on cream background',
      textSafeArea: 'Left 40% — "Personalized Gifts, Perfectly Yours" headline and badge pills',
      ctaSafeArea: 'Below trust badges, left-aligned WhatsApp CTA',
      focalPoint: '65% horizontal — product arrangement on right',
    }),
    heroBannerSlot({
      id: 'shop-hero-mobile',
      pageName: 'Personalized Shop',
      pageRoute: '/shop',
      sectionName: 'Personalized Hero',
      componentName: 'PersonalizedHeroSection.tsx',
      imageName: 'Personalized Gifts Hero',
      variant: 'mobile',
      currentSource: '/images/personalized-hero-mobile.png',
      subject: 'Vertical burgundy gift box hero artwork for mobile',
      textSafeArea: 'Top 40% with cream gradient scrim',
      focalPoint: 'Center 30% vertical — object-[center_30%]',
      mobileCropNotes: 'Badges and CTA pinned to bottom of min-h-[72vh] section',
    }),
  ];

  for (const pick of RELATIONSHIP_PICKS) {
    slots.push(giftTagSlot({ id: `shop-relationship-${pick.id}`, label: pick.label, currentSource: pick.image }));
  }

  for (const item of MOST_LOVED_HAMPERS) {
    slots.push(
      portraitCardSlot({
        id: `shop-celebrations-${item.id}`,
        pageName: 'Personalized Shop',
        pageRoute: '/shop',
        sectionName: 'Celebrations & Occasions',
        componentName: 'MostLovedHampersSection.tsx',
        imageName: item.label,
        label: item.label,
        currentSource: item.image,
        footerPercent: 15,
      })
    );
  }

  for (const item of FESTIVE_CELEBRATIONS) {
    slots.push(
      festiveSpotlightSlot({
        id: `shop-festive-${item.id}`,
        pageName: 'Personalized Shop',
        pageRoute: '/shop',
        sectionName: 'Festive Celebrations',
        componentName: 'FestiveCelebrationsSection.tsx',
        imageName: item.label,
        festival: item.label,
        currentSource: item.image,
      })
    );
  }

  for (const item of CUSTOM_GIFT_COLLECTION) {
    slots.push(
      portraitCardSlot({
        id: `shop-custom-${item.id}`,
        pageName: 'Personalized Shop',
        pageRoute: '/shop',
        sectionName: 'Custom Gift Collection',
        componentName: 'CustomGiftCollectionSection.tsx',
        imageName: item.label,
        label: item.label,
        currentSource: item.image,
        cardWidth: 320,
        cardHeight: 380,
        footerPercent: 12,
      })
    );
  }

  for (const item of PREMIUM_COLLECTION) {
    slots.push(
      buildImageSlot({
        id: `shop-premium-${item.id}`,
        pageName: 'Personalized Shop',
        pageRoute: '/shop',
        sectionName: 'Premium Collection',
        componentName: 'PremiumCollectionSection.tsx',
        imageName: item.label,
        purpose: 'Category Thumbnail',
        priority: 'High',
        currentSource: item.image,
        technical: {
          desktop: dim(240, 320),
          tablet: dim(220, 293),
          mobile: dim(180, 240),
          aspectRatio: '3:4',
          format: 'WebP + JPG fallback',
          compressionQuality: 82,
          retinaExport: dim(480, 640, 1),
          maxFileSizeKb: 160,
          cropRules: 'Portrait 3:4 cover crop in card grid',
          safeArea: 'Full card image area',
          focalPoint: 'Center',
          transparency: false,
        },
        content: {
          subject: `${item.label} — ultra-premium gift collection`,
          composition: 'Vertical luxury product or hamper hero',
          style: 'High-end editorial with rich textures',
          brandColors: '#6B1E30 burgundy, #C9A96E gold',
          mood: 'Opulent, executive',
          luxuryLevel: 'Ultra-premium',
        },
      })
    );
    slots.push(
      premiumHoverPreviewSlot({
        id: `shop-premium-hover-${item.id}`,
        label: item.label,
        currentSource: item.image.replace('w=600', 'w=1200'),
      })
    );
  }

  return slots;
}

function buildHamperBuilderSlots(): ImageRequirement[] {
  const page = { pageName: 'Hamper Builder', pageRoute: '/hamper-builder' };
  const slots: ImageRequirement[] = [];

  for (const box of HAMPER_BUILDER_BOXES) {
    slots.push(
      productImageSlot({
        id: `builder-box-${box.id}`,
        ...page,
        sectionName: 'Step 1 — Choose Box',
        componentName: 'CustomBoxesPage.tsx',
        imageName: box.name,
        productName: box.name,
        currentSource: box.image,
        priority: 'High',
      })
    );
  }

  for (const product of HAMPER_BUILDER_PRODUCTS) {
    slots.push(
      productImageSlot({
        id: `builder-product-${product.id}`,
        ...page,
        sectionName: 'Step 2 — Add Products',
        componentName: 'CustomBoxesPage.tsx',
        imageName: product.name,
        productName: product.name,
        currentSource: product.image,
      })
    );
  }

  for (const card of HAMPER_BUILDER_CARDS) {
    slots.push(
      productImageSlot({
        id: `builder-card-${card.id}`,
        ...page,
        sectionName: 'Step 3 — Select Card',
        componentName: 'CustomBoxesPage.tsx',
        imageName: card.name,
        productName: card.name,
        currentSource: card.image,
      })
    );
  }

  slots.push(
    buildImageSlot({
      id: 'builder-cart-chip',
      ...page,
      sectionName: 'Sticky Cart Bar',
      componentName: 'CustomBoxesPage.tsx',
      imageName: 'Cart item thumbnail',
      purpose: 'Product Image',
      priority: 'Low',
      currentSource: 'Dynamic from selected items',
      technical: {
        desktop: dim(20, 20),
        tablet: dim(20, 20),
        mobile: dim(20, 20),
        aspectRatio: '1:1',
        format: 'WebP + JPG fallback',
        compressionQuality: 75,
        retinaExport: dim(40, 40, 1),
        maxFileSizeKb: 10,
        cropRules: 'Tiny square chip — same source as product, cropped',
        safeArea: 'Center',
        focalPoint: 'Center',
        transparency: false,
      },
      content: {
        subject: 'Mini thumbnail of selected box/product/card',
        composition: 'Recognizable at 20px',
        style: 'Same as parent product shot',
        brandColors: 'N/A',
        mood: 'Functional UI element',
      },
    })
  );

  return slots;
}

function buildHomePageSlots(): ImageRequirement[] {
  return [
    heroBannerSlot({
      id: 'home-hero-desktop',
      pageName: 'Home (unrouted)',
      pageRoute: '/home',
      sectionName: 'Hero',
      componentName: 'HomePage.tsx',
      imageName: 'Home Hero Banner',
      variant: 'desktop',
      currentSource: '/hero-new.png',
      subject: 'Full-site hero showcasing corporate and personalized gifting',
      textSafeArea: 'Left 50% for headline and CTAs',
      focalPoint: 'Right — product showcase',
    }),
    heroBannerSlot({
      id: 'home-hero-mobile',
      pageName: 'Home (unrouted)',
      pageRoute: '/home',
      sectionName: 'Hero',
      componentName: 'HomePage.tsx',
      imageName: 'Home Hero Banner',
      variant: 'mobile',
      currentSource: '/hero-new.png',
      subject: 'Mobile home hero',
      textSafeArea: 'Top 40%',
      focalPoint: 'Center',
    }),
  ];
}

export function buildImageRequirements(): ImageRequirement[] {
  const all: ImageRequirement[] = [
    ...buildGlobalSlots(),
    ...buildCorporatePageSlots(),
    ...buildShopPageSlots(),
    ...buildHamperBuilderSlots(),
    ...buildHomePageSlots(),
    browseProductTemplateSlot(),
  ];

  for (const partial of customImageSlots) {
    if (partial.id && partial.pageName && partial.imageName) {
      all.push(partial as ImageRequirement);
    }
  }

  return applyCatalogMeta(all).sort((a, b) => {
    const pageCmp = (a.pageOrder ?? 99) - (b.pageOrder ?? 99);
    if (pageCmp !== 0) return pageCmp;
    const sectionCmp = (a.sectionOrder ?? 99) - (b.sectionOrder ?? 99);
    if (sectionCmp !== 0) return sectionCmp;
    return a.imageName.localeCompare(b.imageName);
  });
}

export function getRequirementStats(requirements: ImageRequirement[]) {
  const byPage = new Map<string, number>();
  const byPurpose = new Map<string, number>();
  const byStatus = new Map<string, number>();

  for (const r of requirements) {
    byPage.set(r.pageName, (byPage.get(r.pageName) ?? 0) + 1);
    byPurpose.set(r.purpose, (byPurpose.get(r.purpose) ?? 0) + 1);
    byStatus.set(r.status, (byStatus.get(r.status) ?? 0) + 1);
  }

  return { byPage, byPurpose, byStatus, total: requirements.length };
}

export const PAGE_OPTIONS = [
  'All pages',
  'Global (All Pages)',
  'Corporate',
  'Personalized Shop',
  'Hamper Builder',
  'Shop Browse & Placeholder Pages',
  'Home (unrouted)',
] as const;

export const PURPOSE_OPTIONS = [
  'All purposes',
  'Hero Banner',
  'Category Thumbnail',
  'Product Image',
  'Gallery Tile',
  'Form Supporting Photo',
  'Logo',
] as const;

export const STATUS_OPTIONS = ['All statuses', 'missing', 'placeholder', 'production'] as const;
