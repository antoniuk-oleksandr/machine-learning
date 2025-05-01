<script lang="ts">
  import { createForm } from 'felte'
  import type { LayoutProps } from '../../../../types/LayoutProps'
  import { setContext } from 'svelte'
  import type { TrainingFormData } from '../../../../types/TrainingFormData'
  import { handleTrainingFormSubmit } from '../../handlers'
  import { validator } from '@felte/validator-zod'
  import { trainingFormSchema } from '../../helpers'

  const { children }: LayoutProps = $props()
  const { form, errors, isSubmitting, data } = createForm<TrainingFormData>({
    onSubmit: handleTrainingFormSubmit,
    extend: validator({ schema: trainingFormSchema }),
  })

  setContext('formErrorsStore', errors)
  setContext('formDataStore', data)
  setContext('formIsSubmittingStore', isSubmitting)
</script>

<form class="flex flex-col gap-6 flex-1" use:form>
  {@render children()}
</form>
