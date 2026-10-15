import type { GeoError, RouteProgress, Route } from '../types';
import { formatDistance } from '../lib/geo';

type StatusPanelProps = {
  route: Route | null;
  progress: RouteProgress | null;
  accuracyM: number | null;
  tracking: boolean;
  geoError: GeoError | null;
  thresholdM: number;
  onThresholdChange: (value: number) => void;
};

function Stat({ label, value, tone }: { label: string; value: string; tone?: 'alert' | 'ok' }) {
  const color =
    tone === 'alert'
      ? 'text-[var(--color-alert)]'
      : tone === 'ok'
        ? 'text-[var(--color-ok)]'
        : 'text-[var(--color-text-strong)]';

  return (
    <div>
      <dt className="text-[11px] uppercase tracking-wide text-[var(--color-text-muted)]">
        {label}
      </dt>
      <dd className={`text-lg font-semibold tabular-nums ${color}`}>{value}</dd>
    </div>
  );
}

export default function StatusPanel({
  route,
  progress,
  accuracyM,
  tracking,
  geoError,
  thresholdM,
  onThresholdChange,
}: StatusPanelProps) {
  if (geoError) {
    return (
      <div className="rounded-lg border border-[var(--color-alert)]/40 bg-[var(--color-alert)]/10 p-3 text-sm">
        <p className="font-medium text-[var(--color-alert)]">Sin ubicación</p>
        <p className="mt-1 text-[var(--color-text-muted)]">{geoError.message}</p>
      </div>
    );
  }

  if (!tracking) {
    return (
      <p className="rounded-lg bg-[var(--color-surface-muted)] p-3 text-sm text-[var(--color-text-muted)]">
        Activa el GPS para ver a qué distancia estás de la ruta y cuánto llevas recorrido.
      </p>
    );
  }

  if (!route) {
    return (
      <p className="rounded-lg bg-[var(--color-surface-muted)] p-3 text-sm text-[var(--color-text-muted)]">
        GPS activo. Selecciona o dibuja una ruta para comparar tu posición con ella.
      </p>
    );
  }

  if (!progress) {
    return (
      <p className="rounded-lg bg-[var(--color-surface-muted)] p-3 text-sm text-[var(--color-text-muted)]">
        Esperando la primera lectura del GPS…
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {progress.offRoute && (
        <p className="rounded-lg bg-[var(--color-alert)]/15 px-3 py-2 text-sm font-medium text-[var(--color-alert)]">
          Fuera de ruta — estás a {formatDistance(progress.closest.distanceM)} del camino.
        </p>
      )}

      <dl className="grid grid-cols-2 gap-3">
        <Stat
          label="Distancia a la ruta"
          value={formatDistance(progress.closest.distanceM)}
          tone={progress.offRoute ? 'alert' : 'ok'}
        />
        <Stat label="Restante" value={formatDistance(progress.remainingM)} />
        <Stat label="Recorrido" value={formatDistance(progress.traveledM)} />
        <Stat label="Progreso" value={`${progress.percent.toFixed(0)} %`} />
      </dl>

      <div
        className="h-1.5 overflow-hidden rounded-full bg-[var(--color-surface-muted)]"
        role="progressbar"
        aria-valuenow={Math.round(progress.percent)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progreso sobre la ruta"
      >
        <div
          className="h-full rounded-full bg-[var(--color-brand-500)] transition-[width] duration-500"
          style={{ width: `${progress.percent}%` }}
        />
      </div>

      <label className="block text-xs text-[var(--color-text-muted)]">
        Margen antes de avisar: <span className="font-semibold tabular-nums">{thresholdM} m</span>
        <input
          type="range"
          min={10}
          max={200}
          step={5}
          value={thresholdM}
          onChange={(event) => onThresholdChange(Number(event.target.value))}
          className="mt-1 w-full accent-[var(--color-brand-500)]"
        />
      </label>

      {accuracyM !== null && (
        <p className="text-xs text-[var(--color-text-muted)]">
          Precisión del GPS: ±{Math.round(accuracyM)} m
          {accuracyM > 50 && ' — señal débil, los datos pueden bailar.'}
        </p>
      )}
    </div>
  );
}
