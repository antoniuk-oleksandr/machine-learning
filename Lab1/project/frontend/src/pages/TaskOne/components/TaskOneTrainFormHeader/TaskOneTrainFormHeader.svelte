<script lang="ts">
  import { Heading } from 'flowbite-svelte'
  import { taskOneLearningValuesStore } from '../../stores/task-one-learning-values-store'
  import TaskOneTrainFormHeaderLayout from './TaskOneTrainFormHeaderLayout.svelte'
</script>

<TaskOneTrainFormHeaderLayout>
  <Heading tag="h5">Learning Values</Heading>
  {@const length = $taskOneLearningValuesStore.length}
  {#if length !== 0}
    <span class="text-sm text-gray-500 whitespace-nowrap"
      >{length} item{length === 1 ? '' : 's'}</span
    >
  {/if}
</TaskOneTrainFormHeaderLayout>
