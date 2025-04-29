<script lang="ts">
  import { Radio } from 'flowbite-svelte'
  import TaskOneSettingsModalElementLayout from './TaskOneSettingsModalElementLayout.svelte'
  import TaskOneSettingsModalElementText from '../TaskOneSettingsModalElementText/TaskOneSettingsModalElementText.svelte'
  import TaskOneSettingsModalElementInput from '../TaskOneSettingsModalElementInput/TaskOneSettingsModalElementInput.svelte'
  import type { TaskOneSettingsModalItem } from '../../../../../../types/TaskOneSettingsModalItem'

  type TaskOneSettingsModalElementProps = TaskOneSettingsModalItem

  let { checked, ...rest }: TaskOneSettingsModalElementProps = $props()
</script>

<TaskOneSettingsModalElementLayout {checked} {...rest}>
  <Radio value={String(checked)} {checked} />
  <TaskOneSettingsModalElementText {...rest} />
  <TaskOneSettingsModalElementInput {checked} {...rest} />
</TaskOneSettingsModalElementLayout>
