import { motion } from 'framer-motion';
import { BrainCircuit, Database, Gauge, Workflow, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useI18n } from '../../hooks/useI18n';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { EASE_OUT_EXPO } from '../../lib/motion';
import { cn } from '../../lib/cn';
import type { Accent } from '../ui/Card';

interface FlowNode {
  icon: LucideIcon;
  accent: Accent;
  labelKey: 'process' | 'data' | 'automation' | 'ai' | 'decisions';
  detailKey: 'processDetail' | 'dataDetail' | 'automationDetail' | 'aiDetail' | 'decisionsDetail';
}

const nodes: FlowNode[] = [
  { icon: Workflow, accent: 'brand', labelKey: 'process', detailKey: 'processDetail' },
  { icon: Database, accent: 'brand', labelKey: 'data', detailKey: 'dataDetail' },
  { icon: Zap, accent: 'cyan', labelKey: 'automation', detailKey: 'automationDetail' },
  { icon: BrainCircuit, accent: 'ai', labelKey: 'ai', detailKey: 'aiDetail' },
  { icon: Gauge, accent: 'cyan', labelKey: 'decisions', detailKey: 'decisionsDetail' },
];

const iconTone: Record<Accent, string> = {
  brand: 'border-brand-500/30 bg-brand-500/10 text-brand-600 dark:text-brand-300',
  ai: 'border-ai-500/30 bg-ai-500/10 text-ai-600 dark:text-ai-300',
  cyan: 'border-cyan-accent-500/30 bg-cyan-accent-500/10 text-cyan-accent-700 dark:text-cyan-accent-300',
};

/**
 * Visualización del Hero: la cadena Procesos → Datos → Automatización → IA →
 * Decisiones, con la línea de conexión y un pulso de datos recorriéndola.
 */
export function HeroFlow() {
  const { t } = useI18n();
  const reducedMotion = usePrefersReducedMotion();
  const flow = t.hero.flow;

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="animate-pulse-glow absolute -inset-6 -z-10 rounded-[2.5rem] bg-radial from-ai-500/20 via-brand-500/10 to-transparent blur-2xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.15 }}
        className="relative overflow-hidden rounded-3xl border border-subtle bg-surface/85 p-4 shadow-2xl shadow-brand-500/10 backdrop-blur-sm sm:p-6"
      >
        <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

        <div className="relative flex items-center justify-between gap-3 pb-4">
          <div>
            <p className="text-sm font-semibold">{t.hero.flowTitle}</p>
            <p className="text-xs text-faint">{t.hero.flowCaption}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-accent-500/30 bg-cyan-accent-500/10 px-2.5 py-1 text-[0.65rem] font-medium text-cyan-accent-700 dark:text-cyan-accent-300">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan-accent-500 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-cyan-accent-500" />
            </span>
            live
          </span>
        </div>

        <ol className="relative space-y-2.5">
          {/* Línea de conexión alineada con el centro de los iconos. */}
          <span
            aria-hidden="true"
            className="absolute top-6 bottom-6 left-[1.75rem] w-px -translate-x-1/2 bg-linear-to-b from-brand-500/60 via-ai-500/60 to-cyan-accent-500/60 sm:left-8"
          />

          {!reducedMotion ? (
            <motion.span
              aria-hidden="true"
              className="absolute left-[1.75rem] size-2 -translate-x-1/2 rounded-full bg-cyan-accent-400 shadow-[0_0_12px_var(--color-cyan-accent-400)] sm:left-8"
              initial={{ top: '8%', opacity: 0 }}
              animate={{ top: ['8%', '92%'], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.4 }}
            />
          ) : null}

          {nodes.map((node, index) => (
            <motion.li
              key={node.labelKey}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.35 + index * 0.09 }}
              className={cn(
                'relative flex items-center gap-3 rounded-2xl border border-subtle/80 bg-bg-elevated/80 p-2.5 backdrop-blur-sm',
                'transition-colors duration-300 hover:border-strong sm:gap-4 sm:p-3',
              )}
            >
              <span
                className={cn(
                  'z-10 inline-flex size-9 shrink-0 items-center justify-center rounded-xl border sm:size-10',
                  iconTone[node.accent],
                )}
              >
                <node.icon aria-hidden="true" className="size-[18px]" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium">{flow[node.labelKey]}</span>
                <span className="block truncate text-xs text-faint">{flow[node.detailKey]}</span>
              </span>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </div>
  );
}
