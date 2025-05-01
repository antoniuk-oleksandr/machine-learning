<script lang="ts">
  import { Heading, Button } from 'flowbite-svelte'
  import { getContext, onDestroy } from 'svelte'
  import type { Writable } from 'svelte/store'
  import type { MyInputProps } from '../../../../types/MyInputProps'
  import MyInput from '../../../../common-components/MyInput/MyInput.svelte'
  import { getTrainingFormInputs } from '../../helpers'
  import TrainingPageDatasetUpload from '../TrainingPageDatasetUpload/TrainingPageDatasetUpload.svelte'

  let inputs = $state<MyInputProps[]>([])

  let formIsSubmittingStore = getContext<Writable<boolean>>('formIsSubmittingStore')
  let formErrorsStore = getContext<Writable<Record<string, string[]>>>('formErrorsStore')
  const unsubscribe = formErrorsStore.subscribe((value) => {
    inputs = getTrainingFormInputs(value)
  })

  onDestroy(() => unsubscribe())
</script>

<Heading tag="h5">Machine Learning Parameters</Heading>
{#each inputs as item}
  <MyInput type="number" id={item.name} {...item} />
{/each}
<TrainingPageDatasetUpload error={$formErrorsStore.learningValuesFiles && $formErrorsStore.learningValuesFiles[0]}/>
<Button disabled={$formIsSubmittingStore} class="w-full mt-auto" size="lg" type="submit">Train Model</Button>
