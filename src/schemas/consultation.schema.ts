import { z } from 'zod';

/**
 * Engineering project consultation form schema.
 * Used on /consultation. Validates company contact data + project type.
 */

const PERSIAN_MOBILE = /^09\d{9}$/;
const PERSIAN_POSTAL = /^\d{10}$/;

export const consultationSchema = z.object({
  companyName: z
    .string()
    .min(2, 'نام شرکت را وارد کنید.')
    .max(100, 'نام شرکت حداکثر ۱۰۰ حرف است.'),
  contactName: z.string().min(3, 'نام و نام خانوادگی مخاطب را وارد کنید.').max(80),
  mobile: z
    .string()
    .regex(PERSIAN_MOBILE, 'شماره موبایل باید با ۰۹ شروع شود و ۱۱ رقم باشد (مثال: ۰۹۱۲۳۴۵۶۷۸).'),
  email: z.string().email('ایمیل معتبر وارد کنید.'),
  projectType: z.enum(['industrial', 'commercial', 'residential', 'datacenter'], {
    errorMap: () => ({ message: 'نوع پروژه را انتخاب کنید.' }),
  }),
  areaM2: z.coerce
    .number({ message: 'مساحت را وارد کنید.' })
    .min(1, 'مساحت حداقل ۱ متر مربع است.')
    .max(100000, 'مساحت حداکثر ۱۰۰٬۰۰۰ متر مربع است.'),
  postalCode: z
    .string()
    .regex(PERSIAN_POSTAL, 'کد پستی باید دقیقاً ۱۰ رقم باشد.'),
  message: z
    .string()
    .min(20, 'توضیحات پروژه حداقل ۲۰ حرف باشد.')
    .max(2000, 'توضیحات حداکثر ۲۰۰۰ حرف است.'),
});

export type ConsultationFormValues = z.infer<typeof consultationSchema>;
