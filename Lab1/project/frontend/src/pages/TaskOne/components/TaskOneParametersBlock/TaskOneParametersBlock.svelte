<script lang="ts">
  import { Card, Heading } from 'flowbite-svelte'
  import MyInput from '../../../../common-components/MyInput/MyInput.svelte'
  import { getTaskOnePageInputsData } from '../../helpers'
  import { getContext } from 'svelte'
  import type { Writable } from 'svelte/store'
  import TaskOneWeightList from '../TaskOneWeightList/TaskOneWeightList.svelte'

  let formErrorsStore = getContext<Writable<Record<string, string[]>>>('formErrorsStore')

  const inputsData = getTaskOnePageInputsData()
</script>

<Card class="w-full max-w-full flex flex-col gap-3">
  <Heading tag="h5">Parameters</Heading>
  <div class="flex flex-col gap-6">
    {#each inputsData as item}
      <MyInput error={$formErrorsStore[item.name] && $formErrorsStore[item.name][0]} {...item} />
    {/each}

    <TaskOneWeightList {formErrorsStore} />
  </div>
</Card>
