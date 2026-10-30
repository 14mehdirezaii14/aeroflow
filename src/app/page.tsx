import Link from 'next/link';
import { ArrowLeft, BadgeCheck, Headset, ShieldCheck, Truck } from 'lucide-react';
import { Hero } from '@/components/common/hero';
import { fetchBestSellers } from '@/lib/products-service';
import { ProductCard } from '@/components/modules/catalog/product-card';
import { Button } from '@/components/ui/button';

const TRUST_BADGES = [
  { icon: ShieldCheck, title: 'ضمانت اصالت کالا', subtitle: 'تضمین بازگشت تا ۷ روز' },
  { icon: Truck, title: 'ارسال سریع', subtitle: 'تحویل از ۲۴ ساعت بعد' },
  { icon: Headset, title: 'پشتیبانی فنی', subtitle: 'مشاوره مهندسی رایگان' },
  { icon: BadgeCheck, title: 'فاکتور رسمی', subtitle: 'مناسب سازمان‌ها و پروژه‌ها' },
];

export default async function HomePage() {
  const bestSellers = await fetchBestSellers(4);

  return (
    <>
      {/* Animated hero (copy + spinning fan visual) */}
      <Hero />

      {/* Trust badges */}
      <section className="border-b">
        <div className="container grid grid-cols-2 gap-4 py-8 lg:grid-cols-4">
          {TRUST_BADGES.map(({ icon: Icon, title, subtitle }) => (
            <div key={title} className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-xs text-muted-foreground">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Best sellers */}
      <section className="container py-14">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">پرفروش‌ترین‌ها</h2>
            <p className="mt-1 text-sm text-muted-foreground">انتخاب خریداران حرفه‌ای</p>
          </div>
          <Button asChild variant="ghost">
            <Link href="/products">
              مشاهده همه
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
