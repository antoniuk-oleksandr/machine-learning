import type { LearningValue } from "./LearningValue"

export type TaskOneTrainFormData = {
  learningValue: LearningValue,
  bias: number,
  weights: number[],
}
