import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

/** Titular manuscrito: el rasgo más reconocible de la marca. */
export function Hand({
  children,
  className,
  as: Tag = 'h2',
}: {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}) {
  return (
    <Tag
      className={cn(
        'font-hand font-bold leading-[1.05] tracking-tight text-ink',
        Tag === 'h1' ? 'text-5xl sm:text-6xl lg:text-7xl' : 'text-4xl sm:text-5xl',
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Palabra con trazo de rotulador detrás. */
export function Marker({
  children,
  color = 'coral',
  className,
}: {
  children: ReactNode;
  color?: 'coral' | 'mango' | 'teal' | 'plum';
  className?: string;
}) {
  const colors = {
    coral: 'var(--color-coral-200)',
    mango: 'var(--color-mango-300)',
    teal: '#b6e6e3',
    plum: 'var(--color-plum-100)',
  } as const;

  return (
    <span className={cn('marker', className)} style={{ ['--marker-color' as string]: colors[color] }}>
      <span aria-hidden="true" className="marker-stroke" />
      <span className="marker-text">{children}</span>
    </span>
  );
}

/** Palabra con subrayado dibujado a mano. */
export function Underlined({
  children,
  color = 'teal',
  className,
}: {
  children: ReactNode;
  color?: 'teal' | 'mango' | 'coral' | 'plum';
  className?: string;
}) {
  const colors = {
    teal: 'var(--color-teal-400)',
    mango: 'var(--color-mango-400)',
    coral: 'var(--color-coral-400)',
    plum: 'var(--color-plum-300)',
  } as const;

  return (
    <span className={cn('underline-hand', className)} style={{ ['--underline-color' as string]: colors[color] }}>
      {children}
    </span>
  );
}
