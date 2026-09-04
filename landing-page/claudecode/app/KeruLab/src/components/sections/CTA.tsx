import { motion } from 'framer-motion';
import { BookConsultationButton } from '../ui/BookConsultationButton';
import { GradientText } from '../ui/GradientText';
import { useI18n } from '../../hooks/useI18n';
import { sectionIds } from '../../config/site';
import { fadeUp, stagger, viewportOnce } from '../../lib/motion';

export function CTA() {
  const { t } = useI18n();

  return (
    <section
      id={sectionIds.cta}
      aria-labelledby="cta-title"
      className="relative overflow-x-clip py-20 sm:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative isolate overflow-hidden rounded-3xl border border-subtle bg-bg-elevated px-6 py-14 text-center sm:px-12 sm:py-16"
        >
          <span
            aria-hidden="true"
            className="grid-backdrop pointer-events-none absolute inset-0 -z-10 opacity-70"
          />
          <span
            aria-hidden="true"
            className="animate-pulse-glow pointer-events-none absolute -top-24 left-1/2 -z-10 size-96 -translate-x-1/2 rounded-full bg-radial from-ai-500/30 to-transparent blur-3xl"
          />

          <motion.h2
            id="cta-title"
            variants={fadeUp}
            className="mx-auto max-w-2xl text-3xl font-semibold sm:text-4xl"
          >
            <GradientText>{t.cta.title}</GradientText>
          </motion.h2>

          <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-muted sm:text-lg">
            {t.cta.subtitle}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"
          >
            <BookConsultationButton size="lg">{t.cta.primary}</BookConsultationButton>
            <BookConsultationButton intent="demo" variant="secondary" size="lg">
              {t.cta.secondary}
            </BookConsultationButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
