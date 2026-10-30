'use client';

import Link from 'next/link';
import { Fan, Headset, ShoppingCart, User } from 'lucide-react';
import { SearchBar } from '@/components/common/search-bar';
import { MegaMenu } from '@/components/common/mega-menu';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center gap-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Fan className="size-5" />
          </span>
          ایروفلُ
        </Link>

        <SearchBar className="hidden max-w-md flex-1 md:block" />

        <div className="ms-auto flex items-center gap-1">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href="/consultation">
              <Headset className="size-4" />
              مشاوره مهندسی
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon" aria-label="حساب کاربری">
            <Link href="/consultation">
              <User className="size-5" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon" aria-label="سبد خرید">
            <Link href="/checkout">
              <ShoppingCart className="size-5" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="container pb-2 md:hidden">
        <SearchBar />
      </div>

      <div className="container hidden border-t lg:block">
        <div className="flex h-11 items-center">
          <MegaMenu />
        </div>
      </div>
    </header>
  );
}
