from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from db.base import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )
    name: Mapped[str] = mapped_column(
        String(100),
        nullable=False  # El nombre no puede ser nulo.
    )
    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        index=True  # El correo electrónico debe ser único e indexado.
    )