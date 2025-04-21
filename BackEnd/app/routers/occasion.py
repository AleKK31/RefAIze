from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.models.occasion import Occasion
from app.schemas.occasion import OccasionBase, OccasionOut
from app.core.database import get_db
from app.auth.jwt_bearer import JWTBearer
from app.auth.jwt_handler import decodeJWT

router = APIRouter(prefix="/occasions", tags=["Occasions"])

def is_admin(token: str = Depends(JWTBearer())):
    payload = decodeJWT(token)
    if not payload or payload.get("admin_id") is None:
        raise HTTPException(status_code=403, detail="Access denied")
    return payload

@router.post("/", response_model=OccasionOut, dependencies=[Depends(is_admin)])
def create_occasion(occasion: OccasionBase, db: Session = Depends(get_db)):
    db_occasion = Occasion(name=occasion.name)
    db.add(db_occasion)
    db.commit()
    db.refresh(db_occasion)
    return db_occasion

@router.get("/", response_model=list[OccasionOut])
def read_occasions(db: Session = Depends(get_db)):
    return db.query(Occasion).all()

@router.get("/{occasion_id}", response_model=OccasionOut)
def read_occasion(occasion_id: int, db: Session = Depends(get_db)):
    occasion = db.query(Occasion).filter(Occasion.id == occasion_id).first()
    if not occasion:
        raise HTTPException(status_code=404, detail="Occasion not found")
    return occasion

@router.put("/{occasion_id}", response_model=OccasionOut, dependencies=[Depends(is_admin)])
def update_occasion(occasion_id: int, occasion: OccasionBase, db: Session = Depends(get_db)):
    db_occasion = db.query(Occasion).filter(Occasion.id == occasion_id).first()
    if not db_occasion:
        raise HTTPException(status_code=404, detail="Occasion not found")
    db_occasion.name = occasion.name
    db.commit()
    db.refresh(db_occasion)
    return db_occasion

@router.delete("/{occasion_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(is_admin)])
def delete_occasion(occasion_id: int, db: Session = Depends(get_db)):
    db_occasion = db.query(Occasion).filter(Occasion.id == occasion_id).first()
    if not db_occasion:
        raise HTTPException(status_code=404, detail="Occasion not found")
    db.delete(db_occasion)
    db.commit()
