"""Reglas de texto de spec.md §4 (Definiciones: «Carácter») usadas por RF-1 y RF-2."""

from src.activities.domain.text_rules import char_count, clean


def test_rf1_rf2_clean_trims_leading_and_trailing_spaces() -> None:
    assert clean("  a  ") == "a"


def test_rf1_rf2_clean_keeps_internal_spaces() -> None:
    assert clean("  Leer  libro ") == "Leer  libro"


def test_rf1_rf2_clean_of_only_spaces_is_empty() -> None:
    assert clean("   ") == ""


def test_rf1_rf2_char_count_counts_combining_accent_as_one() -> None:
    e_with_combining_acute = "é"

    assert char_count(e_with_combining_acute) == 1


def test_rf1_rf2_char_count_counts_composed_emoji_by_code_points() -> None:
    family = "\U0001F468‍\U0001F469‍\U0001F467"  # 👨‍👩‍👧

    assert char_count(family) == 5


def test_rf1_rf2_char_count_of_plain_text() -> None:
    assert char_count("Meditación") == 10
