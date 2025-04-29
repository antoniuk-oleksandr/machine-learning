<script lang="ts">
  import { Button, Spinner } from 'flowbite-svelte'
  import { CheckCircleOutline } from 'flowbite-svelte-icons'
  import { getContext, onDestroy } from 'svelte'
  import type { Writable } from 'svelte/store'
  import { TrainingType } from '../../../../types/TrainingType'
  import { taskOneEpochResultStore } from '../../stores/task-one-epoch-result-store'
  import { taskOneSettingsStore } from '../../stores/task-one-settings-store'

  let formIsSubmittingStore = getContext<Writable<boolean>>('formIsSubmittingStore')

  let submitButtonText = $state('Train Model')
  $effect(() => {
    let state =
      $taskOneSettingsStore.trainingType === TrainingType.TrainStepByStep &&
      $taskOneEpochResultStore.length > 0 &&
      !$taskOneSettingsStore.trained

    if (state) submitButtonText = 'Continue Training'
    else submitButtonText = 'Train Model'
  })

  let disabled = $state(false)
  const unsubscribe = taskOneSettingsStore.subscribe((settings) => {
    if (settings.training) disabled = true
    else disabled = false
  })

  onDestroy(() => unsubscribe())
</script>

<Button
  disabled={$formIsSubmittingStore || disabled}
  type="submit"
  color="primary"
  class="w-full flex gap-1 justify-center"
  size="lg"
>
  {#if disabled}
    <Spinner size="6" color="green" />
  {:else}
    <CheckCircleOutline />
    {submitButtonText}
  {/if}
</Button>
