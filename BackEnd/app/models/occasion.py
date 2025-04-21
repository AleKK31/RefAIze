from sqlalchemy import Column, Integer, String
from app.core.database import Base

class Occasion(Base):
    __tablename__ = "occasions"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)