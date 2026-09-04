import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { BookConsultationButton } from '../ui/BookConsultationButton';
import { GradientText } from '../ui/GradientText';
import { GridBackdrop } from '../visuals/GridBackdrop';
import { HeroFlow } from '../visuals/HeroFlow';
import { useI18n } from '../../hooks/useI18n';
import { sectionIds } from '../../config/site';
import { EASE_OUT_EXPO, fadeUp, stagger } from '../../lib/motion';

export function Hero() {
  const { t } = useI18n();

  return (
    <section id={sectionIds.hero} aria-labelledby="hero-title" className="relative overflow-x-clip pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-24">
      <GridBackdrop />

      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:px-8">
        <motion.div variants={stagger(0.09)} initial="hidden" animate="visible">
          <motion.p
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-subtle bg-surface/70 px-3 py-1.5 text-xs font-medium text-muted backdrop-blur-sm"
          >
            <Sparkles aria-hidden="true" className="size-3.5 text-ai-500" />
            {t.hero.eyebrow}
          </motion.p>

          <motion.h1
            id="hero-title"
            variants={fadeUp}
            className="mt-6 text-[2.1rem] leading-[1.1] font-semibold sm:text-5xl lg:text-[3.1rem]"
          >
            {t.hero.titleLead} <GradientText>{t.hero.titleGradient}</GradientText>.
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-base text-muted sm:text-lg">
            {t.hero.subtitle}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <BookConsultationButton size="lg">{t.hero.ctaPrimary}</BookConsultationButton>
            <Button as="a" href={`#${sectionIds.services}`} variant="secondary" size="lg" icon={ArrowRight}>
              {t.hero.ctaSecondary}
            </Button>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-6 max-w-md text-sm text-faint">
            {t.hero.note}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        >
          <HeroFlow />
        </motion.div>
      </div>
    </section>
  );
}
