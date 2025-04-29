import type { TaskOneEpochResult } from "./TaskOneEpochResult"
import type { TaskOneTrainingResult } from "./TaskOneTrainingResult"
import type { WebsocketMessageType } from "./WebsocketMessageType"

export type TaskOneResponse = {
  websocketMessageType: WebsocketMessageType.EpochResult,
  data: TaskOneEpochResult
} | {
  websocketMessageType: WebsocketMessageType.TrainingResult,
  data: TaskOneTrainingResult
} | {
  websocketMessageType: WebsocketMessageType.TestResult,
  data: any
}
