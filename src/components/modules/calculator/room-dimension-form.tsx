'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { Ruler } from 'lucide-react';
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
import { FieldError } from '@/components/ui/form-field';
import {
  AIR_CHANGE_PRESETS,
  calculatorSchema,
  computeRequiredAirflow,
  roomCategories,
  type CalculatorFormValues,
  type RoomCategory,
} from '@/schemas/calculator.schema';
import { CFMResultRecommendation } from '@/components/modules/calculator/cfm-result-recommendation';

export interface CalculatedResult {
  volumeM3: number;
  requiredCfm: number;
  requiredM3h: number;
}

export function RoomDimensionForm() {
  const [result, setResult] = useState<CalculatedResult | null>(null);

  const form = useForm<CalculatorFormValues>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      roomCategory: 'officeSpace',
      ach: AIR_CHANGE_PRESETS.officeSpace.ach,
      length: 10,
      width: 8,
      height: 3,
    },
  });

  const { register, handleSubmit, setValue, watch, formState } = form;
  const selectedCategory = watch('roomCategory') as RoomCategory;

  const handleCategoryChange = useCallback(
    (value: string) => {
      const category = value as RoomCategory;
      setValue('roomCategory', category, { shouldValidate: true });
      setValue('ach', AIR_CHANGE_PRESETS[category].ach, { shouldValidate: true });
    },
    [setValue],
  );

  const onSubmit = useCallback((values: CalculatorFormValues) => {
    const { requiredCfm, requiredM3h, volumeM3 } = computeRequiredAirflow(values);
    setResult({ volumeM3, requiredCfm, requiredM3h });
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Ruler className="size-5" />
          ماشین‌حساب جریان هوا (CFM)
        </CardTitle>
        <CardDescription>
          با واردکردن ابعاد فضای خود و نرخ تعویض هوا، فن مناسب را محاسبه کنید.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          {/* Room category */}
          <div className="space-y-2">
            <Label>نوع فضا</Label>
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="انتخاب کنید" />
              </SelectTrigger>
              <SelectContent>
                {roomCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {AIR_CHANGE_PRESETS[cat].label} (ACH {AIR_CHANGE_PRESETS[cat].ach})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError name="roomCategory" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <InputField
              name="length"
              label="طول (متر)"
              register={register}
              options={{ valueAsNumber: true }}
              type="number"
              step="0.1"
              inputMode="decimal"
            />
            <InputField
              name="width"
              label="عرض (متر)"
              register={register}
              options={{ valueAsNumber: true }}
              type="number"
              step="0.1"
              inputMode="decimal"
            />
            <InputField
              name="height"
              label="ارتفاع (متر)"
              register={register}
              options={{ valueAsNumber: true }}
              type="number"
              step="0.1"
              inputMode="decimal"
            />
          </div>

          <InputField
            name="ach"
            label="نرخ تعویض هوا (ACH)"
            register={register}
            options={{ valueAsNumber: true }}
            type="number"
            min={1}
            max={60}
            inputMode="numeric"
          />

          <Button type="submit" className="w-full" size="lg" disabled={formState.isSubmitting}>
            محاسبه جریان هوا
          </Button>
          </form>
        </FormProvider>

        {result && <CFMResultRecommendation result={result} />}
      </CardContent>
    </Card>
  );
}
