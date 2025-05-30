from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.admin import Admin
from app.schemas.admin import AdminLogin
from app.models.user import User
from app.schemas.user import UserLogin
from passlib.hash import bcrypt
from .jwt_handler import signJWT, sign_refresh_token

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/admin/login")
def login(data: AdminLogin, db: Session = Depends(get_db)):
    admin = db.query(Admin).filter(Admin.email == data.email).first()
    if not admin or not bcrypt.verify(data.password, admin.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = signJWT(admin.id)
    refresh_token = sign_refresh_token(admin.id)
    return {"access_token": access_token, "refresh_token": refresh_token}

@router.post("/user/login")
def login(data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not bcrypt.verify(data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = signJWT(user.id)
    refresh_token = sign_refresh_token(user.id)
    return {"access_token": access_token, "refresh_token": refresh_token}
