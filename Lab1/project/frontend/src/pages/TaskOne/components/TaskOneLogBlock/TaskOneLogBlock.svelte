<script lang="ts">
  import { taskOneEpochResultStore } from '../../stores/task-one-epoch-result-store'
  import type { TaskOneLog } from '../../../../types/TaskOneLog'
  import { formatTaskOneLogs } from './helpers'
  import TaskOneLogBlockItem from './components/TaskOneLogBlockItem/TaskOneLogBlockItem.svelte'
  import TaskOneLogBlockLayout from './TaskOneLogBlockLayout.svelte'

  let blockElement = $state<HTMLDivElement | undefined>()

  let logs = $state<TaskOneLog[]>([])
  taskOneEpochResultStore.subscribe((value) => {
    logs = formatTaskOneLogs(value)
    blockElement?.scrollTo({
      top: blockElement.scrollHeight,
    })
  })
</script>

<TaskOneLogBlockLayout bind:blockElement>
  {#each logs as log}
    <TaskOneLogBlockItem {log} />
  {/each}
</TaskOneLogBlockLayout>
