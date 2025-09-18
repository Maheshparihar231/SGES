from pydantic import BaseModel, EmailStr, Field, validator, HttpUrl, ConfigDict
from typing import Optional, List, Dict, Union, Literal
from datetime import datetime
from enum import Enum

class BodyType(str, Enum):
    SLIM = "slim"
    ATHLETIC = "athletic"
    CURVY = "curvy"
    BUSTY = "busty"
    PETITE = "petite"
    AVERAGE = "average"

class AvailabilityStatus(str, Enum):
    AVAILABLE_NOW = "Available Now"
    AVAILABLE_TODAY = "Available Today"
    BOOK_IN_ADVANCE = "Book in Advance"
    UNAVAILABLE = "Unavailable"

# Base schemas for attributes shared between create and response models
class UserType(str, Enum):
    CLIENT = "client"
    ESCORT = "escort"
    ADMIN = "admin"

class UserBase(BaseModel):
    name: str
    email: EmailStr
    phone_number: Optional[str] = None
    user_type: UserType

class UserCreate(UserBase):
    password: str = Field(..., min_length=8)
    
    @validator('password')
    def validate_password(cls, v):
        if not any(c.isupper() for c in v):
            raise ValueError('Password must contain at least one uppercase letter')
        if not any(c.islower() for c in v):
            raise ValueError('Password must contain at least one lowercase letter')
        if not any(c.isdigit() for c in v):
            raise ValueError('Password must contain at least one number')
        return v

class UserResponse(UserBase):
    user_id: str
    is_active: bool
    is_verified: bool
    created_at: datetime
    updated_at: Optional[datetime]
    last_login: Optional[datetime]

    model_config = ConfigDict(from_attributes=True)

class EscortBase(BaseModel):
    display_name: str
    profile_description: Optional[str] = None
    
    # Location details
    city: Optional[str] = None
    location_details: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    area: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = "IND"

    @validator('latitude')
    def validate_latitude(cls, v):
        if v is not None and (v < -90 or v > 90):
            raise ValueError('Latitude must be between -90 and 90')
        return v

    @validator('longitude')
    def validate_longitude(cls, v):
        if v is not None and (v < -180 or v > 180):
            raise ValueError('Longitude must be between -180 and 180')
        return v
    
    # Personal details
    age: Optional[int] = None
    nationality: Optional[str] = None
    height_cm: Optional[int] = None
    weight_kg: Optional[int] = None
    measurements: Optional[str] = None
    body_type: Optional[BodyType] = None

    @validator('age')
    def validate_age(cls, v):
        if v is not None and (v < 18 or v > 99):
            raise ValueError('Age must be between 18 and 99')
        return v

    @validator('height_cm')
    def validate_height(cls, v):
        if v is not None and (v < 140 or v > 200):
            raise ValueError('Height must be between 140cm and 200cm')
        return v

    @validator('weight_kg')
    def validate_weight(cls, v):
        if v is not None and (v < 35 or v > 150):
            raise ValueError('Weight must be between 35kg and 150kg')
        return v

    @validator('measurements')
    def validate_measurements(cls, v):
        if v is not None:
            parts = v.split('-')
            if len(parts) != 3:
                raise ValueError('Measurements must be in format xx-xx-xx')
            try:
                bust, waist, hips = map(int, parts)
                if not all(50 <= x <= 150 for x in [bust, waist, hips]):
                    raise ValueError('Measurements must be between 50 and 150')
            except ValueError:
                raise ValueError('Invalid measurements format')
    
    # Services and rates
    services: Optional[List[str]] = None
    rates: Optional[Dict[str, Union[int, str]]] = None
    hourly_rate: Optional[int] = None
    languages: Optional[List[str]] = None
    
    # Status
    availability: Optional[AvailabilityStatus] = None
    is_verified: Optional[bool] = False
    is_featured: Optional[bool] = False

    @validator('hourly_rate')
    def validate_hourly_rate(cls, v):
        if v is not None and (v < 0 or v > 100000):
            raise ValueError('Hourly rate must be between 0 and 100000')
        return v

    @validator('services')
    def validate_services(cls, v):
        if v is not None:
            if not 1 <= len(v) <= 20:
                raise ValueError('Must have between 1 and 20 services')
            if not all(isinstance(s, str) and 2 <= len(s) <= 50 for s in v):
                raise ValueError('Each service must be between 2 and 50 characters')
        return v

    @validator('languages')
    def validate_languages(cls, v):
        if v is not None:
            if not 1 <= len(v) <= 10:
                raise ValueError('Must have between 1 and 10 languages')
            if not all(isinstance(l, str) and 2 <= len(l) <= 30 for l in v):
                raise ValueError('Each language must be between 2 and 30 characters')
        return v

class EscortCreate(EscortBase):
    user_id: int

class EscortResponse(EscortBase):
    escort_id: str
    user_id: str
    views_count: int
    rating: float
    total_reviews: int
    total_favorites: int
    created_at: datetime
    updated_at: Optional[datetime]
    last_active: Optional[datetime]
    photos: List['PhotoResponse']
    reviews: List['ReviewResponse']

    model_config = ConfigDict(from_attributes=True)

class PhotoBase(BaseModel):
    photo_url: HttpUrl
    is_blurred: Optional[bool] = False
    display_order: Optional[int] = 0
    is_primary: Optional[bool] = False

    @validator('photo_url')
    def validate_photo_url(cls, v):
        allowed_extensions = ['.jpg', '.jpeg', '.png', '.webp']
        if not any(str(v).lower().endswith(ext) for ext in allowed_extensions):
            raise ValueError('Photo URL must end with .jpg, .jpeg, .png, or .webp')
        return v

class PhotoCreate(PhotoBase):
    escort_id: int

class PhotoResponse(PhotoBase):
    photo_id: str
    escort_id: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class ReviewBase(BaseModel):
    rating: int
    comment: Optional[str] = None

    @validator('rating')
    def validate_rating(cls, v):
        if v < 1 or v > 5:
            raise ValueError('Rating must be between 1 and 5')
        return v

class ReviewCreate(ReviewBase):
    escort_id: int
    client_id: int

class ReviewResponse(ReviewBase):
    review_id: str
    escort_id: str
    client_id: str
    created_at: datetime
    updated_at: Optional[datetime]
    is_verified: bool
    is_hidden: bool
    client: UserResponse

    model_config = ConfigDict(from_attributes=True)

class FavoriteBase(BaseModel):
    escort_id: int

class FavoriteCreate(FavoriteBase):
    user_id: int

class FavoriteResponse(FavoriteBase):
    favorite_id: str
    user_id: str
    created_at: datetime
    escort: EscortResponse

    model_config = ConfigDict(from_attributes=True)

# Configure model for Pydantic v2
class EscortResponseModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
# Create type alias for forward references
EscortResponse.model_rebuild()
PhotoResponse.model_rebuild()
ReviewResponse.model_rebuild()
