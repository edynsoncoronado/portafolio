import { useContext } from 'react';
import { I18nContext, type I18nValue } from '../i18n';

/** Acceso tipado al diccionario activo y al cambio de idioma. */
export function useI18n(): I18nValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n debe usarse dentro de <I18nProvider>');
  }
  return context;
}
