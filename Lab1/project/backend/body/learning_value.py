from pydantic import BaseModel
from typing import List

class LearningValue(BaseModel):
    x1: float
    x2: float
    classValue: int
