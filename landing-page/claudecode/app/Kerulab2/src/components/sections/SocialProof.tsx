import { Quote } from 'lucide-react';
import { Hand, Underlined } from '../ui/Hand';
import { Reveal } from '../ui/Reveal';
import { content } from '../../content/es';

/** Iniciales y color de cada avatar decorativo de la fila superior. */
const avatars = [
  { initials: 'MG', tone: 'bg-plum-100 text-plum-600' },
  { initials: 'LR', tone: 'bg-teal-500/15 text-teal-600' },
  { initials: 'AS', tone: 'bg-mango-300/50 text-mango-500' },
  { initials: 'JP', tone: 'bg-coral-200/60 text-coral-500' },
  { initials: 'DV', tone: 'bg-plum-50 text-plum-500' },
  { initials: 'NC', tone: 'bg-teal-500/10 text-teal-600' },
  { initials: 'RB', tone: 'bg-mango-300/40 text-mango-500' },
  { initials: 'FT', tone: 'bg-coral-200/40 text-coral-500' },
];

export function SocialProof() {
  const { social } = content;

  return (
    <section className="bg-cream px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto w-full max-w-4xl text-center">
        <Reveal>
          <ul aria-hidden="true" className="flex flex-wrap items-center justify-center gap-2.5">
            {avatars.map((avatar) => (
              <li
                key={avatar.initials}
                className={`grid h-12 w-12 place-items-center rounded-2xl text-xs font-bold ${avatar.tone}`}
              >
                {avatar.initials}
              </li>
            ))}
          </ul>

          <Hand className="mt-8">
            {social.titleLead} <Underlined color="mango">{social.titleRest}</Underlined>
          </Hand>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-soft">{social.subtitle}</p>
        </Reveal>

        <Reveal delay={0.05}>
          <figure className="card-soft mx-auto mt-10 max-w-2xl px-6 py-7 text-left sm:px-8">
            <Quote size={26} className="text-mango-400" aria-hidden="true" />
            <blockquote className="mt-3 text-base leading-relaxed text-ink">
              {social.testimonial.quote}
            </blockquote>
            <figcaption className="mt-5 border-t border-line pt-4 text-sm">
              <span className="font-semibold text-ink">{social.testimonial.author}</span>
              <span className="block text-ink-soft">{social.testimonial.role}</span>
              <span className="mt-2 block text-xs text-ink-mute">{social.testimonial.note}</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
