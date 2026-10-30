import { z } from 'zod';

/**
 * Multi-step checkout schema.
 * Persian validation messages; supports B2B fields (National ID / Economic Code),
 * postal code and masked Iranian mobile.
 */

const PERSIAN_MOBILE = /^09\d{9}$/;
const PERSIAN_POSTAL = /^\d{10}$/;
const NATIONAL_ID = /^\d{10}$/;
const ECONOMIC_CODE = /^\d{12}$/;

export const checkoutSchema = z.object({
  step1: z.object({
    fullName: z
      .string()
      .min(3, 'نام و نام خانوادگی باید حداقل ۳ حرف باشد.')
      .max(80, 'نام و نام خانوادگی حداکثر ۸۰ حرف است.'),
    mobile: z
      .string()
      .regex(PERSIAN_MOBILE, 'شماره موبایل باید با ۰۹ شروع شود و ۱۱ رقم باشد (مثال: ۰۹۱۲۳۴۵۶۷۸).'),
    email: z.string().email('ایمیل معتبر وارد کنید.').optional().or(z.literal('')),
    orderType: z.enum(['b2c', 'b2b'], { errorMap: () => ({ message: 'نوع سفارش را انتخاب کنید.' }) }),
    nationalId: z
      .string()
      .regex(NATIONAL_ID, 'کد ملی باید ۱۰ رقم باشد.')
      .optional()
      .or(z.literal('')),
    economicCode: z
      .string()
      .regex(ECONOMIC_CODE, 'کد اقتصادی باید ۱۲ رقم باشد.')
      .optional()
      .or(z.literal('')),
  }),
  step2: z.object({
    city: z.string().min(2, 'نام شهر را وارد کنید.').max(60),
    address: z.string().min(10, 'آدرس کامل پستی را وارد کنید.').max(400),
    postalCode: z
      .string()
      .regex(PERSIAN_POSTAL, 'کد پستی باید دقیقاً ۱۰ رقم باشد.'),
  }),
  step3: z.object({
    paymentMethod: z.enum(['cash', 'card', 'wallet'], {
      errorMap: () => ({ message: 'روش پرداخت را انتخاب کنید.' }),
    }),
    acceptTerms: z
      .boolean()
      .refine((v) => v === true, { message: 'پذیرش شرایط و قوانین الزامی است.' }),
  }),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
