/**
 * Punto único de configuración de la landing (versión 2).
 *
 * Los enlaces externos y datos de contacto viven aquí para poder cambiarlos
 * sin tocar los componentes. Los valores marcados con TODO son placeholders.
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
  apps: 'aplicaciones',
  quality: 'calidad',
  erp: 'erp',
  ai: 'ia',
  bento: 'enfoque',
  industries: 'industrias',
  process: 'proceso',
  cases: 'casos',
  faq: 'faq',
  contact: 'contacto',
} as const;

export type SectionId = (typeof sectionIds)[keyof typeof sectionIds];
