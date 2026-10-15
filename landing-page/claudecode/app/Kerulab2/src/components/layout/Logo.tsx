import { cn } from '../../lib/cn';

/** Marca denominativa: bloque morado con la K y el wordmark al lado. */
export function Logo({ className, tone = 'dark' }: { className?: string; tone?: 'dark' | 'light' }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span
        aria-hidden="true"
        className="grid h-9 w-9 place-items-center rounded-xl bg-plum-500 text-base font-bold text-white shadow-sm"
      >
        K
      </span>
      <span
        className={cn(
          'text-lg font-bold tracking-tight',
          tone === 'dark' ? 'text-ink' : 'text-white',
        )}
      >
        KERU<span className="text-teal-500">Lab</span>
      </span>
    </span>
  );
}
