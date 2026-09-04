import { cn } from '../../lib/cn';

/** Marca KERULab: monograma SVG + wordmark. */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg viewBox="0 0 64 64" className="size-8 shrink-0" aria-hidden="true">
        <defs>
          <linearGradient id="kerulab-mark" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="var(--color-brand-500)" />
            <stop offset="0.55" stopColor="var(--color-ai-500)" />
            <stop offset="1" stopColor="var(--color-cyan-accent-500)" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="16" className="fill-ink dark:fill-[color:var(--surface)]" />
        <path
          d="M20 16v32M20 32l16-16M20 32l16 16"
          stroke="url(#kerulab-mark)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="46" cy="18" r="4" fill="var(--color-cyan-accent-500)" />
        <circle cx="46" cy="46" r="4" fill="var(--color-ai-500)" />
      </svg>
      {!compact ? (
        <span className="font-display text-lg font-bold tracking-tight">
          KERU<span className="text-gradient">Lab</span>
        </span>
      ) : null}
    </span>
  );
}
