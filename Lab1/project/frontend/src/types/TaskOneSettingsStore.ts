import type { TrainingType } from "./TrainingType";

export type TaskOneSettingsStore = {
  open: boolean,
  trainingType: TrainingType,
  delaySeconds: number,
  trained: boolean,
  training: boolean,
}
