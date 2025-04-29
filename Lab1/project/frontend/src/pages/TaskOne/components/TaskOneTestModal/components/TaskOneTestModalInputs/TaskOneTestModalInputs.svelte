<script lang="ts">
  import { getContext, onDestroy } from 'svelte'
  import MyInput from '../../../../../../common-components/MyInput/MyInput.svelte'
  import { findTaskOneModalLearningError, findTaskOneModalWeightsError, getTaskOneTestModalInputs } from '../../helpers'
  import TaskOneTestModalInputsLayout from './TaskOneTestModalInputsLayout.svelte'
  import type { Writable } from 'svelte/store'
  import type { MyInputProps } from '../../../../../../types/MyInputProps'
  import ErrorParagraph from '../../../../../../common-components/ErrorParagraph/ErrorParagraph.svelte'

  const errorsStore = getContext<Writable<any>>('formErrorsStore')

  let inputs = $state<MyInputProps[]>(getTaskOneTestModalInputs($errorsStore))
  const unsubscribe = errorsStore.subscribe((value) => {
    inputs = getTaskOneTestModalInputs(value)
  })

  onDestroy(() => unsubscribe())
</script>

<TaskOneTestModalInputsLayout>
  <MyInput {...inputs[0]} id={inputs[0].name} type="number" />
  {#each inputs.slice(1) as item, index}
    <MyInput showErrorMessage={false} {...item} id={item.name} type="number" />
    {#if index % 3 === 2}
      <div class="col-span-3 -mt-5">
        {#if index === 2}
          <ErrorParagraph error={findTaskOneModalWeightsError($errorsStore.weights)} />
        {:else}
          <ErrorParagraph error={findTaskOneModalLearningError($errorsStore.learningValue)} />
        {/if}
      </div>
    {/if}
  {/each}
</TaskOneTestModalInputsLayout>
