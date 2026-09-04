import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { RevealGroup, RevealItem } from '../ui/Reveal';
import { GlowCard, CardIcon } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ProjectVisual } from '../visuals/ProjectVisual';
import { projects } from '../../data/projects';
import { useI18n } from '../../hooks/useI18n';
import { sectionIds } from '../../config/site';

export function Projects() {
  const { t } = useI18n();

  return (
    <Section id={sectionIds.projects} labelledBy="projects-title">
      <SectionHeading
        id="projects-title"
        eyebrow={t.projects.eyebrow}
        title={t.projects.title}
        subtitle={t.projects.subtitle}
      />

      <RevealGroup step={0.09} className="mt-14 grid gap-6 lg:grid-cols-2">
        {projects.map((project) => {
          const copy = t.projects.items[project.id];

          return (
            <RevealItem key={project.id} className="h-full">
              <GlowCard accent={project.accent} className="h-full">
                <article>
                  <div className="flex items-start justify-between gap-3">
                    <CardIcon icon={project.icon} accent={project.accent} />
                    <Badge tone="neutral">{t.common.useCase}</Badge>
                  </div>

                  <p className="mt-5 text-xs font-semibold tracking-[0.14em] text-faint uppercase">
                    {copy.category}
                  </p>
                  <h3 className="mt-1.5 text-lg font-semibold sm:text-xl">{copy.name}</h3>

                  <div className="mt-4">
                    <ProjectVisual variant={project.visual} />
                  </div>

                  <dl className="mt-5 space-y-3 text-sm">
                    <div>
                      <dt className="text-xs font-semibold tracking-wide text-faint uppercase">
                        {t.projects.labels.problem}
                      </dt>
                      <dd className="mt-1 text-muted">{copy.problem}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold tracking-wide text-faint uppercase">
                        {t.projects.labels.solution}
                      </dt>
                      <dd className="mt-1 text-muted">{copy.solution}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold tracking-wide text-faint uppercase">
                        {t.projects.labels.outcome}
                      </dt>
                      <dd className="mt-1 text-fg">{copy.outcome}</dd>
                    </div>
                  </dl>
                </article>
              </GlowCard>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
