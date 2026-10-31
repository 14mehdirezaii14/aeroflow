/**
 * AeroFlow — Core domain types
 * Defines the product model, technical fan specs, and catalog filter state.
 * Strictly typed; no `any` anywhere.
 */

export type FanCategory = 'industrial' | 'pc' | 'residential';

export type Voltage = '12V' | '24V' | '220V';

export type BearingType = 'FDB' | 'DualBall' | 'SSO2';

export type SortOption =
  | 'relevance'
  | 'price-asc'
  | 'price-desc'
  | 'rating'
  | 'airflow-desc'
  | 'noise-asc';

export interface FanSpecs {
  /** Airflow in CFM (cubic feet per minute) */
  airflowCfm: number;
  /** Airflow in m³/h */
  airflowM3h: number;
  /** Static pressure, mm H₂O */
  staticPressureMmH2O: number;
  /** Noise level, dB(A) */
  noiseDb: number;
  /** Rotational speed, RPM */
  rpm: number;
  /** Power consumption, watts */
  wattage: number;
  /** Mean time between failures, hours */
  mtbfHours: number;
  /** Frame dimension in millimetres (80mm → 500mm) */
  dimensionMm: number;
  voltage: Voltage;
  bearing: BearingType;
}

export interface Product {
  id: string;
  slug: string;
  /** Persian title */
  title: string;
  category: FanCategory;
  brand: string;
  /** Persian marketing description */
  description: string;
  /** Price in Iranian Toman */
  price: number;
  oldPrice?: number;
  stock: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  specs: FanSpecs;
  featured?: boolean;
  bestSeller?: boolean;
  createdAt: string;
}

export interface FilterState {
  search?: string;
  categories: FanCategory[];
  /** CFM range slider: 50 – 800 */
  cfmRange: [number, number];
  /** Noise slider: 15 – 60 dB */
  noiseRange: [number, number];
  /** Minimum static pressure (mm H₂O) */
  staticPressureMin: number;
  /** Maximum frame dimension (mm) */
  dimensionMax: number;
  voltages: Voltage[];
  bearings: BearingType[];
  sortBy: SortOption;
}

export const DEFAULT_FILTERS: FilterState = {
  categories: [],
  cfmRange: [50, 800],
  noiseRange: [15, 60],
  staticPressureMin: 0,
  dimensionMax: 500,
  voltages: [],
  bearings: [],
  sortBy: 'relevance',
};

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CustomerInfo {
  fullName: string;
  mobile: string;
  email?: string;
  nationalId?: string;
  economicCode?: string;
  address: string;
  postalCode: string;
  city: string;
}
