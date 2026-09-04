import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type Accent = 'brand' | 'ai' | 'cyan';

export const accentText: Record<Accent, string> = {
  brand: 'text-brand-600 dark:text-brand-300',
  ai: 'text-ai-600 dark:text-ai-300',
  cyan: 'text-cyan-accent-700 dark:text-cyan-accent-300',
};

export const accentSurface: Record<Accent, string> = {
  brand: 'bg-brand-500/10 border-brand-500/25',
  ai: 'bg-ai-500/10 border-ai-500/25',
  cyan: 'bg-cyan-accent-500/10 border-cyan-accent-500/25',
};

export const accentGlow: Record<Accent, string> = {
  brand: 'from-brand-500/25',
  ai: 'from-ai-500/25',
  cyan: 'from-cyan-accent-500/25',
};

export function Card({
  children,
  className,
  as: Component = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'li';
}) {
  return (
    <Component
      className={cn(
        'rounded-2xl border border-subtle bg-surface p-6 shadow-sm shadow-black/[0.03] dark:shadow-black/20',
        className,
      )}
    >
      {children}
    </Component>
  );
}

/**
 * Card con halo de color y elevación al pasar el cursor.
 * El halo es decorativo y no afecta al flujo ni al ancho de la página.
 */
export function GlowCard({
  children,
  className,
  accent = 'brand',
  interactive = true,
}: {
  children: ReactNode;
  className?: string;
  accent?: Accent;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        'group relative isolate h-full overflow-hidden rounded-2xl border border-subtle bg-surface p-6',
        'shadow-sm shadow-black/[0.03] transition-all duration-300 dark:shadow-black/20',
        interactive && 'hover:-translate-y-1 hover:border-strong hover:shadow-xl hover:shadow-brand-500/10',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute -top-24 -right-16 -z-10 size-48 rounded-full bg-radial to-transparent opacity-0 blur-2xl transition-opacity duration-500',
          accentGlow[accent],
          interactive && 'group-hover:opacity-100',
        )}
      />
      {children}
    </div>
  );
}

/** Icono en recuadro, usado en cards de servicios, capacidades e industrias. */
export function CardIcon({
  icon: Icon,
  accent = 'brand',
  className,
}: {
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
  accent?: Accent;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex size-11 items-center justify-center rounded-xl border',
        accentSurface[accent],
        accentText[accent],
        className,
      )}
    >
      <Icon aria-hidden="true" className="size-5" />
    </span>
  );
}
