import { Building2, FileText, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '@/config/companyInfo';
import { cn } from '@/utils/cn';

type CompanyLegalDetailsProps = {
  variant?: 'light' | 'dark';
  className?: string;
  showHeading?: boolean;
  showAddress?: boolean;
};

export default function CompanyLegalDetails({
  variant = 'dark',
  className,
  showHeading = true,
  showAddress = true,
}: CompanyLegalDetailsProps) {
  const isDark = variant === 'dark';

  return (
    <div className={cn('space-y-4', className)}>
      {showHeading && (
        <p
          className={cn(
            'font-sans text-[12px] font-bold uppercase tracking-[0.22em]',
            isDark ? 'text-[#C9A96E]' : 'text-[#9D7D47]',
          )}
        >
          {COMPANY_INFO.registeredOfficeLabel}
        </p>
      )}

      {showAddress && (
        <div className="flex gap-3">
          <MapPin
            className={cn('mt-0.5 h-4 w-4 shrink-0', isDark ? 'text-[#E8CF9A]' : 'text-[#9D7D47]')}
            strokeWidth={1.75}
            aria-hidden
          />
          <address
            className={cn(
              'not-italic text-sm leading-relaxed',
              isDark ? 'text-[#F2EDE8]/90' : 'text-foreground',
            )}
          >
            {COMPANY_INFO.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </div>
      )}

      <dl className="grid gap-2.5 text-sm sm:grid-cols-2">
        <div className="flex items-start gap-2.5">
          <Building2
            className={cn('mt-0.5 h-4 w-4 shrink-0', isDark ? 'text-[#E8CF9A]' : 'text-[#9D7D47]')}
            strokeWidth={1.75}
            aria-hidden
          />
          <div>
            <dt className={cn('text-[11px] font-bold uppercase tracking-[0.14em]', isDark ? 'text-[#C9A96E]' : 'text-muted-foreground')}>
              MSME No.
            </dt>
            <dd className={cn('mt-0.5 font-medium', isDark ? 'text-[#F2EDE8]' : 'text-foreground')}>
              {COMPANY_INFO.msme}
            </dd>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <FileText
            className={cn('mt-0.5 h-4 w-4 shrink-0', isDark ? 'text-[#E8CF9A]' : 'text-[#9D7D47]')}
            strokeWidth={1.75}
            aria-hidden
          />
          <div>
            <dt className={cn('text-[11px] font-bold uppercase tracking-[0.14em]', isDark ? 'text-[#C9A96E]' : 'text-muted-foreground')}>
              GSTIN / UIN
            </dt>
            <dd className={cn('mt-0.5 font-medium', isDark ? 'text-[#F2EDE8]' : 'text-foreground')}>
              {COMPANY_INFO.gstin}
            </dd>
          </div>
        </div>

        <div className="sm:col-span-2">
          <dt className={cn('text-[11px] font-bold uppercase tracking-[0.14em]', isDark ? 'text-[#C9A96E]' : 'text-muted-foreground')}>
            State
          </dt>
          <dd className={cn('mt-0.5 font-medium', isDark ? 'text-[#F2EDE8]' : 'text-foreground')}>
            {COMPANY_INFO.state} (Code: {COMPANY_INFO.stateCode})
          </dd>
        </div>
      </dl>
    </div>
  );
}
