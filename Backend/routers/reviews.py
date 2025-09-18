from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database.database import SessionLocal
from database import models, schemas
from datetime import datetime

router = APIRouter(
    prefix="/reviews",
    tags=["reviews"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.ReviewResponse)
def create_review(review: schemas.ReviewCreate, db: Session = Depends(get_db)):
    # Verify escort exists
    escort = db.query(models.Escort).filter(models.Escort.escort_id == review.escort_id).first()
    if not escort:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Escort not found"
        )
    
    # Verify client exists
    client = db.query(models.User).filter(
        models.User.user_id == review.client_id,
        models.User.user_type == 'client'
    ).first()
    if not client:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Client not found"
        )
    
    # Check if client already reviewed this escort
    existing_review = db.query(models.Review).filter(
        models.Review.escort_id == review.escort_id,
        models.Review.client_id == review.client_id
    ).first()
    if existing_review:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Client has already reviewed this escort"
        )
    
    db_review = models.Review(**review.dict())
    db.add(db_review)
    
    # Update escort's rating and review count
    escort.total_reviews += 1
    total_rating = sum(r.rating for r in escort.reviews) + review.rating
    escort.average_rating = total_rating / (escort.total_reviews)
    
    db.commit()
    db.refresh(db_review)
    return db_review

@router.get("/escort/{escort_id}", response_model=List[schemas.ReviewResponse])
def get_escort_reviews(
    escort_id: int,
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    reviews = db.query(models.Review).filter(
        models.Review.escort_id == escort_id,
        models.Review.is_hidden == False
    ).offset(skip).limit(limit).all()
    return reviews

@router.get("/client/{client_id}", response_model=List[schemas.ReviewResponse])
def get_client_reviews(
    client_id: int,
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    reviews = db.query(models.Review).filter(
        models.Review.client_id == client_id,
        models.Review.is_hidden == False
    ).offset(skip).limit(limit).all()
    return reviews

@router.put("/{review_id}", response_model=schemas.ReviewResponse)
def update_review(
    review_id: int,
    review_update: schemas.ReviewBase,
    db: Session = Depends(get_db)
):
    db_review = db.query(models.Review).filter(models.Review.review_id == review_id).first()
    if not db_review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review not found"
        )
    
    # Update review
    old_rating = db_review.rating
    for key, value in review_update.dict(exclude_unset=True).items():
        setattr(db_review, key, value)
    
    # Update escort's average rating if rating changed
    if old_rating != review_update.rating:
        escort = db_review.escort
        total_rating = sum(r.rating for r in escort.reviews)
        escort.average_rating = total_rating / escort.total_reviews
    
    db_review.updated_at = datetime.now()
    db.commit()
    db.refresh(db_review)
    return db_review

@router.delete("/{review_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_review(review_id: int, db: Session = Depends(get_db)):
    db_review = db.query(models.Review).filter(models.Review.review_id == review_id).first()
    if not db_review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review not found"
        )
    
    # Update escort's rating and review count
    escort = db_review.escort
    escort.total_reviews -= 1
    if escort.total_reviews > 0:
        total_rating = sum(r.rating for r in escort.reviews if r.review_id != review_id)
        escort.average_rating = total_rating / escort.total_reviews
    else:
        escort.average_rating = 0
    
    db.delete(db_review)
    db.commit()
    return None

@router.post("/{review_id}/verify", response_model=schemas.ReviewResponse)
def verify_review(review_id: int, db: Session = Depends(get_db)):
    db_review = db.query(models.Review).filter(models.Review.review_id == review_id).first()
    if not db_review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review not found"
        )
    
    db_review.is_verified = True
    db.commit()
    db.refresh(db_review)
    return db_review

@router.post("/{review_id}/hide", response_model=schemas.ReviewResponse)
def hide_review(review_id: int, db: Session = Depends(get_db)):
    db_review = db.query(models.Review).filter(models.Review.review_id == review_id).first()
    if not db_review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review not found"
        )
    
    db_review.is_hidden = True
    db.commit()
    db.refresh(db_review)
    return db_review