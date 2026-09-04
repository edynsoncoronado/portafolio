import { ArrowRight, CalendarDays } from 'lucide-react';
import { Button, type ButtonSize, type ButtonVariant } from './Button';
import { CALENDAR_URL, DEMO_URL, sectionIds } from '../../config/site';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export type BookingIntent = 'consultation' | 'demo';

/** Altura reservada para la navbar fija (coincide con scroll-padding-top). */
const HEADER_OFFSET = 88;

interface BookConsultationButtonProps {
  children: string;
  intent?: BookingIntent;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  withIcon?: boolean;
}

/**
 * Único punto de entrada a los CTA de agendamiento y demo.
 *
 * Mientras `CALENDAR_URL` / `DEMO_URL` valgan '#', el botón lleva al
 * formulario de contacto. Al configurar la URL real (Google Calendar,
 * Calendly…) en `src/config/site.ts`, todos los CTA pasan a abrirla sin
 * tocar ningún componente.
 */
export function BookConsultationButton({
  children,
  intent = 'consultation',
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
  withIcon = true,
}: BookConsultationButtonProps) {
  const reducedMotion = usePrefersReducedMotion();
  const url = intent === 'consultation' ? CALENDAR_URL : DEMO_URL;
  const configured = url !== '#' && url.length > 0;
  const icon = withIcon ? (intent === 'consultation' ? CalendarDays : ArrowRight) : undefined;

  if (configured) {
    return (
      <Button
        as="a"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        className={className}
        icon={icon}
      >
        {children}
      </Button>
    );
  }

  const scrollToContact = () => {
    const target = document.getElementById(sectionIds.contact);
    if (!target) return;
    // Mismo desplazamiento que un ancla: deja libre la altura de la navbar.
    const offset = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top: offset, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <Button
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      className={className}
      icon={icon}
      onClick={scrollToContact}
    >
      {children}
    </Button>
  );
}
