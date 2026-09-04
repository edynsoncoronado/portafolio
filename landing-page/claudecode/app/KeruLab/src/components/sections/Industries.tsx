import { Check } from 'lucide-react';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { RevealGroup, RevealItem, Reveal } from '../ui/Reveal';
import { GlowCard, CardIcon, accentText } from '../ui/Card';
import { industries } from '../../data/industries';
import { useI18n } from '../../hooks/useI18n';
import { sectionIds } from '../../config/site';
import { cn } from '../../lib/cn';

export function Industries() {
  const { t } = useI18n();

  return (
    <Section id={sectionIds.industries} labelledBy="industries-title">
      <SectionHeading
        id="industries-title"
        eyebrow={t.industries.eyebrow}
        title={t.industries.title}
        subtitle={t.industries.subtitle}
      />

      <RevealGroup step={0.1} className="mt-14 grid gap-6 lg:grid-cols-3">
        {industries.map((industry) => {
          const copy = t.industries.items[industry.id];
          return (
            <RevealItem key={industry.id} className="h-full">
              <GlowCard accent={industry.accent} className="h-full">
                <CardIcon icon={industry.icon} accent={industry.accent} />
                <h3 className={cn('mt-4 text-xl font-semibold', accentText[industry.accent])}>
                  {copy.name}
                </h3>
                <p className="mt-2 text-sm text-muted">{copy.description}</p>
                <ul className="mt-5 space-y-2">
                  {copy.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-sm text-muted">
                      <Check aria-hidden="true" className="size-3.5 shrink-0 text-brand-500" />
                      {point}
                    </li>
                  ))}
                </ul>
              </GlowCard>
            </RevealItem>
          );
        })}
      </RevealGroup>

      <Reveal className="mt-8">
        <p className="mx-auto max-w-2xl rounded-xl border border-subtle bg-surface px-5 py-4 text-center text-sm text-muted">
          {t.industries.note}
        </p>
      </Reveal>
    </Section>
  );
}
