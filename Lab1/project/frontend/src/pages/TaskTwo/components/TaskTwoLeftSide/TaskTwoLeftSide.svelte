<script lang="ts">
  import { Card } from 'flowbite-svelte'
  import { taskTwoChartStore } from '../../stores/task-two-chart-store'
  import { onDestroy, onMount } from 'svelte'
  import type { ChartLineData } from '../../../../types/ChartLineData'
  import { Chart } from 'chart.js'
  import type { Point } from '../../../../types/Point'
  import { createPointsAndLineChart } from '../../helpers'
  import { handlePointsAndLineChartRerender } from '../../handlers'

  type TaskTwoLeftSideProps = {
    points: Point[]
    lineData: ChartLineData
  }

  const { points, lineData }: TaskTwoLeftSideProps = $props()

  let canvas = $state<HTMLCanvasElement | undefined>()
  let chart = $state<Chart | undefined>()

  onMount(() => {
    if (!canvas) return
    chart = createPointsAndLineChart(points, lineData, canvas)
  })

  $effect(() => handlePointsAndLineChartRerender(chart, points, lineData))

  onDestroy(() => chart?.destroy())
</script>

<Card class="max-w-full h-full grow flex flex-1">
  <!-- svelte-ignore element_invalid_self_closing_tag -->
  <!-- svelte-ignore a11y_no_interactive_element_to_noninteractive_role -->
  <canvas
    bind:this={canvas}
    class="!aspect-square max-h-[600px]"
    aria-label="10x10 Scatter Plot"
    role="img"
  />
</Card>
