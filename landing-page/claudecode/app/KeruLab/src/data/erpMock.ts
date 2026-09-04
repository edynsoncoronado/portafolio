/**
 * Datos ficticios para las visualizaciones del ERP.
 * No corresponden a ninguna empresa real: se muestran siempre con la
 * etiqueta "Datos de demostración".
 *
 * Los identificadores son códigos neutros (SKU-xxxx, WH-xx) para que
 * funcionen igual en español y en inglés.
 */

export interface KpiMock {
  value: number;
  suffix?: string;
  prefix?: string;
  trend: number;
}

export const salesKpis = {
  opportunities: { value: 128, trend: 12 },
  orders: { value: 342, trend: 8 },
  customers: { value: 96, trend: 4 },
  revenue: { value: 284, prefix: '$', suffix: 'K', trend: 11 },
} satisfies Record<string, KpiMock>;

export const pipelineStages = [
  { id: 'new', value: 48 },
  { id: 'qualified', value: 34 },
  { id: 'proposal', value: 26 },
  { id: 'won', value: 20 },
] as const;

export const inventoryKpis = {
  stock: { value: 1284, trend: 3 },
  products: { value: 216, trend: 6 },
  warehouses: { value: 3, trend: 0 },
  alerts: { value: 7, trend: -2 },
} satisfies Record<string, KpiMock>;

export type StockStatus = 'ok' | 'low' | 'critical';

export interface StockRow {
  sku: string;
  warehouse: string;
  units: number;
  status: StockStatus;
  /** Porcentaje respecto al nivel objetivo, para la barra de progreso. */
  level: number;
}

export const stockRows: StockRow[] = [
  { sku: 'SKU-1042', warehouse: 'WH-01', units: 412, status: 'ok', level: 82 },
  { sku: 'SKU-2088', warehouse: 'WH-01', units: 96, status: 'low', level: 34 },
  { sku: 'SKU-3311', warehouse: 'WH-02', units: 18, status: 'critical', level: 9 },
  { sku: 'SKU-4507', warehouse: 'WH-03', units: 265, status: 'ok', level: 71 },
  { sku: 'SKU-5120', warehouse: 'WH-02', units: 74, status: 'low', level: 28 },
];

/** Serie mensual: `month` es índice 0-11 y se formatea según el idioma activo. */
export const revenueSeries = [
  { month: 0, value: 168 },
  { month: 1, value: 194 },
  { month: 2, value: 176 },
  { month: 3, value: 221 },
  { month: 4, value: 208 },
  { month: 5, value: 247 },
  { month: 6, value: 236 },
  { month: 7, value: 284 },
];

export const reportKpis = {
  margin: { value: 38, suffix: '%', trend: 2 },
  orders: { value: 342, trend: 8 },
} satisfies Record<string, KpiMock>;

/** Formatea el índice de mes con el locale activo (ene / Jan…). */
export function monthLabel(monthIndex: number, lang: string): string {
  return new Intl.DateTimeFormat(lang, { month: 'short' })
    .format(new Date(2026, monthIndex, 1))
    .replace('.', '');
}
