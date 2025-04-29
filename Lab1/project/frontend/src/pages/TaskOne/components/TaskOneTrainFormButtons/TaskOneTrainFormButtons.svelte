<script lang="ts">
  import { Button } from 'flowbite-svelte'
  import { PlusOutline } from 'flowbite-svelte-icons'
  import TaskOneSubmitButton from '../TaskOneSubmitButton/TaskOneSubmitButton.svelte'
  import TaskOneTestButton from '../TaskOneTestButton/TaskOneTestButton.svelte'

  type TaskOneTrainFormButtonsProps = {
    modalOpen: boolean
  }

  let { modalOpen = $bindable() }: TaskOneTrainFormButtonsProps = $props()
</script>

<div class="flex flex-col gap-6">
  <Button
    type="button"
    color="primary"
    class="w-full flex gap-1"
    onclick={() => (modalOpen = true)}
    size="lg"
  >
    <PlusOutline />
    <span>Add New Value</span>
  </Button>
  <TaskOneSubmitButton />
  <TaskOneTestButton />
</div>
