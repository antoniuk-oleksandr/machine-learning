import type { TrainingType } from "../../../../types/TrainingType";
import { taskOneSettingsStore } from "../../stores/task-one-settings-store";

export const handleTaskOneSettingsModalItemClick = (trainingType: TrainingType) => {
  taskOneSettingsStore.update((prev) => ({
    ...prev,
    trainingType
  }))

  localStorage.setItem("trainingType", trainingType.toString());
}
