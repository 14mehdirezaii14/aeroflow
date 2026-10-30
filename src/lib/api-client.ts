import axios, {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios';
import type { ApiResponse } from '@/types/api.types';
import type { FilterState } from '@/types/fan.types';

/**
 * Strongly-typed API client ready to plug into a NestJS REST backend.
 * - Injects the auth Bearer token from localStorage (client side).
 * - Normalizes errors into human-readable Persian messages.
 * - Exposes typed helpers so call sites never touch the axios instance.
 */
export const httpClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

httpClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== 'undefined') {
    const tokenKey = process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY ?? 'aeroflow_token';
    const token = window.localStorage.getItem(tokenKey);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiResponse<unknown>>) => {
    if (axios.isCancel(error)) {
      return Promise.reject(new Error('canceled'));
    }
    const serverMessage = error.response?.data?.message;
    const fallback =
      error.code === 'ECONNABORTED'
        ? 'پاسخ سرور به تأخیر افتاد؛ دوباره تلاش کنید.'
        : error.response?.status === 404
          ? 'مورد درخواستی یافت نشد.'
          : 'خطا در ارتباط با سرور رخ داد.';
    return Promise.reject(new Error(serverMessage ?? fallback));
  },
);

/** Unwrap the `data` field of an ApiResponse. */
async function unwrap<T>(promise: Promise<{ data: ApiResponse<T> }>): Promise<T> {
  const { data } = await promise;
  return data.data;
}

export const apiGet = <T>(url: string, params?: Record<string, unknown>): Promise<T> =>
  unwrap(httpClient.get<ApiResponse<T>>(url, { params }));

export const apiPost = <T>(url: string, body: unknown): Promise<T> =>
  unwrap(httpClient.post<ApiResponse<T>>(url, body));

export const apiPatch = <T>(url: string, body: unknown): Promise<T> =>
  unwrap(httpClient.patch<ApiResponse<T>>(url, body));

export const apiDelete = async (url: string): Promise<void> => {
  await httpClient.delete<ApiResponse<null>>(url);
};

/** Central route registry — source of truth for endpoint paths. */
export const apiRoutes = {
  products: '/products',
  productBySlug: (slug: string) => `/products/${slug}`,
  search: '/products/search',
  consultation: '/consultations',
  orders: '/orders',
} as const;

/** Convert a FilterState into flat query params for the REST API. */
export function filtersToQuery(filters: FilterState): Record<string, unknown> {
  return {
    search: filters.search || undefined,
    categories: filters.categories.length ? filters.categories.join(',') : undefined,
    cfmMin: filters.cfmRange[0],
    cfmMax: filters.cfmRange[1],
    noiseMin: filters.noiseRange[0],
    noiseMax: filters.noiseRange[1],
    staticPressureMin: filters.staticPressureMin,
    dimensionMax: filters.dimensionMax,
    voltages: filters.voltages.length ? filters.voltages.join(',') : undefined,
    bearings: filters.bearings.length ? filters.bearings.join(',') : undefined,
    sortBy: filters.sortBy,
  };
}
