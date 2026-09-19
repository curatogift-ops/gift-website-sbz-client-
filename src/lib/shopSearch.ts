import { CORPORATE_CATEGORIES } from '@/config/corporateGiftingData';
import { CORPORATE_GIFTING_MEGA_MENU } from '@/config/corporateGiftingMenu';
import { PROMOTIONAL_GIFTS_MEGA_MENU } from '@/config/promotionalGiftsMenu';

export type ShopSearchResult = {
  href: string;
  label: string;
};

const ENQUIRY = '/corporate#corporate-gift-enquiry';
const TRAVEL_ENQUIRY = '/corporate#corporate-travel-enquiry';

const CORPORATE_SECTIONS: { keywords: string[]; href: string; label: string }[] = [
  {
    keywords: ['travel', 'trip', 'incentive trip', 'offsite', 'corporate experience'],
    href: TRAVEL_ENQUIRY,
    label: 'Corporate Travel & Experience',
  },
  {
    keywords: ['hamper builder', 'build your own', 'make your own', 'custom box'],
    href: '/hamper-builder',
    label: 'Build your own',
  },
  {
    keywords: ['catalogue', 'catalog', 'download'],
    href: '/catalogue',
    label: 'Corporate Gift Catalogue',
  },
  {
    keywords: ['brand', 'brands'],
    href: '/brands',
    label: 'Our Brands',
  },
  {
    keywords: ['voucher', 'vouchers'],
    href: '/vouchers-brands',
    label: 'Voucher Brands',
  },
  {
    keywords: ['trophy', 'trophies', 'award', 'awards'],
    href: '/corporate/category/trophies-vouchers',
    label: 'Trophies & Vouchers',
  },
  {
    keywords: ['contact', 'enquiry', 'inquiry', 'quote', 'bulk'],
    href: ENQUIRY,
    label: 'Corporate Gift Enquiry',
  },
  {
    keywords: ['about', 'founder'],
    href: '/about',
    label: 'About Us',
  },
];

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

function collectMenuItems(): { label: string; href: string }[] {
  const items: { label: string; href: string }[] = [];
  for (const column of [...CORPORATE_GIFTING_MEGA_MENU, ...PROMOTIONAL_GIFTS_MEGA_MENU]) {
    for (const item of column.items) {
      items.push(item);
    }
  }
  for (const category of CORPORATE_CATEGORIES) {
    items.push({
      label: category.label,
      href: `/corporate/category/${category.slug}`,
    });
  }
  return items;
}

/** Resolve a navbar search query to the best matching corporate route. */
export function resolveShopSearch(raw: string): ShopSearchResult {
  const query = normalize(raw);
  if (!query) {
    return { href: '/corporate', label: 'Corporate Gifting' };
  }

  const menuItems = collectMenuItems();

  for (const item of menuItems) {
    const label = normalize(item.label);
    if (label.includes(query) || query.includes(label)) {
      return { href: item.href, label: item.label };
    }
  }

  for (const section of CORPORATE_SECTIONS) {
    if (section.keywords.some((keyword) => query.includes(keyword) || keyword.includes(query))) {
      return { href: section.href, label: section.label };
    }
  }

  const words = query.split(' ').filter((word) => word.length > 2);
  for (const item of menuItems) {
    const label = normalize(item.label);
    if (words.some((word) => label.includes(word))) {
      return { href: item.href, label: item.label };
    }
  }

  return {
    href: ENQUIRY,
    label: raw.trim(),
  };
}
