from body.point import Point
from pydantic import BaseModel # type: ignore
from typing import List

class TaskTwoBody(BaseModel):
  points: List[Point]
