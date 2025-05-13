from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.models.clothing import Clothing
from app.schemas.clothing import ClothingBase, ClothingCreate, ClothingResponse

router = APIRouter(prefix="/clothing", tags=["clothing"])

def get_clothing(db: Session, clothing_id: int):
    clothing = db.query(Clothing).filter(Clothing.id == clothing_id).first()
    if not clothing:
        raise HTTPException(status_code=404, detail="Clothing not found")
    return clothing

@router.post("/", response_model=ClothingResponse)
def create_clothing(clothing: ClothingCreate, db: Session = Depends(get_db)):
    db_clothing = Clothing(**clothing.dict())
    db.add(db_clothing)
    db.commit()
    db.refresh(db_clothing)
    return db_clothing

@router.get("/", response_model=List[ClothingResponse])
def read_clothing(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(Clothing).all()

@router.get("/{clothing_id}", response_model=ClothingResponse)
def read_clothing_by_id(clothing_id: int, db: Session = Depends(get_db)):
    return get_clothing(db, clothing_id)

@router.put("/{clothing_id}", response_model=ClothingResponse)
def update_clothing(
    clothing_id: int, 
    clothing_update: ClothingBase, 
    db: Session = Depends(get_db)
):
    db_clothing = get_clothing(db, clothing_id)
    for field, value in clothing_update.dict().items():
        setattr(db_clothing, field, value)
    db.commit()
    db.refresh(db_clothing)
    return db_clothing

@router.delete("/{clothing_id}")
def delete_clothing(clothing_id: int, db: Session = Depends(get_db)):
    db_clothing = get_clothing(db, clothing_id)
    db.delete(db_clothing)
    db.commit()
    return {"message": "Clothing deleted successfully"}