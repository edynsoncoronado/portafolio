import { Mail } from 'lucide-react';
import { Logo } from './Logo';
import { useI18n } from '../../hooks/useI18n';
import { sectionIds, siteConfig } from '../../config/site';

/** Iconos de marca: lucide ya no incluye logotipos de terceros. */
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.71h.05c.53-.95 1.83-1.96 3.77-1.96 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.5c0-1.31-.03-3-1.9-3-1.9 0-2.19 1.42-2.19 2.9V21h-4V9Z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.53 3h3.02l-6.6 7.54L21.75 21h-6.09l-4.77-6.23L5.4 21H2.38l7.06-8.07L2.25 3h6.24l4.31 5.7L17.53 3Zm-1.06 16.2h1.67L7.6 4.71H5.81L16.47 19.2Z" />
    </svg>
  );
}

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  const columns = [
    {
      title: t.footer.solutionsTitle,
      links: [
        { label: t.footer.solutions.consulting, href: `#${sectionIds.services}` },
        { label: t.footer.solutions.erp, href: `#${sectionIds.erp}` },
        { label: t.footer.solutions.ai, href: `#${sectionIds.ai}` },
        { label: t.footer.solutions.software, href: `#${sectionIds.services}` },
      ],
    },
    {
      title: t.footer.industriesTitle,
      links: [
        { label: t.footer.industries.manufacturing, href: `#${sectionIds.industries}` },
        { label: t.footer.industries.healthcare, href: `#${sectionIds.industries}` },
        { label: t.footer.industries.education, href: `#${sectionIds.industries}` },
      ],
    },
    {
      title: t.footer.companyTitle,
      links: [
        { label: t.footer.company.about, href: `#${sectionIds.about}` },
        { label: t.footer.company.contact, href: `#${sectionIds.contact}` },
        { label: t.footer.company.faq, href: `#${sectionIds.faq}` },
      ],
    },
  ];

  return (
    <footer className="border-t border-subtle bg-bg-elevated">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_repeat(3,1fr)_1.1fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm text-muted">{t.footer.description}</p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="font-display text-sm font-semibold">{column.title}</h2>
              <ul className="mt-3 space-y-0.5">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <a
                      href={link.href}
                      className="inline-flex min-h-9 items-center text-sm text-muted transition-colors hover:text-brand-600 dark:hover:text-brand-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="font-display text-sm font-semibold">{t.footer.connectTitle}</h2>
            <ul className="mt-3 space-y-0.5">
              <li>
                <a
                  href={siteConfig.social.linkedin}
                  className="inline-flex min-h-9 items-center gap-2 text-sm text-muted transition-colors hover:text-brand-600 dark:hover:text-brand-300"
                  aria-label={t.footer.connect.linkedin}
                >
                  <LinkedInIcon className="size-4" />
                  {t.footer.connect.linkedin}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex min-h-9 items-center gap-2 text-sm text-muted transition-colors hover:text-brand-600 dark:hover:text-brand-300"
                >
                  <Mail aria-hidden="true" className="size-4" />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.x}
                  className="inline-flex min-h-9 items-center gap-2 text-sm text-muted transition-colors hover:text-brand-600 dark:hover:text-brand-300"
                  aria-label={t.footer.connect.x}
                >
                  <XIcon className="size-4" />
                  {t.footer.connect.x}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-subtle pt-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. {t.footer.rights}
          </p>
          <p>{t.footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
