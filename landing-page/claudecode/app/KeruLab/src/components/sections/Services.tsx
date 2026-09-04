import { ArrowRight, Check } from 'lucide-react';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { RevealGroup, RevealItem } from '../ui/Reveal';
import { GlowCard, CardIcon, accentText } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { BookConsultationButton } from '../ui/BookConsultationButton';
import { services } from '../../data/services';
import { useI18n } from '../../hooks/useI18n';
import { sectionIds } from '../../config/site';
import { cn } from '../../lib/cn';

export function Services() {
  const { t } = useI18n();

  return (
    <Section id={sectionIds.services} labelledBy="services-title" tone="muted">
      <SectionHeading
        id="services-title"
        eyebrow={t.services.eyebrow}
        title={t.services.title}
        subtitle={t.services.subtitle}
      />

      <RevealGroup step={0.1} className="mt-14 grid gap-6 lg:grid-cols-3">
        {services.map((service) => {
          const copy = t.services.items[service.id];

          return (
            <RevealItem key={service.id} className="h-full">
              <GlowCard accent={service.accent} className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-3">
                  <CardIcon icon={service.icon} accent={service.accent} />
                  <Badge tone={service.accent}>{copy.tag}</Badge>
                </div>

                <h3 className={cn('mt-5 text-xl font-semibold', accentText[service.accent])}>
                  {copy.name}
                </h3>
                <p className="mt-3 text-sm text-muted">{copy.description}</p>

                <p className="mt-6 text-xs font-semibold tracking-[0.14em] text-faint uppercase">
                  {t.services[service.listLabel]}
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {copy.list.map((entry) => (
                    <li
                      key={entry}
                      className="inline-flex items-center gap-1.5 rounded-full border border-subtle bg-bg-elevated px-2.5 py-1 text-xs text-muted"
                    >
                      <Check aria-hidden="true" className="size-3 text-brand-500" />
                      {entry}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap items-center gap-2 pt-7">
                  {service.action === 'demo' ? (
                    <BookConsultationButton intent="demo" size="sm">
                      {copy.cta}
                    </BookConsultationButton>
                  ) : (
                    <BookConsultationButton size="sm" withIcon={false}>
                      {copy.cta}
                    </BookConsultationButton>
                  )}

                  {service.detailHref ? (
                    <Button as="a" href={service.detailHref} variant="ghost" size="sm" icon={ArrowRight}>
                      {t.common.learnMore}
                    </Button>
                  ) : null}
                </div>
              </GlowCard>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
