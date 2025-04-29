<script lang="ts">
  import { Modal } from 'flowbite-svelte'
  import { taskOneSettingsStore } from '../../stores/task-one-settings-store'
  import TaskOneSettingsModalElementList from './components/TaskOneSettingsModalElementList/TaskOneSettingsModalElementList.svelte'
  import { onDestroy } from 'svelte'

  let open = $state(false)

  const unsubscribe = taskOneSettingsStore.subscribe((settings) => {
    open = settings.open
  })

  $effect(() => {
    if (open !== $taskOneSettingsStore.open) {
      taskOneSettingsStore.update((prev) => ({ ...prev, open }))
    }
  })

  onDestroy(() => unsubscribe())
</script>

<Modal title="Training Settings" bodyClass="!p-6 flex flex-col gap-6" bind:open outsideclose>
  <TaskOneSettingsModalElementList />
</Modal>
