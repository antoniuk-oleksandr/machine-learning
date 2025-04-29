<script lang="ts">
  import { Button } from 'flowbite-svelte'
  import TaskOneTestModalButtonsLayout from './TaskOneTestModalButtonsLayout.svelte'
  import { taskOneTestModalStore } from '../../../../stores/task-one-test-modal-store'
</script>

<TaskOneTestModalButtonsLayout>
  <Button type="submit" class="w-40" size="lg">Submit</Button>
  <Button
    onclick={() => taskOneTestModalStore.update((prev) => ({ ...prev, open: false }))}
    color="light"
    type="button"
    class="w-40"
    size="lg"
  >
    Close
  </Button>
</TaskOneTestModalButtonsLayout>
