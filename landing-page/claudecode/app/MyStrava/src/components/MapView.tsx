import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import type { LatLng } from '../types';

/** Lima como punto de partida hasta que el GPS diga otra cosa. */
export const DEFAULT_CENTER: LatLng = { lat: -12.0464, lng: -77.0428 };
export const DEFAULT_ZOOM = 14;

type ClickCatcherProps = {
  enabled: boolean;
  onMapClick: (point: LatLng) => void;
};

/** Traduce los clics del mapa en vértices, solo mientras se edita. */
function ClickCatcher({ enabled, onMapClick }: ClickCatcherProps) {
  useMapEvents({
    click(event) {
      if (!enabled) return;
      onMapClick({ lat: event.latlng.lat, lng: event.latlng.lng });
    },
  });
  return null;
}

type FollowProps = {
  position: LatLng | null;
  follow: boolean;
  onUserPan: () => void;
};

/**
 * Recentra el mapa en cada lectura del GPS mientras el seguimiento esté activo.
 * Si el usuario arrastra el mapa a mano, lo desactivamos: pelearse con el
 * usuario por el centro del mapa es la forma más rápida de hacerlo inusable.
 */
function FollowController({ position, follow, onUserPan }: FollowProps) {
  const map = useMap();

  useMapEvents({
    dragstart() {
      if (follow) onUserPan();
    },
  });

  useEffect(() => {
    if (follow && position) {
      map.panTo([position.lat, position.lng], { animate: true, duration: 0.5 });
    }
  }, [map, follow, position]);

  return null;
}

/** Ajusta el encuadre para que quepa una lista de puntos. */
export function FitBounds({ points, token }: { points: LatLng[]; token: string | null }) {
  const map = useMap();

  useEffect(() => {
    if (!token || points.length === 0) return;
    if (points.length === 1) {
      map.setView([points[0]!.lat, points[0]!.lng], 16);
      return;
    }
    map.fitBounds(
      points.map((point) => [point.lat, point.lng] as [number, number]),
      { padding: [48, 48] },
    );
    // El token cambia solo al cargar otra ruta: así el encuadre no se rehace
    // cada vez que el usuario añade un punto mientras dibuja.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, token]);

  return null;
}

type MapViewProps = {
  center: LatLng;
  editing: boolean;
  onMapClick: (point: LatLng) => void;
  followPosition: LatLng | null;
  follow: boolean;
  onUserPan: () => void;
  children: React.ReactNode;
};

export default function MapView({
  center,
  editing,
  onMapClick,
  followPosition,
  follow,
  onUserPan,
  children,
}: MapViewProps) {
  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={DEFAULT_ZOOM}
      zoomControl={false}
      className="h-full w-full"
    >
      {/* La atribución de OpenStreetMap es obligatoria por la licencia de los tiles. */}
      <TileLayer
        attribution='&copy; colaboradores de <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
      />
      <ClickCatcher enabled={editing} onMapClick={onMapClick} />
      <FollowController position={followPosition} follow={follow} onUserPan={onUserPan} />
      {children}
    </MapContainer>
  );
}
