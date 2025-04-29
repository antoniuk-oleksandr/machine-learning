<script lang="ts">
  import { getContext } from 'svelte'
  import ErrorParagraph from '../../../../common-components/ErrorParagraph/ErrorParagraph.svelte'
  import { taskTwoPointsStore } from '../../stores/task-two-points-store'
  import TaskTwoPointsTable from '../TaskTwoPointsTable/TaskTwoPointsTable.svelte'
  import TaskTwoPointsBlockHeader from './components/TaskTwoPointsBlockHeader/TaskTwoPointsBlockHeader.svelte'
  import TaskTwoPointsBlockLayout from './TaskTwoPointsBlockLayout.svelte'
  import type { Writable } from 'svelte/store'

  let formErrorsStore = getContext<Writable<Record<string, string[]>>>('formErrorsStore')
</script>

<TaskTwoPointsBlockLayout>
  <TaskTwoPointsBlockHeader />
  {#if $taskTwoPointsStore.length === 0}
    <p class="text-center text-gray-500 dark:text-gray-400">
      No points added yet. Please add some points to proceed.
    </p>
  {:else}
    <TaskTwoPointsTable />
  {/if}
  <ErrorParagraph
    styles="absolute top-full"
    error={$formErrorsStore.points && $formErrorsStore.points[0]}
  />
</TaskTwoPointsBlockLayout>
