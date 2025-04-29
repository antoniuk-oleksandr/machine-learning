<script lang="ts">
  import TaskOneTestResultModalIcon from '../TaskOneTestResultModalIcon/TaskOneTestResultModalIcon.svelte'
  import TaskOneTestResultModalBodyLayout from './TaskOneTestResultModalBodyLayout.svelte'

  type TaskOneTestResultModalBodyProps = {
    success: boolean
  }

  const { success }: TaskOneTestResultModalBodyProps = $props()
</script>

<TaskOneTestResultModalBodyLayout>
  <TaskOneTestResultModalIcon {success} />
  {#if success}
  <span class="text-green-500">Test passed successfully</span>
  {:else}
    <span class="text-red-500">Test failed</span>
  {/if}
</TaskOneTestResultModalBodyLayout>
