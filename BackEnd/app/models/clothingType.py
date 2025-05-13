from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.core.database import Base

class ClothingType(Base):
    __tablename__ = "clothing_types"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)

    clothing = relationship("Clothing", back_populates="type")