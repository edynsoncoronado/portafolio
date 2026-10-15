import { Hand } from '../ui/Hand';
import { Reveal } from '../ui/Reveal';
import { DashboardMockup } from '../visuals/DashboardMockup';
import { DashRows } from '../ui/Doodles';
import { content } from '../../content/es';
import { sectionIds } from '../../config/site';

export function Productivity() {
  const { productivity } = content;

  return (
    <section id={sectionIds.erp} className="scroll-mt-24 bg-paper px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <Hand className="text-center">{productivity.title}</Hand>
          <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-ink-soft">
            {productivity.subtitle}
          </p>
        </Reveal>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal delay={0.05}>
            <DashboardMockup />
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <DashRows className="mb-6 text-mango-400" />
              <ul className="space-y-5">
                {productivity.stats.map((stat) => (
                  <li key={stat.label} className="border-l-2 border-plum-100 pl-4">
                    <p className="font-hand text-4xl font-bold text-plum-500">{stat.value}</p>
                    <p className="text-sm font-semibold text-ink">{stat.label}</p>
                    <p className="mt-0.5 text-sm text-ink-soft">{stat.hint}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-cream px-3.5 py-1.5 text-xs font-medium text-ink-mute">
                {productivity.compare}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
