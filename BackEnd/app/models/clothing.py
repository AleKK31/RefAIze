from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class Clothing(Base):
    __tablename__ = "clothing"
    id = Column(Integer, primary_key=True, index=True)
    
    userId = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="clothing")

    typeId = Column(Integer, ForeignKey("clothing_types.id"))
    type = relationship("ClothingType", back_populates="clothing")

    name = Column(String, index=True)
    color = Column(String, index=True)

    styleId = Column(Integer, ForeignKey("styles.id"))
    style = relationship("Style", back_populates="clothing")

    occasionId = Column(Integer, ForeignKey("occasions.id"))
    occasion = relationship("Occasion", back_populates="clothing")

    seasonId = Column(Integer, ForeignKey("seasons.id"))
    season = relationship("Season", back_populates="clothing")

    #picPath = Column(String, index=True)