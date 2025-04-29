<script lang="ts">
  import { Modal } from 'flowbite-svelte'
  import { taskOneTestModalStore } from '../../stores/task-one-test-modal-store'
  import TaskOneTestModalForm from './components/TaskOneTestModalForm/TaskOneTestModalForm.svelte'
  import TaskOneTestModalInputs from './components/TaskOneTestModalInputs/TaskOneTestModalInputs.svelte'
  import TaskOneTestModalButtons from './components/TaskOneTestModalButtons/TaskOneTestModalButtons.svelte'

  let open = $state(false)
  taskOneTestModalStore.subscribe((state) => {
    open = state.open
  })

  $effect(() => {
    if (open !== $taskOneTestModalStore.open) {
      taskOneTestModalStore.update((prev) => ({ ...prev, open }))
    }
  })
</script>

<Modal title="Modal Testing" bodyClass="!p-6" bind:open outsideclose>
  <TaskOneTestModalForm>
    <TaskOneTestModalInputs />
    <TaskOneTestModalButtons />
  </TaskOneTestModalForm>
</Modal>
