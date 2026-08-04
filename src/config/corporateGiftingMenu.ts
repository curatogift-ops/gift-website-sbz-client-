import type { PromotionalMenuColumn } from '@/config/promotionalGiftsMenu';

/**
 * Corporate Gifting mega-menu — matches brief mockup:
 * By Celebration · By Occasion · By Industry · By Price
 */
export const CORPORATE_GIFTING_MEGA_MENU: PromotionalMenuColumn[] = [
  {
    title: 'BY CELEBRATION',
    items: [
      { label: 'Employee Welcome Kits', href: '/corporate-gifting/employee-welcome-kits' },
      { label: 'Rewards and Recognition', href: '/corporate-gifting/rewards-and-recognition' },
      { label: 'Work Anniversary Gifts', href: '/corporate-gifting/work-anniversary-gifts' },
      { label: 'Client Appreciation Gifts', href: '/corporate-gifting/client-appreciation-gifts' },
      { label: 'Corporate Birthday Gifts', href: '/corporate-gifting/corporate-birthday-gifts' },
      { label: 'Thank You Gifts', href: '/corporate-gifting/thank-you-gifts' },
    ],
  },
  {
    title: 'BY OCCASION',
    items: [
      { label: 'Diwali Gifts', href: '/corporate-gifting/diwali-gifts' },
      { label: 'Christmas Gifts', href: '/corporate-gifting/christmas-gifts' },
      { label: 'New Year Gifts', href: '/corporate-gifting/new-year-gifts' },
      { label: "Women's Day Gifts", href: '/corporate-gifting/womens-day-gifts' },
    ],
  },
  {
    title: 'BY INDUSTRY',
    items: [
      { label: 'Tech Gifts', href: '/corporate-gifting/tech-gifts' },
      { label: 'Architecture Gifts', href: '/corporate-gifting/architecture-gifts' },
      { label: 'Real Estate Gifts', href: '/corporate-gifting/real-estate-gifts' },
    ],
  },
  {
    title: 'BY PRICE',
    items: [
      { label: 'Under Rs 1000', href: '/corporate-gifting/under-rs-1000' },
      { label: 'Rs 1000 to Rs 2000', href: '/corporate-gifting/rs-1000-to-rs-2000' },
      { label: 'Rs 2000 to Rs 3000', href: '/corporate-gifting/rs-2000-to-rs-3000' },
      { label: 'Above Rs 3000', href: '/corporate-gifting/above-rs-3000' },
    ],
  },
];
