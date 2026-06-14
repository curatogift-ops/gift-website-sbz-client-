import { Link } from 'react-router-dom';
import AppImage from '@/components/ui/AppImage';
import { cn } from '@/utils/cn';

export const LOGO_SRC = '/images/gift-gallerei-logo.png';
export const BRAND_TAGLINE = 'One stop gifting solution';

/** Near-black — matches logo wordmark for strong contrast on white */
export const TAGLINE_COLOR = '#1A1010';

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

function BrandTagline({
  variant,
  className,
}: {
  variant: 'default' | 'footer';
  className?: string;
}) {
  const isFooter = variant === 'footer';

  return (
    <p
      className={cn(
        'brand-tagline whitespace-nowrap',
        isFooter ? 'brand-tagline--footer' : 'brand-tagline--header',
        className
      )}
      style={!isFooter ? { color: TAGLINE_COLOR } : undefined}
    >
      {BRAND_TAGLINE}
    </p>
  );
}

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
  const lockup = (
    <div className={cn('flex w-full max-w-full flex-col items-center', widthClass, className)}>
      <div className={cn('relative w-full shrink-0', logoHeightClass, logoClassName)}>
        <AppImage
          src={LOGO_SRC}
          alt="Giftz Gallerei"
          fill
          className={cn(
            'object-contain object-center',
            variant === 'footer' && 'brightness-0 invert'
          )}
          priority={priority}
          sizes="(max-width:640px) 140px, 240px"
        />
      </div>

      {showTagline && (
        <div className="mt-1 w-full max-w-full overflow-hidden">
          <BrandTagline variant={variant} className={taglineClassName} />
        </div>
      )}
    </div>
  );

  if (to) {
    return (
      <Link
        to={to}
        className={cn('inline-flex max-w-full shrink-0 transition-opacity hover:opacity-90', widthClass)}
        aria-label={`Giftz Gallerei — ${BRAND_TAGLINE}`}
      >
        {lockup}
      </Link>
    );
  }

  return lockup;
}
