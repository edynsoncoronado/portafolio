import { useCallback, useMemo, useState } from 'react';
import MapView, { DEFAULT_CENTER, FitBounds } from './components/MapView';
import RouteLayer from './components/RouteLayer';
import RouteList from './components/RouteList';
import StatusPanel from './components/StatusPanel';
import UserMarker from './components/UserMarker';
import { useGeolocation } from './hooks/useGeolocation';
import { useRouteProgress } from './hooks/useRouteProgress';
import { useRoutes } from './hooks/useRoutes';
import { formatDistance, routeDistanceM } from './lib/geo';
import type { LatLng } from './types';

const DEFAULT_THRESHOLD_M = 30;

export default function App() {
  const { routes, activeRoute, activeId, setActiveId, addRoute, removeRoute, renameRoute, storageError } =
    useRoutes();
  const geo = useGeolocation();

  const [draft, setDraft] = useState<LatLng[] | null>(null);
  const [follow, setFollow] = useState(true);
  const [thresholdM, setThresholdM] = useState(DEFAULT_THRESHOLD_M);
  const [panelOpen, setPanelOpen] = useState(true);

  const editing = draft !== null;
  const progress = useRouteProgress(activeRoute, geo.position, thresholdM, geo.accuracyM);

  const draftDistanceM = useMemo(() => (draft ? routeDistanceM(draft) : 0), [draft]);

  // Puntos que se pintan: el borrador mientras se dibuja, la ruta activa si no.
  const displayedPoints = draft ?? activeRoute?.points ?? [];

  const addPoint = useCallback((point: LatLng) => {
    setDraft((prev) => (prev ? [...prev, point] : [point]));
  }, []);

  const movePoint = useCallback((index: number, point: LatLng) => {
    setDraft((prev) => prev?.map((existing, i) => (i === index ? point : existing)) ?? prev);
  }, []);

  const removePoint = useCallback((index: number) => {
    setDraft((prev) => prev?.filter((_, i) => i !== index) ?? prev);
  }, []);

  const startDrawing = () => {
    setActiveId(null);
    setDraft([]);
  };

  const saveDraft = () => {
    if (!draft || draft.length < 2) return;
    const suggested = `Ruta ${routes.length + 1}`;
    const name = window.prompt('Nombre de la ruta', suggested);
    if (name === null) return;
    addRoute(name.trim() || suggested, draft);
    setDraft(null);
  };

  return (
    <div className="relative h-full w-full">
      <MapView
        center={geo.position ?? DEFAULT_CENTER}
        editing={editing}
        onMapClick={addPoint}
        followPosition={geo.position}
        follow={follow}
        onUserPan={() => setFollow(false)}
      >
        {/* El encuadre se rehace solo al cambiar de ruta, no al añadir puntos. */}
        <FitBounds points={activeRoute?.points ?? []} token={activeId} />

        <RouteLayer
          points={displayedPoints}
          editable={editing}
          onMovePoint={movePoint}
          onRemovePoint={removePoint}
        />

        {geo.position && (
          <UserMarker
            position={geo.position}
            accuracyM={geo.accuracyM}
            linkTo={progress?.closest.point ?? null}
            offRoute={progress?.offRoute ?? false}
          />
        )}
      </MapView>

      {/* --- Barra superior --- */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-[1000] flex items-start justify-between gap-2 p-3">
        <div className="pointer-events-auto rounded-xl bg-[var(--color-surface)]/95 px-3 py-2 shadow-lg backdrop-blur">
          <h1 className="text-sm font-bold">MyStrava</h1>
          <p className="text-xs text-[var(--color-text-muted)]">
            {editing
              ? `Dibujando · ${draft?.length ?? 0} puntos · ${formatDistance(draftDistanceM)}`
              : (activeRoute?.name ?? 'Sin ruta seleccionada')}
          </p>
        </div>

        <div className="pointer-events-auto flex gap-2">
          <button
            type="button"
            onClick={() => {
              if (geo.isTracking) {
                geo.stop();
              } else {
                setFollow(true);
                geo.start();
              }
            }}
            className={`rounded-xl px-3 py-2 text-sm font-medium shadow-lg backdrop-blur transition-colors ${
              geo.isTracking
                ? 'bg-[var(--color-brand-500)] text-white'
                : 'bg-[var(--color-surface)]/95'
            }`}
          >
            {geo.isTracking ? 'GPS activo' : 'Activar GPS'}
          </button>

          <button
            type="button"
            onClick={() => setPanelOpen((open) => !open)}
            className="rounded-xl bg-[var(--color-surface)]/95 px-3 py-2 text-sm font-medium shadow-lg backdrop-blur"
            aria-expanded={panelOpen}
          >
            {panelOpen ? 'Ocultar' : 'Rutas'}
          </button>
        </div>
      </header>

      {/* Recentrar: solo tiene sentido si hay posición y el seguimiento está apagado. */}
      {geo.position && !follow && (
        <button
          type="button"
          onClick={() => setFollow(true)}
          className="absolute bottom-24 right-3 z-[1000] rounded-full bg-[var(--color-surface)]/95 px-4 py-2 text-sm font-medium shadow-lg backdrop-blur sm:bottom-6"
        >
          Centrar en mí
        </button>
      )}

      {/* --- Panel: lateral en escritorio, hoja inferior en móvil --- */}
      {panelOpen && (
        <aside className="absolute inset-x-0 bottom-0 z-[1000] max-h-[55vh] overflow-y-auto rounded-t-2xl bg-[var(--color-surface)]/97 p-4 shadow-2xl backdrop-blur sm:inset-x-auto sm:inset-y-auto sm:bottom-auto sm:left-4 sm:top-20 sm:max-h-[calc(100vh-7rem)] sm:w-80 sm:rounded-2xl">
          <div className="space-y-4">
            {storageError && (
              <p className="rounded-lg bg-[var(--color-alert)]/15 p-2 text-xs text-[var(--color-alert)]">
                No se puede escribir en este navegador (modo privado o almacenamiento lleno):
                las rutas no se conservarán al recargar.
              </p>
            )}

            <StatusPanel
              route={activeRoute}
              progress={progress}
              accuracyM={geo.accuracyM}
              tracking={geo.isTracking}
              geoError={geo.error}
              thresholdM={thresholdM}
              onThresholdChange={setThresholdM}
            />

            <section>
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                {editing ? 'Dibujando ruta' : 'Mis rutas'}
              </h2>

              {editing ? (
                <div className="space-y-2">
                  <p className="text-sm text-[var(--color-text-muted)]">
                    Toca el mapa para añadir puntos. Arrastra un punto para moverlo o tócalo
                    para borrarlo.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setDraft((prev) => prev?.slice(0, -1) ?? prev)}
                      disabled={!draft?.length}
                      className="rounded-lg bg-[var(--color-surface-muted)] px-3 py-2 text-sm disabled:opacity-40"
                    >
                      Deshacer
                    </button>
                    <button
                      type="button"
                      onClick={saveDraft}
                      disabled={(draft?.length ?? 0) < 2}
                      className="rounded-lg bg-[var(--color-brand-500)] px-3 py-2 text-sm font-medium text-white disabled:opacity-40"
                    >
                      Guardar
                    </button>
                    <button
                      type="button"
                      onClick={() => setDraft(null)}
                      className="rounded-lg px-3 py-2 text-sm text-[var(--color-text-muted)]"
                    >
                      Cancelar
                    </button>
                  </div>
                  {(draft?.length ?? 0) < 2 && (
                    <p className="text-xs text-[var(--color-text-muted)]">
                      Hacen falta al menos 2 puntos para guardar.
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={startDrawing}
                    className="w-full rounded-lg bg-[var(--color-brand-500)] px-3 py-2 text-sm font-medium text-white"
                  >
                    Dibujar ruta
                  </button>
                  <RouteList
                    routes={routes}
                    activeId={activeId}
                    onSelect={setActiveId}
                    onRemove={removeRoute}
                    onRename={renameRoute}
                    disabled={editing}
                  />
                </div>
              )}
            </section>
          </div>
        </aside>
      )}
    </div>
  );
}
