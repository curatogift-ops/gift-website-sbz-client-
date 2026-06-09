import { Link } from 'react-router-dom';
import AppImage from '@/components/ui/AppImage';
import { ArrowRight, Award, Medal, Trophy } from 'lucide-react';

const AWARD_TYPES = [
  {
    title: 'Crystal Awards',
    description: 'Elegant crystal trophies with custom engraving for recognition ceremonies.',
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=600',
    href: '/shop/browse?cat=crystal-awards',
  },
  {
    title: 'Wooden Plaques',
    description: 'Premium wooden plaques with your logo and personalized messaging.',
    image: 'https://images.unsplash.com/photo-1610552050899-df6c5848284a?auto=format&fit=crop&q=80&w=600',
    href: '/shop/browse?cat=wooden-plaques',
  },
  {
    title: 'Metal Trophies',
    description: 'Durable metal trophies for annual awards and milestone celebrations.',
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=600',
    href: '/shop/browse?cat=metal-trophies',
  },
];

export default function AwardsTrophiesSection() {
  return (
    <section
      id="awards-trophies"
      className="section-pad scroll-mt-28 section-alt"
      aria-labelledby="awards-trophies-heading"
    >
      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Recognition & appreciation</p>
          <h2 id="awards-trophies-heading" className="section-heading-corporate mt-3">
            Customized Awards & <span className="text-[#6B1E30]">Trophies</span>
          </h2>
          <p className="section-lede mx-auto mt-4">
            Celebrate achievements with bespoke awards, trophies, and plaques — branded to reflect your organisation.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-3 lg:mt-12">
          {AWARD_TYPES.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#EBEBEB]/80 bg-white shadow-[0_4px_20px_-8px_rgba(74,16,32,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-8px_rgba(74,16,32,0.18)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <AppImage
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width:640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#6B1E30] text-white shadow-md">
                  <Trophy className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="card-title">{item.title}</h3>
                <p className="mt-2 flex-1 text-[14px] leading-relaxed text-[#6b6560]">{item.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.14em] text-[#6B1E30]">
                  Explore options
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mx-auto mt-8 flex max-w-6xl flex-wrap items-center justify-center gap-6 rounded-2xl border border-[#C9A96E]/20 bg-white px-6 py-5 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.06)] sm:gap-10">
          <div className="flex items-center gap-3">
            <Award className="h-5 w-5 text-[#9D7D47]" strokeWidth={1.75} aria-hidden />
            <span className="text-[13px] font-semibold text-[#1A1010]">Custom engraving & branding</span>
          </div>
          <div className="flex items-center gap-3">
            <Medal className="h-5 w-5 text-[#9D7D47]" strokeWidth={1.75} aria-hidden />
            <span className="text-[13px] font-semibold text-[#1A1010]">Bulk order pricing</span>
          </div>
          <div className="flex items-center gap-3">
            <Trophy className="h-5 w-5 text-[#9D7D47]" strokeWidth={1.75} aria-hidden />
            <span className="text-[13px] font-semibold text-[#1A1010]">Pan-India delivery</span>
          </div>
        </div>
      </div>
    </section>
  );
}
