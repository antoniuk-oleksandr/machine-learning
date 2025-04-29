<script lang="ts">
  import { Card } from 'flowbite-svelte'
  import Chart from 'chart.js/auto'
  import type { LearningValue } from '../../../../types/LearningValue'
  import { onDestroy, onMount } from 'svelte'
  import { createTaskOneChart } from '../../helpers'
  import { handleTaskOneChartRerender } from '../../handlers'
  import type { ChartLineData } from '../../../../types/ChartLineData'
  import TaskOneLogBlock from '../TaskOneLogBlock/TaskOneLogBlock.svelte'

  type TaskOneLeftSideProps = {
    values: LearningValue[]
    chartLineData: ChartLineData
  }

  const { values, chartLineData }: TaskOneLeftSideProps = $props()

  let canvas = $state<HTMLCanvasElement | undefined>()
  let chart = $state<Chart | undefined>()

  onMount(() => {
    if (!canvas) return
    chart = createTaskOneChart(values, canvas, chartLineData)
  })

  $effect(() => handleTaskOneChartRerender(chart, values, chartLineData))

  onDestroy(() => chart?.destroy())
</script>

<!-- svelte-ignore element_invalid_self_closing_tag -->
<Card class="w-full flex flex-caol gap-6 max-w-full p-4">
  <!-- svelte-ignore a11y_no_interactive_element_to_noninteractive_role -->
  <canvas
    bind:this={canvas}
    class="!aspect-square max-h-[600px]"
    aria-label="10x10 Scatter Plot"
    role="img"
  />
  <TaskOneLogBlock />
</Card>
