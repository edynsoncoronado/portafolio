import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { RevealGroup, RevealItem } from '../ui/Reveal';
import { CardIcon, accentText } from '../ui/Card';
import { technologyGroups } from '../../data/technology';
import { useI18n } from '../../hooks/useI18n';
import { sectionIds } from '../../config/site';
import { cn } from '../../lib/cn';

export function Technology() {
  const { t } = useI18n();

  return (
    <Section id={sectionIds.technology} labelledBy="technology-title" tone="muted">
      <SectionHeading
        id="technology-title"
        eyebrow={t.technology.eyebrow}
        title={t.technology.title}
        subtitle={t.technology.subtitle}
      />

      <RevealGroup step={0.05} className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {technologyGroups.map((group) => {
          const copy = t.technology.groups[group.id];
          return (
            <RevealItem key={group.id} className="h-full">
              <div className="h-full rounded-2xl border border-subtle bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-strong">
                <CardIcon icon={group.icon} accent={group.accent} className="size-10" />
                <h3 className={cn('mt-4 text-base font-semibold', accentText[group.accent])}>
                  {copy.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted">{copy.description}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {group.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md border border-subtle bg-bg-elevated px-2 py-0.5 text-[0.7rem] text-faint"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
