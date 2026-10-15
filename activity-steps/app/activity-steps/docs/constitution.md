# Constitución

## Stack permitido
Python 3.12 · biblioteca estándar (dataclasses, typing) · pytest · uv. Cualquier otra dependencia requiere aprobación.

## Arquitectura
- Monolito modular + hexagonal ligera. Un módulo por área de negocio (`app/activities/`); dentro, `domain/`, `application/`, `infrastructure/`.
- Las dependencias apuntan hacia dentro: `domain/` no importa nada de `application/` ni de `infrastructure/`; `application/` no importa de `infrastructure/`.
- Los puertos viven en `application/ports.py` como `typing.Protocol`.
- Los casos de uso devuelven entidades o lanzan excepciones del dominio.
- Las reglas de negocio viven en las entidades.

## Tests
- TDD obligatorio: primero el test que falla, luego el código mínimo, luego refactor.
- Cada requisito (RF) tiene al menos un test que lo nombra.
- Dominio: sin dobles. Casos de uso: adaptador en memoria (mock solo para verificar que algo NO ocurre).
- Nunca `Mock()` sin especificación (usar `create_autospec`).

## Flujo
Spec (requirements → design → tasks) aprobada por el humano antes de escribir código. Una tarea a la vez. Un commit por tarea.

## Convenciones
Código y nombres en inglés; nombres de tests y mensajes de error en español. Fechas en UTC.
