<script lang="ts">
  import { Card, Heading } from 'flowbite-svelte'
  import TrainingPageLogList from '../TrainingPageLogList/TrainingPageLogList.svelte'
</script>

<Card class="max-w-full h-full grow flex flex-col gap-6">
  <Heading tag="h5">Learning Logs</Heading>
  <TrainingPageLogList />
</Card>
