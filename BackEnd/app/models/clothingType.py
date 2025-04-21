from sqlalchemy import Column, Integer, String
from app.core.database import Base

class ClothingType(Base):
    __tablename__ = "clothing_types"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)