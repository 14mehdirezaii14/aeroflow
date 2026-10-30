'use client';

import { useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { CheckCircle2, Headset } from 'lucide-react';
import { useSubmitConsultation } from '@/hooks/useFansQuery';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputField } from '@/components/ui/form-field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { consultationSchema, type ConsultationFormValues } from '@/schemas/consultation.schema';

const PROJECT_TYPES = [
  { value: 'industrial', label: 'صنعتی' },
  { value: 'commercial', label: 'تجاری' },
  { value: 'residential', label: 'مسکونی' },
  { value: 'datacenter', label: 'دیتاسنتر' },
] as const;

const MOBILE_MASK = (raw: string) => raw.replace(/\D/g, '').slice(0, 11);

export default function ConsultationPage() {
  const submitConsultation = useSubmitConsultation();
  const form = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      companyName: '',
      contactName: '',
      mobile: '',
      email: '',
      projectType: 'industrial',
      areaM2: 100,
      postalCode: '',
      message: '',
    },
  });

  const { register, handleSubmit, setValue, watch, formState } = form;

  const onSubmit = useCallback(
    (values: ConsultationFormValues) => {
      submitConsultation.mutate(values, {
        onSuccess: () => {
          toast.success('درخواست مشاوره شما ثبت شد؛ کارشناسان مهندسی به‌زودی تماس می‌گیرند.');
          form.reset();
        },
        onError: (error) => {
          toast.error(error.message ?? 'خطا در ثبت درخواست.');
        },
      });
    },
    [submitConsultation, form],
  );

  return (
    <div className="container max-w-3xl py-10">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Headset className="size-5" />
            درخواست مشاوره مهندسی
          </CardTitle>
          <CardDescription>
            برای پروژه‌های تهویه صنعتی، تجاری یا دیتاسنتر، فرم زیر را تکمیل کنید.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <InputField name="companyName" label="نام شرکت / سازمان" register={register} />
              <InputField name="contactName" label="نام مخاطب" register={register} />
              <div className="space-y-2">
                <Label>شماره موبایل</Label>
                <input
                  {...register('mobile', { setValueAs: MOBILE_MASK })}
                  type="tel"
                  inputMode="numeric"
                  placeholder="۰۹xxxxxxxxx"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
              <div className="space-y-2">
                <Label>نوع پروژه</Label>
                <Select
                  value={watch('projectType')}
                  onValueChange={(v) => setValue('projectType', v as ConsultationFormValues['projectType'], { shouldValidate: true })}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {PROJECT_TYPES.map((pt) => (
                      <SelectItem key={pt.value} value={pt.value}>{pt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <InputField name="email" label="ایمیل" type="email" register={register} />
              <InputField name="areaM2" label="مساحت تقریبی (متر مربع)" register={register} options={{ valueAsNumber: true }} inputMode="numeric" />
              <InputField name="postalCode" label="کد پستی" register={register} inputMode="numeric" maxLength={10} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">توضیحات پروژه</Label>
              <Textarea id="message" rows={5} placeholder="جریان هوای موردنیاز، شرایط محیط، چالش‌ها و …" {...register('message')} />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={formState.isSubmitting || submitConsultation.isPending}
            >
              {submitConsultation.isPending ? 'در حال ارسال…' : 'ارسال درخواست مشاوره'}
            </Button>

            {submitConsultation.isSuccess && (
              <p className="flex items-center justify-center gap-2 text-sm font-medium text-emerald-600">
                <CheckCircle2 className="size-4" />
                درخواست شما با موفقیت ثبت شد.
              </p>
            )}
          </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
