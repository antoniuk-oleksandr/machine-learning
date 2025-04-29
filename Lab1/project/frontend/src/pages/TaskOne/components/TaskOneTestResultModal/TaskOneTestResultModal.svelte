<script lang="ts">
  import { Modal } from 'flowbite-svelte'
  import { taskOneTestResultStore } from '../../stores/task-one-test-result-store'
  import { onDestroy } from 'svelte'
  import TaskOneTestResultModalButtons from './components/TaskOneTestResultModalButtons/TaskOneTestResultModalButtons.svelte'
  import TaskOneTestResultModalBody from './components/TaskOneTestResultModalBody/TaskOneTestResultModalBody.svelte'

  let open = $state(false)
  let success = $state(false)

  const unsubscribe = taskOneTestResultStore.subscribe((value) => {
    open = value.open
    success = value.success
  })

  $effect(() => {
    if (open !== $taskOneTestResultStore.open) {
      taskOneTestResultStore.update((prev) => ({ ...prev, open }))
    }
  })

  onDestroy(() => unsubscribe())
</script>

<Modal bodyClass="flex flex-col gap-6 !p-6" title="Test result" bind:open outsideclose>
  <TaskOneTestResultModalBody {success} />
  <TaskOneTestResultModalButtons />
</Modal>
