import { ArrowRight } from 'lucide-react';
import { Hand, Underlined } from '../ui/Hand';
import { Reveal } from '../ui/Reveal';
import { Button } from '../ui/Button';
import { Sparkle, StarBurst } from '../ui/Doodles';
import { content } from '../../content/es';
import { CALENDAR_URL, DEMO_URL } from '../../config/site';

export function FinalCTA() {
  const { cta } = content;

  return (
    <section className="relative overflow-hidden bg-cream px-5 py-20 sm:px-8 sm:py-28">
      <StarBurst className="absolute left-[10%] top-12 hidden h-12 w-12 text-mango-400 lg:block" />
      <Sparkle className="absolute right-[12%] bottom-16 hidden text-teal-400 lg:block animate-float-slow" />

      <Reveal className="mx-auto w-full max-w-3xl text-center">
        <Hand as="h2" className="text-5xl sm:text-6xl">
          <Underlined color="coral">{cta.titleLead}</Underlined>
          <br />
          {cta.titleRest}
        </Hand>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-soft">{cta.subtitle}</p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={CALENDAR_URL === '#' ? '#contacto' : CALENDAR_URL} size="lg">
            {cta.primary}
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
          <Button href={DEMO_URL === '#' ? '#contacto' : DEMO_URL} variant="ghost" size="lg">
            {cta.secondary}
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
