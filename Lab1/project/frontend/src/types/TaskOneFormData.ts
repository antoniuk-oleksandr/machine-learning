import type { LearningValue } from "./LearningValue"

export type TaskOneFormData = {
  learningValues: LearningValue[],
  bias: number,
  weights: number[],
  learningRateCoefficient: number,
}
