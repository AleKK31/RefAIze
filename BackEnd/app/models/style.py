from sqlalchemy import Column, Integer, String
from app.core.database import Base

class Style(Base):
    __tablename__ = "styles"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)