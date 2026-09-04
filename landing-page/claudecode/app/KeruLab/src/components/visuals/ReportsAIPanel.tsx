import { motion } from 'framer-motion';
import { BrainCircuit, MessageSquare, Sparkles } from 'lucide-react';
import { KpiTile } from './mockupParts';
import { monthLabel, reportKpis, revenueSeries } from '../../data/erpMock';
import { useI18n } from '../../hooks/useI18n';
import { EASE_OUT_EXPO } from '../../lib/motion';

const maxRevenue = Math.max(...revenueSeries.map((point) => point.value));

export function ReportsAIPanel() {
  const { t, lang } = useI18n();
  const copy = t.erp.mockup.reports;

  return (
    <div className="space-y-4">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="rounded-xl border border-subtle bg-bg-elevated p-4">
          <p className="mb-4 text-sm font-medium">{copy.chartTitle}</p>
          <div className="flex h-32 items-end gap-1.5 sm:gap-2">
            {revenueSeries.map((point, index) => (
              <div key={point.month} className="flex h-full flex-1 flex-col justify-end gap-2">
                <motion.div
                  className="w-full rounded-t-md bg-linear-to-t from-brand-500/70 to-ai-500/90"
                  initial={{ height: 0 }}
                  animate={{ height: `${(point.value / maxRevenue) * 100}%` }}
                  transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: index * 0.06 }}
                />
                <span className="text-center text-[0.6rem] text-faint">
                  {monthLabel(point.month, lang)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
          <KpiTile
            label={copy.marginTitle}
            value={reportKpis.margin.value}
            suffix={reportKpis.margin.suffix}
            trend={reportKpis.margin.trend}
          />
          <KpiTile label={copy.ordersTitle} value={reportKpis.orders.value} trend={reportKpis.orders.trend} />
        </div>
      </div>

      <div className="rounded-xl border border-ai-500/30 bg-ai-500/[0.06] p-4">
        <p className="flex items-center gap-2 text-sm font-medium text-ai-600 dark:text-ai-300">
          <Sparkles aria-hidden="true" className="size-4" />
          {copy.insightTitle}
        </p>
        <p className="mt-2 text-sm text-muted">{copy.insightBody}</p>
      </div>

      <div className="rounded-xl border border-subtle bg-bg-elevated p-4">
        <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-faint uppercase">
          {copy.queryLabel}
        </p>

        <div className="space-y-3">
          <p className="flex items-start gap-2.5 text-sm">
            <MessageSquare aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-500" />
            <span className="rounded-2xl rounded-tl-sm border border-subtle bg-surface px-3 py-2">
              {copy.question}
            </span>
          </p>
          <motion.p
            className="flex items-start gap-2.5 text-sm"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: EASE_OUT_EXPO }}
          >
            <BrainCircuit aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ai-500" />
            <span className="rounded-2xl rounded-tl-sm border border-ai-500/25 bg-ai-500/[0.06] px-3 py-2 text-muted">
              {copy.answer}
            </span>
          </motion.p>
        </div>

        <p className="mt-4 border-t border-subtle pt-3 text-[0.7rem] text-faint">{copy.disclaimer}</p>
      </div>
    </div>
  );
}
