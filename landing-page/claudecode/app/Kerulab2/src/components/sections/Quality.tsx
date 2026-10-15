import { Check } from 'lucide-react';
import { Hand, Marker } from '../ui/Hand';
import { Reveal } from '../ui/Reveal';
import { InvoiceMockup } from '../visuals/InvoiceMockup';
import { content } from '../../content/es';
import { sectionIds } from '../../config/site';

export function Quality() {
  const { quality } = content;

  return (
    <section
      id={sectionIds.quality}
      className="scroll-mt-24 rounded-t-[2.5rem] bg-paper px-5 py-16 sm:rounded-t-[3.5rem] sm:px-8 sm:py-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <Hand className="text-center">
            <Marker color="coral">{quality.titleMarker}</Marker> {quality.titleRest}
          </Hand>
          <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-ink-soft">
            {quality.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mt-12">
          <InvoiceMockup />
        </Reveal>

        <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
          {quality.bullets.map((bullet, index) => (
            <Reveal key={bullet.title} delay={0.05 * index}>
              <li className="card-soft h-full px-5 py-5">
                <span
                  aria-hidden="true"
                  className="grid h-8 w-8 place-items-center rounded-full bg-teal-500/10 text-teal-600"
                >
                  <Check size={16} />
                </span>
                <h3 className="mt-3 text-sm font-semibold text-ink">{bullet.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{bullet.description}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
