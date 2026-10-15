import type { Route } from '../types';
import { formatDistance } from '../lib/geo';

type RouteListProps = {
  routes: Route[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onRename: (id: string, name: string) => void;
  disabled: boolean;
};

const formatDate = (iso: string) => {
  const date = new Date(iso);
  return Number.isNaN(date.getTime())
    ? ''
    : date.toLocaleDateString('es', { day: 'numeric', month: 'short' });
};

export default function RouteList({
  routes,
  activeId,
  onSelect,
  onRemove,
  onRename,
  disabled,
}: RouteListProps) {
  if (routes.length === 0) {
    return (
      <p className="rounded-lg bg-[var(--color-surface-muted)] p-3 text-sm text-[var(--color-text-muted)]">
        Todavía no hay rutas guardadas. Pulsa «Dibujar ruta» y marca en el mapa el camino
        que quieres recorrer.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {routes.map((route) => {
        const active = route.id === activeId;
        return (
          <li
            key={route.id}
            className={`rounded-lg border p-2 transition-colors ${
              active
                ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-500)]/10'
                : 'border-[var(--color-border-soft)]'
            }`}
          >
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSelect(route.id)}
                disabled={disabled}
                className="min-w-0 flex-1 text-left disabled:opacity-50"
                aria-pressed={active}
                title={"Creada el " + formatDate(route.createdAt)}
              >
                <span className="block truncate text-sm font-medium">{route.name}</span>
                <span className="block truncate text-xs text-[var(--color-text-muted)]">
                  {formatDistance(route.distanceM)} · {route.points.length} puntos
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const name = window.prompt('Nuevo nombre de la ruta', route.name);
                  if (name && name.trim()) onRename(route.id, name.trim());
                }}
                disabled={disabled}
                className="rounded px-2 py-1 text-xs text-[var(--color-text-muted)] hover:bg-[var(--color-surface-muted)] disabled:opacity-50"
                aria-label={`Renombrar ${route.name}`}
              >
                Editar
              </button>

              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`¿Borrar la ruta «${route.name}»?`)) onRemove(route.id);
                }}
                disabled={disabled}
                className="rounded px-2 py-1 text-xs text-[var(--color-alert)] hover:bg-[var(--color-alert)]/10 disabled:opacity-50"
                aria-label={`Borrar ${route.name}`}
              >
                Borrar
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
