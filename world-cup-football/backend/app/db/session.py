from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from core.config import settings

# Crear el motor de SQLAlchemy usando la URL de base de datos de la configuración.
# Este motor administra las conexiones y la ejecución de SQL.
engine = create_engine(
    settings.DATABASE_URL,
    echo=True  # Habilitar el registro de consultas SQL para depuración. Cambiar a False en producción.
)

# Configurar un generador de sesiones de base de datos.
# Cada llamada a SessionLocal() crea una nueva sesión ligada al engine.
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)