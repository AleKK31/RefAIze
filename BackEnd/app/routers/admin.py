from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.models.admin import Admin
from app.schemas.admin import AdminCreate, AdminOut
from app.database import get_db
from app.auth.jwt_bearer import JWTBearer
from passlib.hash import bcrypt

router = APIRouter(prefix="/admins", tags=["Admins"])

@router.post("/", response_model=AdminOut)
def create_admin(admin: AdminCreate, db: Session = Depends(get_db)):
    hashed_pwd = bcrypt.hash(admin.password)
    db_admin = Admin(name=admin.name, email=admin.email, password=hashed_pwd)
    db.add(db_admin)
    db.commit()
    db.refresh(db_admin)
    return db_admin

@router.get("/", response_model=list[AdminOut], dependencies=[Depends(JWTBearer())])
def read_admins(db: Session = Depends(get_db)):
    return db.query(Admin).all()

@router.get("/{admin_id}", response_model=AdminOut, dependencies=[Depends(JWTBearer())])
def read_admin(admin_id: int, db: Session = Depends(get_db)):
    admin = db.query(Admin).filter(Admin.id == admin_id).first()
    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found")
    return admin

@router.put("/{admin_id}", response_model=AdminOut, dependencies=[Depends(JWTBearer())])
def update_admin(admin_id: int, admin: AdminCreate, db: Session = Depends(get_db)):
    db_admin = db.query(Admin).filter(Admin.id == admin_id).first()
    if not db_admin:
        raise HTTPException(status_code=404, detail="Admin not found")
    db_admin.name = admin.name
    db_admin.email = admin.email
    db_admin.password = bcrypt.hash(admin.password)
    db.commit()
    db.refresh(db_admin)
    return db_admin

@router.delete("/{admin_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(JWTBearer())])
def delete_admin(admin_id: int, db: Session = Depends(get_db)):
    db_admin = db.query(Admin).filter(Admin.id == admin_id).first()
    if not db_admin:
        raise HTTPException(status_code=404, detail="Admin not found")
    db.delete(db_admin)
    db.commit()