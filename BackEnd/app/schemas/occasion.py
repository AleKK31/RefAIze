from pydantic import BaseModel

class OccasionBase(BaseModel):
    name: str

class OccasionOut(OccasionBase):
    id: int
