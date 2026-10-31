import SimplePage, { infoMetadata } from '@/components/common/simple-page';

export const metadata = infoMetadata('تماس با ما', 'راه‌های ارتباط با پشتیبانی ایروفلُ');

export default function ContactPage() {
  return (
    <SimplePage title="تماس با ما" description="همیشه در دسترسیم.">
      <dl className="space-y-4">
        <div>
          <dt className="font-semibold text-foreground">تلفن پشتیبانی</dt>
          <dd className="mt-1" dir="ltr">۰۲۱-۹۱۰۰۸۷۶۵</dd>
        </div>
        <div>
          <dt className="font-semibold text-foreground">ایمیل</dt>
          <dd className="mt-1" dir="ltr">support@aeroflow.ir</dd>
        </div>
        <div>
          <dt className="font-semibold text-foreground">ساعات پاسخگویی</dt>
          <dd className="mt-1">شنبه تا چهارشنبه، ۸ تا ۱۸</dd>
        </div>
      </dl>
    </SimplePage>
  );
}
