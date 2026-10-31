import type { Product, FilterState } from '@/types/fan.types';
import type { PaginatedResponse } from '@/types/api.types';

/**
 * In-memory typed data store used when `NEXT_PUBLIC_API_URL` is unset.
 * Mirrors the exact shapes returned by the NestJS REST backend so the
 * React Query layer is identical regardless of data source.
 */

const now = '2025-11-01T08:00:00.000Z';

export const mockFans: Product[] = [
  {
    id: 'fan-001',
    slug: 'industrial-centrifugal-220mm',
    title: 'فن صنعتی گریز از مرکز ۲۲۰ میلیمتری',
    category: 'industrial',
    brand: 'AeroFlow',
    description:
      'فن سانتریفیوژ با موتور ۳ فاز و بلبرینگ دوبل برای تهویه صنعتی، مناسب فشار استاتیک بالا.',
    price: 4_850_000,
    oldPrice: 5_400_000,
    stock: 12,
    rating: 4.8,
    reviewsCount: 132,
    images: ['/images/fans/industrial.svg', '/images/fans/pack.svg'],
    specs: {
      airflowCfm: 620,
      airflowM3h: 1053,
      staticPressureMmH2O: 38,
      noiseDb: 58,
      rpm: 2800,
      wattage: 220,
      mtbfHours: 70000,
      dimensionMm: 220,
      voltage: '220V',
      bearing: 'DualBall',
    },
    featured: true,
    bestSeller: true,
    createdAt: now,
  },
  {
    id: 'fan-002',
    slug: 'server-rack-120mm-fdb',
    title: 'فن سرور ۱۲۰ میلیمتری با بلبرینگ FDB',
    category: 'pc',
    brand: 'AeroFlow',
    description:
      'برای رک سرور طراحی شده، بی‌صدا و با MTBF بالا؛ مناسب اتاق سرور با تراکم بالا.',
    price: 980_000,
    stock: 240,
    rating: 4.9,
    reviewsCount: 410,
    images: ['/images/fans/pc.svg', '/images/fans/pack.svg'],
    specs: {
      airflowCfm: 185,
      airflowM3h: 314,
      staticPressureMmH2O: 8.5,
      noiseDb: 32,
      rpm: 3200,
      wattage: 18,
      mtbfHours: 120000,
      dimensionMm: 120,
      voltage: '12V',
      bearing: 'FDB',
    },
    featured: true,
    bestSeller: true,
    createdAt: now,
  },
  {
    id: 'fan-003',
    slug: 'residential-ceiling-200mm',
    title: 'فن سقفی مسکونی ۲۰۰ میلیمتری',
    category: 'residential',
    brand: 'AeroFlow',
    description:
      'جریان هوای بالا با صدای بسیار کم؛ مناسب تهویه سالن و پذیرایی منازل مسکونی.',
    price: 1_240_000,
    stock: 86,
    rating: 4.6,
    reviewsCount: 98,
    images: ['/images/fans/residential.svg', '/images/fans/pack.svg'],
    specs: {
      airflowCfm: 340,
      airflowM3h: 578,
      staticPressureMmH2O: 6,
      noiseDb: 28,
      rpm: 1400,
      wattage: 45,
      mtbfHours: 45000,
      dimensionMm: 200,
      voltage: '220V',
      bearing: 'FDB',
    },
    featured: true,
    createdAt: now,
  },
  {
    id: 'fan-004',
    slug: 'pc-case-140mm-argb',
    title: 'فن کیس ۱۴۰ میلیمتری ARGB',
    category: 'pc',
    brand: 'AeroFlow',
    description: 'فن کیس با نورپردازی ARGB و دمپینگ صوتی، برای خنک‌سازی بازیسازها.',
    price: 720_000,
    stock: 0,
    rating: 4.7,
    reviewsCount: 55,
    images: ['/images/fans/pc.svg', '/images/fans/pack.svg'],
    specs: {
      airflowCfm: 110,
      airflowM3h: 187,
      staticPressureMmH2O: 3.2,
      noiseDb: 24,
      rpm: 1800,
      wattage: 6,
      mtbfHours: 50000,
      dimensionMm: 140,
      voltage: '12V',
      bearing: 'FDB',
    },
    createdAt: now,
  },
  {
    id: 'fan-005',
    slug: 'mining-80mm-dualball',
    title: 'فن استخراج ۸۰ میلیمتری Dual Ball',
    category: 'pc',
    brand: 'AeroFlow',
    description:
      'بلبرینگ دوبل مقاوم به حرارت؛ مناسب ریگ‌های استخراج و بار کاری ۲۴ ساعته.',
    price: 540_000,
    stock: 310,
    rating: 4.5,
    reviewsCount: 201,
    images: ['/images/fans/pc.svg', '/images/fans/pack.svg'],
    specs: {
      airflowCfm: 72,
      airflowM3h: 122,
      staticPressureMmH2O: 4.1,
      noiseDb: 38,
      rpm: 4200,
      wattage: 5,
      mtbfHours: 85000,
      dimensionMm: 80,
      voltage: '24V',
      bearing: 'DualBall',
    },
    createdAt: now,
  },
  {
    id: 'fan-006',
    slug: 'industrial-inline-500mm',
    title: 'فن صنعتی خطی ۵۰۰ میلیمتری',
    category: 'industrial',
    brand: 'AeroFlow',
    description:
      'فن خطی با بدنه گالوانیزه و موتور صنعتی؛ مناسب تهویه سالن‌های تولیدی.',
    price: 12_900_000,
    stock: 7,
    rating: 4.9,
    reviewsCount: 64,
    images: ['/images/fans/industrial.svg', '/images/fans/pack.svg'],
    specs: {
      airflowCfm: 790,
      airflowM3h: 1342,
      staticPressureMmH2O: 42,
      noiseDb: 62,
      rpm: 1450,
      wattage: 550,
      mtbfHours: 90000,
      dimensionMm: 500,
      voltage: '220V',
      bearing: 'DualBall',
    },
    featured: true,
    createdAt: now,
  },
  {
    id: 'fan-007',
    slug: 'kitchen-blower-160mm',
    title: 'دمنده آشپزخانه تجاری ۱۶۰ میلیمتری',
    category: 'residential',
    brand: 'AeroFlow',
    description:
      'دمنده قدرتمند برای هود صنعتی و تهویه آشپزخانه‌های تجاری با فشار استاتیک بالا.',
    price: 2_150_000,
    stock: 45,
    rating: 4.4,
    reviewsCount: 37,
    images: ['/images/fans/residential.svg', '/images/fans/pack.svg'],
    specs: {
      airflowCfm: 260,
      airflowM3h: 442,
      staticPressureMmH2O: 22,
      noiseDb: 52,
      rpm: 3000,
      wattage: 120,
      mtbfHours: 30000,
      dimensionMm: 160,
      voltage: '220V',
      bearing: 'DualBall',
    },
    createdAt: now,
  },
  {
    id: 'fan-008',
    slug: 'quiet-92mm-office',
    title: 'فن بی‌صدا ۹۲ میلیمتری اداری',
    category: 'residential',
    brand: 'AeroFlow',
    description: 'فن کم‌صدا با بلبرینگ FDB؛ مناسب تهویه موضعی محیط‌های اداری.',
    price: 460_000,
    stock: 190,
    rating: 4.3,
    reviewsCount: 82,
    images: ['/images/fans/pc.svg', '/images/fans/pack.svg'],
    specs: {
      airflowCfm: 48,
      airflowM3h: 82,
      staticPressureMmH2O: 1.8,
      noiseDb: 18,
      rpm: 1500,
      wattage: 3,
      mtbfHours: 60000,
      dimensionMm: 92,
      voltage: '12V',
      bearing: 'FDB',
    },
    createdAt: now,
  },
  {
    id: 'fan-100',
    slug: 'noctua-nf-a12x25-pwm',
    title: 'فن Noctua مدل NF-A12x25 PWM',
    category: 'pc',
    brand: 'Noctua',
    description:
      'فن ۱۲۰ میلیمتری پریمیوم با چارچوب AAO و یاتاقان SSO2؛ برنده جوایز چندگانه برای بهترین عملکرد در هر دسیبل. ایده‌آل برای رادیاتور، کیس و رک سرور.',
    price: 3_250_000,
    oldPrice: 3_600_000,
    stock: 48,
    rating: 4.9,
    reviewsCount: 1340,
    images: ['/images/fans/pc.svg', '/images/fans/pack.svg'],
    specs: {
      airflowCfm: 60.09,
      airflowM3h: 102.1,
      staticPressureMmH2O: 2.34,
      noiseDb: 22.6,
      rpm: 2000,
      wattage: 1.68,
      mtbfHours: 150000,
      dimensionMm: 120,
      voltage: '12V',
      bearing: 'SSO2',
    },
    featured: true,
    bestSeller: true,
    createdAt: now,
  },
  {
    id: 'fan-101',
    slug: 'be-quiet-silent-wings-4',
    title: 'فن Be Quiet! مدل Silent Wings 4',
    category: 'pc',
    brand: 'Be Quiet!',
    description:
      'فن بی‌صدا با یاتاقان دینامیک سیال (FDB) و پره‌های ۷۹ تایی؛ انتخاب حرفه‌ای برای سیستم‌های بی‌صدا با MTtf ۳۰۰٬۰۰۰ ساعته.',
    price: 1_950_000,
    stock: 120,
    rating: 4.8,
    reviewsCount: 685,
    images: ['/images/fans/pc.svg', '/images/fans/pack.svg'],
    specs: {
      airflowCfm: 55.3,
      airflowM3h: 94,
      staticPressureMmH2O: 2.6,
      noiseDb: 18.9,
      rpm: 1900,
      wattage: 1.5,
      mtbfHours: 300000,
      dimensionMm: 120,
      voltage: '12V',
      bearing: 'FDB',
    },
    featured: true,
    createdAt: now,
  },
  {
    id: 'fan-102',
    slug: 'damandeh-industrial-centrifugal-1400',
    title: 'فن صنعتی گریز از مرکز دامنده ۱۴۰۰ دور',
    category: 'industrial',
    brand: 'Damandeh',
    description:
      'فن سانتریفیوژ با پروانه فولادی و بلبرینگ دوبل؛ مناسب تهویه کارگاه‌های صنعتی، سوله و سیستم‌های اگزاست با فشار استاتیک بالا.',
    price: 6_850_000,
    oldPrice: 7_400_000,
    stock: 14,
    rating: 4.7,
    reviewsCount: 92,
    images: ['/images/fans/industrial.svg', '/images/fans/pack.svg'],
    specs: {
      airflowCfm: 620,
      airflowM3h: 1053,
      staticPressureMmH2O: 38,
      noiseDb: 58,
      rpm: 1400,
      wattage: 220,
      mtbfHours: 90000,
      dimensionMm: 350,
      voltage: '220V',
      bearing: 'DualBall',
    },
    featured: true,
    createdAt: now,
  },
];

function clamp(v: number, min: number, max: number): number {
  return Math.min(Math.max(v, min), max);
}

function sortProducts(items: Product[], sortBy: FilterState['sortBy']): Product[] {
  const sorted = [...items];
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'airflow-desc':
      return sorted.sort((a, b) => b.specs.airflowCfm - a.specs.airflowCfm);
    case 'noise-asc':
      return sorted.sort((a, b) => a.specs.noiseDb - b.specs.noiseDb);
    default:
      return sorted;
  }
}

/** Apply the full facet filter set to the mock store. */
export function filterMockFans(filters: FilterState, page = 1, pageSize = 12): PaginatedResponse<Product> {
  const cfmMin = filters.cfmRange[0] ?? 50;
  const noiseMax = filters.noiseRange[1] ?? 60;
  const query = (filters.search ?? '').trim().toLowerCase();

  const filtered = mockFans.filter((p) => {
    const matchesSearch =
      query.length === 0 ||
      p.title.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query);
    const matchesCategory = filters.categories.length === 0 || filters.categories.includes(p.category);
    const matchesCfm = p.specs.airflowCfm >= cfmMin && p.specs.airflowCfm <= (filters.cfmRange[1] ?? 800);
    const matchesNoise = p.specs.noiseDb >= (filters.noiseRange[0] ?? 15) && p.specs.noiseDb <= noiseMax;
    const matchesPressure = p.specs.staticPressureMmH2O >= filters.staticPressureMin;
    const matchesDimension = p.specs.dimensionMm <= filters.dimensionMax;
    const matchesVoltage = filters.voltages.length === 0 || filters.voltages.includes(p.specs.voltage);
    const matchesBearing = filters.bearings.length === 0 || filters.bearings.includes(p.specs.bearing);
    return (
      matchesSearch &&
      matchesCategory &&
      matchesCfm &&
      matchesNoise &&
      matchesPressure &&
      matchesDimension &&
      matchesVoltage &&
      matchesBearing
    );
  });

  const sorted = sortProducts(filtered, filters.sortBy);
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = clamp(page, 1, totalPages);
  const start = (safePage - 1) * pageSize;
  return {
    items: sorted.slice(start, start + pageSize),
    total: sorted.length,
    page: safePage,
    pageSize,
    totalPages,
  };
}

/** Search helper used by the global navbar search (top 8 hits). */
export function searchMockFans(query: string, limit = 8): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return mockFans
    .filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    )
    .slice(0, limit);
}

export function getMockProductBySlug(slug: string): Product | undefined {
  return mockFans.find((p) => p.slug === slug);
}

export function getMockBestSellers(limit = 4): Product[] {
  return mockFans
    .filter((p) => p.stock > 0)
    .sort((a, b) => Number(b.bestSeller ?? false) - Number(a.bestSeller ?? false) || b.reviewsCount - a.reviewsCount)
    .slice(0, limit);
}
