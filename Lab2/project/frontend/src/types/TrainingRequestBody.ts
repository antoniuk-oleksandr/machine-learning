import type { LearningValue } from "./LearningValue"
import type { MessageType } from "./MessageType"

export type TrainingRequestBody = {
  type: MessageType,
  data: {
    cValue: number,
    eValue: number,
    gridSize: number,
    learningValues: LearningValue[]
  }

}
