from pydantic import BaseModel  # type: ignore
from typing import List
from body.learning_value import LearningValue


class TaskOneTest(BaseModel):
    bias: float
    weights: List[float]
    learningValue: LearningValue
