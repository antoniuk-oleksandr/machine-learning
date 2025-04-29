<script lang="ts">
  import { Modal } from 'flowbite-svelte'
  import { taskTwoPointsModalStore } from '../../stores/task-two-points-modal-store'
  import { onDestroy } from 'svelte'
  import TaskTwoAddPointModalButtons from './components/TaskTwoAddPointModalButtons/TaskTwoAddPointModalButtons.svelte'
  import TaskTwoAddPointModalForm from './components/TaskTwoAddPointModalForm/TaskTwoAddPointModalForm.svelte'
  import TaskTwoAddPointModalFormInputs from './components/TaskTwoAddPointModalFormInputs/TaskTwoAddPointModalFormInputs.svelte'

  let open = $state(false)

  const unsubscribe = taskTwoPointsModalStore.subscribe((value) => {
    open = value.open
  })

  $effect(() => {
    if (open !== $taskTwoPointsModalStore.open) {
      taskTwoPointsModalStore.update((prev) => ({ ...prev, open }))
    }
  })

  onDestroy(() => unsubscribe())
</script>

<Modal bodyClass="p-6" title="Add A Point" bind:open outsideclose>
  <TaskTwoAddPointModalForm>
    <TaskTwoAddPointModalFormInputs />
    <TaskTwoAddPointModalButtons />
  </TaskTwoAddPointModalForm>
</Modal>
