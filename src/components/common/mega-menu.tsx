'use client';

import Link from 'next/link';
import { ChevronDown, Fan, ServerCog, Home } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface MenuEntry {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  items: { label: string; href: string }[];
}

const MENU: MenuEntry[] = [
  {
    label: 'فن‌های صنعتی',
    href: '/products?category=industrial',
    icon: Fan,
    items: [
      { label: 'سانتریفیوژ صنعتی', href: '/products?category=industrial&sortBy=airflow-desc' },
      { label: 'فن خطی (Inline)', href: '/products?category=industrial' },
      { label: 'دمنده فشار قوی', href: '/products?category=industrial' },
      { label: 'فن سقفی کارگاهی', href: '/products?category=industrial' },
    ],
  },
  {
    label: 'فن‌های کامپیوتری',
    href: '/products?category=pc',
    icon: ServerCog,
    items: [
      { label: 'فن کیس ۸۰–۱۴۰ میلیمتری', href: '/products?category=pc' },
      { label: 'فن رک سرور', href: '/products?category=pc&sortBy=airflow-desc' },
      { label: 'فن استخراج (Mining)', href: '/products?category=pc' },
      { label: 'فن بی‌صدا HTPC', href: '/products?category=pc' },
    ],
  },
  {
    label: 'تهویه مسکونی',
    href: '/products?category=residential',
    icon: Home,
    items: [
      { label: 'فن سقفی', href: '/products?category=residential' },
      { label: 'دمنده آشپزخانه', href: '/products?category=residential' },
      { label: 'فن اگزاست حمام', href: '/products?category=residential' },
      { label: 'فن دیواری', href: '/products?category=residential' },
    ],
  },
];

export function MegaMenu() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <nav aria-label="منوی اصلی" className="hidden items-center gap-1 lg:flex">
      {MENU.map((entry, index) => {
        const Icon = entry.icon;
        const isOpen = openIndex === index;
        return (
          <div key={entry.label} className="relative" onMouseEnter={() => setOpenIndex(index)} onMouseLeave={() => setOpenIndex(null)}>
            <Link
              href={entry.href}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground',
                isOpen && 'bg-accent text-foreground',
              )}
            >
              <Icon className="size-4" />
              {entry.label}
              <ChevronDown className={cn('size-3.5 transition-transform', isOpen && 'rotate-180')} />
            </Link>

            {isOpen && (
              <div className="absolute right-0 top-full z-40 mt-1 w-72 rounded-lg border bg-popover p-2 shadow-xl">
                <div className="space-y-0.5">
                  {entry.items.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="mt-2 border-t pt-2">
                  <Link href={entry.href} className="block px-3 py-1 text-xs font-medium text-primary">
                    مشاهده همه ←
                  </Link>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <Link href="/calculator" className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent">
        ماشین‌حساب CFM
      </Link>
      <Link href="/compare" className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent">
        مقایسه محصولات
      </Link>
    </nav>
  );
}
