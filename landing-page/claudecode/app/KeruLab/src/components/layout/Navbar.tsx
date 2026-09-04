import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from '../ui/Button';
import { BookConsultationButton } from '../ui/BookConsultationButton';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useI18n } from '../../hooks/useI18n';
import { useScrolled } from '../../hooks/useScrolled';
import { sectionIds } from '../../config/site';
import { cn } from '../../lib/cn';
import type { Dictionary } from '../../i18n/types';

type NavKey = keyof Pick<
  Dictionary['nav'],
  'services' | 'erp' | 'ai' | 'industries' | 'process' | 'about' | 'contact'
>;

const navItems: { key: NavKey; href: string }[] = [
  { key: 'services', href: `#${sectionIds.services}` },
  { key: 'erp', href: `#${sectionIds.erp}` },
  { key: 'ai', href: `#${sectionIds.ai}` },
  { key: 'industries', href: `#${sectionIds.industries}` },
  { key: 'process', href: `#${sectionIds.process}` },
  { key: 'about', href: `#${sectionIds.about}` },
  { key: 'contact', href: `#${sectionIds.contact}` },
];

export function Navbar() {
  const { t } = useI18n();
  const scrolled = useScrolled(12);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Bloquea el scroll del documento mientras el menú móvil está abierto.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Cierre con Escape y foco atrapado dentro del panel.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'nav-glass border-b border-subtle shadow-sm shadow-black/5' : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-5 sm:px-6 lg:h-18 lg:px-8">
        <a href={`#${sectionIds.hero}`} className="shrink-0" aria-label="KERULab">
          <Logo />
        </a>

        <nav aria-label={t.a11y.mainNav} className="ml-auto hidden xl:block">
          <ul className="flex items-center">
            {navItems.map((item) => (
              <li key={item.key}>
                <a
                  href={item.href}
                  className="inline-flex min-h-9 items-center rounded-full px-2 text-[0.8125rem] whitespace-nowrap text-muted transition-colors hover:bg-surface-muted hover:text-fg"
                >
                  {t.nav[item.key]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 xl:ml-0">
          <span className="hidden sm:block">
            <LanguageSwitcher />
          </span>
          <ThemeToggle />
          <span className="hidden lg:block">
            <BookConsultationButton size="sm" className="whitespace-nowrap">
              {t.nav.book}
            </BookConsultationButton>
          </span>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
            className="inline-flex size-10 items-center justify-center rounded-full border border-subtle bg-surface text-fg transition-colors hover:border-strong xl:hidden"
          >
            {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 top-16 -z-10 cursor-default bg-black/40 backdrop-blur-[2px] xl:hidden"
            />

            <motion.div
              id="mobile-menu"
              ref={panelRef}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="nav-glass max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-subtle px-5 pt-2 pb-6 sm:px-6 xl:hidden"
            >
              <nav aria-label={t.a11y.mainNav}>
                <ul className="flex flex-col">
                  {navItems.map((item) => (
                    <li key={item.key}>
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex min-h-12 items-center border-b border-subtle text-base font-medium text-fg"
                      >
                        {t.nav[item.key]}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-5 flex flex-col gap-3">
                <BookConsultationButton fullWidth size="lg">
                  {t.nav.book}
                </BookConsultationButton>
                <BookConsultationButton intent="demo" variant="secondary" fullWidth size="lg">
                  {t.nav.demo}
                </BookConsultationButton>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3 sm:hidden">
                <LanguageSwitcher />
                <Button
                  as="a"
                  href={`#${sectionIds.contact}`}
                  variant="ghost"
                  size="sm"
                  onClick={() => setOpen(false)}
                >
                  {t.nav.contact}
                </Button>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
