from models.learning_value_model import LearningValueModel
from pydantic import BaseModel, ConfigDict, Field  # type: ignore
from typing import List


class TrainingBody(BaseModel):
    c_value: float = Field(alias="cValue")
    grid_size: int = Field(alias="gridSize")
    learning_values: List[LearningValueModel] = Field(alias="learningValues")
    accuracy: float

    model_config = ConfigDict(
        populate_by_name=True,
        extra="forbid"
    )
