'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearchResults } from '@/hooks/useFansQuery';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { cn, formatCurrency } from '@/lib/utils';

/**
 * RTL global search bar with:
 * - 350ms debounce before firing the React Query search endpoint
 * - loading skeleton + empty state (Persian)
 * - instant results dropdown
 */
export function SearchBar({ className }: { className?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const debouncedQuery = useDebounce(query, 350);

  const { data, isLoading } = useSearchResults(debouncedQuery);

  const showDropdown = focused && debouncedQuery.trim().length >= 2;

  const results = useMemo(() => data ?? [], [data]);

  return (
    <div className={cn('relative w-full', className)}>
      <div className="relative">
        <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => window.setTimeout(() => setFocused(false), 150)}
          placeholder="جستجوی فن، برند یا مشخصات فنی…"
          className="pe-10"
          role="searchbox"
          aria-label="جستجو"
        />
        {query && (
          <button
            type="button"
            aria-label="پاک کردن جستجو"
            onClick={() => setQuery('')}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute z-40 mt-2 w-full overflow-hidden rounded-lg border bg-popover shadow-lg">
          {isLoading ? (
            <div className="space-y-2 p-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-2/3" />
            </div>
          ) : results.length > 0 ? (
            <ul className="max-h-80 overflow-y-auto p-1">
              {results.map((product) => (
                <li key={product.id}>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      router.push(`/products/${product.slug}`);
                      setQuery('');
                    }}
                    className="flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-right text-sm transition-colors hover:bg-accent"
                  >
                    <span className="line-clamp-1 font-medium">{product.title}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {formatCurrency(product.price)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-6 text-center text-sm text-muted-foreground">
              نتیجه‌ای برای «{debouncedQuery}» یافت نشد.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
