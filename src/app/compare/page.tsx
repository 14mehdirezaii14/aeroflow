'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Trash2, X } from 'lucide-react';
import { useProductDetail } from '@/hooks/useFansQuery';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCompactCurrency, formatPersianNumber } from '@/lib/utils';
import type { Product } from '@/types/fan.types';

const MAX_COMPARE = 4;

interface CompareRow {
  label: string;
  get: (p: Product) => string;
}

const ROWS: CompareRow[] = [
  { label: 'دسته‌بندی', get: (p) => p.category },
  { label: 'برند', get: (p) => p.brand },
  { label: 'جریان هوا', get: (p) => `${formatPersianNumber(p.specs.airflowCfm)} CFM` },
  { label: 'جریان هوا (m³/h)', get: (p) => `${formatPersianNumber(p.specs.airflowM3h)} m³/h` },
  { label: 'فشار استاتیک', get: (p) => `${formatPersianNumber(p.specs.staticPressureMmH2O)} mmH₂O` },
  { label: 'سطح صدا', get: (p) => `${formatPersianNumber(p.specs.noiseDb)} dB` },
  { label: 'سرعت', get: (p) => `${formatPersianNumber(p.specs.rpm)} RPM` },
  { label: 'توان', get: (p) => `${formatPersianNumber(p.specs.wattage)} وات` },
  { label: 'ابعاد', get: (p) => `${formatPersianNumber(p.specs.dimensionMm)} mm` },
  { label: 'ولتاژ', get: (p) => p.specs.voltage },
  { label: 'بلبرینگ', get: (p) => (p.specs.bearing === 'FDB' ? 'FDB' : 'Dual Ball') },
  { label: 'MTBF', get: (p) => formatPersianNumber(p.specs.mtbfHours.toLocaleString('en-US')) },
  { label: 'قیمت', get: (p) => formatCompactCurrency(p.price) },
];

/** One comparison column — its own component so hooks are predictable. */
function CompareColumn({ slug, onRemove }: { slug: string; onRemove: (s: string) => void }) {
  const { data, isLoading } = useProductDetail(slug);

  return (
    <th className="min-w-[200px] p-4 text-right align-top">
      {isLoading ? (
        <Skeleton className="h-20 w-full" />
      ) : data ? (
        <div>
          <div className="mb-2 flex h-24 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-cyan-500/10">
            <span className="text-2xl font-black text-primary/40">فن</span>
          </div>
          <p className="font-semibold leading-6">{data.title}</p>
          <button
            type="button"
            onClick={() => onRemove(slug)}
            className="mt-3 inline-flex items-center gap-1 text-xs text-destructive hover:underline"
          >
            <Trash2 className="size-3.5" />
            حذف از مقایسه
          </button>
        </div>
      ) : (
        <p className="text-muted-foreground">خطا در بارگذاری</p>
      )}
    </th>
  );
}

function CompareView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    const list = (searchParams.get('slugs') ?? '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    setSlugs(list.slice(0, MAX_COMPARE));
  }, [searchParams]);

  const removeSlug = (slug: string) => {
    const next = slugs.filter((s) => s !== slug);
    router.replace(next.length ? `/compare?slugs=${next.join(',')}` : '/compare', {
      scroll: false,
    });
  };

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">مقایسه محصولات</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          تا {formatPersianNumber(MAX_COMPARE)} محصول را کنار هم مقایسه کنید.
        </p>
      </div>

      {slugs.length === 0 ? (
        <Card className="p-16 text-center">
          <p className="text-lg font-semibold">محصولی برای مقایسه انتخاب نشده است</p>
          <p className="mt-2 text-sm text-muted-foreground">
            از صفحه محصولات، گزینه «مقایسه» را روی محصولات انتخاب کنید.
          </p>
          <Button asChild className="mt-6">
            <Link href="/products">رفتن به کاتالوگ محصولات</Link>
          </Button>
        </Card>
      ) : (
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="p-4 text-right text-xs font-medium text-muted-foreground">
                  مشخصات
                </th>
                {slugs.map((slug) => (
                  <CompareColumn key={slug} slug={slug} onRemove={removeSlug} />
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label} className="border-b last:border-b-0 odd:bg-muted/20">
                  <th scope="row" className="p-4 text-right font-normal text-muted-foreground">
                    {row.label}
                  </th>
                  {slugs.map((slug) => (
                    <SpecCell key={slug} slug={slug} row={row} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {slugs.length > 0 && (
        <div className="mt-6 flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/products">
              <X className="size-4" />
              انتخاب محصول دیگر
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}

function SpecCell({ slug, row }: { slug: string; row: CompareRow }) {
  const { data, isLoading } = useProductDetail(slug);
  return (
    <td className="p-4 font-medium">
      {isLoading ? (
        <Skeleton className="h-4 w-3/4" />
      ) : data ? (
        row.get(data)
      ) : (
        '—'
      )}
    </td>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="container py-10">در حال بارگذاری…</div>}>
      <CompareView />
    </Suspense>
  );
}
