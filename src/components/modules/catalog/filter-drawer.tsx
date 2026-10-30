'use client';

import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { formatPersianNumber } from '@/lib/utils';
import type { BearingType, FanCategory, FilterState, Voltage } from '@/types/fan.types';

interface FilterDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: FilterState;
  onChange: (patch: Partial<FilterState>) => void;
  onReset: () => void;
}

const CATEGORIES: { value: FanCategory; label: string }[] = [
  { value: 'industrial', label: 'صنعتی' },
  { value: 'pc', label: 'کامپیوتری' },
  { value: 'residential', label: 'مسکونی' },
];

const VOLTAGES: Voltage[] = ['12V', '24V', '220V'];
const BEARINGS: BearingType[] = ['FDB', 'DualBall'];

function toggleInArray<T extends string>(arr: T[], value: T): T[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

export function FilterDrawer({ open, onOpenChange, filters, onChange, onReset }: FilterDrawerProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>فیلتر محصولات</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Categories */}
          <fieldset>
            <legend className="mb-3 text-sm font-semibold">دسته‌بندی</legend>
            <div className="space-y-2.5">
              {CATEGORIES.map((cat) => (
                <label key={cat.value} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={filters.categories.includes(cat.value)}
                    onCheckedChange={() =>
                      onChange({ categories: toggleInArray(filters.categories, cat.value) })
                    }
                  />
                  {cat.label}
                </label>
              ))}
            </div>
          </fieldset>

          <Separator />

          {/* CFM range */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <Label>بازه جریان هوا (CFM)</Label>
              <span className="text-xs text-muted-foreground">
                {formatPersianNumber(filters.cfmRange[0])} تا {formatPersianNumber(filters.cfmRange[1])}
              </span>
            </div>
            <Slider
              min={50}
              max={800}
              step={10}
              value={filters.cfmRange}
              onValueChange={(value) =>
                onChange({ cfmRange: value as [number, number] })
              }
            />
          </div>

          <Separator />

          {/* Noise range */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <Label>سطح صدا (dB)</Label>
              <span className="text-xs text-muted-foreground">
                {formatPersianNumber(filters.noiseRange[0])} تا {formatPersianNumber(filters.noiseRange[1])}
              </span>
            </div>
            <Slider
              min={15}
              max={60}
              step={1}
              value={filters.noiseRange}
              onValueChange={(value) =>
                onChange({ noiseRange: value as [number, number] })
              }
            />
          </div>

          <Separator />

          {/* Voltages */}
          <fieldset>
            <legend className="mb-3 text-sm font-semibold">ولتاژ</legend>
            <div className="space-y-2.5">
              {VOLTAGES.map((v) => (
                <label key={v} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={filters.voltages.includes(v)}
                    onCheckedChange={() => onChange({ voltages: toggleInArray(filters.voltages, v) })}
                  />
                  {v}
                </label>
              ))}
            </div>
          </fieldset>

          <Separator />

          {/* Bearings */}
          <fieldset>
            <legend className="mb-3 text-sm font-semibold">نوع بلبرینگ</legend>
            <div className="space-y-2.5">
              {BEARINGS.map((b) => (
                <label key={b} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={filters.bearings.includes(b)}
                    onCheckedChange={() => onChange({ bearings: toggleInArray(filters.bearings, b) })}
                  />
                  {b === 'FDB' ? 'FDB — دینامیک سیال' : 'Dual Ball — دوبل'}
                </label>
              ))}
            </div>
          </fieldset>

          <Separator />

          {/* Static pressure */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <Label>حداقل فشار استاتیک (mmH₂O)</Label>
              <span className="text-xs text-muted-foreground">
                {formatPersianNumber(filters.staticPressureMin)}
              </span>
            </div>
            <Slider
              min={0}
              max={50}
              step={1}
              value={[filters.staticPressureMin]}
              onValueChange={(value) => onChange({ staticPressureMin: value[0] ?? 0 })}
            />
          </div>

          <Separator />

          {/* Max dimension */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <Label>حداکثر ابعاد (mm)</Label>
              <span className="text-xs text-muted-foreground">
                {formatPersianNumber(filters.dimensionMax)}
              </span>
            </div>
            <Slider
              min={80}
              max={500}
              step={10}
              value={[filters.dimensionMax]}
              onValueChange={(value) => onChange({ dimensionMax: value[0] ?? 500 })}
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:justify-between sm:space-x-0">
          <Button type="button" variant="link" onClick={onReset}>
            حذف همه فیلترها
          </Button>
          <Button type="button" onClick={() => onOpenChange(false)}>
            نمایش نتایج
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
