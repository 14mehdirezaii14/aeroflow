import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check, Minus, Plus, ShoppingCart } from 'lucide-react';
import { fetchProductDetail } from '@/lib/products-service';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SpecBadges } from '@/components/modules/catalog/spec-badges';
import { SpecTable } from '@/components/modules/pdp/spec-table';
import { PdpVisualizations } from '@/components/modules/pdp/pdp-interactive';
import { formatCompactCurrency, formatCurrency, formatPersianNumber, categoryLabels } from '@/lib/utils';

interface PdpPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PdpPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductDetail(slug).catch(() => undefined);
  return {
    title: product?.title ?? 'محصول',
    description: product?.description,
  };
}

export default async function ProductDetailPage({ params }: PdpPageProps) {
  const { slug } = await params;
  const product = await fetchProductDetail(slug).catch(() => undefined);
  if (!product) notFound();

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground" aria-label="مسیر">
        <Link href="/" className="hover:text-foreground">خانه</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-foreground">محصولات</Link>
        <span>/</span>
        <Link href={`/products?category=${product.category}`} className="hover:text-foreground">
          {categoryLabels[product.category]}
        </Link>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image / hero panel */}
        <div className="flex aspect-square items-center justify-center rounded-3xl bg-gradient-to-br from-primary/10 to-cyan-500/10">
          <span className="text-8xl font-black text-primary/30">
            {categoryLabels[product.category]}
          </span>
        </div>

        {/* Summary */}
        <div>
          <div className="flex items-center gap-2">
            <Badge variant={product.bestSeller ? 'success' : 'secondary'}>
              {product.bestSeller ? 'پرفروش' : categoryLabels[product.category]}
            </Badge>
            {isOutOfStock && <Badge variant="destructive">ناموجود</Badge>}
          </div>

          <h1 className="mt-4 text-3xl font-bold leading-snug">{product.title}</h1>

          <div className="mt-3 flex items-center gap-2 text-sm">
            <span className="text-amber-500">★ {formatPersianNumber(product.rating)}</span>
            <span className="text-muted-foreground">
              ({formatPersianNumber(product.reviewsCount)} دیدگاه)
            </span>
            <span className="text-muted-foreground">— {product.brand}</span>
          </div>

          <p className="mt-5 text-sm leading-8 text-muted-foreground">{product.description}</p>

          <SpecBadges specs={product.specs} className="mt-5" />

          <Card className="mt-8">
            <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
              <div>
                {product.oldPrice && (
                  <p className="text-sm text-muted-foreground line-through">
                    {formatCurrency(product.oldPrice)}
                  </p>
                )}
                <p className="text-3xl font-black text-primary">
                  {formatCompactCurrency(product.price)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" disabled={isOutOfStock} aria-label="کاهش تعداد">
                  <Minus className="size-4" />
                </Button>
                <span className="w-8 text-center font-bold">{formatPersianNumber(1)}</span>
                <Button variant="outline" size="icon" disabled={isOutOfStock} aria-label="افزایش تعداد">
                  <Plus className="size-4" />
                </Button>
                <Button size="lg" disabled={isOutOfStock} className="ms-2">
                  <ShoppingCart className="size-4" />
                  {isOutOfStock ? 'ناموجود' : 'افزودن به سبد خرید'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Check className="size-4 text-emerald-500" />
              گارانتی ۱۸ ماهه ایروفلُ
            </li>
            <li className="flex items-center gap-2">
              <Check className="size-4 text-emerald-500" />
              ارسال سریع به سراسر کشور
            </li>
            <li className="flex items-center gap-2">
              <Check className="size-4 text-emerald-500" />
              بازگشت کالا تا ۷ روز
            </li>
          </ul>
        </div>
      </div>

      {/* Lazily-loaded visualizers */}
      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        <PdpVisualizations specs={product.specs} />
      </section>

      {/* Technical specs */}
      <section className="mt-12">
        <h2 className="mb-6 text-xl font-bold">مشخصات فنی</h2>
        <SpecTable product={product} />
      </section>

      <div className="mt-10">
        <Button asChild variant="outline">
          <Link href="/compare?slugs=a,b,c">
            <ArrowLeft className="size-4" />
            مقایسه با سایر محصولات
          </Link>
        </Button>
      </div>
    </div>
  );
}
