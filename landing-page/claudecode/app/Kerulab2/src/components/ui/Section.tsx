import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

type Props = {
  id?: string;
  children: ReactNode;
  /** Fondo de la sección: crema (por defecto), papel blanco o crema profundo. */
  tone?: 'cream' | 'paper' | 'deep';
  className?: string;
  /** Envuelve el contenido en una tarjeta blanca redondeada, como el sitio de referencia. */
  rounded?: boolean;
};

const tones = {
  cream: 'bg-cream',
  paper: 'bg-paper',
  deep: 'bg-cream-deep',
} as const;

export function Section({ id, children, tone = 'cream', className, rounded = false }: Props) {
  return (
    <section
      id={id}
      className={cn(
        tones[tone],
        rounded && 'rounded-[2.5rem] sm:rounded-[3.5rem]',
        'scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24',
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
