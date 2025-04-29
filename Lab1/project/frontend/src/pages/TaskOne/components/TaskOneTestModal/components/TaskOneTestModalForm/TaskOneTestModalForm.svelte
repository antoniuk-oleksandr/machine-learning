<script lang="ts">
  import { createForm } from 'felte'
  import type { LayoutProps } from '../../../../../../types/LayoutProps'
  import { validator } from '@felte/validator-zod'
  import { taskOneTestModalFormSchema } from '../../helpers'
  import type { TaskOneTrainFormData } from '../../../../../../types/TaskOneTrainFormData'
  import { handleTaskOneTestModalSubmit } from '../../handlers'
  import { onDestroy, setContext } from 'svelte'
  import { taskOneTrainStore } from '../../../../stores/task-one-train-store'

  const { children }: LayoutProps = $props()

  const { form, errors, isSubmitting, setData } = createForm<TaskOneTrainFormData>({
    extend: validator({ schema: taskOneTestModalFormSchema }),
    onSubmit: handleTaskOneTestModalSubmit,
    initialValues: $taskOneTrainStore,
  })

  const unsubscribe = taskOneTrainStore.subscribe((state) => {
    const resultWeights = state.weights

    if (!resultWeights) return
    setData('weights', resultWeights)
  })

  setContext('formErrorsStore', errors)
  setContext('formIsSubmittingStore', isSubmitting)

  // errors.subscribe((error) => {
  //   if (error) {
  //     console.log('Form errors:', error)
  //   }
  // })

  onDestroy(() => unsubscribe())
</script>

<form use:form class="flex flex-col gap-6">
  {@render children()}
</form>
