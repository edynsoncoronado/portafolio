import { divIcon } from 'leaflet';
import { Circle, Marker, Polyline } from 'react-leaflet';
import type { LatLng } from '../types';
import { MAP_COLORS } from '../lib/colors';

const dotIcon = divIcon({
  className: '',
  html: '<div class="user-dot"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

type UserMarkerProps = {
  position: LatLng;
  accuracyM: number | null;
  /** Punto de la ruta más cercano; dibuja la línea "estás aquí respecto a la ruta". */
  linkTo: LatLng | null;
  offRoute: boolean;
};

export default function UserMarker({ position, accuracyM, linkTo, offRoute }: UserMarkerProps) {
  return (
    <>
      {/* El círculo de precisión evita interpretar el punto como una certeza. */}
      {accuracyM !== null && accuracyM > 0 && (
        <Circle
          center={[position.lat, position.lng]}
          radius={accuracyM}
          pathOptions={{
            color: MAP_COLORS.user,
            fillColor: MAP_COLORS.userFill,
            fillOpacity: 0.15,
            weight: 1,
          }}
        />
      )}

      {linkTo && (
        <Polyline
          positions={[
            [position.lat, position.lng],
            [linkTo.lat, linkTo.lng],
          ]}
          pathOptions={{
            color: offRoute ? MAP_COLORS.offRoute : MAP_COLORS.onRoute,
            weight: 3,
            dashArray: '6 8',
          }}
        />
      )}

      <Marker position={[position.lat, position.lng]} icon={dotIcon} zIndexOffset={1000} />
    </>
  );
}
