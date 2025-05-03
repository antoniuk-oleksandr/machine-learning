<script lang="ts">
  import { Button, Card, Heading } from 'flowbite-svelte'
  import TestingPageWeightsUpload from '../TestingPageWeightsUpload/TestingPageWeightsUpload.svelte'
  import MyInput from '../../../../common-components/MyInput/MyInput.svelte'
  import { getContext, onDestroy } from 'svelte'
  import type { Writable } from 'svelte/store'
  import type { MyInputProps } from '../../../../types/MyInputProps'
  import { getTestingFormInputs } from '../../helpers'

  let inputs = $state<MyInputProps[] | undefined>(undefined)
  let formErrorsStore = getContext<Writable<Record<string, string[]>>>('formErrorsStore')
  const unsubscribe = formErrorsStore.subscribe((value) => {
    inputs = getTestingFormInputs(value)
  })

  onDestroy(() => unsubscribe())
</script>

<Card class="max-w-full w-full h-full flex flex-col gap-6">
  <Heading tag="h5">Testing Parameters</Heading>
  {#if inputs}
    {#each inputs as item}
      <MyInput {...item} id={item.name} type="number" />
    {/each}
  {/if}
  <TestingPageWeightsUpload
    error={$formErrorsStore.weightsFile && $formErrorsStore.weightsFile[0]}
  />
  <Button type="submit" size="lg" class="w-full mt-auto">Test Model</Button>
</Card>
