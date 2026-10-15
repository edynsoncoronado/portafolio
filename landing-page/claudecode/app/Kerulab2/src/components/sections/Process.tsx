import { Hand } from '../ui/Hand';
import { Reveal } from '../ui/Reveal';
import { ArrowDoodle } from '../ui/Doodles';
import { content } from '../../content/es';
import { sectionIds } from '../../config/site';

export function Process() {
  const { process } = content;

  return (
    <section
      id={sectionIds.process}
      className="scroll-mt-24 rounded-[2.5rem] bg-paper px-5 py-16 sm:rounded-[3.5rem] sm:px-8 sm:py-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
            <ArrowDoodle flip className="hidden h-14 w-20 -rotate-12 text-mango-400 sm:block" />
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-600">
                {process.eyebrow}
              </p>
              <Hand className="mt-3">{process.title}</Hand>
            </div>
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-ink-soft">
            {process.subtitle}
          </p>
        </Reveal>

        <ol className="mt-12 grid gap-4 md:grid-cols-5">
          {process.steps.map((step, index) => (
            <Reveal key={step.name} delay={0.04 * index}>
              <li className="card-soft h-full px-5 py-5">
                <span className="font-hand text-3xl font-bold text-plum-300">0{index + 1}</span>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-teal-600">
                  {step.name}
                </p>
                <h3 className="mt-2 text-sm font-bold text-ink">{step.title}</h3>
                <p className="mt-3 rounded-xl bg-cream px-3 py-2 text-xs text-ink-soft">{step.output}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
