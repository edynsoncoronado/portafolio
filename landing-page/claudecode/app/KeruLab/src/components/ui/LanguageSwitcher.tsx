import { motion } from 'framer-motion';
import { useI18n } from '../../hooks/useI18n';
import { languages, type Language } from '../../i18n/types';
import { cn } from '../../lib/cn';

const labels: Record<Language, string> = { es: 'ES', en: 'EN' };

export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang, t } = useI18n();
  const names: Record<Language, string> = { es: t.a11y.spanish, en: t.a11y.english };

  return (
    <div
      role="group"
      aria-label={t.a11y.languageSelector}
      className={cn(
        'relative inline-flex items-center rounded-full border border-subtle bg-surface p-1',
        className,
      )}
    >
      {languages.map((code) => {
        const active = code === lang;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            aria-label={names[code]}
            className={cn(
              'relative z-10 min-h-8 rounded-full px-3 text-xs font-semibold transition-colors duration-200',
              active ? 'text-white' : 'text-muted hover:text-fg',
            )}
          >
            {active ? (
              <motion.span
                layoutId="language-pill"
                aria-hidden="true"
                className="absolute inset-0 -z-10 rounded-full bg-linear-to-r from-brand-500 to-ai-500"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            ) : null}
            {labels[code]}
          </button>
        );
      })}
    </div>
  );
}
