import { Boxes, BrainCircuit, ChartColumn, Info, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal';
import { CardIcon } from '../ui/Card';
import { BookConsultationButton } from '../ui/BookConsultationButton';
import { ERPDashboardMockup } from '../visuals/ERPDashboardMockup';
import { useI18n } from '../../hooks/useI18n';
import { sectionIds } from '../../config/site';
import type { Accent } from '../ui/Card';

const pillarVisuals: { icon: LucideIcon; accent: Accent }[] = [
  { icon: Boxes, accent: 'cyan' },
  { icon: Zap, accent: 'brand' },
  { icon: BrainCircuit, accent: 'ai' },
  { icon: ChartColumn, accent: 'cyan' },
];

export function ERPSection() {
  const { t } = useI18n();

  return (
    <Section id={sectionIds.erp} labelledBy="erp-title">
      <SectionHeading
        id="erp-title"
        eyebrow={t.erp.eyebrow}
        title={t.erp.title}
        subtitle={t.erp.subtitle}
      />

      <Reveal className="mt-12">
        <ERPDashboardMockup />
      </Reveal>

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <Reveal>
          <h3 className="text-lg font-semibold">{t.erp.pillarsTitle}</h3>
          <p className="mt-3 flex items-start gap-2.5 rounded-xl border border-cyan-accent-500/25 bg-cyan-accent-500/5 p-4 text-sm text-muted">
            <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-cyan-accent-600 dark:text-cyan-accent-300" />
            {t.erp.odooNote}
          </p>
          <div className="mt-5">
            <BookConsultationButton intent="demo" size="lg">
              {t.erp.cta}
            </BookConsultationButton>
          </div>
        </Reveal>

        <RevealGroup step={0.08} className="grid gap-4 sm:grid-cols-2">
          {t.erp.pillars.map((pillar, index) => {
            const visual = pillarVisuals[index] ?? pillarVisuals[0];
            if (!visual) return null;

            return (
              <RevealItem key={pillar.title} className="h-full">
                <div className="h-full rounded-2xl border border-subtle bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-strong">
                  <CardIcon icon={visual.icon} accent={visual.accent} />
                  <p className="mt-4 font-display font-semibold">{pillar.title}</p>
                  <p className="mt-1.5 text-sm text-muted">{pillar.description}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </Section>
  );
}
