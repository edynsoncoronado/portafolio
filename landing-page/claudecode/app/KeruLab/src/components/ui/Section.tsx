import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface SectionProps {
  id: string;
  /** Id del encabezado que da nombre accesible a la sección. */
  labelledBy?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  /** Fondo alternativo para separar secciones contiguas. */
  tone?: 'default' | 'muted';
}

export function Section({
  id,
  labelledBy,
  children,
  className,
  containerClassName,
  tone = 'default',
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        'relative overflow-x-clip py-20 sm:py-24 lg:py-28',
        tone === 'muted' && 'bg-bg-elevated',
        className,
      )}
    >
      <div className={cn('mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8', containerClassName)}>
        {children}
      </div>
    </section>
  );
}
