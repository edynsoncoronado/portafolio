import { cn } from '../../lib/cn';

/**
 * Garabatos decorativos dibujados a mano (flechas, rayas y destellos).
 * Son puramente ornamentales: van marcados como aria-hidden.
 */

export function ArrowDoodle({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 80"
      fill="none"
      aria-hidden="true"
      className={cn('h-20 w-28 text-ink-mute', flip && '-scale-x-100', className)}
    >
      <path
        d="M6 6c20 34 46 52 84 56"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="1 7"
      />
      <path
        d="M74 48c8 6 14 10 18 14M92 62c-6 1-11 2-16 5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DashRows({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 60" fill="none" aria-hidden="true" className={cn('h-14 w-40', className)}>
      <g stroke="currentColor" strokeWidth="5" strokeLinecap="round">
        <path d="M8 12h44M64 12h30M106 12h46" opacity="0.9" />
        <path d="M22 30h52M86 30h28M126 30h26" opacity="0.7" />
        <path d="M4 48h30M46 48h48M106 48h20" opacity="0.5" />
      </g>
    </svg>
  );
}

export function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" aria-hidden="true" className={cn('h-10 w-10', className)}>
      <path
        d="M30 4c2.5 13 10.5 21 24 23-13.5 2-21.5 10-24 23-2.5-13-10.5-21-24-23 13.5-2 21.5-10 24-23Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Squiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 24" fill="none" aria-hidden="true" className={cn('h-5 w-52', className)}>
      <path
        d="M3 15c14-14 28 10 42-2s28 10 42-2 28 10 42-2 28 10 42-2"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function StarBurst({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden="true" className={cn('h-16 w-16', className)}>
      <g stroke="currentColor" strokeWidth="3.4" strokeLinecap="round">
        <path d="M40 8v14M40 58v14M8 40h14M58 40h14M17 17l10 10M53 53l10 10M63 17 53 27M27 53 17 63" />
      </g>
    </svg>
  );
}
