import { RevealGroup, RevealItem } from '../ui/Reveal';
import { CardIcon, accentText } from '../ui/Card';
import { capabilities } from '../../data/capabilities';
import { useI18n } from '../../hooks/useI18n';
import { sectionIds } from '../../config/site';
import { cn } from '../../lib/cn';

/** Banda de capacidades justo debajo del Hero: qué hace KERULab, de un vistazo. */
export function Capabilities() {
  const { t } = useI18n();

  return (
    <section
      id={sectionIds.capabilities}
      aria-labelledby="capabilities-title"
      className="relative overflow-x-clip border-y border-subtle bg-bg-elevated py-14 sm:py-16"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-brand-600 uppercase dark:text-brand-300">
              {t.capabilities.eyebrow}
            </p>
            <h2 id="capabilities-title" className="mt-2 text-2xl font-semibold sm:text-3xl">
              {t.capabilities.title}
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted">{t.capabilities.subtitle}</p>
        </div>

        <RevealGroup
          step={0.06}
          className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
        >
          {capabilities.map((capability) => {
            const copy = t.capabilities.items[capability.id];
            return (
              <RevealItem key={capability.id}>
                <div className="group h-full rounded-2xl border border-subtle bg-surface p-4 transition-all duration-300 hover:-translate-y-1 hover:border-strong hover:shadow-lg hover:shadow-brand-500/5">
                  <CardIcon icon={capability.icon} accent={capability.accent} className="size-10" />
                  <p className={cn('mt-3 text-sm font-semibold', accentText[capability.accent])}>
                    {copy.title}
                  </p>
                  <p className="mt-1 text-xs text-muted">{copy.description}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
