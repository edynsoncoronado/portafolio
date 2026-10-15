import { useCallback, useEffect, useState } from 'react';
import type { LatLng, Route } from '../types';
import { createRoute, loadRoutes, saveRoutes } from '../lib/storage';

/**
 * Rutas guardadas en este dispositivo. El estado es la fuente de verdad y cada
 * cambio se vuelca a localStorage; si el navegador lo rechaza, se expone en
 * `storageError` para poder avisar al usuario de que no se está guardando nada.
 */
export function useRoutes() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [storageError, setStorageError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setRoutes(loadRoutes());
    setLoaded(true);
  }, []);

  // Evitamos escribir en el primer render, que borraría lo guardado.
  useEffect(() => {
    if (!loaded) return;
    setStorageError(!saveRoutes(routes));
  }, [routes, loaded]);

  const addRoute = useCallback((name: string, points: LatLng[]) => {
    const route = createRoute(name, points);
    setRoutes((prev) => [route, ...prev]);
    setActiveId(route.id);
    return route;
  }, []);

  const removeRoute = useCallback((id: string) => {
    setRoutes((prev) => prev.filter((route) => route.id !== id));
    setActiveId((current) => (current === id ? null : current));
  }, []);

  const renameRoute = useCallback((id: string, name: string) => {
    setRoutes((prev) =>
      prev.map((route) =>
        route.id === id ? { ...route, name, updatedAt: new Date().toISOString() } : route,
      ),
    );
  }, []);

  const activeRoute = routes.find((route) => route.id === activeId) ?? null;

  return {
    routes,
    activeRoute,
    activeId,
    setActiveId,
    addRoute,
    removeRoute,
    renameRoute,
    storageError,
  };
}
