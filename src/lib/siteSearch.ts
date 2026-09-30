import {
  ALL_CATALOGUES,
  CATALOGUE_SECTIONS,
  catalogueInCategory,
  filterCatalogues,
  type CatalogueCategoryId,
  type CatalogueItem,
} from '@/config/catalogueLibraryData';
import {
  CORPORATE_CATEGORIES,
  CORPORATE_PRODUCTS,
  type CorporateProduct,
} from '@/config/corporateGiftingData';

export type SearchCategoryHit = {
  id: string;
  label: string;
  href: string;
  detail: string;
};

export type SearchProductHit = {
  slug: string;
  name: string;
  category: string;
  href: string;
  image: string;
};

export type SiteSearchResults = {
  query: string;
  categories: SearchCategoryHit[];
  products: SearchProductHit[];
  catalogues: CatalogueItem[];
};

type Group = {
  terms: string[];
  catalogueCategories: CatalogueCategoryId[];
  catalogueNeedles?: string[];
  productCategorySlugs: string[];
  productNeedles?: string[];
};

const GROUPS: Group[] = [
  {
    terms: ['welcome gifts', 'welcome gift', 'joining gifts', 'joining gift'],
    catalogueCategories: ['corporate-gifts'],
    catalogueNeedles: ['welcome', 'joining', 'gift box'],
    productCategorySlugs: ['employee-joining-kits'],
    productNeedles: ['welcome', 'joining'],
  },
  {
    terms: ['employee gifts', 'employee gift'],
    catalogueCategories: ['corporate-gifts'],
    catalogueNeedles: ['welcome', 'joining', 'employee'],
    productCategorySlugs: ['employee-joining-kits'],
    productNeedles: ['welcome', 'joining', 'employee'],
  },
  {
    terms: ['gift boxes', 'gift box'],
    catalogueCategories: ['corporate-gifts'],
    catalogueNeedles: ['gift box', 'gift set'],
    productCategorySlugs: ['corporate-hampers'],
    productNeedles: ['gift box', 'hamper'],
  },
  {
    terms: ['corporate gifts', 'corporate gift'],
    catalogueCategories: ['corporate-gifts'],
    productCategorySlugs: ['corporate-hampers'],
  },
  {
    terms: ['festive gifts', 'festive gift'],
    catalogueCategories: ['festive-gifts'],
    productCategorySlugs: ['festive-gifts'],
  },
  {
    terms: ['tech gifts', 'technology', 'tech gift'],
    catalogueCategories: ['technology'],
    productCategorySlugs: ['tech-gifts'],
    productNeedles: ['tech'],
  },
  {
    terms: ['shawls', 'shawl', 'stoles', 'stole'],
    catalogueCategories: ['clothes'],
    catalogueNeedles: ['shawl', 'stole', 'jamawar', 'wool'],
    productCategorySlugs: [],
    productNeedles: ['shawl', 'stole', 'jamawar'],
  },
  {
    terms: ['clothes', 'clothing'],
    catalogueCategories: ['clothes'],
    productCategorySlugs: [],
    productNeedles: ['apparel', 'shawl', 'stole'],
  },
  {
    terms: ['chocolates', 'chocolate', 'gourmet'],
    catalogueCategories: ['chocolate-gourmet'],
    productCategorySlugs: [],
    productNeedles: ['chocolate', 'gourmet', 'cadbury', 'lindt', 'ferrero', 'hershey'],
  },
  {
    terms: ['diwali'],
    catalogueCategories: ['festive-gifts'],
    catalogueNeedles: ['diwali'],
    productCategorySlugs: ['festive-gifts'],
  },
  {
    terms: ['bags', 'bag'],
    catalogueCategories: ['lifestyle-travel'],
    catalogueNeedles: ['bag', 'luggage', 'backpack'],
    productCategorySlugs: [],
    productNeedles: ['bag', 'luggage', 'backpack', 'tote'],
  },
  {
    terms: ['bottles', 'bottle', 'mugs', 'mug', 'tiffins', 'tiffin', 'drinkware'],
    catalogueCategories: ['lifestyle-travel'],
    catalogueNeedles: ['bottle', 'mug', 'tiffin', 'drinkware'],
    productCategorySlugs: ['drinkware'],
    productNeedles: ['bottle', 'mug', 'tiffin', 'tumbler', 'flask', 'cup'],
  },
];

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

function matchesTerm(query: string, term: string): boolean {
  if (!query || !term) return false;
  if (query === term || query.includes(term)) return true;
  return term.startsWith(query) && query.length >= 3;
}

function productHaystack(product: CorporateProduct): string {
  const category = CORPORATE_CATEGORIES.find((entry) => entry.slug === product.categorySlug);
  return `${product.name} ${product.description} ${product.features.join(' ')} ${category?.label ?? ''} ${category?.description ?? ''}`.toLowerCase();
}

function toProductHit(product: CorporateProduct): SearchProductHit {
  const category = CORPORATE_CATEGORIES.find((entry) => entry.slug === product.categorySlug);
  return {
    slug: product.slug,
    name: product.name,
    category: category?.label ?? 'Corporate gifts',
    href: `/corporate/product/${product.slug}`,
    image: product.images[0] ?? '',
  };
}

export function searchSite(raw: string): SiteSearchResults {
  const query = normalize(raw);
  const groups = GROUPS.filter((group) => group.terms.some((term) => matchesTerm(query, term)));

  const catalogues: CatalogueItem[] = [];
  const catalogueIds = new Set<string>();
  const addCatalogue = (item: CatalogueItem) => {
    if (catalogueIds.has(item.id)) return;
    catalogueIds.add(item.id);
    catalogues.push(item);
  };

  const categories: SearchCategoryHit[] = [];
  const categoryIds = new Set<string>();
  const addCategory = (hit: SearchCategoryHit) => {
    if (categoryIds.has(hit.id)) return;
    categoryIds.add(hit.id);
    categories.push(hit);
  };

  for (const group of groups) {
    for (const categoryId of group.catalogueCategories) {
      const section = CATALOGUE_SECTIONS.find((entry) => entry.id === categoryId);
      if (!section) continue;
      addCategory({
        id: `catalogue-${categoryId}`,
        label: section.label,
        href: `/catalogue?category=${categoryId}`,
        detail: 'Catalogue category',
      });
      for (const item of ALL_CATALOGUES) {
        if (!catalogueInCategory(item, categoryId)) continue;
        if (
          group.catalogueNeedles &&
          !group.catalogueNeedles.some((needle) => item.keywords.includes(needle))
        ) {
          continue;
        }
        addCatalogue(item);
      }
    }
    for (const slug of group.productCategorySlugs) {
      const category = CORPORATE_CATEGORIES.find((entry) => entry.slug === slug);
      if (!category) continue;
      addCategory({
        id: `products-${slug}`,
        label: category.label,
        href: `/corporate/category/${slug}`,
        detail: 'Product category',
      });
    }
  }

  if (query) {
    for (const item of filterCatalogues(query)) addCatalogue(item);
    for (const section of CATALOGUE_SECTIONS) {
      if (section.label.toLowerCase().includes(query)) {
        addCategory({
          id: `catalogue-${section.id}`,
          label: section.label,
          href: `/catalogue?category=${section.id}`,
          detail: 'Catalogue category',
        });
      }
    }
    for (const category of CORPORATE_CATEGORIES) {
      const hay = `${category.label} ${category.description}`.toLowerCase();
      if (hay.includes(query)) {
        addCategory({
          id: `products-${category.slug}`,
          label: category.label,
          href: `/corporate/category/${category.slug}`,
          detail: 'Product category',
        });
      }
    }
  }

  const needles = new Set<string>();
  if (query.length >= 3) needles.add(query);
  for (const group of groups) {
    for (const needle of group.productNeedles ?? []) needles.add(needle);
  }
  const categorySlugs = new Set(groups.flatMap((group) => group.productCategorySlugs));

  const products = CORPORATE_PRODUCTS.filter((product) => {
    if (categorySlugs.has(product.categorySlug)) return true;
    const hay = productHaystack(product);
    return [...needles].some((needle) => hay.includes(needle));
  })
    .sort((a, b) => {
      const aRank = categorySlugs.has(a.categorySlug) ? 0 : 1;
      const bRank = categorySlugs.has(b.categorySlug) ? 0 : 1;
      return aRank - bRank;
    })
    .map(toProductHit);

  return { query, categories, products, catalogues };
}
