import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { KpiTile } from './mockupParts';
import { inventoryKpis, stockRows, type StockStatus } from '../../data/erpMock';
import { useI18n } from '../../hooks/useI18n';
import { EASE_OUT_EXPO } from '../../lib/motion';
import { cn } from '../../lib/cn';

const statusStyles: Record<StockStatus, string> = {
  ok: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  low: 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300',
  critical: 'border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300',
};

const barStyles: Record<StockStatus, string> = {
  ok: 'bg-emerald-500',
  low: 'bg-amber-500',
  critical: 'bg-red-500',
};

export function InventoryPanel() {
  const { t } = useI18n();
  const copy = t.erp.mockup.inventory;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiTile label={copy.stock} value={inventoryKpis.stock.value} trend={inventoryKpis.stock.trend} />
        <KpiTile label={copy.products} value={inventoryKpis.products.value} trend={inventoryKpis.products.trend} />
        <KpiTile label={copy.warehouses} value={inventoryKpis.warehouses.value} trend={inventoryKpis.warehouses.trend} />
        <KpiTile label={copy.alerts} value={inventoryKpis.alerts.value} trend={inventoryKpis.alerts.trend} />
      </div>

      <div className="rounded-xl border border-subtle bg-bg-elevated">
        <p className="border-b border-subtle px-4 py-3 text-sm font-medium">{copy.tableTitle}</p>

        <div className="overflow-x-auto" tabIndex={0} aria-label={t.a11y.horizontalScroll}>
          <table className="w-full min-w-[34rem] text-left text-xs">
            <thead className="text-faint">
              <tr>
                <th scope="col" className="px-4 py-2 font-medium">{copy.columns.product}</th>
                <th scope="col" className="px-4 py-2 font-medium">{copy.columns.warehouse}</th>
                <th scope="col" className="px-4 py-2 text-right font-medium">{copy.columns.units}</th>
                <th scope="col" className="px-4 py-2 font-medium">{copy.columns.status}</th>
              </tr>
            </thead>
            <tbody>
              {stockRows.map((row, index) => (
                <tr key={row.sku} className="border-t border-subtle">
                  <th scope="row" className="px-4 py-2.5 font-medium">
                    <span className="block">{row.sku}</span>
                    <span className="mt-1 block h-1 w-24 overflow-hidden rounded-full bg-surface-muted">
                      <motion.span
                        className={cn('block h-full rounded-full', barStyles[row.status])}
                        initial={{ width: 0 }}
                        animate={{ width: `${row.level}%` }}
                        transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.1 + index * 0.06 }}
                      />
                    </span>
                  </th>
                  <td className="px-4 py-2.5 text-muted">{row.warehouse}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums">{row.units}</td>
                  <td className="px-4 py-2.5">
                    <span className={cn('inline-flex rounded-full border px-2 py-0.5 text-[0.7rem]', statusStyles[row.status])}>
                      {copy.status[row.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="flex items-center gap-2 border-t border-subtle px-4 py-3 text-xs text-muted">
          <Zap aria-hidden="true" className="size-3.5 text-cyan-accent-500" />
          {copy.alertLabel}
        </p>
      </div>
    </div>
  );
}
