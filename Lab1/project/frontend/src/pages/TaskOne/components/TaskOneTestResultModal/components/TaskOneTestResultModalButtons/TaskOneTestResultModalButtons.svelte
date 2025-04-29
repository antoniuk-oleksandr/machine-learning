<script lang="ts">
  import { Button } from 'flowbite-svelte'
  import TaskOneTestModalButtonsLayout from '../../../TaskOneTestModal/components/TaskOneTestModalButtons/TaskOneTestModalButtonsLayout.svelte'
  import { taskOneTestResultStore } from '../../../../stores/task-one-test-result-store'

  const handleButtonClick = () => {
    taskOneTestResultStore.update((prev) => ({ ...prev, open: false }))
  }
</script>

<TaskOneTestModalButtonsLayout>
  <Button color="primary" class="w-40" onclick={handleButtonClick} size="lg" type="button">
    Ok
  </Button>
  <Button color="light" class="w-40" onclick={handleButtonClick} size="lg" type="button">
    Close
  </Button>
</TaskOneTestModalButtonsLayout>
