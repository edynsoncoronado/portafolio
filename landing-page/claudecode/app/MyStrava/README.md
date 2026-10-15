# MyStrava

**En producción:** https://mystrava-tau.vercel.app

MVP para dibujar una ruta sobre el mapa y seguir con el GPS dónde estás respecto a ella.
No hay backend: las rutas se guardan en el `localStorage` del navegador.

## Arrancar

```bash
npm install
npm run dev        # http://localhost:5174
```

Otros comandos: `npm run build`, `npm run preview`, `npm run typecheck`.

## Cómo se usa

1. **Dibujar ruta** — cada toque en el mapa añade un punto. Arrastra un punto para
   moverlo, tócalo para borrarlo, o usa *Deshacer*. Hacen falta al menos 2 puntos
   para guardar.
2. **Activar GPS** — el panel muestra a qué distancia estás de la ruta, cuánto llevas
   recorrido, cuánto falta y si te has salido del camino. En el mapa, una línea
   punteada une tu posición con el punto más cercano de la ruta: verde si vas bien,
   roja si te has desviado.
3. El **margen antes de avisar** (30 m por defecto) se ajusta con el deslizador. El
   aviso descuenta la precisión del GPS, para que una señal mala no dispare falsas
   alarmas.

## Requisito importante del GPS

La API de geolocalización del navegador solo funciona en **contexto seguro**: `localhost`
o HTTPS. Desde `file://` o una IP de la red local no pedirá permiso siquiera. Para
probarlo en el móvil:

```bash
npm run dev -- --host    # y aceptar el aviso del navegador
```

…o desplegar a Vercel, que sirve por HTTPS.

## Dónde está cada cosa

| Archivo | Qué hace |
|---|---|
| `src/lib/geo.ts` | Toda la geometría: haversine, proyección sobre la ruta, progreso |
| `src/lib/storage.ts` | Lectura y escritura en `localStorage` (clave `mystrava.routes.v1`) |
| `src/hooks/useGeolocation.ts` | `watchPosition`, permisos y errores |
| `src/hooks/useRouteProgress.ts` | Cruza la posición con la ruta activa |
| `src/components/MapView.tsx` | Mapa Leaflet, clics de edición y seguimiento |

Los colores de las capas del mapa viven en `src/lib/colors.ts` como valores literales:
Leaflet los aplica como atributos SVG, donde `var(--token)` no se resuelve.

## Fuera del alcance de este MVP

Sin backend ni cuentas, sin grabación de actividades ni historial, sin ruteo por calles
(las rutas son líneas rectas entre puntos), sin importar/exportar GPX y sin modo offline.

Los mapas son de OpenStreetMap; su atribución es obligatoria y va visible en el mapa.
