'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ListFilter, SlidersHorizontal } from 'lucide-react';
import { useProducts, useFilterSetter } from '@/hooks/useFansQuery';
import { useDebounce } from '@/hooks/useDebounce';
import { FilterDrawer } from '@/components/modules/catalog/filter-drawer';
import { ProductCard } from '@/components/modules/catalog/product-card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatPersianNumber } from '@/lib/utils';
import type { BearingType, FanCategory, FilterState, SortOption, Voltage } from '@/types/fan.types';

const DEFAULT_FILTERS: FilterState = {
  categories: [],
  cfmRange: [50, 800],
  noiseRange: [15, 60],
  staticPressureMin: 0,
  dimensionMax: 500,
  voltages: [],
  bearings: [],
  sortBy: 'relevance',
};

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'relevance', label: 'مرتبط‌ترین' },
  { value: 'price-asc', label: 'ارزان‌ترین' },
  { value: 'price-desc', label: 'گران‌ترین' },
  { value: 'rating', label: 'محبوب‌ترین' },
  { value: 'airflow-desc', label: 'بیشترین جریان هوا' },
  { value: 'noise-asc', label: 'کم‌صداترین' },
];

function splitCsv(value: string | null): string[] {
  return value ? value.split(',').filter(Boolean) : [];
}

/** Initialize FilterState from the URL search params (runs once). */
function parseFiltersFromParams(params: URLSearchParams): FilterState {
  const categories = splitCsv(params.get('category')) as FanCategory[];
  const voltages = splitCsv(params.get('voltages')) as Voltage[];
  const bearings = splitCsv(params.get('bearings')) as BearingType[];

  return {
    search: params.get('search') ?? undefined,
    categories,
    cfmRange: [
      Number(params.get('cfmMin')) || DEFAULT_FILTERS.cfmRange[0],
      Number(params.get('cfmMax')) || DEFAULT_FILTERS.cfmRange[1],
    ],
    noiseRange: [
      Number(params.get('noiseMin')) || DEFAULT_FILTERS.noiseRange[0],
      Number(params.get('noiseMax')) || DEFAULT_FILTERS.noiseRange[1],
    ],
    staticPressureMin: Number(params.get('staticPressureMin')) || 0,
    dimensionMax: Number(params.get('dimensionMax')) || 500,
    voltages,
    bearings,
    sortBy: (params.get('sortBy') as SortOption) || 'relevance',
  };
}

function ProductsView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize once from URL; subsequent updates are local + pushed to URL.
  const [filters, setFilters] = useState<FilterState>(() =>
    parseFiltersFromParams(searchParams),
  );
  const [page, setPage] = useState(() => Math.max(1, Number(searchParams.get('page')) || 1));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const setFilter = useFilterSetter(setFilters);

  const { data, isLoading, isFetching } = useProducts({ filters, page });

  // Debounce URL persistence so rapid filter tweaks don't hammer the history.
  const debouncedFilters = useDebounce(filters, 300);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedFilters.search) params.set('search', debouncedFilters.search);
    if (debouncedFilters.categories.length) {
      params.set('category', debouncedFilters.categories.join(','));
    }
    if (debouncedFilters.voltages.length) {
      params.set('voltages', debouncedFilters.voltages.join(','));
    }
    if (debouncedFilters.bearings.length) {
      params.set('bearings', debouncedFilters.bearings.join(','));
    }
    if (debouncedFilters.cfmRange[0] !== DEFAULT_FILTERS.cfmRange[0]) {
      params.set('cfmMin', String(debouncedFilters.cfmRange[0]));
    }
    if (debouncedFilters.cfmRange[1] !== DEFAULT_FILTERS.cfmRange[1]) {
      params.set('cfmMax', String(debouncedFilters.cfmRange[1]));
    }
    if (debouncedFilters.sortBy !== 'relevance') params.set('sortBy', debouncedFilters.sortBy);
    if (page > 1) params.set('page', String(page));

    const qs = params.toString();
    router.replace(qs ? `/products?${qs}` : '/products', { scroll: false });
  }, [debouncedFilters, page, router]);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  }, []);

  const totalPages = data?.totalPages ?? 1;
  const maxPage = Math.max(1, totalPages);

  return (
    <div className="container py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">کاتالوگ فن‌ها</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {data ? formatPersianNumber(data.total) : '…'} محصول یافت شد
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={filters.sortBy}
            onValueChange={(value) => {
              setFilter({ sortBy: value as SortOption });
              setPage(1);
            }}
          >
            <SelectTrigger className="w-44">
              <SlidersHorizontal className="me-2 size-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={() => setDrawerOpen(true)}>
            <ListFilter className="size-4" />
            فیلترها
          </Button>
        </div>
      </div>

      {/* Loading skeleton while page changes */}
      <div className={cnGrid(isFetching)}>
        {isLoading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3 rounded-xl border p-4">
              <Skeleton className="aspect-[4/3] w-full rounded-lg" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))
        ) : data && data.items.length > 0 ? (
          data.items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full rounded-xl border border-dashed p-16 text-center">
            <p className="text-lg font-semibold">محصولی با این فیلترها یافت نشد</p>
            <p className="mt-2 text-sm text-muted-foreground">
              فیلترها را تغییر دهید یا همه را حذف کنید.
            </p>
            <Button variant="outline" className="mt-5" onClick={resetFilters}>
              حذف همه فیلترها
            </Button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {maxPage > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            قبلی
          </Button>
          <span className="px-3 text-sm text-muted-foreground">
            صفحه {formatPersianNumber(page)} از {formatPersianNumber(maxPage)}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= maxPage}
            onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
          >
            بعدی
          </Button>
        </div>
      )}

      <FilterDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        filters={filters}
        onChange={setFilter}
        onReset={resetFilters}
      />
    </div>
  );
}

function cnGrid(isFetching: boolean): string {
  return isFetching
    ? 'grid grid-cols-1 gap-5 opacity-60 transition-opacity sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    : 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container py-8">در حال بارگذاری…</div>}>
      <ProductsView />
    </Suspense>
  );
}
