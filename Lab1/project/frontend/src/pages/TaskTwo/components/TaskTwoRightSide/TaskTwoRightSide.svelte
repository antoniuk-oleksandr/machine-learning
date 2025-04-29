<script lang="ts">
  import { Card } from 'flowbite-svelte'
  import TaskTwoButtons from '../TaskTwoButtons/TaskTwoButtons.svelte'
  import TaskTwoPointsBlock from '../TaskTwoPointsBlock/TaskTwoPointsBlock.svelte'
</script>

<Card class="max-w-full h-full grow flex justify-between flex-col gap-6 flex-1">
  <TaskTwoPointsBlock />
  <TaskTwoButtons />
</Card>
