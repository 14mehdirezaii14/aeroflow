'use client';

import { useState } from 'react';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatCompactCurrency, formatCurrency, formatPersianNumber } from '@/lib/utils';
import type { Product } from '@/types/fan.types';

interface PurchasePanelProps {
  product: Product;
}

/**
 * Purchase controls:
 * - Desktop: quantity stepper + "add to cart" row that wraps cleanly
 *   (`flex-col sm:flex-row gap-3`).
 * - Mobile: a sticky bottom action bar (`md:hidden`) with the live total
 *   and a full-width, thumb-friendly CTA.
 */
export function PurchasePanel({ product }: PurchasePanelProps) {
  const [quantity, setQuantity] = useState(1);

  const isOutOfStock = product.stock <= 0;
  const maxQty = Math.max(product.stock, 1);
  const total = product.price * quantity;

  const decrement = () => setQuantity((q) => Math.max(q - 1, 1));
  const increment = () => setQuantity((q) => Math.min(q + 1, maxQty));

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    toast.success(`${formatPersianNumber(quantity)} × ${product.title} به سبد خرید افزوده شد.`);
  };

  const stepper = (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" disabled={isOutOfStock} onClick={decrement} aria-label="کاهش تعداد">
        <Minus className="size-4" />
      </Button>
      <span className="w-8 text-center font-bold text-lg">{formatPersianNumber(quantity)}</span>
      <Button variant="outline" size="icon" disabled={isOutOfStock || quantity >= maxQty} onClick={increment} aria-label="افزایش تعداد">
        <Plus className="size-4" />
      </Button>
    </div>
  );

  const addToCartButton = (
    <Button size="lg" disabled={isOutOfStock} onClick={handleAddToCart} className="cta-glow flex-1">
      <ShoppingCart className="size-4" />
      {isOutOfStock ? 'ناموجود' : 'افزودن به سبد خرید'}
    </Button>
  );

  return (
    <>
      {/* Desktop / tablet purchase card */}
      <Card className="mt-8">
        <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {product.oldPrice && (
              <p className="text-sm text-muted-foreground line-through">
                {formatCurrency(product.oldPrice)}
              </p>
            )}
            <p className="text-3xl font-black text-primary">{formatCompactCurrency(product.price)}</p>
          </div>

          <div className="flex flex-col flex-wrap items-stretch gap-3 sm:flex-row sm:items-center">
            {stepper}
            {addToCartButton}
          </div>
        </CardContent>
      </Card>

      {/* Mobile sticky bottom action bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 p-3 shadow-lg backdrop-blur md:hidden">
        <div className="flex items-center gap-3">
          <div className="shrink-0">
            {product.oldPrice && (
              <p className="text-[11px] text-muted-foreground line-through">
                {formatCurrency(product.oldPrice)}
              </p>
            )}
            <p className="text-lg font-black leading-tight text-primary">
              {formatCompactCurrency(total)}
            </p>
          </div>
          {addToCartButton}
        </div>
      </div>
    </>
  );
}
