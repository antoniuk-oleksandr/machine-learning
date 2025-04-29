<script lang="ts">
  import { Input } from 'flowbite-svelte'

  type TaskOneSettingsModalElementInputProps = {
    checked: boolean
    useInput?: boolean
    inputValue?: number
    setInputValue?: (value: number) => void
  }

  const { checked, useInput, inputValue, setInputValue }: TaskOneSettingsModalElementInputProps =
    $props()
</script>

{#if useInput && checked}
  <div class="w-full gap-2 justify-end flex items-center">
    <Input
      onchange={(e) => setInputValue && setInputValue(parseFloat(e.currentTarget.value))}
      value={inputValue}
      class="h-fit w-20"
      type="number"
    />
    <span>sec</span>
  </div>
{/if}
