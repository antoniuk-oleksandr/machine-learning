import { Chart } from "chart.js";
import type { LearningValue } from "../../types/LearningValue";
import type { MyInputProps } from "../../types/MyInputProps";
import { z } from "zod";
import type { ChartLineData } from "../../types/ChartLineData";

export const taskOneFormSchema = z.object({
  bias: z.number({ message: "Bias value is required and should be a number" }),
  learningRateCoefficient: z.number({ message: "Learning rate coefficient value is required and should be a number" }),
  weights: z.array(z.number({ message: "Weights value is required and should be an array of numbers" })).length(3),
})

export const getTaskOnePageInputsData = (): MyInputProps[] => [
  {
    id: "bias",
    name: "bias",
    placeholder: "Enter bias value",
    label: "Bias value",
    type: "number",
  },
  {
    id: "learningRateCoefficient",
    name: "learningRateCoefficient",
    placeholder: "Enter the learning rate coefficient value",
    label: "Learning rate coefficient value",
    type: "number",
  }
]

export const createTaskOneChart = (
  values: LearningValue[],
  canvas: HTMLCanvasElement | undefined,
  chartLineData: ChartLineData,
) => {
  if (!canvas) return;

  const class1Data = values.filter(v => v.classValue === 1).map(v => ({ x: v.x1, y: v.x2 }));
  const classMinus1Data = values.filter(v => v.classValue === -1).map(v => ({ x: v.x1, y: v.x2 }));

  const { k, b } = chartLineData;
  const separatingLineData = (k !== undefined && b !== undefined)
    ? [
      { x: 0, y: k * 0 + b },
      { x: 10, y: k * 10 + b }
    ]
    : [];



  const datasets: any[] = [
    {
      label: 'Class 1',
      data: class1Data,
      backgroundColor: '#3b82f6',
      borderColor: '#2563eb',
      borderWidth: 2,
      pointRadius: 5,
      showLine: false,
    },
    {
      label: 'Class -1',
      data: classMinus1Data,
      backgroundColor: '#ef4444',
      borderColor: '#dc2626',
      borderWidth: 2,
      pointRadius: 5,
      showLine: false,
    },
  ];

  if (separatingLineData.length) {
    datasets.push({
      label: 'Separating Line',
      data: separatingLineData,
      backgroundColor: 'transparent',
      borderColor: '#000000', //line color
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
          // max: 10,
          grid: { color: '#e5e7eb', lineWidth: 1 },
          ticks: { stepSize: 1 },
        },
        y: {
          type: 'linear',
          // min: 0,
          // max: 15,
          grid: { color: '#e5e7eb', lineWidth: 1 },
          ticks: { stepSize: 1 },
        },
      },
      plugins: {
        legend: { display: true, position: 'top' },
        tooltip: {
          callbacks: {
            title: (items: any) => `Point (${items[0].raw.x}, ${items[0].raw.y})`,
            label: (ctx: any) => `Class ${ctx.dataset.label}`,
          },
        },
      },
    },
  });
};

