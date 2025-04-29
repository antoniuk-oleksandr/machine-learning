export type TaskOneLog = {
  epoch: number,
  weights: number[],
  result: {
    success: boolean,
    message: string,
  }[]
}
