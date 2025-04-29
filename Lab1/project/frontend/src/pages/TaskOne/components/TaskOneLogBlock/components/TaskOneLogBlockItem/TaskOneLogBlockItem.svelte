<script lang="ts">
  import type { TaskOneLog } from '../../../../../../types/TaskOneLog'

  type TaskOneLogBlockItemProps = {
    log: TaskOneLog
  }

  const { log }: TaskOneLogBlockItemProps = $props()
</script>

<div class="">
  <p>Epoch {log.epoch}</p>
  <p>Weights: [{log.weights.join(', ')}]</p>
  {#each log.result as item}
    <p class={item.success ? 'text-green-500' : 'text-red-500'}>{item.message}</p>
  {/each}
</div>
