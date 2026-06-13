import { SHOP_MEGA_MENU } from '@/config/shopMenu';

export type ShopSearchResult = {
  href: string;
  label: string;
};

const SHOP_SECTIONS: { keywords: string[]; href: string; label: string }[] = [
  { keywords: ['relationship', 'for her', 'for him', 'for couple', 'for parents', 'for kids', 'recipient'], href: '/shop#relationship-picks', label: 'Gifts by Relationship' },
  { keywords: ['celebration', 'birthday', 'wedding', 'anniversary', 'occasion', 'baby shower', 'achievement'], href: '/shop#celebrations', label: 'Celebrations' },
  { keywords: ['festive', 'diwali', 'christmas', 'holi', 'eid', 'new year'], href: '/shop#festive-celebrations', label: 'Festive Celebrations' },
  { keywords: ['custom', 'personalized', 'photo gift', 'engraved', 'mug', 'frame'], href: '/shop#custom-gift-collection', label: 'Custom Gift Collection' },
  { keywords: ['hamper', 'hampers', 'chocolate hamper', 'dry fruit', 'wellness hamper'], href: '/shop#gift-hampers', label: 'Gift Hampers' },
  { keywords: ['budget', 'under 499', 'under 999', 'under 1999', 'price'], href: '/shop#gifts-by-budget', label: 'Gifts by Budget' },
  { keywords: ['premium', 'luxury', 'executive', 'exclusive'], href: '/shop#premium-collection', label: 'Premium Collection' },
  { keywords: ['hamper builder', 'build your own', 'make your own'], href: '/hamper-builder', label: 'Make Your Own Hamper' },
];

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

/** Resolve a navbar/catalog search query to the best matching route. */
export function resolveShopSearch(raw: string): ShopSearchResult {
  const query = normalize(raw);
  if (!query) {
    return { href: '/shop/browse', label: 'All gifts' };
  }

  for (const column of SHOP_MEGA_MENU) {
    for (const item of column.items) {
      const label = normalize(item.label);
      if (label.includes(query) || query.includes(label)) {
        return { href: item.href, label: item.label };
      }
    }
  }

  for (const section of SHOP_SECTIONS) {
    if (section.keywords.some((keyword) => query.includes(keyword) || keyword.includes(query))) {
      return { href: section.href, label: section.label };
    }
  }

  const words = query.split(' ').filter((word) => word.length > 2);
  for (const column of SHOP_MEGA_MENU) {
    for (const item of column.items) {
      const label = normalize(item.label);
      if (words.some((word) => label.includes(word))) {
        return { href: item.href, label: item.label };
      }
    }
  }

  return {
    href: `/shop/browse?q=${encodeURIComponent(raw.trim())}`,
    label: raw.trim(),
  };
}
