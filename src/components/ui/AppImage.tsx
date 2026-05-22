import { cn } from '@/utils/cn';

type AppImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
};

export default function AppImage({
  src,
  alt,
  fill,
  className,
  priority,
  sizes: _sizes,
  ...props
}: AppImageProps) {
  if (fill) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn('absolute inset-0 h-full w-full', className)}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        {...props}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      {...props}
    />
  );
}
