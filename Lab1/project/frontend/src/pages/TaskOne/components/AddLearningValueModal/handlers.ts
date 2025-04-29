import type { LearningValue } from "../../../../types/LearningValue";
import { taskOneChartStore } from "../../stores/task-one-chart-store";
import { taskOneLearningValuesStore } from "../../stores/task-one-learning-values-store";

export const handleAddLearningValueModalSubmit = (data: LearningValue) => {
  taskOneChartStore.update((prev) => ({
    ...prev,
    k: undefined,
    b: undefined,
  }))
  taskOneLearningValuesStore.update((prev) => ([...prev, data]));
}
