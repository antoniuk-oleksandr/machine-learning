<script lang="ts">
  import { createForm } from 'felte'
  import type { LayoutProps } from '../../../../types/LayoutProps'
  import { validator } from '@felte/validator-zod'
  import type { TestingFormData } from '../../../../types/TestingFormData'
  import { testingFormSchema } from '../../helpers'
  import { setContext } from 'svelte'
  import { handleTestingFormSubmit } from '../../handlers'
  import { settingsModalStore } from '../../../../common-stores/settings-modal-store'

  const { form, errors, data, isSubmitting } = createForm<TestingFormData>({
    extend: validator({ schema: testingFormSchema }),
    onSubmit: handleTestingFormSubmit,
    initialValues: {
      gridSize: $settingsModalStore.gridSize,
      pointSize: $settingsModalStore.pointSize,
      pixels: [],
    },
  })

  setContext('formErrorsStore', errors)
  setContext('formDataStore', data)
  setContext('formIsSubmittingStore', isSubmitting)

  const { children }: LayoutProps = $props()
</script>

<form use:form class="h-full grow flex flex-col-reverse md:grid md:grid-cols-2 gap-6">
  {@render children()}
</form>
