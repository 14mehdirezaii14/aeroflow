'use client';

import { useMemo } from 'react';
import { formatPersianNumber } from '@/lib/utils';
import type { FanSpecs } from '@/types/fan.types';

interface AirflowCurveChartProps {
  specs: FanSpecs;
}

const W = 320;
const H = 160;
const PAD = { top: 12, right: 12, bottom: 28, left: 34 };
const CHART_W = W - PAD.left - PAD.right;
const CHART_H = H - PAD.top - PAD.bottom;

/**
 * Static-pressure vs. airflow operating curve (typical fan curve).
 * Rendered as an SVG polyline. The blue dot marks the fan's rated point,
 * which sits on the curve.
 */
export function AirflowCurveChart({ specs }: AirflowCurveChartProps) {
  const { points, fanPoint } = useMemo(() => {
    const maxPressure = Math.max(specs.staticPressureMmH2O * 1.6, 30);
    const maxFlow = specs.airflowCfm * 1.4;

    // Interpolate a typical fan curve from max static pressure (zero flow)
    // down to max flow (near-zero pressure).
    const curve: { flow: number; pressure: number }[] = [];
    const steps = 12;
    for (let i = 0; i <= steps; i += 1) {
      const t = i / steps;
      const flow = t * maxFlow;
      const pressure = maxPressure * (1 - Math.pow(t, 1.9));
      curve.push({ flow, pressure });
    }

    const toX = (flow: number) => PAD.left + (flow / maxFlow) * CHART_W;
    const toY = (pressure: number) => PAD.top + (1 - pressure / maxPressure) * CHART_H;

    const points = curve.map((p) => `${toX(p.flow)},${toY(p.pressure)}`).join(' ');
    const fanPoint = { x: toX(specs.airflowCfm), y: toY(specs.staticPressureMmH2O) };
    return { points, fanPoint };
  }, [specs]);

  return (
    <div className="rounded-xl border bg-card p-4">
      <h3 className="mb-3 text-sm font-semibold">منحنی عملکرد فن (فشار — جریان)</h3>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="منحنی عملکرد فن">
        {/* Y axis label */}
        <text x={8} y={H / 2} transform={`rotate(-90 8 ${H / 2})`} className="fill-muted-foreground text-[10px]">
          فشار استاتیک (mmH₂O)
        </text>

        {/* X axis label */}
        <text x={W / 2} y={H - 4} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          جریان هوا (CFM)
        </text>

        {/* The fan operating curve */}
        <polyline points={points} fill="none" stroke="hsl(var(--primary))" strokeWidth={2.5} strokeLinecap="round" />

        {/* Rated operating point */}
        <circle cx={fanPoint.x} cy={fanPoint.y} r={5} className="fill-primary" />
        <circle cx={fanPoint.x} cy={fanPoint.y} r={9} className="fill-primary/20" />

        {/* Dashed guides to rated point */}
        <line x1={fanPoint.x} y1={fanPoint.y} x2={fanPoint.x} y2={H - PAD.bottom} className="stroke-muted-foreground/40" strokeDasharray="3 3" strokeWidth={1} />
        <line x1={PAD.left} y1={fanPoint.y} x2={fanPoint.x} y2={fanPoint.y} className="stroke-muted-foreground/40" strokeDasharray="3 3" strokeWidth={1} />

        <text x={fanPoint.x + 6} y={fanPoint.y - 6} className="fill-foreground text-[10px] font-semibold">
          نقطه کار ({formatPersianNumber(specs.airflowCfm)} CFM)
        </text>
      </svg>

      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-md bg-muted/50 p-2">
          <p className="text-muted-foreground">حداکثر جریان</p>
          <p className="font-semibold">{formatPersianNumber(Math.round(specs.airflowCfm * 1.4))} CFM</p>
        </div>
        <div className="rounded-md bg-muted/50 p-2">
          <p className="text-muted-foreground">حداکثر فشار</p>
          <p className="font-semibold">{formatPersianNumber(Math.round(specs.staticPressureMmH2O * 1.6))} mmH₂O</p>
        </div>
      </div>
    </div>
  );
}
