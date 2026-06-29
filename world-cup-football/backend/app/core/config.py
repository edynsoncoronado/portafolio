"""
Configuration from environment variables for the application.
"""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # URL de conexión a la base de datos. Se lee de las variables de entorno.
    DATABASE_URL: str
    # SECRET_KEY: str
    # Descomentar si se necesita una clave secreta en el futuro.

    model_config = SettingsConfigDict(
        # Cargar valores desde un archivo .env si existe en el proyecto.
        env_file=".env",
        # Ignorar variables de entorno que no correspondan a campos definidos.
        extra="ignore"
    )


# Crear la instancia global de configuración y validar los valores.
settings = Settings()