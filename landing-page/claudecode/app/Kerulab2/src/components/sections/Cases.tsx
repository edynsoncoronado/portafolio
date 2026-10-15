import { Hand } from '../ui/Hand';
import { Reveal } from '../ui/Reveal';
import { content } from '../../content/es';
import { sectionIds } from '../../config/site';

export function Cases() {
  const { cases } = content;

  return (
    <section id={sectionIds.cases} className="scroll-mt-24 bg-cream px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-teal-600">
            {cases.eyebrow}
          </p>
          <Hand className="mt-3 text-center">{cases.title}</Hand>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-ink-soft">
            {cases.subtitle}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {cases.items.map((item, index) => (
            <Reveal key={item.name} delay={0.04 * index}>
              <article className="card-soft h-full px-6 py-6">
                <span className="inline-block rounded-full bg-plum-50 px-3 py-1 text-[11px] font-semibold text-plum-600">
                  {item.category}
                </span>
                <h3 className="mt-3 text-lg font-bold text-ink">{item.name}</h3>

                <dl className="mt-4 space-y-3 text-sm">
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-mute">
                      {cases.labels.problem}
                    </dt>
                    <dd className="mt-0.5 leading-relaxed text-ink-soft">{item.problem}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-mute">
                      {cases.labels.solution}
                    </dt>
                    <dd className="mt-0.5 leading-relaxed text-ink-soft">{item.solution}</dd>
                  </div>
                  <div className="rounded-2xl bg-teal-500/8 px-4 py-3">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-teal-600">
                      {cases.labels.outcome}
                    </dt>
                    <dd className="mt-0.5 leading-relaxed text-ink">{item.outcome}</dd>
                  </div>
                </dl>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
