import type { Chart } from "chart.js"
import { sendWebSocketMessage } from "../../api/websocket"
import type { ChartLineData } from "../../types/ChartLineData"
import type { LearningValue } from "../../types/LearningValue"
import type { TaskOneFormData } from "../../types/TaskOneFormData"
import type { TaskOneWSBody } from "../../types/TaskOneWSBody"
import { TrainingType } from "../../types/TrainingType"
import { get } from "svelte/store"
import { taskOneSettingsStore } from "./stores/task-one-settings-store"
import { taskOneEpochResultStore } from "./stores/task-one-epoch-result-store"
import type { TaskOneSettingsStore } from "../../types/TaskOneSettingsStore"
import type { TaskOneEpochResult } from "../../types/TaskOneEpochResult"
import { taskOneChartStore } from "./stores/task-one-chart-store"
import { calculateLineIntersections, getBounds } from "../TaskTwo/handlers"

export const handleTaskOneChartRerender = (
  chart: Chart | undefined,
  values: LearningValue[],
  chartLineData: ChartLineData
) => {
  if (!chart) return;

  // Update class datasets
  chart.data.datasets[0].data = values
    .filter(v => v.classValue === 1)
    .map(v => ({ x: v.x1, y: v.x2 }));

  chart.data.datasets[1].data = values
    .filter(v => v.classValue === -1)
    .map(v => ({ x: v.x1, y: v.x2 }));

  // Force immediate update to get correct bounds
  chart.update('none');

  // Handle separating line
  const { k, b } = chartLineData;
  if (k !== undefined && b !== undefined) {
    const bounds = getBounds(chart);
    const intersections = calculateLineIntersections(k, b, bounds);

    // Get two outermost points
    const uniquePoints = Array.from(new Set(intersections.map(p => JSON.stringify(p))))
      .map(p => JSON.parse(p))
      .sort((a, b) => a.x - b.x);

    const lineData = uniquePoints.length >= 2
      ? [uniquePoints[0], uniquePoints[uniquePoints.length - 1]]
      : [];

    if (lineData.length) {
      if (chart.data.datasets.length >= 3) {
        chart.data.datasets[2].data = lineData;
      } else {
        chart.data.datasets.push({
          label: 'Separating Line',
          data: lineData,
          backgroundColor: 'transparent',
          borderColor: '#000000',
          borderWidth: 2,
          pointRadius: 0,
          fill: false,
          showLine: true,
          type: 'line',
        });
      }
    } else if (chart.data.datasets.length >= 3) {
      chart.data.datasets.splice(2, 1);
    }
  } else if (chart.data.datasets.length >= 3) {
    chart.data.datasets.splice(2, 1);
  }

  chart.update();
};



export const handleTaskOneFormSubmit = async (data: TaskOneFormData) => {
  const settings = get(taskOneSettingsStore)
  const epochs = get(taskOneEpochResultStore)

  if (settings.trainingType === TrainingType.TrainAllWithDelay) {
    taskOneSettingsStore.update((prev) => ({ ...prev, training: true }))
  }

  taskOneChartStore.set({ k: undefined, b: undefined })

  let wsBody: TaskOneWSBody = getTaskOneWsBody(settings, epochs, data)

  sendWebSocketMessage<TaskOneWSBody>(wsBody);
}

const getTaskOneWsBody = (
  settings: TaskOneSettingsStore,
  epochs: TaskOneEpochResult[],
  data: TaskOneFormData
): TaskOneWSBody => {
  const continueTraining = settings.trainingType === TrainingType.TrainStepByStep
    && epochs.length > 0
    && !settings.trained

  if (continueTraining) {
    return { type: TrainingType.NextEpoch, data: null }
  }

  taskOneSettingsStore.update(prev => ({ ...prev, trained: false }))
  taskOneEpochResultStore.set([])

  const wsBody: TaskOneWSBody = {
    type: get(taskOneSettingsStore).trainingType,
    data,
    ...(settings.trainingType === TrainingType.TrainAllWithDelay && { delay: settings.delaySeconds })
  }

  return wsBody
}

