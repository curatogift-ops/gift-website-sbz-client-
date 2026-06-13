/** Maps legacy /shop?query links to /shop/browse or in-page anchors */

export function mapLegacyShopQuery(search: string): string | null {
  if (!search || search === '?') return null;

  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
  if ([...params.keys()].length === 0) return null;

  const category = params.get('category');
  if (category) {
    if (category === 'corporate') return '/corporate';
    return `/shop/browse?occasion=${encodeURIComponent(category)}`;
  }

  const occasion = params.get('occasion');
  if (occasion) return `/shop/browse?occasion=${encodeURIComponent(occasion)}`;

  const cat = params.get('cat');
  if (cat) return `/shop/browse?cat=${encodeURIComponent(cat)}`;

  const type = params.get('type');
  if (type) return `/shop/browse?type=${encodeURIComponent(type)}`;

  const recipient = params.get('recipient');
  if (recipient) return `/shop/browse?recipient=${encodeURIComponent(recipient)}`;

  const price = params.get('price');
  if (price) return `/shop/browse?price=${encodeURIComponent(price)}`;

  return `/shop/browse?${params.toString()}`;
}

export function parseBrowsePriceRange(price: string | null): { minPrice?: number; maxPrice?: number } {
  switch (price) {
    case 'under-499':
      return { maxPrice: 499 };
    case 'under-999':
      return { maxPrice: 999 };
    case 'under-1999':
      return { maxPrice: 1999 };
    case 'premium':
      return { minPrice: 3000 };
    case '1000-2000':
      return { minPrice: 1000, maxPrice: 2000 };
    case '2000-3000':
      return { minPrice: 2000, maxPrice: 3000 };
    case 'above-3000':
      return { minPrice: 3000 };
    default:
      return {};
  }
}
