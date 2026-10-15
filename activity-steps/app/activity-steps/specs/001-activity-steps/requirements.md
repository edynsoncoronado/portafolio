# 001 · Actividades con pasos — Requisitos

## Contexto
Quiero registrar procesos que repito (despliegues, configuraciones) como actividades con pasos ordenados y ver por cuál voy.

## Historia de usuario
Como desarrollador, quiero crear una actividad con sus pasos y completarlos en orden, para saber en todo momento qué falta.

## Glosario
- **Actividad**: identificada por un UUID generado por el sistema al crearla.
- **Paso**: identificado por su posición dentro de la actividad (1..n). Tiene un texto, un estado (pendiente | completado) y, si está completado, una fecha de completado.
- **Texto normalizado**: texto sin espacios al inicio ni al final. Es lo que se guarda (título y pasos).
- **Usuario**: quien invoca los casos de uso (no hay API ni CLI).
- **Rechazar / indicar**: el caso de uso lanza la excepción de dominio específica de ese caso (ver «Errores»), con mensaje en español.

## Requisitos funcionales (EARS)
- **RF1** CUANDO el usuario crea una actividad con un título y una lista de pasos válidos, EL SISTEMA DEBE guardarla con un UUID nuevo, el título y los pasos normalizados, los pasos en el orden recibido (posiciones 1..n) y todos pendientes.
- **RF2** SI el título está vacío o solo contiene espacios, o la lista de pasos está vacía, EL SISTEMA DEBE rechazar la creación.
- **RF3** CUANDO el usuario completa un paso que es el primero o cuyo paso anterior está completado, EL SISTEMA DEBE marcarlo como completado y registrar la fecha y hora de completado como `datetime` con zona horaria UTC.
- **RF4** SI el usuario intenta completar un paso cuyo paso anterior está pendiente, EL SISTEMA DEBE rechazarlo indicando la posición del primer paso pendiente (como dato de la excepción y en el mensaje).
- **RF5** SI el usuario intenta completar un paso ya completado, EL SISTEMA DEBE rechazarlo.
- **RF6** CUANDO se completa el último paso pendiente, EL SISTEMA DEBE marcar la actividad como completada. Mientras quede algún paso pendiente, la actividad no está completada.
- **RF7** CUANDO el usuario consulta una actividad por su UUID, EL SISTEMA DEBE devolver:
  - si la actividad está completada;
  - el progreso como porcentaje entero redondeado hacia abajo: `completados * 100 // total` (por ejemplo, 2 de 3 da 66; solo da 100 cuando todos los pasos están completados);
  - para cada paso: posición, texto, estado y fecha de completado (vacía si está pendiente).
- **RF8** SI el usuario consulta una actividad o completa un paso de una actividad cuyo UUID no existe, EL SISTEMA DEBE indicar que la actividad no existe.
- **RF9** SI el usuario intenta completar un paso cuya posición está fuera de 1..n, EL SISTEMA DEBE indicar que el paso no existe.
- **RF10** SI algún paso está vacío o solo contiene espacios, EL SISTEMA DEBE rechazar la creación.
- **RF11** SI dos o más pasos son iguales tras normalizarlos y sin distinguir mayúsculas de minúsculas (por ejemplo, «Deploy» y « deploy »), EL SISTEMA DEBE rechazar la creación.
- **RF12** SI una petición cumple varias condiciones de error, EL SISTEMA DEBE lanzar solo la primera según este orden:
  - Crear: título inválido (RF2) → lista vacía (RF2) → paso vacío (RF10) → paso duplicado (RF11).
  - Completar: actividad inexistente (RF8) → posición fuera de rango (RF9) → paso ya completado (RF5) → paso anterior pendiente (RF4).

## Errores
Cada caso tiene su propia excepción de dominio (los nombres se fijan en `design.md`; código en inglés, mensajes en español).

| Caso | RF | Datos de la excepción |
|---|---|---|
| Título inválido | RF2 | — |
| Sin pasos | RF2 | — |
| Paso vacío | RF10 | posición del paso |
| Paso duplicado | RF11 | texto duplicado |
| Paso anterior pendiente | RF4 | posición del primer paso pendiente |
| Paso ya completado | RF5 | posición |
| Actividad no encontrada | RF8 | UUID |
| Paso no encontrado | RF9 | posición |

## Requisitos no funcionales
- **RNF1** `domain/` no importa de `application/` ni de `infrastructure/`; `application/` no importa de `infrastructure/`. Lo comprueba un test automático que analiza los imports con `ast` (biblioteca estándar).
- **RNF2** Los tests corren sin servicios externos.
- **RNF3** Todas las fechas son `datetime` con zona horaria UTC. Cómo se obtiene la hora se decide en `design.md`.

## Fuera de alcance
Usuarios/auth; editar, reordenar o borrar pasos; deshacer un paso completado; editar o borrar la actividad; listar actividades; frontend; base de datos y API HTTP.

## Definition of done
- Cada RF y RNF tiene al menos un test que lo nombra, y `uv run pytest` está en verde.
- `specs/001-activity-steps/validation.md` está completa: una fila por cada RF/RNF con el requisito, los tests que lo cubren y su estado.
