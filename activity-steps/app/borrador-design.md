# 001 · Actividades con pasos — Diseño

## Estructura

```
app/activities/
  domain/
    activity.py        # Activity, Step (entidades + reglas)
    errors.py          # excepciones del dominio
  application/
    ports.py           # ActivityRepository, Clock (typing.Protocol)
    create_activity.py # CreateActivity
    complete_step.py   # CompleteStep
    get_activity.py    # GetActivity
  infrastructure/
    in_memory_activity_repository.py
    system_clock.py
tests/activities/
  domain/test_activity.py
  application/test_create_activity.py
  application/test_complete_step.py
  application/test_get_activity.py
```

## Dominio

### `Step` (dataclass)
| Campo | Tipo | Notas |
|---|---|---|
| `position` | `int` | 1..n, identifica el paso dentro de la actividad |
| `description` | `str` | texto del paso |
| `completed_at` | `datetime \| None` | `None` = pendiente; aware en UTC |

- `is_completed -> bool` (propiedad).

### `Activity` (dataclass)
| Campo | Tipo | Notas |
|---|---|---|
| `id` | `str` | `uuid4` generado al crear |
| `title` | `str` | |
| `steps` | `list[Step]` | ordenados por `position` |

- `Activity.create(title: str, steps: list[str]) -> Activity`: valida RF2 y crea los pasos con posiciones 1..n, todos pendientes (RF1).
- `complete_step(position: int, now: datetime) -> None`: aplica RF3, RF4, RF5 y RF8 (paso inexistente). La fecha llega como parámetro para que el dominio no dependa del reloj.
- `is_completed -> bool`: `True` si todos los pasos están completados (RF6).
- `progress -> int`: `completados * 100 // total` (RF7). Se trunca hacia abajo, así que solo vale 100 cuando todo está completado.

### Excepciones (`errors.py`)
Todas heredan de `ActivityError(Exception)`. Los mensajes están en español.

| Excepción | RF | Datos |
|---|---|---|
| `InvalidActivity` | RF2 | motivo (título vacío / sin pasos) |
| `StepOutOfOrder` | RF4 | `first_pending_position: int` |
| `StepAlreadyCompleted` | RF5 | `position: int` |
| `StepNotFound` | RF8 | `position: int` |
| `ActivityNotFound` | RF8 | `activity_id: str` |

## Aplicación

### Puertos (`ports.py`)
```python
class ActivityRepository(Protocol):
    def save(self, activity: Activity) -> None: ...
    def get(self, activity_id: str) -> Activity | None: ...

class Clock(Protocol):
    def now(self) -> datetime: ...  # aware, UTC
```

### Casos de uso
Clases con dependencias inyectadas en `__init__` y un único método `execute`.

| Caso de uso | Firma de `execute` | Comportamiento |
|---|---|---|
| `CreateActivity(repo)` | `(title, steps) -> Activity` | `Activity.create` → `repo.save` |
| `CompleteStep(repo, clock)` | `(activity_id, position) -> Activity` | `repo.get` (o `ActivityNotFound`) → `complete_step(position, clock.now())` → `repo.save` |
| `GetActivity(repo)` | `(activity_id) -> Activity` | `repo.get` (o `ActivityNotFound`); el progreso se lee de `activity.progress` |

## Infraestructura
- `InMemoryActivityRepository`: guarda las actividades en un `dict[str, Activity]`.
- `SystemClock`: `datetime.now(UTC)`.

## Estrategia de tests
- **Dominio:** sin dobles. Fechas fijas construidas en el test.
- **Casos de uso:** `InMemoryActivityRepository` real y un `FixedClock` definido en el test (cumple el `Protocol Clock`). Para comprobar que **no** se guarda nada cuando falla la creación (RF2) se usa `create_autospec(ActivityRepository, instance=True)`.
- Cada test lleva el RF en el nombre, p. ej. `test_rf4_rechaza_completar_paso_con_anterior_pendiente`.

## Trazabilidad (base de la tabla de validación)
| RF | Dónde se implementa | Test |
|---|---|---|
| RF1 | `Activity.create`, `CreateActivity` | dominio + `test_create_activity` |
| RF2 | `Activity.create` | dominio + `test_create_activity` (no guarda) |
| RF3 | `Activity.complete_step`, `CompleteStep` | dominio + `test_complete_step` |
| RF4 | `Activity.complete_step` | dominio |
| RF5 | `Activity.complete_step` | dominio |
| RF6 | `Activity.is_completed` | dominio |
| RF7 | `Activity.progress`, `GetActivity` | dominio + `test_get_activity` |
| RF8 | `StepNotFound` (dominio), `ActivityNotFound` (casos de uso) | dominio + `test_complete_step` / `test_get_activity` |
| RNF1 | imports | revisión con `grep` en la validación |
| RNF2 | todo en memoria | `uv run pytest` sin servicios |

## Decisiones abiertas (para que las confirmes)
1. **Redondeo del progreso:** se trunca (1/3 → 33, 2/3 → 66). La alternativa sería `round`, que daría 67.
2. **Descripción de un paso vacía:** los requisitos no la mencionan. Propongo rechazarla también con `InvalidActivity`. Si no quieres, se acepta tal cual.
3. **Identificación de pasos:** por `position`, no por un id propio. Como no se pueden reordenar ni borrar pasos (queda fuera de alcance), la posición es estable.
