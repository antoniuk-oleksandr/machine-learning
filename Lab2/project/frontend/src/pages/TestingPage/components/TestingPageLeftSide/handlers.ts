export function handleResizeCanvas(canvas: HTMLCanvasElement | undefined, gridSize: number) {
  if (!canvas) return
  
  // Make canvas size a multiple of gridSize for clean pixels
  const size = Math.min(canvas.clientWidth, canvas.clientHeight)
  canvas.width = size
  canvas.height = size
}
