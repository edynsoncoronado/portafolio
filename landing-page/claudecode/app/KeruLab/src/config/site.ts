/**
 * Punto único de configuración de la landing.
 *
 * Todos los enlaces externos y datos de contacto viven aquí para poder
 * cambiarlos sin tocar componentes. Los valores marcados con TODO son
 * placeholders: sustitúyelos por los definitivos cuando existan.
 */

/** TODO: URL pública de agendamiento (Google Calendar / Calendly / Cal.com).
 *  Mientras valga '#', los botones hacen scroll al formulario de contacto. */
export const CALENDAR_URL: string = '#';

/** TODO: URL del formulario o flujo de solicitud de demo del ERP. */
export const DEMO_URL: string = '#';

export const siteConfig = {
  name: 'KERULab',
  domain: 'kerulab.com',
  url: 'https://kerulab.com',
  /** TODO: correo de contacto definitivo. */
  email: 'hello@kerulab.com',
  /** TODO: teléfono de contacto (formato internacional). */
  phone: '+00 000 000 000',
  social: {
    /** TODO: perfil de empresa en LinkedIn. */
    linkedin: '#',
    /** TODO: perfil en X / Twitter (opcional). */
    x: '#',
    /** TODO: organización en GitHub (opcional). */
    github: '#',
  },
} as const;

/** Anclas de las secciones. Se usan en la navbar, el footer y los CTA. */
export const sectionIds = {
  hero: 'inicio',
  capabilities: 'capacidades',
  value: 'enfoque',
  services: 'servicios',
  erp: 'erp',
  ai: 'ia',
  industries: 'industrias',
  process: 'proceso',
  about: 'nosotros',
  projects: 'casos',
  technology: 'tecnologia',
  faq: 'faq',
  cta: 'cta',
  contact: 'contacto',
} as const;

export type SectionId = (typeof sectionIds)[keyof typeof sectionIds];
