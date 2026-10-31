import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind classes with conflict resolution. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Persian digit map. */
const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'] as const;

/** Convert Latin digits in a string/number to Persian digits. */
export function formatPersianNumber(value: number | string): string {
  return String(value).replace(/\d/g, (d) => PERSIAN_DIGITS[Number(d)] ?? d);
}

/** Format a Toman amount with Persian digits and thousands separators. */
export function formatCurrency(value: number): string {
  const grouped = Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '،');
  return `${formatPersianNumber(grouped)} تومان`;
}

/** Compact currency (e.g. ۱٫۲ میلیون تومان) for hero/cards. */
export function formatCompactCurrency(value: number): string {
  if (value >= 1_000_000) {
    const inMillion = value / 1_000_000;
    return `${formatPersianNumber(inMillion.toFixed(inMillion % 1 === 0 ? 0 : 1))} میلیون تومان`;
  }
  return formatCurrency(value);
}

/** Convert CFM to m³/h. */
export function cfmToM3h(cfm: number): number {
  return Math.round(cfm * 1.699);
}

/** Map product category to a Persian label. */
export const categoryLabels: Record<string, string> = {
  industrial: 'صنعتی',
  pc: 'کامپیوتری',
  residential: 'مسکونی',
};

/** Map bearing type to Persian label. */
export const bearingLabels: Record<string, string> = {
  FDB: 'بلبرینگ دینامیک سیال (FDB)',
  DualBall: 'بلبرینگ دوبل (Dual Ball)',
  SSO2: 'یاتاقان خودپایدارکننده روغنی (SSO2)',
};

export function bearingLabel(bearing: string): string {
  return bearingLabels[bearing] ?? bearing;
}
