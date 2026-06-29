from db.session import SessionLocal


# Dependencia que devuelve una sesión de base de datos por petición.
# Se usa como generador para asegurar el cierre correcto de la sesión.
def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        # Cerrar la sesión al finalizar el uso.
        db.close()