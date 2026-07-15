# Notebooks - ML Pipeline for Movie Ranking

This directory contains the complete Machine Learning pipeline for movie recommendation/ranking system.

## Requirements
- Python 3.12+
- uv (dependency managment)

## Dependencias Principales

| Library | Version | Use |
|----------|---------|-----|
| `uv` | >=0.9 | An extremely fast Python package and project manager, written in Rust.  |
| `polars` | >=0.20 | Data processing (fast, efficient) |
| `python-dotenv` | >=1.0 | Environment variable loading |
| [`tqdm`](https://pypi.org/project/tqdm/) | >=4.68 | Customizable progress bars to loops |
| `lightgbm` | >=4.0 | Ranking models (LambdaRank) |
| `sentence-transformers` | >=2.2 | Embedding generation |
| `qdrant-client` | >=1.7 | Qdrant client |
| `mlflow` | >=2.10 | Experiment tracking |
| `httpx` | >=0.26 | Asynchronous HTTP client for APIs |

## Notebook Execution Order
``` mermaid
flowchart TB
    A[data_collection.ipynb] --> B[feature_engineering.ipynb]
    B --> C[synthetic_queries.ipynb]
    C --> D[modeling.ipynb]
    D --> E["qdrant_indexing.ipynb <br/>(requires running Qdrant)"]
```

## Notebook structure

| Notebook        | Description                    | Inputs        | Outputs                                 |
| --------------- | ------------------------------ | ------------- | --------------------------------------- |
| `data_collection.ipynb` | IMDB/OMDB data collection | External APIs | `movies.parquet`, `omdb_raw.jsonl` |

## Notebook detailed description
### 0. data_collection.ipynb

**Objective**: To collect and combine data from IMDB and OMDB API.

**Process**:
- [Download datasets from IMDB (title.basics.tsv.gz, title.ratings.tsv.gz)](./doc/0-a-Download-opendata.md)
- Filter to show only movies (excludes series, short films, etc.)
- Enrich with data from the IMDB API (Plot, Director, Actors, Awards)
- Manage API rate limiting: [asynchronous vs. multiprocess methods](./doc/md/1%20async-vs-multiprocessing.md), [omdb-script](./doc/md/1%20omdb-script.md)

**Outputs**:
- `data/movies.parquet`: Base data from IMDB
- `data/omdb_raw.jsonl`: Raw responses from the OMDB API

**Required configuration**:
```bash
# .env
OMDB_API_KEY=your_api_key_here
```

Get API key in: https://www.omdbapi.com/apikey.aspx
