'use client';

import { formatPersianNumber } from '@/lib/utils';
import type { FanSpecs } from '@/types/fan.types';

interface NoiseVisualizerProps {
  specs: FanSpecs;
}

interface NoiseRef {
  db: number;
  label: string;
  tone: string;
}

const REFERENCES: NoiseRef[] = [
  { db: 18, label: 'زمزمه', tone: 'bg-emerald-400' },
  { db: 40, label: 'کتابخانه', tone: 'bg-amber-400' },
  { db: 65, label: 'صنعتی', tone: 'bg-red-500' },
];

const SCALE = { min: 0, max: 70 };

function toPercent(db: number): number {
  const { min, max } = SCALE;
  return ((db - min) / (max - min)) * 100;
}

/**
 * Interactive noise reference bar.
 * Compares the fan's noise level against familiar everyday references
 * (18dB whisper, 40dB library, 65dB industrial).
 */
export function NoiseVisualizer({ specs }: NoiseVisualizerProps) {
  const fanDb = specs.noiseDb;
  const fanPct = toPercent(fanDb);

  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold">مقایسه سطح صدا</h3>
        <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-bold text-primary">
          {formatPersianNumber(fanDb)} dB
        </span>
      </div>

      {/* Scale track */}
      <div className="relative h-2 w-full rounded-full bg-gradient-to-l from-red-500 via-amber-400 to-emerald-400">
        {/* fan marker */}
        <div
          className="absolute -top-1.5 size-5 -translate-x-1/2 rounded-full border-2 border-background bg-foreground shadow"
          style={{ right: `${fanPct}%` }}
          role="img"
          aria-label={`سطح صدای فن: ${formatPersianNumber(fanDb)} دسیبل`}
        />
      </div>

      {/* Reference labels */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {REFERENCES.map((ref) => (
          <div key={ref.label} className="rounded-lg border bg-muted/40 p-2 text-center">
            <div className={`mx-auto mb-1.5 h-1.5 w-8 rounded-full ${ref.tone}`} />
            <p className="text-xs font-semibold">
              {formatPersianNumber(ref.db)} dB
            </p>
            <p className="text-[11px] text-muted-foreground">{ref.label}</p>
          </div>
        ))}
      </div>

      <p className="mt-3 text-[11px] text-muted-foreground">
        صدای این فن در سطح «{fanDb <= 25 ? 'زمزمه' : fanDb <= 45 ? 'کتابخانه' : 'صنعتی'}» قرار دارد.
      </p>
    </div>
  );
}
