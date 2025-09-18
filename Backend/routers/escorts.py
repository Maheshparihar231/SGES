from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from database.database import SessionLocal
from database import models, schemas
from datetime import datetime
from sqlalchemy import or_

router = APIRouter(
    prefix="/escorts",
    tags=["escorts"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.EscortResponse, status_code=status.HTTP_201_CREATED)
def create_escort(escort: schemas.EscortCreate, db: Session = Depends(get_db)):
    # Verify user exists and is of type 'escort'
    user = db.query(models.User).filter(models.User.user_id == escort.user_id).first()
    if not user or user.user_type != 'escort':
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user_id or user is not an escort"
        )
    
    db_escort = models.Escort(**escort.dict())
    db.add(db_escort)
    db.commit()
    db.refresh(db_escort)
    return db_escort

@router.get("/", response_model=List[schemas.EscortResponse])
def list_escorts(
    skip: int = 0,
    limit: int = 20,
    city: Optional[str] = None,
    min_age: Optional[int] = None,
    max_age: Optional[int] = None,
    services: Optional[List[str]] = Query(None),
    availability: Optional[str] = None,
    min_rating: Optional[float] = None,
    is_verified: Optional[bool] = None,
    is_featured: Optional[bool] = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.Escort)
    
    # Apply filters
    if city:
        query = query.filter(models.Escort.city == city)
    if min_age:
        query = query.filter(models.Escort.age >= min_age)
    if max_age:
        query = query.filter(models.Escort.age <= max_age)
    if services:
        for service in services:
            query = query.filter(models.Escort.services.contains([service]))
    if availability:
        query = query.filter(models.Escort.availability == availability)
    if min_rating:
        query = query.filter(models.Escort.rating >= min_rating)
    if is_verified is not None:
        query = query.filter(models.Escort.is_verified == is_verified)
    if is_featured is not None:
        query = query.filter(models.Escort.is_featured == is_featured)
    
    return query.offset(skip).limit(limit).all()

@router.get("/{escort_id}", response_model=schemas.EscortResponse)
def get_escort(escort_id: int, db: Session = Depends(get_db)):
    db_escort = db.query(models.Escort).filter(models.Escort.escort_id == escort_id).first()
    if db_escort is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Escort not found"
        )
    
    # Increment views count
    db_escort.views_count += 1
    db.commit()
    
    return db_escort

@router.put("/{escort_id}", response_model=schemas.EscortResponse)
def update_escort(escort_id: int, escort_update: schemas.EscortBase, db: Session = Depends(get_db)):
    db_escort = db.query(models.Escort).filter(models.Escort.escort_id == escort_id).first()
    if db_escort is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Escort not found"
        )
    
    for key, value in escort_update.dict(exclude_unset=True).items():
        setattr(db_escort, key, value)
    
    db_escort.updated_at = datetime.now()
    db.commit()
    db.refresh(db_escort)
    return db_escort

@router.delete("/{escort_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_escort(escort_id: int, db: Session = Depends(get_db)):
    db_escort = db.query(models.Escort).filter(models.Escort.escort_id == escort_id).first()
    if db_escort is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Escort not found"
        )
    
    db.delete(db_escort)
    db.commit()
    return None

@router.post("/{escort_id}/verify", response_model=schemas.EscortResponse)
def verify_escort(escort_id: int, db: Session = Depends(get_db)):
    db_escort = db.query(models.Escort).filter(models.Escort.escort_id == escort_id).first()
    if db_escort is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Escort not found"
        )
    
    db_escort.is_verified = True
    db.commit()
    db.refresh(db_escort)
    return db_escort

@router.post("/{escort_id}/feature", response_model=schemas.EscortResponse)
def feature_escort(escort_id: int, db: Session = Depends(get_db)):
    db_escort = db.query(models.Escort).filter(models.Escort.escort_id == escort_id).first()
    if db_escort is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Escort not found"
        )
    
    db_escort.is_featured = True
    db.commit()
    db.refresh(db_escort)
    return db_escort

@router.put("/{escort_id}/availability", response_model=schemas.EscortResponse)
def update_availability(
    escort_id: int,
    availability: schemas.AvailabilityStatus,
    db: Session = Depends(get_db)
):
    db_escort = db.query(models.Escort).filter(models.Escort.escort_id == escort_id).first()
    if db_escort is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Escort not found"
        )
    
    db_escort.availability = availability
    db_escort.last_availability_update = datetime.now()
    db.commit()
    db.refresh(db_escort)
    return db_escort