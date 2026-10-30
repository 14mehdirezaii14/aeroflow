'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowLeft, Calculator, PackageCheck, Sparkles, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatPersianNumber } from '@/lib/utils';

/**
 * Animated Hero:
 * - Left: 3D-style spinning fan, airflow particles, glowing ambient light,
 *   floating spec badges with hover micro-interactions.
 * - Right: high-contrast typography, live success counter, dual glow CTAs.
 */

const PARTICLES = [
  { top: '32%', left: '50%', '--tx': '150px', '--ty': '-70px', delay: '0s', size: '10px' },
  { top: '45%', left: '50%', '--tx': '180px', '--ty': '10px', delay: '0.8s', size: '8px' },
  { top: '58%', left: '50%', '--tx': '150px', '--ty': '90px', delay: '1.6s', size: '9px' },
  { top: '38%', left: '50%', '--tx': '120px', '--ty': '-120px', delay: '2.4s', size: '7px' },
  { top: '52%', left: '50%', '--tx': '200px', '--ty': '50px', delay: '3.2s', size: '11px' },
  { top: '28%', left: '50%', '--tx': '100px', '--ty': '-40px', delay: '4s', size: '7px' },
] as const;

const SPEC_BADGES = [
  {
    label: '۱۸٫۲ dB',
    sub: 'فوق‌العاده بی‌صدا',
    className: 'left-2 top-8 md:left-0',
    floatDelay: '0s',
  },
  {
    label: 'CFM ۸۵٫۴',
    sub: 'حداکثر جریان هوا',
    className: 'bottom-10 right-2 md:right-0',
    floatDelay: '1.5s',
  },
] as const;

/** Count-up hook — formats the running value in Persian with separators. */
function useCountUp(target: number, duration = 1800): string {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let rafId = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration]);

  return formatPersianNumber(value.toLocaleString('en-US'));
}

export function Hero() {
  const installations = useCountUp(10000);

  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-bl from-primary/15 via-background to-cyan-500/10">
      <div className="container grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-24">
        {/* ── Copy / CTAs (renders on the right in RTL) ───────── */}
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
            <Sparkles className="size-4" />
            مهندسی تهویه برای صنعت، سرور و خانه
          </p>

          <h1 className="text-4xl font-black leading-[1.1] tracking-tight lg:text-6xl">
            هوای پاک،
            <span className="block bg-gradient-to-l from-primary to-cyan-500 bg-clip-text text-transparent">
              دقیقاً به‌اندازه نیاز شما
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground lg:text-lg">
            ایروفلُ با محاسبه‌گر آنلاین CFM، مقایسه فنی و مشاوره مهندسی، بهترین فن را برای
            هر فضا انتخاب می‌کند — از رک سرور تا کارگاه صنعتی.
          </p>

          {/* Live metrics */}
          <dl className="mt-8 flex flex-wrap items-center gap-6">
            <div>
              <dt className="text-xs text-muted-foreground">نصب موفق</dt>
              <dd className="mt-1 text-2xl font-black text-primary">
                +{installations}
              </dd>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <dt className="text-xs text-muted-foreground">گارانتی تعویض</dt>
              <dd className="mt-1 text-2xl font-black">۵ ساله</dd>
            </div>
          </dl>

          {/* Dual CTAs with hover glow */}
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg" className="cta-glow">
              <Link href="/products">
                <PackageCheck className="size-4" />
                مشاهده پرفروش‌ترین‌ها
                <ArrowLeft className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="cta-glow">
              <Link href="/calculator">
                <Calculator className="size-4" />
                محاسبه‌گر آنلاین CFM
              </Link>
            </Button>
          </div>
        </div>

        {/* ── Animated fan visual (renders on the left in RTL) ── */}
        <div className="relative mx-auto aspect-square w-full max-w-md select-none">
          {/* Ambient glow */}
          <div className="animate-glow absolute inset-0 rounded-full bg-[radial-gradient(circle,hsl(190_100%_60%/0.35),transparent_65%)] blur-2xl" />

          {/* Spinning fan */}
          <div className="relative flex h-full w-full items-center justify-center">
            <svg viewBox="0 0 200 200" className="animate-slow-spin w-[62%] drop-shadow-[0_0_25px_hsl(190_100%_60%/0.45)]" aria-label="فن در حال چرخش">
              <defs>
                <radialGradient id="blade" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stopColor="hsl(210 80% 52%)" />
                  <stop offset="100%" stopColor="hsl(190 100% 42%)" />
                </radialGradient>
                <radialGradient id="hub" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stopColor="hsl(0 0% 100%)" />
                  <stop offset="100%" stopColor="hsl(215 20% 65%)" />
                </radialGradient>
              </defs>

              {/* 6 blades */}
              <g>
                {[0, 60, 120, 180, 240, 300].map((deg) => (
                  <path
                    key={deg}
                    transform={`rotate(${deg} 100 100)`}
                    d="M 100 96 C 122 84 148 66 164 78 C 172 84 166 100 150 104 C 130 109 112 102 100 100 Z"
                    fill="url(#blade)"
                    stroke="hsl(210 80% 30%/0.35)"
                    strokeWidth="0.8"
                  />
                ))}
              </g>

              {/* Hub */}
              <circle cx="100" cy="100" r="16" fill="url(#hub)" stroke="hsl(215 25% 50%)" strokeWidth="1.5" />
              <circle cx="100" cy="100" r="4" fill="hsl(215 30% 35%)" />
            </svg>

            {/* Static outer ring */}
            <div className="pointer-events-none absolute size-[74%] rounded-full border border-primary/20" />
            <div className="pointer-events-none absolute size-[86%] rounded-full border border-cyan-500/10" />
          </div>

          {/* Airflow particles flowing outward */}
          {PARTICLES.map((p, i) => {
            const particleStyle = {
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              '--tx': p['--tx'],
              '--ty': p['--ty'],
            } as React.CSSProperties;

            return (
              <span
                key={i}
                className="animate-particle pointer-events-none absolute rounded-full bg-cyan-300"
                style={particleStyle}
              />
            );
          })}

          {/* Floating spec badges */}
          {SPEC_BADGES.map((badge) => (
            <button
              key={badge.label}
              type="button"
              className={`animate-badge-float absolute flex items-center gap-2 rounded-xl border bg-background/85 px-3 py-2 shadow-lg backdrop-blur transition-transform duration-300 hover:scale-110 hover:shadow-primary/30 ${badge.className}`}
              style={{ animationDelay: badge.floatDelay }}
            >
              <Wind className="size-4 text-primary" />
              <span className="text-left">
                <span className="block text-sm font-bold leading-none">{badge.label}</span>
                <span className="mt-1 block text-[10px] text-muted-foreground">{badge.sub}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
