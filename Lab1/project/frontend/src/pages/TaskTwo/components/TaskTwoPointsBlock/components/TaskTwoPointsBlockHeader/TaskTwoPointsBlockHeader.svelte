<script lang="ts">
  import { Heading } from 'flowbite-svelte'
  import TaskTwoPointsBlockHeaderLayout from './TaskTwoPointsBlockHeaderLayout.svelte'
  import { taskTwoPointsStore } from '../../../../stores/task-two-points-store'
</script>

<TaskTwoPointsBlockHeaderLayout>
  <Heading tag="h6">Points</Heading>
  {@const length = $taskTwoPointsStore.length}
  {#if length > 0}
    <span>{length} item{length === 1 ? '' : 's'}</span>
  {/if}
</TaskTwoPointsBlockHeaderLayout>
