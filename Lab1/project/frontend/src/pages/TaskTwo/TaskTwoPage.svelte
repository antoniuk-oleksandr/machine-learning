<script lang="ts">
  import TaskTwoLeftSide from './components/TaskTwoLeftSide/TaskTwoLeftSide.svelte'
  import TaskTwoRightSide from './components/TaskTwoRightSide/TaskTwoRightSide.svelte'
  import TaskTwoLayout from './TaskTwoLayout.svelte'
  import TaskTwoForm from './components/TaskTwoForm/TaskTwoForm.svelte'
  import TaskTwoAddPointModal from './components/TaskTwoAddPointModal/TaskTwoAddPointModal.svelte'
  import { taskTwoPointsStore } from './stores/task-two-points-store'
  import { taskTwoChartStore } from './stores/task-two-chart-store'
</script>

<TaskTwoForm>
  <TaskTwoLayout>
    <TaskTwoLeftSide points={$taskTwoPointsStore} lineData={$taskTwoChartStore} />
    <TaskTwoRightSide />
  </TaskTwoLayout>
</TaskTwoForm>
<TaskTwoAddPointModal />
