from fastapi import APIRouter
from .users import router as users_router
from .escorts import router as escorts_router
from .photos import router as photos_router
from .reviews import router as reviews_router
from .favorites import router as favorites_router

api_router = APIRouter()

# Include all routers
api_router.include_router(users_router)
api_router.include_router(escorts_router)
api_router.include_router(photos_router)
api_router.include_router(reviews_router)
api_router.include_router(favorites_router)