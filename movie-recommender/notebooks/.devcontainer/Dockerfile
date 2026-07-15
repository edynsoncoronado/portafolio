FROM python:3.12-slim

# Instalar dependencias del sistema necesarias para compilar paquetes de Python y manejar entornos virtuales
# uv siempre está disponible en /usr/local/bin/uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

# Dependencias del sistema necesarias
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

# # Copiar únicamente los archivos de dependencias
# COPY pyproject.toml uv.lock ./

# Instalar dependencias, solo si existe el archivo uv.lock
RUN if [ -f uv.lock ]; then uv sync; fi

# El código se montará mediante bind mount
CMD  ["bash"]
