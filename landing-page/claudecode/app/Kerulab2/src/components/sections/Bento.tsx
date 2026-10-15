import { ArrowRight } from 'lucide-react';
import { Hand, Marker } from '../ui/Hand';
import { Reveal } from '../ui/Reveal';
import { content } from '../../content/es';
import { sectionIds } from '../../config/site';

export function Bento() {
  const { bento } = content;

  return (
    <section id={sectionIds.bento} className="scroll-mt-24 bg-cream px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <Hand className="max-w-xl">
            {bento.titleLead}
            <br />
            <Marker color="teal">{bento.titleMarker}</Marker>
          </Hand>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {bento.cards.map((card, index) => (
            <Reveal key={card.title} delay={0.04 * index}>
              <article className="card-soft flex h-full flex-col px-6 py-6">
                <h3 className="text-base font-bold text-ink">{card.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{card.body}</p>
                {'cta' in card && card.cta ? (
                  <a
                    href="#contacto"
                    className="mt-4 inline-flex items-center gap-1.5 self-start rounded-full border border-line px-3.5 py-1.5 text-xs font-semibold text-plum-600 transition hover:border-plum-300 hover:bg-plum-50"
                  >
                    {card.cta}
                    <ArrowRight size={13} aria-hidden="true" />
                  </a>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
