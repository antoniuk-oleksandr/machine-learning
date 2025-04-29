<script lang="ts">
  import { getContext } from 'svelte'
  import MyInput from '../../../../../../common-components/MyInput/MyInput.svelte'
  import type { MyInputProps } from '../../../../../../types/MyInputProps'
  import type { Writable } from 'svelte/store'
  import { getTaskTwoPointModalInputs } from '../TaskTwoAddPointModalForm/helpers'

  let formErrorsStore = getContext<Writable<Record<string, string[]>>>('formErrorsStore')

  let inputs = $state<MyInputProps[] | undefined>(undefined)

  formErrorsStore.subscribe((value) => {
    inputs = getTaskTwoPointModalInputs(value)
  })
</script>

{#if inputs}
  {#each inputs as item}
    <MyInput type="number" {...item} />
  {/each}
{/if}
