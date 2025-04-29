<script lang="ts">
  import type { Writable } from 'svelte/store'
  import MyInput from '../../../../common-components/MyInput/MyInput.svelte'
  import ErrorParagraph from '../../../../common-components/ErrorParagraph/ErrorParagraph.svelte'

  type TaskOneWeightListProps = {
    formErrorsStore: Writable<Record<string, string[]>>
  }

  const { formErrorsStore }: TaskOneWeightListProps = $props()
  
</script>

<div class="grid grid-cols-3 gap-x-6 gap-y-1">
  {#each Array.from({ length: 3 }) as _, index}
    <MyInput
      showErrorMessage={false}
      error={$formErrorsStore.weights && $formErrorsStore.weights[0]}
      id="weights.{index}"
      name="weights.{index}"
      label="w{index + 1}"
      type="number"
      placeholder="0.0"
    />
  {/each}
  <ErrorParagraph
    styles="col-span-3"
    error={$formErrorsStore.weights && $formErrorsStore.weights[0]}
  />
</div>
