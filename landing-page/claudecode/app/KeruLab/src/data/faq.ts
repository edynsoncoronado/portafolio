import type { Dictionary } from '../i18n/types';

export type FaqId = keyof Dictionary['faq']['items'];

/** Orden de aparición de las preguntas frecuentes. */
export const faqOrder: FaqId[] = [
  'custom',
  'integration',
  'erp',
  'discovery',
  'smes',
  'demo',
  'booking',
];
