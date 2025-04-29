<script lang="ts">
    import { CloseOutline } from 'flowbite-svelte-icons'
  import LearningValuesTableDeleteButtonLayout from '../../../../../TaskOne/components/LearningValuesTable/components/LearningValuesTableDeleteButton/LearningValuesTableDeleteButtonLayout.svelte'
    import { taskTwoPointsStore } from '../../../../stores/task-two-points-store'

  type LearningValuesTableDeleteButtonProps = {
    index: number
  }

  const { index }: LearningValuesTableDeleteButtonProps = $props()

  const handleLearningTableDeleteValue = () => {
    taskTwoPointsStore.update((prev) => {
      const newLearningValues = [...prev]
      newLearningValues.splice(index, 1)
      return newLearningValues
    })
  }
</script>

<LearningValuesTableDeleteButtonLayout>
  <CloseOutline onclick={handleLearningTableDeleteValue} class="size-6" />
</LearningValuesTableDeleteButtonLayout>
