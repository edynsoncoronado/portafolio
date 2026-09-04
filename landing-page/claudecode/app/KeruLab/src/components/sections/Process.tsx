import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { processIcons } from '../../data/process';
import { useI18n } from '../../hooks/useI18n';
import { sectionIds } from '../../config/site';
import { fadeUp, viewportOnce } from '../../lib/motion';

/**
 * Línea de proceso Discover → Optimize con una barra de progreso que avanza
 * conforme se recorre la sección.
 */
export function Process() {
  const { t } = useI18n();
  const trackRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 75%', 'end 60%'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <Section id={sectionIds.process} labelledBy="process-title" tone="muted">
      <SectionHeading
        id="process-title"
        eyebrow={t.process.eyebrow}
        title={t.process.title}
        subtitle={t.process.subtitle}
      />

      <ol ref={trackRef} className="relative mt-14 space-y-5">
        {/* Riel y progreso, alineados con el centro de los indicadores. */}
        <span
          aria-hidden="true"
          className="absolute top-4 bottom-4 left-6 w-px -translate-x-1/2 bg-subtle sm:left-7"
        />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: progress }}
          className="absolute top-4 bottom-4 left-6 w-px origin-top -translate-x-1/2 bg-linear-to-b from-brand-500 via-ai-500 to-cyan-accent-500 sm:left-7"
        />

        {t.process.steps.map((step, index) => {
          const Icon = processIcons[index] ?? processIcons[0];

          return (
            <motion.li
              key={step.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="relative flex gap-4 sm:gap-6"
            >
              <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-2xl border border-subtle bg-surface shadow-sm sm:size-14">
                {Icon ? <Icon aria-hidden="true" className="size-5 text-brand-500" /> : null}
              </span>

              <div className="flex-1 rounded-2xl border border-subtle bg-surface p-5 transition-colors hover:border-strong">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="font-display text-sm font-bold text-faint tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="rounded-full border border-brand-500/25 bg-brand-500/10 px-2.5 py-0.5 text-xs font-medium text-brand-600 dark:text-brand-300">
                    {step.name}
                  </span>
                  <h3 className="text-base font-semibold sm:text-lg">{step.title}</h3>
                </div>
                <p className="mt-2 text-sm text-muted">{step.description}</p>
                <p className="mt-3 inline-flex items-center gap-2 rounded-lg bg-surface-muted px-3 py-1.5 text-xs text-faint">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-cyan-accent-500" />
                  {step.output}
                </p>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </Section>
  );
}
