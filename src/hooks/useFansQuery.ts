'use client';

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useCallback } from 'react';
import type { Product, FilterState } from '@/types/fan.types';
import {
  fetchBestSellers,
  fetchProductDetail,
  fetchProducts,
  fetchSearchResults,
  submitConsultation,
  type ConsultationPayload,
} from '@/lib/products-service';

/** Stable query keys — used for strict cache invalidation. */
export const queryKeys = {
  products: (filters: FilterState, page: number, pageSize: number) =>
    ['products', filters, page, pageSize] as const,
  productDetail: (slug: string) => ['product', slug] as const,
  search: (query: string) => ['search', query] as const,
  bestSellers: (limit: number) => ['best-sellers', limit] as const,
} as const;

export interface UseProductsOptions {
  filters: FilterState;
  page: number;
  pageSize?: number;
}

/**
 * Catalog products query with strict cache strategy:
 * - `placeholderData: keepPreviousData` prevents skeleton flicker when
 *   filters change (no full remount, no poof of the grid).
 * - `staleTime` keeps results fresh for 60s.
 */
export function useProducts({ filters, page, pageSize = 12 }: UseProductsOptions) {
  return useQuery({
    queryKey: queryKeys.products(filters, page, pageSize),
    queryFn: () => fetchProducts(filters, page, pageSize),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
    retry: 1,
  });
}

/** Single product detail query (PDP). */
export function useProductDetail(slug: string) {
  return useQuery({
    queryKey: queryKeys.productDetail(slug),
    queryFn: () => fetchProductDetail(slug),
    enabled: Boolean(slug),
    staleTime: 5 * 60_000,
  });
}

/** Debounced global search query. `query` should already be debounced. */
export function useSearchResults(debouncedQuery: string) {
  return useQuery({
    queryKey: queryKeys.search(debouncedQuery),
    queryFn: () => fetchSearchResults(debouncedQuery),
    enabled: debouncedQuery.trim().length >= 2,
    staleTime: 30_000,
  });
}

/** Best-sellers for the home page. */
export function useBestSellers(limit = 4) {
  return useQuery({
    queryKey: queryKeys.bestSellers(limit),
    queryFn: () => fetchBestSellers(limit),
    staleTime: 5 * 60_000,
  });
}

/**
 * Consultation submission mutation.
 * Demonstrates optimistic cache update on the consultation list (if any)
 * plus strict invalidation.
 */
export function useSubmitConsultation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ConsultationPayload) => submitConsultation(payload),
    onSuccess: () => {
      // Invalidate any consultation list queries to reflect the new record.
      void queryClient.invalidateQueries({ queryKey: ['consultations'] });
    },
  });
}

/** Reusable stable callback factory for sort/setting mutations. */
export function useFilterSetter(setter: React.Dispatch<React.SetStateAction<FilterState>>) {
  return useCallback(
    (patch: Partial<FilterState>) => {
      setter((prev) => ({ ...prev, ...patch }));
    },
    [setter],
  );
}

export type { Product };
