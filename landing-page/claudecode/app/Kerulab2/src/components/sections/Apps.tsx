import type { ComponentType } from 'react';
import {
  ArrowRight,
  Bot,
  Boxes,
  Calculator,
  CalendarDays,
  ChartColumn,
  Clock,
  Factory,
  FileText,
  Headphones,
  IdCard,
  Layers,
  Megaphone,
  Plug,
  ReceiptText,
  Signature,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Users,
  Workflow,
} from 'lucide-react';
import { content } from '../../content/es';
import { sectionIds } from '../../config/site';
import { Reveal } from '../ui/Reveal';
import { Squiggle } from '../ui/Doodles';

/** Icono asignado a cada aplicación, en el mismo orden del contenido. */
const icons: ComponentType<{ size?: number; className?: string }>[] = [
  Calculator,
  ReceiptText,
  Users,
  ShoppingCart,
  ShoppingBag,
  Boxes,
  Factory,
  Layers,
  Clock,
  IdCard,
  FileText,
  Signature,
  Workflow,
  Sparkles,
  Bot,
  ChartColumn,
  Plug,
  Headphones,
  Megaphone,
  CalendarDays,
];

const tones = {
  plum: 'bg-plum-50 text-plum-500',
  teal: 'bg-teal-500/10 text-teal-600',
  coral: 'bg-coral-200/50 text-coral-500',
  mango: 'bg-mango-300/40 text-mango-500',
} as const;

export function Apps() {
  const { apps } = content;

  return (
    <section id={sectionIds.apps} className="scroll-mt-24 bg-cream px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto w-full max-w-5xl">
        <Reveal>
          <div className="card-soft px-5 py-8 sm:px-10 sm:py-12">
            <ul className="grid grid-cols-3 gap-x-3 gap-y-7 sm:grid-cols-5 lg:grid-cols-5">
              {apps.items.map((app, index) => {
                const Icon = icons[index % icons.length] ?? Sparkles;
                return (
                  <li key={app.name} className="flex flex-col items-center gap-2 text-center">
                    <span
                      aria-hidden="true"
                      className={`grid h-11 w-11 place-items-center rounded-2xl ${tones[app.tone as keyof typeof tones]}`}
                    >
                      <Icon size={20} />
                    </span>
                    <span className="text-[11px] font-medium leading-tight text-ink-soft sm:text-xs">
                      {app.name}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-9 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
              <span className="inline-flex items-center gap-2 font-hand text-2xl text-plum-500">
                <Squiggle className="h-4 w-24 text-mango-400" />
                {apps.limitless}
              </span>
              <a
                href="#erp"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:text-teal-500"
              >
                {apps.moreLabel}
                <ArrowRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mx-auto mt-12 max-w-2xl text-center">
            <p className="text-lg font-semibold text-ink">{apps.lead}</p>
            <p className="mt-3 text-base leading-relaxed text-ink-soft">{apps.body}</p>
            <p className="mt-3 text-base leading-relaxed text-ink-soft">{apps.footnote}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
