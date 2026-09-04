import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { BrainCircuit, FileText, Send } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { MockupWindow } from './mockupParts';
import { useI18n } from '../../hooks/useI18n';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { EASE_OUT_EXPO } from '../../lib/motion';

/**
 * Conversación de ejemplo con el asistente documental (RAG).
 * La respuesta aparece tras una breve simulación de búsqueda.
 */
export function AIAssistantMockup() {
  const { t } = useI18n();
  const reducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: '-60px' });
  const [answered, setAnswered] = useState(false);
  const copy = t.ai.assistantMockup;

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      setAnswered(true);
      return;
    }
    const timer = window.setTimeout(() => setAnswered(true), 1100);
    return () => window.clearTimeout(timer);
  }, [inView, reducedMotion]);

  // Al cambiar de idioma se vuelve a mostrar la respuesta ya resuelta.
  useEffect(() => {
    if (inView) setAnswered(true);
  }, [t, inView]);

  return (
    <div ref={containerRef}>
      <MockupWindow title={copy.title} badge={<Badge tone="ai">{copy.badge}</Badge>}>
        <div className="space-y-3 bg-bg p-4 sm:p-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            className="flex justify-end"
          >
            <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-brand-500 px-3.5 py-2.5 text-sm text-white">
              {copy.question}
            </p>
          </motion.div>

          <div className="flex gap-2.5">
            <span className="mt-1 inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-ai-500/30 bg-ai-500/10 text-ai-600 dark:text-ai-300">
              <BrainCircuit aria-hidden="true" className="size-4" />
            </span>

            {answered ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                className="max-w-[85%] space-y-2"
              >
                <p className="rounded-2xl rounded-tl-sm border border-subtle bg-surface px-3.5 py-2.5 text-sm text-muted">
                  {copy.answer}
                </p>
                <p className="inline-flex items-center gap-1.5 rounded-full border border-subtle bg-surface-muted px-2.5 py-1 text-[0.7rem] text-faint">
                  <FileText aria-hidden="true" className="size-3" />
                  <span className="font-medium">{copy.sourceLabel}:</span>
                  {copy.sourceValue}
                </p>
              </motion.div>
            ) : (
              <p className="inline-flex items-center gap-2 rounded-2xl rounded-tl-sm border border-subtle bg-surface px-3.5 py-2.5 text-sm text-faint">
                {copy.typing}
                <span aria-hidden="true" className="flex gap-1">
                  {[0, 1, 2].map((dot) => (
                    <motion.span
                      key={dot}
                      className="size-1.5 rounded-full bg-ai-500"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: dot * 0.18 }}
                    />
                  ))}
                </span>
              </p>
            )}
          </div>

          {/* Campo decorativo: el mockup no acepta entrada real. */}
          <div
            aria-hidden="true"
            className="mt-2 flex items-center gap-2 rounded-full border border-subtle bg-surface px-4 py-2.5 text-sm text-faint"
          >
            <span className="flex-1 truncate">{copy.placeholder}</span>
            <Send className="size-4 text-brand-500" />
          </div>
        </div>
      </MockupWindow>
    </div>
  );
}
