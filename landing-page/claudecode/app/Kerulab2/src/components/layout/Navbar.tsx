import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from '../ui/Button';
import { content } from '../../content/es';
import { CALENDAR_URL, DEMO_URL } from '../../config/site';
import { cn } from '../../lib/cn';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Bloquea el scroll del cuerpo mientras el menú móvil está abierto.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-colors duration-300',
        scrolled ? 'bg-cream/90 backdrop-blur-md' : 'bg-cream',
      )}
    >
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8"
      >
        <a href="#inicio" className="shrink-0" aria-label="KERULab, ir al inicio">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {content.nav.links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-soft transition hover:bg-plum-50 hover:text-plum-600"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 sm:flex">
          <Button href={DEMO_URL === '#' ? '#contacto' : DEMO_URL} variant="ghost" size="sm">
            {content.nav.demo}
          </Button>
          <Button href={CALENDAR_URL === '#' ? '#contacto' : CALENDAR_URL} variant="primary" size="sm">
            {content.nav.book}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? content.nav.closeMenu : content.nav.openMenu}
          className="grid h-10 w-10 place-items-center rounded-full border border-line bg-paper text-ink lg:hidden"
        >
          {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        </button>
      </nav>

      {open && (
        <div id="menu-movil" className="border-t border-line bg-cream px-5 pb-6 pt-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {content.nav.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2.5 text-base font-medium text-ink-soft hover:bg-plum-50 hover:text-plum-600"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            <Button
              href={DEMO_URL === '#' ? '#contacto' : DEMO_URL}
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              {content.nav.demo}
            </Button>
            <Button
              href={CALENDAR_URL === '#' ? '#contacto' : CALENDAR_URL}
              variant="primary"
              onClick={() => setOpen(false)}
            >
              {content.nav.book}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
