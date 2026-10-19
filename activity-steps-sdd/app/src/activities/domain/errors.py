"""Catálogo de errores de la spec 001 (spec.md §4). Los textos son literales."""

from enum import StrEnum


class ErrorType(StrEnum):
    VALIDATION = "validation"
    NOT_FOUND = "not_found"
    CONFLICT = "conflict"
    STORAGE = "storage"


class ErrorCode(StrEnum):
    NAME_REQUIRED = "E-01"
    NAME_TOO_LONG = "E-02"
    DESCRIPTION_TOO_LONG = "E-03"
    FIELD_NOT_MODIFIABLE = "E-04"
    DUPLICATE_NAME = "E-05"
    ALREADY_DONE_TODAY = "E-06"
    ACTIVITY_NOT_FOUND = "E-07"
    STORAGE_READ_FAILED = "E-08"
    STORAGE_WRITE_FAILED = "E-09"
    INVALID_JSON_BODY = "E-10"
    ROUTE_NOT_FOUND = "E-11"


_CATALOG: dict[ErrorCode, tuple[ErrorType, str]] = {
    ErrorCode.NAME_REQUIRED: (ErrorType.VALIDATION, "El nombre es obligatorio."),
    ErrorCode.NAME_TOO_LONG: (ErrorType.VALIDATION, "El nombre no puede superar los 100 caracteres."),
    ErrorCode.DESCRIPTION_TOO_LONG: (ErrorType.VALIDATION, "La descripción no puede superar los 500 caracteres."),
    ErrorCode.FIELD_NOT_MODIFIABLE: (ErrorType.VALIDATION, "El campo «{field}» no se puede modificar."),
    ErrorCode.DUPLICATE_NAME: (ErrorType.CONFLICT, "Ya existe una actividad con ese nombre."),
    ErrorCode.ALREADY_DONE_TODAY: (ErrorType.CONFLICT, "La actividad ya está marcada como hecha hoy."),
    ErrorCode.ACTIVITY_NOT_FOUND: (ErrorType.NOT_FOUND, "Actividad no encontrada."),
    ErrorCode.STORAGE_READ_FAILED: (ErrorType.STORAGE, "No se pudieron leer los datos guardados."),
    ErrorCode.STORAGE_WRITE_FAILED: (ErrorType.STORAGE, "No se pudieron guardar los datos."),
    ErrorCode.INVALID_JSON_BODY: (ErrorType.VALIDATION, "El cuerpo de la petición no es un JSON válido."),
    ErrorCode.ROUTE_NOT_FOUND: (ErrorType.NOT_FOUND, "Ruta no encontrada."),
}


class ActivityError(Exception):
    """Error visible para la usuaria: código del catálogo, tipo y mensaje en español."""

    def __init__(self, code: ErrorCode, **params: str) -> None:
        error_type, template = _CATALOG[code]
        self.code = code
        self.type = error_type
        self.message = template.format(**params)
        super().__init__(self.message)
