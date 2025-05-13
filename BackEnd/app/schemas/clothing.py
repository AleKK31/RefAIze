from pydantic import BaseModel

class ClothingBase(BaseModel):
    userId: int
    typeId: int
    name: str
    color: str
    styleId: int
    occasionId: int
    seasonId: int
    # picPath: str

class ClothingCreate(ClothingBase):
    pass

class ClothingResponse(ClothingBase):
    id: int

    class Config:
        from_attributes = True