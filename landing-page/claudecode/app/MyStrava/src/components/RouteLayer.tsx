import { useMemo } from 'react';
import { divIcon } from 'leaflet';
import { Marker, Polyline } from 'react-leaflet';
import type { LatLng } from '../types';
import { MAP_COLORS } from '../lib/colors';

const toLatLngTuples = (points: LatLng[]) =>
  points.map((point) => [point.lat, point.lng] as [number, number]);

/**
 * Icono de vértice hecho con divIcon en vez de una imagen: evita el conocido
 * problema de los iconos por defecto de Leaflet, cuyas URLs se rompen al pasar
 * por un bundler.
 */
const vertexIcon = (label: number) =>
  divIcon({
    className: '',
    html: `<div class="vertex-pin">${label}</div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });

type RouteLayerProps = {
  points: LatLng[];
  editable: boolean;
  onMovePoint?: (index: number, point: LatLng) => void;
  onRemovePoint?: (index: number) => void;
};

export default function RouteLayer({
  points,
  editable,
  onMovePoint,
  onRemovePoint,
}: RouteLayerProps) {
  const line = useMemo(() => toLatLngTuples(points), [points]);

  if (points.length === 0) return null;

  return (
    <>
      {line.length > 1 && (
        <Polyline
          positions={line}
          pathOptions={{ color: MAP_COLORS.route, weight: 5, opacity: 0.9 }}
        />
      )}

      {editable &&
        points.map((point, index) => (
          <Marker
            key={`${index}-${point.lat}-${point.lng}`}
            position={[point.lat, point.lng]}
            icon={vertexIcon(index + 1)}
            draggable
            eventHandlers={{
              dragend(event) {
                const { lat, lng } = event.target.getLatLng();
                onMovePoint?.(index, { lat, lng });
              },
              // Un clic sobre un vértice lo elimina: es el gesto más directo
              // para corregir un punto mal puesto sin salir del mapa.
              click() {
                onRemovePoint?.(index);
              },
            }}
          />
        ))}
    </>
  );
}
