import type { GiftCategoryItem } from '@/components/shop/GiftCategoryCard';
import {
  Baby,
  Cake,
  Camera,
  Coffee,
  Crown,
  Frame,
  Gift,
  Heart,
  Leaf,
  PartyPopper,
  PenLine,
  Sparkles,
  Star,
  Trophy,
  Users,
  Wine,
} from 'lucide-react';

const IMG = {
  birthday: 'https://images.unsplash.com/photo-1464349095432-e9a21285b5f3?auto=format&fit=crop&q=80&w=600',
  wedding: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=600',
  anniversary: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=600',
  baby: 'https://images.unsplash.com/photo-1515488042361-ee00ebbfddd1?auto=format&fit=crop&q=80&w=600',
  achievement: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=600',
  family: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=600',
  custom: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600',
  newYear: 'https://images.unsplash.com/photo-1482517967863-00e15c717b44?auto=format&fit=crop&q=80&w=600',
  diwali: 'https://images.unsplash.com/photo-1605810233971-f8f155d8869f?auto=format&fit=crop&q=80&w=600',
  christmas: 'https://images.unsplash.com/photo-1513885536991-8b943e177042?auto=format&fit=crop&q=80&w=600',
  eid: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?auto=format&fit=crop&q=80&w=600',
  holi: 'https://images.unsplash.com/photo-1524492412930-59525977c5cf?auto=format&fit=crop&q=80&w=600',
  photo: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600',
  name: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=600',
  mug: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=600',
  frame: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600',
  bottle: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600',
  accessory: 'https://images.unsplash.com/photo-1610552050899-df6c5848284a?auto=format&fit=crop&q=80&w=600',
  box: 'https://images.unsplash.com/photo-1512496015851-a90fb38f7968?auto=format&fit=crop&q=80&w=600',
  chocolate: 'https://images.unsplash.com/photo-1549007953-2f2dc0b24019?auto=format&fit=crop&q=80&w=600',
  dryFruit: 'https://images.unsplash.com/photo-1599599810769-bcde5a16007c?auto=format&fit=crop&q=80&w=600',
  wellness: 'https://images.unsplash.com/photo-1610552050899-df6c5848284a?auto=format&fit=crop&q=80&w=600',
  premium: 'https://images.unsplash.com/photo-1512496015851-a90fb38f7968?auto=format&fit=crop&q=80&w=600',
  luxury: 'https://images.unsplash.com/photo-1512496015851-a90fb38f7968?auto=format&fit=crop&q=80&w=600',
  executive: 'https://images.unsplash.com/photo-1549463574-04d2c2b46ac?auto=format&fit=crop&q=80&w=600',
  exclusive: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=600',
};

export const MOST_LOVED_HAMPERS: GiftCategoryItem[] = [
  { id: 'birthday', label: 'Birthday Gifts', href: '/shop/browse?occasion=birthday', image: IMG.birthday, imageAlt: 'Birthday celebration gifts', Icon: Cake },
  { id: 'wedding', label: 'Wedding Gifts', href: '/shop/browse?occasion=wedding', image: IMG.wedding, imageAlt: 'Wedding celebration gifts', Icon: Heart },
  { id: 'anniversary', label: 'Anniversary Gifts', href: '/shop/browse?occasion=anniversary', image: IMG.anniversary, imageAlt: 'Anniversary celebration gifts', Icon: Sparkles },
  { id: 'baby-family', label: 'Baby & Family Celebrations', href: '/shop/browse?occasion=baby-shower', image: IMG.baby, imageAlt: 'Baby and family celebration gifts', Icon: Baby },
  { id: 'achievement', label: 'Achievement Celebrations', href: '/shop/browse?occasion=achievement', image: IMG.achievement, imageAlt: 'Achievement celebration gifts', Icon: Trophy },
  { id: 'family-events', label: 'Family Events', href: '/shop/browse?occasion=family', image: IMG.family, imageAlt: 'Family event gifts', Icon: Users },
  { id: 'custom-celebrations', label: 'Custom Celebrations', href: '/hamper-builder', image: IMG.custom, imageAlt: 'Build your own custom celebration hamper', Icon: Gift },
];

export const FESTIVE_CELEBRATIONS: GiftCategoryItem[] = [
  { id: 'new-year', label: 'New Year Parties', href: '/shop/browse?occasion=new-year', image: IMG.newYear, imageAlt: 'New Year party gifts', Icon: PartyPopper },
  { id: 'diwali', label: 'Diwali Celebrations', href: '/shop/browse?occasion=diwali', image: IMG.diwali, imageAlt: 'Diwali celebration gifts', Icon: Sparkles },
  { id: 'christmas', label: 'Christmas Parties', href: '/shop/browse?occasion=christmas', image: IMG.christmas, imageAlt: 'Christmas party gifts', Icon: Gift },
  { id: 'eid', label: 'Eid Celebrations', href: '/shop/browse?occasion=eid', image: IMG.eid, imageAlt: 'Eid celebration gifts', Icon: Star },
  { id: 'holi', label: 'Holi Events', href: '/shop/browse?occasion=holi', image: IMG.holi, imageAlt: 'Holi event gifts', Icon: PartyPopper },
];

export const CUSTOM_GIFT_COLLECTION: GiftCategoryItem[] = [
  { id: 'photo', label: 'Photo Gifts', href: '/shop/browse?type=photo', image: IMG.photo, imageAlt: 'Personalized photo gifts', Icon: Camera },
  { id: 'name', label: 'Gifts with Your Name', href: '/shop/browse?type=engraved', image: IMG.name, imageAlt: 'Gifts with your name engraved', Icon: PenLine },
  { id: 'mugs', label: 'Custom Mugs', href: '/shop/browse?type=mugs', image: IMG.mug, imageAlt: 'Custom personalized mugs', Icon: Coffee },
  { id: 'frames', label: 'Personalized Frames', href: '/shop/browse?type=frames', image: IMG.frame, imageAlt: 'Personalized photo frames', Icon: Frame },
  { id: 'bottles', label: 'Customized Bottles', href: '/shop/browse?type=bottles', image: IMG.bottle, imageAlt: 'Customized bottles', Icon: Wine },
  { id: 'accessories', label: 'Personalized Accessories', href: '/shop/browse?type=accessories', image: IMG.accessory, imageAlt: 'Personalized accessories', Icon: Sparkles },
  { id: 'boxes', label: 'Custom Gift Boxes', href: '/shop/browse?type=custom-boxes', image: IMG.box, imageAlt: 'Custom gift boxes', Icon: Gift },
];

export const GIFT_HAMPERS: GiftCategoryItem[] = [
  { id: 'chocolate', label: 'Chocolate Hampers', href: '/shop/browse?cat=chocolate-hampers', image: IMG.chocolate, imageAlt: 'Chocolate gift hampers', Icon: Gift },
  { id: 'dry-fruit', label: 'Dry Fruit Hampers', href: '/shop/browse?cat=dry-fruit-hampers', image: IMG.dryFruit, imageAlt: 'Dry fruit gift hampers', Icon: Leaf },
  { id: 'wellness', label: 'Wellness Hampers', href: '/shop/browse?cat=wellness-hampers', image: IMG.wellness, imageAlt: 'Wellness gift hampers', Icon: Heart },
  { id: 'premium-boxes', label: 'Premium Gift Boxes', href: '/shop/browse?cat=premium-boxes', image: IMG.premium, imageAlt: 'Premium gift boxes', Icon: Crown },
  { id: 'custom-hampers', label: 'Custom Hampers', href: '/hamper-builder', image: IMG.custom, imageAlt: 'Build your own custom hamper', Icon: Gift },
];

export const PREMIUM_COLLECTION: GiftCategoryItem[] = [
  { id: 'luxury', label: 'Luxury Gifts', href: '/shop/browse?cat=luxury', image: IMG.luxury, imageAlt: 'Luxury gift collection', Icon: Crown },
  { id: 'executive', label: 'Executive Gifts', href: '/shop/browse?cat=executive', image: IMG.executive, imageAlt: 'Executive gift collection', Icon: Trophy },
  { id: 'premium-sets', label: 'Premium Gift Sets', href: '/shop/browse?cat=premium-sets', image: IMG.premium, imageAlt: 'Premium gift sets', Icon: Gift },
  { id: 'exclusive', label: 'Exclusive Collections', href: '/shop/browse?cat=exclusive', image: IMG.exclusive, imageAlt: 'Exclusive gift collections', Icon: Star },
];

export const GIFTS_BY_BUDGET: GiftCategoryItem[] = [
  { id: 'under-499', label: 'Under ₹499', href: '/shop/browse?price=under-499', image: IMG.box, imageAlt: 'Gifts under 499 rupees', Icon: Gift },
  { id: 'under-999', label: 'Under ₹999', href: '/shop/browse?price=under-999', image: IMG.chocolate, imageAlt: 'Gifts under 999 rupees', Icon: Gift },
  { id: 'under-1999', label: 'Under ₹1,999', href: '/shop/browse?price=under-1999', image: IMG.premium, imageAlt: 'Gifts under 1999 rupees', Icon: Gift },
  { id: 'premium-gifts', label: 'Premium Gifts', href: '/shop/browse?price=premium', image: IMG.luxury, imageAlt: 'Premium priced gifts', Icon: Crown },
];
