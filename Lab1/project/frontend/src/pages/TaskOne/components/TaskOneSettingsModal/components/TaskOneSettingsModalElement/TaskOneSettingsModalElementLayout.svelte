<script lang="ts">
  import type { LayoutProps } from '../../../../../../types/LayoutProps'
  import type { TrainingType } from '../../../../../../types/TrainingType'
  import { handleTaskOneSettingsModalItemClick } from '../../handlers'

  type TaskOneSettingsModalElementLayoutProps = LayoutProps & {
    checked: boolean
    trainingType: TrainingType
  }

  const { children, checked, trainingType }: TaskOneSettingsModalElementLayoutProps = $props()
</script>

<button
  type="button"
  onclick={() => handleTaskOneSettingsModalItemClick(trainingType)}
  class="{checked
    ? 'ring-primary-600 bg-primary-50'
    : ''} cursor-pointer ring-1 duration-200 ease-out ring-gray-300 hover:ring-primary-600 p-3 flex gap-3 rounded-md"
>
  {@render children()}
</button>
