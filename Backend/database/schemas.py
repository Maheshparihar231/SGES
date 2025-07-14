from pydantic import BaseModel
from typing import Optional, List

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    phone_number: Optional[str] = None
    user_type: str

class EscortCreate(BaseModel):
    user_id: int
    display_name: str
    city: Optional[str] = None
    age: Optional[int] = None
    nationality: Optional[str] = None
    height_cm: Optional[int] = None
    weight_kg: Optional[int] = None
    body_type: Optional[str] = None
    languages: Optional[str] = None
    rates: Optional[dict] = None
    availability: Optional[str] = None
    description: Optional[str] = None
    is_verified: Optional[bool] = False

class PhotoCreate(BaseModel):
    escort_id: int
    photo_url: str
    is_blurred: Optional[bool] = False

class ReviewCreate(BaseModel):
    escort_id: int
    client_id: int
    rating: int
    comment: Optional[str] = None
