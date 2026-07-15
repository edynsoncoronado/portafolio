# Download OpenData - IMDB
To document this **first stage of the data pipeline**, it is useful to represent the flow from downloading the open datasets from IMDb to generating the `movie_ids.txt` file, which will serve as input for the next phase of data enrichment.

```mermaid
flowchart TD

    A([Inicio])

    A --> B[Descargar title.basics.tsv.gz]
    A --> C[Descargar title.ratings.tsv.gz]

    B --> D[Leer title.basics.tsv.gz<br/>Polars DataFrame]
    C --> E[Leer title.ratings.tsv.gz<br/>Polars DataFrame]

    D --> F[Filtrar únicamente<br/>titleType = movie]

    F --> G[Seleccionar columnas<br/>tconst → imdb_movie_id<br/>primaryTitle → title<br/>startYear → year<br/>genres]

    E --> H[Seleccionar columnas<br/>tconst<br/>averageRating<br/>numVotes]

    G --> I[JOIN por tconst]

    H --> I

    I --> J[Renombrar columnas<br/>averageRating → imdb_rating<br/>numVotes → imdb_votes]

    J --> K[Filtrar películas<br/>imdb_votes ≥ 1000]

    K --> L[(movies_df)]

    L --> M[Extraer imdb_movie_id]

    M --> N[Guardar movie_ids.txt]

    N --> O([Fin de la etapa 1])
```

---
## Diagram with a higher level of detail

```mermaid
flowchart LR

subgraph IMDB["IMDb Open Datasets"]

A1["title.basics.tsv.gz"]
A2["title.ratings.tsv.gz"]

end

subgraph Download["1. Descarga"]

B1["urllib.request.urlretrieve()"]

end

subgraph Processing["2. Procesamiento con Polars"]

C1["Leer title.basics"]
C2["Leer title.ratings"]

D1["Filtrar<br/>titleType = movie"]

D2["Seleccionar columnas<br/>imdb_movie_id<br/>title<br/>year<br/>genres"]

D3["Seleccionar columnas<br/>averageRating<br/>numVotes"]

E1["JOIN por tconst"]

E2["Renombrar columnas"]

E3["Filtrar<br/>imdb_votes ≥ 1000"]

F1["movies_df"]

end

subgraph Output["3. Salidas"]

G1["movie_ids.txt"]

end

A1 --> B1
A2 --> B1

B1 --> C1
B1 --> C2

C1 --> D1
D1 --> D2

C2 --> D3

D2 --> E1
D3 --> E1

E1 --> E2
E2 --> E3
E3 --> F1

F1 --> G1
```

---

## Flow explained

```text
IMDb Open Datasets
        │
        ▼
Descarga de archivos .tsv.gz
        │
        ▼
Lectura con Polars
        │
        ├──────────────┐
        ▼              ▼
 title.basics     title.ratings
        │              │
        ▼              ▼
Filtrar películas   Seleccionar ratings
        │              │
        └──────┬───────┘
               ▼
        JOIN por tconst
               │
               ▼
 Renombrar columnas
               │
               ▼
Filtrar ≥1000 votos
               │
               ▼
        movies_df
               │
               ▼
 Extraer imdb_movie_id
               │
               ▼
     movie_ids.txt
```

### What does each stage represent?

| Etapa                | Objetivo                                                                                                                                                 |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Descarga             | Obtener los datasets públicos de IMDb (`title.basics` y `title.ratings`).                                                                                |
| Lectura              | Cargar los archivos comprimidos en DataFrames de Polars.                                                                                                 |
| Filtrado             | Conservar únicamente registros cuyo `titleType` sea `movie`.                                                                                             |
| Selección            | Mantener únicamente las columnas necesarias para el proyecto.                                                                                            |
| Unión (JOIN)         | Integrar la información descriptiva de las películas con sus calificaciones mediante `tconst`.                                                           |
| Limpieza             | Renombrar columnas y estandarizar el esquema de datos.                                                                                                   |
| Filtrado por calidad | Conservar solo películas con al menos **1000 votos**, eliminando títulos con baja representatividad.                                                     |
| Salida               | Generar `movies_df` y el archivo `movie_ids.txt`, que será utilizado en la siguiente etapa para consultar información adicional mediante la API de OMDb. |
