from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.models.style import Style
from app.schemas.style import StyleBase, StyleOut
from app.core.database import get_db
from app.auth.jwt_bearer import JWTBearer
from app.auth.jwt_handler import decodeJWT

router = APIRouter(prefix="/styles", tags=["Styles"])

def is_admin(token: str = Depends(JWTBearer())):
    payload = decodeJWT(token)
    if not payload or payload.get("admin_id") is None:
        raise HTTPException(status_code=403, detail="Access denied")
    return payload

@router.post("/", response_model=StyleOut, dependencies=[Depends(is_admin)])
def create_style(style: StyleBase, db: Session = Depends(get_db)):
    db_style = Style(name=style.name)
    db.add(db_style)
    db.commit()
    db.refresh(db_style)
    return db_style

@router.get("/", response_model=list[StyleOut])
def read_styles(db: Session = Depends(get_db)):
    return db.query(Style).all()

@router.get("/{style_id}", response_model=StyleOut)
def read_style(style_id: int, db: Session = Depends(get_db)):
    style = db.query(Style).filter(Style.id == style_id).first()
    if not style:
        raise HTTPException(status_code=404, detail="Style not found")
    return style

@router.put("/{style_id}", response_model=StyleOut, dependencies=[Depends(is_admin)])
def update_style(style_id: int, style: StyleBase, db: Session = Depends(get_db)):
    db_style = db.query(Style).filter(Style.id == style_id).first()
    if not db_style:
        raise HTTPException(status_code=404, detail="Style not found")
    db_style.name = style.name
    db.commit()
    db.refresh(db_style)
    return db_style

@router.delete("/{style_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(is_admin)])
def delete_style(style_id: int, db: Session = Depends(get_db)):
    db_style = db.query(Style).filter(Style.id == style_id).first()
    if not db_style:
        raise HTTPException(status_code=404, detail="Style not found")
    db.delete(db_style)
    db.commit()
