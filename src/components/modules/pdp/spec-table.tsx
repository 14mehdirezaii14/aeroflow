import { formatPersianNumber, bearingLabel } from '@/lib/utils';
import type { Product } from '@/types/fan.types';

interface SpecTableProps {
  product: Product;
}

interface SpecRow {
  label: string;
  value: string;
}

/** Complete technical specification data grid for the PDP. */
export function SpecTable({ product }: SpecTableProps) {
  const s = product.specs;
  const rows: SpecRow[] = [
    { label: 'جریان هوا (Airflow)', value: `${formatPersianNumber(s.airflowCfm)} CFM` },
    { label: 'جریان هوا (مترمکعب بر ساعت)', value: `${formatPersianNumber(s.airflowM3h)} m³/h` },
    { label: 'فشار استاتیک', value: `${formatPersianNumber(s.staticPressureMmH2O)} mmH₂O` },
    { label: 'سطح صدا', value: `${formatPersianNumber(s.noiseDb)} dB(A)` },
    { label: 'سرعت چرخش', value: `${formatPersianNumber(s.rpm)} RPM` },
    { label: 'توان مصرفی', value: `${formatPersianNumber(s.wattage)} وات` },
    { label: 'MTBF (میانگین زمان بین خرابی)', value: formatPersianNumber(s.mtbfHours.toLocaleString('en-US')) },
    { label: 'ابعاد قاب', value: `${formatPersianNumber(s.dimensionMm)} mm` },
    { label: 'ولتاژ ورودی', value: s.voltage },
    { label: 'نوع بلبرینگ', value: bearingLabel(s.bearing) },
    { label: 'برند', value: product.brand },
    { label: 'مدل', value: product.slug },
  ];

  return (
    <div className="overflow-hidden rounded-xl border">
      <table className="w-full text-sm">
        <tbody className="divide-y">
          {rows.map((row) => (
            <tr key={row.label} className="odd:bg-muted/30">
              <th scope="row" className="w-1/2 px-4 py-2.5 text-right font-normal text-muted-foreground">
                {row.label}
              </th>
              <td className="px-4 py-2.5 font-medium">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
