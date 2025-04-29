import { get } from "svelte/store";
import type { TaskOneEpochResult } from "../../../../types/TaskOneEpochResult";
import type { TaskOneLog } from "../../../../types/TaskOneLog";
import { taskOneLearningValuesStore } from "../../stores/task-one-learning-values-store";

export const formatTaskOneLogs = (logs: TaskOneEpochResult[]): TaskOneLog[] => {
  const learningValues = get(taskOneLearningValuesStore)

  return logs.reduce((acc, log) => {
    const formatedLog: TaskOneLog = {
      epoch: log.epoch,
      weights: log.weights,
      result: []
    }

    formatedLog.result = log.result.map((result, index) => ({
      success: result,
      message: `(${learningValues[index].x1}; ${learningValues[index].x2}) - ${result ? 'success' : 'fail'}`,
    }))

    acc.push(formatedLog)

    return acc
  }, [] as TaskOneLog[])
}
