# Download Private Data - OMDB API

For the **second stage of the pipeline**, the goal is to enrich the data obtained from IMDb by querying the **OMDb private API**. The code implements an asynchronous, concurrent, and fault-tolerant process, using **workers**, **checkpoints**, **automatic retries**, and incremental writing in **JSONL** format.

It's a **robust, asynchronous pipeline** for:

* Downloading movie information from the **OMDb API**
* Using **multiple requests in parallel**
* With **intelligent retries**
* **Persisting results incrementally** (JSONL)
* With **checkpointing** to **resume after a crash**
* Without losing data or duplicating requests

```mermaid id="omdb-stage2"
flowchart TD

    A([Inicio])

    A --> B[Leer movie_ids.txt]

    B --> C[Cargar checkpoint<br/>processed_ids.txt]

    C --> D[Eliminar IDs ya procesados]

    D --> E[Crear cola asíncrona<br/>asyncio.Queue]

    E --> F[Crear sesión HTTP<br/>aiohttp.ClientSession]

    F --> G[Lanzar N Workers<br/>CONCURRENCY = 5]

    G --> H[Worker obtiene un IMDb ID]

    H --> I[Consultar API OMDb]

    I --> J{Respuesta válida?}

    J -- Sí --> K[Guardar respuesta<br/>omdb_raw.jsonl]

    K --> L[Guardar IMDb ID<br/>en checkpoint]

    L --> M[Actualizar barra de progreso]

    J -- Error 429 / 5xx / Timeout --> N[Reintentos automáticos]

    N --> I

    N -->|Máximo de reintentos| O[Registrar error]

    O --> M

    M --> P{¿Quedan IDs?}

    P -- Sí --> H

    P -- No --> Q[Cerrar Workers]

    Q --> R([Fin])
```

---
# Detailed diagram of the internal flow

```mermaid id="omdb-workers"
flowchart LR

subgraph Input["Entradas"]

A1["movie_ids.txt"]
A2["processed_ids.txt"]

end

subgraph Pipeline["Pipeline Asíncrono"]

B1["load_processed_ids()"]

B2["Filtrar IDs pendientes"]

B3["asyncio.Queue"]

B4["aiohttp.ClientSession"]

B5["Workers Concurrentes"]

end

subgraph Worker["Cada Worker"]

C1["Obtener IMDb ID"]

C2["fetch_one()"]

C3["Request GET<br/>OMDb API"]

C4{"Respuesta"}

C5["JSON válido"]

C6["429 / 5xx / Timeout"]

C7["Reintentar"]

C8["Máximo reintentos"]

end

subgraph Output["Salidas"]

D1["omdb_raw.jsonl"]

D2["processed_ids.txt"]

D3["Barra de progreso"]

end

A2 --> B1
A1 --> B2
B1 --> B2

B2 --> B3
B3 --> B5
B4 --> B5

B5 --> C1
C1 --> C2
C2 --> C3
C3 --> C4

C4 -->|OK| C5
C5 --> D1
C5 --> D2
C5 --> D3

C4 -->|Error| C6
C6 --> C7
C7 --> C3
C7 -->|Límite alcanzado| C8
C8 --> D3
```

---

# `fetch_one()` specific diagram

This function concentrates all the logic of resilience against errors.

```mermaid id="fetch-one"
flowchart TD

A[Recibir IMDb ID]

A --> B[Construir parámetros<br/>i, apikey, plot]

B --> C[Enviar Request GET]

C --> D{HTTP Status}

D -->|200| E[Convertir respuesta a JSON]

E --> F{Response=True}

F -->|Sí| G[Retornar datos]

F -->|No| H[Registrar error lógico]

H --> I[Retornar error]

D -->|429| J[Esperar Backoff]

J --> C

D -->|5xx| K[Esperar Backoff]

K --> C

D -->|Timeout| L[Esperar]

L --> C

D -->|Otra excepción| M[Esperar]

M --> C

C --> N{Máximo reintentos?}

N -->|Sí| O[Retornar None]

N -->|No| C
```

Manually, this process is:
1. Search for the movie using the IMDB API.
![imdb-api-request](../img/1-imdb-api.png)
2. Identify the corresponding movie ID.
![imdb-api-response](../img/2-api-imdb.png)
3. Search the OMDB API for other features using the previously obtained movie ID.
![omdb-api](../img/3-omdb-api.png)

---

# Summary flow

```text
                ┌────────────────────┐
                │  Lista IMDb IDs    │
                │  (input all_ids)   │
                └─────────┬──────────┘
                          │
                          ▼
        ┌─────────────────────────────────┐
        │ load_processed_ids()             │
        │ - lee processed_ids.txt          │
        │ - devuelve set de IDs procesados │
        └─────────┬───────────────────────┘
                  │
                  ▼
        ┌─────────────────────────────────┐
        │ Filtrado de IDs                 │
        │ remaining = all_ids - processed │
        └─────────┬───────────────────────┘
                  │
                  ▼
        ┌─────────────────────────────────┐
        │ asyncio.Queue                   │
        │ - encola IDs restantes          │
        └─────────┬───────────────────────┘
                  │
                  ▼
 ┌────────────────────────────────────────────────────┐
 │                 WORKER POOL (N=5)                  │
 │                                                    │
 │  ┌───────────┐   ┌───────────┐   ┌───────────┐    │
 │  │ Worker 1  │   │ Worker 2  │   │ Worker N  │    │
 │  └─────┬─────┘   └─────┬─────┘   └─────┬─────┘    │
 │        │               │               │          │
 │        ▼               ▼               ▼          │
 │   fetch_one()     fetch_one()     fetch_one()     │
 │        │               │               │          │
 │        ▼               ▼               ▼          │
 │   aiohttp GET     aiohttp GET     aiohttp GET     │
 │   OMDb API        OMDb API        OMDb API        │
 │        │               │               │          │
 │        ▼               ▼               ▼          │
 │  Retry / Backoff / Error handling                   │
 │                                                    │
 └───────────────┬───────────────┬────────────────────┘
                 │               │
                 ▼               ▼
        ┌─────────────────────────────────┐
        │ JSON result (dict) or None       │
        └─────────┬───────────────────────┘
                  │
                  ▼
        ┌─────────────────────────────────┐
        │ async write_lock                │
        │ (previene escrituras concurrentes)
        └─────────┬───────────────────────┘
                  │
                  ▼
        ┌─────────────────────────────────┐
        │ Append JSON line                │
        │ omdb_raw.jsonl                  │
        └─────────┬───────────────────────┘
                  │
                  ▼
        ┌─────────────────────────────────┐
        │ append_processed_id(imdb_id)    │
        │ processed_ids.txt               │
        └─────────┬───────────────────────┘
                  │
                  ▼
        ┌─────────────────────────────────┐
        │ queue.task_done()               │
        └─────────────────────────────────┘
```
---

## Flow Summary (in words)

1. **Load Previous Progress**
    * Already downloaded IDs are read from `processed_ids.txt`

2. **Filter Pending Work**
    * Only new IDs are processed

3. **Enqueue Work**
    * Each IMDb ID is added to `asyncio.Queue`

4. **Concurrent Workers**
   * Up to `CONCURRENCY` simultaneous requests
   * Each worker:
        * consumes an ID
        * calls OMDb
        * handles errors
        * retries if necessary

5. **Secure Persistence**
    * Results are written **one per line** (JSONL)
    * Write protected by a lock

6. **Immediate Checkpoint**
    * The ID is marked as processed
    * The pipeline can be restarted without repeating work


---

## Explanation of each component

| Componente                           | Función                                                                                                                                  |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **movie_ids.txt**                    | Lista de identificadores IMDb generada en la Etapa 1.                                                                                    |
| **Checkpoint (`processed_ids.txt`)** | Evita volver a descargar películas ya procesadas y permite reanudar el proceso tras interrupciones.                                      |
| **Queue (`asyncio.Queue`)**          | Distribuye los IDs pendientes entre los distintos workers.                                                                               |
| **Workers concurrentes**             | Procesan múltiples solicitudes a la API OMDb en paralelo (`CONCURRENCY = 5`), mejorando el rendimiento.                                  |
| **`fetch_one()`**                    | Gestiona la consulta a la API, incluyendo reintentos automáticos, manejo de errores HTTP (429, 5xx), timeouts y excepciones inesperadas. |
| **`omdb_raw.jsonl`**                 | Archivo de salida donde cada línea corresponde a la respuesta JSON completa de una película obtenida desde OMDb.                         |
| **Barra de progreso (`tqdm`)**       | Muestra en tiempo real el avance de la descarga.                                                                                         |
