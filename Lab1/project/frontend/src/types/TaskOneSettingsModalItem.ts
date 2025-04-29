import type { TrainingType } from "./TrainingType"

export type TaskOneSettingsModalItem = {
  title: string
  description: string
  checked: boolean
  trainingType: TrainingType,
  useInput?: boolean
  inputValue?: number
  setInputValue?: (value: number) => void,
}
