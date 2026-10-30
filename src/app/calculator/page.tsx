import type { Metadata } from 'next';
import { RoomDimensionForm } from '@/components/modules/calculator/room-dimension-form';

export const metadata: Metadata = {
  title: 'ماشین‌حساب جریان هوا',
  description: 'محاسبه CFM موردنیاز برای فضای خود و دریافت پیشنهاد فن مناسب.',
};

export default function CalculatorPage() {
  return (
    <div className="container max-w-3xl py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">ماشین‌حساب جریان هوا</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          ابعاد فضا و نرخ تعویض هوا را وارد کنید تا ظرفیت موردنیاز (CFM) و فن مناسب محاسبه شود.
        </p>
      </div>
      <RoomDimensionForm />
    </div>
  );
}
