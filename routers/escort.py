from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.database import SessionLocal
from database import models, schemas

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/users/")
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.post("/escorts/")
def create_escort(escort: schemas.EscortCreate, db: Session = Depends(get_db)):
    db_escort = models.Escort(**escort.dict())
    db.add(db_escort)
    db.commit()
    db.refresh(db_escort)
    return db_escort

@router.post("/photos/")
def add_photo(photo: schemas.PhotoCreate, db: Session = Depends(get_db)):
    db_photo = models.Photo(**photo.dict())
    db.add(db_photo)
    db.commit()
    db.refresh(db_photo)
    return db_photo

@router.post("/reviews/")
def add_review(review: schemas.ReviewCreate, db: Session = Depends(get_db)):
    db_review = models.Review(**review.dict())
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review

@router.get("/escorts/")
def list_escorts(db: Session = Depends(get_db)):
    return db.query(models.Escort).all()
