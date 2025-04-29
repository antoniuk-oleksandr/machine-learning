<script lang="ts">
  import { Button } from 'flowbite-svelte'
  import { taskOneTestModalStore } from '../../stores/task-one-test-modal-store'
  import { HammerOutline } from 'flowbite-svelte-icons'
    import { taskOneSettingsStore } from '../../stores/task-one-settings-store'

  
</script>

<Button
  disabled={!$taskOneSettingsStore.trained}
  type="button"
  color="primary"
  class="w-full flex gap-1"
  onclick={() => taskOneTestModalStore.update((prev) => ({ ...prev, open: true }))}
  size="lg"
>
  <HammerOutline />
  <span>Test Model</span>
</Button>
