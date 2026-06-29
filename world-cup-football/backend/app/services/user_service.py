from fastapi import HTTPException, status

from models.user import User
from repositories.user_repository import UserRepository

from schemas.user import UserCreate, UserUpdate, UserResponse


class UserService:

    def __init__(self, repository: UserRepository):
        self.repository = repository

    def create(self, payload: UserCreate) -> User:
        existing = self.repository.get_by_email(
            payload.email
        )

        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already exists"
            )

        user = User(
            name=payload.name,
            email=payload.email
        )

        return self.repository.create(user)
    
    def get_all(self) -> list[User]:
        return self.repository.get_all()
    
    def get_by_id(self, user_id: int) -> User:
        user = self.repository.get_by_id(user_id)

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        return user
    
    def update(self, user_id: int, payload: UserUpdate) -> User:
        user = self.repository.get_by_id(user_id)

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        user.name = payload.name
        user.email = payload.email

        return self.repository.update(user)

    def delete(self, user_id: int):
        user = self.repository.get_by_id(user_id)

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        self.repository.delete(user)