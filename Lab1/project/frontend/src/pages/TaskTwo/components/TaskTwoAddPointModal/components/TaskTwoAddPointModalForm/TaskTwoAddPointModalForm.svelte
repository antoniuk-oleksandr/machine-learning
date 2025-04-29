<script lang="ts">
  import { createForm } from 'felte'
  import type { LayoutProps } from '../../../../../../types/LayoutProps'
  import type { Point } from '../../../../../../types/Point'
  import { validator } from '@felte/validator-zod'
  import { taskTwoAddPointModalFormSchema } from './helpers'
  import { handleTaskTwoAddPointModalFormSubmit } from './handlers'
  import { setContext } from 'svelte'

  const { children }: LayoutProps = $props()

  const { form, errors } = createForm<Point>({
    extend: validator({ schema: taskTwoAddPointModalFormSchema }),
    onSubmit: handleTaskTwoAddPointModalFormSubmit,
  })

  setContext('formErrorsStore', errors)
</script>

<form use:form class="flex flex-col gap-6">
  {@render children()}
</form>
