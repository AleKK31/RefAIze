from pydantic import BaseModel

class SeasonBase(BaseModel):
    name: str

class SeasonOut(SeasonBase):
    id: int
