import SimplePage, { infoMetadata } from '@/components/common/simple-page';

export const metadata = infoMetadata('شرایط بازگشت کالا', 'شرایط و ضوابط بازگشت کالا در ایروفلُ');

export default function ReturnsPage() {
  return (
    <SimplePage title="شرایط بازگشت کالا" description="بازگشت بدون قید و شرط تا ۷ روز.">
      <p>
        در صورت مغایرت کالا با مشخصات درج‌شده، معیوب بودن، یا عدم رضایت، تا ۷ روز پس از دریافت
        سفارش امکان بازگشت کالا بدون هیچ پیش‌شرطی وجود دارد.
      </p>
      <ol className="list-decimal space-y-3 ps-5">
        <li>با پشتیبانی تماس بگیرید و کد سفارش را اعلام کنید.</li>
        <li>کالا باید در بسته‌بندی اصلی و با تمام متعلقات باشد.</li>
        <li>مبلغ پرداختی حداکثر تا ۷۲ ساعت کاری پس از تأیید بازگشت، مسترد می‌شود.</li>
      </ol>
    </SimplePage>
  );
}
