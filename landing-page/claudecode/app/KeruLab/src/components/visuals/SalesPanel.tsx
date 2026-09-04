import { motion } from 'framer-motion';
import { KpiTile } from './mockupParts';
import { pipelineStages, salesKpis } from '../../data/erpMock';
import { useI18n } from '../../hooks/useI18n';
import { EASE_OUT_EXPO } from '../../lib/motion';

const maxStageValue = Math.max(...pipelineStages.map((stage) => stage.value));

export function SalesPanel() {
  const { t } = useI18n();
  const copy = t.erp.mockup.sales;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiTile label={copy.opportunities} value={salesKpis.opportunities.value} trend={salesKpis.opportunities.trend} />
        <KpiTile label={copy.orders} value={salesKpis.orders.value} trend={salesKpis.orders.trend} />
        <KpiTile label={copy.customers} value={salesKpis.customers.value} trend={salesKpis.customers.trend} />
        <KpiTile
          label={copy.revenue}
          value={salesKpis.revenue.value}
          prefix={salesKpis.revenue.prefix}
          suffix={salesKpis.revenue.suffix}
          trend={salesKpis.revenue.trend}
        />
      </div>

      <div className="rounded-xl border border-subtle bg-bg-elevated p-4">
        <p className="mb-4 text-sm font-medium">{copy.pipelineTitle}</p>
        <ul className="space-y-3">
          {pipelineStages.map((stage, index) => (
            <li key={stage.id} className="grid grid-cols-[6.5rem_1fr_2.5rem] items-center gap-3 text-xs sm:grid-cols-[8rem_1fr_3rem]">
              <span className="truncate text-muted">{copy.stages[stage.id]}</span>
              <span className="h-2.5 overflow-hidden rounded-full bg-surface-muted">
                <motion.span
                  className="block h-full rounded-full bg-linear-to-r from-brand-500 to-ai-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(stage.value / maxStageValue) * 100}%` }}
                  transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.1 + index * 0.08 }}
                />
              </span>
              <span className="text-right font-medium tabular-nums">{stage.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
