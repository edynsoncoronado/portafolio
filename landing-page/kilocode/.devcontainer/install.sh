#!/bin/sh
set -e

cd /app

if [ ! -f package.json ]; then
    echo "Creando proyecto React..."
    npm create vite@latest . -- --template react-ts --yes
fi

npm install

exec "$@"
