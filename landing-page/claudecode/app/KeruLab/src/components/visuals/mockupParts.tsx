import type { ReactNode } from 'react';
import { TrendingUp } from 'lucide-react';
import { Counter } from '../ui/Counter';
import { cn } from '../../lib/cn';

/** Marco tipo aplicación usado por todos los mockups de producto. */
export function MockupWindow({
  title,
  subtitle,
  badge,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-3xl border border-subtle bg-surface shadow-2xl shadow-brand-500/10',
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-3 border-b border-subtle bg-surface-muted/60 px-4 py-3 sm:px-5">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-red-400/70" />
          <span className="size-2.5 rounded-full bg-amber-400/70" />
          <span className="size-2.5 rounded-full bg-emerald-400/70" />
        </span>
        <span className="text-sm font-semibold">{title}</span>
        {subtitle ? <span className="text-xs text-faint">{subtitle}</span> : null}
        {badge ? <span className="ml-auto">{badge}</span> : null}
      </div>
      {children}
    </div>
  );
}

/** Indicador numérico con variación respecto al periodo anterior. */
export function KpiTile({
  label,
  value,
  prefix,
  suffix,
  trend,
  trendLabel,
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  trend: number;
  trendLabel?: string;
}) {
  const positive = trend >= 0;

  return (
    <div className="rounded-xl border border-subtle bg-bg-elevated p-3">
      <p className="truncate text-xs text-faint">{label}</p>
      <p className="mt-1 font-display text-xl font-semibold sm:text-2xl">
        <Counter value={value} prefix={prefix} suffix={suffix} />
      </p>
      {trend !== 0 ? (
        <p
          className={cn(
            'mt-1 flex items-center gap-1 text-[0.7rem]',
            positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400',
          )}
        >
          <TrendingUp aria-hidden="true" className={cn('size-3', !positive && 'rotate-180')} />
          {positive ? '+' : ''}
          {trend}%{trendLabel ? <span className="text-faint">· {trendLabel}</span> : null}
        </p>
      ) : (
        <p className="mt-1 text-[0.7rem] text-faint">—</p>
      )}
    </div>
  );
}
