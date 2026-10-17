# Tareas — Spec 001: Registro de actividades

Fuente: `spec.md` (RF-1 a RF-11) y `plan.md`. Normas para cada tarea (constitución y AGENTS.md):
- **TDD**: primero el test en rojo, después el código mínimo para ponerlo en verde, y al final refactorizar.
- Los tests se nombran con su RF (`test_rf6_…`). Nunca tocan el `activities.json` real; usan `tmp_path` o dobles.
- Una tarea cada vez. Se cierra con `uv run pytest` en verde y marcando su checkbox.
- «Dep.» indica las tareas que deben estar terminadas antes.

## Fase 0 — Base

- [ ] **T01 — Test de arquitectura hexagonal** · Principio 3 · Dep.: —
  - Crear `tests/activities/infrastructure/__init__.py` y `tests/activities/test_architecture.py`, que recorre con `ast` los imports de `src/activities/domain/` y `src/activities/application/`.
  - Hecho cuando: el test pasa con el árbol actual y falla si se añade temporalmente `import src.activities.infrastructure` en un módulo de `domain/` (comprobado a mano y revertido).

## Fase 1 — Dominio

- [ ] **T02 — Catálogo de errores** · RF-9, RNF-2, RNF-4 · Dep.: T01
  - `domain/errors.py`: excepción base con `code`, `type` y `message`, y las 11 entradas E-01 a E-11. E-04 recibe el nombre del campo.
  - Hecho cuando: un test parametrizado comprueba, para cada código, el `type` (`validation`, `not_found`, `conflict`, `storage`) y el texto literal de la spec, incluido E-04 con `{campo}` sustituido.

- [ ] **T03 — Recorte y conteo de caracteres** · RF-1, RF-2 · Dep.: T01
  - `domain/text_rules.py`: `clean(s)` y `char_count(s)` (NFC + `len`).
  - Hecho cuando: hay tests en verde para «  a  » → «a», «e» + U+0301 → 1 carácter y 👨‍👩‍👧 → 5 caracteres.

- [ ] **T04 — Validación del nombre** · RF-1 · Dep.: T02, T03
  - `validate_name(raw) -> str`, que devuelve el nombre recortado.
  - Hecho cuando: hay tests en verde para nulo → E-01, «» → E-01, «   » → E-01, 100 caracteres (con espacios alrededor) → válido y recortado, y 101 → E-02.

- [ ] **T05 — Validación de la descripción** · RF-2 · Dep.: T02, T03
  - `validate_description(raw) -> str | None`.
  - Hecho cuando: hay tests en verde para nulo → `None`, «  » → `None`, « hola » → «hola», 500 caracteres → válida y 501 → E-03.

- [ ] **T06 — Clave de unicidad del nombre** · RF-1, RF-4 · Dep.: T03
  - `name_key(s)`: recorte, espacios colapsados, NFKD sin marcas combinantes y `casefold`.
  - Hecho cuando: hay tests en verde para «Leer» = «  leer » = «LEER» = «Leer» con espacios internos dobles, «Meditación» = «meditacion», «Straße» = «STRASSE», y «Leer» ≠ «Leo».

- [ ] **T07 — Cálculo de racha** · RF-8 · Dep.: T01
  - `domain/streak.py`: `compute_streak(history, today)` según el pseudocódigo de `plan.md` §3.
  - Hecho cuando: hay tests en verde para historial vacío → 0, solo hoy → 1, solo ayer → 1, solo anteayer → 0, hoy + ayer + anteayer → 3, ayer + anteayer sin hoy → 2, y huecos (hoy, ayer, hace 3 días) → 2.

- [ ] **T08 — Entidad `Activity` y consultas** · RF-3, RF-7, RF-10 · Dep.: T07
  - `domain/activity.py`: dataclass con `id`, `name`, `description`, `created_at` e `history`; consultas `is_done_on(today)`, `total_days`, `last_done` y `streak(today)`. Un historial con fechas repetidas se rechaza.
  - Hecho cuando: hay tests en verde para las consultas con historial vacío (`last_done` es `None`) y con datos, y para el rechazo de fechas repetidas en el constructor.

- [ ] **T09 — Marcar como hecha** · RF-6 · Dep.: T02, T08
  - `Activity.mark_done(today)`.
  - Hecho cuando: hay tests en verde para el primer marcado → historial `[hoy]` y racha 1, y para el segundo marcado el mismo día → E-06 con el historial sin cambios.

- [ ] **T10 — Renombrar y cambiar la descripción** · RF-4 · Dep.: T04, T05, T08
  - `Activity.rename(raw)` y `Activity.set_description(raw)`, que reutilizan las validaciones de T04 y T05.
  - Hecho cuando: hay tests en verde para renombrar con recorte, nombre inválido → E-01/E-02 con la entidad sin cambios, descripción nula o vacía → `None`, y descripción de 501 caracteres → E-03.

- [ ] **T11 — Consistencia de los datos cargados** · RF-10 · Dep.: T02, T06, T08
  - `domain/consistency.py`: `ensure_consistent(activities, today)`.
  - Hecho cuando: hay tests en verde para datos válidos → no lanza nada, dos nombres con el mismo `name_key` → E-08, y una fecha posterior a hoy → E-08.

## Fase 2 — Aplicación

- [ ] **T12 — Puertos y dobles de test** · RF-10, RNF-6 · Dep.: T08
  - `application/ports.py`: `ActivityRepository` (`list_all`, `get`, `save`, `delete`), `Clock` e `IdGenerator` como `Protocol`, más `StorageReadError` y `StorageWriteError` (E-08/E-09).
  - `tests/activities/fakes.py`: `InMemoryActivityRepository` (con opción de forzar errores de lectura o escritura y de contar escrituras), `FixedClock` y `SequentialIdGenerator`.
  - Hecho cuando: un test de humo en verde hace `save`, `get`, `list_all` (manteniendo el orden de inserción) y `delete` sobre el doble, y comprueba que los errores forzados se lanzan.

- [ ] **T13 — DTO de detalle, resumen y patch** · RF-3, RF-4, RF-7 · Dep.: T08
  - `application/dto.py`: `ActivityDetail` y `ActivitySummary` (con constructores desde `Activity` + `today`), `ActivityPatch` y `MISSING`.
  - Hecho cuando: hay tests en verde que comprueban que el detalle tiene exactamente los 9 campos de `plan.md` §4, el resumen los 7, y que `done_today`, `streak`, `total_days` y `last_done` se calculan con el `today` recibido.

- [ ] **T14 — `load` común + crear (camino feliz)** · RF-1, RF-2 · Dep.: T05, T11, T12, T13
  - `application/use_cases.py`: un helper `load` (`list_all` + `ensure_consistent`) y `CreateActivity`. El caso de uso lee `clock.now()` una sola vez.
  - Hecho cuando: hay tests en verde para crear con nombre y descripción → detalle con id del generador, `created_at` del reloj, historial vacío y racha 0, y la actividad persistida en el doble; y para crear sin descripción → `description` es `None`.

- [ ] **T15 — Crear: errores y precedencia** · RF-1, RF-2, RF-9, RF-10 · Dep.: T14
  - Hecho cuando: hay tests en verde para nombre vacío → E-01; 101 caracteres → E-02; descripción de 501 → E-03; nombre vacío + descripción larga → E-01; «  LEER » con «Leer» ya existente → E-05; nombre duplicado + descripción larga → E-03 (el formato va antes que el conflicto); y escritura forzada a fallar → E-09. En todos los errores, el doble registra 0 escrituras.

- [ ] **T16 — Consultar** · RF-3 · Dep.: T14
  - `GetActivity`.
  - Hecho cuando: hay tests en verde para un id existente → detalle con el historial ascendente, un UUID inexistente → E-07 e «abc» → E-07.

- [ ] **T17 — Listar** · RF-7 · Dep.: T14
  - `ListActivities`.
  - Hecho cuando: hay tests en verde para sin actividades → `[]`, tres actividades → orden por `created_at`, y dos con el mismo `created_at` → orden de inserción.

- [ ] **T18 — Marcar como hecha hoy** · RF-6, RF-8 · Dep.: T09, T14
  - `MarkActivityDone`.
  - Hecho cuando: hay tests en verde para marcar → detalle con `done_today` verdadero y racha actualizada; marcar dos veces → E-06 sin escritura; id inexistente → E-07; el reloj fijo a las 23:59:59 → se guarda esa fecha y el reloj se consulta una sola vez; y escritura fallida → E-09.

- [ ] **T19 — Editar (camino feliz)** · RF-4 · Dep.: T10, T14
  - `UpdateActivity`.
  - Hecho cuando: hay tests en verde para cambiar solo el nombre (la descripción se conserva); cambiar solo la descripción; descripción `None` o «» → se elimina; omitir la descripción → se conserva; patch vacío → detalle sin cambios y 0 escrituras; y renombrar «Leer» a «LEÉR» → válido, porque la propia actividad no cuenta para la unicidad.

- [ ] **T20 — Editar: errores y precedencia** · RF-4, RF-9 · Dep.: T19
  - Hecho cuando: hay tests en verde para id inexistente + nombre vacío → E-07; `forbidden=("history",)` + nombre válido → E-04 con «history» y sin cambios; `forbidden=("id","history")` → E-04 nombra «id»; `history` + nombre vacío → E-04; nombre vacío + descripción larga → E-01; nombre que coincide con otra actividad → E-05; y escritura fallida → E-09.

- [ ] **T21 — Borrar** · RF-5 · Dep.: T14
  - `DeleteActivity`.
  - Hecho cuando: hay tests en verde para borrar → devuelve `None` y la actividad desaparece; id inexistente → E-07; escritura fallida → E-09; y borrar y volver a crear con el mismo nombre → otro id y el historial vacío.

- [ ] **T22 — E-08 en todas las operaciones** · RF-10 · Dep.: T15–T21
  - Hecho cuando: un test parametrizado sobre los 6 casos de uso da E-08 cuando el doble fuerza un error de lectura, y también cuando contiene datos inconsistentes (nombres duplicados o una fecha futura). En ningún caso hay escrituras.

## Fase 3 — Infraestructura

- [ ] **T23 — Repositorio JSON: lectura válida** · RF-10, RNF-1, RNF-3, RNF-5 · Dep.: T12
  - `infrastructure/json_repository.py`: `JsonFileActivityRepository(path)` con `list_all` y `get`.
  - Hecho cuando: hay tests en verde (con `tmp_path`) para archivo inexistente → `[]`, y el JSON de ejemplo de `plan.md` §2 → 2 actividades con sus tipos (`UUID`, `datetime` con desfase, `date`) en el orden del archivo.

- [ ] **T24 — Repositorio JSON: lectura inválida** · RF-10 · Dep.: T23
  - Hecho cuando: un test parametrizado da `StorageReadError` (E-08) para JSON roto, raíz no objeto, `version` ≠ 1, clave que falta o sobra, tipo erróneo, id que no es UUID, `created_at` sin desfase, fecha mal formada, fecha repetida en un historial e id duplicado. En todos los casos el contenido del archivo queda idéntico tras el error.

- [ ] **T25 — Repositorio JSON: escritura** · RF-1, RF-4, RF-5, RF-6, RF-10 · Dep.: T23
  - `save` (inserta o reemplaza conservando la posición) y `delete`, con escritura atómica (archivo temporal + `os.replace`), `history` ordenado e indentación legible con `ensure_ascii=False`.
  - Hecho cuando: hay tests en verde para la ida y vuelta guardar → leer → iguales; reemplazar sin cambiar el orden; borrar; el archivo legible con tildes sin escapar; ningún temporal residual; y una ruta cuyo padre es un archivo → `StorageWriteError` (E-09).

- [ ] **T26 — Reloj e ids del sistema** · RF-1, RNF-5 · Dep.: T12
  - `infrastructure/system_clock.py`: `SystemClock` y `UuidGenerator`.
  - Hecho cuando: hay tests en verde que comprueban que `SystemClock().now()` tiene `tzinfo` y que `UuidGenerator().new()` devuelve un `UUID` versión 4 distinto en cada llamada.

- [ ] **T27 — HTTP: esqueleto, router, E-11 y formato de error** · RF-11, RNF-2, RNF-4 · Dep.: T02, T12
  - `infrastructure/http_api.py`: un handler que recibe los casos de uso inyectados, el mapeo de `type` a HTTP (400/404/409/500) y la serialización del error.
  - Fixture de test: servidor en el puerto 0 en un hilo, con el repositorio sobre `tmp_path` y `FixedClock`.
  - Hecho cuando: hay tests en verde para `GET /nada` → 404 con `{"error":{"code":"E-11","type":"not_found","message":"Ruta no encontrada."}}` y `PUT /activities` → 404 E-11, ambos con `Content-Type: application/json; charset=utf-8`.

- [ ] **T28 — HTTP: parseo del cuerpo y coerción N2** · RF-1, RF-2, RF-4, RF-11 · Dep.: T13, T27
  - Funciones puras de parseo: cuerpo vacío → `{}`; JSON inválido o algo que no sea un objeto → E-10; coerción con `json.dumps` (salvo `null`); construcción de `ActivityPatch` (`forbidden` en el orden id, created_at, history; `MISSING`; claves desconocidas ignoradas).
  - Hecho cuando: hay tests unitarios en verde para `b""` → `{}`, `b"{"` → E-10, `b"[1]"` → E-10, `123` → «123», `true` → «true», `{"a":1}` → «{"a": 1}», `null` se conserva, y `{"history":[],"id":"x","foo":1,"name":"A"}` → `forbidden=("id","history")`, `name="A"`, `description=MISSING`.

- [ ] **T29 — HTTP: crear, listar y consultar** · RF-1, RF-3, RF-7 · Dep.: T15, T16, T17, T25, T28
  - Hecho cuando: hay tests extremo a extremo en verde para `POST /activities` → 201 + detalle; `GET /activities` → 200 + lista de resúmenes en orden; `GET /activities/{id}` → 200 + detalle; `GET /activities/abc` → 404 E-07; `POST` con `{"name":123}` → 201 con nombre «123»; y `POST` sin nombre → 400 E-01.

- [ ] **T30 — HTTP: editar, borrar y marcar** · RF-4, RF-5, RF-6 · Dep.: T18, T20, T21, T29
  - Hecho cuando: hay tests extremo a extremo en verde para `PATCH` → 200 + detalle; `PATCH` con `history` → 400 E-04; `PATCH` con `{"foo":1}` → 200 sin cambios; `DELETE` → 204 sin cuerpo y después `GET` → 404 E-07; `POST /activities/{id}/done` → 200 con `done_today` verdadero; y repetir el marcado → 409 E-06.

- [ ] **T31 — HTTP: errores de almacenamiento y precedencia** · RF-9, RF-10, RF-11 · Dep.: T24, T30
  - Hecho cuando: hay tests extremo a extremo en verde para un `activities.json` corrupto en `tmp_path` → `GET /activities` da 500 E-08 y el archivo no cambia; una ruta no escribible → `POST` da 500 E-09; `PATCH /activities/{inexistente}` con el cuerpo `{` → 400 E-10 (E-10 va antes que E-07); y `POST /activities` con un nombre duplicado → 409 E-05.

- [ ] **T32 — Raíz de composición y arranque** · Principio 5, RNF-1 · Dep.: T26, T31
  - `infrastructure/main.py`: `build_app(data_path)` y `main()`. Calcula la ruta `<raíz del repo>/activities.json` y para con Ctrl+C con código 0.
  - Hecho cuando: un test en verde comprueba que la ruta por defecto termina en `activities.json` y está en la raíz del repositorio (sin abrir el archivo), y que `build_app(tmp_path/"a.json")` sirve peticiones. Además, `uv run python -m src.activities.infrastructure.main` arranca y responde a `curl -s localhost:8000/activities` (comprobado a mano).

## Fase 4 — Cierre

- [ ] **T33 — Trazabilidad final** · RF-1 a RF-11 · Dep.: T01–T32
  - Hecho cuando: `uv run pytest -k rfN` encuentra al menos un test para cada N de 1 a 11; cada código E-01 a E-11 se comprueba por su texto literal en algún test; cada caso límite de `spec.md` §6 tiene un test; y `uv run pytest` está en verde.
