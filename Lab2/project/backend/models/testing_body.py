from typing import List
from pydantic import BaseModel, Field  # type: ignore


class TestingBody(BaseModel):
    weights: List[List[float]] = Field(alias="weights")
    pixels: List[float] = Field(alias="pixels")
    grid_size: int = Field(alias="gridSize")
