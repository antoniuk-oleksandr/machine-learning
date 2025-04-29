<script lang="ts">
  import { Button } from 'flowbite-svelte'
  import { ChartOutline, PlusOutline } from 'flowbite-svelte-icons'
  import { taskTwoPointsModalStore } from '../../stores/task-two-points-modal-store'
</script>

<div class="flex flex-col gap-6">
  <Button
    onclick={() => taskTwoPointsModalStore.update((prev) => ({ ...prev, open: true }))}
    class="flex gap-1 w-full"
    size="lg"
    type="button"
  >
    <PlusOutline />
    <span>Add A Point</span>
  </Button>
  <Button size="lg" type="submit" class="flex gap-1 w-full">
    <ChartOutline />
    <span>Predict</span>
  </Button>
</div>
