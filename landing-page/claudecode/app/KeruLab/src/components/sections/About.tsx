import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal';
import { useI18n } from '../../hooks/useI18n';
import { sectionIds } from '../../config/site';

export function About() {
  const { t } = useI18n();

  return (
    <Section id={sectionIds.about} labelledBy="about-title">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-16">
        <div>
          <SectionHeading
            id="about-title"
            eyebrow={t.about.eyebrow}
            title={t.about.title}
            align="left"
          />
          <Reveal delay={0.1}>
            <div className="mt-6 space-y-4">
              {t.about.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        <RevealGroup step={0.08} className="grid gap-4 sm:grid-cols-2">
          {t.about.pillars.map((pillar) => (
            <RevealItem key={pillar.title} className="h-full">
              <div className="h-full rounded-2xl border border-subtle bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-strong">
                <p className="font-display font-semibold">{pillar.title}</p>
                <p className="mt-2 text-sm text-muted">{pillar.description}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
