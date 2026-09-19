import type { PromotionalMenuColumn } from '@/config/promotionalGiftsMenu';

const ENQUIRY = '/corporate#corporate-gift-enquiry';

/**
 * Corporate Gifting mega-menu — matches brief mockup:
 * By Celebration · By Occasion · By Industry · By Price
 * Leaf links point to real category pages when they exist; otherwise enquiry.
 */
export const CORPORATE_GIFTING_MEGA_MENU: PromotionalMenuColumn[] = [
  {
    title: 'BY CELEBRATION',
    items: [
      { label: 'Employee Welcome Kits', href: '/corporate/category/employee-joining-kits' },
      { label: 'Rewards and Recognition', href: '/corporate/category/trophies-vouchers' },
      { label: 'Work Anniversary Gifts', href: ENQUIRY },
      { label: 'Client Appreciation Gifts', href: ENQUIRY },
      { label: 'Corporate Birthday Gifts', href: ENQUIRY },
      { label: 'Thank You Gifts', href: ENQUIRY },
    ],
  },
  {
    title: 'BY OCCASION',
    items: [
      { label: 'Diwali Gifts', href: '/corporate/category/festive-gifts' },
      { label: 'Christmas Gifts', href: '/corporate/category/festive-gifts' },
      { label: 'New Year Gifts', href: '/corporate/category/festive-gifts' },
      { label: "Women's Day Gifts", href: '/corporate/category/festive-gifts' },
    ],
  },
  {
    title: 'BY INDUSTRY',
    items: [
      { label: 'Tech Gifts', href: '/corporate/category/tech-gifts' },
      { label: 'Architecture Gifts', href: ENQUIRY },
      { label: 'Real Estate Gifts', href: ENQUIRY },
    ],
  },
  {
    title: 'BY PRICE',
    items: [
      { label: 'Under Rs 1000', href: ENQUIRY },
      { label: 'Rs 1000 to Rs 2000', href: ENQUIRY },
      { label: 'Rs 2000 to Rs 3000', href: ENQUIRY },
      { label: 'Above Rs 3000', href: ENQUIRY },
    ],
  },
];
