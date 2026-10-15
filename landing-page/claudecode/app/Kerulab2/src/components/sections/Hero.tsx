import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Hand, Marker } from '../ui/Hand';
import { ArrowDoodle, Sparkle, StarBurst } from '../ui/Doodles';
import { content } from '../../content/es';
import { CALENDAR_URL, sectionIds } from '../../config/site';

export function Hero() {
  const { hero } = content;

  return (
    <section id={sectionIds.hero} className="relative overflow-hidden bg-cream px-5 pb-10 pt-12 sm:px-8 sm:pt-20">
      {/* Ornamentos dibujados a mano */}
      <Sparkle className="absolute left-[6%] top-24 hidden text-mango-400 lg:block animate-float-slow" />
      <StarBurst className="absolute right-[8%] top-16 hidden text-teal-400/70 lg:block" />

      <div className="mx-auto w-full max-w-4xl text-center">
        <Hand as="h1">
          {hero.titleTop}
          <br />
          <Marker color="mango">{hero.titleMarker}</Marker>
        </Hand>

        <Hand as="p" className="mt-4 text-3xl text-plum-600 sm:text-4xl">
          {hero.subtitle}
        </Hand>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={CALENDAR_URL === '#' ? '#contacto' : CALENDAR_URL} size="lg">
            {hero.ctaPrimary}
          </Button>
          <Button href="#contacto" variant="ghost" size="lg">
            {hero.ctaSecondary}
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </div>

        <p className="mx-auto mt-6 max-w-xl text-sm text-ink-soft">{hero.note}</p>

        <div className="mt-6 flex flex-col items-center gap-1 sm:flex-row sm:justify-center">
          <ArrowDoodle className="h-14 w-20 rotate-[8deg] text-plum-300 sm:h-16 sm:w-24" />
          <p className="max-w-md font-hand text-xl text-plum-600 sm:text-2xl">{hero.badge}</p>
        </div>
      </div>
    </section>
  );
}
