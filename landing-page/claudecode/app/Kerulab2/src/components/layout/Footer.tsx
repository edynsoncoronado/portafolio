import { Mail } from 'lucide-react';
import { Logo } from './Logo';
import { content } from '../../content/es';
import { siteConfig } from '../../config/site';

/** Iconos de marca: lucide no incluye logotipos, así que van en línea. */
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95C21.4 8.75 22 11 22 14.1V21h-4v-6.1c0-1.45-.03-3.3-2.02-3.3-2.02 0-2.33 1.57-2.33 3.2V21h-4V9Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
      <path d="M17.53 3h3.1l-6.77 7.74L21.75 21h-5.93l-4.64-6.07L5.86 21H2.75l7.24-8.28L2.25 3h6.08l4.2 5.55L17.53 3Zm-1.09 16.12h1.72L7.64 4.78H5.8l10.64 14.34Z" />
    </svg>
  );
}

export function Footer() {
  const { footer } = content;
  const year = new Date().getFullYear();

  return (
    <footer className="rounded-t-[2.5rem] bg-plum-900 px-5 py-14 text-plum-100 sm:rounded-t-[3.5rem] sm:px-8 sm:py-16">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-plum-100/70">{footer.description}</p>

            <div className="mt-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-plum-100/60">
                {footer.connectTitle}
              </h2>
              <ul className="mt-3 flex items-center gap-2">
                <li>
                  <a
                    href={siteConfig.social.linkedin}
                    aria-label="LinkedIn"
                    className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  >
                    <LinkedInIcon />
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.social.x}
                    aria-label="X"
                    className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  >
                    <XIcon />
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    aria-label="Correo"
                    className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  >
                    <Mail size={16} aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <nav aria-label="Navegación del pie de página" className="grid gap-8 sm:grid-cols-3">
            {footer.columns.map((column) => (
              <div key={column.title}>
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-plum-100/60">
                  {column.title}
                </h2>
                <ul className="mt-3 space-y-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-sm text-plum-100/80 transition hover:text-white">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-plum-100/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. {footer.rights}
          </p>
          <p>{footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
