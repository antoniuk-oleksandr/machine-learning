<script lang="ts">
    import AddLearningValueModal from '../AddLearningValueModal/AddLearningValueModal.svelte'
  import TaskOneLearningValuesBlock from '../TaskOneLearningValuesBlock/TaskOneLearningValuesBlock.svelte'
  import TaskOneParametersBlock from '../TaskOneParametersBlock/TaskOneParametersBlock.svelte'
  import TaskOneRightSideLayout from './TaskOneRightSideLayout.svelte'

  type TaskOneRightSideProps = {
    modalOpen: boolean
  }

  let { modalOpen = $bindable() }: TaskOneRightSideProps = $props()
</script>

<TaskOneRightSideLayout>
  <TaskOneParametersBlock />
  <TaskOneLearningValuesBlock bind:modalOpen />
</TaskOneRightSideLayout>
