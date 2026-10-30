'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import type { FanSpecs } from '@/types/fan.types';

/**
 * Client container that lazy-loads the two heavy visualizers.
 * They are excluded from SSR (`ssr: false`) and loaded on demand.
 */
const NoiseVisualizer = dynamic(
  () => import('@/components/modules/pdp/noise-visualizer').then((m) => m.NoiseVisualizer),
  { ssr: false, loading: () => <Skeleton className="h-44 w-full rounded-xl" /> },
);

const AirflowCurveChart = dynamic(
  () =>
    import('@/components/modules/pdp/airflow-curve-chart').then((m) => m.AirflowCurveChart),
  { ssr: false, loading: () => <Skeleton className="h-64 w-full rounded-xl" /> },
);

export function PdpVisualizations({ specs }: { specs: FanSpecs }) {
  return (
    <Suspense fallback={null}>
      <div className="space-y-5">
        <NoiseVisualizer specs={specs} />
        <AirflowCurveChart specs={specs} />
      </div>
    </Suspense>
  );
}
