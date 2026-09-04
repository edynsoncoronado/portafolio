import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useI18n } from '../../hooks/useI18n';
import { cn } from '../../lib/cn';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useI18n();
  const isDark = theme === 'dark';
  const label = isDark ? t.a11y.switchToLight : t.a11y.switchToDark;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      aria-pressed={isDark}
      className={cn(
        'relative inline-flex size-10 items-center justify-center rounded-full border border-subtle',
        'bg-surface text-muted transition-colors duration-200 hover:border-strong hover:text-fg',
        className,
      )}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.22 }}
          className="absolute inline-flex"
        >
          {isDark ? (
            <Moon aria-hidden="true" className="size-[18px]" />
          ) : (
            <Sun aria-hidden="true" className="size-[18px]" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
