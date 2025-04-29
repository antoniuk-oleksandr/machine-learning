import { writable } from "svelte/store";
import type { TaskOneTrainFormData } from "../../../types/TaskOneTrainFormData";

export const taskOneTrainStore = writable<Partial<TaskOneTrainFormData>>({
  bias: 0,
  weights: [],
})
