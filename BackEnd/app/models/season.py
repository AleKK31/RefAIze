from sqlalchemy import Column, Integer, String
from app.core.database import Base

class Season(Base):
    __tablename__ = "seasons"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)