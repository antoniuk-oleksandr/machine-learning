import { writable } from "svelte/store";
import type { LearningValue } from "../../../types/LearningValue";

export const taskOneLearningValuesStore = writable<LearningValue[]>([
  { x1: 1, x2: 1, classValue: 1 },
  { x1: 9.4, x2: 6.4, classValue: -1 },
  { x1: 2.5, x2: 2.1, classValue: 1 },
  { x1: 8, x2: 7.7, classValue: -1 },
  { x1: 0.5, x2: 2.2, classValue: 1 },
  { x1: 7.9, x2: 8.4, classValue: -1 },
  { x1: 7, x2: 7, classValue: -1 },
  { x1: 2.8, x2: 0.8, classValue: 1 },
  { x1: 1.2, x2: 3, classValue: 1 },
  { x1: 7.8, x2: 6.1, classValue: -1 }
])
