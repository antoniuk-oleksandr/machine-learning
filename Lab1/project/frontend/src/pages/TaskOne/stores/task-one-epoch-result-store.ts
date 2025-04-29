import { writable } from "svelte/store";
import type { TaskOneEpochResult } from "../../../types/TaskOneEpochResult";

export const taskOneEpochResultStore = writable<TaskOneEpochResult[]>([])
