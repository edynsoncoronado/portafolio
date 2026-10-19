"""Principio 3 de la constitución: separación hexagonal.

domain/ no importa de application/ ni de infrastructure/;
application/ no importa de infrastructure/.
"""

import ast
from pathlib import Path

import pytest

SRC_ROOT = Path(__file__).resolve().parents[2] / "src"
PACKAGE = "src.activities"

LAYER_RULES = {
    "domain": ("application", "infrastructure"),
    "application": ("infrastructure",),
}


def module_name_for(path: Path) -> str:
    """Nombre de módulo con punto (p. ej. src.activities.domain.activity) de un .py bajo src/."""
    parts = list(path.relative_to(SRC_ROOT.parent).with_suffix("").parts)
    if parts[-1] == "__init__":
        parts.pop()
    return ".".join(parts)


def _imported_modules(source: str, module: str) -> list[tuple[str, ...]]:
    """Por cada import, sus candidatos a módulo importado, con los relativos resueltos a absolutos.

    `from paquete import nombre` da (paquete, paquete.nombre), porque `nombre` puede ser un submódulo.
    """
    package_parts = module.split(".")[:-1]  # los relativos se resuelven desde el paquete del módulo
    imported: list[tuple[str, ...]] = []
    for node in ast.walk(ast.parse(source)):
        if isinstance(node, ast.Import):
            imported.extend((alias.name,) for alias in node.names)
        elif isinstance(node, ast.ImportFrom):
            if node.level == 0:
                base = node.module or ""
            else:
                anchor = package_parts[: len(package_parts) - (node.level - 1)]
                base = ".".join(anchor + ([node.module] if node.module else []))
            imported.extend((base, f"{base}.{alias.name}") for alias in node.names)
    return imported


def _is_within(name: str, prefix: str) -> bool:
    return name == prefix or name.startswith(prefix + ".")


def find_forbidden_imports(source: str, module: str, forbidden: tuple[str, ...]) -> list[str]:
    """Módulos importados por `source` que caen dentro de alguno de los paquetes `forbidden`."""
    violations: list[str] = []
    for candidates in _imported_modules(source, module):
        hit = next(
            (name for name in candidates if any(_is_within(name, p) for p in forbidden)), None
        )
        if hit is not None and hit not in violations:
            violations.append(hit)
    return violations


# --- Autotests del detector ---------------------------------------------------


def test_detects_absolute_import_of_outer_layer() -> None:
    source = "import src.activities.infrastructure.json_repository\n"
    violations = find_forbidden_imports(
        source, "src.activities.domain.activity", ("src.activities.infrastructure",)
    )
    assert violations == ["src.activities.infrastructure.json_repository"]


def test_detects_from_import_of_outer_layer() -> None:
    source = "from src.activities.application.ports import Clock\n"
    violations = find_forbidden_imports(
        source, "src.activities.domain.activity", ("src.activities.application",)
    )
    assert violations == ["src.activities.application.ports"]


def test_detects_relative_import_of_outer_layer() -> None:
    source = "from ..infrastructure import json_repository\n"
    violations = find_forbidden_imports(
        source, "src.activities.application.use_cases", ("src.activities.infrastructure",)
    )
    assert violations == ["src.activities.infrastructure"]


def test_detects_relative_import_of_outer_package_by_name() -> None:
    source = "from .. import infrastructure\n"
    violations = find_forbidden_imports(
        source, "src.activities.domain.activity", ("src.activities.infrastructure",)
    )
    assert violations == ["src.activities.infrastructure"]


def test_allows_imports_of_same_or_inner_layer() -> None:
    source = (
        "import json\n"
        "from datetime import date\n"
        "from src.activities.domain.activity import Activity\n"
        "from . import ports\n"
    )
    violations = find_forbidden_imports(
        source, "src.activities.application.use_cases", ("src.activities.infrastructure",)
    )
    assert violations == []


def test_does_not_confuse_prefix_with_similar_name() -> None:
    source = "import src.activities.infrastructure_utils\n"
    violations = find_forbidden_imports(
        source, "src.activities.domain.activity", ("src.activities.infrastructure",)
    )
    assert violations == []


# --- Regla sobre el código real -----------------------------------------------


@pytest.mark.parametrize("layer", sorted(LAYER_RULES))
def test_layer_does_not_import_outer_layers(layer: str) -> None:
    forbidden = tuple(f"{PACKAGE}.{outer}" for outer in LAYER_RULES[layer])
    layer_dir = SRC_ROOT / "activities" / layer
    violations = []
    for path in sorted(layer_dir.rglob("*.py")):
        module = module_name_for(path)
        for imported in find_forbidden_imports(path.read_text(encoding="utf-8"), module, forbidden):
            violations.append(f"{path.relative_to(SRC_ROOT.parent)} importa {imported}")
    assert violations == []
