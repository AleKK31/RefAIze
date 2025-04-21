from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.models.season import Season
from app.schemas.season import SeasonBase, SeasonOut
from app.core.database import get_db
from app.auth.jwt_bearer import JWTBearer
from app.auth.jwt_handler import decodeJWT

router = APIRouter(prefix="/seasons", tags=["Seasons"])

def is_admin(token: str = Depends(JWTBearer())):
    payload = decodeJWT(token)
    if not payload or payload.get("admin_id") is None:
        raise HTTPException(status_code=403, detail="Access denied")
    return payload

@router.post("/", response_model=SeasonOut, dependencies=[Depends(is_admin)])
def create_season(season: SeasonBase, db: Session = Depends(get_db)):
    db_season = Season(name=season.name)
    db.add(db_season)
    db.commit()
    db.refresh(db_season)
    return db_season

@router.get("/", response_model=list[SeasonOut])
def read_seasons(db: Session = Depends(get_db)):
    return db.query(Season).all()

@router.get("/{season_id}", response_model=SeasonOut)
def read_season(season_id: int, db: Session = Depends(get_db)):
    season = db.query(Season).filter(Season.id == season_id).first()
    if not season:
        raise HTTPException(status_code=404, detail="Season not found")
    return season

@router.put("/{season_id}", response_model=SeasonOut, dependencies=[Depends(is_admin)])
def update_season(season_id: int, season: SeasonBase, db: Session = Depends(get_db)):
    db_season = db.query(Season).filter(Season.id == season_id).first()
    if not db_season:
        raise HTTPException(status_code=404, detail="Season not found")
    db_season.name = season.name
    db.commit()
    db.refresh(db_season)
    return db_season

@router.delete("/{season_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(is_admin)])
def delete_season(season_id: int, db: Session = Depends(get_db)):
    db_season = db.query(Season).filter(Season.id == season_id).first()
    if not db_season:
        raise HTTPException(status_code=404, detail="Season not found")
    db.delete(db_season)
    db.commit()
