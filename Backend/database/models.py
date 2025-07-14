from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Text, JSON, Date, Time
from sqlalchemy.orm import relationship
from database.database import Base

class User(Base):
    __tablename__ = 'users'
    user_id = Column(Integer, primary_key=True)
    name = Column(String(100))
    email = Column(String(150), unique=True)
    password_hash = Column(String(255))
    phone_number = Column(String(20))
    user_type = Column(String(20))
    
class Escort(Base):
    __tablename__ = 'escorts'
    escort_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.user_id'))
    display_name = Column(String(100))
    city = Column(String(100))
    age = Column(Integer)
    nationality = Column(String(50))
    height_cm = Column(Integer)
    weight_kg = Column(Integer)
    body_type = Column(String(50))
    languages = Column(String(200))
    rates = Column(JSON)
    availability = Column(String(200))
    description = Column(Text)
    is_verified = Column(Boolean, default=False)
    views_count = Column(Integer, default=0)
    
    photos = relationship("Photo", back_populates="escort")
    reviews = relationship("Review", back_populates="escort")

class Photo(Base):
    __tablename__ = 'photos'
    photo_id = Column(Integer, primary_key=True)
    escort_id = Column(Integer, ForeignKey('escorts.escort_id'))
    photo_url = Column(String(300))
    is_blurred = Column(Boolean, default=False)

    escort = relationship("Escort", back_populates="photos")

class Review(Base):
    __tablename__ = 'reviews'
    review_id = Column(Integer, primary_key=True)
    escort_id = Column(Integer, ForeignKey('escorts.escort_id'))
    client_id = Column(Integer, ForeignKey('users.user_id'))
    rating = Column(Integer)
    comment = Column(Text)
    
    escort = relationship("Escort", back_populates="reviews")
