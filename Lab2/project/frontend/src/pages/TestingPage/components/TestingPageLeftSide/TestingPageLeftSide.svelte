<script lang="ts">
  import { Card, Button } from 'flowbite-svelte'
  import { handleResizeCanvas } from './handlers'
  import { clearCanvas, draw, startDrawing, stopDrawing, drawGrid, getPixelArray } from './helpers'
  import { getContext, onDestroy } from 'svelte'
  import type { Writable } from 'svelte/store'
  import type { TestingFormData } from '../../../../types/TestingFormData'
  import { settingsModalStore } from '../../../../common-stores/settings-modal-store'

  let canvas = $state<HTMLCanvasElement | undefined>()
  let isDrawing = $state(false)
  const setIsDrawing = (value: boolean) => (isDrawing = value)
  let context = $state<CanvasRenderingContext2D | null | undefined>(null)
  let gridSize = $state($settingsModalStore.gridSize)
  let pointSize = $state($settingsModalStore.pointSize)

  let formDataStore = getContext<Writable<TestingFormData>>('formDataStore')

  const updatePixels = () => {
    formDataStore.update((prev) => ({
      ...prev,
      pixels: getPixelArray(context, canvas, gridSize),
    }))
  }

  const unsubscribe = formDataStore.subscribe((value) => {
    if (typeof value.gridSize === 'number' && value.gridSize >= 8) {
      gridSize = value.gridSize
    }
    if (typeof value.pointSize === 'number' && value.pointSize >= 1) {
      pointSize = value.pointSize
    }
  })

  $effect(() => {
    if (canvas && gridSize) {
      context = canvas.getContext('2d', { willReadFrequently: true })
      handleResizeCanvas(canvas, gridSize)
      drawGrid(context, canvas, gridSize)
    }
  })

  onDestroy(() => unsubscribe())
</script>

<!-- svelte-ignore element_invalid_self_closing_tag -->
<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<Card class="max-w-full h-full w-full">
  <!-- svelte-ignore a11y_mouse_events_have_key_events -->
  <canvas
    bind:this={canvas}
    class="w-full aspect-square bg-white touch-none"
    onmousedown={(e) =>
      startDrawing(e, setIsDrawing, isDrawing, context, canvas, gridSize, pointSize)}
    onmousemove={(e) => draw(e, isDrawing, context, canvas, gridSize, pointSize)}
    onmouseup={() => stopDrawing(setIsDrawing, context, updatePixels)}
    onmouseout={() => stopDrawing(setIsDrawing, context, updatePixels)}
    ontouchstart={(e) =>
      startDrawing(e, setIsDrawing, isDrawing, context, canvas, gridSize, pointSize)}
    ontouchmove={(e) => draw(e, isDrawing, context, canvas, gridSize, pointSize)}
    ontouchend={() => stopDrawing(setIsDrawing, context, updatePixels)}
  />

  <Button
    color="light"
    type="button"
    size="lg"
    class="w-full mt-4"
    onclick={() => {
      clearCanvas(context, canvas)
      if (context && canvas) drawGrid(context, canvas, gridSize)
    }}
  >
    Clear Drawing
  </Button>
</Card>
