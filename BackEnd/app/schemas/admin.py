from pydantic import BaseModel, EmailStr
from typing import Optional

class AdminBase(BaseModel):
    name: str
    email: EmailStr

class AdminCreate(AdminBase):
    password: str

class AdminOut(AdminBase):
    id: int

class AdminLogin(BaseModel):
    email: EmailStr 
    password: str

    class Config:
        from_attributes = True