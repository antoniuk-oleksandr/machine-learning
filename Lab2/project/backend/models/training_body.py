from models.learning_value_model import LearningValueModel
from pydantic import BaseModel, ConfigDict, Field
from typing import List

class TrainingBody(BaseModel):
    c_value: float = Field(alias="cValue")
    e_value: float = Field(alias="eValue")
    grid_size: int = Field(alias="gridSize")
    learning_values: List[LearningValueModel] = Field(alias="learningValues")
    accuracy: float  # No alias needed if matches JSON key

    model_config = ConfigDict(
        populate_by_name=True,  # Replaces allow_population_by_field_name
        extra="forbid"  # Recommended: reject unexpected fields
    )
