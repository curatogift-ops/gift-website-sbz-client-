import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { searchSite } from '@/lib/siteSearch';
import { downloadCatalogueFile } from '@/lib/catalogueDownload';
import { cn } from '@/utils/cn';

type NavSearchBarProps = {
  compact?: boolean;
  className?: string;
  inputClassName?: string;
  onSubmitted?: () => void;
};

const PLACEHOLDERS = [
  "Search luxury hampers...",
  "Wedding return gifts...",
  "Corporate gifts...",
  "Promotional gifts...",
  "Festive gifting..."
];

export default function NavSearchBar({
  compact = false,
  className,
  inputClassName,
  onSubmitted,
}: NavSearchBarProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  // Typewriter effect state
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [placeholderText, setPlaceholderText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const currentFullText = PLACEHOLDERS[placeholderIndex];
    let typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting && placeholderText === currentFullText) {
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, 2000); // Pause at end of word
      } else if (isDeleting && placeholderText === '') {
        setIsDeleting(false);
        setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
      } else {
        setPlaceholderText(
          currentFullText.substring(0, placeholderText.length + (isDeleting ? -1 : 1))
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [placeholderText, isDeleting, placeholderIndex, isPaused]);

  const trimmed = query.trim();
  const preview = trimmed.length >= 2 ? searchSite(trimmed) : null;
  const showPreview = open && preview && (preview.categories.length > 0 || preview.products.length > 0 || preview.catalogues.length > 0);

  useEffect(() => {
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    return () => document.removeEventListener('pointerdown', onPointer);
  }, []);

  const goToResults = (value: string) => {
    const next = value.trim();
    if (!next) return;
    setQuery('');
    setOpen(false);
    onSubmitted?.();
    navigate(`/search?q=${encodeURIComponent(next)}`);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    goToResults(query);
  };

  return (
    <div ref={rootRef} className={cn('relative w-full min-w-0', className)}>
    <form
      onSubmit={handleSubmit}
      role="search"
      className={cn(
        'nav-header-search flex w-full items-center gap-2 rounded-lg border border-[#E0E0E0]/80 bg-white shadow-sm transition-all focus-within:border-[#9D7D47] focus-within:ring-1 focus-within:ring-[#9D7D47]',
        compact ? 'max-w-full px-3 py-2.5' : 'max-w-[min(100%,320px)] px-3 py-2',
      )}
    >
      <Search className="h-4 w-4 shrink-0 text-black" strokeWidth={2} aria-hidden />
      <input
        type="search"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder={placeholderText}
        className={cn(
          'min-w-0 flex-1 bg-transparent text-[#1A1010] outline-none placeholder:text-[#1A1010]/90',
          compact ? 'text-[14.5px]' : 'text-[13px] font-medium',
          inputClassName
        )}
        aria-label="Search gifts, categories, and catalogues"
      />
    </form>
    {showPreview && preview && (
      <div className="absolute left-0 right-0 top-[calc(100%+0.4rem)] z-[80] max-h-[70vh] overflow-y-auto rounded-xl border border-[#E8DFD2] bg-white p-3 shadow-xl">
        {preview.categories.slice(0, 3).map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => {
              setQuery('');
              setOpen(false);
              onSubmitted?.();
              navigate(category.href);
            }}
            className="flex w-full items-center justify-between gap-3 rounded-lg px-2 py-2 text-left hover:bg-[#FBF7F2]"
          >
            <span className="font-serif text-[14px] font-semibold text-[#4A1020]">{category.label}</span>
            <span className="shrink-0 font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-[#9D7D47]">{category.detail}</span>
          </button>
        ))}
        {preview.products.slice(0, 3).map((product) => (
          <button
            key={product.slug}
            type="button"
            onClick={() => {
              setQuery('');
              setOpen(false);
              onSubmitted?.();
              navigate(product.href);
            }}
            className="flex w-full items-center justify-between gap-3 rounded-lg px-2 py-2 text-left hover:bg-[#FBF7F2]"
          >
            <span className="line-clamp-1 font-sans text-[13px] text-[#1A1010]">{product.name}</span>
            <span className="shrink-0 font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-[#9D7D47]">Product</span>
          </button>
        ))}
        {preview.catalogues.slice(0, 3).map((item) => (
          <div key={item.id} className="flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-[#FBF7F2]">
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setOpen(false);
                onSubmitted?.();
                navigate(`/catalogue?category=${item.categoryId}&focus=${item.id}`);
              }}
              className="min-w-0 flex-1 text-left"
            >
              <span className="block truncate font-sans text-[13px] font-semibold text-[#4A1020]">{item.title}</span>
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-[#9D7D47]">Catalogue · {item.categoryLabel}</span>
            </button>
            <button
              type="button"
              onClick={() => void downloadCatalogueFile(item.file, item.file.split('/').pop() ?? 'catalogue.pdf')}
              className="shrink-0 rounded-md bg-[#4A1020] px-2 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.08em] text-white"
            >
              Download
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => goToResults(trimmed)}
          className="mt-1 w-full rounded-md px-2 py-2 text-left font-sans text-[12px] font-bold uppercase tracking-[0.1em] text-[#4A1020] hover:bg-[#FBF7F2]"
        >
          See all results
        </button>
      </div>
    )}
    </div>
  );
}
