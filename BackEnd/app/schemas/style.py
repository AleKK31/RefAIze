from pydantic import BaseModel

class StyleBase(BaseModel):
    name: str

class StyleOut(StyleBase):
    id: int