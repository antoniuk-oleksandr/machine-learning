import type { Chart } from "chart.js";
import { request } from "../../api/request";
import type { Point } from "../../types/Point";
import type { ChartLineData } from "../../types/ChartLineData";
import { taskTwoChartStore } from "./stores/task-two-chart-store";
import type { Bounds } from "../../types/Bounds";

export const handleTaskTwoFormSubmit = async (data: { points: Point[] }) => {
  const response = await request<any>('POST', '/task/2', data)
  if (response.status === 200) {
    taskTwoChartStore.update((prev) => ({
      ...prev,
      ...response.data
    }))
  }
}

export const getBounds = (chart: Chart): Bounds => {
  const xScale = chart.scales.x;
  const yScale = chart.scales.y;
  return {
    xmin: xScale.min,
    xmax: xScale.max,
    ymin: yScale.min,
    ymax: yScale.max
  };
};

export const calculateLineIntersections = (k: number, b: number, bounds: Bounds): Point[] => {
  const intersections: Point[] = [];

  // Check vertical boundaries
  const yAtXmin = k * bounds.xmin + b;
  if (yAtXmin >= bounds.ymin && yAtXmin <= bounds.ymax) {
    intersections.push({ x: bounds.xmin, y: yAtXmin });
  }

  const yAtXmax = k * bounds.xmax + b;
  if (yAtXmax >= bounds.ymin && yAtXmax <= bounds.ymax) {
    intersections.push({ x: bounds.xmax, y: yAtXmax });
  }

  // Check horizontal boundaries (skip if horizontal line)
  if (k !== 0) {
    const xAtYmin = (bounds.ymin - b) / k;
    if (xAtYmin >= bounds.xmin && xAtYmin <= bounds.xmax) {
      intersections.push({ x: xAtYmin, y: bounds.ymin });
    }

    const xAtYmax = (bounds.ymax - b) / k;
    if (xAtYmax >= bounds.xmin && xAtYmax <= bounds.xmax) {
      intersections.push({ x: xAtYmax, y: bounds.ymax });
    }
  }

  return intersections;
};

const createLineDataset = (lineData: Point[]) => ({
  label: 'Line',
  data: lineData,
  backgroundColor: 'transparent',
  borderColor: '#000000',
  borderWidth: 2,
  pointRadius: 0,
  fill: false,
  showLine: true,
  type: 'line' as const,
});

export const handlePointsAndLineChartRerender = (
  chart: Chart | undefined,
  points: Point[],
  chartLineData: ChartLineData
) => {
  if (!chart) return;

  // Update points first
  chart.data.datasets[0].data = points;
  
  // Force immediate update of points without animation
  chart.update('none');

  // Now get bounds with updated points
  const bounds = getBounds(chart);

  // Handle line
  const { k, b } = chartLineData;
  if (k !== undefined && b !== undefined) {
    const intersections = calculateLineIntersections(k, b, bounds);

    // Remove duplicates and get endpoints
    const uniquePoints = Array.from(new Set(intersections.map(p => JSON.stringify(p))))
      .map(p => JSON.parse(p))
      .sort((a, b) => a.x - b.x);

    const lineData = uniquePoints.length >= 2
      ? [uniquePoints[0], uniquePoints[uniquePoints.length - 1]]
      : [];

    // Update or add line dataset
    if (lineData.length) {
      if (chart.data.datasets.length >= 2) {
        chart.data.datasets[1].data = lineData;
      } else {
        chart.data.datasets.push(createLineDataset(lineData));
      }
    } else if (chart.data.datasets.length >= 2) {
      chart.data.datasets.splice(1, 1);
    }
  } else if (chart.data.datasets.length >= 2) {
    chart.data.datasets.splice(1, 1);
  }

  // Final update with both points and line
  chart.update();
};
