import { writable } from "svelte/store";
import type { TestingResult } from "../../../types/TestingResult";

export const testingResultStore = writable<TestingResult & { open: boolean }>({
  open: false,
  resultNumber: 0,
  zValues: []
})
