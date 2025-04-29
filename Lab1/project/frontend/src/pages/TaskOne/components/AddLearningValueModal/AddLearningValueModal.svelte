<script lang="ts">
  import { Button, Modal } from 'flowbite-svelte'
  import MyInput from '../../../../common-components/MyInput/MyInput.svelte'
  import { addLearningValueModalSchema, getAddLearningValueModalInputsData } from './helpers'
  import { createForm } from 'felte'
  import { handleAddLearningValueModalSubmit } from './handlers'
  import type { LearningValue } from '../../../../types/LearningValue'
  import { validator } from '@felte/validator-zod'
  import type { Writable } from 'svelte/store'
  import type { TaskOneFormData } from '../../../../types/TaskOneFormData'

  type AddLearningValueModalProps = {
    open: boolean
  }

  let { open = $bindable() }: AddLearningValueModalProps = $props()

  const { form, errors } = createForm<LearningValue>({
    extend: [validator({ schema: addLearningValueModalSchema })],
    onSubmit: (data) => {
      handleAddLearningValueModalSubmit(data)
      open = false
    },
  })

  const inputsData = getAddLearningValueModalInputsData()
</script>

<Modal title="Add a learning value" bind:open outsideclose>
  <form use:form class="flex flex-col gap-6">
    {#each inputsData as item}
      <MyInput error={($errors as any)[item.name] && ($errors as any)[item.name][0]} {...item} />
    {/each}
    <div class="flex justify-end gap-6">
      <Button size="lg" class="w-40" type="submit">Submit</Button>
      <Button size="lg" onclick={() => (open = false)} color="light" class="w-40" type="button"
        >Close</Button
      >
    </div>
  </form>
</Modal>
