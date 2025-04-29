import type { TaskOneSettingsModalItem } from "../../../../types/TaskOneSettingsModalItem";
import type { TaskOneSettingsStore } from "../../../../types/TaskOneSettingsStore";
import { TrainingType } from "../../../../types/TrainingType";
import { taskOneSettingsStore } from "../../stores/task-one-settings-store";

const setDelaySeconds = (value: number) => {
  taskOneSettingsStore.update((prev) => ({
    ...prev,
    delaySeconds: value
  }))
  localStorage.setItem("delaySeconds", value.toString());
}

export const getTaskOneSettingsModalItems = (
  value: TaskOneSettingsStore
): TaskOneSettingsModalItem[] => [
    {
      title: 'Instant Training',
      description: 'Train all epochs at once',
      checked: value.trainingType === TrainingType.TrainAllWithoutDelay,
      trainingType: TrainingType.TrainAllWithoutDelay
    },
    {
      title: 'Delayed Training',
      description: 'Train all epochs with a delay',
      checked: value.trainingType === TrainingType.TrainAllWithDelay,
      useInput: true,
      inputValue: value.delaySeconds,
      trainingType: TrainingType.TrainAllWithDelay,
      setInputValue: setDelaySeconds
    },
    {
      title: 'Step-by-Step Training',
      description: 'Train one epoch at a time',
      checked: value.trainingType === TrainingType.TrainStepByStep,
      trainingType: TrainingType.TrainStepByStep,
    },
  ]
