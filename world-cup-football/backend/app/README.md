## Plataforma con IA:
- Usuarios
- Partidos
- Equipos
- Predicciones
- Estadísticas
- IA para resúmenes
- Autenticación JWT
- Roles y permisos

## Flujo completo

Cuando llega una petición:

```
POST /users
```

el recorrido es:

```
┌─────────────┐
│ FastAPI API │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Services   │
│ Business    │
│ Logic       │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│Repository   │
│Data Access  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ PostgreSQL  │
└─────────────┘
```
---
---

```
project/
│
├── app/
│   ├── api/
│   │   └── v1/
│   │       └── users.py
│   │
│   ├── core/
│   │   └── config.py
│   │
│   ├── db/
│   │   ├── base.py
│   │   ├── session.py
│   │   └── init_db.py
│   │
│   ├── models/
│   │   └── user.py
│   │
│   ├── schemas/
│   │   └── user.py
│   │
│   ├── repositories/
│   │   └── user_repository.py
│   │
│   ├── services/
│   │   └── user_service.py
│   │
│   ├── dependencies/
│   │   ├── database.py
│   │   └── services.py
│   │
│   └── main.py
│
├── alembic/
├── alembic.ini
├── .env
├── pyproject.toml
└── docker-compose.yml
```