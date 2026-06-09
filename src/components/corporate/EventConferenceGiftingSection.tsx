import GiftCategoryGridSection from '@/components/shop/GiftCategoryGridSection';
import BulkEnquiryFormSection from '@/components/shared/BulkEnquiryFormSection';
import type { GiftCategoryItem } from '@/components/shop/GiftCategoryCard';
import { Award, Briefcase, Crown, Gift } from 'lucide-react';

const EVENT_ITEMS: GiftCategoryItem[] = [
  {
    id: 'delegate-kits',
    label: 'Delegate Kits',
    href: '/shop/browse?cat=delegate-kits',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600',
    imageAlt: 'Corporate delegate welcome kits',
    Icon: Briefcase,
  },
  {
    id: 'conference-giveaways',
    label: 'Conference Giveaways',
    href: '/shop/browse?cat=conference-giveaways',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600',
    imageAlt: 'Conference giveaway gifts',
    Icon: Gift,
  },
  {
    id: 'speaker-vip-gifts',
    label: 'Speaker & VIP Gifts',
    href: '/shop/browse?cat=speaker-vip-gifts',
    image: 'https://images.unsplash.com/photo-1549463574-04d2c2b46ac?auto=format&fit=crop&q=80&w=600',
    imageAlt: 'Premium speaker and VIP corporate gifts',
    Icon: Crown,
  },
  {
    id: 'award-recognition-trophies',
    label: 'Award & Recognition Trophies',
    href: '/shop/browse?cat=award-recognition-trophies',
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=600',
    imageAlt: 'Custom awards and recognition trophies',
    Icon: Award,
  },
];

export default function EventConferenceGiftingSection() {
  return (
    <>
      <GiftCategoryGridSection
        id="event-conference-gifting"
        heading="🏆 Events &"
        headingAccent="Conferences"
        items={EVENT_ITEMS}
        columns={4}
        bgClass="bg-[#FFF9F5]"
      />
      <BulkEnquiryFormSection
        id="event-bulk-enquiry"
        title="Enquire for Bulk Order"
        subtitle="Planning a conference, seminar, or trade show? Share your requirements and we'll curate branded gifting solutions."
        variant="inline"
        imageSrc="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800"
        imageAlt="Corporate event gifting team collaboration"
        className="border-t border-[#ebe6e0]/60 bg-white pt-0"
      />
    </>
  );
}
