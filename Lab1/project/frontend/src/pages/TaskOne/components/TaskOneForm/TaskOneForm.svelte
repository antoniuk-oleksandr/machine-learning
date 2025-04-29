<script lang="ts">
  import { validator } from '@felte/validator-zod'
  import { createForm } from 'felte'
  import { taskOneFormSchema } from '../../helpers'
  import type { LayoutProps } from '../../../../types/LayoutProps'
  import { onDestroy, setContext } from 'svelte'
  import { taskOneLearningValuesStore } from '../../stores/task-one-learning-values-store'
  import { handleTaskOneFormSubmit } from '../../handlers'
  import type { TaskOneFormData } from '../../../../types/TaskOneFormData'
    import { taskOneTrainStore } from '../../stores/task-one-train-store'

  const { children }: LayoutProps = $props()

  const { form, errors, data, isSubmitting } = createForm<TaskOneFormData>({
    extend: [validator({ schema: taskOneFormSchema })],
    onSubmit: handleTaskOneFormSubmit,
    initialValues: {
      learningValues: $taskOneLearningValuesStore,
      bias: 1,
      weights: [0.8, 0.4, -1.2],
      learningRateCoefficient: 0.15,
    },
  })

  const unsubscribe = data.subscribe((value) => {
    taskOneTrainStore.update((prev) => ({
      ...prev,
      bias: value.bias
    }))
  })

  setContext('formErrorsStore', errors)
  setContext('formIsSubmittingStore', isSubmitting)

  taskOneLearningValuesStore.subscribe((value) => {
    data.update((prev) => ({
      ...prev,
      learningValues: value,
    }))
  })

  onDestroy(() => unsubscribe())
</script>

<form
  class="grid h-full grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(300px,35rem)] gap-6 p-6"
  use:form
>
  {@render children()}
</form>
