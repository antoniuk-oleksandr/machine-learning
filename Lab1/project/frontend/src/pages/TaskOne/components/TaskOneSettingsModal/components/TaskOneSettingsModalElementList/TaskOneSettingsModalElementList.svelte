<script lang="ts">
  import type { TaskOneSettingsModalItem } from '../../../../../../types/TaskOneSettingsModalItem'
  import { taskOneSettingsStore } from '../../../../stores/task-one-settings-store'
  import { getTaskOneSettingsModalItems } from '../../helpers'
  import TaskOneSettingsModalElement from '../TaskOneSettingsModalElement/TaskOneSettingsModalElement.svelte'
  import TaskOneSettingsModalElementListLayout from './TaskOneSettingsModalElementListLayout.svelte'

  let items = $state<TaskOneSettingsModalItem[] | undefined>()
  taskOneSettingsStore.subscribe((value) => {
    items = getTaskOneSettingsModalItems(value)
  })
</script>

{#if items}
  <TaskOneSettingsModalElementListLayout>
    {#each items as item}
      <TaskOneSettingsModalElement {...item} />
    {/each}
  </TaskOneSettingsModalElementListLayout>
{/if}
