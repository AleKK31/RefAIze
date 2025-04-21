from pydantic import BaseModel

class ClothingTypeBase(BaseModel):
    name: str

class ClothingTypeOut(ClothingTypeBase):
    id: int
