import type { TaskOneFormData } from "./TaskOneFormData"
import type { TrainingType } from "./TrainingType"

export type TaskOneWSBody = {
  type: TrainingType,
  data: TaskOneFormData | null,
  delay?: number
}
