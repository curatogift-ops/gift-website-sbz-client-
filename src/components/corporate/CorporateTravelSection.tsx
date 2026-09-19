import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  Car,
  Compass,
  Globe2,
  Hotel,
  MapPinned,
  Package,
  Plane,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/utils/cn';

/** Card-aligned values first, then the brief’s required form list. */
export const TRAVEL_TRIP_TYPES = [
  'Domestic Trip',
  'International Trip',
  'Incentive & Reward Trip',
  'Corporate Experience',
  'Employee Incentive Trip',
  'Corporate Offsite',
  'Team Outing',
  'Client / Partner Trip',
  'Reward & Recognition Trip',
  'Executive / Leadership Travel',
  'Other',
] as const;

export type TravelTripType = (typeof TRAVEL_TRIP_TYPES)[number];

type TravelCard = {
  id: string;
  number: string;
  title: string;
  description: string;
  tripType: TravelTripType;
};

const TRAVEL_CARDS: TravelCard[] = [
  {
    id: 'domestic',
    number: '01',
    title: 'Domestic Trips',
    description: 'Team getaways, incentive trips & corporate offsites across India.',
    tripType: 'Domestic Trip',
  },
  {
    id: 'international',
    number: '02',
    title: 'International Trips',
    description: 'International incentive trips, client experiences & executive travel.',
    tripType: 'International Trip',
  },
  {
    id: 'incentive',
    number: '03',
    title: 'Incentive & Reward Trips',
    description: 'Reward your employees and teams with memorable travel experiences.',
    tripType: 'Incentive & Reward Trip',
  },
  {
    id: 'experiences',
    number: '04',
    title: 'Corporate Experiences',
    description: 'Curated experiences for clients, partners, leadership teams & employees.',
    tripType: 'Corporate Experience',
  },
];

const MANAGEMENT_ITEMS = [
  { label: 'Flights & Transportation', Icon: Plane },
  { label: 'Hotels & Accommodation', Icon: Hotel },
  { label: 'Airport & Local Transfers', Icon: Car },
  { label: 'Activities & Experiences', Icon: Compass },
  { label: 'Complete Trip Coordination', Icon: Package },
  { label: 'Customized Corporate Packages', Icon: Sparkles },
] as const;

function enquiryHref(tripType: TravelTripType) {
  return `/corporate?tripType=${encodeURIComponent(tripType)}#corporate-travel-enquiry`;
}

export default function CorporateTravelSection() {
  return (
    <section
      id="corporate-travel-experience"
      className="relative scroll-mt-28 overflow-hidden bg-white py-12 sm:py-16 lg:py-20"
      aria-labelledby="corporate-travel-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(201,169,110,0.18) 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden
      />

      <div className="section-container relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-[#9D7D47]">Corporate Travel &amp; Experience</p>
          <h2
            id="corporate-travel-heading"
            className="section-heading-corporate mt-3"
          >
            Corporate Travel &amp; Experience
          </h2>
          <p className="section-lede mx-auto mt-4 max-w-2xl">
            From Corporate Gifting to Corporate Experiences — Giftz Gallerei helps you create
            moments that people remember.
          </p>
        </div>

        <ul className="mt-10 grid list-none gap-4 sm:mt-12 sm:grid-cols-2 lg:gap-5 xl:grid-cols-4">
          {TRAVEL_CARDS.map((card) => (
            <li key={card.id}>
              <Link
                to={enquiryHref(card.tripType)}
                className="group flex h-full flex-col rounded-2xl border border-border bg-[var(--cream)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A96E]/50 hover:bg-white hover:shadow-lg sm:p-6"
              >
                <span className="font-sans text-[11px] font-bold tracking-[0.16em] text-[#C9A96E]">
                  {card.number}
                </span>
                <h3 className="mt-3 font-serif text-[1.15rem] font-semibold leading-snug text-primary sm:text-[1.25rem]">
                  {card.title}
                </h3>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted-foreground">
                  {card.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[#4A1020] transition group-hover:text-[#9D7D47]">
                  Enquire
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={2}
                    aria-hidden
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-14 sm:mt-16">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-[#C9A96E]/35 bg-[#4A1020] text-[#C9A96E]">
              <MapPinned className="h-5 w-5" strokeWidth={1.6} aria-hidden />
            </div>
            <h3 className="font-serif text-[clamp(1.35rem,2.5vw,1.75rem)] font-semibold text-primary">
              End-to-End Travel Management
            </h3>
          </div>

          <ul className="mt-8 grid list-none gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {MANAGEMENT_ITEMS.map(({ label, Icon }) => (
              <li
                key={label}
                className="flex items-center gap-3.5 rounded-xl border border-border bg-white px-4 py-4 transition-colors hover:border-[#C9A96E]/40"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#C9A96E]/30 bg-[#4A1020] text-[#C9A96E]">
                  <Icon className="h-4.5 w-4.5" strokeWidth={1.6} aria-hidden />
                </span>
                <span className="font-sans text-[13px] font-semibold leading-snug text-foreground">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex justify-center sm:mt-12">
          <Link
            to="/corporate#corporate-travel-enquiry"
            className={cn(
              'inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#4A1020] px-6 py-3',
              'font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#F2EDE8]',
              'transition hover:bg-[#5C1529]',
            )}
          >
            <Building2 className="h-4 w-4 text-[#C9A96E]" strokeWidth={1.6} aria-hidden />
            <Globe2 className="hidden h-4 w-4 text-[#C9A96E] sm:block" strokeWidth={1.6} aria-hidden />
            <span>Plan Your Corporate Trip →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
