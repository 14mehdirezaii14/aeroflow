import { z } from 'zod';

/**
 * CFM Airflow Engineering Calculator schema
 * Required CFM = (Volume m³ × ACH) / 1.7
 */

export const roomCategories = [
  'serverRoom',
  'industrialWorkshop',
  'commercialKitchen',
  'officeSpace',
] as const;

export type RoomCategory = (typeof roomCategories)[number];

export const AIR_CHANGE_PRESETS: Record<RoomCategory, { ach: number; label: string }> = {
  serverRoom: { ach: 30, label: 'اتاق سرور' },
  industrialWorkshop: { ach: 15, label: 'کارگاه صنعتی' },
  commercialKitchen: { ach: 20, label: 'آشپزخانه تجاری' },
  officeSpace: { ach: 6, label: 'فضای اداری' },
};

export const calculatorSchema = z.object({
  roomCategory: z.enum(roomCategories, {
    errorMap: () => ({ message: 'دسته فضای موردنظر را انتخاب کنید.' }),
  }),
  length: z.coerce
    .number({ message: 'طول را به متر وارد کنید.' })
    .min(0.1, 'طول حداقل ۰٫۱ متر است.')
    .max(100, 'طول حداکثر ۱۰۰ متر است.'),
  width: z.coerce
    .number({ message: 'عرض را به متر وارد کنید.' })
    .min(0.1, 'عرض حداقل ۰٫۱ متر است.')
    .max(100, 'عرض حداکثر ۱۰۰ متر است.'),
  height: z.coerce
    .number({ message: 'ارتفاع را به متر وارد کنید.' })
    .min(1.5, 'ارتفاع حداقل ۱٫۵ متر است.')
    .max(15, 'ارتفاع حداکثر ۱۵ متر است.'),
  ach: z.coerce
    .number({ message: 'نرخ تعویض هوا را وارد کنید.' })
    .min(1, 'نرخ تعویض هوا حداقل ۱ است.')
    .max(60, 'نرخ تعویض هوا حداکثر ۶۰ است.'),
});

export type CalculatorFormValues = z.infer<typeof calculatorSchema>;

/** Calculate required airflow (CFM) and m³/h. */
export function computeRequiredAirflow(values: CalculatorFormValues): {
  requiredCfm: number;
  requiredM3h: number;
  volumeM3: number;
} {
  const volumeM3 = values.length * values.width * values.height;
  const requiredCfm = (volumeM3 * values.ach) / 1.7;
  const requiredM3h = requiredCfm * 1.699;
  return { requiredCfm, requiredM3h, volumeM3 };
}
