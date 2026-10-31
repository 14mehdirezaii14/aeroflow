import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { SpecBadges } from '@/components/modules/catalog/spec-badges';
import { formatCompactCurrency, formatPersianNumber, categoryLabels } from '@/lib/utils';
import type { Product } from '@/types/fan.types';

interface ProductCardProps {
  product: Product;
  onAddToCompare?: (productId: string) => void;
  compact?: boolean;
}

export function ProductCard({ product, onAddToCompare, compact = false }: ProductCardProps) {
  const isOutOfStock = product.stock <= 0;

  return (
    <Card className="group relative flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
          {product.images[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.images[0]}
              alt={product.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <span className="text-6xl font-black text-slate-300 dark:text-slate-700">
              {categoryLabels[product.category] ?? 'فن'}
            </span>
          )}
        </div>
      </Link>

      <CardContent className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <Badge variant={product.bestSeller ? 'success' : 'secondary'} className="text-[10px]">
            {product.bestSeller ? 'پرفروش' : categoryLabels[product.category]}
          </Badge>
          <span className="flex items-center gap-1 text-xs text-amber-500">
            <span aria-hidden>★</span>
            {formatPersianNumber(product.rating)}
            <span className="text-muted-foreground">
              ({formatPersianNumber(product.reviewsCount)})
            </span>
          </span>
        </div>

        <Link href={`/products/${product.slug}`}>
          <h3 className="line-clamp-2 text-sm font-semibold leading-6 transition-colors group-hover:text-primary">
            {product.title}
          </h3>
        </Link>

        <SpecBadges specs={product.specs} />

        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <div>
            {product.oldPrice && (
              <p className="text-xs text-muted-foreground line-through">
                {formatCompactCurrency(product.oldPrice)}
              </p>
            )}
            <p className="text-sm font-bold text-primary">{formatCompactCurrency(product.price)}</p>
          </div>

          {!compact && onAddToCompare && (
            <button
              type="button"
              onClick={() => onAddToCompare(product.id)}
              className="rounded-md border px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              مقایسه
            </button>
          )}
        </div>

        {isOutOfStock && (
          <Badge variant="destructive" className="justify-center">
            ناموجود
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}
