from pydantic import BaseModel # type: ignore

class Point(BaseModel):
    x: float
    y: float
