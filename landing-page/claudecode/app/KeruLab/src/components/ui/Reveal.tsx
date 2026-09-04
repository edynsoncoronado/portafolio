import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { fadeUp, stagger, viewportOnce } from '../../lib/motion';

/** Aparición al entrar en pantalla. Se ejecuta una sola vez por elemento. */
export function Reveal({
  children,
  className,
  delay = 0,
  variants = fadeUp,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
}) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Contenedor que escalona la entrada de sus hijos.
 * Los hijos deben ser `<RevealItem>` (o cualquier `motion` con variantes
 * `hidden` / `visible`): heredan el estado del contenedor.
 */
export function RevealGroup({
  children,
  className,
  step = 0.08,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  step?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={stagger(step, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  );
}

/** Hijo de `<RevealGroup>`: hereda el disparo y aplica su propio retardo. */
export function RevealItem({
  children,
  className,
  variants = fadeUp,
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}) {
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
