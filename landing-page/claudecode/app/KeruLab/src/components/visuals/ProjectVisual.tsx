import { motion } from 'framer-motion';
import { BrainCircuit, FileText, Search } from 'lucide-react';
import { useI18n } from '../../hooks/useI18n';
import { EASE_OUT_EXPO, viewportOnce } from '../../lib/motion';
import type { ProjectVisual as ProjectVisualId } from '../../data/projects';

const pipelineSteps = [72, 54, 38, 22];
const metricBars = [42, 68, 55, 80, 62, 92];

/** Mockups reducidos que ilustran cada caso de uso. Todos son decorativos. */
export function ProjectVisual({ variant }: { variant: ProjectVisualId }) {
  const { t } = useI18n();

  return (
    <div
      aria-hidden="true"
      className="relative h-32 overflow-hidden rounded-xl border border-subtle bg-bg-elevated p-4"
    >
      {variant === 'pipeline' ? (
        <div className="flex h-full flex-col justify-center gap-2">
          {pipelineSteps.map((width, index) => (
            <div key={width} className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-brand-500" />
              <motion.span
                className="h-2 rounded-full bg-linear-to-r from-brand-500/70 to-ai-500/60"
                initial={{ width: 0 }}
                whileInView={{ width: `${width}%` }}
                viewport={viewportOnce}
                transition={{ duration: 0.7, delay: index * 0.08, ease: EASE_OUT_EXPO }}
              />
            </div>
          ))}
        </div>
      ) : null}

      {variant === 'documents' ? (
        <div className="flex h-full flex-col justify-center gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-subtle bg-surface px-3 py-2 text-xs text-faint">
            <Search className="size-3.5 text-ai-500" />
            <span className="h-2 w-24 rounded-full bg-surface-muted" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
                className="flex items-center gap-1.5 rounded-lg border border-subtle bg-surface px-2 py-1.5"
              >
                <FileText className="size-3 text-brand-500" />
                <span className="h-1.5 w-full rounded-full bg-surface-muted" />
              </motion.div>
            ))}
          </div>
        </div>
      ) : null}

      {variant === 'erp' ? (
        <div className="grid h-full grid-cols-3 gap-2">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="rounded-lg border border-subtle bg-surface p-2"
            >
              <span className="block h-1.5 w-2/3 rounded-full bg-surface-muted" />
              <span
                className={`mt-1.5 block h-3 w-full rounded ${index === 4 ? 'bg-ai-500/30' : 'bg-brand-500/20'}`}
              />
            </motion.div>
          ))}
        </div>
      ) : null}

      {variant === 'metrics' ? (
        <div className="flex h-full items-end gap-1.5">
          {metricBars.map((height, index) => (
            <motion.span
              key={height}
              className="flex-1 rounded-t bg-linear-to-t from-brand-500/60 to-cyan-accent-500/80"
              initial={{ height: 0 }}
              whileInView={{ height: `${height}%` }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: index * 0.06, ease: EASE_OUT_EXPO }}
            />
          ))}
        </div>
      ) : null}

      <span className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-full bg-surface/80 px-2 py-0.5 text-[0.6rem] text-faint backdrop-blur-sm">
        <BrainCircuit className="size-2.5" />
        {t.common.mockup}
      </span>
    </div>
  );
}
