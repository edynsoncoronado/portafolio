# Plan técnico — Spec 001: Registro de actividades

> Implementa `spec.md` (RF-1 a RF-11) respetando `docs/constitution.md`. Cada sección indica entre corchetes los RF que cubre.

## 1. Estructura de módulos [todos]

Capas hexagonales dentro de `src/activities/`. Las dependencias solo apuntan hacia dentro (principio 3).

```
src/activities/
├── domain/                      # sin dependencias de otras capas
│   ├── errors.py                # catálogo E-01…E-11 y jerarquía de excepciones    [RF-9, RNF-2, RNF-4]
│   ├── text_rules.py            # recorte, conteo NFC, validación, clave de unicidad [RF-1, RF-2, RF-4]
│   ├── activity.py              # entidad Activity (dataclass) y sus invariantes     [RF-1, RF-4, RF-6]
│   ├── streak.py                # compute_streak(history, today)                     [RF-8]
│   └── consistency.py           # ensure_consistent(activities, today)               [RF-10]
├── application/                 # importa solo de domain/
│   ├── ports.py                 # ActivityRepository, Clock, IdGenerator (Protocol); StorageReadError/StorageWriteError [RF-10]
│   ├── dto.py                   # ActivityDetail, ActivitySummary, ActivityPatch, MISSING [RF-3, RF-4, RF-7]
│   └── use_cases.py             # CreateActivity, GetActivity, UpdateActivity, DeleteActivity, MarkActivityDone, ListActivities [RF-1…RF-10]
└── infrastructure/              # importa de application/ y domain/
    ├── json_repository.py       # JsonFileActivityRepository: lectura validada + escritura atómica [RF-10, RNF-1]
    ├── system_clock.py          # SystemClock, UuidGenerator                          [RF-1, RNF-5]
    ├── http_api.py              # router, parseo del cuerpo, coerción N2, serialización, mapeo de errores a HTTP [RF-1…RF-7, RF-11]
    └── main.py                  # composición: cablea adaptadores y arranca el servidor
```

Los tests replican esta estructura en `tests/activities/{domain,application,infrastructure}/` (hay que crear `infrastructure/`).

**Responsabilidades clave**
- `text_rules.py`:
  - `clean(s)` recorta.
  - `char_count(s) = len(unicodedata.normalize("NFC", s))`.
  - `name_key(s)`: recorta, colapsa los espacios internos (`" ".join(s.split())`), aplica NFKD, quita los caracteres con `unicodedata.combining(c)` y aplica `casefold()`. Así «Meditación» = «meditacion» y «Straße» = «STRASSE».
  - `validate_name` (E-01, E-02) y `validate_description` (E-03).
- `activity.py`: `Activity(id: UUID, name: str, description: str | None, created_at: datetime, history: list[date])`. Métodos:
  - `mark_done(today)`, que lanza E-06 si `today` ya está en el historial.
  - `rename(name)` y `set_description(desc)`, que validan.
  - Consultas `is_done_on(today)`, `total_days` y `last_done`.
  - Invariante en el constructor: historial sin fechas repetidas.
- `use_cases.py`: cada caso de uso obtiene **una vez** `now = clock.now()` y `today = now.date()` (definición de «Hoy»), lee del repositorio, aplica `ensure_consistent` y opera.

## 2. Modelo de datos JSON [RF-1, RF-3, RF-10, RNF-1, RNF-3, RNF-5]

Archivo único `activities.json` en la raíz del repositorio (principio 5). Claves en inglés (RNF-3).

```json
{
  "version": 1,
  "activities": [
    {
      "id": "3f2b8c1e-9a4d-4e7b-b5a2-0c6d1e8f7a90",
      "name": "Leer",
      "description": "20 minutos antes de dormir",
      "created_at": "2026-10-14T21:05:12+02:00",
      "history": ["2026-10-15", "2026-10-16", "2026-10-17"]
    },
    {
      "id": "a1c4e6f8-2b3d-4f5a-8c7e-9d0b1a2c3e4f",
      "name": "Meditar",
      "description": null,
      "created_at": "2026-10-16T07:30:00+02:00",
      "history": []
    }
  ]
}
```

- **Solo se persisten datos de origen.** `streak`, `total_days`, `last_done` y `done_today` se calculan en cada petición con «hoy» y nunca se guardan.
- El orden del array es el **orden de inserción** y se usa para desempatar en RF-7. `history` se escribe ordenado de forma ascendente.
- **Validación al leer** (cualquier fallo da E-08 y el archivo no se modifica) [RF-10]:
  - Estructura: JSON válido, raíz objeto con `version == 1` y `activities` como lista.
  - Cada elemento tiene exactamente esas 5 claves con sus tipos: `id` UUID, `name` válido según `text_rules`, `description` nula o válida, `created_at` ISO 8601 con desfase horario y `history` lista de fechas `AAAA-MM-DD`.
  - Ids únicos (lo comprueba el adaptador).
  - Sin fechas repetidas en un historial (lo comprueba el invariante de `Activity`).
  - Sin nombres duplicados por `name_key` ni fechas posteriores a hoy. Esto necesita «hoy», así que lo hace `domain/consistency.py`, invocado desde la aplicación.
- **Si el archivo no existe**, se trata como una lista vacía [RF-10].

## 3. Algoritmo de racha [RF-8, RF-6, RF-7]

```
función compute_streak(historial: conjunto de fechas, hoy: fecha) → entero
    si hoy ∈ historial:
        cursor ← hoy
    si no, si (hoy − 1 día) ∈ historial:
        cursor ← hoy − 1 día
    si no:
        devolver 0                       # vacío o último día anterior a ayer
    racha ← 0
    mientras cursor ∈ historial:
        racha ← racha + 1
        cursor ← cursor − 1 día
    devolver racha
```

- Coste O(n) con un `set` de fechas. Las fechas futuras no pueden aparecer, porque RF-10 las rechaza al leer.
- Casos de la spec: primer marcado → 1; marcada ayer y no hoy → conserva la racha; último día anteayer → 0; huecos → solo cuenta el tramo final.

## 4. Contrato de la API HTTP [RF-1…RF-7, RF-9, RF-11, RNF-2…RNF-5]

Base `http://127.0.0.1:8000`. Respuestas en `application/json; charset=utf-8` con `ensure_ascii=False`, para que los mensajes en español se lean tal cual.

| Operación | Método y ruta | Cuerpo de entrada | Éxito | Errores posibles | RF |
|---|---|---|---|---|---|
| Crear | `POST /activities` | `{"name": …, "description"?: …}` | **201** + detalle | 400 E-10/E-01/E-02/E-03 · 409 E-05 · 500 E-08/E-09 | RF-1, RF-2 |
| Listar | `GET /activities` | — | **200** + `[resumen…]` | 500 E-08 | RF-7 |
| Consultar | `GET /activities/{id}` | — | **200** + detalle | 404 E-07 · 500 E-08 | RF-3 |
| Editar | `PATCH /activities/{id}` | `{"name"?: …, "description"?: …}` | **200** + detalle | 400 E-10/E-04/E-01/E-02/E-03 · 404 E-07 · 409 E-05 · 500 E-08/E-09 | RF-4 |
| Borrar | `DELETE /activities/{id}` | — | **204** sin cuerpo | 404 E-07 · 500 E-08/E-09 | RF-5 |
| Marcar hoy | `POST /activities/{id}/done` | se ignora | **200** + detalle | 404 E-07 · 409 E-06 · 500 E-08/E-09 | RF-6 |
| Otra ruta o método | — | — | — | 404 E-11 | RF-11 |

**Detalle** (RF-3; lo devuelven crear, consultar, editar y marcar):
```json
{
  "id": "3f2b8c1e-9a4d-4e7b-b5a2-0c6d1e8f7a90",
  "name": "Leer",
  "description": "20 minutos antes de dormir",
  "created_at": "2026-10-14T21:05:12+02:00",
  "done_today": true,
  "streak": 3,
  "total_days": 3,
  "last_done": "2026-10-17",
  "history": ["2026-10-15", "2026-10-16", "2026-10-17"]
}
```
**Resumen** (RF-7): `id`, `name`, `description`, `done_today`, `streak`, `total_days`, `last_done`. No incluye `created_at` ni `history`. La lista se ordena por `created_at` de forma estable, así que un empate conserva el orden de inserción.

**Error** (RNF-2, RNF-4):
```json
{ "error": { "code": "E-05", "type": "conflict", "message": "Ya existe una actividad con ese nombre." } }
```
| `type` | HTTP | Códigos |
|---|---|---|
| `validation` | 400 | E-01, E-02, E-03, E-04, E-10 |
| `not_found` | 404 | E-07, E-11 |
| `conflict` | 409 | E-05, E-06 |
| `storage` | 500 | E-08, E-09 |

**Reglas de entrada** (en `http_api.py`):
- **Cuerpo**: vacío equivale a `{}`; JSON inválido o algo que no sea un objeto da E-10 [RF-11].
- **Crear**: solo se leen `name` y `description`; el resto se ignora.
- **Editar**: `id`, `created_at` y `history` se recogen como campos prohibidos, en ese orden, en `ActivityPatch.forbidden`. `name` y `description` se pasan si están presentes (`MISSING` si no). Las demás claves se ignoran [RF-4].
- **Coerción N2**: un valor que no es `str` (salvo `null`) se convierte con `json.dumps(valor, ensure_ascii=False)`. Un `null` en el nombre da E-01; en la descripción, al crear es ausente y al editar la elimina [RF-1, RF-2, RF-4].
- **Id**: un formato no UUID da E-07. Lo resuelve el caso de uso (`uuid.UUID(id)` con `ValueError` → no encontrada) [RF-3].

**Precedencia** [RF-9]: E-11 (router) → E-10 (parseo) → E-08 (lectura) → E-07 → E-04 → E-01/E-02 → E-03 → E-05/E-06 → E-09 (escritura). Se informa un único error.

**Proceso**: `uv run python -m src.activities.infrastructure.main` arranca el servidor. Ctrl+C lo detiene con código de salida 0.

## 5. Flujo de cada caso de uso [RF-1…RF-10]

| Caso de uso | Pasos |
|---|---|
| CreateActivity | today/now → `load` (E-08) → validar nombre (E-01/E-02) → validar descripción (E-03) → unicidad (E-05) → `Activity(id_gen.new(), …, created_at=now, history=[])` → `save` (E-09) → detalle |
| GetActivity | today → `load` → parsear id/buscar (E-07) → detalle |
| UpdateActivity | today → `load` → buscar (E-07) → `forbidden` (E-04 con el primero) → nombre (E-01/E-02) → descripción (E-03) → unicidad sin contarse a sí misma (E-05) → si el patch está vacío, devolver sin escribir → `save` (E-09) → detalle |
| DeleteActivity | `load` → buscar (E-07) → `delete` (E-09) → nada |
| MarkActivityDone | today → `load` → buscar (E-07) → `mark_done(today)` (E-06) → `save` (E-09) → detalle |
| ListActivities | today → `load` → orden estable por `created_at` → resúmenes |

`load` = `repository.list_all()` (E-08 si el archivo es ilegible o tiene un esquema inválido) seguido de `ensure_consistent(activities, today)` (E-08 si hay nombres duplicados o fechas futuras).

## 6. Decisiones técnicas

| # | Decisión | Por qué | Alternativa descartada |
|---|---|---|---|
| D1 | `http.server.HTTPServer` + `BaseHTTPRequestHandler` | Biblioteca estándar (principio 1). Atiende una petición a la vez, que es justo lo que asume la spec (concurrencia fuera de alcance). | `ThreadingHTTPServer`: crea carreras sobre el archivo. `wsgiref`: añade una capa WSGI sin beneficio. |
| D2 | Puerto `ActivityRepository` con `list_all`, `get`, `save` y `delete` | Habla en términos de dominio y el doble en memoria es trivial. | `save_all(list)`: filtra a la aplicación el detalle de que todo vive en un único archivo. |
| D3 | Escritura atómica (archivo temporal en el mismo directorio + `os.replace`) | Un fallo a medias no deja un JSON corrupto, que provocaría E-08 en la siguiente ejecución [RF-10]. | Escribir directamente sobre el archivo. |
| D4 | Releer y validar el archivo en cada operación, sin caché | Detecta ediciones manuales («E-08 en cualquier operación»). El volumen está fuera de alcance. | Caché en memoria al arrancar. |
| D5 | Puertos `Clock` e `IdGenerator` inyectados | Tests deterministas sin fecha real (RNF-6). «Hoy» se fija una vez por operación. | Llamar a `datetime.now()` o `uuid4()` directamente en dominio o aplicación. |
| D6 | Campos derivados calculados, no persistidos | Dependen de «hoy» y nunca se desincronizan. | Guardar la racha y el total en el JSON. |
| D7 | Excepciones con `code`, `type` y `message` definidas en `domain/errors.py`; el mapeo a HTTP vive en infraestructura | Un único catálogo literal (RNF-2). El dominio no conoce HTTP (principio 3). | Objetos `Result`, con más ceremonia y poco idiomáticos en Python. |
| D8 | Clave de unicidad con NFKD, sin marcas combinantes, `casefold` y espacios colapsados | Cubre tildes, ß y espacios dobles con `unicodedata` (biblioteca estándar). | `lower()`, que falla con «Straße» y con las tildes. |
| D9 | Coerción N2 en el adaptador HTTP | La representación JSON es un detalle del transporte; el dominio solo recibe `str`. | Coerción en el dominio, que le acoplaría a JSON. |
| D10 | `created_at` con desfase horario (`datetime.now().astimezone()`) | Sigue siendo hora local (RNF-5), pero no es ambigua en los cambios de hora. | Hora local sin desfase. |
| D11 | Raíz del JSON como objeto con `version` | Permite migrar cuando lleguen los pasos (spec posterior). | Un array desnudo. |
| D12 | Entidad como `dataclass` y validación propia | Principio 1. | Pydantic (incumple la constitución). |
| D13 | Ruta del archivo calculada en `main.py` a partir de la raíz del repositorio; los adaptadores la reciben por parámetro | Cumple el principio 5 sea cual sea el directorio de trabajo, y los tests inyectan `tmp_path`. | `Path.cwd()`, que depende de desde dónde se arranca. |
| D14 | Imports `src.activities…`, según el `pythonpath = ["."]` actual | No toca `pyproject.toml`. | Reconfigurar el empaquetado (fuera del alcance de esta spec). |

## 7. Estrategia de tests [todos; principio 4]

- **TDD estricto**: cada criterio EARS empieza como un test en rojo. Los tests se nombran con su RF (`test_rf6_marking_twice_same_day_raises_e06`), lo que permite trazar con `uv run pytest -k rf6`.
- **Dobles** (`tests/activities/fakes.py`): `InMemoryActivityRepository` (puede forzar `StorageReadError` o `StorageWriteError`), `FixedClock(datetime)` y `SequentialIdGenerator`. Ningún test usa la fecha real ni el `activities.json` real (RNF-6).

| Nivel | Archivos | Qué cubre |
|---|---|---|
| Dominio (unitarios puros) | `test_streak.py`, `test_text_rules.py`, `test_activity.py`, `test_consistency.py` | RF-8 (racha: vacío, 1, ayer, anteayer, huecos); RF-1/RF-2 (E-01/E-02/E-03, 100/101 caracteres, NFC «e»+tilde, emoji compuesto, `name_key` con tildes, ß y espacios dobles); RF-6 (E-06); RF-10 (duplicados, fechas futuras y repetidas) |
| Aplicación (casos de uso con dobles) | `test_create.py`, `test_get.py`, `test_update.py`, `test_delete.py`, `test_mark_done.py`, `test_list.py` | RF-1…RF-7, RF-9 (inexistente + nombre inválido → E-07; historial + nombre vacío → E-04), RF-10 (E-08/E-09 desde el doble), «hoy» fijo (23:59:59), renombrar a sí misma, borrar y recrear |
| Infraestructura: repositorio | `test_json_repository.py` con `tmp_path` | RF-10: archivo inexistente → vacío; JSON inválido, claves o tipos erróneos o id duplicado → E-08 sin modificar el archivo; ruta no escribible (padre que es un archivo) → E-09; escritura atómica; ida y vuelta legible (RNF-1) |
| Infraestructura: HTTP (extremo a extremo) | `test_http_api.py`: servidor en el puerto 0 en un hilo, repositorio sobre `tmp_path`, `FixedClock`, cliente `urllib.request` | Contrato completo de la §4: códigos 200/201/204/400/404/409/500, forma del detalle, el resumen y el error, E-10, E-11, coerción N2 (`123` → «123»), campos desconocidos ignorados, textos literales del catálogo (RNF-2, RNF-4) |
| Arquitectura | `test_architecture.py` | Principio 3: recorre con `ast` los imports de `domain/` y `application/` y falla si apuntan a una capa exterior |

**Matriz de trazabilidad**

| RF | Módulos | Tests |
|---|---|---|
| RF-1 | text_rules, activity, use_cases.CreateActivity, http_api | domain/text_rules, application/create, infra/http |
| RF-2 | text_rules, use_cases, http_api (coerción) | domain/text_rules, application/create y update, infra/http |
| RF-3 | dto.ActivityDetail, use_cases.GetActivity | application/get, infra/http |
| RF-4 | dto.ActivityPatch, use_cases.UpdateActivity, http_api | application/update, infra/http |
| RF-5 | use_cases.DeleteActivity, json_repository.delete | application/delete, infra/http |
| RF-6 | activity.mark_done, use_cases.MarkActivityDone | domain/activity, application/mark_done, infra/http |
| RF-7 | dto.ActivitySummary, use_cases.ListActivities | application/list, infra/http |
| RF-8 | streak.compute_streak | domain/streak |
| RF-9 | orden de validación en use_cases y http_api | application/update y create, infra/http |
| RF-10 | json_repository, consistency, ports | infra/json_repository, domain/consistency, application/* |
| RF-11 | http_api (router y parseo) | infra/http |

## 8. Cumplimiento de la constitución

| Principio | Cómo se cumple |
|---|---|
| 1. Stack mínimo | Solo `http.server`, `json`, `uuid`, `datetime`, `unicodedata`, `os`, `pathlib` y `dataclasses`. `pyproject.toml` no cambia. |
| 2. Spec antes que código | Este plan se apoya en la spec y lo que exige está ya en la spec (N2, N3, E-10, E-11, RF-11). |
| 3. Hexagonal | Capas de la §1, verificadas por `test_architecture.py`. |
| 4. TDD | §7. Se usa `tmp_path` y dobles, y `uv run pytest` en verde para cerrar cada tarea. |
| 5. JSON | Solo `json_repository.py` lee o escribe `activities.json`, detrás de `ActivityRepository`. |
| 6. Idioma | Identificadores y claves en inglés; los mensajes del catálogo, en español. |
