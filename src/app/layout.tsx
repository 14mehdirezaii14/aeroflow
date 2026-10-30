import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { QueryProvider } from '@/components/providers/query-provider';
import { Navbar } from '@/components/common/navbar';
import { Footer } from '@/components/common/footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'ایروفلُ | سامانه تهویه صنعتی و خانگی',
    template: '%s | ایروفلُ',
  },
  description:
    'خرید آنلاین فن‌های صنعتی، کامپیوتری و تهویه مسکونی با گارانتی اصالت کالا، محاسبه‌گر CFM و مشاوره مهندسی.',
  keywords: ['فن صنعتی', 'تهویه', 'فن سرور', 'فن کیس', 'ماشین‌حساب CFM'],
  openGraph: {
    title: 'ایروفلُ | سامانه تهویه صنعتی و خانگی',
    description: 'پلتفرم تخصصی تهویه و خنک‌سازی با محاسبه‌گر جریان هوا.',
    type: 'website',
    locale: 'fa_IR',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-sans">
        <QueryProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster richColors position="bottom-left" closeButton />
        </QueryProvider>
      </body>
    </html>
  );
}
