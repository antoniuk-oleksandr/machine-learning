<script lang="ts">
  import TableCell from '../../../../../../common-components/TableCell/TableCell.svelte'
  import type { LearningValue } from '../../../../../../types/LearningValue'
  import LearningValuesTableBodyLayout from './LearningValuesTableBodyLayout.svelte'
  import LearningValuesTableDeleteButton from '../LearningValuesTableDeleteButton/LearningValuesTableDeleteButton.svelte'

  type LearningValuesTableBodyProps = {
    learningValues: LearningValue[]
  }

  const { learningValues }: LearningValuesTableBodyProps = $props()
</script>

<LearningValuesTableBodyLayout>
  {#if learningValues.length === 0}
    <p class="text-center py-4">No learning values added yet</p>
  {:else}
    {#each learningValues as item, index}
      <div class="group grid grid-cols-3 relative even:bg-gray-100">
        <TableCell>{item.x1}</TableCell>
        <TableCell>{item.x2}</TableCell>
        <TableCell
          styles="font-semibold {item.classValue === 1 ? 'text-blue-500' : 'text-red-500'}"
        >
          {item.classValue}
        </TableCell>
        <LearningValuesTableDeleteButton {index} />
      </div>
    {/each}
  {/if}
</LearningValuesTableBodyLayout>
