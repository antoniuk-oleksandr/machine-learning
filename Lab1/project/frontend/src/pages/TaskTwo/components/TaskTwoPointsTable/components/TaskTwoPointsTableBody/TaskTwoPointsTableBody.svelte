<script lang="ts">
  import TableCell from '../../../../../../common-components/TableCell/TableCell.svelte'
  import { taskTwoPointsStore } from '../../../../stores/task-two-points-store'
  import TaskTwoPointsTableDeleteButton from '../TaskTwoPointsTableDeleteButton/TaskTwoPointsTableDeleteButton.svelte'
</script>

<div class="flex flex-col max-h-points-table overflow-y-auto">
  {#each $taskTwoPointsStore as item, index}
    <div class="group flex even:bg-gray-100 relative">
      <TableCell styles="w-full">{item.x}</TableCell>
      <TableCell styles="w-full">{item.y}</TableCell>
      <TaskTwoPointsTableDeleteButton {index} />
    </div>
  {/each}
</div>
