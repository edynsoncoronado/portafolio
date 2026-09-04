import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { RevealGroup, RevealItem } from '../ui/Reveal';
import { useI18n } from '../../hooks/useI18n';
import { sectionIds } from '../../config/site';
import { fadeUp, stagger, viewportOnce } from '../../lib/motion';

const stepTone = [
  'border-brand-500/30 bg-brand-500/10 text-brand-600 dark:text-brand-300',
  'border-cyan-accent-500/30 bg-cyan-accent-500/10 text-cyan-accent-700 dark:text-cyan-accent-300',
  'border-ai-500/30 bg-ai-500/10 text-ai-600 dark:text-ai-300',
  'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
];

export function ValueProposition() {
  const { t } = useI18n();

  return (
    <Section id={sectionIds.value} labelledBy="value-title">
      <SectionHeading
        id="value-title"
        eyebrow={t.value.eyebrow}
        title={t.value.title}
        subtitle={t.value.intro}
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div>
          <h3 className="text-lg font-semibold">{t.value.problemsTitle}</h3>
          <RevealGroup step={0.05} className="mt-5 grid gap-3 sm:grid-cols-2">
            {t.value.problems.map((problem) => (
              <RevealItem key={problem.title}>
                <div className="h-full rounded-xl border border-subtle bg-surface p-4 transition-colors hover:border-strong">
                  <p className="text-sm font-medium">{problem.title}</p>
                  <p className="mt-1.5 text-xs text-muted">{problem.description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative rounded-2xl border border-subtle bg-bg-elevated p-6 sm:p-8"
        >
          <motion.h3 variants={fadeUp} className="text-lg font-semibold">
            {t.value.philosophyTitle}
          </motion.h3>
          <motion.p variants={fadeUp} className="mt-1 text-sm text-muted">
            {t.value.philosophySubtitle}
          </motion.p>

          <ol className="mt-6 space-y-4">
            {t.value.philosophy.map((item, index) => (
              <motion.li key={item.step} variants={fadeUp} className="flex gap-4">
                <span className="flex flex-col items-center">
                  <span
                    className={`inline-flex size-9 shrink-0 items-center justify-center rounded-xl border text-xs font-semibold ${stepTone[index] ?? stepTone[0]}`}
                  >
                    {index + 1}
                  </span>
                  {index < t.value.philosophy.length - 1 ? (
                    <span aria-hidden="true" className="mt-1 h-full w-px flex-1 bg-linear-to-b from-subtle to-transparent" />
                  ) : null}
                </span>
                <span className="pb-2">
                  <span className="block font-display font-semibold">{item.step}</span>
                  <span className="mt-0.5 block text-sm text-muted">{item.description}</span>
                </span>
              </motion.li>
            ))}
          </ol>

          <motion.p
            variants={fadeUp}
            className="mt-6 flex items-center gap-2 rounded-xl border border-brand-500/25 bg-brand-500/5 px-4 py-3 text-sm text-muted"
          >
            <Check aria-hidden="true" className="size-4 shrink-0 text-brand-500" />
            <span className="flex flex-wrap items-center gap-x-1.5">
              {t.value.philosophy.map((item, index) => (
                <span key={item.step} className="inline-flex items-center gap-1.5">
                  <span className="font-medium text-fg">{item.step}</span>
                  {index < t.value.philosophy.length - 1 ? (
                    <ArrowRight aria-hidden="true" className="size-3 text-faint" />
                  ) : null}
                </span>
              ))}
            </span>
          </motion.p>
        </motion.div>
      </div>
    </Section>
  );
}
