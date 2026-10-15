import { useCallback, useEffect, useRef, useState } from 'react';
import type { GeoError, GeoStatus, LatLng } from '../types';

export type GeoState = {
  position: LatLng | null;
  accuracyM: number | null;
  headingDeg: number | null;
  speedMs: number | null;
  timestamp: number | null;
  status: GeoStatus;
  error: GeoError | null;
};

const INITIAL: GeoState = {
  position: null,
  accuracyM: null,
  headingDeg: null,
  speedMs: null,
  timestamp: null,
  status: 'idle',
  error: null,
};

function toGeoError(error: GeolocationPositionError): GeoError {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return {
        code: 'permission',
        message:
          'Diste permiso denegado a la ubicación. Habilítala en los ajustes del navegador para este sitio.',
      };
    case error.POSITION_UNAVAILABLE:
      return {
        code: 'unavailable',
        message: 'No hay señal de GPS disponible ahora mismo. Prueba a salir al exterior.',
      };
    default:
      return {
        code: 'timeout',
        message: 'La ubicación tardó demasiado en responder. Reintentando…',
      };
  }
}

/**
 * Sigue la posición del usuario con watchPosition.
 *
 * La API de geolocalización solo funciona en contexto seguro: localhost o
 * HTTPS. Desde `file://` o una IP de la red local el navegador la bloquea sin
 * preguntar, y aquí se vería como "no soportada".
 */
export function useGeolocation() {
  const [state, setState] = useState<GeoState>(INITIAL);
  const watchIdRef = useRef<number | null>(null);

  const stop = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setState((prev) => ({ ...prev, status: 'idle' }));
  }, []);

  const start = useCallback(() => {
    if (typeof navigator === 'undefined' || !('geolocation' in navigator)) {
      setState({
        ...INITIAL,
        status: 'unsupported',
        error: {
          code: 'unsupported',
          message: 'Este navegador no ofrece geolocalización, o la página no se sirve por HTTPS.',
        },
      });
      return;
    }

    if (watchIdRef.current !== null) return;

    setState((prev) => ({ ...prev, status: 'prompting', error: null }));

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        setState({
          position: { lat: pos.coords.latitude, lng: pos.coords.longitude },
          accuracyM: pos.coords.accuracy,
          headingDeg: pos.coords.heading,
          speedMs: pos.coords.speed,
          timestamp: pos.timestamp,
          status: 'tracking',
          error: null,
        });
      },
      (error) => {
        const geoError = toGeoError(error);
        // Un timeout es transitorio: el watcher sigue vivo y puede recuperarse,
        // así que conservamos la última posición conocida en pantalla.
        setState((prev) => ({
          ...prev,
          status: geoError.code === 'timeout' ? prev.status : 'error',
          error: geoError,
        }));
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 },
    );
  }, []);

  useEffect(() => stop, [stop]);

  return { ...state, start, stop, isTracking: state.status === 'tracking' || state.status === 'prompting' };
}
