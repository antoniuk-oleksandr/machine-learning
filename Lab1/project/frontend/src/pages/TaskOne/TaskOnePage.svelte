<script lang="ts">
  import AddLearningValueModal from './components/AddLearningValueModal/AddLearningValueModal.svelte'
  import TaskOnePageLayout from './TaskOnePageLayout.svelte'
  import TaskOneLeftSide from './components/TaskOneLeftSide/TaskOneLeftSide.svelte'
  import TaskOneRightSide from './components/TaskOneRightSide/TaskOneRightSide.svelte'
  import { taskOneLearningValuesStore } from './stores/task-one-learning-values-store'
  import TaskOneForm from './components/TaskOneForm/TaskOneForm.svelte'
  import { taskOneChartStore } from './stores/task-one-chart-store'
  import { onDestroy, onMount } from 'svelte'
  import { connectToWebSocket, disconnectFromWebSocket } from '../../api/websocket'
  import TaskOneSettingsModal from './components/TaskOneSettingsModal/TaskOneSettingsModal.svelte'
  import TaskOneTestModal from './components/TaskOneTestModal/TaskOneTestModal.svelte'
  import TaskOneTestResultModal from './components/TaskOneTestResultModal/TaskOneTestResultModal.svelte'

  let modalOpen = $state(false)

  onMount(() => connectToWebSocket('/task/1'))
  onDestroy(() => disconnectFromWebSocket())
</script>

<TaskOnePageLayout>
  <TaskOneForm>
    <TaskOneLeftSide chartLineData={$taskOneChartStore} values={$taskOneLearningValuesStore} />
    <TaskOneRightSide bind:modalOpen />
  </TaskOneForm>
</TaskOnePageLayout>
<AddLearningValueModal bind:open={modalOpen} />
<TaskOneSettingsModal />
<TaskOneTestModal />
<TaskOneTestResultModal />
