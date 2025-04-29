import { writable } from "svelte/store";
import type { TaskOneSettingsStore } from "../../../types/TaskOneSettingsStore";
import { TrainingType } from "../../../types/TrainingType";

const getInitialStoreValues = (): TaskOneSettingsStore => {
  let delaySeconds: any = localStorage.getItem("delaySeconds")
  let trainingType: any = localStorage.getItem("trainingType")

  if (delaySeconds === null) {
    localStorage.setItem("delaySeconds", "1");
    delaySeconds = 1;
  } else if (typeof delaySeconds === "string") {
    delaySeconds = parseInt(delaySeconds);
  }
  if (trainingType === null) {
    localStorage.setItem("trainingType", TrainingType.TrainAllWithoutDelay.toString());
    trainingType = TrainingType.TrainAllWithoutDelay;
  } else if (typeof trainingType === "string") {
    trainingType = parseInt(trainingType);
  }

  return {
    delaySeconds,
    trainingType,
    open: false,
    trained: false,
    training: false
  }
}


export const taskOneSettingsStore = writable<TaskOneSettingsStore>(getInitialStoreValues())
