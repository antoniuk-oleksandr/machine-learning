import { writable } from "svelte/store";
import type { ChartLineData } from "../../../types/ChartLineData";

export const taskOneChartStore = writable<ChartLineData>({
  k: undefined,
  b: undefined,
}) 
