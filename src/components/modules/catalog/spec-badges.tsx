import { Wind, Volume2, Gauge, Zap } from 'lucide-react';
import { cn, formatPersianNumber } from '@/lib/utils';
import type { FanSpecs } from '@/types/fan.types';

interface SpecBadgesProps {
  specs: FanSpecs;
  className?: string;
}

/**
 * Key technical spec badges shown on cards and search results.
 * Rendered with logical properties for correct RTL alignment.
 */
export function SpecBadges({ specs, className }: SpecBadgesProps) {
  const items = [
    { icon: Wind, label: `${formatPersianNumber(specs.airflowCfm)} CFM` },
    { icon: Volume2, label: `${formatPersianNumber(specs.noiseDb)} dB` },
    { icon: Gauge, label: `${formatPersianNumber(specs.staticPressureMmH2O)} mmH₂O` },
    { icon: Zap, label: specs.voltage },
  ];

  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {items.map(({ icon: Icon, label }) => (
        <span
          key={label}
          className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-[11px] text-muted-foreground"
        >
          <Icon className="size-3" />
          {label}
        </span>
      ))}
    </div>
  );
}
