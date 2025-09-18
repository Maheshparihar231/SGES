from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database.database import SessionLocal
from database import models, schemas
from datetime import datetime

router = APIRouter(
    prefix="/favorites",
    tags=["favorites"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.FavoriteResponse)
def add_favorite(favorite: schemas.FavoriteCreate, db: Session = Depends(get_db)):
    # Verify user exists
    user = db.query(models.User).filter(
        models.User.user_id == favorite.user_id,
        models.User.user_type == 'client'
    ).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found or not a client"
        )
    
    # Verify escort exists
    escort = db.query(models.Escort).filter(models.Escort.escort_id == favorite.escort_id).first()
    if not escort:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Escort not found"
        )
    
    # Check if already favorited
    existing_favorite = db.query(models.Favorite).filter(
        models.Favorite.user_id == favorite.user_id,
        models.Favorite.escort_id == favorite.escort_id
    ).first()
    if existing_favorite:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Already in favorites"
        )
    
    db_favorite = models.Favorite(**favorite.dict())
    db.add(db_favorite)
    
    # Update escort's favorite count
    escort.total_favorites += 1
    
    db.commit()
    db.refresh(db_favorite)
    return db_favorite

@router.get("/user/{user_id}", response_model=List[schemas.FavoriteResponse])
def get_user_favorites(
    user_id: int,
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    favorites = db.query(models.Favorite).filter(
        models.Favorite.user_id == user_id
    ).offset(skip).limit(limit).all()
    return favorites

@router.get("/escort/{escort_id}/count")
def get_escort_favorites_count(escort_id: int, db: Session = Depends(get_db)):
    count = db.query(models.Favorite).filter(
        models.Favorite.escort_id == escort_id
    ).count()
    return {"count": count}

@router.delete("/{user_id}/{escort_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_favorite(user_id: int, escort_id: int, db: Session = Depends(get_db)):
    db_favorite = db.query(models.Favorite).filter(
        models.Favorite.user_id == user_id,
        models.Favorite.escort_id == escort_id
    ).first()
    if not db_favorite:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Favorite not found"
        )
    
    # Update escort's favorite count
    escort = db.query(models.Escort).filter(models.Escort.escort_id == escort_id).first()
    if escort:
        escort.total_favorites -= 1
    
    db.delete(db_favorite)
    db.commit()
    return None

@router.get("/check/{user_id}/{escort_id}")
def check_favorite(user_id: int, escort_id: int, db: Session = Depends(get_db)):
    favorite = db.query(models.Favorite).filter(
        models.Favorite.user_id == user_id,
        models.Favorite.escort_id == escort_id
    ).first()
    return {"is_favorite": bool(favorite)}