import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { resolveShopSearch } from '@/lib/shopSearch';
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

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    const result = resolveShopSearch(trimmed);
    setQuery('');
    onSubmitted?.();
    navigate(result.href);
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={cn(
        'nav-header-search flex w-full items-center gap-2 rounded-lg border border-[#E0E0E0]/80 bg-white shadow-sm transition-all focus-within:border-[#9D7D47] focus-within:ring-1 focus-within:ring-[#9D7D47]',
        compact ? 'max-w-full px-3 py-2.5' : 'max-w-[min(100%,320px)] px-3 py-2',
        className
      )}
    >
      <Search className="h-4 w-4 shrink-0 text-black" strokeWidth={2} aria-hidden />
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholderText}
        className={cn(
          'min-w-0 flex-1 bg-transparent text-[#1A1010] outline-none placeholder:text-[#1A1010]/90',
          compact ? 'text-[14.5px]' : 'text-[13px] font-medium',
          inputClassName
        )}
        aria-label="Search gifts and hampers"
      />
    </form>
  );
}
