import { writable } from "svelte/store";
import type { Point } from "../../../types/Point";

export const taskTwoPointsStore = writable<Point[]>([
  { x: 0.19, y: 1.21 },
  { x: 0.21, y: 1.30 },
  { x: 0.31, y: 1.28 },
  { x: 0.41, y: 1.39 },
  { x: 0.49, y: 1.65 },
  { x: 0.60, y: 1.73 },
  { x: 0.81, y: 1.72 },
  { x: 0.91, y: 2.04 },
  { x: 1.01, y: 2.15 },
])
