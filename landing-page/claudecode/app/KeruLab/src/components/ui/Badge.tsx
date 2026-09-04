import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/cn';

export type BadgeTone = 'brand' | 'ai' | 'cyan' | 'neutral';

const tones: Record<BadgeTone, string> = {
  brand: 'border-brand-500/30 bg-brand-500/10 text-brand-600 dark:text-brand-300',
  ai: 'border-ai-500/30 bg-ai-500/10 text-ai-600 dark:text-ai-300',
  cyan: 'border-cyan-accent-500/30 bg-cyan-accent-500/10 text-cyan-accent-700 dark:text-cyan-accent-300',
  neutral: 'border-subtle bg-surface-muted text-muted',
};

export function Badge({
  children,
  tone = 'neutral',
  icon: Icon,
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide',
        tones[tone],
        className,
      )}
    >
      {Icon ? <Icon aria-hidden="true" className="size-3.5" /> : null}
      {children}
    </span>
  );
}
