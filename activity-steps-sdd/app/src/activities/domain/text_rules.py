"""Reglas de texto de la spec 001 (spec.md §4, Definiciones)."""

import unicodedata


def clean(text: str) -> str:
    """Recorta los espacios al inicio y al final; los internos se conservan."""
    return text.strip()


def char_count(text: str) -> int:
    """Caracteres según la spec: puntos de código Unicode tras normalizar a NFC."""
    return len(unicodedata.normalize("NFC", text))
