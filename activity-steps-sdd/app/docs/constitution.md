# Constitución — Activity-Steps

Principios innegociables. Un cambio que incumpla cualquiera de ellos se rechaza.

1. **Stack mínimo**: Python 3.12+ y solo biblioteca estándar; pytest es la única dependencia, y solo en el grupo `dev`.
2. **Spec antes que código**: ningún código sin spec en `specs/<feature>/`; si cambia el comportamiento, se actualiza primero la spec.
3. **Separación hexagonal**: `domain/` no importa de `application/` ni de `infrastructure/`; `application/` no importa de `infrastructure/`; la interfaz (HTTP/CLI) solo vive en `infrastructure/`.
4. **TDD obligatorio**: todo comportamiento nace con un test que falla primero; los tests nunca tocan el `activities.json` real (usan `tmp_path` o un doble en memoria); ninguna tarea se cierra sin `uv run pytest` en verde.
5. **Persistencia en JSON**: los datos se guardan en un único archivo legible, `activities.json`, en la raíz del repositorio e ignorado por git. Solo un adaptador de `infrastructure/` lo lee o escribe, detrás de un puerto (repositorio). No se usa base de datos.
6. **Idioma**: identificadores y código en inglés; mensajes al usuario y errores visibles en español.
