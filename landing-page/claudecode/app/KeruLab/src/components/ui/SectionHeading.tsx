import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger, viewportOnce } from '../../lib/motion';
import { cn } from '../../lib/cn';

interface SectionHeadingProps {
  /** Id del <h2>, referenciado por `aria-labelledby` de la sección. */
  id: string;
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <motion.header
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      <motion.p
        variants={fadeUp}
        className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-brand-600 uppercase dark:text-brand-300"
      >
        <span aria-hidden="true" className="h-px w-6 bg-linear-to-r from-transparent to-brand-500" />
        {eyebrow}
      </motion.p>

      <motion.h2
        id={id}
        variants={fadeUp}
        className={cn(
          'text-3xl leading-[1.12] font-semibold sm:text-4xl lg:text-[2.75rem]',
          align === 'center' ? 'max-w-3xl' : 'max-w-2xl',
        )}
      >
        {title}
      </motion.h2>

      {subtitle ? (
        <motion.p
          variants={fadeUp}
          className={cn('text-base text-muted sm:text-lg', align === 'center' ? 'max-w-2xl' : 'max-w-xl')}
        >
          {subtitle}
        </motion.p>
      ) : null}
    </motion.header>
  );
}
