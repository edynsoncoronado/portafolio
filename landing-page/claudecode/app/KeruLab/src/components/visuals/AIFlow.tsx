import { motion } from 'framer-motion';
import {
  ArrowDown,
  BrainCircuit,
  Boxes,
  Database,
  FileText,
  Plug,
  Sparkles,
  Target,
  Users,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useI18n } from '../../hooks/useI18n';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { drawLine, viewportOnce } from '../../lib/motion';

const sourceIcons: LucideIcon[] = [FileText, Boxes, Users, Plug, Database];
const outputIcons: LucideIcon[] = [Sparkles, Zap, Target];

/** Curvas que convergen en la capa de IA y vuelven a abrirse hacia los resultados. */
function ConnectorFan({ direction }: { direction: 'in' | 'out' }) {
  const count = direction === 'in' ? 5 : 3;
  const gradientId = `kl-fan-${direction}`;
  const paths = Array.from({ length: count }, (_, index) => {
    const y = ((index + 0.5) / count) * 100;
    return direction === 'in'
      ? `M0 ${y} C 45 ${y}, 55 50, 100 50`
      : `M0 50 C 45 50, 55 ${y}, 100 ${y}`;
  });

  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="h-56 w-full">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-brand-500)" stopOpacity="0.2" />
          <stop offset="55%" stopColor="var(--color-ai-500)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--color-cyan-accent-500)" stopOpacity="0.45" />
        </linearGradient>
      </defs>
      {paths.map((d) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
          variants={drawLine}
        />
      ))}
    </svg>
  );
}

function NodeList({ label, items, icons }: { label: string; items: string[]; icons: LucideIcon[] }) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-faint uppercase">{label}</p>
      <ul className="space-y-2">
        {items.map((item, index) => {
          const Icon = icons[index] ?? Database;
          return (
            <li
              key={item}
              className="flex items-center gap-2.5 rounded-xl border border-subtle bg-surface px-3 py-2.5 text-sm shadow-sm shadow-black/2 dark:shadow-black/20"
            >
              <Icon aria-hidden="true" className="size-4 shrink-0 text-brand-600 dark:text-brand-300" />
              <span className="truncate">{item}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function AILayerCard({ label, animated }: { label: string; animated: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-56">
      {animated ? (
        <span
          aria-hidden="true"
          className="animate-pulse-glow absolute -inset-3 rounded-3xl bg-radial from-ai-500/30 to-transparent blur-xl"
        />
      ) : null}
      <div className="relative rounded-2xl border border-ai-500/40 bg-surface p-5 text-center shadow-lg shadow-ai-500/10">
        <span className="mx-auto mb-2 inline-flex size-11 items-center justify-center rounded-xl border border-ai-500/30 bg-ai-500/10 text-ai-600 dark:text-ai-300">
          <BrainCircuit aria-hidden="true" className="size-5" />
        </span>
        <p className="text-sm font-semibold">{label}</p>
      </div>
    </div>
  );
}

/**
 * Arquitectura de la capa de IA: fuentes existentes → capa de IA →
 * insights, automatización y acciones.
 */
export function AIFlow() {
  const { t } = useI18n();
  const reducedMotion = usePrefersReducedMotion();

  const sources = <NodeList label={t.ai.sourcesLabel} items={t.ai.sources} icons={sourceIcons} />;
  const outputs = <NodeList label={t.ai.outputsLabel} items={t.ai.outputs} icons={outputIcons} />;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="rounded-3xl border border-subtle bg-bg-elevated p-5 sm:p-8"
    >
      {/* Escritorio: fuentes → capa de IA → resultados */}
      <div className="hidden items-center gap-2 lg:grid lg:grid-cols-[minmax(0,1fr)_7rem_15rem_7rem_minmax(0,1fr)]">
        {sources}
        <ConnectorFan direction="in" />
        <AILayerCard label={t.ai.layerLabel} animated={!reducedMotion} />
        <ConnectorFan direction="out" />
        {outputs}
      </div>

      {/* Móvil y tablet: misma cadena, apilada */}
      <div className="space-y-5 lg:hidden">
        {sources}
        <div className="flex justify-center" aria-hidden="true">
          <ArrowDown className="size-5 text-ai-500" />
        </div>
        <AILayerCard label={t.ai.layerLabel} animated={!reducedMotion} />
        <div className="flex justify-center" aria-hidden="true">
          <ArrowDown className="size-5 text-cyan-accent-500" />
        </div>
        {outputs}
      </div>
    </motion.div>
  );
}
