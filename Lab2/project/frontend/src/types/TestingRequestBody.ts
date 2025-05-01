import type { MessageType } from "./MessageType"

export type TestingRequestBody = {
  type: MessageType.Testing,
  data: {
    weights: number[][],
    gridSize: number,
    pixels: number[],
  }
}
