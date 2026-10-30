import Link from 'next/link';
import { Fan } from 'lucide-react';
import { formatPersianNumber } from '@/lib/utils';

const COLUMNS = [
  {
    title: 'محصولات',
    links: [
      { label: 'فن‌های صنعتی', href: '/products?category=industrial' },
      { label: 'فن‌های کامپیوتری', href: '/products?category=pc' },
      { label: 'تهویه مسکونی', href: '/products?category=residential' },
      { label: 'پرفروش‌ترین‌ها', href: '/products?sortBy=rating' },
    ],
  },
  {
    title: 'خدمات',
    links: [
      { label: 'ماشین‌حساب جریان هوا', href: '/calculator' },
      { label: 'مقایسه محصولات', href: '/compare' },
      { label: 'مشاوره مهندسی', href: '/consultation' },
    ],
  },
  {
    title: 'شرکت',
    links: [
      { label: 'درباره ما', href: '/about' },
      { label: 'ارسال و تحویل', href: '/shipping' },
      { label: 'شرایط بازگشت کالا', href: '/returns' },
      { label: 'تماس با ما', href: '/contact' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container grid gap-10 py-12 md:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2 text-lg font-bold">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Fan className="size-5" />
            </span>
            ایروفلُ
          </Link>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            پلتفرم تخصصی تهویه صنعتی، کامپیوتری و مسکونی با گارانتی اصالت کالا و پشتیبانی فنی مهندسی.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t">
        <div className="container flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>© {formatPersianNumber(1405)} ایروفلُ — تمامی حقوق محفوظ است.</p>
          <p>طراحی‌شده با استانداردهای RTL و بهینه‌سازی عملکرد</p>
        </div>
      </div>
    </footer>
  );
}
