import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Badge } from '../ui/Badge';
import { MockupWindow } from './mockupParts';
import { SalesPanel } from './SalesPanel';
import { InventoryPanel } from './InventoryPanel';
import { ReportsAIPanel } from './ReportsAIPanel';
import { useI18n } from '../../hooks/useI18n';
import { cn } from '../../lib/cn';

const tabIds = ['sales', 'inventory', 'reports'] as const;
type TabId = (typeof tabIds)[number];

/**
 * Mockup de la plataforma ERP con tres módulos. Los datos son ficticios y
 * se etiquetan siempre como demostración.
 */
export function ERPDashboardMockup() {
  const { t } = useI18n();
  const [active, setActive] = useState<TabId>('sales');
  const tabRefs = useRef<Partial<Record<TabId, HTMLButtonElement | null>>>({});
  const mockup = t.erp.mockup;

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const index = tabIds.indexOf(active);
    let next: TabId | null = null;

    if (event.key === 'ArrowRight') next = tabIds[(index + 1) % tabIds.length] ?? null;
    if (event.key === 'ArrowLeft') next = tabIds[(index - 1 + tabIds.length) % tabIds.length] ?? null;
    if (event.key === 'Home') next = tabIds[0] ?? null;
    if (event.key === 'End') next = tabIds[tabIds.length - 1] ?? null;

    if (next) {
      event.preventDefault();
      setActive(next);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <MockupWindow
      title={mockup.title}
      subtitle={mockup.subtitle}
      badge={<Badge tone="cyan">{t.common.demoData}</Badge>}
    >
      <div
        role="tablist"
        aria-label={t.a11y.tablist}
        className="scrollbar-none flex gap-1 overflow-x-auto border-b border-subtle px-3 sm:px-4"
      >
        {tabIds.map((id) => {
          const selected = id === active;
          return (
            <button
              key={id}
              ref={(element) => {
                tabRefs.current[id] = element;
              }}
              type="button"
              role="tab"
              id={`erp-tab-${id}`}
              aria-selected={selected}
              aria-controls={`erp-panel-${id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(id)}
              onKeyDown={onKeyDown}
              className={cn(
                'relative min-h-11 shrink-0 px-3 text-sm font-medium whitespace-nowrap transition-colors sm:px-4',
                selected ? 'text-fg' : 'text-muted hover:text-fg',
              )}
            >
              {mockup.tabs[id]}
              {selected ? (
                <motion.span
                  layoutId="erp-tab-underline"
                  aria-hidden="true"
                  className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-linear-to-r from-brand-500 to-ai-500"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="bg-bg p-4 sm:p-5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            id={`erp-panel-${active}`}
            role="tabpanel"
            aria-labelledby={`erp-tab-${active}`}
            tabIndex={0}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="focus-visible:outline-none"
          >
            {active === 'sales' ? <SalesPanel /> : null}
            {active === 'inventory' ? <InventoryPanel /> : null}
            {active === 'reports' ? <ReportsAIPanel /> : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </MockupWindow>
  );
}
