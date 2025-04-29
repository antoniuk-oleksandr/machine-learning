<script lang="ts">
  import { CheckCircleOutline, CloseCircleOutline } from 'flowbite-svelte-icons'
  import TaskOneTestResultModalIconLayout from './TaskOneTestResultModalIconLayout.svelte'

  type TaskOneTestResultModalIconProps = {
    success: boolean
  }

  const { success }: TaskOneTestResultModalIconProps = $props()
</script>

<TaskOneTestResultModalIconLayout {success}>
  {#if success}
    <CheckCircleOutline class="h-6 w-6 text-green-600" />
  {:else}
    <CloseCircleOutline class="h-6 w-6 text-red-600" />
  {/if}
</TaskOneTestResultModalIconLayout>
