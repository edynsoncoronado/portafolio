export type LatLng = {
  lat: number;
  lng: number;
};

export type Route = {
  id: string;
  name: string;
  points: LatLng[];
  /** Longitud total de la ruta en metros, precalculada al guardar. */
  distanceM: number;
  createdAt: string;
  updatedAt: string;
};

/** Punto de la ruta más cercano a una posición dada. */
export type ClosestPoint = {
  point: LatLng;
  /** Distancia perpendicular desde la posición hasta la ruta, en metros. */
  distanceM: number;
  /** Índice del segmento (points[i] → points[i + 1]) donde cae la proyección. */
  segmentIndex: number;
  /** Posición dentro del segmento, de 0 (inicio) a 1 (fin). */
  t: number;
};

/** Relación entre la posición actual del GPS y la ruta activa. */
export type RouteProgress = {
  closest: ClosestPoint;
  /** Metros recorridos a lo largo de la ruta hasta el punto proyectado. */
  traveledM: number;
  remainingM: number;
  percent: number;
  offRoute: boolean;
};

export type GeoStatus = 'idle' | 'prompting' | 'tracking' | 'error' | 'unsupported';

export type GeoError = {
  code: 'permission' | 'unavailable' | 'timeout' | 'unsupported';
  message: string;
};
