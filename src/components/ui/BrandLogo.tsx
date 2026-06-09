import { Link } from 'react-router-dom';
import AppImage from '@/components/ui/AppImage';
import { cn } from '@/utils/cn';

export const LOGO_SRC = '/images/gift-gallerei-logo.png';
export const BRAND_TAGLINE = 'One stop gifting solution';

/** Matches the giftz gallerei wordmark grey in the logo PNG */
const TAGLINE_COLOR = '#595959';

type BrandLogoProps = {
  className?: string;
  logoClassName?: string;
  taglineClassName?: string;
  variant?: 'default' | 'footer';
  showTagline?: boolean;
  to?: string;
  priority?: boolean;
  logoHeightClass?: string;
  widthClass?: string;
};

export default function BrandLogo({
  className,
  logoClassName,
  taglineClassName,
  variant = 'default',
  showTagline = true,
  to = '/',
  priority = false,
  logoHeightClass = 'h-[2.2rem]',
  widthClass = 'w-[13rem]',
}: BrandLogoProps) {
  const isFooter = variant === 'footer';

  const lockup = (
    <div className={cn('flex flex-col items-stretch', widthClass, className)}>
      <div className={cn('relative w-full shrink-0', logoHeightClass, logoClassName)}>
        <AppImage
          src={LOGO_SRC}
          alt="Giftz Gallerei"
          fill
          className="object-contain object-left"
          priority={priority}
          sizes="(max-width:640px) 140px, 240px"
        />
      </div>

      {showTagline && (
        <p
          className={cn(
            'brand-tagline mt-1 w-full text-center leading-none',
            isFooter ? 'text-[#E8CF9A]' : 'text-[#595959]',
            taglineClassName
          )}
          style={!isFooter ? { color: TAGLINE_COLOR } : undefined}
        >
          {BRAND_TAGLINE}
        </p>
      )}
    </div>
  );

  if (to) {
    return (
      <Link
        to={to}
        className={cn('inline-block shrink-0 transition-opacity hover:opacity-90', widthClass)}
        aria-label="Giftz Gallerei — One stop gifting solution"
      >
        {lockup}
      </Link>
    );
  }

  return lockup;
}
