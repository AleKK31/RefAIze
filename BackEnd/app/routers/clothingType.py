from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.models.clothingType import ClothingType
from app.schemas.clothingType import ClothingTypeBase, ClothingTypeOut
from app.core.database import get_db
from app.auth.jwt_bearer import JWTBearer
from app.auth.jwt_handler import decodeJWT

router = APIRouter(prefix="/clothing-types", tags=["Clothing Types"])

def is_admin(token: str = Depends(JWTBearer())):
    payload = decodeJWT(token)
    if not payload or payload.get("admin_id") is None:
        raise HTTPException(status_code=403, detail="Access denied")
    return payload

@router.post("/", response_model=ClothingTypeOut, dependencies=[Depends(is_admin)])
def create_clothing_type(clothing_type: ClothingTypeBase, db: Session = Depends(get_db)):
    db_clothing_type = ClothingType(name=clothing_type.name)
    db.add(db_clothing_type)
    db.commit()
    db.refresh(db_clothing_type)
    return db_clothing_type

@router.get("/", response_model=list[ClothingTypeOut])
def read_clothing_types(db: Session = Depends(get_db)):
    return db.query(ClothingType).all()

@router.get("/{clothing_type_id}", response_model=ClothingTypeOut)
def read_clothing_type(clothing_type_id: int, db: Session = Depends(get_db)):
    clothing_type = db.query(ClothingType).filter(ClothingType.id == clothing_type_id).first()
    if not clothing_type:
        raise HTTPException(status_code=404, detail="Clothing type not found")
    return clothing_type

@router.put("/{clothing_type_id}", response_model=ClothingTypeOut, dependencies=[Depends(is_admin)])
def update_clothing_type(clothing_type_id: int, clothing_type: ClothingTypeBase, db: Session = Depends(get_db)):
    db_clothing_type = db.query(ClothingType).filter(ClothingType.id == clothing_type_id).first()
    if not db_clothing_type:
        raise HTTPException(status_code=404, detail="Clothing type not found")
    db_clothing_type.name = clothing_type.name
    db.commit()
    db.refresh(db_clothing_type)
    return db_clothing_type

@router.delete("/{clothing_type_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(is_admin)])
def delete_clothing_type(clothing_type_id: int, db: Session = Depends(get_db)):
    db_clothing_type = db.query(ClothingType).filter(ClothingType.id == clothing_type_id).first()
    if not db_clothing_type:
        raise HTTPException(status_code=404, detail="Clothing type not found")
    db.delete(db_clothing_type)
    db.commit()
