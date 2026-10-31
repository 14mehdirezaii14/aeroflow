import SimplePage, { infoMetadata } from '@/components/common/simple-page';

export const metadata = infoMetadata('ارسال و تحویل', 'روش‌های ارسال و زمان تحویل در ایروفلُ');

export default function ShippingPage() {
  return (
    <SimplePage title="ارسال و تحویل" description="تحویل سریع به سراسر کشور.">
      <ul className="list-disc space-y-3 ps-5">
        <li>ارسال با پست پیشتاز: ۲ تا ۴ روز کاری.</li>
        <li>ارسال با باربری برای کالاهای صنعتی سنگین: ۳ تا ۷ روز کاری.</li>
        <li>هزینه ارسال برای سفارش‌های بالای ۵ میلیون تومان رایگان است.</li>
        <li>کد رهگیری بلافاصله پس از ثبت سفارش برای شما ارسال می‌شود.</li>
      </ul>
    </SimplePage>
  );
}
