import { BrainCircuit, ChartColumn, Check, FileSearch, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal';
import { GlowCard, CardIcon } from '../ui/Card';
import { AIFlow } from '../visuals/AIFlow';
import { AIAssistantMockup } from '../visuals/AIAssistantMockup';
import { useI18n } from '../../hooks/useI18n';
import { sectionIds } from '../../config/site';
import type { Accent } from '../ui/Card';
import type { Dictionary } from '../../i18n/types';

type AiItemId = keyof Dictionary['ai']['items'];

const items: { id: AiItemId; icon: LucideIcon; accent: Accent }[] = [
  { id: 'assistant', icon: BrainCircuit, accent: 'ai' },
  { id: 'rag', icon: FileSearch, accent: 'brand' },
  { id: 'automation', icon: Zap, accent: 'cyan' },
  { id: 'dashboards', icon: ChartColumn, accent: 'ai' },
];

export function AISolutions() {
  const { t } = useI18n();

  return (
    <Section id={sectionIds.ai} labelledBy="ai-title" tone="muted">
      <SectionHeading id="ai-title" eyebrow={t.ai.eyebrow} title={t.ai.title} subtitle={t.ai.subtitle} />

      <RevealGroup step={0.08} className="mt-14 grid gap-5 sm:grid-cols-2">
        {items.map((item) => {
          const copy = t.ai.items[item.id];
          return (
            <RevealItem key={item.id} className="h-full">
              <GlowCard accent={item.accent} className="h-full">
                <CardIcon icon={item.icon} accent={item.accent} />
                <h3 className="mt-4 text-lg font-semibold">{copy.title}</h3>
                <p className="mt-2 text-sm text-muted">{copy.description}</p>
                <ul className="mt-4 space-y-1.5">
                  {copy.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-muted">
                      <Check aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-cyan-accent-500" />
                      {point}
                    </li>
                  ))}
                </ul>

                {item.id === 'rag' ? (
                  <div className="mt-5 border-t border-subtle pt-4">
                    <p className="text-xs font-semibold tracking-[0.14em] text-faint uppercase">
                      {t.ai.ragExamplesTitle}
                    </p>
                    <ul className="mt-2.5 flex flex-wrap gap-1.5">
                      {t.ai.ragExamples.map((example) => (
                        <li
                          key={example}
                          className="rounded-full border border-subtle bg-bg-elevated px-2.5 py-1 text-xs text-muted"
                        >
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </GlowCard>
            </RevealItem>
          );
        })}
      </RevealGroup>

      <Reveal className="mt-14">
        <h3 className="text-lg font-semibold">{t.ai.architectureTitle}</h3>
        <p className="mt-2 max-w-2xl text-sm text-muted">{t.ai.architectureSubtitle}</p>
        <div className="mt-5">
          <AIFlow />
        </div>
      </Reveal>

      <Reveal className="mx-auto mt-10 max-w-2xl">
        <AIAssistantMockup />
      </Reveal>
    </Section>
  );
}
