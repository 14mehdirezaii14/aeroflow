/**
 * AeroFlow — Generic API contract types
 * Used by the Axios client and TanStack Query hooks.
 */

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiErrorShape {
  statusCode: number;
  message: string;
  details?: Record<string, string[]>;
}
