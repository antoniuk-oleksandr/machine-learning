from pydantic import BaseModel # type: ignore
from typing import List
from body.learning_value import LearningValue

class TaskOneInput(BaseModel):
    bias: float
    learningRateCoefficient: float
    weights: List[float]
    learningValues: List[LearningValue]
