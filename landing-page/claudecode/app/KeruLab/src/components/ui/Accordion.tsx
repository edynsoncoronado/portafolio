import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '../../lib/cn';

export interface AccordionEntry {
  id: string;
  question: string;
  answer: string;
}

/** Acordeón accesible: un solo panel abierto, navegable con teclado. */
export function Accordion({ items, className }: { items: AccordionEntry[]; className?: string }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  const baseId = useId();

  return (
    <div className={cn('divide-y divide-[var(--border-subtle)] rounded-2xl border border-subtle bg-surface', className)}>
      {items.map((item) => {
        const expanded = open === item.id;
        const buttonId = `${baseId}-${item.id}-button`;
        const panelId = `${baseId}-${item.id}-panel`;

        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : item.id)}
                className={cn(
                  'flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors sm:px-6',
                  'hover:bg-surface-muted/60',
                  expanded ? 'text-fg' : 'text-fg/90',
                )}
              >
                <span className="text-base font-medium sm:text-lg">{item.question}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-subtle transition-transform duration-300',
                    expanded && 'rotate-45 border-brand-500/40 bg-brand-500/10 text-brand-600 dark:text-brand-300',
                  )}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {expanded ? (
                <motion.div
                  key="panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-muted sm:px-6 sm:pb-6">{item.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
