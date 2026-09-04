import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

/** Texto con degradado de marca. Se anima suavemente salvo reduced-motion. */
export function GradientText({
  children,
  className,
  animate = true,
}: {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}) {
  return (
    <span className={cn('text-gradient', animate && 'animate-gradient', className)}>{children}</span>
  );
}
