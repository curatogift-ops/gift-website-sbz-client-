import { useState, type FormEvent } from 'react';
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

export default function NavSearchBar({
  compact = false,
  className,
  inputClassName,
  onSubmitted,
}: NavSearchBarProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

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
        'nav-header-search flex w-full items-center gap-2 rounded-full border border-[#E0E0E0]/80 bg-surface-muted shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all focus-within:border-[#9D7D47] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#9D7D47]/10',
        compact ? 'max-w-full px-3 py-2.5' : 'max-w-[min(100%,320px)] px-3.5 py-1.5 md:max-w-[min(100%,280px)] lg:max-w-[300px]',
        className
      )}
    >
      <Search className="h-3.5 w-3.5 shrink-0 text-[#9a9490]" strokeWidth={2} aria-hidden />
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search luxury hampers, gifts..."
        className={cn(
          'min-w-0 flex-1 bg-transparent text-[#1A1010] outline-none placeholder:text-[#a8a29e]',
          compact ? 'text-[14.5px]' : 'text-[12px] font-medium',
          inputClassName
        )}
        aria-label="Search gifts and hampers"
      />
    </form>
  );
}
