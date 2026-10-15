import { GraduationCap, HeartPulse, Factory } from 'lucide-react';
import { Hand } from '../ui/Hand';
import { Reveal } from '../ui/Reveal';
import { content } from '../../content/es';
import { sectionIds } from '../../config/site';

const icons = [Factory, HeartPulse, GraduationCap];
const tones = ['bg-plum-50 text-plum-500', 'bg-coral-200/50 text-coral-500', 'bg-teal-500/10 text-teal-600'];

export function Industries() {
  const { industries } = content;

  return (
    <section id={sectionIds.industries} className="scroll-mt-24 bg-cream px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-teal-600">
            {industries.eyebrow}
          </p>
          <Hand className="mt-3 text-center">{industries.title}</Hand>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-ink-soft">
            {industries.subtitle}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {industries.items.map((item, index) => {
            const Icon = icons[index % icons.length] ?? Factory;
            return (
              <Reveal key={item.name} delay={0.05 * index}>
                <article className="card-soft h-full px-6 py-6">
                  <span
                    aria-hidden="true"
                    className={`grid h-11 w-11 place-items-center rounded-2xl ${tones[index % tones.length]}`}
                  >
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-ink">{item.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {item.points.map((point) => (
                      <li
                        key={point}
                        className="rounded-full bg-cream px-2.5 py-1 text-[11px] font-medium text-ink-soft"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-2xl text-center font-hand text-2xl text-plum-600">
            {industries.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
