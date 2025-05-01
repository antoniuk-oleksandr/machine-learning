from pydantic import BaseModel  # type: ignore
from typing import List


class LearningValueModel(BaseModel):
    number: int
    pixels: List[float]
