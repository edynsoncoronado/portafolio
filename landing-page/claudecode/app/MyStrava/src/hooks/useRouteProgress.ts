import { useMemo } from 'react';
import type { LatLng, Route, RouteProgress } from '../types';
import { computeProgress } from '../lib/geo';

/** Cruza la posición del GPS con la ruta activa. Null si falta alguna de las dos. */
export function useRouteProgress(
  route: Route | null,
  position: LatLng | null,
  thresholdM: number,
  accuracyM: number | null,
): RouteProgress | null {
  return useMemo(() => {
    if (!route || !position || route.points.length === 0) return null;
    return computeProgress(route.points, position, {
      thresholdM,
      accuracyM: accuracyM ?? 0,
    });
  }, [route, position, thresholdM, accuracyM]);
}
