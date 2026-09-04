FROM node:24-slim

# Utilidades
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

EXPOSE 5173

CMD ["sleep", "infinity"]
