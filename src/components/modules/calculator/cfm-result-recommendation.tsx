'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { BadgeCheck, Wind } from 'lucide-react';
import type { CalculatedResult } from '@/components/modules/calculator/room-dimension-form';
import { mockFans } from '@/lib/mock-data';
import { formatCurrency, formatPersianNumber } from '@/lib/utils';
import type { Product } from '@/types/fan.types';

interface CFMResultRecommendationProps {
  result: CalculatedResult;
}

/**
 * Given the required CFM from the calculator, recommend the best-matching
 * in-stock fans. In production this would be a backend endpoint; here the
 * typed mock store is queried for the same shape.
 */
export function CFMResultRecommendation({ result }: CFMResultRecommendationProps) {
  const { requiredCfm, requiredM3h, volumeM3 } = result;

  const recommendations = useMemo<Product[]>(() => {
    return mockFans
      .filter((p) => p.stock > 0 && p.specs.airflowCfm >= requiredCfm)
      .sort((a, b) => Math.abs(a.specs.airflowCfm - requiredCfm) - Math.abs(b.specs.airflowCfm - requiredCfm))
      .slice(0, 3);
  }, [requiredCfm]);

  const allMatch = mockFans.filter((p) => p.stock > 0 && p.specs.airflowCfm >= requiredCfm).length;

  return (
    <div className="mt-8 space-y-5 rounded-xl border border-primary/20 bg-primary/5 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-base font-bold">نتیجه محاسبه</h3>
        <span className="rounded-md bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">
          {formatPersianNumber(Math.round(requiredCfm))} CFM
        </span>
      </div>

      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg bg-background p-3">
          <dt className="text-xs text-muted-foreground">مترمکعب بر ساعت</dt>
          <dd className="mt-1 text-lg font-bold">{formatPersianNumber(Math.round(requiredM3h))} m³/h</dd>
        </div>
        <div className="rounded-lg bg-background p-3">
          <dt className="text-xs text-muted-foreground">حجم فضا</dt>
          <dd className="mt-1 text-lg font-bold">{formatPersianNumber(volumeM3.toFixed(1))} m³</dd>
        </div>
        <div className="rounded-lg bg-background p-3">
          <dt className="text-xs text-muted-foreground">تعداد فن‌های پیشنهادی</dt>
          <dd className="mt-1 text-lg font-bold">{formatPersianNumber(allMatch)}</dd>
        </div>
      </dl>

      {recommendations.length > 0 ? (
        <div className="space-y-3">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <BadgeCheck className="size-4 text-primary" />
            بهترین گزینه‌ها متناسب با نیاز شما
          </p>
          <ul className="space-y-2">
            {recommendations.map((product) => (
              <li key={product.id}>
                <Link
                  href={`/products/${product.slug}`}
                  className="flex items-center justify-between gap-3 rounded-lg border bg-background px-4 py-3 transition-colors hover:border-primary/40"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                      <Wind className="size-4" />
                    </span>
                    <div>
                      <p className="text-sm font-medium">{product.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatPersianNumber(product.specs.airflowCfm)} CFM · {formatPersianNumber(product.specs.noiseDb)} dB
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-primary">{formatCurrency(product.price)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="rounded-lg bg-background p-4 text-sm text-muted-foreground">
          فن‌ای با ظرفیت معادل {formatPersianNumber(Math.round(requiredCfm))} CFM موجود نیست. می‌توانید از دو فن کوچک‌تر موازی استفاده کنید.
        </p>
      )}
    </div>
  );
}
