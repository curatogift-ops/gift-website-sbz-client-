import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import PlaceholderPage from '@/pages/PlaceholderPage';
import { getShopBrowseCategoryKey, getShopBrowseTitle } from '@/config/shopMenu';

function parsePriceRange(price: string | null): { minPrice?: number; maxPrice?: number } {
  switch (price) {
    case 'under-999':
      return { maxPrice: 999 };
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

/**
 * Catalog listing for Shop mega-menu links (/shop/browse?...).
 */
export default function ShopBrowsePage() {
  const [searchParams] = useSearchParams();
  const title = getShopBrowseTitle(searchParams);
  const categoryKey = getShopBrowseCategoryKey(searchParams);
  const priceRange = useMemo(
    () => parsePriceRange(searchParams.get('price')),
    [searchParams]
  );

  return (
    <PlaceholderPage
      title={title}
      categoryKey={categoryKey}
      minPrice={priceRange.minPrice}
      maxPrice={priceRange.maxPrice}
    />
  );
}
