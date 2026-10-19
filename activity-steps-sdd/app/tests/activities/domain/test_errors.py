"""Catálogo de errores de spec.md §4: código, tipo y texto literal (RNF-2, RNF-4)."""

import pytest

from src.activities.domain.errors import ActivityError, ErrorCode, ErrorType

CATALOG = [
    ("E-01", ErrorCode.NAME_REQUIRED, ErrorType.VALIDATION, "El nombre es obligatorio."),
    ("E-02", ErrorCode.NAME_TOO_LONG, ErrorType.VALIDATION, "El nombre no puede superar los 100 caracteres."),
    ("E-03", ErrorCode.DESCRIPTION_TOO_LONG, ErrorType.VALIDATION, "La descripción no puede superar los 500 caracteres."),
    ("E-05", ErrorCode.DUPLICATE_NAME, ErrorType.CONFLICT, "Ya existe una actividad con ese nombre."),
    ("E-06", ErrorCode.ALREADY_DONE_TODAY, ErrorType.CONFLICT, "La actividad ya está marcada como hecha hoy."),
    ("E-07", ErrorCode.ACTIVITY_NOT_FOUND, ErrorType.NOT_FOUND, "Actividad no encontrada."),
    ("E-08", ErrorCode.STORAGE_READ_FAILED, ErrorType.STORAGE, "No se pudieron leer los datos guardados."),
    ("E-09", ErrorCode.STORAGE_WRITE_FAILED, ErrorType.STORAGE, "No se pudieron guardar los datos."),
    ("E-10", ErrorCode.INVALID_JSON_BODY, ErrorType.VALIDATION, "El cuerpo de la petición no es un JSON válido."),
    ("E-11", ErrorCode.ROUTE_NOT_FOUND, ErrorType.NOT_FOUND, "Ruta no encontrada."),
]


@pytest.mark.parametrize(("literal", "code", "error_type", "message"), CATALOG, ids=[c[0] for c in CATALOG])
def test_rnf2_rnf4_error_has_code_type_and_literal_message(
    literal: str, code: ErrorCode, error_type: ErrorType, message: str
) -> None:
    error = ActivityError(code)

    assert error.code == literal
    assert error.type == error_type
    assert error.message == message
    assert str(error) == message


def test_rnf2_e04_names_the_non_modifiable_field() -> None:
    error = ActivityError(ErrorCode.FIELD_NOT_MODIFIABLE, field="history")

    assert error.code == "E-04"
    assert error.type == ErrorType.VALIDATION
    assert error.message == "El campo «history» no se puede modificar."


def test_rnf4_error_types_have_stable_english_identifiers() -> None:
    assert [t.value for t in ErrorType] == ["validation", "not_found", "conflict", "storage"]


def test_rnf2_catalog_covers_exactly_e01_to_e11() -> None:
    assert sorted(c.value for c in ErrorCode) == [f"E-{n:02d}" for n in range(1, 12)]


def test_activity_error_is_an_exception() -> None:
    with pytest.raises(ActivityError) as raised:
        raise ActivityError(ErrorCode.ACTIVITY_NOT_FOUND)

    assert raised.value.code == ErrorCode.ACTIVITY_NOT_FOUND
