'use client';

import { useCallback, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Check, ChevronLeft, CreditCard, MapPin, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { InputField } from '@/components/ui/form-field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { checkoutSchema, type CheckoutFormValues } from '@/schemas/checkout.schema';
import { cn } from '@/lib/utils';

const STEPS = [
  { id: 1, label: 'اطلاعات تماس', icon: User },
  { id: 2, label: 'آدرس ارسال', icon: MapPin },
  { id: 3, label: 'پرداخت', icon: CreditCard },
] as const;

const DEFAULT_VALUES: CheckoutFormValues = {
  step1: { fullName: '', mobile: '', email: '', orderType: 'b2c', nationalId: '', economicCode: '' },
  step2: { city: '', address: '', postalCode: '' },
  step3: { paymentMethod: 'card', acceptTerms: false },
};

/** Keep only digits, cap at 11 (Iranian mobile). */
function maskMobile(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  return digits.slice(0, 11);
}

export default function CheckoutPage() {
  const [step, setStep] = useState(1);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onTouched',
  });

  const { register, handleSubmit, trigger, setValue, watch, formState } = form;
  const orderType = watch('step1.orderType');

  const goNext = useCallback(async () => {
    const keyFor = { 1: 'step1', 2: 'step2' } as const;
    const ok = await trigger(keyFor[step as 1 | 2] as 'step1' | 'step2');
    if (ok) setStep((s) => Math.min(3, s + 1));
  }, [step, trigger]);

  const onSubmit = useCallback(
    (values: CheckoutFormValues) => {
      // Mock order submission — replace with apiPost(apiRoutes.orders, …) in production.
      // eslint-disable-next-line no-console
      console.info('Order payload', JSON.stringify(values, null, 2));
      toast.success('سفارش شما با موفقیت ثبت شد ✅');
      form.reset(DEFAULT_VALUES);
      setStep(1);
    },
    [form],
  );

  return (
    <div className="container max-w-4xl py-10">
      <h1 className="mb-8 text-2xl font-bold">تکمیل سفارش</h1>

      {/* Stepper */}
      <ol className="mb-10 flex items-center gap-2">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const active = s.id === step;
          const done = s.id < step;
          return (
            <li key={s.id} className="flex flex-1 items-center gap-2">
              <span
                className={cn(
                  'flex size-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition-colors',
                  active && 'border-primary bg-primary text-primary-foreground',
                  done && 'border-primary bg-primary/10 text-primary',
                  !active && !done && 'border-border text-muted-foreground',
                )}
              >
                {done ? <Check className="size-4" /> : <Icon className="size-4" />}
              </span>
              <span className={cn('hidden text-sm font-medium sm:block', active ? 'text-foreground' : 'text-muted-foreground')}>
                {s.label}
              </span>
              {i < STEPS.length - 1 && <span className="h-px flex-1 bg-border" />}
            </li>
          );
        })}
      </ol>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {step === 1 && (
          <Card>
            <CardContent className="space-y-5 p-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <InputField name="step1.fullName" label="نام و نام خانوادگی" register={register} placeholder="مثلاً: علی رضایی" />
                <div className="space-y-2">
                  <Label>شماره موبایل</Label>
                  <input
                    {...register('step1.mobile', {
                      setValueAs: maskMobile,
                    })}
                    type="tel"
                    inputMode="numeric"
                    placeholder="۰۹xxxxxxxxx"
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <p className="text-xs text-muted-foreground">با ۰۹ شروع شده و ۱۱ رقم است (مثال: ۰۹۱۲۳۴۵۶۷۸).</p>
                </div>
                <InputField name="step1.email" label="ایمیل (اختیاری)" type="email" register={register} />
                <div className="space-y-2">
                  <Label>نوع سفارش</Label>
                  <Select
                    value={orderType}
                    onValueChange={(v) => setValue('step1.orderType', v as 'b2c' | 'b2b', { shouldValidate: true })}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="b2c">تک‌فروشی (B2C)</SelectItem>
                      <SelectItem value="b2b">سازمانی (B2B)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {orderType === 'b2b' && (
                <div className="grid gap-5 sm:grid-cols-2">
                  <InputField name="step1.nationalId" label="کد ملی" register={register} inputMode="numeric" maxLength={10} />
                  <InputField name="step1.economicCode" label="کد اقتصادی" register={register} inputMode="numeric" maxLength={12} />
                </div>
              )}

              <Button type="button" onClick={goNext} className="w-full sm:w-auto">
                مرحله بعد
                <ChevronLeft className="size-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardContent className="space-y-5 p-6">
              <InputField name="step2.city" label="شهر" register={register} placeholder="مثلاً: تهران" />
              <InputField name="step2.address" label="نشانی کامل" register={register} placeholder="خیابان، کوچه، پلاک، واحد" />
              <InputField
                name="step2.postalCode"
                label="کد پستی"
                register={register}
                inputMode="numeric"
                maxLength={10}
                placeholder="۱۰ رقم"
              />
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>
                  بازگشت
                </Button>
                <Button type="button" onClick={goNext}>
                  مرحله بعد
                  <ChevronLeft className="size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardContent className="space-y-5 p-6">
              <div className="space-y-2">
                <Label>روش پرداخت</Label>
                <Select
                  value={watch('step3.paymentMethod')}
                  onValueChange={(v) => setValue('step3.paymentMethod', v as 'cash' | 'card' | 'wallet', { shouldValidate: true })}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">پرداخت آنلاین کارت بانکی</SelectItem>
                    <SelectItem value="wallet">کیف پول الکترونیک</SelectItem>
                    <SelectItem value="cash">پرداخت در محل</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <label className="flex items-start gap-3 text-sm">
                <Checkbox
                  checked={watch('step3.acceptTerms')}
                  onCheckedChange={(v) => setValue('step3.acceptTerms', v === true, { shouldValidate: true })}
                />
                <span>
                  <a href="/terms" className="text-primary underline">قوانین و مقررات</a> را مطالعه کرده و می‌پذیرم.
                </span>
              </label>
              {formState.errors.step3?.acceptTerms && (
                <p role="alert" className="text-xs font-medium text-destructive">
                  {formState.errors.step3.acceptTerms.message}
                </p>
              )}

              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => setStep(2)}>
                  بازگشت
                </Button>
                <Button type="submit" disabled={formState.isSubmitting}>
                  ثبت نهایی سفارش
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </form>
      </FormProvider>
    </div>
  );
}
