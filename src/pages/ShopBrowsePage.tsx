import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import PlaceholderPage from '@/pages/PlaceholderPage';
import { getShopBrowseCategoryKey, getShopBrowseTitle } from '@/config/shopMenu';
import { parseBrowsePriceRange } from '@/lib/shopBrowseParams';

/**
 * Catalog listing for Shop mega-menu links (/shop/browse?...).
 */
export default function ShopBrowsePage() {
  const [searchParams] = useSearchParams();
  const title = getShopBrowseTitle(searchParams);
  const categoryKey = getShopBrowseCategoryKey(searchParams);
  const priceRange = useMemo(
    () => parseBrowsePriceRange(searchParams.get('price')),
    [searchParams]
  );

  return (
    <PlaceholderPage
      title={title}
      categoryKey={categoryKey}
      minPrice={priceRange.minPrice}
      maxPrice={priceRange.maxPrice}
      searchQuery={searchParams.get('q') ?? ''}
    />
  );
}
