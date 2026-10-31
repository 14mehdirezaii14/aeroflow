'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { categoryLabels } from '@/lib/utils';

interface PdpImageGalleryProps {
  title: string;
  images: string[];
  category: string;
}

/**
 * Product image gallery.
 * - Wrapper constrained to `w-full max-w-full aspect-square overflow-hidden
 *   rounded-xl bg-muted/30` to prevent horizontal scroll / viewport blowout.
 * - Uses native <img> so local SVG artwork renders without relying on the
 *   image optimizer or external CDNs (guaranteed to load).
 * - Thumbnail strip (when >1 image) for quick switching.
 */
export function PdpImageGallery({ title, images, category }: PdpImageGalleryProps) {
  const [active, setActive] = useState(0);
  const list = images.filter(Boolean);
  const src = list[active] ?? '';

  return (
    <div className="w-full max-w-full">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted/30">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={title}
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-8xl font-black text-primary/20">
              {categoryLabels[category] ?? 'فن'}
            </span>
          </div>
        )}
      </div>

      {list.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {list.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`نمایش تصویر ${i + 1}`}
              className={cn(
                'relative size-16 overflow-hidden rounded-lg border-2 transition-colors',
                i === active ? 'border-primary' : 'border-border hover:border-muted-foreground/50',
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt="" className="h-full w-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
