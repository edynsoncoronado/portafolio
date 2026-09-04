import type { es } from './es';

/** El diccionario español define la forma que debe cumplir cualquier idioma. */
export type Dictionary = typeof es;

export const languages = ['es', 'en'] as const;
export type Language = (typeof languages)[number];

export function isLanguage(value: unknown): value is Language {
  return value === 'es' || value === 'en';
}
