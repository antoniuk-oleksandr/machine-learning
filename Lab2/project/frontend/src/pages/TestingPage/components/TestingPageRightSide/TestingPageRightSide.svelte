<script lang="ts">
  import { Button, Card, Heading } from 'flowbite-svelte'
  import TestingPageWeightsUpload from '../TestingPageWeightsUpload/TestingPageWeightsUpload.svelte'
  import MyInput from '../../../../common-components/MyInput/MyInput.svelte'
  import { getContext } from 'svelte'
  import type { Writable } from 'svelte/store'

  let formErrorsStore = getContext<Writable<Record<string, string[]>>>('formErrorsStore')
</script>

<Card class="max-w-full w-full h-full flex flex-col gap-6">
  <Heading tag="h5">Testing Parameters</Heading>
  <MyInput
    type="number"
    subText="Number of grid divisions"
    placeholder="Enter grid size"
    label="Grid Size"
    error={$formErrorsStore.gridSize && $formErrorsStore.gridSize[0]}
    id="gridSize"
    name="gridSize"
  />
  <TestingPageWeightsUpload
    error={$formErrorsStore.weightsFile && $formErrorsStore.weightsFile[0]}
  />
  <Button type="submit" size="lg" class="w-full mt-auto">Test Model</Button>
</Card>
