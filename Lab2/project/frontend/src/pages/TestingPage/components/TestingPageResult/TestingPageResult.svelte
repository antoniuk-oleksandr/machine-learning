<script lang="ts">
  import { testingResultStore } from '../../stores/testing-result-store'
  import { onDestroy } from 'svelte'
  import type { TestingResult } from '../../../../types/TestingResult'
  import TestingPageResultTable from './components/TestingPageResultTable/TestingPageResultTable.svelte'
  import { Modal } from 'flowbite-svelte'
    import TestingPageResultTopText from './components/TestingPageResultTopText/TestingPageResultTopText.svelte'

  let result = $state<TestingResult & { open: boolean }>($testingResultStore)
  const unsubscribe = testingResultStore.subscribe((state) => {
    result = state
  })

  let predictedIndex = $derived<number>(result.softmax.indexOf(Math.max(...result.softmax)))

  onDestroy(() => unsubscribe())
</script>

<Modal
  size="xl"
  title="Model Prediction Results"
  classBody="p-6 flex flex-col gap-6 !text-base"
  bind:open={result.open}
  outsideclose
>
  <TestingPageResultTopText {predictedIndex} softmax={result.softmax} />
  <TestingPageResultTable {predictedIndex} softmax={result.softmax} />
  <p>Highest probability value is highlighted</p>
</Modal>
