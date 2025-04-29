import { navigate } from "svelte-routing"
import { taskOneSettingsStore } from "../../pages/TaskOne/stores/task-one-settings-store"

export const handleSelectTaskChange = (selected: string) => {
  if (selected === 'task1') navigate('/task-one')
  else if (selected === 'task2') navigate('/task-two')
}

export const handleHeaderSettingsButtonClick = (selected: string) => {
  if (selected === 'task1') {
    taskOneSettingsStore.update((prev) => ({ ...prev, open: true }))
  }
  else if (selected === 'task2') {
    // Handle task 2 settings
  }
}
