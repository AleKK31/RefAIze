from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    name: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: int

class UserLogin(BaseModel):
    email: EmailStr 
    password: str

    class Config:
        from_attributes = True