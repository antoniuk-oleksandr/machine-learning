export const drawGrid = (
  context: CanvasRenderingContext2D | null | undefined,
  canvas: HTMLCanvasElement | undefined,
  gridSize: number
) => {
  if (!context || !canvas) return

  // Clear canvas
  context.clearRect(0, 0, canvas.width, canvas.height)

  // Draw grid lines
  const cellSize = canvas.width / gridSize
  context.strokeStyle = '#e5e7eb'
  context.lineWidth = 1

  for (let i = 0; i <= gridSize; i++) {
    // Vertical lines
    context.beginPath()
    context.moveTo(i * cellSize, 0)
    context.lineTo(i * cellSize, canvas.height)
    context.stroke()

    // Horizontal lines
    context.beginPath()
    context.moveTo(0, i * cellSize)
    context.lineTo(canvas.width, i * cellSize)
    context.stroke()
  }
}

export const startDrawing = (
  e: MouseEvent | TouchEvent,
  setIsDrawing: (value: boolean) => void,
  isDrawing: boolean,
  context: CanvasRenderingContext2D | undefined | null,
  canvas: HTMLCanvasElement | undefined,
  gridSize: number,
  pointSize: number,
) => {
  setIsDrawing(true)
  draw(e, isDrawing, context, canvas, gridSize, pointSize)
}

export const stopDrawing = (
  setIsDrawing: (value: boolean) => void,
  context: CanvasRenderingContext2D | null | undefined,
  updatePixels: () => void,
) => {
  setIsDrawing(false)
  if (context) context.beginPath()
  updatePixels()
}

const getGridPosition = (
  e: MouseEvent | TouchEvent,
  canvas: HTMLCanvasElement | undefined,
  gridSize: number
) => {
  if (!canvas) return { gridX: 0, gridY: 0 }

  const cellSize = canvas.width / gridSize

  // Get coordinates
  let clientX, clientY
  if ('touches' in e) {
    const rect = canvas.getBoundingClientRect()
    clientX = e.touches[0].clientX - rect.left
    clientY = e.touches[0].clientY - rect.top
  } else {
    clientX = e.offsetX
    clientY = e.offsetY
  }

  const gridX = Math.floor(clientX / cellSize)
  const gridY = Math.floor(clientY / cellSize)

  return { gridX, gridY }
}

export const draw = (
  e: MouseEvent | TouchEvent,
  isDrawing: boolean,
  context: CanvasRenderingContext2D | undefined | null,
  canvas: HTMLCanvasElement | undefined,
  gridSize: number,
  pointSize: number
) => {
  if (!isDrawing || !context || !canvas) return

  const { gridX, gridY } = getGridPosition(e, canvas, gridSize)
  drawSoftPixel(gridX, gridY, context, canvas, gridSize, pointSize)
}

const drawSoftPixel = (
  x: number,
  y: number,
  context: CanvasRenderingContext2D | null | undefined,
  canvas: HTMLCanvasElement | undefined,
  gridSize: number,
  pointSize: number
) => {
  if (!context || !canvas || x < 0 || x >= gridSize || y < 0 || y >= gridSize) return;

  const cellSize = canvas.width / gridSize;
  const halfSize = Math.floor(pointSize / 2);

  // Calculate opacity based on distance from center
  const getOpacity = (dx: number, dy: number) => {
    const distance = Math.sqrt(dx * dx + dy * dy) / halfSize;
    return Math.max(0, 0.8 * (1 - distance * 0.5)); // Fades from center
  };

  // Draw all cells in the pointSize x pointSize area
  for (let dy = -halfSize; dy <= halfSize; dy++) {
    for (let dx = -halfSize; dx <= halfSize; dx++) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize) {
        const opacity = pointSize === 1 ? 0.8 : getOpacity(dx, dy);
        context.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        context.fillRect(nx * cellSize, ny * cellSize, cellSize, cellSize);
      }
    }
  }
}

export const clearCanvas = (
  context: CanvasRenderingContext2D | undefined | null,
  canvas: HTMLCanvasElement | undefined,
) => {
  if (context && canvas) {
    context.clearRect(0, 0, canvas.width, canvas.height)
  }
}

export const getPixelArray = (
  context: CanvasRenderingContext2D | undefined | null,
  canvas: HTMLCanvasElement | undefined,
  gridSize: number,
): number[] => {
  if (!canvas || !context) return [];

  // Get the original image data
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Create downscaled 8x8 grid
  const pixelArray: number[] = [];
  const cellWidth = canvas.width / gridSize;
  const cellHeight = canvas.height / gridSize;

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      // Calculate average darkness in this cell
      let sum = 0;
      let count = 0;

      for (let dy = 0; dy < cellHeight; dy++) {
        for (let dx = 0; dx < cellWidth; dx++) {
          const px = Math.floor(x * cellWidth + dx);
          const py = Math.floor(y * cellHeight + dy);
          const idx = (py * canvas.width + px) * 4;

          // Convert RGBA to grayscale (0-255)
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const gray = 0.299 * r + 0.587 * g + 0.114 * b;

          sum += gray;
          count++;
        }
      }

      // Normalize to 0.0-1.0 (inverted since canvas is white background)
      const avg = sum / count;
      const normalized = 1 - (avg / 255);
      pixelArray.push(normalized);
    }
  }

  return pixelArray;
}
