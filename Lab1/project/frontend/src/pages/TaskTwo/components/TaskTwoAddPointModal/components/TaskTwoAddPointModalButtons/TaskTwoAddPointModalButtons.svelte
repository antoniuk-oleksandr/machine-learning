<script lang="ts">
  import { Button } from 'flowbite-svelte'
  import TaskOneTestModalButtonsLayout from '../../../../../TaskOne/components/TaskOneTestModal/components/TaskOneTestModalButtons/TaskOneTestModalButtonsLayout.svelte'
  import { taskTwoPointsModalStore } from '../../../../stores/task-two-points-modal-store'
</script>

<TaskOneTestModalButtonsLayout>
  <Button type="submit" color="primary" class="w-40" size="lg">Submit</Button>
  <Button
    onclick={() => taskTwoPointsModalStore.update((prev) => ({ ...prev, open: false }))}
    type="button"
    color="light"
    class="w-40"
    size="lg">Cancel</Button
  >
</TaskOneTestModalButtonsLayout>
