import { getProductBySlug, type CorporateProduct } from '@/config/corporateGiftingData';

const STORAGE_KEY = 'giftz_corporate_recently_viewed';
const MAX_ITEMS = 12;

export function getRecentlyViewedSlugs(): string[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

export function addCorporateRecentlyViewed(slug: string): void {
  if (typeof window === 'undefined' || !slug) return;

  const updated = [slug, ...getRecentlyViewedSlugs().filter((item) => item !== slug)].slice(0, MAX_ITEMS);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function getRecentlyViewedProducts(excludeSlug?: string): CorporateProduct[] {
  return getRecentlyViewedSlugs()
    .filter((slug) => slug !== excludeSlug)
    .map((slug) => getProductBySlug(slug))
    .filter((product): product is CorporateProduct => product !== undefined);
}
