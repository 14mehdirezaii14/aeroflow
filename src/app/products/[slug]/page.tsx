import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';
import { fetchProductDetail } from '@/lib/products-service';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SpecBadges } from '@/components/modules/catalog/spec-badges';
import { SpecTable } from '@/components/modules/pdp/spec-table';
import { PdpVisualizations } from '@/components/modules/pdp/pdp-interactive';
import { PdpImageGallery } from '@/components/modules/pdp/pdp-image-gallery';
import { PurchasePanel } from '@/components/modules/pdp/purchase-panel';
import { formatPersianNumber, categoryLabels } from '@/lib/utils';

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
    <div className="container pt-8 pb-24 md:pb-8">
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

      {/* Mobile-first grid: stacks on <md, side-by-side from md up */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Gallery (constrained wrapper — no viewport blowout) */}
        <PdpImageGallery title={product.title} images={product.images} category={product.category} />

        {/* Summary / purchase column */}
        <div>
          <div className="flex items-center gap-2">
            <Badge variant={product.bestSeller ? 'success' : 'secondary'}>
              {product.bestSeller ? 'پرفروش' : categoryLabels[product.category]}
            </Badge>
            {isOutOfStock && <Badge variant="destructive">ناموجود</Badge>}
          </div>

          <h1 className="mt-4 text-2xl font-bold leading-snug sm:text-3xl">{product.title}</h1>

          <div className="mt-3 flex items-center gap-2 text-sm">
            <span className="text-amber-500">★ {formatPersianNumber(product.rating)}</span>
            <span className="text-muted-foreground">
              ({formatPersianNumber(product.reviewsCount)} دیدگاه)
            </span>
            <span className="text-muted-foreground">— {product.brand}</span>
          </div>

          <p className="mt-5 text-sm leading-8 text-muted-foreground">{product.description}</p>

          <SpecBadges specs={product.specs} className="mt-5" />

          {/* Interactive purchase panel (desktop row + mobile sticky bar) */}
          <PurchasePanel product={product} />

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
