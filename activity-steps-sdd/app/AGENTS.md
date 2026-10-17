# AGENTS.md — Activity-Steps

## Proyecto
API para registrar actividades con pasos ordenados. Proyecto de práctica de SDD + TDD + clean architecture + hexagonal (versión corta: sin base de datos).

## Comandos
- Tests: `uv run pytest`

## Estilo y convenciones
- Python 3.12+, type hints en todas las funciones públicas.
- Solo biblioteca estándar (pytest únicamente para tests).
- Identificadores en inglés; mensajes de usuario en español.

## Reglas
- Lee docs/constitution.md y la spec activa antes de tocar código.
- No añadas dependencias ni cambies el código sin actualizar antes la spec.
- Trabaja solo sobre la spec activa en `specs/<feature>/` y solo en la tarea que se te indique de `tasks.md`.
- No modifiques archivos dentro de specs/ salvo petición explícita.

## Al terminar cualquier tarea
- Ejecuta uv run pytest en verde. Marca la tarea en tasks.md y detente.
