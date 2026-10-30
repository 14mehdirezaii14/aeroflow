import type { Product, FilterState } from '@/types/fan.types';
import type { PaginatedResponse } from '@/types/api.types';
import { apiGet, apiPost, apiRoutes, filtersToQuery } from '@/lib/api-client';
import {
  filterMockFans,
  getMockBestSellers,
  getMockProductBySlug,
  searchMockFans,
} from '@/lib/mock-data';

/**
 * Data access layer.
 * When `NEXT_PUBLIC_API_URL` is configured, all calls go through the real
 * Axios client (NestJS REST backend). Otherwise the in-memory mock store is
 * used, so the entire app remains fully functional locally.
 */

const API_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_API_URL);

type CatalogResult = PaginatedResponse<Product>;

export async function fetchProducts(
  filters: FilterState,
  page: number,
  pageSize = 12,
): Promise<CatalogResult> {
  if (!API_CONFIGURED) {
    // simulate network latency for realistic loading skeletons
    await new Promise((r) => setTimeout(r, 250));
    return filterMockFans(filters, page, pageSize);
  }
  return apiGet<CatalogResult>(apiRoutes.products, {
    ...filtersToQuery(filters),
    page,
    pageSize,
  });
}

export async function fetchProductDetail(slug: string): Promise<Product> {
  if (!API_CONFIGURED) {
    await new Promise((r) => setTimeout(r, 200));
    const product = getMockProductBySlug(slug);
    if (!product) throw new Error('محصول موردنظر یافت نشد.');
    return product;
  }
  return apiGet<Product>(apiRoutes.productBySlug(slug));
}

export async function fetchSearchResults(query: string): Promise<Product[]> {
  if (!API_CONFIGURED) {
    await new Promise((r) => setTimeout(r, 180));
    return searchMockFans(query);
  }
  return apiGet<Product[]>(apiRoutes.search, { q: query, limit: 8 });
}

export async function fetchBestSellers(limit = 4): Promise<Product[]> {
  if (!API_CONFIGURED) {
    await new Promise((r) => setTimeout(r, 150));
    return getMockBestSellers(limit);
  }
  return apiGet<Product[]>(apiRoutes.products, { bestSeller: true, limit });
}

export interface ConsultationPayload {
  companyName: string;
  contactName: string;
  mobile: string;
  email: string;
  projectType: string;
  areaM2: number;
  postalCode: string;
  message: string;
}

export async function submitConsultation(payload: ConsultationPayload): Promise<{ id: string }> {
  if (!API_CONFIGURED) {
    await new Promise((r) => setTimeout(r, 400));
    return { id: 'mock-consultation-1' };
  }
  return apiPost<{ id: string }>(apiRoutes.consultation, payload);
}
