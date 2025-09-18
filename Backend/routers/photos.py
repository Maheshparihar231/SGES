from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile
from sqlalchemy.orm import Session
from typing import List
from database.database import SessionLocal
from database import models, schemas

router = APIRouter(
    prefix="/photos",
    tags=["photos"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.PhotoResponse)
async def upload_photo(
    escort_id: int,
    is_blurred: bool = False,
    is_primary: bool = False,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Verify escort exists
    escort = db.query(models.Escort).filter(models.Escort.escort_id == escort_id).first()
    if not escort:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Escort not found"
        )
    
    # TODO: Implement file upload to cloud storage
    # For now, we'll just store the filename
    photo = models.Photo(
        escort_id=escort_id,
        photo_url=file.filename,
        is_blurred=is_blurred,
        is_primary=is_primary
    )
    
    if is_primary:
        # Set all other photos to non-primary
        db.query(models.Photo).filter(
            models.Photo.escort_id == escort_id,
            models.Photo.is_primary == True
        ).update({"is_primary": False})
    
    db.add(photo)
    db.commit()
    db.refresh(photo)
    return photo

@router.get("/escort/{escort_id}", response_model=List[schemas.PhotoResponse])
def get_escort_photos(escort_id: int, db: Session = Depends(get_db)):
    photos = db.query(models.Photo).filter(
        models.Photo.escort_id == escort_id
    ).order_by(models.Photo.display_order).all()
    return photos

@router.put("/{photo_id}", response_model=schemas.PhotoResponse)
def update_photo(
    photo_id: int,
    is_blurred: bool = None,
    is_primary: bool = None,
    display_order: int = None,
    db: Session = Depends(get_db)
):
    photo = db.query(models.Photo).filter(models.Photo.photo_id == photo_id).first()
    if not photo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Photo not found"
        )
    
    if is_blurred is not None:
        photo.is_blurred = is_blurred
    
    if is_primary is not None and is_primary:
        # Set all other photos of this escort to non-primary
        db.query(models.Photo).filter(
            models.Photo.escort_id == photo.escort_id,
            models.Photo.is_primary == True
        ).update({"is_primary": False})
        photo.is_primary = True
    
    if display_order is not None:
        photo.display_order = display_order
    
    db.commit()
    db.refresh(photo)
    return photo

@router.delete("/{photo_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_photo(photo_id: int, db: Session = Depends(get_db)):
    photo = db.query(models.Photo).filter(models.Photo.photo_id == photo_id).first()
    if not photo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Photo not found"
        )
    
    # TODO: Delete from cloud storage as well
    db.delete(photo)
    db.commit()
    return None

@router.put("/escort/{escort_id}/reorder", response_model=List[schemas.PhotoResponse])
def reorder_photos(
    escort_id: int,
    photo_ids: List[int],
    db: Session = Depends(get_db)
):
    # Verify all photos belong to the escort
    photos = db.query(models.Photo).filter(
        models.Photo.escort_id == escort_id,
        models.Photo.photo_id.in_(photo_ids)
    ).all()
    
    if len(photos) != len(photo_ids):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid photo IDs provided"
        )
    
    # Update display order
    for i, photo_id in enumerate(photo_ids):
        db.query(models.Photo).filter(
            models.Photo.photo_id == photo_id
        ).update({"display_order": i})
    
    db.commit()
    return db.query(models.Photo).filter(
        models.Photo.escort_id == escort_id
    ).order_by(models.Photo.display_order).all()