<script lang="ts">
  import { Card } from 'flowbite-svelte'
  import { taskOneLearningValuesStore } from '../../stores/task-one-learning-values-store'
  import LearningValuesTable from '../LearningValuesTable/LearningValuesTable.svelte'
  import TaskOneTrainFormButtons from '../TaskOneTrainFormButtons/TaskOneTrainFormButtons.svelte'
  import TaskOneTrainFormHeader from '../TaskOneTrainFormHeader/TaskOneTrainFormHeader.svelte'

  type TaskOneLearningValuesBlockProps = {
    modalOpen: boolean
  }

  let { modalOpen = $bindable() }: TaskOneLearningValuesBlockProps = $props()
</script>

<Card class="w-full flex-1 h-full max-w-full flex flex-col gap-3">
  <TaskOneTrainFormHeader />
  <LearningValuesTable learningValues={$taskOneLearningValuesStore} />
  <TaskOneTrainFormButtons bind:modalOpen />
</Card>
