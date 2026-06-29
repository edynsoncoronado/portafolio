from fastapi import APIRouter, Depends

from schemas.user import UserCreate, UserUpdate, UserResponse

from services.user_service import UserService
from dependencies.services import get_user_service

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

@router.post("/", response_model=UserResponse)
def create_user(
    payload: UserCreate,
    service: UserService = Depends(get_user_service)
):
    return service.create(payload)

@router.get("/", response_model=list[UserResponse])
def get_users(
    service: UserService = Depends(get_user_service)
):
    return service.get_all()

@router.get("/{user_id}", response_model=UserResponse)
def get_user(
    user_id: int,
    service: UserService = Depends(get_user_service)
):
    return service.get_by_id(user_id)

@router.put("/{user_id}", response_model=UserResponse)
def update_user(
    user_id: int,
    payload: UserUpdate,
    service: UserService = Depends(get_user_service)
):
    return service.update(user_id, payload)

@router.delete("/{user_id}")
def delete_user(
    user_id: int,
    service: UserService = Depends(get_user_service)
):
    service.delete(user_id)
    return {"message": "User deleted"}