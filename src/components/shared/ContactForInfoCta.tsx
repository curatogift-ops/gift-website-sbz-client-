import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/utils/cn';

type ContactForInfoCtaProps = {
  href?: string;
  className?: string;
  label?: string;
};

/** Post-listing CTA — routes to Corporate Gift Enquiry when no destination is specified. */
export default function ContactForInfoCta({
  href = '/corporate#corporate-gift-enquiry',
  className,
  label = 'Contact for Info →',
}: ContactForInfoCtaProps) {
  return (
    <div className={cn('mt-8 flex justify-center sm:mt-10', className)}>
      <Link
        to={href}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-[#C9A96E]/45 bg-[#4A1020] px-6 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#F2EDE8] transition hover:bg-[#5C1529]"
      >
        <span>{label}</span>
        <ArrowRight className="h-3.5 w-3.5 text-[#C9A96E]" strokeWidth={2} aria-hidden />
      </Link>
    </div>
  );
}
