from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Text, JSON, Date, Time, Float, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
from database.database import Base

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = 'users'
    user_id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(100))
    email = Column(String(150), unique=True)
    password_hash = Column(String(255))
    phone_number = Column(String(20))
    user_type = Column(String(20))  # 'client', 'escort', 'admin'
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    last_login = Column(DateTime, nullable=True)
    
    # Relationships
    escort_profile = relationship("Escort", back_populates="user", uselist=False)
    reviews_given = relationship("Review", foreign_keys="[Review.client_id]", back_populates="client")
    favorites = relationship("Favorite", back_populates="user")
    
class Favorite(Base):
    __tablename__ = 'favorites'
    favorite_id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey('users.user_id'))
    escort_id = Column(String(36), ForeignKey('escorts.escort_id'))
    created_at = Column(DateTime, server_default=func.now())
    
    user = relationship("User", back_populates="favorites")
    escort = relationship("Escort", back_populates="favorited_by")

class Escort(Base):
    __tablename__ = 'escorts'
    escort_id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey('users.user_id'))
    display_name = Column(String(100))
    profile_description = Column(Text)
    city = Column(String(100))
    location_details = Column(String(200))  # e.g., "Downtown Miami"
    latitude = Column(Float, nullable=True)  # Geographical coordinate
    longitude = Column(Float, nullable=True)  # Geographical coordinate
    distance = Column(Float)  # Distance in km
    area = Column(String(100))  # Specific area or neighborhood
    state = Column(String(100))  # State/Province
    country = Column(String(100), default="IND")  # Country
    age = Column(Integer)
    nationality = Column(String(50))
    height_cm = Column(Integer)
    weight_kg = Column(Integer)
    measurements = Column(String(50))  # e.g., "34-24-36"
    body_type = Column(String(50))  # Uses BodyType enum from schemas
    services = Column(JSON)  # Array of services offered
    rates = Column(JSON)  # Price details
    hourly_rate = Column(Integer)  # Base hourly rate
    languages = Column(JSON)  # Array of languages
    availability = Column(String(50))  # Uses AvailabilityStatus enum from schemas
    last_availability_update = Column(DateTime, nullable=True)
    is_verified = Column(Boolean, default=False)
    is_featured = Column(Boolean, default=False)
    views_count = Column(Integer, default=0)
    rating = Column(Float, default=0.0)  # Average rating
    description = Column(Text)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    last_active = Column(DateTime, nullable=True)
    
    # Relationships
    user = relationship("User", back_populates="escort_profile")
    photos = relationship("Photo", back_populates="escort", cascade="all, delete-orphan")
    reviews = relationship("Review", back_populates="escort", cascade="all, delete-orphan")
    favorited_by = relationship("Favorite", back_populates="escort")
    
    # Stats and metrics
    total_reviews = Column(Integer, default=0)
    average_rating = Column(Float, default=0.0)
    total_favorites = Column(Integer, default=0)

class Photo(Base):
    __tablename__ = 'photos'
    photo_id = Column(String(36), primary_key=True, default=generate_uuid)
    escort_id = Column(String(36), ForeignKey('escorts.escort_id'))
    photo_url = Column(String(300))
    is_blurred = Column(Boolean, default=False)
    display_order = Column(Integer, default=0)
    is_primary = Column(Boolean, default=False)
    created_at = Column(DateTime, server_default=func.now())
    escort = relationship("Escort", back_populates="photos")

class Review(Base):
    __tablename__ = 'reviews'
    review_id = Column(String(36), primary_key=True, default=generate_uuid)
    escort_id = Column(String(36), ForeignKey('escorts.escort_id'))
    client_id = Column(String(36), ForeignKey('users.user_id'))
    rating = Column(Integer)
    comment = Column(Text)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    is_verified = Column(Boolean, default=False)
    is_hidden = Column(Boolean, default=False)
    
    # Relationships
    escort = relationship("Escort", back_populates="reviews")
    client = relationship("User", foreign_keys=[client_id], back_populates="reviews_given")
