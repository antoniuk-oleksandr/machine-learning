import { Chart } from "chart.js";
import { z } from "zod";
import type { Point } from "../../types/Point";
import type { ChartLineData } from "../../types/ChartLineData";

export const taskTwoFormSchema = z.object({
  points: z.array(z.object({
    x: z.number(),
    y: z.number(),
  })).min(2, {message: "At least two points are required"}),
})

export const createPointsAndLineChart = (
  points: Point[],
  lineData: ChartLineData,
  canvas: HTMLCanvasElement | undefined,
) => {
  if (!canvas) return;

  // Prepare the line data if both k and b are defined
  const lineDataset = (lineData.k !== undefined && lineData.b !== undefined)
    ? [
        {
          x: 0,
          y: lineData.k * 0 + lineData.b,
        },
        {
          x: 3,
          y: lineData.k * 3 + lineData.b,
        },
      ]
    : [];

  const datasets: any[] = [
    {
      label: 'Points',
      data: points,
      backgroundColor: '#3b82f6',
      borderColor: '#2563eb',
      borderWidth: 2,
      pointRadius: 5,
      showLine: false,
    },
  ];

  if (lineDataset.length) {
    datasets.push({
      label: 'Line',
      data: lineDataset,
      backgroundColor: 'transparent',
      borderColor: '#000000',
      borderWidth: 2,
      pointRadius: 0,
      fill: false,
      showLine: true,
      type: 'line',
    });
  }

  return new Chart(canvas, {
    type: 'scatter',
    data: {
      datasets,
    },
    options: {
      animation: false,
      aspectRatio: 1,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'linear',
          // min: 0,
          // max: 3,
          grid: { color: '#e5e7eb', lineWidth: 1 },
          ticks: { stepSize: 1 },
        },
        y: {
          type: 'linear',
          // min: 0,
          // max: 3,
          grid: { color: '#e5e7eb', lineWidth: 1 },
          ticks: { stepSize: 1 },
        },
      },
      plugins: {
        legend: { display: true, position: 'top' },
        tooltip: {
          callbacks: {
            title: (items: any) => `Point (${items[0].raw.x}, ${items[0].raw.y})`,
            label: (ctx: any) => ctx.dataset.label,
          },
        },
      },
    },
  });
};
