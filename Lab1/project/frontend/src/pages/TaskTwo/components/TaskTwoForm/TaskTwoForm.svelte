<script lang="ts">
  import { createForm } from 'felte'
  import type { LayoutProps } from '../../../../types/LayoutProps'
  import { validator } from '@felte/validator-zod'
  import { taskTwoFormSchema } from '../../helpers'
  import { taskTwoPointsStore } from '../../stores/task-two-points-store'
  import { handleTaskTwoFormSubmit } from '../../handlers'
  import { setContext } from 'svelte'

  const { children }: LayoutProps = $props()

  const { form, setData, errors } = createForm({
    extend: validator({ schema: taskTwoFormSchema }),
    onSubmit: handleTaskTwoFormSubmit,
    initialValues: {
      points: $taskTwoPointsStore,
    },
  })

  taskTwoPointsStore.subscribe((points) => {
    setData('points', points)
  })

  setContext('formErrorsStore', errors)
</script>

<form use:form>
  {@render children()}
</form>
