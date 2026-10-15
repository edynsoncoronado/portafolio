import { ChartColumn, Sparkles, TrendingUp } from 'lucide-react';

const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'];
const values = [48, 62, 55, 74, 69, 86, 79, 95];

/** Mockup ilustrativo de un panel de indicadores del ERP. */
export function DashboardMockup() {
  const max = Math.max(...values);

  return (
    <figure className="card-soft overflow-hidden">
      <div className="flex items-center justify-between border-b border-line bg-cream px-4 py-3">
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-ink-soft">
          <ChartColumn size={14} aria-hidden="true" />
          Ingresos por mes
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/10 px-2.5 py-1 text-[11px] font-semibold text-teal-600">
          <TrendingUp size={12} aria-hidden="true" />
          +18% vs. trimestre anterior
        </span>
      </div>

      <div className="px-5 py-6">
        <div className="flex h-40 items-end gap-2" role="img" aria-label="Gráfico de barras de demostración con ingresos por mes">
          {values.map((value, index) => (
            <div key={months[index]} className="flex h-full flex-1 flex-col justify-end gap-2">
              <div
                className="w-full rounded-t-lg bg-plum-300/70"
                style={{ height: `${(value / max) * 82}%` }}
                aria-hidden="true"
              />
              <span className="text-center text-[10px] text-ink-mute">{months[index]}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-start gap-2.5 rounded-2xl bg-cream px-4 py-3">
          <Sparkles size={15} className="mt-0.5 shrink-0 text-mango-500" aria-hidden="true" />
          <p className="text-xs leading-relaxed text-ink-soft">
            <span className="font-semibold text-ink">Insight generado por IA: </span>
            el margen se mantiene estable, pero tres referencias de la categoría con mayor volumen bajaron su
            rotación respecto al mes anterior. Revisar precio y nivel de stock.
          </p>
        </div>
      </div>

      <figcaption className="border-t border-line px-5 py-3 text-[11px] text-ink-mute">
        Datos de demostración. No corresponden a ninguna empresa real.
      </figcaption>
    </figure>
  );
}
