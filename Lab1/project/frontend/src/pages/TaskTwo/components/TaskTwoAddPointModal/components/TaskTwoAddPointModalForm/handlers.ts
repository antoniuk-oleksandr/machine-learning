import type { Point } from "chart.js";
import { taskTwoPointsStore } from "../../../../stores/task-two-points-store";
import { taskTwoPointsModalStore } from "../../../../stores/task-two-points-modal-store";
import { taskTwoChartStore } from "../../../../stores/task-two-chart-store";

export const handleTaskTwoAddPointModalFormSubmit = (data: Point) => {
  taskTwoChartStore.update((prev) => ({
    ...prev,
    k: undefined,
    b: undefined,
  }))
  taskTwoPointsStore.update((prev) => [...prev, data]);
  taskTwoPointsModalStore.update((prev) => ({ ...prev, open: false }))
}
